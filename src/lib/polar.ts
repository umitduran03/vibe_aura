// ============================================
// VibeCheckr — Polar SDK Client (Server-Side)
// ============================================
// All product IDs and secrets are read from environment variables.
// This file must ONLY be imported in server-side code (API routes).

import { Polar } from "@polar-sh/sdk";

if (!process.env.POLAR_ACCESS_TOKEN) {
  console.warn("[Polar] POLAR_ACCESS_TOKEN is not set. Polar payments will not work.");
}

export const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
});

/**
 * Maps internal package IDs to their corresponding Polar Product IDs
 * stored in environment variables. Returns undefined if not configured.
 */
export function getPolarProductId(packageId: string): string | undefined {
  const PRODUCT_MAP: Record<string, string | undefined> = {
    // Token packages
    token_rookie: process.env.POLAR_PRODUCT_TOKEN_ROOKIE,
    token_chaos: process.env.POLAR_PRODUCT_TOKEN_CHAOS,
    token_master: process.env.POLAR_PRODUCT_TOKEN_MASTER,
    // VIP packages
    aura_vip: process.env.POLAR_PRODUCT_VIP_WEEKLY,
    mcs_monthly: process.env.POLAR_PRODUCT_VIP_MONTHLY,
    god_mode_lifetime: process.env.POLAR_PRODUCT_VIP_LIFETIME,
  };

  return PRODUCT_MAP[packageId];
}

/**
 * Token amounts for each package — used by webhook to credit the correct amount.
 */
export const TOKEN_AMOUNTS: Record<string, number> = {
  token_rookie: 10,
  token_chaos: 50,
  token_master: 150,
};

/**
 * VIP durations in days for each VIP package.
 */
export const VIP_DURATIONS: Record<string, number> = {
  aura_vip: 7,
  mcs_monthly: 30,
  god_mode_lifetime: 36500, // ~100 years
};

/**
 * Reverse-maps a Polar Product ID back to our internal package ID.
 * Used by the webhook handler to determine what was purchased.
 */
export function getPackageIdFromPolarProduct(polarProductId: string): string | null {
  const entries = Object.entries({
    token_rookie: process.env.POLAR_PRODUCT_TOKEN_ROOKIE,
    token_chaos: process.env.POLAR_PRODUCT_TOKEN_CHAOS,
    token_master: process.env.POLAR_PRODUCT_TOKEN_MASTER,
    aura_vip: process.env.POLAR_PRODUCT_VIP_WEEKLY,
    mcs_monthly: process.env.POLAR_PRODUCT_VIP_MONTHLY,
    god_mode_lifetime: process.env.POLAR_PRODUCT_VIP_LIFETIME,
  });

  for (const [pkgId, envProductId] of entries) {
    if (envProductId && envProductId === polarProductId) {
      return pkgId;
    }
  }

  return null;
}
