"use client";

import { motion } from "framer-motion";
import { tapScale } from "@/lib/animations";
import { hapticLight } from "@/lib/haptics";
import type { ReactNode } from "react";

interface GlassButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit";
}

export default function GlassButton({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
  type = "button",
}: GlassButtonProps) {
  const variants: Record<string, string> = {
    primary:
      "bg-accent text-background font-semibold shadow-[0_0_30px_rgba(192,132,252,0.3)]",
    secondary:
      "glass text-foreground font-medium",
    ghost:
      "bg-transparent text-text-secondary font-medium hover:text-foreground",
  };

  const handleClick = () => {
    if (!disabled) hapticLight();
    onClick?.();
  };

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      whileTap={disabled ? {} : tapScale}
      whileHover={disabled ? {} : { scale: 1.02 }}
      className={`
        rounded-full px-8 py-3.5 text-sm tracking-wide
        transition-all duration-300 cursor-pointer
        disabled:opacity-40 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}
