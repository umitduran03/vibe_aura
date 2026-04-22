/**
 * Vibe & Aura — Polar.sh SDK Initialization (Server-side only)
 *
 * Uses POLAR_ACCESS_TOKEN from environment variables.
 * This module should only be imported in API routes (server-side).
 *
 * @see https://docs.polar.sh
 */

import { Polar } from "@polar-sh/sdk";

if (!process.env.POLAR_ACCESS_TOKEN) {
  console.warn("[Polar] POLAR_ACCESS_TOKEN is not set. Payment features will not work.");
}

export const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN || "",
  // Use sandbox for development, switch to production for live
  ...(process.env.POLAR_ENVIRONMENT === "sandbox" ? { server: "sandbox" } : {}),
});
