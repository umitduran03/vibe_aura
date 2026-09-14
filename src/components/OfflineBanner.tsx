"use client";

import { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { useT } from "@/hooks/useT";

/**
 * OfflineBanner — CSS animasyonlu versiyon.
 * 
 * Önceki: framer-motion import ediyordu → root layout'ta olduğu için
 * tüm framer-motion bundle'ı her sayfanın initial JS'ine giriyordu.
 * Şimdi: Sade CSS transition ile aynı animasyon, sıfır ek bundle.
 */
export default function OfflineBanner() {
  const isOnline = useAppStore((s) => s.isOnline);
  const setIsOnline = useAppStore((s) => s.setIsOnline);
  const t = useT();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    setIsOnline(navigator.onLine);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    let unsubscribe: (() => void) | null = null;
    (async () => {
      try {
        const { Network } = await import("@capacitor/network");
        const status = await Network.getStatus();
        setIsOnline(status.connected);

        const listener = await Network.addListener(
          "networkStatusChange",
          (s) => {
            setIsOnline(s.connected);
          }
        );
        unsubscribe = () => listener.remove();
      } catch {
        // Capacitor yoksa browser fallback zaten dinleniyor
      }
    })();

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      unsubscribe?.();
    };
  }, [setIsOnline]);

  const isVisible = mounted && !isOnline;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-foreground transition-all duration-300 ease-out"
      style={{
        background:
          "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(192,132,252,0.15))",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        transform: isVisible ? "translateY(0)" : "translateY(-60px)",
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      <WifiOff className="h-4 w-4 text-red-400" />
      <span>{t.offlineMsg}</span>
    </div>
  );
}
