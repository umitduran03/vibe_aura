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

    const { amount } = await req.json();

    if (typeof amount !== "number" || amount <= 0) {
      return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
    }

    // Use the verified UID from the token, NOT from the request body
    const userId = verifiedUser.uid;

    const userRef = adminDb.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = userDoc.data();
    const currentBalance = userData?.token_balance || 0;
    
    // Check if VIP is active
    const vipExpiryValue = userData?.vipExpiry || null;
    let isVip = false;
    
    if (vipExpiryValue) {
      const expiryDate = typeof vipExpiryValue.toDate === 'function' ? vipExpiryValue.toDate() : new Date(vipExpiryValue);
      isVip = expiryDate > new Date();
    }
    
    if (isVip) {
      // VIP users don't spend tokens
      return NextResponse.json({ success: true, balance: currentBalance, vipExempt: true });
    }
    
    if (currentBalance < amount) {
      return NextResponse.json({ error: "Insufficient funds" }, { status: 403 });
    }

    await userRef.update({
      token_balance: currentBalance - amount
    });

    return NextResponse.json({ success: true, balance: currentBalance - amount });
  } catch (error) {
    console.error("[spend-token] Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
