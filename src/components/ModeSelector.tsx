"use client";

import { motion } from "framer-motion";
import { User, Users } from "lucide-react";
import { useAppStore, type AnalysisMode } from "@/store/useAppStore";
import { hapticLight } from "@/lib/haptics";
import PremiumExtras from "@/components/PremiumExtras";
import { useT } from "@/hooks/useT";

export default function ModeSelector() {
  const mode = useAppStore((s) => s.analysisMode);
  const setMode = useAppStore((s) => s.setAnalysisMode);
  const t = useT();

  const handleSelect = (m: AnalysisMode) => {
    hapticLight();
    setMode(m);
  };

  return (
    <div className="flex flex-col gap-3 w-full mb-6 mt-4">
      <motion.h2
        className="text-center text-lg font-bold text-foreground mb-1"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {t.modeTitle}
      </motion.h2>

      <div className="w-full">
        <PremiumExtras />
      </div>

      <motion.div
        className="flex flex-col gap-3 w-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Solo Card */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          whileHover={{ scale: 1.01 }}
          onClick={() => handleSelect("solo")}
          className={`relative w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden group ${
            mode === "solo"
              ? "bg-accent/15 border-accent/40 shadow-[0_0_20px_rgba(192,132,252,0.15)]"
              : "bg-white/5 border-white/10 hover:bg-white/[0.06]"
          }`}
        >
          <div className={`absolute inset-0 bg-gradient-to-r from-accent/10 via-purple-500/5 to-transparent pointer-events-none transition-opacity duration-300 ${
            mode === "solo" ? "opacity-50 group-hover:opacity-100" : "opacity-0 group-hover:opacity-40"
          }`} />
          
          <div className="relative flex items-center gap-4 flex-1 pr-4">
            <div className={`flex shrink-0 items-center justify-center w-12 h-12 rounded-xl border transition-colors ${mode === "solo" ? "bg-accent/20 border-accent/30 shadow-[0_0_15px_rgba(192,132,252,0.3)]" : "bg-white/5 border-white/10"}`}>
              <User className={`w-6 h-6 transition-colors ${mode === "solo" ? "text-accent" : "text-white/60"}`} />
            </div>
            <div className="text-left flex-1">
              <div className="flex items-center gap-2">
                <h3 className={`text-[15px] font-bold transition-colors ${mode === "solo" ? "text-white" : "text-white/90"}`}>
                  {t.modeSolo}
                </h3>
              </div>
              <p className="text-[12px] text-white/50 mt-0.5 font-medium">{t.modeSoloSub}</p>
            </div>
          </div>

          <div className="relative flex flex-col items-end gap-1">
            <div className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-bold text-white/90 border border-white/10 backdrop-blur-md">
              ✦ 1
            </div>
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${mode === "solo" ? "border-accent bg-accent/20" : "border-white/20 bg-white/5"}`}>
              {mode === "solo" && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
            </div>
          </div>
        </motion.button>

        {/* Duo Card */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          whileHover={{ scale: 1.01 }}
          onClick={() => handleSelect("duo")}
          className={`relative w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden group ${
            mode === "duo"
              ? "bg-pink-500/15 border-pink-500/40 shadow-[0_0_20px_rgba(236,72,153,0.15)]"
              : "bg-white/5 border-white/10 hover:bg-white/[0.06]"
          }`}
        >
          <div className={`absolute inset-0 bg-gradient-to-r from-pink-500/10 via-rose-500/5 to-transparent pointer-events-none transition-opacity duration-300 ${
            mode === "duo" ? "opacity-50 group-hover:opacity-100" : "opacity-0 group-hover:opacity-40"
          }`} />

          <div className="relative flex items-center gap-4 flex-1 pr-4">
            <div className={`flex shrink-0 items-center justify-center w-12 h-12 rounded-xl border transition-colors ${mode === "duo" ? "bg-pink-500/20 border-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.3)]" : "bg-white/5 border-white/10"}`}>
              <Users className={`w-6 h-6 transition-colors ${mode === "duo" ? "text-pink-400" : "text-white/60"}`} />
            </div>
            <div className="text-left flex-1">
              <h3 className={`text-[15px] font-bold transition-colors ${mode === "duo" ? "text-white" : "text-white/90"}`}>
                {t.modeDuo}
              </h3>
              <p className="text-[12px] text-white/50 mt-0.5 font-medium">{t.modeDuoSub}</p>
            </div>
          </div>

          <div className="relative flex flex-col items-end gap-1">
            <div className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-bold text-white/90 border border-white/10 backdrop-blur-md">
              ✦ 3
            </div>
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${mode === "duo" ? "border-pink-500 bg-pink-500/20" : "border-white/20 bg-white/5"}`}>
              {mode === "duo" && <div className="w-2.5 h-2.5 rounded-full bg-pink-500" />}
            </div>
          </div>
        </motion.button>
      </motion.div>

      {/* Subtle Separator */}
      <motion.div
        className="w-full flex items-center justify-center mt-2 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-full" />
      </motion.div>
    </div>
  );
}
