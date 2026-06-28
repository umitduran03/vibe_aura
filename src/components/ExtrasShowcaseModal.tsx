"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Flame, HeartCrack, Sparkles, Zap, X, MessageCircle, Send } from "lucide-react";
import { useAppStore, type ExtrasType } from "@/store/useAppStore";
import { hapticMedium, hapticLight } from "@/lib/haptics";

import { useT } from "@/hooks/useT";

export default function ExtrasShowcaseModal() {
  const t = useT();
  const isOpen = useAppStore((s) => s.isExtrasShowcaseOpen);
  const setExtrasShowcaseOpen = useAppStore((s) => s.setExtrasShowcaseOpen);
  const setExtrasType = useAppStore((s) => s.setExtrasType);
  const setExtrasModalOpen = useAppStore((s) => s.setExtrasModalOpen);

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
      id: "delulu-check",
      title: t.extrasDeluluTitle,
      emoji: "📱",
      description: t.extrasDeluluDesc,
      cost: 10,
      gradient: "from-amber-500/20 via-yellow-500/10 to-transparent",
      borderColor: "border-amber-500/30",
      glowColor: "rgba(245, 158, 11, 0.15)",
      icon: MessageCircle,
    },
    {
      id: "rizz-architect",
      title: t.extrasRizzTitle,
      emoji: "💬",
      description: t.extrasRizzDesc,
      cost: 2,
      gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
      borderColor: "border-violet-500/30",
      glowColor: "rgba(139, 92, 246, 0.15)",
      icon: Send,
    },
    {
      id: "situationship",
      title: t.extrasSitTitle,
      emoji: "🤡",
      description: t.extrasSitDesc,
      cost: 5,
      gradient: "from-fuchsia-500/20 via-purple-500/10 to-transparent",
      borderColor: "border-fuchsia-500/30",
      glowColor: "rgba(217, 70, 239, 0.15)",
      icon: Zap,
    },
    {
      id: "toxic-ex",
      title: t.extrasToxicTitle,
      emoji: "💀",
      description: t.extrasToxicDesc,
      cost: 5,
      gradient: "from-red-500/20 via-orange-500/10 to-transparent",
      borderColor: "border-red-500/30",
      glowColor: "rgba(239, 68, 68, 0.15)",
      icon: HeartCrack,
    },
    {
      id: "profile-autopsy",
      title: t.profileAutopsyTitle,
      emoji: "🔬",
      description: t.profileAutopsyDesc,
      cost: 7,
      gradient: "from-indigo-500/20 via-violet-500/10 to-transparent",
      borderColor: "border-indigo-500/30",
      glowColor: "rgba(124, 58, 237, 0.15)",
      icon: Sparkles,
    },
    {
      id: "mood-reset",
      title: t.extrasMoodTitle,
      emoji: "🔋",
      description: t.extrasMoodDesc,
      cost: 2,
      gradient: "from-cyan-500/20 via-teal-500/10 to-transparent",
      borderColor: "border-cyan-500/30",
      glowColor: "rgba(6, 182, 212, 0.15)",
      icon: Sparkles,
    },
  ];

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
            className="relative w-full max-w-[430px] max-h-[95dvh] overflow-y-auto bg-[#0a0a0a] rounded-t-3xl sm:rounded-3xl border border-white/10 shadow-2xl pb-8"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-5 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
              <h2 className="text-[18px] font-bold text-white/90 flex items-center gap-2">
                {t.extrasShowcaseTitle}
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
                {t.extrasShowcaseDesc}
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
                    className={`relative w-full flex items-center p-3.5 rounded-2xl border ${card.borderColor} bg-white/[0.03] backdrop-blur-xl cursor-pointer transition-all duration-300 hover:bg-white/[0.06] overflow-hidden text-left group`}
                    style={{
                      boxShadow: `0 8px 32px ${card.glowColor}`,
                    }}
                  >
                    {/* Background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none`} />

                    {/* Left: Icon */}
                    <div className="relative flex shrink-0 items-center justify-center w-11 h-11 rounded-xl bg-white/5 border border-white/10 mr-4">
                      <span className="text-xl">{card.emoji}</span>
                    </div>

                    {/* Middle: Content */}
                    <div className="relative flex-1 min-w-0 pr-3 py-1">
                      <h3 className="text-[14px] font-bold text-white/90 mb-0.5 leading-snug">
                        {card.title}
                      </h3>
                      <p className="text-[11px] text-white/50 leading-snug pr-1">
                        {card.description}
                      </p>
                    </div>

                    {/* Right: Token Badge */}
                    <div className="relative flex shrink-0 items-center justify-center px-2.5 py-1 rounded-full bg-white/10 text-[10px] font-bold text-white/90 border border-white/10 backdrop-blur-md">
                      ✦ {card.cost}
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
