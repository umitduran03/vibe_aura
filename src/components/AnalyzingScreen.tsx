"use client";

import { m } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { useT } from "@/hooks/useT";
import DisplayAd from "@/components/DisplayAd";

export default function AnalyzingScreen() {
  const analysisMode = useAppStore((s) => s.analysisMode);
  const soloScenario = useAppStore((s) => s.soloScenario);
  const duoRelationType = useAppStore((s) => s.duoRelationType);
  const extrasType = useAppStore((s) => s.extrasType);

  const t = useT();
  const locale = useAppStore((s) => s.locale);

  // Lock the phrases on mount so they don't jump if state resets during unmount
  const [loadingPhrases] = useState(() => {
    if (extrasType) {
      switch (extrasType) {
        case "toxic-ex": return t.analyzingToxicEx;
        case "situationship": return t.analyzingSituationship;
        case "mood-reset": return t.analyzingMoodReset;
        case "delulu-check": return t.analyzingDeluluCheck;
        case "rizz-architect": return t.analyzingRizzArchitect;
      }
    }

    if (analysisMode === "duo") {
      switch (duoRelationType) {
        case "flirt": return t.analyzingDuoFlirt;
        case "ex": return t.analyzingDuoEx;
        case "platonic": return t.analyzingDuoPlatonic;
        case "bff": return t.analyzingDuoBff;
        case "battle": return t.analyzingDuoBattle;
      }
    }

    switch (soloScenario) {
      case "roast": return t.analyzingSoloRoast;
      case "soulmate": return t.analyzingSoloSoulmate;
      case "general":
      default:
        return t.analyzingGeneral;
    }
  });

  return (
    <m.div
      className="fixed inset-0 z-50 flex flex-col justify-between items-center overflow-hidden"
      style={{
        background:
          "linear-gradient(145deg, #0a0a0f 0%, #1a1025 50%, #0d0d1a 100%)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top Ad Slot (Pre-allocated space to prevent shift) */}
      <div className="w-full max-w-sm z-10 px-4 pt-safe-top pt-8 min-h-[120px] flex items-start justify-center pointer-events-auto">
        <DisplayAd />
      </div>

      {/* Safely Centered Animation Area */}
      <div className="flex-grow flex flex-col items-center justify-center gap-8 w-full pointer-events-none px-4">
        {/* Pulsing rings */}
        <div className="relative flex items-center justify-center">
          {[1, 2, 3].map((ring) => (
            <m.div
              key={ring}
              className="absolute rounded-full border border-accent/20"
              style={{
                width: `${ring * 80}px`,
                height: `${ring * 80}px`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 2 + ring * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: ring * 0.2,
              }}
            />
          ))}

          {/* Center icon */}
          <m.div
            animate={{
              scale: [1, 1.15, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 4, repeat: Infinity, ease: "linear" },
            }}
          >
            <Sparkles className="h-8 w-8 text-accent" />
          </m.div>
        </div>

        {/* Cycling text */}
        <div className="h-12 overflow-hidden w-full max-w-[320px]">
          <m.div
            animate={{ y: [0, -48, -96, -144, -192] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.25, 0.5, 0.75, 1],
            }}
          >
            {loadingPhrases.map((phrase, i) => (
              <div key={i} className="h-12 flex items-center justify-center px-4">
                <p className="text-sm font-medium text-text-secondary tracking-widest uppercase text-center leading-relaxed">
                  {phrase}
                </p>
              </div>
            ))}
          </m.div>
        </div>
      </div>

      {/* Bottom Ad Slot (Pre-allocated space to prevent shift) */}
      <div className="w-full max-w-sm z-10 px-4 pb-safe-bottom pb-8 min-h-[120px] flex items-end justify-center pointer-events-auto">
        <DisplayAd />
      </div>

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-48 w-48 rounded-full bg-accent/10 blur-[80px] pointer-events-none" />
    </m.div>
  );
}
