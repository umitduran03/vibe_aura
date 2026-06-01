"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Flame, ChevronRight } from "lucide-react";
import { useStreakStore } from "@/store/useStreakStore";
import { VIBE_RANKS, getVibeRank } from "@/lib/streak-utils";
import { hapticLight } from "@/lib/haptics";

export default function StreakInfoModal() {
  const { isStreakInfoModalOpen, closeStreakInfoModal, streakCount } = useStreakStore();

  if (!isStreakInfoModalOpen) return null;

  const currentRank = getVibeRank(streakCount);

  // Find the next rank to calculate progress
  const nextRankIndex = VIBE_RANKS.findIndex(r => r.name === currentRank.name) + 1;
  const nextRank = nextRankIndex < VIBE_RANKS.length ? VIBE_RANKS[nextRankIndex] : null;

  const progressPercentage = nextRank 
    ? Math.min(100, Math.max(0, ((streakCount - currentRank.minDays) / (nextRank.minDays - currentRank.minDays)) * 100))
    : 100;

  const handleClose = () => {
    hapticLight();
    closeStreakInfoModal();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        <motion.div
          className="relative w-full max-w-md max-h-[85vh] overflow-hidden flex flex-col rounded-3xl border border-white/10"
          style={{
            background: "linear-gradient(180deg, rgba(20,10,30,0.95) 0%, rgba(10,5,15,0.98) 100%)",
            boxShadow: "0 20px 60px -10px rgba(139,92,246,0.3)"
          }}
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-purple-500/10 opacity-50 pointer-events-none" />
            <h2 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
              <Flame className="w-5 h-5 text-orange-500" />
              Aura Rank Progression
            </h2>
            <button
              onClick={handleClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors relative z-10"
            >
              <X className="w-4 h-4 text-white/60" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 scrollbar-hide">
            
            {/* Explanation */}
            <div className="mb-6 text-sm text-white/70 leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/5">
              Build your streak by checking your vibe every day. As your streak grows, your rank evolves. Miss a day, and you'll fall back to NPC status!
            </div>

            {/* Current Status Card */}
            <div className="mb-8 p-5 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 relative overflow-hidden">
              {/* Background glow based on current rank */}
              <div className={`absolute -right-10 -top-10 w-32 h-32 blur-3xl opacity-20 bg-gradient-to-r ${currentRank.gradient}`} />
              
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-widest font-bold mb-1">Current Streak</p>
                  <div className="flex items-center gap-2">
                    <Flame className="w-6 h-6 text-orange-500" />
                    <span className="text-3xl font-black text-white">{streakCount} <span className="text-lg text-white/40 font-medium">Days</span></span>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-xs text-white/50 uppercase tracking-widest font-bold mb-1">Rank</p>
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r ${currentRank.gradient} shadow-lg`}>
                    {currentRank.icon}
                    <span className="text-sm font-bold text-white">{currentRank.name}</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              {nextRank && (
                <div className="relative z-10 mt-6">
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-white/40">{currentRank.minDays} Days</span>
                    <span className="text-white/40">Next: {nextRank.name} ({nextRank.minDays} Days)</span>
                  </div>
                  <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden border border-white/5 p-0.5">
                    <motion.div 
                      className={`h-full rounded-full bg-gradient-to-r ${nextRank.gradient}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Ranks List */}
            <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-4 px-1">
              Evolution Path
            </h3>
            
            <div className="space-y-3 relative">
              {/* Connecting vertical line */}
              <div className="absolute left-6 top-6 bottom-6 w-[2px] bg-white/5 rounded-full" />
              
              {VIBE_RANKS.map((rank, index) => {
                const isCurrent = currentRank.name === rank.name;
                const isAchieved = streakCount >= rank.minDays;
                const isNext = nextRank?.name === rank.name;
                
                return (
                  <div 
                    key={rank.name}
                    className={`relative z-10 flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 ${
                      isCurrent ? "bg-white/10 border border-white/20 scale-[1.02] shadow-lg" : 
                      isAchieved ? "opacity-70" : "opacity-40 grayscale"
                    }`}
                  >
                    <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center ${
                      isAchieved || isNext ? `bg-gradient-to-br ${rank.gradient}` : "bg-white/5"
                    }`}>
                      {rank.icon}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className={`font-bold truncate ${isCurrent ? "text-white" : "text-white/80"}`}>
                          {rank.name}
                        </p>
                        <span className="text-xs font-mono font-medium text-white/50 bg-black/30 px-2 py-0.5 rounded-md">
                          {rank.minDays}+
                        </span>
                      </div>
                      <p className="text-xs text-white/40 truncate">
                        {isCurrent ? "You are here" : isAchieved ? "Unlocked" : "Locked"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
