"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Sparkles, ExternalLink } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { hapticMedium } from "@/lib/haptics";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const CONSENT_KEY = "vibe_aura_consent";

export default function ConsentModal() {
  const [showModal, setShowModal] = useState(false);
  const userId = useAppStore((s) => s.userId);

  useEffect(() => {
    // Check localStorage for existing consent
    const hasConsented = localStorage.getItem(CONSENT_KEY);
    if (!hasConsented) {
      // Small delay so splash screen shows first
      const timer = setTimeout(() => setShowModal(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = async () => {
    hapticMedium();

    // Save to localStorage
    localStorage.setItem(CONSENT_KEY, "true");

    // Save to Firestore if user is authenticated
    if (userId) {
      try {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {
          hasAcceptedTerms: true,
          termsAcceptedAt: serverTimestamp(),
        });
      } catch (err) {
        // Non-blocking — localStorage is the primary gate
        console.warn("[Consent] Firestore write failed:", err);
      }
    }

    setShowModal(false);
  };

  return (
    <AnimatePresence>
      {showModal && (
        <>
          {/* ─── Backdrop ─── */}
          <motion.div
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* ─── Modal ─── */}
          <motion.div
            className="fixed inset-0 z-[101] flex items-center justify-center p-5"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          >
            <div
              className="w-full max-w-sm rounded-3xl overflow-hidden relative"
              style={{
                background: "linear-gradient(170deg, rgba(25,18,40,0.97) 0%, rgba(10,8,18,0.99) 100%)",
                boxShadow: "0 30px 60px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* ─── Top Accent ─── */}
              <div
                className="h-1 w-full"
                style={{
                  background: "linear-gradient(90deg, #8b5cf6, #ec4899, #8b5cf6)",
                }}
              />

              <div className="p-7">
                {/* ─── Icon ─── */}
                <div className="flex justify-center mb-5">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center relative"
                    style={{
                      background: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(236,72,153,0.15))",
                      boxShadow: "0 0 30px rgba(139,92,246,0.15)",
                    }}
                  >
                    <Shield className="h-8 w-8 text-purple-400" />
                    <Sparkles className="h-3.5 w-3.5 text-pink-400 absolute -top-1 -right-1" />
                  </div>
                </div>

                {/* ─── Title ─── */}
                <h2 className="text-xl font-bold text-center text-white mb-2">
                  Before We Read Your Aura...
                </h2>
                <p className="text-sm text-center text-white/50 mb-6 leading-relaxed">
                  Vibe & Aura is an <strong className="text-white/70">entertainment app</strong>. Our AI readings are for fun — not professional advice. By continuing, you agree to our terms.
                </p>

                {/* ─── Key Points ─── */}
                <div className="space-y-3 mb-6">
                  {[
                    { emoji: "🎭", text: "All readings are for entertainment only" },
                    { emoji: "📷", text: "We never store or sell your photos" },
                    { emoji: "🤖", text: "AI results may be inaccurate or fictional" },
                    { emoji: "💳", text: "Digital purchases are non-refundable" },
                  ].map((item) => (
                    <div
                      key={item.text}
                      className="flex items-center gap-3 p-3 rounded-xl"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <span className="text-lg shrink-0">{item.emoji}</span>
                      <span className="text-[13px] text-white/70 leading-snug">{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* ─── Links ─── */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <a
                    href="/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 underline underline-offset-2 transition-colors"
                  >
                    Terms of Service
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <span className="text-white/20">|</span>
                  <a
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 underline underline-offset-2 transition-colors"
                  >
                    Privacy Policy
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                {/* ─── Accept Button ─── */}
                <button
                  onClick={handleAccept}
                  className="w-full py-4 rounded-2xl text-[15px] font-bold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                    boxShadow: "0 8px 25px rgba(139,92,246,0.35), 0 2px 8px rgba(236,72,153,0.2)",
                  }}
                >
                  Accept & Continue ✨
                </button>

                {/* ─── Sub-note ─── */}
                <p className="text-[11px] text-white/30 text-center mt-4 leading-relaxed">
                  By tapping "Accept & Continue," you acknowledge that you have read and agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
