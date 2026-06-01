"use client";

import Link from "next/link";
import { Ghost, Home } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-dvh bg-[#050510] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-red-500/30">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] max-w-[600px] rounded-full bg-red-600/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-md">
        {/* Animated Ghost Icon */}
        <motion.div 
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, -5, 5, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="w-28 h-28 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,255,255,0.05)] backdrop-blur-sm"
        >
          <Ghost className="w-14 h-14 text-white/60 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
        </motion.div>

        {/* 404 Text */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 mb-4 tracking-tighter"
        >
          404
        </motion.h1>
        
        {/* Humorous Message */}
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl font-black text-red-400 mb-4 tracking-tight drop-shadow-[0_0_8px_rgba(248,113,113,0.3)]"
        >
          You failed the vibe check.
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-white/60 text-lg mb-12 leading-relaxed"
        >
          Looks like this page ghosted you. It's not here anymore, or maybe it never was (classic situationship behavior). Time to move on.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: "spring" }}
        >
          <Link
            href="/"
            className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="tracking-wide">Take Me Home</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
