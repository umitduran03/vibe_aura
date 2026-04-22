/**
 * Vibe & Aura — Server-side API Auth Helper
 *
 * Extracts and verifies a Firebase ID token from the `Authorization: Bearer <token>` header.
 * Returns the verified UID or null if invalid/missing.
 */

import { NextRequest } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";

export interface VerifiedUser {
  uid: string;
}

/**
 * Verifies the Firebase ID token sent in the Authorization header.
 * Returns the verified user's UID, or null if verification fails.
 */
export async function verifyRequest(req: NextRequest): Promise<VerifiedUser | null> {
  if (!adminAuth) {
    console.error("[API Auth] adminAuth is not initialized.");
    return null;
  }

  const authHeader = req.headers.get("authorization") || "";
  const match = authHeader.match(/^Bearer\s+(.+)$/i);

  if (!match || !match[1]) {
    console.warn("[API Auth] Missing or malformed Authorization header.");
    return null;
  }

  const idToken = match[1];

  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    return { uid: decodedToken.uid };
  } catch (error) {
    console.warn("[API Auth] ID token verification failed:", error);
    return null;
  }
}
