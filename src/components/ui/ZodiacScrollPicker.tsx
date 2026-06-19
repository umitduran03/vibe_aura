"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZODIAC_SIGNS } from "@/lib/constants";
import type { ZodiacSign } from "@/lib/constants";
import { hapticLight } from "@/lib/haptics";
import { useAppStore } from "@/store/useAppStore";
import { ZodiacIcon } from "@/components/ZodiacIcon";



// ============================================
// Zodiac Scroll-to-Select Picker
// ─ Mobil: touch olayları ile tam 1 item
// ─ Desktop: scroll/hover ile normal çalışma
// ============================================

interface ZodiacScrollPickerProps {
  selectedZodiac: string | null;
  onZodiacChange: (zodiac: string) => void;
}

const ITEM_WIDTH = 72;
const ITEM_GAP = 8;
const ITEM_TOTAL = ITEM_WIDTH + ITEM_GAP; // 80px per step

export default function ZodiacScrollPicker({
  selectedZodiac,
  onZodiacChange,
}: ZodiacScrollPickerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastSelectedRef = useRef<string | null>(selectedZodiac);
  const currentIndexRef = useRef(0);
  const [isMounted, setIsMounted] = useState(false);
  const locale = useAppStore((s) => s.locale);

  const getDisplayName = (sign: ZodiacSign) =>
    locale === "tr" ? (sign.nameTr || sign.name) : sign.name;

  // onZodiacChange'i ref'te tut → event listener'larda stale closure olmaz
  const onZodiacChangeRef = useRef(onZodiacChange);
  useEffect(() => {
    onZodiacChangeRef.current = onZodiacChange;
  }, [onZodiacChange]);

  // ─── Yardımcılar ────────────────────────────────────────────

  const getPadding = useCallback(() => {
    if (!scrollRef.current) return 120;
    return scrollRef.current.clientWidth / 2 - ITEM_WIDTH / 2;
  }, []);

  const scrollToIndex = useCallback((index: number, smooth = true) => {
    if (!scrollRef.current) return;
    currentIndexRef.current = index;
    scrollRef.current.scrollTo({
      left: index * ITEM_TOTAL,
      behavior: smooth ? "smooth" : "instant",
    });
  }, []);

  // Merkezdeki index'e göre zodiac seç + haptic
  const selectAtIndex = useCallback((idx: number) => {
    const sign = ZODIAC_SIGNS[idx];
    if (sign && sign.id !== lastSelectedRef.current) {
      hapticLight();
      lastSelectedRef.current = sign.id;
      onZodiacChangeRef.current(sign.id);
    }
  }, []);

  // ─── Mount: başlangıç seçimine kaydır ───────────────────────

  useEffect(() => {
    setIsMounted(true);
    if (selectedZodiac && scrollRef.current) {
      const idx = ZODIAC_SIGNS.findIndex((z) => z.id === selectedZodiac);
      if (idx >= 0) {
        currentIndexRef.current = idx;
        requestAnimationFrame(() => scrollToIndex(idx, false));
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Dışarıdan selectedZodiac değişirse scroll et
  useEffect(() => {
    if (!isMounted) return;
    if (selectedZodiac && selectedZodiac !== lastSelectedRef.current) {
      const idx = ZODIAC_SIGNS.findIndex((z) => z.id === selectedZodiac);
      if (idx >= 0) scrollToIndex(idx);
      lastSelectedRef.current = selectedZodiac;
    }
  }, [selectedZodiac, isMounted, scrollToIndex]);

  // ─── MOBİL: touch → tam 1 item kaydır ──────────────────────
  // non-passive touchend ile iOS momentum scroll durdurulur
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !isMounted) return;

    let startX = 0;

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };

    const onTouchEnd = (e: TouchEvent) => {
      // iOS momentum scroll'u tamamen durdur
      e.preventDefault();

      const delta = startX - e.changedTouches[0].clientX;
      const THRESHOLD = 15; // px — mikro-dokunuşları yoksay

      let targetIdx = currentIndexRef.current;

      if (Math.abs(delta) > THRESHOLD) {
        if (delta > 0) {
          // Sola kaydır → sonraki item
          targetIdx = Math.min(currentIndexRef.current + 1, ZODIAC_SIGNS.length - 1);
        } else {
          // Sağa kaydır → önceki item
          targetIdx = Math.max(currentIndexRef.current - 1, 0);
        }
      }

      scrollToIndex(targetIdx);
      selectAtIndex(targetIdx);
    };

    // touchstart: passive (engel yok, hızlı)
    // touchend: passive: false → preventDefault çalışsın
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: false });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [isMounted, scrollToIndex, selectAtIndex]);

  // ─── DESKTOP: scroll wheel / trackpad ───────────────────────
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleScroll = useCallback(() => {
    if (scrollTimer.current) clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => {
      if (!scrollRef.current) return;
      const centerIdx = Math.max(
        0,
        Math.min(
          Math.round(scrollRef.current.scrollLeft / ITEM_TOTAL),
          ZODIAC_SIGNS.length - 1
        )
      );
      scrollToIndex(centerIdx);
      selectAtIndex(centerIdx);
    }, 100);
  }, [scrollToIndex, selectAtIndex]);

  useEffect(() => {
    return () => {
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
    };
  }, []);

  // ─── Direkt tıklama ─────────────────────────────────────────
  const handleTap = useCallback(
    (signId: string, index: number) => {
      hapticLight();
      onZodiacChangeRef.current(signId);
      lastSelectedRef.current = signId;
      scrollToIndex(index);
    },
    [scrollToIndex]
  );

  // ─── Desktop hover ───────────────────────────────────────────
  const handleHover = useCallback(
    (signId: string, index: number) => {
      if (signId === lastSelectedRef.current) return;
      hapticLight();
      onZodiacChangeRef.current(signId);
      lastSelectedRef.current = signId;
      scrollToIndex(index);
    },
    [scrollToIndex]
  );

  const padding = isMounted ? getPadding() : 120;

  return (
    <motion.div
      className="relative w-full max-w-[340px] rounded-[2rem] p-2"
      style={{
        background: "rgba(255, 255, 255, 0.02)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.01)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      {/* Center indicator */}
      <div
        className="absolute left-1/2 top-2 bottom-2 -translate-x-1/2 w-[72px] rounded-2xl pointer-events-none z-[1]"
        style={{
          border: "1.5px solid rgba(255, 255, 255, 0.06)",
          background:
            "linear-gradient(180deg, rgba(139,92,246,0.04) 0%, rgba(236,72,153,0.04) 100%)",
        }}
      />

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto gap-2 py-4 snap-x snap-mandatory scrollbar-hide items-center h-[120px]"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingLeft: `${padding}px`,
          paddingRight: `${padding}px`,
          // iOS momentum scroll'u JS tarafından yönetiyoruz
          WebkitOverflowScrolling: "auto",
        }}
      >
        {ZODIAC_SIGNS.map((sign: ZodiacSign, index: number) => {
          const isSelected = selectedZodiac === sign.id;

          return (
            <button
              key={sign.id}
              onClick={() => handleTap(sign.id, index)}
              onMouseEnter={() => handleHover(sign.id, index)}
              className={`snap-center shrink-0 flex flex-col items-center justify-center w-[72px] h-20 relative cursor-pointer outline-none ${
                isSelected
                  ? "scale-110 opacity-100"
                  : "scale-75 opacity-30 hover:opacity-60"
              }`}
              style={{
                transition:
                  "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease",
              }}
            >
              {/* Glow — sadece seçiliyken */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full blur-xl z-0"
                    style={{
                      background: `radial-gradient(circle, ${sign.gradient[0]}60 0%, transparent 70%)`,
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Zodiac sembolü */}
              <div
                className="relative z-10 mb-3 flex items-center justify-center"
                style={{
                  color: isSelected ? "white" : "inherit",
                  filter: isSelected ? `drop-shadow(0 0 10px ${sign.gradient[0]})` : "none",
                  transition: "color 0.3s, filter 0.3s"
                }}
              >
                <ZodiacIcon id={sign.id} className="w-10 h-10" />
              </div>

              {/* İsim */}
              <span
                className="absolute bottom-2 z-10 text-[9px] font-medium tracking-[0.15em] uppercase"
                style={{
                  color: isSelected ? "white" : "rgba(255, 255, 255, 0.3)",
                  textShadow: isSelected
                    ? `0 0 10px ${sign.gradient[1]}`
                    : "none",
                  transition: "color 0.3s, text-shadow 0.3s",
                }}
              >
                {getDisplayName(sign)}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
