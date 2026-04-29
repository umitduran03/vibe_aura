"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const loadingPhrases = [
  "Scanning your vibe frequencies...",
  "Processing personality data...",
  "Deepening the analysis...",
  "Decoding the AI's verdict...",
  "Almost there...",
];

export default function AnalyzingScreen() {
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
