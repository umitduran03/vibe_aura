"use client";

import { useEffect, useState, useRef } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, Sparkle, Share, Check, Download } from "lucide-react";
import { db } from "@/lib/firebase";
import { useAppStore } from "@/store/useAppStore";

export default function DailyVibeBanner() {
  const userId = useAppStore((s) => s.userId);
  const userData = useAppStore((s) => s.userData); // for age/zodiac
  
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
        let currentVibe = null;
        let lastDate = null;
        let userZodiac = null;

        if (snap.exists()) {
          const data = snap.data();
          currentVibe = data.daily_vibe_text;
          lastDate = data.last_vibe_date;
          userZodiac = data.zodiacSign;
        }

        // Eğer tarih bugünse ve vibe varsa, API'ye gitme
        if (lastDate === todayStr && currentVibe) {
          if (isMounted) {
            setVibe(currentVibe);
            setIsLoading(false);
          }
          return;
        }

        // Yeni gün, API'den al
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
            age: 25, // default or fetch from user data if saved
            zodiac: userZodiac,
          }),
        });

        if (!res.ok) throw new Error("API error");
        const { vibe: newVibe } = await res.json();

        // Firestore'a kaydet
        await updateDoc(userRef, {
          daily_vibe_text: newVibe,
          last_vibe_date: todayStr,
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
          setVibe("The sky is a bit cloudy, couldn't read your vibe. Maybe try again later.");
          setIsLoading(false);
        }
      }
    }

    fetchVibe();

    return () => {
      isMounted = false;
    };
  }, [userId]);

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

      const file = new File([blob], "vibe-aura-daily-vibe.png", { type: "image/png" });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: "Daily Vibe - Vibe & Aura",
          });
          setShared(true);
          setTimeout(() => setShared(false), 2000);
        } catch (e: any) {
          if (e.name !== 'AbortError') {
            downloadBlob(blob, "vibe-aura-daily-vibe.png");
            setShared(true);
            setTimeout(() => setShared(false), 2000);
          }
        }
      } else {
        downloadBlob(blob, "vibe-aura-daily-vibe.png");
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
            <Sparkle className="w-3.5 h-3.5" />
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Daily Vibe ⚡
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
                <span className="text-[10px] font-medium" style={{ color: "#c084fc" }}>Preparing your vibe... ✨</span>
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
                <span>Generating your vibe...</span>
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
                  I can't read your daily vibe if I don't know your sign. Please set your Zodiac sign in Settings first. ✦
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
                  Set your Zodiac Sign
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
              VIBE & AURA <Sparkles className="w-2 h-2" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
