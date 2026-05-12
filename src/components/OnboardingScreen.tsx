"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ExternalLink, Loader2, ArrowRight } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { signInWithGoogle, acceptTerms } from "@/lib/auth";
import { hapticLight, hapticMedium, hapticHeavy } from "@/lib/haptics";
import Image from "next/image";

const LEGAL_POINTS = [
  { emoji: "🎭", text: "All readings are for entertainment only" },
  { emoji: "📷", text: "We never store or sell your photos" },
  { emoji: "🤖", text: "AI results may be inaccurate or fictional" },
  { emoji: "💳", text: "Digital purchases are non-refundable" },
];

type OnboardingView = "landing" | "terms" | "login";

export default function OnboardingScreen() {
  const setIsConnecting = useAppStore((s) => s.setIsConnecting);
  const setScreen = useAppStore((s) => s.setScreen);
  const userId = useAppStore((s) => s.userId);
  const isAuthSettling = useAppStore((s) => s.isAuthSettling);
  const hasAcceptedTerms = useAppStore((s) => s.hasAcceptedTerms);
  const setHasAcceptedTerms = useAppStore((s) => s.setHasAcceptedTerms);

  const [view, setView] = useState<OnboardingView>("landing");
  const [hasConsented, setHasConsented] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => { setMounted(true); }, []);

  // User logged in + terms accepted → go to wizard
  useEffect(() => {
    if (mounted && userId && hasAcceptedTerms === true) {
      setScreen("wizard");
    }
  }, [mounted, userId, hasAcceptedTerms, setScreen]);

  // User logged in but terms NOT accepted → show terms
  useEffect(() => {
    if (mounted && userId && hasAcceptedTerms === false) {
      setView("terms");
    }
  }, [mounted, userId, hasAcceptedTerms]);

  const handleGoogleLogin = useCallback(async () => {
    if (isLoggingIn) return;
    hapticMedium();
    setIsLoggingIn(true);
    setLoginError(null);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      console.error("[Onboarding] Login failed:", err);
      setLoginError(err?.code === "auth/unauthorized-domain"
        ? "Domain verification failed. Please try again. ✨"
        : "Connection interrupted. Please try again. ✨");
      setIsLoggingIn(false);
    }
  }, [isLoggingIn]);

  const handleAcceptTerms = useCallback(async () => {
    if (!hasConsented || !userId) return;
    hapticHeavy();
    try {
      await acceptTerms(userId);
      setHasAcceptedTerms(true);
    } catch (err) {
      console.error("[Onboarding] Terms accept failed:", err);
    }
  }, [hasConsented, userId, setHasAcceptedTerms]);

  if (!mounted) return null;

  // Auth settling → loading screen
  if (isAuthSettling) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-transparent w-full overflow-hidden relative">
        <div className="relative flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center relative mb-4 bg-white/5 border border-white/10">
            <Sparkles className="h-8 w-8 text-pink-400 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
          </div>
          <motion.p
            className="text-sm font-medium text-white/60 tracking-[0.2em] uppercase"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            Analyzing Your Vibe...
          </motion.p>
        </div>
        <div className="fixed -bottom-20 -left-20 w-80 h-80 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="fixed -top-20 -right-20 w-80 h-80 bg-pink-600/10 blur-[100px] rounded-full pointer-events-none" />
      </div>
    );
  }

  // Already logged in + terms accepted → null (useEffect handles redirect)
  if (userId && hasAcceptedTerms === true) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-transparent w-full overflow-hidden relative">
      <AnimatePresence mode="wait">
        {/* ═══ LANDING VIEW ═══ */}
        {view === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full max-w-sm z-10 flex flex-col items-center"
          >
            {/* Logo */}
            <motion.div
              className="w-32 h-32 flex items-center justify-center relative mb-6"
              initial={{ scale: 0.8, opacity: 0, filter: "drop-shadow(0 0 0px rgba(139,92,246,0))" }}
              animate={{ scale: 1, opacity: 1, filter: ["drop-shadow(0 0 20px rgba(139,92,246,0.25))", "drop-shadow(0 0 35px rgba(236,72,153,0.3))", "drop-shadow(0 0 20px rgba(139,92,246,0.25))"] }}
              transition={{ scale: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.8 }, filter: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 } }}
            >
              <Image src="/va-logo.png" alt="Vibe & Aura" width={128} height={128} priority className="object-contain" />
            </motion.div>

            <h1 className="text-2xl font-bold text-white mb-1 tracking-tight">Vibe & Aura</h1>
            <p className="text-sm text-white/40 mb-10">Discover your energy ✨</p>

            {/* Sign Up Button */}
            <motion.button
              onClick={() => { hapticMedium(); setView("terms"); }}
              className="w-full py-4 rounded-2xl text-[15px] font-bold text-white mb-3 flex items-center justify-center gap-2"
              style={{
                background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                boxShadow: "0 0 20px rgba(139,92,246,0.5), 0 0 40px rgba(236,72,153,0.2)",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
            >
              Sign Up <ArrowRight className="w-4 h-4" />
            </motion.button>

            {/* Log In Button */}
            <motion.button
              onClick={() => { hapticLight(); setView("login"); }}
              className="w-full py-4 rounded-2xl text-[15px] font-semibold text-white/70 flex items-center justify-center gap-2"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
            >
              Log In
            </motion.button>
          </motion.div>
        )}

        {/* ═══ TERMS VIEW (Sign Up flow) ═══ */}
        {view === "terms" && (
          <motion.div
            key="terms"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-sm z-10"
          >
            <div
              className="rounded-3xl overflow-hidden relative"
              style={{
                background: "linear-gradient(170deg, rgba(25,18,40,0.85) 0%, rgba(10,8,18,0.95) 100%)",
                boxShadow: "0 30px 60px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="h-[3px] w-full" style={{ background: "linear-gradient(90deg, #8b5cf6, #ec4899, #8b5cf6)" }} />
              <div className="p-7">
                <div className="flex flex-col items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center relative mb-4 bg-white/5 border border-white/10">
                    <Sparkles className="h-8 w-8 text-pink-400" />
                  </div>
                  <h2 className="text-xl font-bold text-center text-white mb-2">Before We Read Your Aura...</h2>
                  <p className="text-sm text-center text-white/50 leading-relaxed">
                    Vibe & Aura is an <strong className="text-white/70">entertainment app</strong>. Our AI readings are for fun.
                  </p>
                </div>

                <div className="space-y-2.5 mb-6">
                  {LEGAL_POINTS.map((item) => (
                    <div key={item.text} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <span className="text-base shrink-0">{item.emoji}</span>
                      <span className="text-[13px] text-white/65 leading-snug">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-4 mb-6">
                  <a href="/terms" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 underline">
                    Terms of Service <ExternalLink className="h-3 w-3 opacity-60 group-hover:opacity-100" />
                  </a>
                  <span className="text-white/15">|</span>
                  <a href="/privacy" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 underline">
                    Privacy Policy <ExternalLink className="h-3 w-3 opacity-60 group-hover:opacity-100" />
                  </a>
                </div>

                {/* Checkbox */}
                <div
                  className="w-full p-4 rounded-2xl mb-6 transition-all duration-300 border cursor-pointer select-none"
                  style={{
                    background: hasConsented ? "rgba(139,92,246,0.08)" : "rgba(255,255,255,0.02)",
                    borderColor: hasConsented ? "rgba(139,92,246,0.3)" : "rgba(255,255,255,0.05)",
                  }}
                  onClick={() => { hapticLight(); setHasConsented((p) => !p); }}
                >
                  <label className="flex items-start gap-3 cursor-pointer">
                    <div className={`mt-0.5 shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-300 ${hasConsented ? "bg-purple-500 border-purple-500 shadow-[0_0_12px_rgba(139,92,246,0.5)]" : "bg-transparent border-white/20"}`}>
                      <AnimatePresence>
                        {hasConsented && (
                          <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                            <polyline points="20 6 9 17 4 12" />
                          </motion.svg>
                        )}
                      </AnimatePresence>
                    </div>
                    <p className="text-[13px] text-white/65 leading-snug flex-1">I accept the Terms of Service and Privacy Policy.</p>
                  </label>
                </div>

                {/* Action Button — if logged in: accept terms, else: Google login */}
                {userId ? (
                  <motion.button
                    onClick={handleAcceptTerms}
                    disabled={!hasConsented}
                    className={`w-full py-4 rounded-2xl text-[15px] font-bold text-white flex items-center justify-center gap-3 ${hasConsented ? "cursor-pointer" : "cursor-not-allowed grayscale opacity-50"}`}
                    style={{
                      background: hasConsented ? "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)" : "rgba(255,255,255,0.1)",
                      boxShadow: hasConsented ? "0 0 20px rgba(139,92,246,0.6), 0 0 40px rgba(236,72,153,0.3)" : "none",
                    }}
                    whileHover={hasConsented ? { scale: 1.02 } : {}}
                    whileTap={hasConsented ? { scale: 0.96 } : {}}
                  >
                    Accept & Continue <ArrowRight className="w-4 h-4" />
                  </motion.button>
                ) : (
                  <>
                    {loginError && (
                      <div className="mb-4 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-center">
                        <p className="text-sm text-red-400 font-medium">{loginError}</p>
                      </div>
                    )}
                    <motion.button
                      onClick={handleGoogleLogin}
                      disabled={!hasConsented || isLoggingIn}
                      className={`w-full py-4 rounded-2xl text-[15px] font-bold text-white flex items-center justify-center gap-3 ${hasConsented ? "cursor-pointer" : "cursor-not-allowed grayscale opacity-50"}`}
                      style={{
                        background: hasConsented ? "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)" : "rgba(255,255,255,0.1)",
                        boxShadow: hasConsented ? "0 0 20px rgba(139,92,246,0.6), 0 0 40px rgba(236,72,153,0.3)" : "none",
                      }}
                      whileHover={hasConsented && !isLoggingIn ? { scale: 1.02 } : {}}
                      whileTap={hasConsented && !isLoggingIn ? { scale: 0.96 } : {}}
                    >
                      {isLoggingIn ? (<><Loader2 className="h-5 w-5 animate-spin" /> Connecting...</>) : (
                        <>
                          <svg className="h-5 w-5 bg-white rounded-full p-[2px]" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                          </svg>
                          Accept & Sign Up with Google
                        </>
                      )}
                    </motion.button>
                  </>
                )}

                {/* Back button */}
                {!userId && (
                  <button onClick={() => setView("landing")} className="w-full mt-3 text-xs text-white/30 hover:text-white/50 transition-colors">
                    ← Back
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ═══ LOGIN VIEW (Returning users) ═══ */}
        {view === "login" && (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-sm z-10"
          >
            <div
              className="rounded-3xl overflow-hidden relative"
              style={{
                background: "linear-gradient(170deg, rgba(25,18,40,0.85) 0%, rgba(10,8,18,0.95) 100%)",
                boxShadow: "0 30px 60px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="h-[3px] w-full" style={{ background: "linear-gradient(90deg, #8b5cf6, #ec4899, #8b5cf6)" }} />
              <div className="p-7">
                <div className="flex flex-col items-center justify-center mb-8">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center relative mb-4 bg-white/5 border border-white/10">
                    <Sparkles className="h-8 w-8 text-pink-400" />
                  </div>
                  <h2 className="text-xl font-bold text-center text-white mb-2">Welcome Back ✨</h2>
                  <p className="text-sm text-center text-white/50">Sign in to continue your journey</p>
                </div>

                {loginError && (
                  <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-center">
                    <p className="text-sm text-red-400 font-medium">{loginError}</p>
                  </div>
                )}

                <motion.button
                  onClick={handleGoogleLogin}
                  disabled={isLoggingIn}
                  className="w-full py-4 rounded-2xl text-[15px] font-bold text-white cursor-pointer flex items-center justify-center gap-3"
                  style={{
                    background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                    boxShadow: "0 0 20px rgba(139,92,246,0.6), 0 0 40px rgba(236,72,153,0.3)",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {isLoggingIn ? (<><Loader2 className="h-5 w-5 animate-spin" /> Connecting...</>) : (
                    <>
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

                <button onClick={() => setView("landing")} className="w-full mt-3 text-xs text-white/30 hover:text-white/50 transition-colors">
                  ← Back
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed -bottom-20 -left-20 w-80 h-80 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="fixed -top-20 -right-20 w-80 h-80 bg-pink-600/10 blur-[100px] rounded-full pointer-events-none" />
    </div>
  );
}
