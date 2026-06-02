"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";

export default function AnalyzingScreen() {
  const analysisMode = useAppStore((s) => s.analysisMode);
  const soloScenario = useAppStore((s) => s.soloScenario);
  const duoRelationType = useAppStore((s) => s.duoRelationType);
  const extrasType = useAppStore((s) => s.extrasType);

  // Lock the phrases on mount so they don't jump if state resets during unmount
  const [loadingPhrases] = useState(() => {
    if (extrasType) {
      switch (extrasType) {
        case "toxic-ex": return ["SCANNING TOXICITY...", "REVIEWING MISTAKES...", "JUDGING LIFE CHOICES...", "FINDING RED FLAGS...", "PREPARING REALITY CHECK..."];
        case "situationship": return ["ANALYZING CONFUSION...", "DECODING MIXED SIGNALS...", "MEASURING COMMITMENT...", "CHECKING REALITY...", "SPITTING HARSH TRUTHS..."];
        case "mood-reset": return ["SCANNING ENERGY LEVELS...", "PURGING BAD VIBES...", "CALCULATING AURA SHIFT...", "PREPARING WAKE UP CALL...", "RECHARGING THE VIBE..."];
        case "delulu-check": return ["MEASURING DELUSION...", "ANALYZING RECEIPTS...", "IGNORING FAKE HOPES...", "CALCULATING REALITY...", "PREPARING BRUTAL TRUTH..."];
        case "rizz-architect": return ["ANALYZING MIND GAMES...", "SCANNING THE CHAT...", "CALCULATING POWER MOVE...", "CRAFTING THE TRAP...", "GENERATING RIZZ..."];
      }
    }

    if (analysisMode === "duo") {
      switch (duoRelationType) {
        case "flirt": return ["SCANNING CHEMISTRY...", "MEASURING THE SPARK...", "COMPARING ZODIACS...", "CHECKING LONG-TERM ODDS...", "CALCULATING LOVE SCORE..."];
        case "ex": return ["SCANNING THE DAMAGE...", "FINDING WHO WAS TOXIC...", "ANALYZING THE BREAKUP...", "CHECKING REMAINING FEELINGS...", "PREPARING BRUTAL TRUTH..."];
        case "platonic": return ["ANALYZING THE TENSION...", "MEASURING FRIENDZONE RISK...", "DECODING HIDDEN FEELINGS...", "CHECKING COMPATIBILITY...", "CALCULATING CRUSH ODDS..."];
        case "bff": return ["SCANNING CHAOS LEVELS...", "CHECKING PLATONIC VIBES...", "MEASURING LOYALTY...", "ANALYZING YOUR DYNAMICS...", "CALCULATING BFF SCORE..."];
      }
    }

    switch (soloScenario) {
      case "roast": return ["JUDGING YOUR SELFIE...", "FINDING YOUR FLAWS...", "QUESTIONING YOUR CHOICES...", "ACTIVATING SAVAGE MODE...", "PREPARING BRUTAL ROAST..."];
      case "soulmate": return ["SCANNING ROMANTIC AURA...", "CALCULATING RIZZ LEVEL...", "SEARCHING FOR MATCHES...", "ANALYZING LOVE POTENTIAL...", "PREPARING SOULMATE PROFILE..."];
      case "general":
      default:
        return ["SCANNING VIBE FREQUENCY...", "EXTRACTING AURA DATA...", "READING YOUR ENERGY...", "DECODING PERSONALITY...", "FINALIZING VIBE CHECK..."];
    }
  });

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8"
      style={{
        background:
          "linear-gradient(145deg, #0a0a0f 0%, #1a1025 50%, #0d0d1a 100%)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Pulsing rings */}
      <div className="relative flex items-center justify-center">
        {[1, 2, 3].map((ring) => (
          <motion.div
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
        <motion.div
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
        </motion.div>
      </div>

      {/* Cycling text */}
      <div className="h-12 overflow-hidden w-full max-w-[320px]">
        <motion.div
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
        </motion.div>
      </div>

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-48 w-48 rounded-full bg-accent/10 blur-[80px]" />
    </motion.div>
  );
}
