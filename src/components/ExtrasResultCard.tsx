"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import { RotateCcw, Sparkles, Share2, Download, Loader2 } from "lucide-react";
import { resultCardVariants, resultItemVariants } from "@/lib/animations";
import GlassButton from "@/components/ui/GlassButton";
import { useAppStore, type ExtrasType } from "@/store/useAppStore";
import { hapticLight, hapticMedium } from "@/lib/haptics";
import SettingsDrawer from "@/components/SettingsDrawer";
import { useT } from "@/hooks/useT";
import Image from "next/image";
import { WaveLogoIcon } from "@/components/ui/WaveLogoIcon";
import { auth } from "@/lib/firebase";

const getThemeLabel = (type: ExtrasType, t: any) => {
  switch (type) {
    case "toxic-ex": return t.extrasTitleToxic;
    case "situationship": return t.extrasTitleSituationship;
    case "mood-reset": return t.extrasTitleMood;
    case "delulu-check": return t.extrasTitleDelulu;
    case "rizz-architect": return t.extrasTitleRizz;
  }
};

const THEME: Record<ExtrasType, { emoji: string; grad1: string; grad2: string }> = {
  "toxic-ex": { emoji: "💀", grad1: "#ef4444", grad2: "#f97316" },
  situationship: { emoji: "🤡", grad1: "#d946ef", grad2: "#a855f7" },
  "mood-reset": { emoji: "🔋", grad1: "#06b6d4", grad2: "#14b8a6" },
  "delulu-check": { emoji: "📱", grad1: "#f59e0b", grad2: "#eab308" },
  "rizz-architect": { emoji: "💬", grad1: "#8b5cf6", grad2: "#a855f7" },
};

export default function ExtrasResultCard() {
  const resetWizard = useAppStore((s) => s.resetWizard);
  const extrasResult = useAppStore((s) => s.extrasResult);
  const extrasType = useAppStore((s) => s.extrasType);

  const [isExporting, setIsExporting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const t = useT();
  const cardRef = useRef<HTMLDivElement>(null);

  // Anti-cheat chronometer state
  const [shareToast, setShareToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const shareStartTimeRef = useRef<number | null>(null);
  const hasRewardedRef = useRef(false);

  /* =============================================
     ANTI-CHEAT VISIBILITY LISTENER
     ============================================= */
  useEffect(() => {
    const handleVisibility = async () => {
      if (document.visibilityState === "visible" && shareStartTimeRef.current !== null) {
        const elapsed = Date.now() - shareStartTimeRef.current;
        shareStartTimeRef.current = null;

        if (elapsed >= 12000) {
          if (!hasRewardedRef.current) {
            hasRewardedRef.current = true;
            setShareToast({ message: t.resultShareSuccess, type: "success" });
            setTimeout(() => setShareToast(null), 4000);

            try {
              const idToken = await auth.currentUser?.getIdToken();
              if (idToken) {
                await fetch("/api/add-tokens", {
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
    if (!cardRef.current || isExporting || !extrasResult || !extrasType) return;

    setIsExporting(true);
    hapticMedium();

    try {
      const filter = (node: HTMLElement) => {
        const exclusionClasses = ['google-translate', 'skiptranslate'];
        if (exclusionClasses.some(cls => node.classList?.contains?.(cls))) return false;
        // Hide interactive copy buttons from the shared image
        if (node.getAttribute?.('data-exclude-share') === 'true') return false;
        return true;
      };

      const htmlToImage = await import("html-to-image");
      const blob = await htmlToImage.toBlob(cardRef.current, {
        backgroundColor: "#050510",
        pixelRatio: 3,
        filter: filter as any,
      });

      if (!blob) throw new Error("Canvas blob failed");

      const file = new File([blob], "vibecheckr-extras-result.png", { type: "image/png" });
      const filename = `vibecheckr-${extrasType}.png`;

      // Reset reward flag for new share attempt
      hasRewardedRef.current = false;

      // Try Web Share API first (works on mobile, enables direct IG share)
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        try {
          shareStartTimeRef.current = Date.now();
          await navigator.share({
            title: t.resultShareTitle.replace("{name}", extrasResult.title),
            text: `${extrasResult.title}\n${t.resultShareText.replace("{score}", "").replace("{name}", extrasResult.title)}`,
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
  }, [extrasResult, extrasType, isExporting, downloadBlob]);

  if (!extrasResult || !extrasType) return null;

  const theme = THEME[extrasType];
  const { title, analysis_text, verdict, theme_color_hex, delulu_score, vibe_check, roast, rizz_options } = extrasResult;
  const color = theme_color_hex || theme.grad1;

  const handleReset = () => { hapticLight(); resetWizard(); };

  // Delulu score label
  const getDeluluLabel = (score: number) => {
    if (score <= 20) return t.deluluGrounded;
    if (score <= 40) return t.deluluSlight;
    if (score <= 60) return t.deluluCopium;
    if (score <= 80) return t.deluluFull;
    return t.deluluClinical;
  };

  // Delulu score color
  const getDeluluColor = (score: number) => {
    if (score <= 20) return "#22c55e";
    if (score <= 40) return "#84cc16";
    if (score <= 60) return "#eab308";
    if (score <= 80) return "#f97316";
    return "#ef4444";
  };

  return (
    <m.div className="flex flex-col min-h-dvh" variants={resultCardVariants} initial="hidden" animate="visible">
      <div className="fixed inset-0 -z-10" style={{
        background: `radial-gradient(ellipse at 50% 20%, ${color}25 0%, transparent 60%),
          radial-gradient(ellipse at 80% 80%, ${theme.grad2}20 0%, transparent 50%),
          linear-gradient(180deg, #050510 0%, #0d0d18 100%)`
      }} />

      <m.div variants={resultItemVariants} className="pt-8 px-5 flex items-center justify-between">
        <div />
        <p className="text-center text-xs font-medium text-text-secondary/50 uppercase tracking-widest mb-2">
          {getThemeLabel(extrasType, t)}
        </p>
        <div className="mb-2"><SettingsDrawer /></div>
      </m.div>

      <div className="flex-1 px-5 pb-4 flex flex-col">
        <m.div
          ref={cardRef}
          variants={resultItemVariants}
          className="glass-panel p-6 flex-1 flex flex-col relative overflow-hidden"
          style={{ background: "linear-gradient(170deg, rgba(30,30,40,0.85) 0%, rgba(10,10,18,0.95) 100%)" }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-24 rounded-full"
            style={{ background: `linear-gradient(90deg, transparent, ${theme.grad1}, ${theme.grad2}, transparent)` }} />

          <div className="text-center mt-4 mb-6">
            <div className="text-5xl mb-3">{theme.emoji}</div>
            <h2 className="text-lg font-medium text-text-secondary mb-1">{getThemeLabel(extrasType, t)}</h2>
            <h1 className="text-2xl font-bold" style={{ color }}>{title}</h1>
          </div>

          {/* Delulu Score Gauge */}
          {extrasType === "delulu-check" && typeof delulu_score === "number" && (
            <m.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="mx-auto mb-5 flex flex-col items-center gap-2"
            >
              <div className="relative w-28 h-28 flex items-center justify-center">
                {/* Background circle */}
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                  <m.circle
                    cx="50" cy="50" r="42"
                    fill="none"
                    stroke={getDeluluColor(delulu_score)}
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 42}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - delulu_score / 100) }}
                    transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
                  />
                </svg>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-black" style={{ color: getDeluluColor(delulu_score) }}>
                    {delulu_score}
                  </span>
                  <span className="text-[9px] font-bold text-white/40 uppercase tracking-wider">{t.deluluLabel}</span>
                </div>
              </div>
              <div className="px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide"
                style={{ backgroundColor: `${getDeluluColor(delulu_score)}15`, color: getDeluluColor(delulu_score), border: `1px solid ${getDeluluColor(delulu_score)}30` }}>
                {getDeluluLabel(delulu_score)}
              </div>
            </m.div>
          )}

          {verdict && (
            <div className="mx-auto mb-5 flex items-center gap-2 rounded-full px-5 py-2.5"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <Sparkles className="h-4 w-4" style={{ color }} />
              <span className="text-sm font-medium text-white/80">{verdict}</span>
            </div>
          )}

          <div className="flex-1">
            {analysis_text && (
              <div className="rounded-2xl p-5 mb-5" style={{ backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <p className="text-[15px] leading-relaxed whitespace-pre-line font-medium" style={{ color: "#ebebf5" }}>
                  {analysis_text}
                </p>
              </div>
            )}

            {extrasType === "rizz-architect" && (
              <div className="flex flex-col gap-4 w-full pb-4">
                {vibe_check && (
                  <div className="rounded-2xl p-4" style={{ backgroundColor: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}>
                    <h3 className="text-[11px] font-bold text-violet-400 mb-1.5 uppercase tracking-wider">{t.vibeCheckLabel}</h3>
                    <p className="text-[15px] leading-relaxed font-medium text-white/90">{vibe_check}</p>
                  </div>
                )}

                {roast && (
                  <div className="rounded-2xl p-4" style={{ backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                    <h3 className="text-[11px] font-bold text-red-400 mb-1.5 uppercase tracking-wider">{t.roastLabel}</h3>
                    <p className="text-[15px] leading-relaxed font-medium text-white/90">{roast}</p>
                  </div>
                )}

                {rizz_options && rizz_options.length > 0 && (
                  <div className="flex flex-col gap-3 mt-2">
                    <h3 className="text-[11px] font-bold text-white/50 uppercase tracking-wider text-center mb-1">{t.guruRepliesLabel}</h3>
                    {rizz_options.map((option, i) => (
                      <div key={i} className="rounded-2xl p-4 relative group" style={{ backgroundColor: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.05)" }}>
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider" style={{ backgroundColor: "rgba(139,92,246,0.2)", color: "#c4b5fd" }}>
                            {option.type}
                          </span>
                          <button
                            data-exclude-share="true"
                            onClick={() => {
                              navigator.clipboard.writeText(option.text);
                              hapticLight();
                              setCopiedIndex(i);
                              setTimeout(() => setCopiedIndex(null), 2000);
                            }}
                            className="text-white/40 hover:text-white transition-colors p-1 flex items-center gap-1.5"
                          >
                            {copiedIndex === i ? (
                              <>
                                <span className="text-[10px] text-green-400 font-bold uppercase">{t.copied}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                              </>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                            )}
                          </button>
                        </div>
                        <p className="text-[15px] leading-relaxed font-medium text-white">{option.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="absolute bottom-4 right-5 flex items-center gap-1.5 select-none">
            <WaveLogoIcon size={14} className="opacity-[0.35]" />
            <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.15)" }}>VibeCheckr.</span>
          </div>
        </m.div>

        <m.div variants={resultItemVariants} className="mt-5 flex flex-col gap-3">
          <m.button
            onClick={handleShare}
            disabled={isExporting}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            className="w-full flex items-center justify-center gap-2 rounded-2xl px-8 py-4 text-[15px] font-bold tracking-wide text-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] cursor-pointer transition-transform duration-300 active:scale-95 border border-white/20 hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: `linear-gradient(135deg, ${theme.grad1}, ${theme.grad2})`,
              boxShadow: `0 0 35px ${theme.grad1}40`,
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

          <GlassButton variant="ghost" onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl transition-all hover:bg-white/10 active:scale-95 font-medium">
            <RotateCcw className="h-5 w-5" /><span>{t.resultTryAgain}</span>
          </GlassButton>
        </m.div>
      </div>
    </m.div>
  );
}
