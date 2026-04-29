"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ExternalLink, Loader2 } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { signInWithGoogle, setOnRedirectFallback } from "@/lib/auth";
import { hapticLight, hapticMedium, hapticHeavy } from "@/lib/haptics";

// ============================================
// HARD GATE ONBOARDING — Strict Google Auth
// ============================================

const LEGAL_POINTS = [
  { emoji: "🎭", text: "All readings are for entertainment only" },
  { emoji: "📷", text: "We never store or sell your photos" },
  { emoji: "🤖", text: "AI results may be inaccurate or fictional" },
  { emoji: "💳", text: "Digital purchases are non-refundable" },
];

export default function OnboardingScreen() {
  const setIsConnecting = useAppStore((s) => s.setIsConnecting);
  const setScreen = useAppStore((s) => s.setScreen);
  const userId = useAppStore((s) => s.userId);

  const [hasConsented, setHasConsented] = useState(false);
  const [isBypassed, setIsBypassed] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showCosmicTransition, setShowCosmicTransition] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [redirectToast, setRedirectToast] = useState(false);

  // Client-side LocalStorage kontrolü
  useEffect(() => {
    setMounted(true);
    const savedConsent = localStorage.getItem("hasConsented") === "true";
    if (savedConsent) {
      setHasConsented(true);
      setIsBypassed(true);
    }
  }, []);

  // Register redirect fallback callback
  useEffect(() => {
    setOnRedirectFallback(() => {
      setRedirectToast(true);
    });
    return () => setOnRedirectFallback(null);
  }, []);

  // Kullanıcı zaten giriş yapmışsa ve onaylıysa, doğrudan geçiş
  useEffect(() => {
    if (mounted && hasConsented && userId && !showCosmicTransition) {
      setScreen("wizard");
    }
  }, [mounted, hasConsented, userId, showCosmicTransition, setScreen]);

  // Loading Ekranı Zamanlayıcısı
  useEffect(() => {
    if (!showCosmicTransition) return;

    setIsConnecting(true);

    const timer = setTimeout(() => {
      setIsConnecting(false);
      hapticHeavy();
      setScreen("wizard");
    }, 1500);

    return () => clearTimeout(timer);
  }, [showCosmicTransition, setIsConnecting, setScreen]);

  // Google Login Butonu Aksiyonu
  const handleGoogleLogin = useCallback(async () => {
    if (!hasConsented || isLoggingIn) return;
    hapticMedium();
    setIsLoggingIn(true);
    setLoginError(null);

    try {
      localStorage.setItem("hasConsented", "true");
      const user = await signInWithGoogle();
      // signInWithRedirect returns null (page reloads), popup returns User
      if (user) {
        setShowCosmicTransition(true);
      }
      // If null, redirect is happening — page will reload
    } catch (err: any) {
      console.error("[Onboarding] Login failed:", err);
      if (err?.code === "auth/unauthorized-domain" || err?.message?.includes("AppCheck") || err?.message?.includes("recaptcha")) {
        setLoginError("Domain verification failed. Please ensure you are on a verified domain. ✨");
      } else {
        setLoginError("Connection interrupted. Please try again. ✨");
      }
      setIsLoggingIn(false);
    }
  }, [hasConsented, isLoggingIn]);

  // SSR uyumsuzluğunu önlemek için yüklenmeden render etme
  if (!mounted) return null;

  // Eğer `userId` varsa ve animasyon beklemiyorsak null dön (zaten useEffect ile wizard'a geçecek)
  if (userId && !showCosmicTransition) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-transparent w-full overflow-hidden relative">
      {/* ════════════════════════════════════════
          ORİJİNAL YÜKLEME EKRANI
          ════════════════════════════════════════ */}
      <AnimatePresence>
        {showCosmicTransition && (
          <motion.div
            key="cosmic-transition"
            className="fixed inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-2xl z-[999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative flex flex-col items-center gap-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative">
                <Sparkles className="h-12 w-12 text-pink-400 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
              </div>
              <motion.p
                className="mt-6 text-sm font-medium text-white/60 tracking-[0.2em] uppercase"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                Analyzing Your Vibe...
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════
          GİRİŞ PANELİ (THE GATE)
          ════════════════════════════════════════ */}
      <AnimatePresence mode="wait">
        {!showCosmicTransition && (
          <motion.div
            key="gate"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full max-w-sm z-10"
          >
            <div
              className="rounded-3xl overflow-hidden relative"
              style={{
                background: "linear-gradient(170deg, rgba(25, 18, 40, 0.85) 0%, rgba(10, 8, 18, 0.95) 100%)",
                boxShadow: "0 30px 60px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Top Accent Line */}
              <div
                className="h-[3px] w-full"
                style={{
                  background: "linear-gradient(90deg, #8b5cf6, #ec4899, #8b5cf6)",
                }}
              />

              <div className="p-7">
                {/* Logo & Başlık */}
                <div className="flex flex-col items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center relative mb-4 bg-white/5 border border-white/10">
                    <Sparkles className="h-8 w-8 text-pink-400" />
                  </div>
                  <h2 className="text-xl font-bold text-center text-white mb-2">
                    {isBypassed ? "Welcome Back to Vibe & Aura" : "Before We Analyze Your Vibe..."}
                  </h2>
                  {!isBypassed && (
                    <p className="text-sm text-center text-white/50 leading-relaxed">
                      Vibe & Aura is an <strong className="text-white/70">entertainment app</strong>.
                      Our AI readings are for fun.
                    </p>
                  )}
                </div>

                {loginError && (
                  <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-center animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-sm text-red-400 font-medium leading-relaxed">{loginError}</p>
                  </div>
                )}

                {/* Eğer kullanıcı daha önce onay VERMEDİYSE kuralları göster */}
                {!isBypassed && (
                  <>
                    <div className="space-y-2.5 mb-6">
                      {LEGAL_POINTS.map((item) => (
                        <div
                          key={item.text}
                          className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]"
                        >
                          <span className="text-base shrink-0">{item.emoji}</span>
                          <span className="text-[13px] text-white/65 leading-snug">
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Terms & Privacy */}
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <a
                        href="/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 underline transition-all"
                      >
                        Terms of Service
                        <ExternalLink className="h-3 w-3 opacity-60 group-hover:opacity-100" />
                      </a>
                      <span className="text-white/15">|</span>
                      <a
                        href="/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 underline transition-all"
                      >
                        Privacy Policy
                        <ExternalLink className="h-3 w-3 opacity-60 group-hover:opacity-100" />
                      </a>
                    </div>

                    {/* Checkbox */}
                    <div
                      className="w-full p-4 rounded-2xl mb-6 transition-all duration-300 border cursor-pointer select-none"
                      style={{
                        background: hasConsented ? "rgba(139, 92, 246, 0.08)" : "rgba(255, 255, 255, 0.02)",
                        borderColor: hasConsented ? "rgba(139, 92, 246, 0.3)" : "rgba(255, 255, 255, 0.05)",
                      }}
                      onClick={() => {
                        hapticLight();
                        setHasConsented((prev) => !prev);
                      }}
                    >
                      <label className="flex items-start gap-3 cursor-pointer">
                        <div
                          className={`mt-0.5 shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-300 ${
                            hasConsented
                              ? "bg-purple-500 border-purple-500 shadow-[0_0_12px_rgba(139,92,246,0.5)]"
                              : "bg-transparent border-white/20"
                          }`}
                        >
                          <AnimatePresence>
                            {hasConsented && (
                              <motion.svg
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                className="w-3.5 h-3.5 text-white"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </motion.svg>
                            )}
                          </AnimatePresence>
                        </div>
                        <p className="text-[13px] text-white/65 leading-snug flex-1">
                          I accept the Terms of Service and Privacy Policy.
                        </p>
                      </label>
                    </div>
                  </>
                )}

                {/* Google ile Giriş Butonu */}
                <motion.button
                  onClick={handleGoogleLogin}
                  disabled={!hasConsented || isLoggingIn}
                  className={`w-full py-4 rounded-2xl text-[15px] font-bold text-white transition-all duration-300 flex items-center justify-center gap-3 ${
                    hasConsented
                      ? "cursor-pointer"
                      : "cursor-not-allowed grayscale opacity-50"
                  }`}
                  style={{
                    background: hasConsented 
                      ? "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)" 
                      : "rgba(255,255,255,0.1)",
                    boxShadow: hasConsented
                      ? "0 0 20px rgba(139, 92, 246, 0.6), 0 0 40px rgba(236, 72, 153, 0.3)"
                      : "none",
                  }}
                  animate={{
                    scale: hasConsented && !isLoggingIn ? 1 : 0.98,
                  }}
                  whileHover={hasConsented && !isLoggingIn ? { scale: 1.02 } : {}}
                  whileTap={hasConsented && !isLoggingIn ? { scale: 0.96 } : {}}
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      {/* Google Icon SVG (Official Colored) */}
                      <svg className="h-5 w-5 bg-white rounded-full p-[2px]" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      Continue with Google
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Redirect Fallback Toast ─── */}
      <AnimatePresence>
        {redirectToast && (
          <motion.div
            key="redirect-toast"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[1000] px-5 py-3 rounded-2xl flex items-center gap-3"
            style={{
              background: "linear-gradient(135deg, rgba(139,92,246,0.9) 0%, rgba(236,72,153,0.9) 100%)",
              boxShadow: "0 8px 32px rgba(139,92,246,0.4), 0 0 0 1px rgba(255,255,255,0.1) inset",
              backdropFilter: "blur(20px)",
            }}
          >
            <Loader2 className="h-4 w-4 text-white animate-spin" />
            <span className="text-sm font-medium text-white">
              Popup blocked. Redirecting to secure sign-in...
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Decorative Background Orbs ─── */}
      <div className="fixed -bottom-20 -left-20 w-80 h-80 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="fixed -top-20 -right-20 w-80 h-80 bg-pink-600/10 blur-[100px] rounded-full pointer-events-none" />
    </div>
  );
}
