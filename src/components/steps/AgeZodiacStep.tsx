"use client";

import { motion } from "framer-motion";
import { ZODIAC_SIGNS, AGE_RANGE } from "@/lib/constants";
import { cardGridVariants, cardItemVariants } from "@/lib/animations";
import GlassCard from "@/components/ui/GlassCard";
import ScrollPicker from "@/components/ui/ScrollPicker";
import type { ZodiacSign } from "@/lib/constants";

interface AgeZodiacStepProps {
  selectedAge: number;
  selectedZodiac: string | null;
  onAgeChange: (age: number) => void;
  onZodiacChange: (zodiac: string) => void;
}

const ages = Array.from(
  { length: AGE_RANGE.max - AGE_RANGE.min + 1 },
  (_, i) => AGE_RANGE.min + i
);

export default function AgeZodiacStep({
  selectedAge,
  selectedZodiac,
  onAgeChange,
  onZodiacChange,
}: AgeZodiacStepProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* Yaş Seçici */}
      <div>
        <motion.h2
          className="text-center text-xl font-semibold text-foreground mb-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          How old are you? 🎂
        </motion.h2>
        <motion.p
          className="text-center text-sm text-text-secondary mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Scroll to pick
        </motion.p>
        <ScrollPicker
          items={ages}
          selectedValue={selectedAge}
          onSelect={onAgeChange}
        />
      </div>

      {/* Burç Seçimi */}
      <div>
        <motion.h2
          className="text-center text-xl font-semibold text-foreground mb-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          What's your zodiac? ✨
        </motion.h2>
        <motion.p
          className="text-center text-sm text-text-secondary mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Let's analyze your star chart
        </motion.p>

        <motion.div
          className="grid grid-cols-4 gap-2.5"
          variants={cardGridVariants}
          initial="hidden"
          animate="visible"
        >
          {ZODIAC_SIGNS.map((sign: ZodiacSign) => (
            <motion.div key={sign.id} variants={cardItemVariants}>
              <GlassCard
                selected={selectedZodiac === sign.id}
                onClick={() => onZodiacChange(sign.id)}
                glowColor={
                  selectedZodiac === sign.id
                    ? `${sign.gradient[0]}40`
                    : undefined
                }
                className="!p-2.5 flex flex-col items-center justify-center gap-1"
              >
                <span className="text-2xl">{sign.emoji}</span>
                <span className="text-[11px] font-medium text-text-secondary">
                  {sign.name}
                </span>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
