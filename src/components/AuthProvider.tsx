"use client";

import { useEffect, useRef } from "react";
import { useAppStore } from "@/store/useAppStore";
import { onAuthChange, ensureUserDoc, listenUserData } from "@/lib/auth";

/**
 * AuthProvider — Auth dinleyicisini yönetir.
 * 1. Auth state değişimini dinler.
 * 2. Giriş yapılmışsa dökümanı garanti eder ve dinlemeyi başlatır.
 * 3. Giriş yoksa store'u temizler.
 */
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUserId = useAppStore((s) => s.setUserId);
  const setTokenBalance = useAppStore((s) => s.setTokenBalance);
  const setVipExpiry = useAppStore((s) => s.setVipExpiry);
  const setBalanceLoaded = useAppStore((s) => s.setBalanceLoaded);
  const unsubRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthChange(async (user) => {
      // Önceki dinlemeyi temizle
      unsubRef.current?.();
      unsubRef.current = null;

      if (user) {
        if (user.isAnonymous) {

          import("@/lib/auth").then((m) => m.logOut());
          return;
        }


        setUserId(user.uid);

        try {
          // Firestore dökümanını garanti et
          const balance = await ensureUserDoc(user);
          setTokenBalance(balance);

          // Gerçek zamanlı dinleme başlat
          unsubRef.current = listenUserData(user.uid, ({ balance, vipExpiry }) => {
            setTokenBalance(balance);
            setVipExpiry(vipExpiry);
          });
        } catch (err) {
          console.error("[AuthProvider] User doc error:", err);
        }
      } else {

        setUserId(null);
        setTokenBalance(0);
        setBalanceLoaded(false);
        setVipExpiry(null);
      }
    });

    return () => {
      unsubscribeAuth();
      unsubRef.current?.();
    };
  }, [setUserId, setTokenBalance, setVipExpiry, setBalanceLoaded]);

  return <>{children}</>;
}
