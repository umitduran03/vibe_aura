"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Users, Flame, Siren, Gem, ChevronRight, X, ArrowRight, Check } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

const TOUR_STEPS = {
  en: [
    { id: "modes", title: "Your Aura & Duo Mode", desc: "Discover your own energy in Solo mode, or upload two photos in Duo mode to uncover relationship dynamics, compatibility, and red flags.", Icon: Users },
    { id: "daily", title: "Daily Vibe & Streaks", desc: "Check your Daily Vibe tailored to your zodiac. Keep your streak alive by coming back every day! Don't let the flame die.", Icon: Flame },
    { id: "extras", title: "Crisis Center (Extras)", desc: "Confused? Delulu? Need rizz? The 'Extras' menu at the bottom is your ultimate toolkit for complex life situations.", Icon: Siren },
    { id: "economy", title: "Tokens & History", desc: "Analyses cost Tokens. Top up from the Store (top-left), and review past vibes in History (top-right).", Icon: Gem },
  ],
  tr: [
    { id: "modes", title: "Senin Auran & Duo Modu", desc: "Solo modda kendi enerjini keşfet. Duo modunda ise iki fotoğraf yükleyerek uyumunuzu, toksik detayları ve kırmızı bayrakları (red flags) öğren.", Icon: Users },
    { id: "daily", title: "Günlük Vibe & Ateşi Koru", desc: "Burcuna özel hazırlanan Daily Vibe'ı oku. Her gün gelerek serini (Streak) koru ve alevini büyüt! Seriyi bozma.", Icon: Flame },
    { id: "extras", title: "Kriz Masası (Ekstralar)", desc: "Kafan mı karışık? Eski sevgiliye mesaj atılır mı? Delulu musun? Alt menüdeki Kriz Masası en karmaşık durumlarda seni bekliyor.", Icon: Siren },
    { id: "economy", title: "Jetonlar ve Geçmiş", desc: "Gerçeklerle yüzleşmek bedava değil! Analizler Jeton harcar. Sol üstten Mağazaya, sağ üstten eski yüzleşmelerine (Geçmiş) ulaşabilirsin.", Icon: Gem },
  ]
} as const;

export default function WelcomeTour() {
  const locale = useAppStore((s) => s.locale);
  const currentScreen = useAppStore((s) => s.currentScreen);
  const steps = TOUR_STEPS[locale];
  
  const [isVisible, setIsVisible] = useState(false);
  const [isGate, setIsGate] = useState(true); // Welcome Gate phase
  const [currentStep, setCurrentStep] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if they have seen it
    const hasSeen = localStorage.getItem("vibecheckr_has_seen_tour");
    if (!hasSeen) {
      // Delay slightly to allow the app to render behind it
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const completeTour = () => {
    setIsVisible(false);
    localStorage.setItem("vibecheckr_has_seen_tour", "true");
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      completeTour();
    }
  };

  if (!mounted || !isVisible || currentScreen !== "wizard") return null;

  const ActiveIcon = steps[currentStep].Icon;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Heavy Blur Backdrop */}
      <motion.div 
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-background/60"
        onClick={() => {}} // Block clicks to background
      />

      <AnimatePresence mode="wait">
        {isGate ? (
          /* ================= WELCOME GATE ================= */
          <motion.div
            key="gate"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -20 }}
            className="relative w-full max-w-[360px] glass-panel border border-white/10 rounded-3xl p-6 flex flex-col items-center overflow-hidden"
            style={{
              background: "linear-gradient(170deg, rgba(25,18,40,0.95) 0%, rgba(10,8,18,0.98) 100%)",
              boxShadow: "0 30px 60px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.1)",
            }}
          >
            {/* Ambient Glow */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/20 blur-[60px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-pink-500/20 blur-[60px] rounded-full pointer-events-none" />

            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 relative z-10">
              <Sparkles className="w-8 h-8 text-pink-400" />
            </div>

            <h2 className="text-2xl font-bold text-white text-center mb-2 relative z-10">
              {locale === "en" ? "Welcome to VibeCheckr" : "VibeCheckr'a Hoş Geldin"}
            </h2>
            <p className="text-[14px] text-white/60 text-center mb-8 relative z-10 leading-relaxed px-2">
              {locale === "en" 
                ? "Before we reveal the hidden truths, would you like a quick tour of what you can do here?" 
                : "Gerçeklerle yüzleşmeden önce, burada neler yapabileceğine dair hızlı bir tura çıkmak ister misin?"}
            </p>

            <div className="w-full flex flex-col gap-3 relative z-10">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsGate(false)}
                className="w-full py-3.5 rounded-xl text-[14px] font-bold text-white flex items-center justify-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                  boxShadow: "0 0 20px rgba(139,92,246,0.4)",
                }}
              >
                {locale === "en" ? "Start the Tour" : "Tura Başla"} <ArrowRight className="w-4 h-4" />
              </motion.button>
              
              <button
                onClick={completeTour}
                className="w-full py-3 text-[13px] font-semibold text-white/40 hover:text-white/70 transition-colors"
              >
                {locale === "en" ? "I already know everything (Skip)" : "Ben her şeyi biliyorum (Atla)"}
              </button>
            </div>
          </motion.div>
        ) : (
          /* ================= STORY TOUR CAROUSEL ================= */
          <motion.div
            key="tour"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-[360px] glass-panel border border-white/10 rounded-3xl p-6 flex flex-col"
            style={{
              background: "linear-gradient(170deg, rgba(25,18,40,0.95) 0%, rgba(10,8,18,0.98) 100%)",
              boxShadow: "0 30px 60px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.1)",
              minHeight: "340px"
            }}
          >
            {/* Story Progress Bars */}
            <div className="flex gap-1.5 w-full mb-6 z-10">
              {steps.map((_, idx) => (
                <div key={idx} className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    initial={{ width: idx < currentStep ? "100%" : "0%" }}
                    animate={{ width: idx < currentStep ? "100%" : idx === currentStep ? "100%" : "0%" }}
                    transition={{ duration: idx === currentStep ? 0.3 : 0 }}
                  />
                </div>
              ))}
            </div>

            <button 
              onClick={completeTour}
              className="absolute top-4 right-4 p-2 text-white/30 hover:text-white/60 transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10 py-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center w-full"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner">
                    <ActiveIcon className="w-8 h-8 text-pink-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{steps[currentStep].title}</h3>
                  <p className="text-[14px] text-white/60 leading-relaxed max-w-[280px]">
                    {steps[currentStep].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="w-full mt-4 z-10">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={nextStep}
                className="w-full py-3.5 rounded-xl text-[14px] font-bold text-white flex items-center justify-center gap-2"
                style={{
                  background: currentStep === steps.length - 1 
                    ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" 
                    : "rgba(255,255,255,0.08)",
                  border: currentStep === steps.length - 1 
                    ? "none"
                    : "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {currentStep === steps.length - 1 ? (
                  <>
                    <Check className="w-4 h-4" /> 
                    {locale === "en" ? "Let's Go!" : "Hadi Başlayalım!"}
                  </>
                ) : (
                  <>
                    {locale === "en" ? "Next" : "Sonraki"} 
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
