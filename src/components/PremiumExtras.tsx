"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { hapticLight } from "@/lib/haptics";

export default function PremiumExtras() {
  const setExtrasShowcaseOpen = useAppStore((s) => s.setExtrasShowcaseOpen);

  const handleClick = () => {
    hapticLight();
    setExtrasShowcaseOpen(true);
  };

  return (
    <motion.div
      className="mt-5 mb-5 px-1"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <motion.button
        onClick={handleClick}
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: 1.01 }}
        className="relative w-full flex items-center justify-between p-4 rounded-2xl border border-fuchsia-500/30 bg-white/[0.03] backdrop-blur-xl cursor-pointer transition-all duration-300 hover:bg-white/[0.06] overflow-hidden group"
      >
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/10 via-purple-500/10 to-transparent opacity-50 pointer-events-none group-hover:opacity-100 transition-opacity" />

        <div className="relative flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(217,70,239,0.3)]">
            <span className="text-xl">🔍</span>
          </div>
          <div className="text-left">
            <h3 className="text-[14px] font-bold text-white/90">Crisis Center</h3>
            <p className="text-[12px] text-white/50">Decoding the drama and serving brutally honest reality checks. No cap.</p>
          </div>
        </div>

        <div className="relative flex items-center gap-2 text-fuchsia-400">
          <Sparkles className="w-4 h-4 opacity-70" />
          <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </div>
      </motion.button>
    </motion.div>
  );
}
