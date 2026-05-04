"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { saveUserPreferences } from "@/lib/auth";

export default function OnboardingModal() {
  const userId = useAppStore((s) => s.userId);
  const isPreferencesLoaded = useAppStore((s) => s.isPreferencesLoaded);
  const gender = useAppStore((s) => s.gender);

  const [step, setStep] = useState(1);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ===== GÖRÜNÜRLÜK ŞARTI =====
  // Kullanıcı giriş yapmış + Firestore verisi yüklenmiş + gender hâlâ null
  const isVisible = !!userId && isPreferencesLoaded && !gender;

  // DEBUG — her render'da konsola bas
  useEffect(() => {
    console.log("🔵 ONBOARDING_MODAL_DEBUG:", {
      userId: userId ?? "null",
      isPreferencesLoaded,
      gender: gender ?? "null",
      isVisible,
    });
  }, [userId, isPreferencesLoaded, gender, isVisible]);

  const handleComplete = async (pref: string) => {
    if (!userId || !selectedGender) return;
    setIsSubmitting(true);
    try {
      await saveUserPreferences(userId, selectedGender, pref);
      // Firestore onSnapshot otomatik olarak gender'ı güncelleyecek → modal kapanacak
    } catch (error) {
      console.error("Failed to save preferences:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="onboarding-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[999] flex items-center justify-center"
          style={{
            pointerEvents: "auto",
            background: "radial-gradient(circle at top right, #1a1033 0%, #0a0a0c 50%, #120d1d 100%)",
          }}
        >
          <motion.div
            key="onboarding-modal-card"
            initial={{ scale: 0.92, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 24 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-[340px] mx-4 rounded-[32px] p-6 relative overflow-hidden border border-white/5"
            style={{
              background: "linear-gradient(145deg, rgba(22,10,40,0.97), rgba(12,8,28,0.98))",
              border: "1px solid rgba(168,85,247,0.18)",
              boxShadow: "0 0 60px rgba(168,85,247,0.12), 0 0 120px rgba(192,38,211,0.06), 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {/* Background glow */}
            {/* Top glow orb */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[250px] h-[150px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(168,85,247,0.25) 0%, rgba(192,38,211,0.1) 40%, transparent 70%)", filter: "blur(40px)" }} />
            {/* Bottom subtle accent */}
            <div className="absolute -bottom-8 right-0 w-[120px] h-[80px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(236,72,153,0.12) 0%, transparent 70%)", filter: "blur(30px)" }} />

            <div className="relative z-10 text-center space-y-6">
              <div className="space-y-2">
                <h2 className="text-[22px] font-bold tracking-tight text-white/90 leading-snug">
                  Before we start, let&apos;s clear a few things up...
                </h2>
                <p className="text-[13px] text-white/50">
                  We wouldn&apos;t want any accidents during the analysis, right? 😅
                </p>
              </div>

              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <h3 className="text-[15px] font-medium text-white/80">I am a...</h3>
                    <div className="flex flex-col gap-3">
                      {[
                        { label: "Guy 🧢", value: "Guy" },
                        { label: "Girl 💅", value: "Girl" },
                        { label: "Icon ✨", value: "Icon" },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => {
                            setSelectedGender(opt.value);
                            setStep(2);
                          }}
                          className="w-full py-4 px-6 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-white/90 hover:bg-purple-500/10 hover:border-purple-500/20 transition-all duration-200 font-medium active:scale-[0.97]"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <h3 className="text-[15px] font-medium text-white/80">I usually overanalyze...</h3>
                    <div className="flex flex-col gap-3">
                      {[
                        { label: "Guys 🚩", value: "Guys" },
                        { label: "Girls ☕", value: "Girls" },
                        { label: "Everyone 🍿", value: "Everyone" },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => handleComplete(opt.value)}
                          disabled={isSubmitting}
                          className="w-full py-4 px-6 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-white/90 hover:bg-purple-500/10 hover:border-purple-500/20 transition-all duration-200 font-medium active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none"
                        >
                          {isSubmitting ? "Saving..." : opt.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
