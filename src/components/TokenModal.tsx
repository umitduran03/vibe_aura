"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Tv, Loader2, Check, Sparkles, Zap, Crown } from "lucide-react";
import { hapticLight, hapticMedium } from "@/lib/haptics";
import { useAppStore } from "@/store/useAppStore";
import { Purchases } from "@revenuecat/purchases-capacitor";
import { AdMob } from "@capacitor-community/admob";
import { auth } from "@/lib/firebase";

interface TokenModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/* ─── Paket Tanımları ─── */
const TOKEN_PACKAGES = [
  {
    id: "token_rookie",
    name: "Rookie Gossip",
    tokens: 10,
    price: "$0.99",
    icon: <Sparkles className="h-5 w-5" />,
    color: "#8b5cf6", // Purple
    glowColor: "rgba(139,92,246,0.15)",
    popular: false,
  },
  {
    id: "token_chaos",
    name: "Chaos Bringer",
    tokens: 50,
    price: "$2.99",
    icon: <Zap className="h-5 w-5" />,
    color: "#ec4899", // Pink
    glowColor: "rgba(236,72,153,0.20)",
    popular: true,
  },
  {
    id: "token_master",
    name: "Aura Master",
    tokens: 150,
    price: "$7.99",
    icon: <Crown className="h-5 w-5" />,
    color: "#f59e0b", // Amber
    glowColor: "rgba(245,158,11,0.15)",
    popular: false,
  },
] as const;

const VIP_PACKAGES = [
  {
    id: "aura_vip",
    name: "Aura VIP",
    desc: "✦ Weekly Unlimited",
    price: "$4.99",
    icon: <Sparkles className="h-5 w-5" />,
    color: "#3b82f6", // Blue
    glowColor: "rgba(59,130,246,0.15)",
    badge: null,
    badgeColor: null,
  },
  {
    id: "mcs_monthly",
    name: "Main Character Syndrome",
    desc: "✦ Monthly Unlimited",
    price: "$9.99",
    icon: <Zap className="h-5 w-5" />,
    color: "#10b981", // Emerald
    glowColor: "rgba(16,185,129,0.25)",
    badge: "50% OFF", 
    badgeColor: "#10b981",
  },
  {
    id: "god_mode_lifetime",
    name: "God Mode",
    desc: "✦ Lifetime (One-time)",
    price: "$49.99",
    icon: <Crown className="h-5 w-5" />,
    color: "#eab308", // Yellow
    glowColor: "rgba(234,179,8,0.25)",
    badge: null,
    badgeColor: null,
  },
] as const;

type ModalView = "gate" | "store" | "loading" | "success";

export default function TokenModal({ isOpen, onClose }: TokenModalProps) {
  const [view, setView] = useState<ModalView>("gate");
  const [showToast, setShowToast] = useState(false);
  const [purchasedTokens, setPurchasedTokens] = useState<number | string>(0);
  const [storeTokenPackages, setStoreTokenPackages] = useState<any[]>(TOKEN_PACKAGES as any);
  const [storeVipPackages, setStoreVipPackages] = useState<any[]>(VIP_PACKAGES as any);
  const userId = useAppStore((s) => s.userId);

  useEffect(() => {
    // Mobil native ortamlarda AdMob ve RevenueCat ilklemesi
    const initMonetization = async () => {
      try {
        AdMob.initialize({
          // requestTrackingAuthorization was removed or invalid
        }).catch(console.warn);

        if (process.env.NEXT_PUBLIC_REVENUECAT_API_KEY) {
          await Purchases.configure({ apiKey: process.env.NEXT_PUBLIC_REVENUECAT_API_KEY });
          const offerings = await Purchases.getOfferings();
          if (offerings.current && offerings.current.availablePackages.length > 0) {
            // İleride RevenueCat bağlandığında token ve VIP paketler ayrı ayrı rcPkg ile eşleştirilebilir.
            // setStoreTokenPackages(...)
            // setStoreVipPackages(...)
          }
        }
      } catch (e) {
        console.warn("Monetization initialization skipped (Web or missing keys)");
      }
    };
    initMonetization();
  }, []);

  /* Reset on close */
  const handleClose = () => {
    hapticLight();
    onClose();
    // Reset after exit animation
    setTimeout(() => setView("gate"), 400);
  };

  const handleWatchAd = async () => {
    hapticLight();
    
    try {
      // AdMob Reward Video Akışı
      await AdMob.prepareRewardVideoAd({ adId: process.env.NEXT_PUBLIC_ADMOB_IOS_AD_UNIT || "test" });
      await AdMob.showRewardVideoAd();
      
      // İzleme başarılıysa API'ye istek at
      if (userId) {
        const idToken = await auth.currentUser?.getIdToken();
        await fetch("/api/reward-token", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${idToken}` },
          body: JSON.stringify({ amount: 1, source: "admob" })
        });
        console.log("[AdMob] Reward video watched. Token reward request sent.");
      }

      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (e) {
      console.warn("AdMob Reward failed/skipped:", e);
      // Fallback for web test:
      if (userId) {
        const idToken = await auth.currentUser?.getIdToken();
        await fetch("/api/reward-token", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${idToken}` },
          body: JSON.stringify({ amount: 1, source: "admob_fallback" })
        });
        console.log("[AdMob - Fallback] Web test completed. Token reward request sent.");
      }
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handlePurchase = async (pkg: any) => {
    hapticMedium();
    setPurchasedTokens(pkg.tokens || "Unlimited VIP ✦");
    setView("loading");

    try {
      // ─── Platform Detection: Web → Polar, Native → RevenueCat ───
      let isNative = false;
      try {
        const { Capacitor } = await import("@capacitor/core");
        isNative = Capacitor.isNativePlatform();
      } catch {
        isNative = false;
      }

      if (isNative && pkg.rcPackage) {
        // ─── Native: RevenueCat Flow ────────────────────────────────
        await Purchases.purchasePackage(pkg.rcPackage);
        
        // After successful native purchase, credit via authenticated API
        const idToken = await auth.currentUser?.getIdToken();
        if (userId && pkg.tokens) {
          await fetch("/api/reward-token", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${idToken}` },
            body: JSON.stringify({ amount: pkg.tokens, source: "revenuecat" })
          });
          useAppStore.getState().setTokenBalance(useAppStore.getState().tokenBalance + pkg.tokens);
        } else if (userId && (pkg.id === "aura_vip" || pkg.id === "mcs_monthly" || pkg.id === "god_mode_lifetime")) {
          const res = await fetch("/api/purchase-vip", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${idToken}` },
            body: JSON.stringify({ vipPackageId: pkg.id })
          });
          const data = await res.json();
          if (data.vipExpiry) {
            useAppStore.getState().setVipExpiry(data.vipExpiry);
          }
        }
      } else {
        // ─── Web: Polar Checkout Flow ───────────────────────────────
        // Redirect user to Polar hosted checkout page.
        // Fulfillment happens server-side via webhook (no client-side token injection).
        const idToken = await auth.currentUser?.getIdToken();
        const res = await fetch("/api/polar/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${idToken}`,
          },
          body: JSON.stringify({ packageId: pkg.id }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to create checkout session");
        }

        if (data.url) {
          // Redirect to Polar Checkout — fulfillment happens via webhook
          window.location.href = data.url;
          return; // Don't show success view; user leaves the page
        }
      }
    } catch (err) {
      console.error("[Purchase] Error:", err);
      setView("store");
      return;
    }

    setView("success");

    // 2 sn sonra otomatik kapat
    setTimeout(() => {
      onClose();
      setTimeout(() => setView("gate"), 400);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal Container */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-[380px] glass-panel overflow-hidden"
              style={{
                background: "linear-gradient(170deg, rgba(35,35,45,0.94) 0%, rgba(12,12,18,0.98) 100%)",
              }}
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 30 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Top Bar ── */}
              <div className="flex items-center justify-between px-6 pt-5 pb-0">
                {/* İzle Kazan pill */}
                <motion.button
                  onClick={handleWatchAd}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-text-secondary hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                  <Tv className="h-3.5 w-3.5" />
                  Watch to Earn
                </motion.button>

                {/* Close */}
                <motion.button
                  onClick={handleClose}
                  whileTap={{ scale: 0.85 }}
                  className="p-1.5 rounded-full bg-white/5 border border-white/10 text-text-secondary hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </motion.button>
              </div>

              {/* Decorative glow */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-accent/15 blur-[60px] pointer-events-none" />

              {/* ── Content Area ── */}
              <div className="relative px-6 pt-4 pb-6 max-h-[80vh] overflow-y-auto [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
                <AnimatePresence mode="wait">
                  {/* ═══════ GATE VIEW ═══════ */}
                  {view === "gate" && (
                    <motion.div
                      key="gate"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="text-center"
                    >
                      <motion.div
                        className="text-5xl mb-4"
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        🪙
                      </motion.div>

                      <h2 className="text-[22px] font-bold text-foreground mb-2 tracking-tight">
                        Out of Aura Tokens
                      </h2>
                      <p className="text-[14px] leading-relaxed text-text-secondary mb-7">
                        Refill your tokens to analyze your aura and decode your vibes.
                      </p>

                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => { hapticMedium(); setView("store"); }}
                        className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl text-[15px] font-bold text-white cursor-pointer transition-transform duration-200 border border-white/20"
                        style={{
                          background: "linear-gradient(135deg, #c084fc, #8b5cf6)",
                          boxShadow: "0 0 30px rgba(192,132,252,0.25)",
                        }}
                      >
                        <Sparkles className="h-5 w-5" />
                        Get Tokens
                      </motion.button>
                    </motion.div>
                  )}

                  {/* ═══════ STORE VIEW ═══════ */}
                  {view === "store" && (
                    <motion.div
                      key="store"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                    >
                      <h2 className="text-center text-[16px] font-bold text-foreground mb-0.5 tracking-tight">
                        Token Packages
                      </h2>
                      <p className="text-center text-[11px] text-text-secondary/60 mb-3.5">
                        Choose the package that suits you best
                      </p>

                      <div className="flex flex-col gap-2.5">
                        {storeTokenPackages.map((pkg) => (
                          <motion.button
                            key={pkg.id}
                            whileTap={{ scale: 0.97 }}
                            whileHover={{ scale: 1.01 }}
                            onClick={() => handlePurchase(pkg)}
                            className="relative w-full flex items-center gap-3 p-3 rounded-[14px] border transition-all duration-300 cursor-pointer text-left group"
                            style={{
                              background: pkg.popular
                                ? `linear-gradient(135deg, ${pkg.glowColor}, rgba(15,15,22,0.6))`
                                : "rgba(255,255,255,0.03)",
                              borderColor: pkg.popular
                                ? `${pkg.color}40`
                                : "rgba(255,255,255,0.08)",
                              boxShadow: pkg.popular
                                ? `0 0 20px ${pkg.glowColor}`
                                : "none",
                            }}
                          >
                            {/* Popular badge */}
                            {pkg.popular && (
                              <div
                                className="absolute -top-2.5 -right-1 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider text-white"
                                style={{
                                  background: `linear-gradient(135deg, ${pkg.color}, ${pkg.color}cc)`,
                                  boxShadow: `0 2px 10px ${pkg.glowColor}`,
                                }}
                              >
                                Popular
                              </div>
                            )}

                            {/* Icon */}
                            <div
                              className="flex-shrink-0 w-10 h-10 rounded-[10px] flex items-center justify-center transition-transform group-hover:scale-110"
                              style={{
                                background: `${pkg.color}15`,
                                color: pkg.color,
                              }}
                            >
                              {pkg.icon}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <p className="text-[13px] font-bold text-foreground truncate">
                                {pkg.name}
                              </p>
                              <p className="text-[11px] text-text-secondary/70 mt-0.5">
                                ✦ {pkg.tokens} Tokens
                              </p>
                            </div>

                            {/* Price */}
                            <div
                              className="flex-shrink-0 px-3 py-1.5 rounded-[10px] text-[12px] font-bold text-white border transition-all"
                              style={{
                                background: `${pkg.color}15`,
                                borderColor: `${pkg.color}30`,
                              }}
                            >
                              {pkg.price}
                            </div>
                          </motion.button>
                        ))}
                      </div>

                      {/* VIP Section Divider */}
                      <div className="flex items-center gap-3 my-4 opacity-80">
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-text-secondary/30"></div>
                        <p className="text-[10px] font-bold text-text-secondary tracking-widest uppercase">VIP Pass</p>
                        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-text-secondary/30"></div>
                      </div>

                      {/* VIP Packages */}
                      <div className="flex flex-col gap-2.5">
                        {storeVipPackages.map((pkg) => (
                          <motion.button
                            key={pkg.id}
                            whileTap={{ scale: 0.97 }}
                            whileHover={{ scale: 1.01 }}
                            onClick={() => handlePurchase(pkg)}
                            className="relative w-full flex items-center gap-3 p-3 rounded-[14px] border transition-all duration-300 cursor-pointer text-left group"
                            style={{
                              background: pkg.badge
                                ? `linear-gradient(135deg, ${pkg.glowColor}, rgba(15,15,22,0.6))`
                                : "rgba(255,255,255,0.03)",
                              borderColor: pkg.badge
                                ? `${pkg.color}40`
                                : "rgba(255,255,255,0.08)",
                              boxShadow: pkg.badge ? `0 0 20px ${pkg.glowColor}` : "none",
                            }}
                          >
                            {/* Neon Badge */}
                            {pkg.badge && (
                              <div
                                className="absolute -top-2.5 -right-1 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider text-white"
                                style={{
                                  background: `linear-gradient(135deg, ${pkg.badgeColor}, ${pkg.badgeColor}cc)`,
                                  boxShadow: `0 2px 10px ${pkg.badgeColor}80`,
                                }}
                              >
                                {pkg.badge}
                              </div>
                            )}

                            {/* Icon */}
                            <div
                              className="flex-shrink-0 w-10 h-10 rounded-[10px] flex items-center justify-center transition-transform group-hover:scale-110"
                              style={{
                                background: `${pkg.color}15`,
                                color: pkg.color,
                              }}
                            >
                              {pkg.icon}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <p className="text-[13px] font-bold text-foreground truncate">
                                {pkg.name}
                              </p>
                              <p className="text-[11px] text-text-secondary/70 mt-0.5">
                                {pkg.desc}
                              </p>
                            </div>

                            {/* Price */}
                            <div
                              className="flex-shrink-0 px-3 py-1.5 rounded-[10px] text-[12px] font-bold text-white border transition-all"
                              style={{
                                background: `${pkg.color}15`,
                                borderColor: `${pkg.color}30`,
                              }}
                            >
                              {pkg.price}
                            </div>
                          </motion.button>
                        ))}
                      </div>

                      {/* Geri butonu */}
                      <motion.button
                        onClick={() => { hapticLight(); setView("gate"); }}
                        className="mt-4 w-full text-center text-[12px] text-text-secondary/40 hover:text-text-secondary transition-colors cursor-pointer"
                        whileTap={{ scale: 0.95 }}
                      >
                        ← Go back
                      </motion.button>
                    </motion.div>
                  )}

                  {/* ═══════ LOADING VIEW ═══════ */}
                  {view === "loading" && (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center justify-center py-10"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Loader2 className="h-10 w-10 text-accent" />
                      </motion.div>
                      <p className="mt-4 text-[14px] font-semibold text-foreground">
                        Processing payment...
                      </p>
                      <p className="mt-1 text-[12px] text-text-secondary/50">
                        Establishing secure connection
                      </p>
                    </motion.div>
                  )}

                  {/* ═══════ SUCCESS VIEW ═══════ */}
                  {view === "success" && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="flex flex-col items-center justify-center py-10"
                    >
                      <motion.div
                        className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                        style={{
                          background: "linear-gradient(135deg, #22c55e, #16a34a)",
                          boxShadow: "0 0 40px rgba(34,197,94,0.3)",
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.1 }}
                      >
                        <Check className="h-8 w-8 text-white" strokeWidth={3} />
                      </motion.div>

                      <motion.p
                        className="text-[18px] font-bold text-foreground"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        Payment Successful!
                      </motion.p>
                      <motion.p
                        className="mt-1 text-[13px] text-text-secondary"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                      >
                        ✦ {typeof purchasedTokens === "number" ? `${purchasedTokens} tokens added to your account` : `${purchasedTokens} activated!`}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>

          {/* Toast notification — Reklam */}
          <AnimatePresence>
            {showToast && (
              <motion.div
                className="fixed bottom-8 left-1/2 z-[60] -translate-x-1/2 px-5 py-3 rounded-2xl text-[13px] font-medium text-white/90 border border-white/10 backdrop-blur-xl pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, rgba(30,30,40,0.95), rgba(20,20,30,0.98))",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                }}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                📺 Loading ad... It will be active on the mobile version
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
