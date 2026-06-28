"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { hapticLight } from "@/lib/haptics";
import { useT } from "@/hooks/useT";

export default function PremiumExtras() {
  const setExtrasShowcaseOpen = useAppStore((s) => s.setExtrasShowcaseOpen);
  const t = useT();

  const handleClick = () => {
    hapticLight();
    setExtrasShowcaseOpen(true);
  };

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <motion.button
        onClick={handleClick}
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: 1.01 }}
        className="relative w-full flex items-center justify-between p-4 rounded-2xl border border-fuchsia-500/30 bg-white/[0.03] backdrop-blur-xl cursor-pointer transition-all duration-300 hover:bg-white/[0.06] overflow-hidden group shadow-[0_0_15px_rgba(217,70,239,0.1)]"
      >
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/10 via-purple-500/5 to-transparent opacity-50 pointer-events-none group-hover:opacity-100 transition-opacity" />

        <div className="relative flex items-center gap-4 flex-1 pr-4">
          <div className="flex shrink-0 items-center justify-center w-12 h-12 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 shadow-[0_0_15px_rgba(217,70,239,0.2)]">
            <span className="text-[22px]">🔍</span>
          </div>
          <div className="text-left flex-1">
            <h3 className="text-[15px] font-bold text-white/95">{t.crisisCenter}</h3>
            <p className="text-[12px] text-white/50 mt-0.5 font-medium">{t.crisisSub}</p>
          </div>
        </div>

        <div className="relative flex shrink-0 items-center gap-2 text-fuchsia-400">
          <Sparkles className="w-4 h-4 opacity-70 shrink-0" />
          <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0" />
        </div>
      </motion.button>
    </motion.div>
  );
}
