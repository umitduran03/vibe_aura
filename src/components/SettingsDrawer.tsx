"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  X,
  FileText,
  Shield,
  Crown,
  Coins,
  ExternalLink,
  Sparkles,
  LogOut,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { hapticLight, hapticMedium } from "@/lib/haptics";
import { auth } from "@/lib/firebase";
import { logOut } from "@/lib/auth";
import Image from "next/image";

export default function SettingsDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const tokenBalance = useAppStore((s) => s.tokenBalance);
  const vipExpiry = useAppStore((s) => s.vipExpiry);
  const setScreen = useAppStore((s) => s.setScreen);
  const resetWizard = useAppStore((s) => s.resetWizard);

  const isVipActive = vipExpiry ? new Date(vipExpiry) > new Date() : false;

  // Profil Verileri
  const user = auth.currentUser;
  const displayName = user?.displayName || "Vibe Seeker";
  const photoURL = user?.photoURL;
  const initial = displayName.charAt(0).toUpperCase();

  const open = () => {
    hapticLight();
    setIsOpen(true);
  };

  const close = () => {
    hapticLight();
    setIsOpen(false);
  };

  const handleLogout = async () => {
    hapticMedium();
    await logOut();
    resetWizard();
    setScreen("onboarding");
    close();
  };

  return (
    <>
      {/* ─── Trigger Button ─── */}
      <button
        onClick={open}
        className="p-2.5 rounded-xl transition-all duration-200 hover:bg-white/10 active:scale-90 cursor-pointer"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
        aria-label="Settings"
      >
        <Settings className="h-5 w-5 text-white/60" />
      </button>

      {/* ─── Drawer ─── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
            />

            {/* Panel */}
            <motion.div
              className="fixed inset-y-0 right-0 z-[81] w-full max-w-[340px] flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              style={{
                background: "linear-gradient(180deg, rgba(18,12,30,0.98) 0%, rgba(8,6,15,0.99) 100%)",
                borderLeft: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "-20px 0 60px rgba(0,0,0,0.5)",
              }}
            >
              {/* ─── Header ─── */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4">
                <h2 className="text-lg font-bold text-white tracking-tight">Settings</h2>
                <button
                  onClick={close}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4 text-white/60" />
                </button>
              </div>

              {/* ─── Account Card ─── */}
              <div className="mx-5 mb-5">
                <div
                  className="p-4 rounded-2xl relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(236,72,153,0.08) 100%)",
                    border: "1px solid rgba(139,92,246,0.15)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-3 relative z-10">
                    {/* Profil Fotoğrafı / Baş Harf Avatar */}
                    {photoURL ? (
                      <div className="w-11 h-11 rounded-full overflow-hidden border border-white/20 shrink-0 shadow-lg">
                        <img
                          src={photoURL}
                          alt={displayName}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ) : (
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 border border-white/20 shadow-lg"
                        style={{
                          background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                        }}
                      >
                        <span className="text-white font-bold text-lg">{initial}</span>
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-[15px] font-semibold text-white truncate">
                        {displayName}
                      </p>
                      <p className="text-xs text-white/50 truncate flex items-center gap-1 mt-0.5">
                        {isVipActive ? (
                          <>
                            <Sparkles className="h-3 w-3 text-purple-400" />
                            <span className="text-purple-300">VIP Member</span>
                          </>
                        ) : (
                          "Free Account"
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 relative z-10 pt-1">
                    <div className="px-2.5 py-1 rounded-md bg-black/20 flex items-center gap-2 border border-white/5">
                      <Coins className="h-3.5 w-3.5 text-yellow-400" />
                      <span className="text-[13px] font-medium text-white/90">
                        {tokenBalance} tokens remaining
                      </span>
                    </div>
                  </div>

                  {/* Dekoratif arka plan yansıması */}
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-pink-500/20 blur-2xl rounded-full pointer-events-none" />
                </div>
              </div>

              {/* ─── Menu Items ─── */}
              <div className="flex-1 overflow-y-auto px-5">
                <p className="text-[11px] font-semibold tracking-widest uppercase text-white/30 mb-3 px-1">
                  Legal
                </p>
                <div className="space-y-1.5 mb-6">
                  <a
                    href="/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3.5 rounded-xl transition-all duration-200 hover:bg-white/5 group cursor-pointer"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "rgba(139,92,246,0.12)" }}
                    >
                      <FileText className="h-4 w-4 text-purple-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                        Terms of Service
                      </p>
                      <p className="text-[11px] text-white/35">Rules of the cosmic playground</p>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 text-white/20 group-hover:text-white/40 shrink-0" />
                  </a>

                  <a
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3.5 rounded-xl transition-all duration-200 hover:bg-white/5 group cursor-pointer"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "rgba(6,182,212,0.12)" }}
                    >
                      <Shield className="h-4 w-4 text-cyan-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                        Privacy Policy
                      </p>
                      <p className="text-[11px] text-white/35">How we protect your data</p>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 text-white/20 group-hover:text-white/40 shrink-0" />
                  </a>
                </div>

                <p className="text-[11px] font-semibold tracking-widest uppercase text-white/30 mb-3 px-1">
                  App
                </p>
                <div className="space-y-1.5 mb-8">
                  <div
                    className="flex items-center gap-3 p-3.5 rounded-xl"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "rgba(236,72,153,0.12)" }}
                    >
                      <Crown className="h-4 w-4 text-pink-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white/80">Version</p>
                      <p className="text-[11px] text-white/35">1.0.0 (beta)</p>
                    </div>
                  </div>
                </div>

                {/* ─── Log Out Button ─── */}
                <motion.button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 p-3.5 rounded-xl text-sm font-medium text-red-400/90 transition-all duration-300 cursor-pointer group"
                  style={{
                    background: "rgba(239, 68, 68, 0.05)",
                    border: "1px solid rgba(239, 68, 68, 0.1)",
                  }}
                  whileHover={{
                    background: "rgba(239, 68, 68, 0.1)",
                    border: "1px solid rgba(239, 68, 68, 0.2)",
                    boxShadow: "0 0 20px rgba(239, 68, 68, 0.15), 0 0 40px rgba(139, 92, 246, 0.1)",
                    color: "rgba(248, 113, 113, 1)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LogOut className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Log Out
                </motion.button>

              </div>

              {/* ─── Footer ─── */}
              <div className="px-5 py-5 border-t border-white/5 mt-auto">
                <p className="text-[11px] text-center text-white/20 leading-relaxed">
                  Made with 💜 by Vibe & Aura
                  <br />
                  © {new Date().getFullYear()} All rights reserved.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
