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
 * Uses an idempotency check to prevent double fulfillment.
 * 
 * @param data Fulfillment instructions
 * @param sourceId The Polar ID (checkout.id, order.id, etc.) to track fulfillment
 */
async function fulfillOrder(data: FulfillmentData, sourceId: string): Promise<void> {
  if (!adminDb) {
    throw new Error("Firebase Admin is not initialized");
  }

  const paymentRef = adminDb.collection("processed_payments").doc(sourceId);
  const userRef = adminDb.collection("users").doc(data.firebaseUid);

  try {
    await adminDb.runTransaction(async (transaction) => {
      const paymentDoc = await transaction.get(paymentRef);

      if (paymentDoc.exists) {
        console.log(`[Polar Webhook] ⏩ Already fulfilled for ID: ${sourceId}. Skipping.`);
        return;
      }

      const userDoc = await transaction.get(userRef);
      
      if (data.packageType === "token" && data.tokens > 0) {
        // ─── Token Pack Fulfillment ─────────────────────────────────
        let currentBalance = 0;
        if (userDoc.exists) {
          currentBalance = userDoc.data()?.token_balance || 0;
        }

        transaction.set(userRef, {
          token_balance: currentBalance + data.tokens,
          lastPurchase: {
            packageId: data.packageId,
            tokens: data.tokens,
            source: "polar",
            sourceId: sourceId,
            timestamp: new Date().toISOString(),
          },
        }, { merge: true });

        console.log(`[Polar Webhook] ✅ Tokens awarded: +${data.tokens} to UID:${data.firebaseUid}`);
      } else if (data.packageType === "vip" && data.vipDays > 0) {
        // ─── VIP Fulfillment ────────────────────────────────────────
        const now = new Date();
        let currentExpiry = now;

        if (userDoc.exists) {
          const existingData = userDoc.data();
          if (existingData?.vipExpiry) {
            const existingDate = typeof existingData.vipExpiry.toDate === "function"
              ? existingData.vipExpiry.toDate()
              : new Date(existingData.vipExpiry);

            if (existingDate > now) {
              currentExpiry = existingDate;
            }
          }
        }

        const newExpiry = new Date(currentExpiry.getTime() + data.vipDays * 24 * 60 * 60 * 1000);

        transaction.set(userRef, {
          vipExpiry: newExpiry.toISOString(),
          lastPurchase: {
            packageId: data.packageId,
            vipDays: data.vipDays,
            source: "polar",
            sourceId: sourceId,
            timestamp: new Date().toISOString(),
          },
        }, { merge: true });

        console.log(`[Polar Webhook] ✅ VIP Activated: +${data.vipDays} days for UID:${data.firebaseUid}`);
      }

      // Mark this ID as fulfilled
      transaction.set(paymentRef, {
        firebaseUid: data.firebaseUid,
        packageId: data.packageId,
        fulfilledAt: new Date().toISOString(),
        metadata: data
      });
    });
  } catch (error) {
    console.error(`[Polar Webhook] ❌ Transaction failed for ${sourceId}:`, error);
    throw error;
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
        const checkout = event.data;
        if (checkout.status !== "succeeded") {
          break;
        }

        const fulfillmentData = extractFulfillmentData(checkout.metadata);
        if (!fulfillmentData) {
          console.warn(`[Polar Webhook] ⚠️ No fulfillment metadata found in checkout ${checkout.id}`);
          break;
        }

        // Use checkout.id as sourceId
        await fulfillOrder(fulfillmentData, checkout.id);
        break;
      }

      case "order.created":
      case "order.paid": {
        const order = event.data;
        
        const fulfillmentData = extractFulfillmentData(order.metadata);
        if (fulfillmentData) {
          // Use order.id as sourceId
          await fulfillOrder(fulfillmentData, order.id);
        } else {
          console.warn(`[Polar Webhook] ⚠️ No metadata on order ${order.id}`);
        }
        break;
      }

      case "subscription.created":
      case "subscription.updated": {
        const subscription = event.data;
        
        const fulfillmentData = extractFulfillmentData(subscription.metadata);
        if (fulfillmentData) {
          // Use subscription.id as sourceId
          await fulfillOrder(fulfillmentData, subscription.id);
        } else {
          console.warn(`[Polar Webhook] ⚠️ No metadata on subscription ${subscription.id}`);
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
