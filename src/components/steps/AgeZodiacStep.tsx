"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ZODIAC_SIGNS, AGE_RANGE } from "@/lib/constants";
import type { ZodiacSign } from "@/lib/constants";
import { Minus, Plus } from "lucide-react";
import { hapticLight } from "@/lib/haptics";
import { useRef } from "react";

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
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleAgeChange = (newAge: number) => {
    if (newAge >= AGE_RANGE.min && newAge <= AGE_RANGE.max) {
      hapticLight();
      onAgeChange(newAge);
    }
  };

  const handleZodiacChange = (id: string, index: number) => {
    hapticLight();
    onZodiacChange(id);
    
    // Seçilen öğeyi merkeze kaydır (Premium Carousel Hissi)
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const itemWidth = 64 + 8; // w-16 (64px) + gap-2 (8px)
      const centerPos = (index * itemWidth) - (container.clientWidth / 2) + (itemWidth / 2) + 120; // 120px px padding
      container.scrollTo({ left: centerPos, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {/* ─── YENİ SAAS YAŞ SEÇİCİ (Kompakt Pill Design) ─── */}
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

      {/* ─── YENİ SAAS BURÇ KAYDIRICI (Carousel Sigil Picker) ─── */}
      <div className="flex flex-col items-center">
        <motion.h2
          className="text-center text-sm font-semibold text-white/90 tracking-wide uppercase mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Zodiac Sign
        </motion.h2>

        <motion.div
          className="relative w-full max-w-[340px] rounded-[2rem] p-2"
          style={{
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.01)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
            maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-2 py-4 px-[120px] snap-x snap-mandatory scrollbar-hide items-center h-[120px]"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {ZODIAC_SIGNS.map((sign: ZodiacSign, index: number) => {
              const isSelected = selectedZodiac === sign.id;
              
              return (
                <button
                  key={sign.id}
                  onClick={() => handleZodiacChange(sign.id, index)}
                  className={`snap-center shrink-0 flex flex-col items-center justify-center w-16 h-20 transition-all duration-500 relative cursor-pointer outline-none ${
                    isSelected ? "scale-110 opacity-100" : "scale-75 opacity-30 hover:opacity-60"
                  }`}
                >
                  {/* Merkez Glow Efekti (Sadece seçiliyken) */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute inset-0 rounded-full blur-xl z-0"
                        style={{ background: `radial-gradient(circle, ${sign.gradient[0]}60 0%, transparent 70%)` }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Sigil (Line-art text rendering trick ile) */}
                  <span 
                    className="relative z-10 text-[40px] font-light leading-none mb-3"
                    style={{ 
                      fontFamily: "Times New Roman, serif",
                      color: isSelected ? "white" : "inherit",
                      textShadow: isSelected ? `0 0 15px ${sign.gradient[0]}` : "none",
                    }}
                  >
                    {sign.emoji}{'\uFE0E'}
                  </span>
                  
                  {/* Etiket (Her zaman görünür) */}
                  <span 
                    className="absolute bottom-2 z-10 text-[9px] font-medium tracking-[0.15em] uppercase transition-all duration-500"
                    style={{ 
                      color: isSelected ? "white" : "rgba(255, 255, 255, 0.3)",
                      textShadow: isSelected ? `0 0 10px ${sign.gradient[1]}` : "none",
                    }}
                  >
                    {sign.name}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
