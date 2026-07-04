"use client";

import { useAppStore } from "@/store/useAppStore";
import dynamic from "next/dynamic";

const DesktopAdBanner = dynamic(() => import("@/components/DesktopAdBanner"), { ssr: false });
const StickyAdBanner = dynamic(() => import("@/components/StickyAdBanner"), { ssr: false });

/**
 * AdBannerController — Reklamları yalnızca içerik olan ekranlarda gösterir.
 *
 * Google AdSense politikası: "Yayıncı içeriği olmayan ekranlarda reklam gösterilemez."
 * Splash ve Onboarding ekranları içerik değil, sistem ekranlarıdır.
 * Bu bileşen store'u dinleyerek reklamları bu ekranlarda tamamen DOM'dan kaldırır.
 */
export default function AdBannerController() {
  const screen = useAppStore((s) => s.currentScreen);

  // Splash ve onboarding sırasında reklamları hiç yükleme
  if (screen === "splash" || screen === "onboarding") {
    return null;
  }

  return (
    <>
      <DesktopAdBanner />
      <StickyAdBanner />
    </>
  );
}
