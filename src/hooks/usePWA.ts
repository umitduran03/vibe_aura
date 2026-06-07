"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";

export function usePWA() {
  const setDeferredPrompt = useAppStore((s) => s.setDeferredPrompt);
  const setIsInstallable = useAppStore((s) => s.setIsInstallable);

  useEffect(() => {
    // Sadece client tarafında çalışır
    if (typeof window === "undefined") return;

    const handleBeforeInstallPrompt = (e: Event) => {
      // Tarayıcının varsayılan kurulum uyarısını engelle
      e.preventDefault();
      // Olayı state'e kaydet, böylece kendi butonumuzdan tetikleyebiliriz
      setDeferredPrompt(e);
      // Kurulabilir olduğunu (isInstallable) true yap, banner'ı göster
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      // Uygulama kurulduğunda state'leri temizle
      setIsInstallable(false);
      setDeferredPrompt(null);
      console.log("PWA was installed");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, [setDeferredPrompt, setIsInstallable]);
}
