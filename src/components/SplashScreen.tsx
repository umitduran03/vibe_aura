"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import {
  splashLogoVariants,
  splashTextVariants,
  auraRingVariants,
} from "@/lib/animations";

export default function SplashScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(145deg, #0a0a0f 0%, #1a1025 50%, #0d0d1a 100%)",
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Aura Rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            className="absolute rounded-full border border-accent/20"
            variants={auraRingVariants}
            style={{
              width: `${ring * 120}px`,
              height: `${ring * 120}px`,
            }}
            initial="hidden"
            animate="visible"
            transition={{
              delay: ring * 0.3,
              duration: 2.5 + ring * 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Logo */}
      <motion.div
        variants={splashLogoVariants}
        className="relative z-10 flex flex-col items-center gap-3"
      >
        <div className="relative">
          <Sparkles className="absolute -right-6 -top-2 h-5 w-5 text-accent animate-float" />
          <h1 className="text-4xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-accent via-purple-300 to-pink-400 bg-clip-text text-transparent">
              Vibe
            </span>
            <span className="text-foreground/60 mx-1.5 font-light">&</span>
            <span className="bg-gradient-to-r from-pink-400 via-purple-300 to-accent bg-clip-text text-transparent">
              Aura
            </span>
          </h1>
          <Sparkles className="absolute -bottom-1 -left-5 h-4 w-4 text-pink-400/70 animate-float" style={{ animationDelay: "1s" }} />
        </div>
      </motion.div>

      {/* Loading Text */}
      <motion.p
        variants={splashTextVariants}
        className="relative z-10 mt-8 text-sm font-medium text-text-secondary tracking-widest uppercase"
      >
        Analyzing your aura
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          ...
        </motion.span>
      </motion.p>

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-accent/10 blur-[100px]" />
    </motion.div>
  );
}
