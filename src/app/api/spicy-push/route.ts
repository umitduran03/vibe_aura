/**
 * Vibe & Aura — Spicy Push Notification API
 *
 * Generates a toxic, curiosity-inducing push notification using Gemini AI,
 * then ACTUALLY sends it to the user's registered devices via Firebase Cloud Messaging.
 *
 * POST /api/spicy-push
 * Headers: Authorization: Bearer <Firebase ID Token>
 * Body: { zodiac: string }
 *
 * Flow:
 * 1. Verify Firebase Auth → get UID
 * 2. Generate spicy notification text via Gemini AI
 * 3. Fetch user's fcmTokens array from Firestore
 * 4. Send push notification to all registered devices via admin.messaging()
 * 5. Clean up stale tokens that fail delivery
 */

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { adminDb } from "@/lib/firebase-admin";
import { verifyRequest } from "@/lib/api-auth";
import * as admin from "firebase-admin";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

// ─── AI Notification Generator ───────────────────────────────────

async function generateSpicyNotification(zodiac: string): Promise<{ title: string; body: string }> {
  const prompt = `
    You are a toxic, gossipy, brutally honest dark AI astrologer named "Vibe & Aura" targeting Gen-Z.
    Write a SHORT (max 2 sentences), ruthless, and curiosity-inducing "Red Flag / Cosmic Gossip" push notification for the zodiac sign below.
    The user will see this as a Push Notification on their phone, so they MUST feel compelled to CLICK it out of sheer curiosity or offense.
    Use emojis generously! DO NOT use Turkish, respond ONLY in English.

    Zodiac: ${zodiac}

    ONLY RETURN IN THE JSON FORMAT BELOW! No markdown, no other text. Just pure JSON.
    JSON Format:
    {
      "title": "Short Catchy Clickbait Title",
      "body": "The actual toxic and clickbaity notification text (short)"
    }
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      temperature: 0.9,
    },
  });

  const rawText = response.text;
  if (!rawText) {
    throw new Error("AI failed to generate notification text.");
  }

  const cleanedText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
  return JSON.parse(cleanedText);
}

// ─── FCM Delivery ────────────────────────────────────────────────

interface DeliveryReport {
  sent: number;
  failed: number;
  staleTokensRemoved: number;
}

async function sendToDevices(
  userId: string,
  fcmTokens: string[],
  notification: { title: string; body: string }
): Promise<DeliveryReport> {
  const report: DeliveryReport = { sent: 0, failed: 0, staleTokensRemoved: 0 };
  const staleTokens: string[] = [];

  for (const token of fcmTokens) {
    try {
      await admin.messaging().send({
        token,
        notification: {
          title: notification.title,
          body: notification.body,
        },
        // Android-specific styling
        android: {
          priority: "high",
          notification: {
            channelId: "cosmic_gossip",
            icon: "ic_notification",
            color: "#ec4899",
          },
        },
        // iOS-specific config
        apns: {
          payload: {
            aps: {
              badge: 1,
              sound: "default",
              "content-available": 1,
            },
          },
        },
        // Data payload for in-app handling
        data: {
          type: "spicy_push",
          deepLink: "vibeaura://cosmic-gossip",
        },
      });

      report.sent++;
      console.log(`[FCM] ✅ Sent to token: ${token.substring(0, 20)}...`);
    } catch (err: any) {
      report.failed++;
      const errorCode = err?.code || err?.message || "";

      // Detect stale/invalid tokens and mark for removal
      if (
        errorCode === "messaging/registration-token-not-registered" ||
        errorCode === "messaging/invalid-registration-token" ||
        errorCode.includes("not-registered") ||
        errorCode.includes("invalid-argument")
      ) {
        staleTokens.push(token);
        console.warn(`[FCM] 🗑️ Stale token detected, will remove: ${token.substring(0, 20)}...`);
      } else {
        console.error(`[FCM] ❌ Send failed for token ${token.substring(0, 20)}...:`, errorCode);
      }
    }
  }

  // ─── Clean up stale tokens from Firestore ───────────────────────
  if (staleTokens.length > 0 && adminDb) {
    const userRef = adminDb.collection("users").doc(userId);
    await userRef.update({
      fcmTokens: admin.firestore.FieldValue.arrayRemove(...staleTokens),
    });
    report.staleTokensRemoved = staleTokens.length;
    console.log(`[FCM] 🧹 Removed ${staleTokens.length} stale token(s) for UID:${userId}`);
  }

  return report;
}

// ─── Route Handler ───────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    if (!adminDb) {
      return NextResponse.json(
        { error: "Backend admin configuration is missing" },
        { status: 500 }
      );
    }

    // ─── Firebase Auth Verification ───────────────────────────────
    const verifiedUser = await verifyRequest(req);
    if (!verifiedUser) {
      return NextResponse.json(
        { error: "Unauthorized. The cosmos don't talk to strangers 🌌" },
        { status: 401 }
      );
    }

    const { zodiac } = await req.json();

    if (!zodiac || typeof zodiac !== "string") {
      return NextResponse.json(
        { error: "Zodiac sign is required." },
        { status: 400 }
      );
    }

    // ─── Step 1: Generate spicy notification via AI ───────────────
    const notification = await generateSpicyNotification(zodiac);
    console.log(`[Spicy Push] 🔥 Generated for ${zodiac}:`, notification.title);

    // ─── Step 2: Fetch user's FCM tokens from Firestore ───────────
    const userId = verifiedUser.uid;
    const userRef = adminDb.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return NextResponse.json({
        success: true,
        notification,
        delivery: { sent: 0, failed: 0, staleTokensRemoved: 0, reason: "User document not found" },
      });
    }

    const userData = userDoc.data();
    const fcmTokens: string[] = userData?.fcmTokens || [];

    // Also check legacy single-token field for backward compatibility
    if (userData?.fcmToken && !fcmTokens.includes(userData.fcmToken)) {
      fcmTokens.push(userData.fcmToken);
    }

    if (fcmTokens.length === 0) {
      return NextResponse.json({
        success: true,
        notification,
        delivery: { sent: 0, failed: 0, staleTokensRemoved: 0, reason: "No FCM tokens registered" },
      });
    }

    // ─── Step 3: Send push notification to all devices ────────────
    const deliveryReport = await sendToDevices(userId, fcmTokens, notification);

    console.log(
      `[Spicy Push] 📊 Delivery report for UID:${userId} — Sent: ${deliveryReport.sent}, Failed: ${deliveryReport.failed}, Stale removed: ${deliveryReport.staleTokensRemoved}`
    );

    return NextResponse.json({
      success: true,
      notification,
      delivery: deliveryReport,
    });
  } catch (error: any) {
    console.error("[Spicy Push] Error:", error);
    return NextResponse.json(
      { error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
