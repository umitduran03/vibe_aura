"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Share2, RotateCcw, Sparkles, AlertTriangle, Loader2, Download, Lock } from "lucide-react";
import { ZODIAC_SIGNS } from "@/lib/constants";
import { resultCardVariants, resultItemVariants } from "@/lib/animations";
import GlassButton from "@/components/ui/GlassButton";
import { useAppStore } from "@/store/useAppStore";
import { hapticLight, hapticMedium } from "@/lib/haptics";
import SettingsDrawer from "@/components/SettingsDrawer";

export default function DuoResultCard() {
  const resetWizard = useAppStore((s) => s.resetWizard);
  const duoResult = useAppStore((s) => s.duoResult);
  const person1 = useAppStore((s) => s.duoPerson1);
  const person2 = useAppStore((s) => s.duoPerson2);
  const setTokenModalOpen = useAppStore((s) => s.setTokenModalOpen);
  const [isExporting, setIsExporting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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
    if (!cardRef.current || isExporting || !duoResult) return;
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

      const file = new File([blob], "vibe-aura-duo-result.png", { type: "image/png" });
      const filename = `vibe-aura-duo-${duoResult.duoScore}.png`;

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({
            title: `${duoResult.title} — Vibe & Aura`,
            text: `Duo Vibe Score: ${duoResult.duoScore}/100 💔`,
            files: [file],
          });
        } catch (e: any) {
          if (e.name !== 'AbortError') {
            setIsDownloading(true);
            downloadBlob(blob, filename);
            setTimeout(() => setIsDownloading(false), 2000);
          }
        }
      } else {
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
  }, [duoResult, isExporting, downloadBlob]);

  if (!duoResult) return null;

  const z1 = ZODIAC_SIGNS.find((z) => z.id === person1.zodiac) || ZODIAC_SIGNS[0];
  const z2 = ZODIAC_SIGNS.find((z) => z.id === person2.zodiac) || ZODIAC_SIGNS[1];
  const themeColor = duoResult.theme_color_hex || "#ec4899";

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

  // Score color
  const scoreColor = duoResult.duoScore > 70 ? "#22c55e" : duoResult.duoScore > 40 ? "#eab308" : "#ef4444";

  return (
    <motion.div
      className="flex flex-col min-h-dvh"
      variants={resultCardVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, ${themeColor}30 0%, transparent 60%),
            radial-gradient(ellipse at 70% 80%, ${z2.gradient[0]}20 0%, transparent 50%),
            linear-gradient(180deg, #050510 0%, #0d0d18 100%)
          `,
        }}
      />

      {/* Header */}
      <motion.div variants={resultItemVariants} className="pt-8 px-5 flex items-center justify-between">
        <div />{/* Spacer for centering */}
        <p className="text-center text-xs font-medium text-text-secondary/50 uppercase tracking-widest mb-2">
          <span>Duo Soulmate</span>
        </p>
        <div className="mb-2">
          <SettingsDrawer />
        </div>
      </motion.div>

      <div className="flex-1 px-5 pb-4 flex flex-col">
        {/* Shareable Card */}
        <motion.div
          ref={cardRef}
          variants={resultItemVariants}
          className="glass-panel p-6 flex-1 flex flex-col relative overflow-hidden"
          style={{
            background: `linear-gradient(170deg, rgba(30,30,40,0.85) 0%, rgba(10,10,18,0.95) 100%)`,
          }}
        >
          {/* Top gradient line */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-32 rounded-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${z1.gradient[0]}, ${themeColor}, ${z2.gradient[0]}, transparent)`,
            }}
          />

          {/* Zodiac Faces */}
          <div className="text-center mt-4 mb-5">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex flex-col items-center justify-center relative w-20 h-20">
                <div
                  className="absolute inset-0 rounded-full blur-xl z-0"
                  style={{
                    background: `radial-gradient(circle, ${z1.gradient[0]}60 0%, transparent 70%)`,
                  }}
                />
                <span 
                  translate="no"
                  className="relative z-10 text-[40px] font-light leading-none mb-2"
                  style={{
                    fontFamily: "Times New Roman, serif",
                    color: "white",
                    textShadow: `0 0 15px ${z1.gradient[0]}`
                  }}
                >
                  {z1.emoji}
                  {"\uFE0E"}
                </span>
                <span className="absolute bottom-[-5px] z-10 text-[9px] font-medium tracking-[0.15em] uppercase"
                  style={{
                    color: "white",
                    textShadow: `0 0 10px ${z1.gradient[1]}`
                  }}>
                  {z1.name}
                </span>
              </div>
              
              <div className="text-2xl font-black select-none" style={{ color: themeColor }}>
                <span>×</span>
              </div>
              
              <div className="flex flex-col items-center justify-center relative w-20 h-20">
                <div
                  className="absolute inset-0 rounded-full blur-xl z-0"
                  style={{
                    background: `radial-gradient(circle, ${z2.gradient[0]}60 0%, transparent 70%)`,
                  }}
                />
                <span 
                  translate="no"
                  className="relative z-10 text-[40px] font-light leading-none mb-2"
                  style={{
                    fontFamily: "Times New Roman, serif",
                    color: "white",
                    textShadow: `0 0 15px ${z2.gradient[0]}`
                  }}
                >
                  {z2.emoji}
                  {"\uFE0E"}
                </span>
                <span className="absolute bottom-[-5px] z-10 text-[9px] font-medium tracking-[0.15em] uppercase"
                  style={{
                    color: "white",
                    textShadow: `0 0 10px ${z2.gradient[1]}`
                  }}>
                  {z2.name}
                </span>
              </div>
            </div>

            <h1
              className="text-2xl font-bold mb-1"
              style={{ color: themeColor }}
            >
              <span>{duoResult.title}</span>
            </h1>
          </div>

          {/* Score Ring */}
          <div className="mx-auto mb-5 flex items-center gap-3 rounded-full px-5 py-2.5"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Sparkles className="h-4 w-4" style={{ color: scoreColor }} />
            <span className="text-sm font-medium" style={{ color: "#a1a1aa" }}>
              <span>Vibe Score</span>
            </span>
            <span className="text-xl font-bold" style={{ color: scoreColor }}>
              <span>{duoResult.duoScore}</span>
              <span style={{ color: "rgba(161,161,170,0.6)", fontSize: "14px" }}>/100</span>
            </span>
          </div>

          {/* Red Flag */}
          <div className="rounded-2xl p-4 mb-4 flex items-start gap-3"
            style={{
              backgroundColor: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.15)",
            }}
          >
            <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" style={{ color: "#ef4444" }} />
            <div>
              <p className="text-[12px] font-bold uppercase tracking-wider mb-1" style={{ color: "#ef4444" }}>
                <span translate="no">🚩</span> <span>Red Flag</span>
              </p>
              <p className="text-[14px] leading-relaxed font-medium" style={{ color: "#ebebf5" }}>
                {renderTextWithBlurs(duoResult.redFlag)}
              </p>
            </div>
          </div>

          {/* Analysis */}
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
                {renderTextWithBlurs(duoResult.analysis_text)}
              </p>
            </div>
          </div>

          {/* Watermark */}
          <p
            className="absolute bottom-4 right-5 text-[11px] font-bold tracking-widest uppercase select-none"
            style={{ color: "rgba(255,255,255,0.15)" }}
          >
            <span>vibe & aura</span>
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div variants={resultItemVariants} className="mt-5 flex flex-col gap-3">
          {duoResult.isUnlocked === false && (
            <motion.button
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
                Unlock Full Analysis <span className="ml-1 text-[14px]">🔒</span>
              </span>
            </motion.button>
          )}

          {duoResult.isUnlocked !== false && (
            <motion.button
              onClick={handleShare}
              disabled={isExporting}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              className="w-full flex items-center justify-center gap-2 rounded-2xl px-8 py-4 text-[15px] font-bold tracking-wide text-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] cursor-pointer transition-transform duration-300 active:scale-95 border border-white/20 hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: `linear-gradient(135deg, ${themeColor}, ${z2.gradient[0]})`,
                boxShadow: `0 0 35px ${themeColor}40`,
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
          )}

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
