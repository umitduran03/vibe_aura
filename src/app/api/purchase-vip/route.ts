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

    const { vipPackageId } = await req.json();

    if (!vipPackageId) {
      return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
    }

    let durationDays = 0;
    if (vipPackageId === "vip_weekly") {
      durationDays = 7;
    } else if (vipPackageId === "vip_monthly") {
      durationDays = 30;
    } else if (vipPackageId === "vip_lifetime") {
      durationDays = 36500; // 100 years
    } else {
      return NextResponse.json({ error: "Invalid VIP package" }, { status: 400 });
    }

    // Use the verified UID from the token, NOT from the request body
    const userId = verifiedUser.uid;

    const userRef = adminDb.collection("users").doc(userId);
    const userDoc = await userRef.get();
    
    const now = new Date();
    // Use existing expiry if it's in the future and not lifetime (to stack properly)
    let currentExpiry = now;
    if (userDoc.exists) {
        const existingData = userDoc.data();
        if (existingData?.vipExpiry) {
            const existingDate = typeof existingData.vipExpiry.toDate === 'function' 
                ? existingData.vipExpiry.toDate() 
                : new Date(existingData.vipExpiry);
            
            if (existingDate > now) {
                currentExpiry = existingDate;
            }
        }
    }

    const newExpiry = new Date(currentExpiry.getTime() + durationDays * 24 * 60 * 60 * 1000);

    await userRef.set({
      vipExpiry: newExpiry.toISOString(),
    }, { merge: true });

    return NextResponse.json({ success: true, vipExpiry: newExpiry.toISOString() });
  } catch (error) {
    console.error("[purchase-vip] Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
