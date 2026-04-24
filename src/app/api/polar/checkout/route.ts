/**
 * Vibe & Aura — Polar.sh Checkout Session API
 *
 * Creates a Polar Checkout Session for the selected package.
 * Protected by Firebase Auth (via api-auth.ts verifyRequest).
 *
 * POST /api/polar/checkout
 * Body: { packageId: string }
 * Headers: Authorization: Bearer <Firebase ID Token>
 *
 * Returns: { url: string } — the Polar Checkout redirect URL
 */

import { NextRequest, NextResponse } from "next/server";
import { polar } from "@/lib/polar";
import { getPackageById } from "@/lib/polar-packages";
import { verifyRequest } from "@/lib/api-auth";

export async function POST(req: NextRequest) {
  try {
    // ─── Firebase Auth Verification ───────────────────────────────
    const verifiedUser = await verifyRequest(req);
    if (!verifiedUser) {
      return NextResponse.json(
        { error: "Unauthorized. You need to be logged in, bestie 💅" },
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

    // ─── Package Lookup ───────────────────────────────────────────
    const pkg = getPackageById(packageId);
    if (!pkg) {
      return NextResponse.json(
        { error: `Unknown package: ${packageId}` },
        { status: 400 }
      );
    }

    if (!pkg.productId) {
      return NextResponse.json(
        { error: `Polar Product ID not configured for package: ${packageId}. Check your env vars.` },
        { status: 500 }
      );
    }

    // ─── Build URLs ───────────────────────────────────────────────
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const successUrl = `${appUrl}/payment-success?session_id={CHECKOUT_ID}`;

    // ─── Create Polar Checkout Session ────────────────────────────
    const checkoutPayload = {
      products: [pkg.productId],
      successUrl,
      cancelUrl: `${appUrl}/settings`,
      metadata: {
        firebaseUid: verifiedUser.uid,
        packageId: pkg.id,
        packageType: pkg.type,
        tokens: String(pkg.tokens || 0),
        vipDays: String(pkg.vipDays || 0),
      },
    };

    console.log("[Polar Checkout] Creating session with payload:", JSON.stringify(checkoutPayload, null, 2));

    const checkout = await polar.checkouts.create(checkoutPayload);

    console.log(
      `[Polar Checkout] Session created for UID:${verifiedUser.uid} pkg:${packageId} checkout:${checkout.id}`
    );

    return NextResponse.json({ url: checkout.url });
  } catch (error: any) {
    console.error("[Polar Checkout] ❌ Error details:", {
      message: error?.message,
      name: error?.name,
      response: error?.response?.data || error?.response,
      stack: error?.stack,
    });

    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
