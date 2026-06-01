"use client";

import { useEffect, useRef } from "react";
import { useAppStore } from "@/store/useAppStore";
import { onAuthChange, ensureUserDoc, listenUserData, handleRedirectResult } from "@/lib/auth";
import { useStreakStore } from "@/store/useStreakStore";

/**
 * AuthProvider — Auth dinleyicisini yönetir.
 *
 * Race Condition Fix (ITP Guard):
 * 1. ÖNCE redirect sonucunu çöz (Safari ITP loop kırıcı)
 * 2. SONRA onAuthStateChanged dinleyicisini başlat
 * 3. İlk auth state callback'i geldiğinde kilidi aç
 *
 * Firestore Terms Guard:
 * - Kullanıcı giriş yaptığında users/{uid}.hasAcceptedTerms kontrol edilir
 * - Bu bilgi Zustand'a yazılır ve UI katmanı buna göre yönlendirilir
 */
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUserId = useAppStore((s) => s.setUserId);
  const setTokenBalance = useAppStore((s) => s.setTokenBalance);
  const setVipExpiry = useAppStore((s) => s.setVipExpiry);
  const setBalanceLoaded = useAppStore((s) => s.setBalanceLoaded);
  const setAuthSettling = useAppStore((s) => s.setAuthSettling);
  const setHasAcceptedTerms = useAppStore((s) => s.setHasAcceptedTerms);
  const unsubRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    let isMounted = true;
    let unsubscribeAuth: (() => void) | undefined;

    async function initAuth() {
      // 1️⃣ Redirect sonucunu ÖNCE çöz — bu bitmeden auth state dinlemeye BAŞLAMA
      try {
        await handleRedirectResult();
      } catch (err) {
        console.warn("[AuthProvider] Redirect result check failed:", err);
      }

      // 2️⃣ Redirect çözüldü — artık güvenle auth state dinleyebiliriz
      unsubscribeAuth = onAuthChange(async (user) => {
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

            const isPendingTerms = localStorage.getItem("pending_terms_accept") === "true";
            if (isPendingTerms) {
              localStorage.removeItem("pending_terms_accept");
              setHasAcceptedTerms(true); // Optimistik güncelleme (beklemeden)
              // Arka planda çalıştır, UI'ı bloklama
              import("@/lib/auth").then(({ acceptTerms }) => {
                acceptTerms(user.uid).catch(console.error);
              }).catch(console.error);
            }

            // Gerçek zamanlı dinleme başlat — hasAcceptedTerms de buradan gelir
            unsubRef.current = listenUserData(user.uid, ({ balance, vipExpiry, gender, preference, hasAcceptedTerms, streakCount, lastAnalysisDate, lostStreakCount }) => {
              setTokenBalance(balance);
              setVipExpiry(vipExpiry);
              useAppStore.getState().setUserPreferences(gender, preference);
              
              useStreakStore.setState((state) => ({
                streakCount: streakCount ?? state.streakCount,
                lastAnalysisDate: lastAnalysisDate ?? state.lastAnalysisDate,
                lostStreakCount: lostStreakCount ?? state.lostStreakCount,
              }));
              
              // Eğer optimistik olarak true yaptıysak ve veritabanı henüz güncellenmediyse (eski snapshot), UI'ın titremesini engelle
              if (isPendingTerms && !hasAcceptedTerms) {
                return;
              }
              setHasAcceptedTerms(!!hasAcceptedTerms);
            });
          } catch (err) {
            console.error("[AuthProvider] User doc error:", err);
          }
        } else {
          setUserId(null);
          setTokenBalance(0);
          setBalanceLoaded(false);
          setVipExpiry(null);
          setHasAcceptedTerms(null);
          useAppStore.getState().setUserPreferences(null, null);
          useAppStore.setState({ isPreferencesLoaded: false });
        }

        // 3️⃣ Auth state belirlendi — kilidi aç, UI'ı serbest bırak
        if (isMounted) {
          setAuthSettling(false);
        }
      });
    }

    initAuth();

    return () => {
      isMounted = false;
      unsubscribeAuth?.();
      unsubRef.current?.();
    };
  }, [setUserId, setTokenBalance, setVipExpiry, setBalanceLoaded, setAuthSettling, setHasAcceptedTerms]);

  return <>{children}</>;
}
