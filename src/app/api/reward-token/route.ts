import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { verifyRequest } from "@/lib/api-auth";

export async function POST(req: NextRequest) {
  try {
    if (!adminDb) {
      return NextResponse.json({ error: "Backend admin configuration is missing" }, { status: 500 });
    }

    // ─── Firebase Auth Verification ───────────────────────────────
    const verifiedUser = await verifyRequest(req);
    if (!verifiedUser) {
      return NextResponse.json({ error: "Unauthorized. Nice try bestie 💅" }, { status: 401 });
    }

    const { amount, source } = await req.json();

    if (typeof amount !== "number" || amount <= 0 || amount > 5) {
      return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
    }

    // Only allow known reward sources
    const ALLOWED_SOURCES = ["admob", "admob_fallback"];
    if (!source || !ALLOWED_SOURCES.includes(source)) {
      return NextResponse.json({ error: "Invalid reward source" }, { status: 400 });
    }

    // Use the verified UID from the token, NOT from the request body
    const userId = verifiedUser.uid;

    const userRef = adminDb.collection("users").doc(userId);
    const userDoc = await userRef.get();

    let currentBalance = 0;
    if (userDoc.exists) {
      currentBalance = userDoc.data()?.token_balance || 0;
    }

    await userRef.set({
      token_balance: currentBalance + amount,
    }, { merge: true });

    return NextResponse.json({ success: true, balance: currentBalance + amount });
  } catch (error) {
    console.error("[reward-token] Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
