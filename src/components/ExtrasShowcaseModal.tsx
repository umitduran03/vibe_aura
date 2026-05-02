"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Flame, HeartCrack, Sparkles, Zap, X } from "lucide-react";
import { useAppStore, type ExtrasType } from "@/store/useAppStore";
import { hapticMedium, hapticLight } from "@/lib/haptics";

const EXTRAS_CARDS: {
  id: ExtrasType;
  title: string;
  emoji: string;
  description: string;
  cost: number;
  gradient: string;
  borderColor: string;
  glowColor: string;
  icon: typeof Flame;
}[] = [
  {
    id: "toxic-ex",
    title: "Toxic Ex Scanner",
    emoji: "💀",
    description: "Should you text them? Get a savage red flag scan before you do something stupid.",
    cost: 3,
    gradient: "from-red-500/20 via-orange-500/10 to-transparent",
    borderColor: "border-red-500/30",
    glowColor: "rgba(239, 68, 68, 0.15)",
    icon: HeartCrack,
  },
  {
    id: "situationship",
    title: "Situationship Clarifier",
    emoji: "🤡",
    description: "Decoding the 'What are we?' mystery. Brutal compatibility stats included.",
    cost: 5,
    gradient: "from-fuchsia-500/20 via-purple-500/10 to-transparent",
    borderColor: "border-fuchsia-500/30",
    glowColor: "rgba(217, 70, 239, 0.15)",
    icon: Zap,
  },
  {
    id: "mood-reset" as ExtrasType,
    title: "Mood Reset",
    emoji: "🔋",
    description: "Bad day? Get a brutally honest wake-up call to fix your mood and recharge your vibe.",
    cost: 3,
    gradient: "from-cyan-500/20 via-teal-500/10 to-transparent",
    borderColor: "border-cyan-500/30",
    glowColor: "rgba(6, 182, 212, 0.15)",
    icon: Sparkles,
  },
];

export default function ExtrasShowcaseModal() {
  const isOpen = useAppStore((s) => s.isExtrasShowcaseOpen);
  const setExtrasShowcaseOpen = useAppStore((s) => s.setExtrasShowcaseOpen);
  const setExtrasType = useAppStore((s) => s.setExtrasType);
  const setExtrasModalOpen = useAppStore((s) => s.setExtrasModalOpen);

  const handleSelect = (type: ExtrasType) => {
    hapticMedium();
    setExtrasShowcaseOpen(false); // Close the showcase modal
    setExtrasType(type); // Set selected extra
    // Slight delay before opening the form modal to let the showcase fade out smoothly
    setTimeout(() => {
      setExtrasModalOpen(true);
    }, 200);
  };

  const closeModal = () => {
    hapticLight();
    setExtrasShowcaseOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-[430px] max-h-[85vh] overflow-y-auto bg-[#0a0a0a] rounded-t-3xl sm:rounded-3xl border border-white/10 shadow-2xl pb-8"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-5 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
              <h2 className="text-[18px] font-bold text-white/90 flex items-center gap-2">
                Crisis Center <span className="text-xl">🔍</span>
              </h2>
              <button
                onClick={closeModal}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-white/50" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col gap-3">
              <p className="text-sm text-white/50 mb-2 leading-relaxed">
                Decoding the drama and serving brutally honest reality checks. No cap.
              </p>
              
              {EXTRAS_CARDS.map((card, i) => {
                return (
                  <motion.button
                    key={card.id}
                    onClick={() => handleSelect(card.id)}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ scale: 1.01 }}
                    className={`relative w-full flex items-start gap-4 p-4 rounded-2xl border ${card.borderColor} bg-white/[0.03] backdrop-blur-xl cursor-pointer transition-all duration-300 hover:bg-white/[0.06] overflow-hidden text-left`}
                    style={{
                      boxShadow: `0 8px 32px ${card.glowColor}`,
                    }}
                  >
                    {/* Background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} pointer-events-none`} />

                    {/* Icon */}
                    <div className="relative flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <span className="text-2xl">{card.emoji}</span>
                    </div>

                    {/* Content */}
                    <div className="relative flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-[14px] font-bold text-white/90 truncate pr-2">
                          {card.title}
                        </h3>
                        {/* Cost badge */}
                        <div className="flex-shrink-0 px-2.5 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md">
                          <span className="text-[10px] font-bold text-white/90">
                            ✦ {card.cost}
                          </span>
                        </div>
                      </div>
                      <p className="text-[12px] leading-relaxed text-white/50">
                        {card.description}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
