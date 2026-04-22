/**
 * Vibe & Aura — Polar.sh Webhook Handler
 *
 * Listens for Polar webhook events (checkout.completed, order.paid)
 * and fulfills orders by updating Firestore via Firebase Admin SDK.
 *
 * POST /api/polar/webhook
 *
 * IMPORTANT: This route does NOT use Firebase Auth.
 * It verifies requests using the Polar webhook signature (POLAR_WEBHOOK_SECRET).
 * The raw request body is required for signature verification.
 */

import { NextRequest, NextResponse } from "next/server";
import { validateEvent, WebhookVerificationError } from "@polar-sh/sdk/webhooks";
import { adminDb } from "@/lib/firebase-admin";

// ─── Fulfillment Logic ───────────────────────────────────────────

interface FulfillmentData {
  firebaseUid: string;
  packageId: string;
  packageType: "token" | "vip";
  tokens: number;
  vipDays: number;
}

function extractFulfillmentData(metadata: Record<string, any> | null | undefined): FulfillmentData | null {
  if (!metadata?.firebaseUid || !metadata?.packageId) {
    return null;
  }

  return {
    firebaseUid: metadata.firebaseUid,
    packageId: metadata.packageId,
    packageType: (metadata.packageType as "token" | "vip") || "token",
    tokens: parseInt(metadata.tokens || "0", 10),
    vipDays: parseInt(metadata.vipDays || "0", 10),
  };
}

/**
 * Awards tokens or activates VIP for the given user in Firestore.
 */
async function fulfillOrder(data: FulfillmentData): Promise<void> {
  if (!adminDb) {
    throw new Error("Firebase Admin is not initialized");
  }

  const userRef = adminDb.collection("users").doc(data.firebaseUid);
  const userDoc = await userRef.get();

  if (data.packageType === "token" && data.tokens > 0) {
    // ─── Token Pack Fulfillment ─────────────────────────────────
    let currentBalance = 0;
    if (userDoc.exists) {
      currentBalance = userDoc.data()?.token_balance || 0;
    }

    await userRef.set(
      {
        token_balance: currentBalance + data.tokens,
        lastPurchase: {
          packageId: data.packageId,
          tokens: data.tokens,
          source: "polar",
          timestamp: new Date().toISOString(),
        },
      },
      { merge: true }
    );

    console.log(
      `[Polar Webhook] ✅ Fulfilled ${data.tokens} tokens for UID:${data.firebaseUid} (${data.packageId}). New balance: ${currentBalance + data.tokens}`
    );
  } else if (data.packageType === "vip" && data.vipDays > 0) {
    // ─── VIP Fulfillment ────────────────────────────────────────
    const now = new Date();
    let currentExpiry = now;

    if (userDoc.exists) {
      const existingData = userDoc.data();
      if (existingData?.vipExpiry) {
        const existingDate =
          typeof existingData.vipExpiry.toDate === "function"
            ? existingData.vipExpiry.toDate()
            : new Date(existingData.vipExpiry);

        if (existingDate > now) {
          currentExpiry = existingDate; // Stack on top of existing VIP
        }
      }
    }

    const newExpiry = new Date(
      currentExpiry.getTime() + data.vipDays * 24 * 60 * 60 * 1000
    );

    await userRef.set(
      {
        vipExpiry: newExpiry.toISOString(),
        lastPurchase: {
          packageId: data.packageId,
          vipDays: data.vipDays,
          source: "polar",
          timestamp: new Date().toISOString(),
        },
      },
      { merge: true }
    );

    console.log(
      `[Polar Webhook] ✅ Activated VIP for UID:${data.firebaseUid} (${data.packageId}). Expires: ${newExpiry.toISOString()}`
    );
  } else {
    console.warn(`[Polar Webhook] ⚠️ Unknown fulfillment type for package: ${data.packageId}`);
  }
}

// ─── Webhook Handler ─────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.POLAR_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("[Polar Webhook] POLAR_WEBHOOK_SECRET is not configured");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  if (!adminDb) {
    console.error("[Polar Webhook] Firebase Admin is not initialized");
    return NextResponse.json(
      { error: "Backend configuration missing" },
      { status: 500 }
    );
  }

  // ─── Signature Verification (Standard Webhooks) ────────────────
  const rawBody = await req.text();

  // Build a plain headers object for validateEvent
  const headers: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    headers[key] = value;
  });

  let event: any;

  try {
    event = validateEvent(rawBody, headers, webhookSecret);
  } catch (err: any) {
    if (err instanceof WebhookVerificationError) {
      console.error("[Polar Webhook] ⛔ Signature verification failed:", err.message);
      return NextResponse.json(
        { error: "Webhook signature verification failed" },
        { status: 403 }
      );
    }
    console.error("[Polar Webhook] ⛔ Unexpected error during verification:", err);
    return NextResponse.json(
      { error: "Webhook verification error" },
      { status: 400 }
    );
  }

  // ─── Event Processing ───────────────────────────────────────────
  console.log(`[Polar Webhook] Received event: ${event.type}`);

  try {
    switch (event.type) {
      case "checkout.updated": {
        // Polar fires checkout.updated when checkout is completed
        const checkout = event.data;
        if (checkout.status !== "succeeded") {
          console.log(`[Polar Webhook] Checkout status=${checkout.status}, skipping fulfillment.`);
          break;
        }

        const fulfillmentData = extractFulfillmentData(checkout.metadata);
        if (!fulfillmentData) {
          console.warn(`[Polar Webhook] ⚠️ No fulfillment metadata found in checkout ${checkout.id}`);
          break;
        }

        await fulfillOrder(fulfillmentData);
        break;
      }

      case "order.created": {
        // Alternative: handle at order level
        const order = event.data;

        const fulfillmentData = extractFulfillmentData(order.metadata);
        if (fulfillmentData) {
          await fulfillOrder(fulfillmentData);
        } else {
          console.warn(`[Polar Webhook] ⚠️ No metadata on order ${order.id}`);
        }
        break;
      }

      default:
        console.log(`[Polar Webhook] Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error(`[Polar Webhook] ❌ Fulfillment error for event ${event.type}:`, error);
    // Return 500 so Polar retries the webhook
    return NextResponse.json(
      { error: "Fulfillment failed" },
      { status: 500 }
    );
  }

  // ─── Acknowledge receipt ────────────────────────────────────────
  return NextResponse.json({ received: true }, { status: 202 });
}
