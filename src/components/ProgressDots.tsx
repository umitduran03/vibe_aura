"use client";

import { motion } from "framer-motion";
import { TOTAL_STEPS } from "@/lib/constants";

interface ProgressDotsProps {
  currentStep: number;
  totalOverride?: number;
}

export default function ProgressDots({ currentStep, totalOverride }: ProgressDotsProps) {
  const steps = totalOverride ?? TOTAL_STEPS;
  return (
    <div className="flex items-center justify-center gap-3 py-6">
      {Array.from({ length: steps }).map((_, index) => {
        const isActive = index === currentStep;
        const isPast = index < currentStep;

        return (
          <motion.div
            key={index}
            className="relative"
            animate={{
              scale: isActive ? 1 : 0.8,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <motion.div
              className={`rounded-full transition-colors duration-300 ${
                isActive
                  ? "bg-accent"
                  : isPast
                  ? "bg-accent/50"
                  : "bg-glass-border"
              }`}
              animate={{
                width: isActive ? 32 : 8,
                height: 8,
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-full bg-accent/30 blur-sm"
                animate={{
                  width: 32,
                  height: 8,
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0.2, 0.5],
                }}
                transition={{
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
