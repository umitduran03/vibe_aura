"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WifiOff } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

export default function OfflineBanner() {
  const isOnline = useAppStore((s) => s.isOnline);
  const setIsOnline = useAppStore((s) => s.setIsOnline);

  useEffect(() => {
    // Capacitor Network plugin veya browser API
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // İlk durum
    setIsOnline(navigator.onLine);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Capacitor Network plugin'i varsa onu da dinle
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

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-foreground"
          style={{
            background:
              "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(192,132,252,0.15))",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <WifiOff className="h-4 w-4 text-red-400" />
          <span>Vibe signal lost, check your internet connection 🛸</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
