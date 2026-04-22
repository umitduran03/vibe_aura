"use client";

import { useEffect, useRef } from "react";
import { useAppStore } from "@/store/useAppStore";
import { signInAnon, ensureUserDoc, listenUserData } from "@/lib/auth";

/**
 * AuthProvider — Uygulama açıldığında çalışır:
 * 1. Anonim giriş yapar
 * 2. users/{uid} dökümanını oluşturur veya okur
 * 3. token_balance ve vipExpiry'yi gerçek zamanlı dinlemeye başlar
 * 
 * Çocuk bileşen render etmeden önce auth'u başlatır ama ekranı bloklamaz.
 */
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUserId = useAppStore((s) => s.setUserId);
  const setTokenBalance = useAppStore((s) => s.setTokenBalance);
  const setVipExpiry = useAppStore((s) => s.setVipExpiry);
  const unsubRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        // 1. Anonim giriş
        const user = await signInAnon();
        if (cancelled) return;

        // 2. Store'a uid yaz
        setUserId(user.uid);

        // 3. users koleksiyonunda dökümanı garanti et
        const balance = await ensureUserDoc(user.uid);
        if (cancelled) return;

        setTokenBalance(balance);

        // 4. Gerçek zamanlı dinleme başlat
        unsubRef.current = listenUserData(user.uid, ({ balance, vipExpiry }) => {
          setTokenBalance(balance);
          setVipExpiry(vipExpiry);
        });

      } catch (err) {
        console.error("[AuthProvider] Giriş hatası:", err);
      }
    }

    init();

    return () => {
      cancelled = true;
      unsubRef.current?.();
    };
  }, [setUserId, setTokenBalance, setVipExpiry]);

  return <>{children}</>;
}
