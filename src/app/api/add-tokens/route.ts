import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { verifyRequest } from "@/lib/api-auth";
import { FieldValue } from "firebase-admin/firestore";

/**
 * POST /api/add-tokens
 *
 * Adds reward tokens to a user's balance after a verified share action.
 * Protected by Firebase Auth + server-side rate limiting.
 *
 * Body: { amount: number, source: string }
 * Headers: Authorization: Bearer <Firebase ID Token>
 */
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
        { error: "Unauthorized. Nice try bestie 💅" },
        { status: 401 }
      );
    }

    const { amount, source } = await req.json();

    // ─── Input Validation ─────────────────────────────────────────
    if (typeof amount !== "number" || amount <= 0 || amount > 5) {
      return NextResponse.json(
        { error: "Invalid request payload" },
        { status: 400 }
      );
    }

    // Only allow known reward sources
    const ALLOWED_SOURCES = ["share_story"];
    if (!source || !ALLOWED_SOURCES.includes(source)) {
      return NextResponse.json(
        { error: "Invalid reward source" },
        { status: 400 }
      );
    }

    const userId = verifiedUser.uid;

    // ─── Rate Limiting: Max 3 share rewards per 24 hours ─────────
    const now = Date.now();
    const twentyFourHoursAgo = now - 24 * 60 * 60 * 1000;

    const rewardsRef = adminDb
      .collection("users")
      .doc(userId)
      .collection("share_rewards");

    const recentRewards = await rewardsRef
      .where("timestamp", ">", twentyFourHoursAgo)
      .get();

    if (recentRewards.size >= 3) {
      return NextResponse.json(
        {
          error: "Daily share reward limit reached (3/day). Come back tomorrow! ⏰",
          limited: true,
        },
        { status: 429 }
      );
    }

    // ─── Add Tokens ──────────────────────────────────────────────
    const userRef = adminDb.collection("users").doc(userId);
    const userDoc = await userRef.get();

    let currentBalance = 0;
    if (userDoc.exists) {
      currentBalance = userDoc.data()?.token_balance || 0;
    }

    // Atomically update balance
    await userRef.set(
      { token_balance: currentBalance + amount },
      { merge: true }
    );

    // Log the reward for rate limiting
    await rewardsRef.add({
      amount,
      source,
      timestamp: now,
      createdAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      balance: currentBalance + amount,
      rewarded: amount,
    });
  } catch (error) {
    console.error("[add-tokens] Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
