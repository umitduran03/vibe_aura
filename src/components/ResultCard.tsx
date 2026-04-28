"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Share2, RotateCcw, Sparkles, Download, Loader2 } from "lucide-react";
import { ZODIAC_SIGNS, getAuraEmoji } from "@/lib/constants";
import { resultCardVariants, resultItemVariants } from "@/lib/animations";
import GlassButton from "@/components/ui/GlassButton";
import { useAppStore } from "@/store/useAppStore";
import { hapticLight, hapticMedium } from "@/lib/haptics";
import SettingsDrawer from "@/components/SettingsDrawer";

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
  const [isExporting, setIsExporting] = useState(false);

  // Ref for the shareable card area only
  const cardRef = useRef<HTMLDivElement>(null);

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

      const file = new File([blob], "vibe-aura-result.png", { type: "image/png" });
      const filename = `vibe-aura-${auraResult.aura_score}.png`;

      // Try Web Share API first (works on mobile, enables direct IG share)
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({
            title: `${auraResult.aura_name} — Vibe & Aura`,
            text: `My aura score: ${auraResult.aura_score}/100 💜`,
            files: [file],
          });
        } catch (shareErr: any) {
          if (shareErr?.name !== "AbortError") {
            // Share failed — fallback to download
            setIsDownloading(true);
            downloadBlob(blob, filename);
            setTimeout(() => setIsDownloading(false), 2000);
          }
        }
      } else {
        // Device doesn't support sharing — download directly
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

  return (
    <motion.div
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
      <motion.div variants={resultItemVariants} className="pt-8 px-5 flex items-center justify-between">
        <div />{/* Spacer for centering */}
        <p className="text-center text-xs font-medium text-text-secondary/50 uppercase tracking-widest mb-2">
          <span>Vibe & Aura</span>
        </p>
        <div className="mb-2">
          <SettingsDrawer />
        </div>
      </motion.div>

      {/* Main Result Card — THIS IS THE SHAREABLE AREA */}
      <div className="flex-1 px-5 pb-4 flex flex-col">
        <motion.div
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
              <span>Your Aura</span>
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
              <span>Aura Score</span>
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
                <span>{auraResult.analysis_text}</span>
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
                <span 
                  translate="no"
                  className="relative z-10 text-[40px] font-light leading-none mb-2"
                  style={{
                    fontFamily: "Times New Roman, serif",
                    color: "white",
                    textShadow: `0 0 15px ${zodiac.gradient[0]}`
                  }}
                >
                  {zodiac.emoji}
                  {"\uFE0E"}
                </span>
                <span className="absolute bottom-[-5px] z-10 text-[9px] font-medium tracking-[0.15em] uppercase"
                  style={{
                    color: "white",
                    textShadow: `0 0 10px ${zodiac.gradient[1]}`
                  }}>
                  {zodiac.name}
                </span>
          </div>

          {/* Watermark — visible in share image */}
          <p
            className="absolute bottom-4 right-5 text-[11px] font-bold tracking-widest uppercase select-none"
            style={{ color: "rgba(255,255,255,0.15)" }}
          >
            <span>vibe & aura</span>
          </p>
        </motion.div>

        {/* Action Buttons — OUTSIDE cardRef so they're excluded from screenshot */}
        <motion.div
          variants={resultItemVariants}
          className="mt-5 flex flex-col gap-3"
        >
          <motion.button
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
                <span>Preparing...</span> <span translate="no">✨</span>
              </>
            ) : isDownloading ? (
              <>
                <Download className="h-5 w-5 animate-bounce" />
                <span>Downloading...</span> <span translate="no">📥</span>
              </>
            ) : (
              <>
                <Share2 className="h-5 w-5" />
                <span>Share to Story</span>
              </>
            )}
          </motion.button>

          <GlassButton
            variant="ghost"
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl transition-all duration-300 hover:bg-white/10 active:scale-95 font-medium"
          >
            <RotateCcw className="h-5 w-5" />
            <span>Try Again</span>
          </GlassButton>
        </motion.div>
      </div>
    </motion.div>
  );
}
