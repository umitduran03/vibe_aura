"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { saveUserPreferences } from "@/lib/auth";

/**
 * OnboardingBanner — Sayfanın en tepesinde yer alan yapışkan profil tamamlama banner'ı.
 * Modal gibi ekranı engellemez; kullanıcı istediği zaman genişletip tercihleri seçer.
 * Tercihler Firestore'a yazıldıktan sonra banner otomatik kaybolur.
 */
export default function OnboardingBanner() {
  const userId = useAppStore((s) => s.userId);
  const isPreferencesLoaded = useAppStore((s) => s.isPreferencesLoaded);
  const gender = useAppStore((s) => s.gender);
  const preference = useAppStore((s) => s.preference);

  const [isExpanded, setIsExpanded] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Görünürlük: Kullanıcı giriş yapmış + veri yüklenmiş + gender VEYA preference eksik
  const isVisible = !!userId && isPreferencesLoaded && (!gender || !preference);

  const handleComplete = async (pref: string) => {
    if (!userId || !selectedGender) return;
    setIsSubmitting(true);
    try {
      await saveUserPreferences(userId, selectedGender, pref);
      // Firestore onSnapshot otomatik olarak güncelleyecek -> banner kapanacak
    } catch (error) {
      console.error("Failed to save preferences:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="onboarding-banner"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
          className="relative z-[100] w-full"
        >
          {/* === COLLAPSED TEASER === */}
          {!isExpanded && (
            <motion.button
              key="teaser"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(true)}
              className="w-full cursor-pointer border-b border-purple-500/30 overflow-hidden"
              style={{
                background: "linear-gradient(90deg, rgba(15,5,30,1) 0%, rgba(30,10,50,1) 50%, rgba(15,5,30,1) 100%)",
                WebkitTapHighlightColor: "transparent"
              }}
            >
              {/* Animated glow pulse */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(168,85,247,0.15) 50%, transparent 100%)",
                }}
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              />

              <div className="relative px-4 py-3 flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] sm:text-[13px] text-white/90 font-medium tracking-wide">
                    Before we start, let's clear a few things up... ✨
                  </span>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0 pl-2">
                  <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider hidden sm:block">Tap to complete your profile</span>
                  <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider sm:hidden">Tap</span>
                  <motion.div
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ChevronDown className="h-4 w-4 text-purple-400" />
                  </motion.div>
                </div>
              </div>
            </motion.button>
          )}

          {/* === EXPANDED FORM === */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                key="expanded-form"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="overflow-hidden border-b border-purple-500/20"
                style={{
                  background: "linear-gradient(180deg, rgba(15,5,25,1) 0%, rgba(5,5,10,1) 100%)"
                }}
              >
                <div className="relative px-5 pt-5 pb-6">
                  {/* Background glow orbs */}
                  <div
                    className="absolute -top-6 right-0 w-[150px] h-[100px] rounded-full pointer-events-none"
                    style={{
                      background: "radial-gradient(ellipse, rgba(168,85,247,0.15) 0%, transparent 70%)",
                      filter: "blur(20px)",
                    }}
                  />

                  {/* Close / collapse */}
                  <motion.button
                    onClick={() => setIsExpanded(false)}
                    className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 border border-white/10 cursor-pointer"
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronDown className="h-4 w-4 text-white/50 rotate-180" />
                  </motion.button>

                  {/* Title */}
                  <div className="relative z-10 mb-6 max-w-[90%]">
                    <h2 className="text-[18px] font-bold tracking-tight text-white/95 leading-snug">
                      Before we start, let's clear a few things up...
                    </h2>
                    <p className="text-[13px] text-white/50 mt-1.5">
                      We wouldn't want any accidents during the analysis, right? 😅
                    </p>
                  </div>

                  {/* Steps */}
                  <div className="relative z-10">
                    <AnimatePresence mode="wait">
                      {step === 1 ? (
                        <motion.div
                          key="banner-step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-3"
                        >
                          <h3 className="text-[14px] font-semibold text-white/70">I am a...</h3>
                          <div className="flex flex-col gap-2">
                            {[
                              { label: "Guy 🧢", value: "Guy" },
                              { label: "Girl 💅", value: "Girl" },
                              { label: "Icon ✨", value: "Icon" },
                            ].map((opt) => (
                              <motion.button
                                key={opt.value}
                                onClick={() => {
                                  setSelectedGender(opt.value);
                                  setStep(2);
                                }}
                                className="flex-1 py-3 px-2 rounded-xl text-[14px] font-medium transition-all duration-200 active:scale-[0.96] cursor-pointer"
                                style={{
                                  background: "rgba(255,255,255,0.03)",
                                  border: "1px solid rgba(168,85,247,0.2)",
                                  color: "rgba(255,255,255,0.9)"
                                }}
                                whileHover={{
                                  background: "rgba(168,85,247,0.1)",
                                  borderColor: "rgba(168,85,247,0.4)",
                                }}
                                whileTap={{ scale: 0.96 }}
                              >
                                {opt.label}
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="banner-step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-3"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-[14px] font-semibold text-white/70">I usually overanalyze...</h3>
                            <button
                              onClick={() => setStep(1)}
                              className="text-[12px] text-purple-400/80 hover:text-purple-400 transition-colors cursor-pointer"
                            >
                              ← Back
                            </button>
                          </div>
                          <div className="flex flex-col gap-2">
                            {[
                              { label: "Guys 🚩", value: "Guys" },
                              { label: "Girls ☕", value: "Girls" },
                              { label: "Everyone 🍿", value: "Everyone" },
                            ].map((opt) => (
                              <motion.button
                                key={opt.value}
                                onClick={() => handleComplete(opt.value)}
                                disabled={isSubmitting}
                                className="flex-1 py-3 px-2 rounded-xl text-[14px] font-medium transition-all duration-200 active:scale-[0.96] cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                                style={{
                                  background: "rgba(255,255,255,0.03)",
                                  border: "1px solid rgba(168,85,247,0.2)",
                                  color: "rgba(255,255,255,0.9)"
                                }}
                                whileHover={{
                                  background: "rgba(168,85,247,0.1)",
                                  borderColor: "rgba(168,85,247,0.4)",
                                }}
                                whileTap={{ scale: 0.96 }}
                              >
                                {isSubmitting && selectedGender ? "..." : opt.label}
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
