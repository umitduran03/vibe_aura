"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZODIAC_SIGNS } from "@/lib/constants";
import type { ZodiacSign } from "@/lib/constants";
import { hapticLight } from "@/lib/haptics";

// ============================================
// Zodiac Scroll-to-Select Picker
// Apple-style snap-to-center carousel with
// scroll/drag/hover selection + haptic feedback
// ============================================

interface ZodiacScrollPickerProps {
  selectedZodiac: string | null;
  onZodiacChange: (zodiac: string) => void;
}

const ITEM_WIDTH = 72; // w-[72px] per zodiac item
const ITEM_GAP = 8;    // gap-2 = 8px
const ITEM_TOTAL = ITEM_WIDTH + ITEM_GAP; // 80px per step

export default function ZodiacScrollPicker({
  selectedZodiac,
  onZodiacChange,
}: ZodiacScrollPickerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastSelectedRef = useRef<string | null>(selectedZodiac);
  const isUserScrolling = useRef(false);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Calculate left-padding so first item can be centered
  const getPadding = useCallback(() => {
    if (!scrollRef.current) return 120;
    return scrollRef.current.clientWidth / 2 - ITEM_WIDTH / 2;
  }, []);

  // Scroll a specific index into center
  const scrollToIndex = useCallback(
    (index: number, smooth = true) => {
      if (!scrollRef.current) return;
      const pad = getPadding();
      const targetScroll = index * ITEM_TOTAL;
      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: smooth ? "smooth" : "instant",
      });
    },
    [getPadding]
  );

  // Determine which zodiac is at the center of the viewport
  const getCenterIndex = useCallback(() => {
    if (!scrollRef.current) return 0;
    const scrollLeft = scrollRef.current.scrollLeft;
    const index = Math.round(scrollLeft / ITEM_TOTAL);
    return Math.max(0, Math.min(index, ZODIAC_SIGNS.length - 1));
  }, []);

  // On mount: scroll to selected zodiac (no animation)
  useEffect(() => {
    setIsMounted(true);
    if (selectedZodiac && scrollRef.current) {
      const idx = ZODIAC_SIGNS.findIndex((z) => z.id === selectedZodiac);
      if (idx >= 0) {
        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(() => {
          scrollToIndex(idx, false);
        });
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // When selectedZodiac changes externally, scroll to it
  useEffect(() => {
    if (!isMounted) return;
    if (selectedZodiac && selectedZodiac !== lastSelectedRef.current) {
      const idx = ZODIAC_SIGNS.findIndex((z) => z.id === selectedZodiac);
      if (idx >= 0) scrollToIndex(idx);
      lastSelectedRef.current = selectedZodiac;
    }
  }, [selectedZodiac, isMounted, scrollToIndex]);

  // Handle scroll events → detect center item → select it
  const handleScroll = useCallback(() => {
    isUserScrolling.current = true;

    // Debounce: wait for scroll to settle
    if (scrollTimer.current) clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => {
      isUserScrolling.current = false;

      const centerIdx = getCenterIndex();
      const sign = ZODIAC_SIGNS[centerIdx];

      if (sign && sign.id !== lastSelectedRef.current) {
        hapticLight();
        lastSelectedRef.current = sign.id;
        onZodiacChange(sign.id);
      }

      // Snap to exact center position
      scrollToIndex(centerIdx);
    }, 80);
  }, [getCenterIndex, onZodiacChange, scrollToIndex]);

  // Direct tap on a zodiac → scroll to it + select
  const handleTap = useCallback(
    (signId: string, index: number) => {
      hapticLight();
      onZodiacChange(signId);
      lastSelectedRef.current = signId;
      scrollToIndex(index);
    },
    [onZodiacChange, scrollToIndex]
  );

  // Desktop mouse hover → highlight + select (only while NOT scrolling)
  const handleHover = useCallback(
    (signId: string, index: number) => {
      if (isUserScrolling.current) return;
      if (signId === lastSelectedRef.current) return;

      hapticLight();
      onZodiacChange(signId);
      lastSelectedRef.current = signId;
      scrollToIndex(index);
    },
    [onZodiacChange, scrollToIndex]
  );

  // Cleanup timer
  useEffect(() => {
    return () => {
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
    };
  }, []);

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
      {/* Center indicator line (subtle) */}
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
        }}
      >
        {ZODIAC_SIGNS.map((sign: ZodiacSign, index: number) => {
          const isSelected = selectedZodiac === sign.id;

          return (
            <button
              key={sign.id}
              onClick={() => handleTap(sign.id, index)}
              onMouseEnter={() => handleHover(sign.id, index)}
              className={`snap-center shrink-0 flex flex-col items-center justify-center w-[72px] h-20 transition-all duration-400 relative cursor-pointer outline-none ${
                isSelected
                  ? "scale-110 opacity-100"
                  : "scale-75 opacity-30 hover:opacity-60"
              }`}
              style={{
                transition:
                  "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease",
              }}
            >
              {/* Glow effect — only when selected */}
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

              {/* Zodiac emoji */}
              <span
                className="relative z-10 text-[40px] font-light leading-none mb-3"
                style={{
                  fontFamily: "Times New Roman, serif",
                  color: isSelected ? "white" : "inherit",
                  textShadow: isSelected
                    ? `0 0 15px ${sign.gradient[0]}`
                    : "none",
                  transition: "color 0.3s, text-shadow 0.3s",
                }}
              >
                {sign.emoji}
                {"\uFE0E"}
              </span>

              {/* Label */}
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
                {sign.name}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
