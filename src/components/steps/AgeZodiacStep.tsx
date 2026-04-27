"use client";

import { motion } from "framer-motion";
import { AGE_RANGE } from "@/lib/constants";
import { Minus, Plus } from "lucide-react";
import { hapticLight } from "@/lib/haptics";
import ZodiacScrollPicker from "@/components/ui/ZodiacScrollPicker";

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

  const handleAgeChange = (newAge: number) => {
    if (newAge >= AGE_RANGE.min && newAge <= AGE_RANGE.max) {
      hapticLight();
      onAgeChange(newAge);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {/* ─── Age Selector (Compact Pill Design) ─── */}
      <div className="flex flex-col items-center">
        <motion.h2
          className="text-center text-sm font-semibold text-white/90 tracking-wide uppercase mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Age Details
        </motion.h2>
        
        <motion.div 
          className="inline-flex items-center justify-center p-1 rounded-full backdrop-blur-xl transition-all"
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "inset 0 1px 10px rgba(255, 255, 255, 0.02), 0 10px 30px -10px rgba(0,0,0,0.3)",
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <button 
            onClick={() => handleAgeChange(selectedAge - 1)}
            disabled={selectedAge <= AGE_RANGE.min}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:bg-white/10 active:scale-95 text-white/60 hover:text-white"
          >
            <Minus className="w-4 h-4" />
          </button>
          
          <div className="w-16 flex items-center justify-center">
            <span className="text-xl font-medium text-white tracking-wider">
              {selectedAge}
            </span>
          </div>

          <button 
            onClick={() => handleAgeChange(selectedAge + 1)}
            disabled={selectedAge >= AGE_RANGE.max}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:bg-white/10 active:scale-95 text-white/60 hover:text-white"
          >
            <Plus className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* ─── Zodiac Scroll-to-Select Picker ─── */}
      <div className="flex flex-col items-center">
        <motion.h2
          className="text-center text-sm font-semibold text-white/90 tracking-wide uppercase mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Zodiac Sign
        </motion.h2>

        <ZodiacScrollPicker
          selectedZodiac={selectedZodiac}
          onZodiacChange={onZodiacChange}
        />
      </div>
    </div>
  );
}
