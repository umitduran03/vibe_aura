"use client";

import { motion } from "framer-motion";
import ZodiacScrollPicker from "@/components/ui/ZodiacScrollPicker";
import AgeSelector from "@/components/ui/AgeSelector";
import { useT } from "@/hooks/useT";

interface AgeZodiacStepProps {
  selectedAge: number;
  selectedZodiac: string | null;
  onAgeChange: (age: number) => void;
  onZodiacChange: (zodiac: string) => void;
}

export default function AgeZodiacStep({
  selectedAge,
  selectedZodiac,
  onAgeChange,
  onZodiacChange,
}: AgeZodiacStepProps) {
  const t = useT();

  return (
    <div className="flex flex-col gap-10">
      <AgeSelector
        selectedAge={selectedAge}
        onAgeChange={onAgeChange}
        label={t.ageLabel}
        delay={0.2}
      />

      {/* ─── Zodiac Scroll-to-Select Picker ─── */}
      <div className="flex flex-col items-center">
        <motion.h2
          className="text-center text-sm font-semibold text-white/90 tracking-wide uppercase mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {t.zodiacLabel}
        </motion.h2>

        <ZodiacScrollPicker
          selectedZodiac={selectedZodiac}
          onZodiacChange={onZodiacChange}
        />
      </div>
    </div>
  );
}
