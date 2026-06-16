"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Flame, X, RefreshCcw, Skull } from "lucide-react";
import { useStreakStore } from "@/store/useStreakStore";
import { useAppStore } from "@/store/useAppStore";
import { deductToken } from "@/lib/auth";
import { auth } from "@/lib/firebase";
import { useState } from "react";
import { hapticMedium, hapticHeavy } from "@/lib/haptics";
import { getVibeRank } from "@/lib/streak-utils";
import { useT } from "@/hooks/useT";

export default function StreakRecoveryModal() {
  const t = useT();
  const { isRecoveryModalOpen, lostStreakCount, recoverStreak, declineRecovery } = useStreakStore();
  const tokenBalance = useAppStore((s) => s.tokenBalance);
  const setTokenBalance = useAppStore((s) => s.setTokenBalance);
  const setTokenModalOpen = useAppStore((s) => s.setTokenModalOpen);
  const locale = useAppStore((s) => s.locale);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tokensNeeded = lostStreakCount;
  const rank = getVibeRank(lostStreakCount);

  if (!isRecoveryModalOpen) return null;

  const handleRecover = async () => {
    hapticMedium();
    if (tokenBalance < tokensNeeded) {
      setError(t.streakRecoveryTokenError);
      setTimeout(() => setTokenModalOpen(true), 1000);
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error("User not authenticated.");
      
      // Attempt token deduction on backend (throws if fails)
      await deductToken(userId, tokensNeeded);
      
      setTokenBalance(tokenBalance - tokensNeeded);
      recoverStreak();
      hapticHeavy();
    } catch (err) {
      setError(t.streakRecoveryGenericError);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDecline = () => {
    hapticMedium();
    declineRecovery();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative w-full max-w-sm rounded-3xl overflow-hidden p-6 text-center border border-white/10"
          style={{
            background: "linear-gradient(180deg, rgba(20,10,30,0.95) 0%, rgba(10,5,15,0.98) 100%)",
            boxShadow: "0 20px 60px -10px rgba(249,115,22,0.3)"
          }}
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
        >
          {/* Flame Icon */}
          <div className="mx-auto w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mb-4 border border-orange-500/30 shadow-[0_0_30px_rgba(249,115,22,0.4)]">
            <Flame className="w-10 h-10 text-orange-500" />
          </div>

          <h2 className="text-2xl font-black text-white mb-2">{t.streakRecoveryTitle}</h2>
          
          <div className="text-white/70 mb-6 text-sm leading-relaxed">
            {t.streakRecoveryDesc1} {" "}
            <span className="font-bold text-orange-400">{lostStreakCount} {t.streakRecoveryDay}</span> {t.streakRecoveryDesc2}
            <br/>{t.streakRecoveryYouWereA} <span className={`font-bold ${rank.color}`}>{locale === "tr" ? (rank.nameTr || rank.name) : rank.name}</span>.
          </div>

          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 mb-6">
            <p className="text-sm text-white/90 font-medium mb-3">
              {t.streakRecoveryDonNotLose}
            </p>
            <div className="flex items-center justify-center gap-2 text-2xl font-black text-yellow-400">
              {t.streakRecoveryCost.replace("{tokens}", tokensNeeded.toString())}
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm mb-4 bg-red-400/10 p-2 rounded-lg border border-red-400/20">
              {error}
            </p>
          )}

          <div className="space-y-3">
            <button
              onClick={handleRecover}
              disabled={isProcessing}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white transition-all bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(249,115,22,0.4)]"
            >
              {isProcessing ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <RefreshCcw className="w-5 h-5" />
                </motion.div>
              ) : (
                <>
                  <Flame className="w-5 h-5" />
                  {t.streakRecoveryButton}
                </>
              )}
            </button>

            <button
              onClick={handleDecline}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-xl font-semibold text-white/50 hover:bg-white/5 hover:text-white/80 transition-all text-sm"
            >
              {t.streakRecoveryDecline}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
