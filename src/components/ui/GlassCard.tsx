"use client";

import { motion } from "framer-motion";
import { tapScale, hoverScale } from "@/lib/animations";
import { hapticLight } from "@/lib/haptics";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  glowColor?: string;
}

export default function GlassCard({
  children,
  selected = false,
  onClick,
  className = "",
  glowColor,
}: GlassCardProps) {
  const glowStyle = selected && glowColor
    ? { boxShadow: `0 0 24px ${glowColor}, inset 0 0 24px ${glowColor}` }
    : {};

  const handleClick = () => {
    hapticLight();
    onClick?.();
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileTap={tapScale}
      whileHover={hoverScale}
      className={`
        glass-panel p-4 text-left transition-all duration-300 cursor-pointer w-full
        ${selected
          ? "border-accent/40 bg-accent/20"
          : "hover:bg-white/10"
        }
        ${className}
      `}
      style={glowStyle}
      layout
    >
      {children}
    </motion.button>
  );
}
