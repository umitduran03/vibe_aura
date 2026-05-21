// ============================================
// VibeCheckr — Polar Webhook Handler
// ============================================
// Receives payment confirmation events from Polar.
// Validates webhook signature and credits tokens/VIP to the user's Firestore account.

import { NextRequest, NextResponse } from "next/server";
import {
  validateEvent,
  WebhookVerificationError,
} from "@polar-sh/sdk/webhooks";
import { adminDb } from "@/lib/firebase-admin";
import {
  getPackageIdFromPolarProduct,
  TOKEN_AMOUNTS,
  VIP_DURATIONS,
} from "@/lib/polar";

export async function POST(req: NextRequest) {
  try {
    console.log("[Polar Webhook] === NEW WEBHOOK RECEIVED ===");
    
    // ─── Read raw body for signature verification ───
    const body = await req.text();
    const webhookSecret = process.env.POLAR_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error("[Polar Webhook] CRITICAL: POLAR_WEBHOOK_SECRET is not set.");
      return NextResponse.json(
        { error: "Webhook not configured" },
        { status: 500 }
      );
    }

    if (!adminDb) {
      console.error("[Polar Webhook] CRITICAL: Firebase Admin DB is not initialized.");
      return NextResponse.json(
        { error: "Backend not configured" },
        { status: 500 }
      );
    }

    // ─── Verify webhook signature ───
    let event: ReturnType<typeof validateEvent>;
    try {
      console.log("[Polar Webhook] Validating signature...");
      event = validateEvent(
        body,
        Object.fromEntries(req.headers.entries()),
        webhookSecret
      );
      console.log("[Polar Webhook] Signature validated successfully.");
    } catch (err) {
      if (err instanceof WebhookVerificationError) {
        console.warn("[Polar Webhook] Signature verification failed:", err.message);
        return NextResponse.json(
          { error: "Invalid webhook signature" },
          { status: 403 }
        );
      }
      throw err;
    }

    // ─── Handle events ───
    const eventType = event.type;
    console.log(`[Polar Webhook] Processing event type: ${eventType}`);

    if (eventType === "checkout.updated") {
      const checkout = event.data;
      console.log(`[Polar Webhook] Checkout ID: ${checkout.id}, Status: ${checkout.status}`);
      
      if (checkout.status !== "succeeded") {
        console.log(`[Polar Webhook] Checkout status is not 'succeeded' (it is ${checkout.status}). Ignoring for now.`);
        return NextResponse.json({ received: true });
      }

      const metadata = checkout.metadata as Record<string, string> | undefined;
      const userId = metadata?.userId;
      const packageId = metadata?.packageId;

      console.log(`[Polar Webhook] Extracted metadata -> userId: ${userId}, packageId: ${packageId}`);

      if (!userId) {
        console.warn("[Polar Webhook] Missing userId in checkout metadata.");
        return NextResponse.json({ received: true });
      }

      if (packageId) {
        console.log(`[Polar Webhook] Using packageId from metadata: ${packageId}`);
        await creditUser(userId, packageId);
      } else {
        const productId = checkout.productId;
        console.log(`[Polar Webhook] No packageId in metadata. Attempting to resolve productId: ${productId}`);
        if (productId) {
          const resolvedPkgId = getPackageIdFromPolarProduct(productId);
          if (resolvedPkgId) {
            console.log(`[Polar Webhook] Successfully resolved productId to packageId: ${resolvedPkgId}`);
            await creditUser(userId, resolvedPkgId);
          } else {
            console.warn(`[Polar Webhook] Failed to resolve productId ${productId} to any internal package.`);
          }
        } else {
          console.warn("[Polar Webhook] No packageId in metadata and no productId in checkout data.");
        }
      }
    } else if (eventType === "order.created") {
      const order = event.data;
      const metadata = order.metadata as Record<string, string> | undefined;
      const userId = metadata?.userId;
      const packageId = metadata?.packageId;
      const productId = order.productId;

      console.log(`[Polar Webhook] Order ID: ${order.id}. Extracted metadata -> userId: ${userId}, packageId: ${packageId}, productId: ${productId}`);

      if (!userId) {
        console.warn("[Polar Webhook] Missing userId in order metadata.");
        return NextResponse.json({ received: true });
      }

      const resolvedPkgId = packageId || (productId ? getPackageIdFromPolarProduct(productId) : null);
      console.log(`[Polar Webhook] Final resolved packageId to credit: ${resolvedPkgId}`);

      if (resolvedPkgId) {
        await creditUser(userId, resolvedPkgId);
      } else {
        console.warn(`[Polar Webhook] Could not resolve package ID for this order. Nothing was credited.`);
      }
    } else {
      console.log(`[Polar Webhook] Unhandled event type: ${eventType}. Acknowledging without action.`);
    }

    console.log("[Polar Webhook] === WEBHOOK PROCESSED SUCCESSFULLY ===");
    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("[Polar Webhook] FATAL ERROR IN WEBHOOK HANDLER:", error);
    return NextResponse.json(
      { error: "Webhook processing failed internally", details: error?.message },
      { status: 500 }
    );
  }
}

// ─── Helper: Credit tokens or VIP to user ───
async function creditUser(userId: string, packageId: string) {
  if (!adminDb) {
    throw new Error("Admin DB is not initialized inside creditUser function.");
  }

  console.log(`[Polar Webhook] ---> Starting creditUser logic for User: ${userId}, Package: ${packageId}`);
  const userRef = adminDb.collection("users").doc(userId);

  try {
    // Handle Token package
    if (TOKEN_AMOUNTS[packageId]) {
      const amount = TOKEN_AMOUNTS[packageId];
      console.log(`[Polar Webhook] Package is a Token Package. Amount to add: ${amount}. Fetching current Firestore doc...`);
      
      const userDoc = await userRef.get();
      const currentBalance = userDoc.exists ? (userDoc.data()?.token_balance || 0) : 0;
      console.log(`[Polar Webhook] Current token balance: ${currentBalance}. New balance will be: ${currentBalance + amount}`);

      console.log(`[Polar Webhook] Writing to Firestore (merge: true)...`);
      await userRef.set(
        { token_balance: currentBalance + amount },
        { merge: true }
      );

      console.log(`[Polar Webhook] ✅ SUCCESS: Credited ${amount} tokens to user ${userId}`);
      return;
    }

    // Handle VIP package
    if (VIP_DURATIONS[packageId]) {
      const durationDays = VIP_DURATIONS[packageId];
      const now = new Date();
      console.log(`[Polar Webhook] Package is a VIP Package. Duration to add: ${durationDays} days. Fetching current Firestore doc...`);

      const userDoc = await userRef.get();
      let currentExpiry = now;

      if (userDoc.exists) {
        const existingData = userDoc.data();
        if (existingData?.vipExpiry) {
          const existingDate = new Date(existingData.vipExpiry);
          if (existingDate > now) {
            console.log(`[Polar Webhook] User already has active VIP until ${existingDate.toISOString()}. Stacking duration.`);
            currentExpiry = existingDate;
          } else {
            console.log(`[Polar Webhook] User's previous VIP expired on ${existingDate.toISOString()}. Starting from today.`);
          }
        } else {
          console.log(`[Polar Webhook] User has no previous VIP history. Starting from today.`);
        }
      }

      const newExpiry = new Date(currentExpiry.getTime() + durationDays * 24 * 60 * 60 * 1000);
      console.log(`[Polar Webhook] New VIP expiry calculated as: ${newExpiry.toISOString()}. Writing to Firestore...`);

      await userRef.set(
        { vipExpiry: newExpiry.toISOString() },
        { merge: true }
      );

      console.log(`[Polar Webhook] ✅ SUCCESS: VIP activated for user ${userId} until ${newExpiry.toISOString()}`);
      return;
    }

    // If we reach here, the packageId matched neither list
    throw new Error(`[Polar Webhook] Unrecognized packageId: ${packageId}. It does not exist in TOKEN_AMOUNTS or VIP_DURATIONS.`);
  } catch (err: any) {
    console.error(`[Polar Webhook] ❌ FIREBASE WRITE FAILED for user ${userId}:`, err);
    throw err; // Re-throw to ensure the main webhook handler catches it and returns a 500
  }
}
