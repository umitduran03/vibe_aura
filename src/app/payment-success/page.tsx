"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";

/**
 * PaymentSuccessPage — Finalized Premium Success Screen
 * 
 * Displays a celebratory screen after successful Polar.sh checkout.
 * Automatically redirects to the dashboard after a 5-second countdown.
 */
export default function PaymentSuccessPage() {
  const router = useRouter();
  
  // Data Binding from App Store
  const tokenBalance = useAppStore((s) => s.tokenBalance);
  const vipExpiry = useAppStore((s) => s.vipExpiry);
  const isVipActive = vipExpiry ? new Date(vipExpiry) > new Date() : false;

  const [countdown, setCountdown] = useState(5);

  // Auto-Redirect logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <main className="relative mx-auto w-full max-w-[430px] min-h-dvh overflow-hidden flex flex-col items-center justify-center p-6 text-center select-none">
      
      {/* ─── Premium Background Effects ─── */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-purple-600/15 blur-[120px] rounded-full -z-10 animate-aura-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full -z-10 animate-aura-pulse" style={{ animationDelay: "1s" }} />
      
      {/* ─── Success Card ─── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="glass-panel p-8 w-full flex flex-col items-center gap-8 relative z-10"
      >
        {/* Animated Checkmark Badge */}
        <motion.div
          initial={{ rotate: -15, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 260, damping: 20 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full animate-pulse" />
          <div className="w-24 h-24 bg-green-500/15 rounded-full flex items-center justify-center border border-green-500/30 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4ade80"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </motion.div>

        {/* Text Content */}
        <div className="space-y-3">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-3xl font-extrabold tracking-tight text-white"
          >
            Payment Successful! ✨
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-zinc-400 text-sm leading-relaxed px-2"
          >
            Your account has been updated with your new tokens/VIP status.
          </motion.p>
        </div>

        {/* Balance Display */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="w-full space-y-3"
        >
          <div className="bg-white/5 rounded-3xl p-5 border border-white/10 backdrop-blur-sm">
            <p className="text-[12px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-1">Status Update</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-xl font-bold text-white">Current Balance: {tokenBalance} Tokens</span>
              {isVipActive && (
                <span className="bg-purple-500/20 text-purple-300 text-[10px] px-2 py-0.5 rounded-full border border-purple-500/30 font-bold uppercase">
                  VIP Active
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="w-full space-y-5"
        >
          <Link
            href="/"
            className="group w-full bg-white text-black font-bold py-5 rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.2)] active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            Start Analyzing Now
            <svg 
              className="group-hover:translate-x-1 transition-transform" 
              xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </Link>
          
          <p className="text-[12px] text-zinc-500 font-medium">
            Redirecting to dashboard in <span className="text-white font-bold">{countdown}</span> seconds...
          </p>
        </motion.div>
      </motion.div>

      {/* ─── Floating Particle System (Premium FX) ─── */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              opacity: 0,
              scale: 0 
            }}
            animate={{ 
              y: [0, -100, -200],
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [0, 0.4, 0],
              scale: [0, 1, 0.5]
            }}
            transition={{ 
              duration: 4 + Math.random() * 4, 
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "linear"
            }}
            className="absolute w-1 h-1 rounded-full bg-purple-400"
          />
        ))}
        {/* Glowing Orbs */}
        <motion.div 
          animate={{ x: [0, 30, 0], y: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[10%] right-[10%] w-32 h-32 bg-purple-500/10 blur-[60px] rounded-full"
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, -60, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-[20%] left-[5%] w-40 h-40 bg-blue-500/10 blur-[70px] rounded-full"
        />
      </div>
    </main>
  );
}
