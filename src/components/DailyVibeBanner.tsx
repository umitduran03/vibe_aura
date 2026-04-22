"use client";

import { useEffect, useState, useRef } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, Sparkle, Share, Check } from "lucide-react";
import { db } from "@/lib/firebase";
import { useAppStore } from "@/store/useAppStore";

export default function DailyVibeBanner() {
  const userId = useAppStore((s) => s.userId);
  const userData = useAppStore((s) => s.userData); // for age/zodiac
  
  const [vibe, setVibe] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSharing, setIsSharing] = useState(false);
  const [shared, setShared] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

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

        if (snap.exists()) {
          const data = snap.data();
          currentVibe = data.daily_vibe_text;
          lastDate = data.last_vibe_date;
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
        if (!userData.zodiac) {
          if (isMounted) {
            setVibe("I can't read your vibe if I know nothing about you. Analyze your aura first to get your daily vibe. ✦");
            setIsLoading(false);
          }
          return;
        }

        if (isMounted) setIsLoading(true);

        const res = await fetch("/api/daily-vibe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            age: userData.age,
            zodiac: userData.zodiac,
          }),
        });

        if (!res.ok) throw new Error("API error");
        const { vibe: newVibe } = await res.json();

        // Firestore'a kaydet
        await updateDoc(userRef, {
          daily_vibe_text: newVibe,
          last_vibe_date: todayStr,
        }).catch(err => {
          // Eğer döküman yoksa oluşturmayı dener (varsayılan ensureUserDoc sayesinde olmalı aslında)
          console.error("Vibe update error", err);
        });

        if (isMounted) {
          setVibe(newVibe);
          setIsLoading(false);
        }

      } catch (err) {
        console.error("Error fetching daily vibe:", err);
        if (isMounted) {
          setVibe("The sky is a bit cloudy, couldn't read your aura. Maybe try again later.");
          setIsLoading(false);
        }
      }
    }

    fetchVibe();

    return () => {
      isMounted = false;
    };
  }, [userId, userData.age, userData.zodiac]);

  const handleShare = async () => {
    if (!bannerRef.current || !vibe) return;
    setIsSharing(true);

    try {
      const htmlToImage = await import("html-to-image");
      const blob = await htmlToImage.toBlob(bannerRef.current, {
        backgroundColor: "#09090b", // Ensure dark background for the glass panel
        pixelRatio: 2,
      });

      if (!blob) throw new Error("Failed to capture image");

      if (navigator.share) {
        const file = new File([blob], `VibeAura-Daily_Vibe.png`, { type: "image/png" });
        try {
          await navigator.share({
            files: [file],
            title: "Daily Vibe - Vibe & Aura",
          });
          setShared(true);
          setTimeout(() => setShared(false), 2000);
        } catch (e: any) {
          // Check for AbortError (user cancelled) or feature non-support
          if (e.name !== 'AbortError') {
            console.warn("Share API failed, falling back to clipboard");
            fallbackCopyToClipboard(blob);
          }
        }
      } else {
        fallbackCopyToClipboard(blob);
      }
    } catch (e) {
      console.error("Share error:", e);
    } finally {
      setIsSharing(false);
    }
  };

  const fallbackCopyToClipboard = async (blob: Blob) => {
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch (e) {
      console.error("Copy to clipboard failed", e);
      alert("Your device doesn't support direct image copying.");
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
              Daily Vibe 🔮
            </span>
          </div>

          <motion.button
            onClick={handleShare}
            disabled={isLoading || isSharing}
            className={`p-1.5 rounded-full transition-colors ${
              shared ? "" : "bg-white/5 hover:bg-white/10 text-white/60"
            }`}
            style={shared ? { backgroundColor: "rgba(34, 197, 94, 0.2)", color: "#4ade80" } : {}}
            whileTap={{ scale: 0.9 }}
          >
            {isSharing ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" style={{ color: "#c084fc" }} />
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
                <span>Reading the stars...</span>
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
