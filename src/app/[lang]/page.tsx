"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, LazyMotion, m } from "framer-motion";

const loadFeatures = () =>
  import("framer-motion").then((mod) => mod.domAnimation);

// ─── Kritik yol: ilk render'da hemen gösterilecekler ───
import AuthProvider from "@/components/AuthProvider";
import SplashScreen from "@/components/SplashScreen";
import OnboardingBanner from "@/components/OnboardingBanner";

// ─── Lazy: Splash sırasında arka planda prefetch edilecekler ───
const WizardFlow = dynamic(() => import("@/components/WizardFlow"), { ssr: false });
const AnalyzingScreen = dynamic(() => import("@/components/AnalyzingScreen"), { ssr: false });
const ResultCard = dynamic(() => import("@/components/ResultCard"), { ssr: false });
const DuoResultCard = dynamic(() => import("@/components/DuoResultCard"), { ssr: false });
const ExtrasResultCard = dynamic(() => import("@/components/ExtrasResultCard"), { ssr: false });
const OnboardingScreen = dynamic(() => import("@/components/OnboardingScreen"), { ssr: false });

// ─── Lazy: Modal bileşenler — sadece açıldıklarında yüklenecekler ───
const TokenModal = dynamic(() => import("@/components/TokenModal"), { ssr: false });
const ExtrasModal = dynamic(() => import("@/components/ExtrasModal"), { ssr: false });
const ExtrasShowcaseModal = dynamic(() => import("@/components/ExtrasShowcaseModal"), { ssr: false });
const StreakRecoveryModal = dynamic(() => import("@/components/StreakRecoveryModal"), { ssr: false });
const StreakInfoModal = dynamic(() => import("@/components/StreakInfoModal"), { ssr: false });
const NotificationPrompt = dynamic(() => import("@/components/NotificationPrompt"), { ssr: false });

import { useAppStore } from "@/store/useAppStore";
import { useStreakStore } from "@/store/useStreakStore";
import { auth } from "@/lib/firebase";
import { useT } from "@/hooks/useT";

export default function Home() {
  const screen = useAppStore((s) => s.currentScreen);
  const setScreen = useAppStore((s) => s.setScreen);
  const setLocale = useAppStore((s) => s.setLocale);
  const locale = useAppStore((s) => s.locale);

  // Pathname'den locale'yi tespit et ve store'a yaz
  useEffect(() => {
    const pathLocale = window.location.pathname.startsWith("/tr") ? "tr" : "en";
    setLocale(pathLocale);
  }, [setLocale]);
  
  const analysisMode = useAppStore((s) => s.analysisMode);
  const soloScenario = useAppStore((s) => s.soloScenario);
  const userData = useAppStore((s) => s.userData);
  const photoUrl = useAppStore((s) => s.photoUrl);
  const setPhotoUrl = useAppStore((s) => s.setPhotoUrl);
  
  const duoPerson1 = useAppStore((s) => s.duoPerson1);
  const duoPerson2 = useAppStore((s) => s.duoPerson2);
  const duoRelationType = useAppStore((s) => s.duoRelationType);
  const updateDuoPerson1 = useAppStore((s) => s.updateDuoPerson1);
  const updateDuoPerson2 = useAppStore((s) => s.updateDuoPerson2);
  
  const setAuraResult = useAppStore((s) => s.setAuraResult);
  const setDuoResult = useAppStore((s) => s.setDuoResult);
  const setIsAnalyzing = useAppStore((s) => s.setIsAnalyzing);
  const tokenBalance = useAppStore((s) => s.tokenBalance);
  const setTokenBalance = useAppStore((s) => s.setTokenBalance);
  const userId = useAppStore((s) => s.userId);
  const isTokenModalOpen = useAppStore((s) => s.isTokenModalOpen);
  const setTokenModalOpen = useAppStore((s) => s.setTokenModalOpen);

  // Extras
  const extrasAnalysisTrigger = useAppStore((s) => s.extrasAnalysisTrigger);
  const extrasType = useAppStore((s) => s.extrasType);
  const extrasFormData = useAppStore((s) => s.extrasFormData);
  const setExtrasResult = useAppStore((s) => s.setExtrasResult);
  const setExtrasModalOpen = useAppStore((s) => s.setExtrasModalOpen);

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const t = useT();

  // JS ayaklandığında (React render edildiğinde) Global CSS loader'ı sil
  useEffect(() => {
    const loader = document.getElementById("global-loader");
    if (loader) {
      loader.style.opacity = "0";
      setTimeout(() => loader.remove(), 600);
    }
  }, []);

  // Splash → Onboarding after 1.8 seconds
  // Splash gösterilirken ağır chunk'ları arka planda indir (prefetch)
  useEffect(() => {
    if (screen === "splash") {
      // Splash'in 3 saniyesini kullanarak kritik bileşenleri önceden indir
      // Kullanıcı onboarding'i bitirdiğinde WizardFlow anında açılır
      import("@/components/WizardFlow");
      import("@/components/AnalyzingScreen");
      import("@/components/ResultCard");
      import("@/components/DuoResultCard");
      import("@/lib/services"); // Groq'un hızını kesmemek için bunu da prefetch et

      const timer = setTimeout(() => setScreen("onboarding"), 1800);
      return () => clearTimeout(timer);
    }
  }, [screen, setScreen]);


  const isConnecting = useAppStore((s) => s.isConnecting);
  const [prevIsConnecting, setPrevIsConnecting] = useState(false);

  // Login Success Toast — ONLY after isConnecting becomes false
  useEffect(() => {
    if (prevIsConnecting && !isConnecting && userId) {
      setToast({ message: t.toastWelcome, type: "success" });
      setTimeout(() => setToast(null), 4000);
    }
    setPrevIsConnecting(isConnecting);
  }, [isConnecting, prevIsConnecting, userId]);

  // ===== EXTRAS ANALYSIS TRIGGER =====
  useEffect(() => {
    if (extrasAnalysisTrigger === 0) return;
    if (!extrasType || !extrasFormData) return;

    const runExtras = async () => {
      setExtrasModalOpen(false);
      setScreen("analyzing");
      setIsAnalyzing(true);

      try {
        const { analyzeExtras, saveExtrasSession } = await import("@/lib/services");
        const result = await analyzeExtras(userId, extrasType, extrasFormData, locale);
        setExtrasResult(result);
        useStreakStore.getState().triggerAnalysis();
        setScreen("extras-result");

        // Kaydet
        try {
          await saveExtrasSession(userId, extrasType, extrasFormData, result);
        } catch (firestoreErr) {
          console.error("Database Error:", firestoreErr);
        }

        // Backend token düşürüyor. Client bakiyesini senkronize edelim
        if (userId && auth.currentUser) {
          try {
            const { doc, getDoc } = await import("firebase/firestore");
            const { db } = await import("@/lib/firebase");
            const snap = await getDoc(doc(db, "users", userId));
            if (snap.exists()) setTokenBalance(snap.data()?.token_balance ?? 0);
          } catch (_) { /* silent */ }
        }
      } catch (err: any) {
        console.error("[Extras] Analysis failed:", err);
        const msg = err?.message || "";
        if (msg.includes("402")) {
          setToast({ message: t.toastTokenInsufficient, type: "error" });
        } else {
          setToast({ message: t.toastServerBusy, type: "error" });
        }
        setTimeout(() => setToast(null), 4000);
        useAppStore.getState().resetWizard();
      } finally {
        setIsAnalyzing(false);
      }
    };

    runExtras();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extrasAnalysisTrigger]);

  const handleWizardComplete = async () => {
    // ===== DYNAMIC PRICING =====
    const tokenCost = analysisMode === "duo" ? 3 : 1;
    const vipExpiry = useAppStore.getState().vipExpiry;
    const isVipActive = vipExpiry ? new Date(vipExpiry) > new Date() : false;

    // ===== TOKEN GATE: Bakiye kontrolü =====
    // We no longer block the analysis here. If the user doesn't have enough tokens,
    // the backend will generate a censored (teaser) analysis.
    // However, if they are out of tokens and click "Unlock", that's handled elsewhere.

    setScreen("analyzing");
    setIsAnalyzing(true);
    useAppStore.getState().setExtrasType(null);
    
    try {
      if (analysisMode === "duo") {
        /* =====================
           DUO MODE
           ===================== */
        const { analyzeDuo, saveDuoSession } = await import("@/lib/services");
        const result = await analyzeDuo(userId, duoPerson1, duoPerson2, duoRelationType, locale);
        
        // Bellekteki fotoğrafları temizle
        updateDuoPerson1({ photoBase64: null });
        updateDuoPerson2({ photoBase64: null });
        
        // Firestore'a kaydet (userId eklenerek) - Sadece analiz KİLİTLİ DEĞİLSE
        if (result.isUnlocked !== false) {
          try {
            await saveDuoSession(userId, duoPerson1, duoPerson2, duoRelationType, result);
          } catch (firestoreErr) {
            console.error("Database Error:", firestoreErr);
          }
        }

        // ===== TOKEN DEDUCTION: ARTIK BACKEND'DE (route.ts) YAPILIYOR =====
        // Token düşürme işlemi /api/analyze içinde başarılı olursa yapılıyor.
        
        setDuoResult(result);
        useStreakStore.getState().triggerAnalysis();
        setScreen("result");

      } else {
        /* =====================
           SOLO MODE (mevcut akış)
           ===================== */
        // Fotoğraf referansını temizlemeden önce sakla
        const capturedPhoto = photoUrl;
        const { analyzeAura, saveAuraSession } = await import("@/lib/services");
        const result = await analyzeAura({ userId, ...userData, photoUrl, soloScenario, locale });
        
        // Bellekteki ağırlığı hemen temizle
        setPhotoUrl(null);
        
        // Firestore'a kaydet (userId + photoBase64 eklenerek) - Sadece analiz KİLİTLİ DEĞİLSE
        if (result.isUnlocked !== false) {
          try {
            await saveAuraSession(userId, userData, capturedPhoto, result);
          } catch (firestoreErr) {
            console.error("Database Error:", firestoreErr);
          }
        }

        // ===== TOKEN DEDUCTION: ARTIK BACKEND'DE (route.ts) YAPILIYOR =====
        // Token düşürme işlemi /api/analyze içinde başarılı olursa yapılıyor.

        setAuraResult(result);
        useStreakStore.getState().triggerAnalysis();
        setScreen("result");
      }
    } catch (err: any) {
      console.error("Analysis failed", err);
      
      const errMsg = err?.message || err?.toString() || "";
      if (errMsg.includes("503") || errMsg.includes("429") || errMsg.includes("high demand") || errMsg.includes("UNAVAILABLE")) {
        setToast({ message: t.toastServerBusy, type: "error" });
      } else {
        setToast({ message: t.toastServerBusy, type: "error" });
      }
      
      setTimeout(() => setToast(null), 4000);
      
      // Kullanıcıyı tamamen en başa (ana sayfaya) güvenle döndür
      useAppStore.getState().resetWizard();
      // Analiz başarısız olursa jeton düşMEZ — kullanıcı korunur
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <AuthProvider>
      <LazyMotion features={loadFeatures}>
        <main className="relative mx-auto w-full max-w-[430px] min-h-dvh overflow-hidden flex flex-col">
          <OnboardingBanner />
          <AnimatePresence mode="wait">
            {screen === "splash" && <SplashScreen key="splash" />}
            
            {screen === "onboarding" && <OnboardingScreen key="onboarding" />}
            
            {screen === "wizard" && (
              <WizardFlow key="wizard" onComplete={handleWizardComplete} />
            )}
            
            {screen === "analyzing" && <AnalyzingScreen key="analyzing" />}
            
            {screen === "result" && (
              analysisMode === "duo"
                ? <DuoResultCard key="duo-result" />
                : <ResultCard key="solo-result" />
            )}
            
            {screen === "extras-result" && (
              <ExtrasResultCard key="extras-result" />
            )}
          </AnimatePresence>


          {/* Token Gate Modal */}
          <TokenModal
            isOpen={isTokenModalOpen}
            onClose={() => setTokenModalOpen(false)}
          />

          {/* Extras Showcase Modal */}
          <ExtrasShowcaseModal />
          <StreakRecoveryModal />
          <StreakInfoModal />
          
          {/* Toast Bildirimleri */}
          <ExtrasModal />

          {/* Custom Toast */}
          <AnimatePresence>
            {toast && (
              <m.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[360px]"
              >
                <div className={`glass-panel border p-4 rounded-2xl flex items-center gap-3 w-full shadow-lg ${
                  toast.type === "success" 
                    ? "border-emerald-500/30 bg-emerald-500/10 shadow-emerald-500/20" 
                    : "border-red-500/30 bg-red-500/10 shadow-red-500/20"
                }`}>
                  <div className={`p-2 rounded-full ${
                    toast.type === "success" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                  }`}>
                    {toast.type === "success" ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    )}
                  </div>
                  <p className={`text-[14px] font-medium leading-snug flex-1 ${
                    toast.type === "success" ? "text-emerald-100" : "text-red-100"
                  }`}>
                    {toast.message}
                  </p>
                </div>
              </m.div>
            )}
          </AnimatePresence>

          {/* Cihaz Native Bildirim İsteği */}
          <NotificationPrompt />
        </main>
      </LazyMotion>
    </AuthProvider>
  );
}
