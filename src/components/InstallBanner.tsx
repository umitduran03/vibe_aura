"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { hapticLight, hapticMedium } from "@/lib/haptics";
import { usePWA } from "@/hooks/usePWA";
import { useT } from "@/hooks/useT";

export default function InstallBanner() {
  usePWA();
  const t = useT();
  const isInstallable = useAppStore((s) => s.isInstallable);
  const hasDismissed = useAppStore((s) => s.hasDismissedInstall);
  const setHasDismissed = useAppStore((s) => s.setHasDismissedInstall);
  const deferredPrompt = useAppStore((s) => s.deferredPrompt);
  const setIsInstallable = useAppStore((s) => s.setIsInstallable);

  const [isStandalone, setIsStandalone] = useState(false);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsStandalone(window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone);
    }
  }, []);

  const handleInstall = async () => {
    hapticMedium();
    if (!deferredPrompt) {
      alert(useAppStore.getState().locale === "tr" 
        ? "Bu cihazda otomatik yükleme desteklenmiyor veya uygulama zaten yüklü! 📱\n\nTarayıcınızın 'Paylaş' veya 'Seçenekler (⋮)' menüsünden 'Ana Ekrana Ekle' (Add to Home Screen) seçeneğine dokunarak yükleyebilirsiniz."
        : "Automatic installation is not supported on this device or the app is already installed! 📱\n\nYou can install it by tapping 'Add to Home Screen' from your browser's 'Share' or 'Options (⋮)' menu.");
      return;
    }

    // Show the native prompt
    deferredPrompt.prompt();

    // Wait for the user to respond
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
      setIsInstallable(false);
    } else {
      console.log("User dismissed the install prompt");
    }
  };

  const handleDismiss = () => {
    hapticLight();
    setHasDismissed(true);
  };

  const isVisible = !isStandalone && !hasDismissed;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed bottom-6 left-4 right-4 z-[999] backdrop-blur-2xl rounded-2xl p-4 flex items-center justify-between gap-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/10"
          style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(236,72,153,0.15) 100%)" }}
        >
          <div className="flex-1">
            <h3 className="text-white font-bold text-[14px]">{t.installTitle}</h3>
            <p className="text-white/60 text-[11px] font-medium mt-0.5 tracking-wide">{t.installSub}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleInstall}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-3.5 py-2 rounded-xl text-[12px] font-bold transition-all shadow-sm flex items-center gap-1.5 active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              {t.installBtn}
            </button>
            <button
              onClick={handleDismiss}
              aria-label={useAppStore.getState().locale === "tr" ? "Kapat" : "Close"}
              className="p-2 text-white/50 hover:text-white bg-black/20 hover:bg-black/40 rounded-xl transition-all active:scale-90"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
