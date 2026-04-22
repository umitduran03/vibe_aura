"use client";

import { motion } from "framer-motion";
import { RELATIONSHIP_OPTIONS } from "@/lib/constants";
import { cardGridVariants, cardItemVariants } from "@/lib/animations";
import GlassCard from "@/components/ui/GlassCard";

interface RelationshipStepProps {
  selected: string | null;
  onSelect: (id: string) => void;
}

export default function RelationshipStep({
  selected,
  onSelect,
}: RelationshipStepProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <motion.h2
          className="text-center text-xl font-semibold text-foreground mb-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Relationship status? 💫
        </motion.h2>
        <motion.p
          className="text-center text-sm text-text-secondary mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          We aren't judging... much
        </motion.p>
      </div>

      <motion.div
        className="flex flex-col gap-3"
        variants={cardGridVariants}
        initial="hidden"
        animate="visible"
      >
        {RELATIONSHIP_OPTIONS.map((option) => (
          <motion.div key={option.id} variants={cardItemVariants}>
            <GlassCard
              selected={selected === option.id}
              onClick={() => onSelect(option.id)}
              glowColor={
                selected === option.id
                  ? "rgba(192, 132, 252, 0.15)"
                  : undefined
              }
              className="!p-4 flex flex-row items-center gap-4"
            >
              <span className="text-2xl flex-shrink-0">{option.emoji}</span>
              <span className="text-base font-medium text-foreground">
                {option.label}
              </span>
              {selected === option.id && (
                <motion.div
                  className="ml-auto flex-shrink-0 h-5 w-5 rounded-full bg-accent flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  <svg
                    className="h-3 w-3 text-background"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
              )}
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
