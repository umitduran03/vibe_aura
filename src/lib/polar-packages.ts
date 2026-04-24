/**
 * Vibe & Aura — Polar.sh Package Configuration
 *
 * Maps internal package IDs to Polar Product IDs and fulfillment details.
 * Shared between the Checkout route (session creation) and Webhook route (fulfillment).
 *
 * ENV VARS REQUIRED (set in .env.local):
 *   POLAR_PRODUCT_TOKEN_ROOKIE
 *   POLAR_PRODUCT_TOKEN_CHAOS
 *   POLAR_PRODUCT_TOKEN_MASTER
 *   POLAR_PRODUCT_VIP_WEEKLY
 *   POLAR_PRODUCT_VIP_MONTHLY
 *   POLAR_PRODUCT_VIP_LIFETIME
 */

export type PackageType = "token" | "vip";

export interface PolarPackageConfig {
  /** Internal package ID (matches TokenModal.tsx) */
  id: string;
  /** Polar Product ID (from environment / Polar dashboard) */
  productId: string;
  /** "token" for consumable token packs, "vip" for subscription/one-time VIP */
  type: PackageType;
  /** Number of tokens to award (only for type: "token") */
  tokens?: number;
  /** VIP duration in days (only for type: "vip") */
  vipDays?: number;
  /** Human-readable label for dashboard */
  label: string;
}

/**
 * Returns the full package config map.
 * Uses static property access for NEXT_PUBLIC_ env vars to ensure Next.js inlining.
 */
export function getPolarPackages(): Record<string, PolarPackageConfig> {
  return {
    token_rookie: {
      id: "token_rookie",
      productId: process.env.NEXT_PUBLIC_POLAR_PRODUCT_ID_ROOKIE || "",
      type: "token",
      tokens: 10,
      label: "Rookie Gossip — 10 Tokens",
    },
    token_chaos: {
      id: "token_chaos",
      productId: process.env.NEXT_PUBLIC_POLAR_PRODUCT_ID_CHAOS || "",
      type: "token",
      tokens: 50,
      label: "Chaos Bringer — 50 Tokens",
    },
    token_master: {
      id: "token_master",
      productId: process.env.NEXT_PUBLIC_POLAR_PRODUCT_ID_MASTER || "",
      type: "token",
      tokens: 150,
      label: "Aura Master — 150 Tokens",
    },
    aura_vip: {
      id: "aura_vip",
      productId: process.env.NEXT_PUBLIC_POLAR_PRODUCT_ID_VIP || "",
      type: "vip",
      vipDays: 7,
      label: "Aura VIP — Weekly Unlimited",
    },
    mcs_monthly: {
      id: "mcs_monthly",
      productId: process.env.NEXT_PUBLIC_POLAR_PRODUCT_ID_MCS || "",
      type: "vip",
      vipDays: 30,
      label: "Main Character Syndrome — Monthly Unlimited",
    },
    god_mode_lifetime: {
      id: "god_mode_lifetime",
      productId: process.env.NEXT_PUBLIC_POLAR_PRODUCT_ID_GOD || "",
      type: "vip",
      vipDays: 36500, // ~100 years
      label: "God Mode — Lifetime",
    },
  };
}

/**
 * Looks up a package by its internal ID.
 */
export function getPackageById(packageId: string): PolarPackageConfig | null {
  const packages = getPolarPackages();
  return packages[packageId] || null;
}
