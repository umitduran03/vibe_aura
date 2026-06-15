"use client";

import { motion } from "framer-motion";
import { useAppStore, type SoloScenario } from "@/store/useAppStore";
import { hapticLight } from "@/lib/haptics";
import { useT } from "@/hooks/useT";

export default function SoloScenarioSelector() {
  const scenario = useAppStore((s) => s.soloScenario);
  const setScenario = useAppStore((s) => s.setSoloScenario);
  const t = useT();

  const SCENARIOS: { id: SoloScenario; emoji: string; label: string }[] = [
    { id: "general",  emoji: "✨", label: t.scenarioGeneral },
    { id: "roast",    emoji: "🔥", label: t.scenarioRoast },
    { id: "soulmate", emoji: "❤️‍🔥", label: t.scenarioSoulmate },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="mb-4"
    >
      <h2 className="text-center text-sm font-semibold text-white/90 tracking-wide uppercase mb-4">
        {t.analysisType}
      </h2>
      <div className="flex gap-2">
        {SCENARIOS.map((s) => (
          <motion.button
            key={s.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => { hapticLight(); setScenario(s.id); }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-2xl text-[12px] font-semibold transition-all duration-300 cursor-pointer border ${
              scenario === s.id
                ? "bg-accent/15 border-accent/40 text-foreground shadow-[0_0_16px_rgba(192,132,252,0.12)]"
                : "bg-white/5 border-white/5 text-text-secondary/60 hover:bg-white/8"
            }`}
          >
            <span className="text-[14px]">{s.emoji}</span>
            {s.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
