"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AuthProvider from "@/components/AuthProvider";
import SplashScreen from "@/components/SplashScreen";
import WizardFlow from "@/components/WizardFlow";
import ResultCard from "@/components/ResultCard";
import DuoResultCard from "@/components/DuoResultCard";
import AnalyzingScreen from "@/components/AnalyzingScreen";
import TokenModal from "@/components/TokenModal";
import NotificationPrompt from "@/components/NotificationPrompt";
import OnboardingScreen from "@/components/OnboardingScreen";
import { useAppStore } from "@/store/useAppStore";
import { analyzeAura, analyzeDuo, saveAuraSession, saveDuoSession } from "@/lib/services";
import { deductToken } from "@/lib/auth";
import { auth } from "@/lib/firebase";

export default function Home() {
  const screen = useAppStore((s) => s.currentScreen);
  const setScreen = useAppStore((s) => s.setScreen);
  
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

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Splash → Onboarding after 3 seconds
  useEffect(() => {
    if (screen === "splash") {
      const timer = setTimeout(() => setScreen("onboarding"), 3000);
      return () => clearTimeout(timer);
    }
  }, [screen, setScreen]);

  const isConnecting = useAppStore((s) => s.isConnecting);
  const [prevIsConnecting, setPrevIsConnecting] = useState(false);

  // Login Success Toast — ONLY after isConnecting becomes false
  useEffect(() => {
    if (prevIsConnecting && !isConnecting && userId) {
      setToast({ message: "5 Welcome Tokens Added! 🎁", type: "success" });
      setTimeout(() => setToast(null), 4000);
    }
    setPrevIsConnecting(isConnecting);
  }, [isConnecting, prevIsConnecting, userId]);

  const handleWizardComplete = async () => {
    // ===== DYNAMIC PRICING =====
    const tokenCost = analysisMode === "duo" ? 2 : 1;
    const vipExpiry = useAppStore.getState().vipExpiry;
    const isVipActive = vipExpiry ? new Date(vipExpiry) > new Date() : false;

    // ===== TOKEN GATE: Bakiye kontrolü =====
    if (!isVipActive && tokenBalance < tokenCost) {
      setTokenModalOpen(true);
      return; // Analiz KESİNLİKLE başlamaz
    }

    setScreen("analyzing");
    setIsAnalyzing(true);
    
    try {
      if (analysisMode === "duo") {
        /* =====================
           DUO MODE
           ===================== */
        const result = await analyzeDuo(userId, duoPerson1, duoPerson2, duoRelationType);
        
        // Bellekteki fotoğrafları temizle
        updateDuoPerson1({ photoBase64: null });
        updateDuoPerson2({ photoBase64: null });
        
        // Firestore'a kaydet (userId eklenerek)
        try {
          await saveDuoSession(userId, duoPerson1, duoPerson2, duoRelationType, result);
        } catch (firestoreErr) {
          console.error("Database Error:", firestoreErr);
        }

        // ===== TOKEN DEDUCTION: Başarılı analiz sonrası jeton düş =====
        if (userId && !isVipActive) {
          try {
            const idToken = await auth.currentUser?.getIdToken();
            await fetch("/api/spend-token", {
              method: "POST",
              headers: { 
                "Content-Type": "application/json",
                ...(idToken && { "Authorization": `Bearer ${idToken}` })
              },
              body: JSON.stringify({ userId, amount: tokenCost })
            });
            // Yerel state'i güncelle
            const updatedTokenBalance = useAppStore.getState().tokenBalance;
            setTokenBalance(updatedTokenBalance - tokenCost);
          } catch (tokenErr) {
            console.error("Token deduction error:", tokenErr);
          }
        }

        setDuoResult(result);
        setScreen("result");

      } else {
        /* =====================
           SOLO MODE (mevcut akış)
           ===================== */
        // Fotoğraf referansını temizlemeden önce sakla
        const capturedPhoto = photoUrl;
        const result = await analyzeAura({ userId, ...userData, photoUrl, soloScenario });
        
        // Bellekteki ağırlığı hemen temizle
        setPhotoUrl(null);
        
        // Firestore'a kaydet (userId + photoBase64 eklenerek)
        try {
          await saveAuraSession(userId, userData, capturedPhoto, result);
        } catch (firestoreErr) {
          console.error("Database Error:", firestoreErr);
        }

        // ===== TOKEN DEDUCTION: Başarılı analiz sonrası jeton düş =====
        if (userId && !isVipActive) {
          try {
            const idToken = await auth.currentUser?.getIdToken();
            await fetch("/api/spend-token", {
              method: "POST",
              headers: { 
                "Content-Type": "application/json",
                ...(idToken && { "Authorization": `Bearer ${idToken}` })
              },
              body: JSON.stringify({ userId, amount: tokenCost })
            });
            // Yerel state'i güncelle
            const updatedTokenBalance = useAppStore.getState().tokenBalance;
            setTokenBalance(updatedTokenBalance - tokenCost);
          } catch (tokenErr) {
            console.error("Token deduction error:", tokenErr);
          }
        }

        setAuraResult(result);
        setScreen("result");
      }
    } catch (err: any) {
      console.error("Analysis failed", err);
      
      const errMsg = err?.message || err?.toString() || "";
      if (errMsg.includes("503") || errMsg.includes("429") || errMsg.includes("high demand") || errMsg.includes("UNAVAILABLE")) {
        setToast({ message: "Cosmic energies are too dense right now. Please try again in a moment. ✨", type: "error" });
      } else {
        setToast({ message: "Cosmic energies are too dense right now. Please try again in a moment. ✨", type: "error" });
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
      <main className="relative mx-auto w-full max-w-[430px] min-h-dvh overflow-hidden">
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
        </AnimatePresence>

        {/* Token Gate Modal — her zaman render, AnimatePresence ile göster/gizle */}
        <TokenModal
          isOpen={isTokenModalOpen}
          onClose={() => setTokenModalOpen(false)}
        />

        {/* Custom Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cihaz Native Bildirim İsteği */}
        <NotificationPrompt />
      </main>
    </AuthProvider>
  );
}
