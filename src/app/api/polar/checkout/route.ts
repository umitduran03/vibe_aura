// ============================================
// VibeCheckr — Polar Checkout API Route
// ============================================
// Creates a Polar Checkout session and returns the redirect URL.
// Product IDs are resolved from environment variables.

import { NextRequest, NextResponse } from "next/server";
import { polar, getPolarProductId } from "@/lib/polar";
import { verifyRequest } from "@/lib/api-auth";

export async function POST(req: NextRequest) {
  try {
    // ─── Firebase Auth Verification ───
    const verifiedUser = await verifyRequest(req);
    if (!verifiedUser) {
      return NextResponse.json(
        { error: "Unauthorized. Nice try bestie 💅" },
        { status: 401 }
      );
    }

    const { packageId } = await req.json();

    if (!packageId || typeof packageId !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid packageId" },
        { status: 400 }
      );
    }

    // ─── Resolve Polar Product ID from .env ───
    const polarProductId = getPolarProductId(packageId);

    if (!polarProductId) {
      console.error(`[Polar Checkout] No product ID configured for package: ${packageId}`);
      return NextResponse.json(
        { error: "Product not configured. Please contact support." },
        { status: 400 }
      );
    }

    // ─── Build success/confirm URL ───
    const origin = req.headers.get("origin") || req.headers.get("referer")?.replace(/\/$/, "") || "";
    const successUrl = `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`;

    // ─── Create Polar Checkout Session ───
    const checkout = await polar.checkouts.create({
      products: [polarProductId],
      successUrl,
      metadata: {
        userId: verifiedUser.uid,
        packageId: packageId,
      },
    });

    return NextResponse.json({
      checkoutUrl: checkout.url,
      checkoutId: checkout.id,
    });
  } catch (error: any) {
    console.error("[Polar Checkout] Error:", error?.message || error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
