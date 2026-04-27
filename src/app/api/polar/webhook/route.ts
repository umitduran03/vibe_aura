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


  // Only process 'order.paid' to ensure funds are received.
  // We also listen to 'order.created' just to acknowledge it.
  const validEvents = ["order.created", "order.paid"];

  if (!validEvents.includes(event.type)) {

    return NextResponse.json({ received: true });
  }

  const order = event.data;
  const eventType = event.type;
  const sourceId = order.id;

  try {
    const fulfillmentData = extractFulfillmentData(order.metadata);

    if (!fulfillmentData) {
      console.warn(`[Polar Webhook] ⚠️ No valid fulfillment metadata on ${eventType}:${sourceId}. Skipping.`);
      return NextResponse.json({ received: true, status: "skipped_no_metadata" });
    }

    // Actual fulfillment only happens on 'order.paid'
    if (eventType === "order.paid") {
      await fulfillOrder(fulfillmentData, sourceId);

    } else {

    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(`[Polar Webhook] ❌ Error processing ${eventType}:${sourceId}:`, error);
    // Return 500 so Polar retries the webhook
    return NextResponse.json(
      { error: "Internal processing failed" },
      { status: 500 }
    );
  }
}
