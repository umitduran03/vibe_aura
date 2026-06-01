"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { useMemo, useEffect, useRef, useState } from "react";
import { Flame, ShoppingCart } from "lucide-react";
import { useStreakStore } from "@/store/useStreakStore";

/**
 * Kompakt, Apple tarzı Split Button (Ayrık Buton) jeton göstergesi.
 * Tıklandığında mağazayı açar. Hover durumunda şık bir neon parlama verir.
 * Jeton satın alındığında animasyonlu bir bildirim (Toast efekti) çıkarır.
 */
export default function TokenBadge() {
  const tokenBalance = useAppStore((s) => s.tokenBalance);
  const vipExpiry = useAppStore((s) => s.vipExpiry);
  const setTokenModalOpen = useAppStore((s) => s.setTokenModalOpen);
  const streakCount = useStreakStore((s) => s.streakCount);

  const openStreakInfoModal = useStreakStore((s) => s.openStreakInfoModal);

  const prevBalanceRef = useRef(tokenBalance);
  const [addedTokens, setAddedTokens] = useState<number | null>(null);

  // VIP Durum Kontrolü
  const isVip = useMemo(() => {
    if (!vipExpiry) return false;
    return new Date(vipExpiry) > new Date();
  }, [vipExpiry]);

  // Jeton artışını (satın alım) dinle ve animasyon tetikle
  useEffect(() => {
    if (tokenBalance > prevBalanceRef.current && prevBalanceRef.current >= 0) {
      const diff = tokenBalance - prevBalanceRef.current;
      setAddedTokens(diff);
      
      // Dinamik olarak haptic import edip çalıştır
      import("@/lib/haptics").then((m) => {
        if (m.hapticMedium) m.hapticMedium();
      }).catch(() => {});

      const timer = setTimeout(() => setAddedTokens(null), 3000);
      return () => clearTimeout(timer);
    }
    prevBalanceRef.current = tokenBalance;
  }, [tokenBalance]);

  const hasStreak = streakCount > 0;

  return (
    <div className="flex items-center gap-2 relative">
      {/* Streak Badge (Clickable to open info) */}
      <motion.button
        onClick={() => openStreakInfoModal()}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full select-none cursor-pointer transition-all duration-300 shadow-sm border ${
          hasStreak 
          ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-orange-500/30 hover:shadow-[0_0_15px_rgba(249,115,22,0.15)]" 
          : "bg-white/5 border-white/10 hover:bg-white/10"
        }`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Flame className={`w-3.5 h-3.5 ${hasStreak ? "text-orange-400 drop-shadow-[0_0_6px_rgba(249,115,22,0.6)]" : "text-white/40"}`} />
        <span className={`text-[13px] font-bold tabular-nums ${hasStreak ? "text-white/90 group-hover:text-white" : "text-white/40"}`}>
          {streakCount}
        </span>
      </motion.button>

      {/* Token Badge */}
      <motion.button
        className="group flex items-center p-0.5 rounded-full bg-white/5 border border-white/10 select-none cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-purple-500/30 shadow-[0_0_0_rgba(139,92,246,0)] hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        onClick={() => setTokenModalOpen(true)}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {isVip ? (
            <motion.div
              key="vip-badge"
              className="flex items-center gap-1.5 px-3 py-1.5 text-yellow-400"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-sm font-black">∞</span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-yellow-400/20 px-1.5 py-0.5 rounded">VIP</span>
            </motion.div>
          ) : (
            <motion.div
              key="token-badge"
              className="flex items-center gap-1 px-3 py-1.5"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-[11px] font-bold text-white/80 group-hover:text-white/95 transition-colors">✦</span>
              <span className="text-[13px] font-bold tabular-nums text-foreground/90 group-hover:text-white transition-colors">
                {tokenBalance}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* İnce Ayırıcı (Divider) */}
        <div className="w-[1px] h-4 bg-white/20 transition-colors group-hover:bg-purple-500/30" />

        {/* Sağ Kısım: Mağaza İkonu (Sepet) */}
        <div className="flex items-center justify-center px-2.5 py-1">
          <ShoppingCart className="w-3.5 h-3.5 text-white/50 group-hover:text-white transition-colors duration-300" />
        </div>
      </motion.button>

      {/* Floating "+10" Satın Alım Animasyonu */}
      <AnimatePresence>
        {addedTokens !== null && (
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 0.8 }}
            animate={{ opacity: 1, y: -30, scale: 1.1 }}
            exit={{ opacity: 0, y: -45, scale: 0.9 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute -top-2 left-1/2 -translate-x-1/2 text-green-400 font-extrabold text-sm pointer-events-none drop-shadow-[0_0_10px_rgba(74,222,128,0.8)] z-50 whitespace-nowrap"
          >
            +{addedTokens} ✨
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
