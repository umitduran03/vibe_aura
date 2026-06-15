"use client";

import { useEffect, useState, useRef } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, Sparkle, Share, Check, Download } from "lucide-react";
import Image from "next/image";
import { WaveLogoIcon } from "@/components/ui/WaveLogoIcon";
import { db } from "@/lib/firebase";
import { useAppStore } from "@/store/useAppStore";
import { useT } from "@/hooks/useT";

export default function DailyVibeBanner() {
  const userId = useAppStore((s) => s.userId);
  const userData = useAppStore((s) => s.userData);
  const locale = useAppStore((s) => s.locale);
  const t = useT();
  
  const [vibe, setVibe] = useState<string | null>(null);
  const [missingZodiac, setMissingZodiac] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSharing, setIsSharing] = useState(false);
  const [shared, setShared] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const setSettingsOpen = useAppStore((s) => s.setSettingsOpen);

  useEffect(() => {
    if (!userId) return;

    let isMounted = true;

    async function fetchVibe() {
      try {
        const userRef = doc(db, "users", userId!);
        const snap = await getDoc(userRef);
        
        const todayStr = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
        // Her locale için ayrı Firestore alanı kullan
        const vibeField = locale === "tr" ? "daily_vibe_text_tr" : "daily_vibe_text_en";
        const dateField = locale === "tr" ? "last_vibe_date_tr" : "last_vibe_date_en";

        let currentVibe = null;
        let lastDate = null;
        let userZodiac = null;
        let userAge = 22; // default if missing
        let userGender = null;

        if (snap.exists()) {
          const data = snap.data();
          currentVibe = data[vibeField] || null;
          lastDate = data[dateField] || null;
          userZodiac = data.zodiacSign;
          userAge = data.age || data.userAge || 22;
          userGender = data.gender || null;
        }

        // Bugün zaten bu locale için vibe çekildiyse API'ye gitme
        if (lastDate === todayStr && currentVibe) {
          if (isMounted) {
            setVibe(currentVibe);
            setIsLoading(false);
          }
          return;
        }

        // Burcu yoksa UI'da uyarı göster
        if (!userZodiac) {
          if (isMounted) {
            setMissingZodiac(true);
            setIsLoading(false);
          }
          return;
        }

        if (isMounted) setIsLoading(true);

        const res = await fetch("/api/daily-vibe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            age: userAge,
            zodiac: userZodiac,
            gender: userGender,
            locale,
          }),
        });

        if (!res.ok) throw new Error("API error");
        const { vibe: newVibe } = await res.json();

        // Locale'e özgü alanlara kaydet
        await updateDoc(userRef, {
          [vibeField]: newVibe,
          [dateField]: todayStr,
        }).catch(err => {
          console.error("Vibe update error", err);
        });

        if (isMounted) {
          setVibe(newVibe);
          setIsLoading(false);
        }

      } catch (err) {
        console.error("Error fetching daily vibe:", err);
        if (isMounted) {
          setVibe(t.dailyError);
          setIsLoading(false);
        }
      }
    }

    // Locale değiştiğinde soruşurmadan yeniden çek
    setVibe(null);
    setIsLoading(true);
    setMissingZodiac(false);
    fetchVibe();

    return () => {
      isMounted = false;
    };
  // locale değişince de yeniden çek — TR/EN vibe ayrı olmalı
  }, [userId, locale]);

  /** Download blob as PNG — universal fallback */
  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (!bannerRef.current || !vibe) return;
    setIsSharing(true);

    try {
      const filter = (node: HTMLElement) => {
        const exclusionClasses = ['google-translate', 'skiptranslate'];
        const securityFilterPassed = !exclusionClasses.some(cls => node.classList?.contains?.(cls));
        
        const internalLoadingElementPassed = !(node.getAttribute?.('data-loading-feedback') === 'true');
        
        return securityFilterPassed && internalLoadingElementPassed;
      };

      const htmlToImage = await import("html-to-image");
      const blob = await htmlToImage.toBlob(bannerRef.current, {
        backgroundColor: "#09090b",
        pixelRatio: 3,
        width: bannerRef.current.offsetWidth,
        filter: filter as any,
      });

      if (!blob) throw new Error("Failed to capture image");

      const file = new File([blob], "vibecheckr-daily-vibe.png", { type: "image/png" });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: "Daily Vibe - VibeCheckr",
          });
          setShared(true);
          setTimeout(() => setShared(false), 2000);
        } catch (e: any) {
          if (e.name !== 'AbortError') {
            downloadBlob(blob, "vibecheckr-daily-vibe.png");
            setShared(true);
            setTimeout(() => setShared(false), 2000);
          }
        }
      } else {
        downloadBlob(blob, "vibecheckr-daily-vibe.png");
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch (e) {
      console.error("Share error:", e);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <motion.div
      ref={bannerRef}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="relative w-full overflow-hidden rounded-2xl glass-panel border border-white/10 p-4 mb-6 group cursor-default"
      style={{
        background: "linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(236,72,153,0.03) 100%)",
      }}
    >
      {/* Absolute Glow Background */}
      <div 
        className="absolute -top-10 -right-10 w-32 h-32 blur-[50px] rounded-full pointer-events-none transition-transform group-hover:scale-125 duration-700" 
        style={{ backgroundColor: "rgba(192, 132, 252, 0.2)" }} 
      />
      <div 
        className="absolute -bottom-10 -left-10 w-32 h-32 blur-[50px] rounded-full pointer-events-none transition-transform group-hover:scale-125 duration-700" 
        style={{ backgroundColor: "rgba(236, 72, 153, 0.1)" }} 
      />

      <div className="relative z-10 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 opacity-80" style={{ color: "#c084fc" }}>
            <WaveLogoIcon size={14} className="opacity-80" />
            <span className="text-[11px] font-bold uppercase tracking-wider">
              {t.dailyVibe}
            </span>
          </div>

          <motion.button
            data-loading-feedback="true"
            onClick={handleShare}
            disabled={isLoading || isSharing}
            className={`flex items-center gap-1.5 rounded-full transition-colors ${
              isSharing ? "px-3 py-1.5 bg-white/5" : "p-1.5"
            } ${
              shared ? "" : isSharing ? "" : "bg-white/5 hover:bg-white/10 text-white/60"
            }`}
            style={shared ? { backgroundColor: "rgba(34, 197, 94, 0.2)", color: "#4ade80", padding: "6px" } : {}}
            whileTap={{ scale: 0.9 }}
          >
            {isSharing ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" style={{ color: "#c084fc" }} />
                <span className="text-[10px] font-medium" style={{ color: "#c084fc" }}>{t.dailyPreparingShare}</span>
              </>
            ) : shared ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <Share className="w-3.5 h-3.5" />
            )}
          </motion.button>
        </div>

        <div className="min-h-[40px] flex items-center">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-[13px]"
                style={{ color: "rgba(161, 161, 170, 0.6)" }}
              >
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{t.dailyLoading}</span>
              </motion.div>
            ) : missingZodiac ? (
              <motion.div
                key="missing"
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-2"
              >
                <p className="text-[14px] leading-snug font-medium" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                  {t.dailyMissingZodiac}
                </p>
                <button
                  onClick={() => setSettingsOpen(true)}
                  className="w-fit text-xs font-semibold py-1.5 px-3 rounded-full transition-all hover:bg-white/10 active:scale-95"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#c084fc",
                  }}
                >
                  {t.dailySetZodiac}
                </button>
              </motion.div>
            ) : (
              <motion.p
                key="content"
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.4 }}
                className="text-[14px] leading-snug font-medium"
                style={{ color: "rgba(255, 255, 255, 0.9)" }}
              >
                {vibe}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Watermark for sharing */}
        <AnimatePresence>
          {isSharing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-[-6px] right-[-6px] opacity-30 text-[8px] font-bold tracking-widest uppercase flex items-center gap-1 z-20"
            >
              VibeCheckr. <Sparkles className="w-2 h-2" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
