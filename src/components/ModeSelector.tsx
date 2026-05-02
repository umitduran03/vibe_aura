"use client";

import { motion } from "framer-motion";
import { User, Users } from "lucide-react";
import { useAppStore, type AnalysisMode } from "@/store/useAppStore";
import { hapticLight } from "@/lib/haptics";
import PremiumExtras from "@/components/PremiumExtras";

export default function ModeSelector() {
  const mode = useAppStore((s) => s.analysisMode);
  const setMode = useAppStore((s) => s.setAnalysisMode);

  const handleSelect = (m: AnalysisMode) => {
    hapticLight();
    setMode(m);
  };

  return (
    <div className="flex flex-col items-center gap-4 mb-4">
      <motion.h2
        className="text-center text-xl font-semibold text-foreground"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        How should we analyze? ✨
      </motion.h2>

      <div className="w-full">
        <PremiumExtras />
      </div>

      <motion.div
        className="flex gap-3 w-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Solo Card */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSelect("solo")}
          className={`relative flex-1 flex flex-col items-center gap-3 py-6 rounded-3xl transition-all duration-300 cursor-pointer border ${
            mode === "solo"
              ? "bg-accent/15 border-accent/40 shadow-[0_0_30px_rgba(192,132,252,0.15)]"
              : "bg-white/5 border-white/8 hover:bg-white/8"
          }`}
        >
          {/* Fiyat Etiketi */}
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-bold text-white/90 border border-white/10 backdrop-blur-md">
            ✦ 1
          </div>
          <motion.div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-300 ${
              mode === "solo" ? "bg-accent/20" : "bg-white/10"
            }`}
            animate={mode === "solo" ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <User className={`w-7 h-7 transition-colors duration-300 ${mode === "solo" ? "text-accent" : "text-text-secondary/60"}`} />
          </motion.div>
          <div>
            <p className={`text-sm font-bold transition-colors duration-300 ${mode === "solo" ? "text-foreground" : "text-text-secondary"}`}>
              Solo
            </p>
            <p className="text-[11px] text-text-secondary/50 mt-0.5">
              Discover your vibe
            </p>
          </div>
        </motion.button>

        {/* Duo Card */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSelect("duo")}
          className={`relative flex-1 flex flex-col items-center gap-3 py-6 rounded-3xl transition-all duration-300 cursor-pointer border ${
            mode === "duo"
              ? "bg-pink-500/15 border-pink-500/40 shadow-[0_0_30px_rgba(236,72,153,0.15)]"
              : "bg-white/5 border-white/8 hover:bg-white/8"
          }`}
        >
          {/* Fiyat Etiketi */}
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-bold text-white/90 border border-white/10 backdrop-blur-md">
            ✦ 2
          </div>
          <motion.div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-300 ${
              mode === "duo" ? "bg-pink-500/20" : "bg-white/10"
            }`}
            animate={mode === "duo" ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Users className={`w-7 h-7 transition-colors duration-300 ${mode === "duo" ? "text-pink-400" : "text-text-secondary/60"}`} />
          </motion.div>
          <div>
            <p className={`text-sm font-bold transition-colors duration-300 ${mode === "duo" ? "text-foreground" : "text-text-secondary"}`}>
              Duo Match
            </p>
            <p className="text-[11px] text-text-secondary/50 mt-0.5">
              Test your vibe
            </p>
          </div>
        </motion.button>
      </motion.div>
    </div>
  );
}
