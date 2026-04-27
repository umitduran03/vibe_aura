"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { useMemo } from "react";
import { ShoppingCart } from "lucide-react";

/**
 * Kompakt, Apple tarzı Split Button (Ayrık Buton) jeton göstergesi.
 * Tıklandığında mağazayı açar. Hover durumunda şık bir neon parlama verir.
 */
export default function TokenBadge() {
  const tokenBalance = useAppStore((s) => s.tokenBalance);
  const vipExpiry = useAppStore((s) => s.vipExpiry);
  const setTokenModalOpen = useAppStore((s) => s.setTokenModalOpen);

  const isVip = useMemo(() => {
    if (!vipExpiry) return false;
    return new Date(vipExpiry) > new Date();
  }, [vipExpiry]);

  return (
    <motion.button
      className="group flex items-center p-0.5 rounded-full bg-white/5 border border-white/10 select-none cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-purple-500/30 shadow-[0_0_0_rgba(139,92,246,0)] hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.5 }}
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
            className="flex items-center gap-1.5 px-3 py-1.5"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-sm">✨</span>
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
  );
}
