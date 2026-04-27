"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, Sparkles, AlertCircle, Calendar, Download, Check } from "lucide-react";
import { getAuraHistory } from "@/lib/services";
import { hapticLight, hapticMedium } from "@/lib/haptics";

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadedId, setDownloadedId] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getAuraHistory();
        setHistory(data);
      } catch (err) {
        console.error("Error fetching history:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Unknown Date";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const handleDownload = async (itemId: string) => {
    const cardEl = cardRefs.current[itemId];
    if (!cardEl || downloadingId) return;

    hapticLight();
    setDownloadingId(itemId);

    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(cardEl, {
        pixelRatio: 3,
        backgroundColor: "#0a0a0f",
        filter: (node: HTMLElement) => {
          // Hide the download button itself from the screenshot
          if (node.dataset?.downloadBtn === "true") return false;
          // Exclude Google Translate artifacts
          if (node.tagName === "FONT" || node.classList?.contains("skiptranslate")) return false;
          return true;
        },
      });

      const link = document.createElement("a");
      link.download = `vibe-aura-history-${itemId.slice(0, 8)}.png`;
      link.href = dataUrl;
      link.click();

      hapticMedium();
      setDownloadedId(itemId);
      setTimeout(() => setDownloadedId(null), 2000);
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <main className="relative mx-auto w-full max-w-[430px] min-h-dvh bg-bg-primary text-text-primary overflow-y-auto overflow-x-hidden flex flex-col pb-10">
      
      {/* Decorative Blur */}
      <div className="absolute top-[-10%] right-[-20%] w-64 h-64 rounded-full bg-accent-primary/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-20%] w-80 h-80 rounded-full bg-accent-secondary/15 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-8 pb-6 z-10 sticky top-0 bg-bg-primary/80 backdrop-blur-xl border-b border-white/5">
        <Link href="/" onClick={() => hapticLight()}>
          <motion.button
            className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors. cursor-pointer"
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="font-medium">Home</span>
          </motion.button>
        </Link>
        <span className="text-sm font-semibold tracking-wide flex items-center gap-1">
          <Sparkles className="w-4 h-4 text-accent-primary" />
          PAST AURAS
        </span>
        <div className="w-20" /> {/* Spacer */}
      </div>

      {/* Content */}
      <div className="px-5 pt-6 flex-1 z-10 flex flex-col gap-4">
        
        {/* TTL Info Message */}
        {!loading && !error && history.length > 0 && (
          <p className="text-center text-[11px] text-white/25 font-light tracking-wide leading-relaxed px-4 -mb-1">
            Energy is transient. Your past Auras are cleared from the cosmos every 7 days.
          </p>
        )}

        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-full h-[150px] glass-panel animate-pulse bg-white/5"
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center justify-center p-8 glass-panel text-center">
            <AlertCircle className="w-10 h-10 text-destructive mb-3 opacity-80" />
            <h3 className="text-lg font-bold mb-1">Connection Error</h3>
            <p className="text-sm text-text-secondary">Your past auras are ghosting you right now, check your internet connection bestie.</p>
          </div>
        )}

        {!loading && !error && history.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-80 glass-panel mt-6">
            <Sparkles className="w-12 h-12 text-text-secondary mb-4 opacity-50" />
            <h3 className="text-xl font-bold mb-2">A Clean Slate</h3>
            <p className="text-sm text-text-secondary px-8">You haven't done any aura analysis yet. Ready to get roasted?</p>
            <Link href="/" className="mt-6">
              <button 
                onClick={() => hapticLight()}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 transition-all active:scale-95 rounded-full text-sm font-semibold border border-white/10"
              >
                Scan My Aura
              </button>
            </Link>
          </div>
        )}

        <AnimatePresence>
          {!loading && !error && history.map((item, index) => (
            <motion.div
              key={item.id}
              ref={(el) => { cardRefs.current[item.id] = el; }}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: index * 0.08, 
                duration: 0.5, 
                ease: [0.23, 1, 0.32, 1]
              }}
              className="relative p-7 overflow-hidden glass-panel -mt-4 first:mt-0 group transition-transform hover:translate-y-[-8px] hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.8)] z-10 hover:z-20"
              style={{
                background: `linear-gradient(145deg, rgba(30,30,35,0.7) 0%, rgba(15,15,20,0.9) 100%)`
              }}
            >
              {/* Colored Glow for this item representing the pass / wallet color */}
              <div 
                className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-[60px] opacity-25 pointer-events-none transition-opacity group-hover:opacity-40"
                style={{ backgroundColor: item.color || "#888" }}
              />
              <div 
                className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full blur-[50px] opacity-10 pointer-events-none"
                style={{ backgroundColor: item.color || "#c084fc" }}
              />
              
              <div className="relative z-10 flex justify-between items-start mb-5">
                <div className="flex flex-col">
                  <span className="text-[11px] font-semibold text-text-secondary/60 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(item.createdAt)}
                  </span>
                  <h3 className="text-[22px] font-bold leading-tight flex items-center gap-2 tracking-tight">
                    {item.title || "Nameless Aura"}
                    <div 
                      className="w-2.5 h-2.5 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.9)] border border-white/20"
                      style={{ backgroundColor: item.color || "#ccc" }}
                    />
                  </h3>
                </div>
                
                <div className="flex items-start gap-3">
                  {/* Download Button */}
                  <motion.button
                    data-download-btn="true"
                    onClick={(e) => { e.stopPropagation(); handleDownload(item.id); }}
                    whileTap={{ scale: 0.85 }}
                    disabled={downloadingId === item.id}
                    className="mt-1 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/[0.06] transition-all duration-300 cursor-pointer disabled:opacity-50"
                    title="Download"
                  >
                    <AnimatePresence mode="wait">
                      {downloadingId === item.id ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                        />
                      ) : downloadedId === item.id ? (
                        <motion.div
                          key="done"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                        >
                          <Check className="w-4 h-4 text-emerald-400" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="icon"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                        >
                          <Download className="w-4 h-4 text-white/50 group-hover:text-white/80 transition-colors" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  <div className="flex flex-col items-end pt-1">
                    <div className="text-[32px] font-black tabular-nums tracking-tighter drop-shadow-md" style={{ color: item.color }}>
                      {item.score || 0}
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative mt-2">
                <div className="text-[15px] font-medium text-[#ebebf5] leading-relaxed bg-black/30 p-4 rounded-2xl border border-white/5 italic shadow-inner">
                  &quot;{item.toxicComment || item.comment?.substring(0, 80) + "..."}&quot;
                </div>
              </div>
              
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </main>
  );
}
