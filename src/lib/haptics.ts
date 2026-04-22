// ============================================
// Vibe & Aura — Capacitor Haptics Wrapper
// ============================================
// Web'de sessiz fallback, native'de gerçek titreşim.

import { Haptics, ImpactStyle } from "@capacitor/haptics";

/**
 * Hafif dokunma titreşimi — buton basma, kart seçme.
 */
export async function hapticLight(): Promise<void> {
  try {
    await Haptics.impact({ style: ImpactStyle.Light });
  } catch {
    // Web ortamında sessiz fallback
  }
}

/**
 * Orta titreşim — form gönderme, önemli aksiyon.
 */
export async function hapticMedium(): Promise<void> {
  try {
    await Haptics.impact({ style: ImpactStyle.Medium });
  } catch {
    // Web ortamında sessiz fallback
  }
}

/**
 * Güçlü titreşim — sonuç ekranı, başarı.
 */
export async function hapticHeavy(): Promise<void> {
  try {
    await Haptics.impact({ style: ImpactStyle.Heavy });
  } catch {
    // Web ortamında sessiz fallback
  }
}

/**
 * Bildirim titreşimi — uyarı, hata.
 */
export async function hapticNotification(): Promise<void> {
  try {
    await Haptics.notification({ type: "WARNING" as never });
  } catch {
    // Web ortamında sessiz fallback
  }
}
