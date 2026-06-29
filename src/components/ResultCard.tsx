"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { auth } from "@/lib/firebase";
import { m, AnimatePresence } from "framer-motion";
import { Share2, RotateCcw, Sparkles, Download, Loader2, Lock, Swords } from "lucide-react";
import { ZODIAC_SIGNS, getAuraEmoji } from "@/lib/constants";
import { resultCardVariants, resultItemVariants } from "@/lib/animations";
import GlassButton from "@/components/ui/GlassButton";
import { useAppStore } from "@/store/useAppStore";
import { hapticLight, hapticMedium } from "@/lib/haptics";
import SettingsDrawer from "@/components/SettingsDrawer";
import { useT } from "@/hooks/useT";
import Image from "next/image";
import { WaveLogoIcon } from "@/components/ui/WaveLogoIcon";
import { ZodiacIcon } from "@/components/ZodiacIcon";
import { getApiUrl } from "@/lib/api";
import { useRouter } from "next/navigation";

function AnimatedCounter({ target, duration = 2 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  return <span>{count}</span>;
}

export default function ResultCard() {
  const resetWizard = useAppStore((s) => s.resetWizard);
  const auraResult = useAppStore((s) => s.auraResult);
  const zodiacId = useAppStore((s) => s.userData.zodiac);
  const setTokenModalOpen = useAppStore((s) => s.setTokenModalOpen);
  const locale = useAppStore((s) => s.locale);
  const [isExporting, setIsExporting] = useState(false);
  const t = useT();
  const router = useRouter();

  // Anti-cheat chronometer state
  const [shareToast, setShareToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const shareStartTimeRef = useRef<number | null>(null);
  const hasRewardedRef = useRef(false);

  // Ref for the shareable card area only
  const cardRef = useRef<HTMLDivElement>(null);

  /* =============================================
     ANTI-CHEAT VISIBILITY LISTENER
     ============================================= */
  useEffect(() => {
    const handleVisibility = async () => {
      if (document.visibilityState === "visible" && shareStartTimeRef.current !== null) {
        const elapsed = Date.now() - shareStartTimeRef.current;
        shareStartTimeRef.current = null; // Reset timer

        if (elapsed >= 12000) {
          // User actually shared — reward tokens
          if (!hasRewardedRef.current) {
            hasRewardedRef.current = true;
            setShareToast({ message: t.resultShareSuccess, type: "success" });
            setTimeout(() => setShareToast(null), 4000);

            // Call backend to add tokens
            try {
              const idToken = await auth.currentUser?.getIdToken();
              if (idToken) {
                await fetch(getApiUrl("/api/add-tokens"), {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${idToken}`,
                  },
                  body: JSON.stringify({ amount: 2, source: "share_story" }),
                });
              }
            } catch (err) {
              console.error("[Share Reward] Token grant failed:", err);
            }
          }
        } else {
          // Too fast — cheater detected
          setShareToast({ message: t.resultShareError, type: "error" });
          setTimeout(() => setShareToast(null), 4000);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  /* =============================================
     SHARE / DOWNLOAD ENGINE
     ============================================= */
  const [isDownloading, setIsDownloading] = useState(false);

  /** Download blob as PNG — universal fallback */
  const downloadBlob = useCallback((blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  const handleShare = useCallback(async () => {
    if (!cardRef.current || isExporting || !auraResult) return;

    setIsExporting(true);
    hapticMedium();

    try {
      const filter = (node: HTMLElement) => {
        const exclusionClasses = ['google-translate', 'skiptranslate'];
        return !exclusionClasses.some(cls => node.classList?.contains?.(cls));
      };

      const htmlToImage = await import("html-to-image");
      const blob = await htmlToImage.toBlob(cardRef.current, {
        backgroundColor: "#050510",
        pixelRatio: 3,
        filter: filter as any,
      });

      if (!blob) throw new Error("Canvas blob failed");

      const file = new File([blob], "vibecheckr-result.png", { type: "image/png" });
      const filename = `vibecheckr-${auraResult.aura_score}.png`;

      // Reset reward flag for new share attempt
      hasRewardedRef.current = false;

      // Try Web Share API first (works on mobile, enables direct IG share)
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        try {
          shareStartTimeRef.current = Date.now();
          await navigator.share({
            title: t.resultShareTitle.replace("{name}", auraResult.aura_name),
            text: t.resultShareText.replace("{score}", auraResult.aura_score.toString()).replace("{name}", auraResult.aura_name),
            files: [file],
          });
        } catch (shareErr: any) {
          if (shareErr?.name !== "AbortError") {
            // Share failed — fallback to download
            shareStartTimeRef.current = Date.now();
            setIsDownloading(true);
            downloadBlob(blob, filename);
            setTimeout(() => setIsDownloading(false), 2000);
          } else {
            // User cancelled — reset timer
            shareStartTimeRef.current = null;
          }
        }
      } else {
        // Device doesn't support sharing — download directly
        shareStartTimeRef.current = Date.now();
        setIsDownloading(true);
        downloadBlob(blob, filename);
        setTimeout(() => setIsDownloading(false), 2000);
      }
    } catch (err: any) {
      if (err?.name !== "AbortError") {
        console.error("[Share] Export error:", err);
      }
    } finally {
      setIsExporting(false);
    }
  }, [auraResult, isExporting, downloadBlob]);

  if (!auraResult) return null;

  const zodiac = ZODIAC_SIGNS.find((z) => z.id === zodiacId) || ZODIAC_SIGNS[0];
  const themeColor = auraResult.theme_color_hex;
  const emoji = getAuraEmoji(auraResult.aura_name);

  const grad1 = themeColor;
  const grad2 = zodiac.gradient[1];

  const handleReset = () => {
    hapticLight();
    resetWizard();
  };

  const renderTextWithBlurs = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(<blur>|<\/blur>)/g);
    let isBlurred = false;

    return parts.map((part, index) => {
      if (part === "<blur>") {
        isBlurred = true;
        return null;
      }
      if (part === "</blur>") {
        isBlurred = false;
        return null;
      }
      if (!part) return null;
      if (isBlurred) {
        return (
          <span
            key={index}
            onClick={() => setTokenModalOpen(true)}
            className="blur-[6px] select-none cursor-pointer opacity-70 transition-opacity hover:opacity-100"
            style={{ textShadow: "0 0 10px rgba(255,255,255,0.5)" }}
          >
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <m.div
      className="flex flex-col min-h-dvh"
      variants={resultCardVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background Aura */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: `
            radial-gradient(ellipse at 50% 20%, ${grad1}25 0%, transparent 60%),
            radial-gradient(ellipse at 80% 80%, ${grad2}20 0%, transparent 50%),
            linear-gradient(180deg, #050510 0%, #0d0d18 100%)
          `,
        }}
      />

      {/* Header */}
      <m.div variants={resultItemVariants} className="pt-8 px-5 flex items-center justify-between">
        <div />{/* Spacer for centering */}
        <p className="text-center text-xs font-medium text-text-secondary/50 uppercase tracking-widest mb-2">
          <span>VibeCheckr.</span>
        </p>
        <div className="mb-2">
          <SettingsDrawer />
        </div>
      </m.div>

      {/* Main Result Card — THIS IS THE SHAREABLE AREA */}
      <div className="flex-1 px-5 pb-4 flex flex-col">
        <m.div
          ref={cardRef}
          variants={resultItemVariants}
          className="glass-panel p-6 flex-1 flex flex-col relative overflow-hidden"
          style={{
            /* Explicit background so html2canvas captures it correctly */
            background: `linear-gradient(170deg, rgba(30,30,40,0.85) 0%, rgba(10,10,18,0.95) 100%)`,
          }}
        >
          {/* Top decorative line */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-24 rounded-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${grad1}, ${grad2}, transparent)`,
            }}
          />

          {/* Aura Title */}
          <div className="text-center mt-4 mb-6">
            <div className="text-5xl mb-3" translate="no">
              {emoji}
            </div>
            <h2 className="text-lg font-medium text-text-secondary mb-1">
              <span>{t.resultYourVibe}</span>
            </h2>
            <h1
              className="text-3xl font-bold"
              style={{
                color: grad1,
              }}
            >
              <span>{auraResult.aura_name}</span>
            </h1>
          </div>

          {/* Aura Score */}
          <div className="mx-auto mb-6 flex items-center gap-3 rounded-full px-5 py-2.5"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Sparkles className="h-4 w-4" style={{ color: grad1 }} />
            <span className="text-sm font-medium" style={{ color: "#a1a1aa" }}>
              <span>{t.resultVibeScore}</span>
            </span>
            <span
              className="text-xl font-bold"
              style={{ color: grad1 }}
            >
              <span>{auraResult.aura_score}</span>
              <span style={{ color: "rgba(161,161,170,0.6)", fontSize: "14px" }}>/100</span>
            </span>
          </div>

          {/* Analysis Text */}
          <div className="flex-1">
            <div className="rounded-2xl p-5"
              style={{
                backgroundColor: "rgba(0,0,0,0.2)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <p className="text-[15px] leading-relaxed whitespace-pre-line font-medium"
                style={{ color: "#ebebf5" }}
              >
                {renderTextWithBlurs(auraResult.analysis_text)}
              </p>
            </div>

          </div>

          {/* Zodiac Badge */}
          <div className="mt-6 flex items-center justify-center relative w-20 h-20 mx-auto">
             <div
                  className="absolute inset-0 rounded-full blur-xl z-0"
                  style={{
                    background: `radial-gradient(circle, ${zodiac.gradient[0]}60 0%, transparent 70%)`,
                  }}
                />
                <div 
                  className="relative z-10 mb-2 flex items-center justify-center"
                  style={{
                    color: "white",
                    filter: `drop-shadow(0 0 10px ${zodiac.gradient[0]})`
                  }}
                >
                  <ZodiacIcon id={zodiac.id} className="w-10 h-10" />
                </div>
                <span className="absolute bottom-[-5px] z-10 text-[9px] font-medium tracking-[0.15em] uppercase"
                  style={{
                    color: "white",
                    textShadow: `0 0 10px ${zodiac.gradient[1]}`
                  }}>
                  {locale === "tr" ? (zodiac.nameTr || zodiac.name) : zodiac.name}
                </span>
          </div>

          {/* Watermark — visible in share image, prominent for viral sharing */}
          <div
            className="mt-6 pt-4 flex items-center justify-center gap-2 select-none"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <WaveLogoIcon size={13} className="opacity-60" />
            <span className="text-[12px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.55)" }}>thevibecheckr.com</span>
          </div>
        </m.div>

        {/* Action Buttons — OUTSIDE cardRef so they're excluded from screenshot */}
        <m.div
          variants={resultItemVariants}
          className="mt-5 flex flex-col gap-3"
        >
          {auraResult.isUnlocked === false && (
            <m.button
              onClick={() => setTokenModalOpen(true)}
              whileTap={{ scale: 0.98 }}
              whileHover={{ y: -2 }}
              className="group relative w-full flex items-center justify-center gap-2.5 rounded-2xl px-8 py-[18px] cursor-pointer transition-all duration-500 active:scale-95 overflow-hidden"
              style={{
                backgroundColor: "rgba(5, 5, 10, 0.4)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.05)"
              }}
            >
              {/* Subtle hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10 pointer-events-none" />
              {/* Light sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 ease-in-out pointer-events-none" />
              
              <Lock className="relative h-[15px] w-[15px] text-white/40 group-hover:text-purple-300 transition-colors duration-500" strokeWidth={2} />
              <span className="relative text-[13px] font-semibold tracking-[0.15em] text-white/60 group-hover:text-white/90 transition-colors duration-500 uppercase">
                {t.resultUnlock} <span className="ml-1 text-[14px]">🔒</span>
              </span>
            </m.button>
          )}

          {auraResult.isUnlocked !== false && (
            <m.button
              onClick={handleShare}
              disabled={isExporting}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              className="w-full flex items-center justify-center gap-2 rounded-2xl px-8 py-4 text-[15px] font-bold tracking-wide text-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] cursor-pointer transition-transform duration-300 active:scale-95 border border-white/20 hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: `linear-gradient(135deg, ${grad1}, ${grad2})`,
                boxShadow: `0 0 35px ${grad1}40`,
              }}
            >
              {isExporting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>{t.resultPreparing}</span> <span translate="no">✨</span>
                </>
              ) : isDownloading ? (
                <>
                  <Download className="h-5 w-5 animate-bounce" />
                  <span>{t.resultDownloading}</span> <span translate="no">📥</span>
                </>
              ) : (
                <>
                  <Share2 className="h-5 w-5" />
                  <span>{t.resultShare}</span>
                </>
              )}
            </m.button>
          )}

          {/* Share Anti-Cheat Toast */}
          <AnimatePresence>
            {shareToast && (
              <m.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] px-5 py-3 rounded-2xl backdrop-blur-xl border shadow-2xl max-w-[90vw] text-center"
                style={{
                  backgroundColor: shareToast.type === "success" ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
                  borderColor: shareToast.type === "success" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)",
                  color: shareToast.type === "success" ? "#4ade80" : "#f87171",
                }}
              >
                <p className="text-sm font-semibold">{shareToast.message}</p>
              </m.div>
            )}
          </AnimatePresence>

          {/* Challenge a Friend Button */}
          {auraResult.isUnlocked !== false && (
            <m.button
              onClick={() => {
                hapticLight();
                router.push(`/${locale}/aura-battle`);
              }}
              whileTap={{ scale: 0.97 }}
              whileHover={{ y: -1 }}
              className="w-full flex items-center justify-center gap-2.5 rounded-2xl px-8 py-[15px] text-[14px] font-semibold tracking-wide cursor-pointer transition-all duration-300 active:scale-95"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                border: `1px solid rgba(255,255,255,0.12)`,
                color: "rgba(255,255,255,0.75)",
              }}
            >
              <Swords className="h-4 w-4" />
              <span>{t.resultChallengeBtn}</span>
            </m.button>
          )}

          <GlassButton
            variant="ghost"
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl transition-all duration-300 hover:bg-white/10 active:scale-95 font-medium"
          >
            <RotateCcw className="h-5 w-5" />
            <span>{t.resultTryAgain}</span>
          </GlassButton>
        </m.div>
      </div>
    </m.div>
  );
}
