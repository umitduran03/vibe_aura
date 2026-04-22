// ============================================
// Vibe & Aura — Framer Motion Animasyon Presetleri
// ============================================

import type { Variants, Transition } from "framer-motion";

// Genel geçiş ayarları
export const springTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

export const smoothTransition: Transition = {
  duration: 0.5,
  ease: [0.25, 0.46, 0.45, 0.94],
};

// --- Splash Screen ---
export const splashLogoVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      duration: 1.2,
    },
  },
  exit: {
    scale: 1.1,
    opacity: 0,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

export const splashTextVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.6, duration: 0.8, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.3 },
  },
};

export const auraRingVariants: Variants = {
  hidden: { scale: 0.6, opacity: 0 },
  visible: {
    scale: 1,
    opacity: [0, 0.6, 0.3],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

// --- Wizard Steps ---
export const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.3 },
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  }),
};

// --- Zodiac & Cards ---
export const cardGridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
};

export const cardItemVariants: Variants = {
  hidden: { scale: 0.9, opacity: 0, y: 10 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 400, damping: 25 },
  },
};

// --- Result Card ---
export const resultCardVariants: Variants = {
  hidden: {
    y: 80,
    opacity: 0,
    scale: 0.92,
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25,
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

export const resultItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// --- Page/Screen Transition ---
export const pageTransitionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

// --- Button tap ---
export const tapScale = { scale: 0.96 };
export const hoverScale = { scale: 1.03 };
