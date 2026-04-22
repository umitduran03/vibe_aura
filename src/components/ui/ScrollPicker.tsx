"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface ScrollPickerProps {
  items: number[];
  selectedValue: number;
  onSelect: (value: number) => void;
  itemHeight?: number;
  visibleCount?: number;
}

export default function ScrollPicker({
  items,
  selectedValue,
  onSelect,
  itemHeight = 48,
  visibleCount = 5,
}: ScrollPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const containerHeight = itemHeight * visibleCount;
  const paddingItems = Math.floor(visibleCount / 2);

  const scrollToValue = useCallback(
    (value: number, smooth = true) => {
      const container = containerRef.current;
      if (!container) return;
      const index = items.indexOf(value);
      if (index === -1) return;
      container.scrollTo({
        top: index * itemHeight,
        behavior: smooth ? "smooth" : "auto",
      });
    },
    [items, itemHeight]
  );

  useEffect(() => {
    scrollToValue(selectedValue, false);
  }, [selectedValue, scrollToValue]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container || isDragging) return;
    const scrollTop = container.scrollTop;
    const index = Math.round(scrollTop / itemHeight);
    const clamped = Math.max(0, Math.min(items.length - 1, index));
    if (items[clamped] !== selectedValue) {
      onSelect(items[clamped]);
    }
  };

  const handleScrollEnd = () => {
    const container = containerRef.current;
    if (!container) return;
    const scrollTop = container.scrollTop;
    const index = Math.round(scrollTop / itemHeight);
    const clamped = Math.max(0, Math.min(items.length - 1, index));
    onSelect(items[clamped]);
    scrollToValue(items[clamped]);
    setIsDragging(false);
  };

  return (
    <div className="relative mx-auto w-24" style={{ height: containerHeight }}>
      {/* Selection highlight */}
      <div
        className="pointer-events-none absolute left-0 right-0 z-10 rounded-xl border border-accent/30 bg-accent-dim"
        style={{
          top: paddingItems * itemHeight,
          height: itemHeight,
        }}
      />

      {/* Scroll container */}
      <div
        ref={containerRef}
        className="scroll-picker h-full overflow-y-auto"
        style={{ scrollSnapType: "y mandatory" }}
        onScroll={handleScroll}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={handleScrollEnd}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={handleScrollEnd}
      >
        {/* Top padding */}
        {Array.from({ length: paddingItems }).map((_, i) => (
          <div key={`pad-top-${i}`} style={{ height: itemHeight }} />
        ))}

        {items.map((item) => {
          const isSelected = item === selectedValue;
          return (
            <motion.div
              key={item}
              className={`flex cursor-pointer items-center justify-center font-medium transition-all duration-200 ${
                isSelected
                  ? "text-2xl text-accent"
                  : "text-lg text-text-secondary/50"
              }`}
              style={{
                height: itemHeight,
                scrollSnapAlign: "center",
              }}
              onClick={() => {
                onSelect(item);
                scrollToValue(item);
              }}
              animate={{
                scale: isSelected ? 1.1 : 0.85,
                opacity: isSelected ? 1 : 0.4,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              {item}
            </motion.div>
          );
        })}

        {/* Bottom padding */}
        {Array.from({ length: paddingItems }).map((_, i) => (
          <div key={`pad-bot-${i}`} style={{ height: itemHeight }} />
        ))}
      </div>
    </div>
  );
}
