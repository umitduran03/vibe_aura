"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, Sparkles, AlertCircle, Calendar } from "lucide-react";
import { getAuraHistory } from "@/lib/services";
import { hapticLight } from "@/lib/haptics";

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

  return (
    <main className="relative mx-auto w-full max-w-[430px] min-h-dvh bg-bg-primary text-text-primary overflow-y-auto overflow-x-hidden flex flex-col pb-12">
      
      {/* Decorative Blur */}
      <div className="absolute top-[-10%] right-[-20%] w-64 h-64 rounded-full bg-accent-primary/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-20%] w-80 h-80 rounded-full bg-accent-secondary/15 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-8 pb-4 z-10 sticky top-0 bg-bg-primary/80 backdrop-blur-xl border-b border-white/5">
        <Link href="/" onClick={() => hapticLight()}>
          <motion.button
            className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="font-medium">Home</span>
          </motion.button>
        </Link>
        <span className="text-sm font-semibold tracking-wide flex items-center gap-1">
          <Sparkles className="w-4 h-4 text-accent-primary" />
          PAST VIBES
        </span>
        <div className="w-20" />
      </div>

      {/* TTL Info — fixed under header */}
      {!loading && !error && history.length > 0 && (
        <div className="z-10 px-6 pt-5 pb-2">
          <p className="text-center text-[11px] text-white/20 font-light tracking-wider leading-relaxed italic">
            Vibes evolve. Your past analyses are permanently wiped from the digital void every 15 days.
          </p>
        </div>
      )}

      {/* Content */}
      <div className="px-5 pt-4 flex-1 z-10 flex flex-col">
        
        {/* Loading skeletons */}
        {loading && (
          <div className="flex flex-col gap-5 pt-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-full h-[160px] rounded-3xl animate-pulse bg-white/[0.04] border border-white/[0.04]"
              />
            ))}
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center p-8 glass-panel text-center mt-4">
            <AlertCircle className="w-10 h-10 text-destructive mb-3 opacity-80" />
            <h3 className="text-lg font-bold mb-1">Connection Error</h3>
            <p className="text-sm text-text-secondary">Your past vibes are ghosting you right now, check your internet connection bestie.</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && history.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-80 glass-panel mt-6">
            <Sparkles className="w-12 h-12 text-text-secondary mb-4 opacity-50" />
            <h3 className="text-xl font-bold mb-2">A Clean Slate</h3>
            <p className="text-sm text-text-secondary px-8">You haven&apos;t done any vibe analysis yet. Ready to get roasted?</p>
            <Link href="/" className="mt-6">
              <button 
                onClick={() => hapticLight()}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 transition-all active:scale-95 rounded-full text-sm font-semibold border border-white/10"
              >
                Analyze My Vibe
              </button>
            </Link>
          </div>
        )}

        {/* Cards list */}
        <div className="flex flex-col gap-5">
          <AnimatePresence>
            {!loading && !error && history.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: index * 0.08, 
                  duration: 0.5, 
                  ease: [0.23, 1, 0.32, 1]
                }}
                className="relative p-6 overflow-hidden rounded-3xl border border-white/[0.06] group transition-transform duration-300 hover:translate-y-[-4px] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.7)]"
                style={{
                  background: `linear-gradient(145deg, rgba(28,28,34,0.8) 0%, rgba(12,12,18,0.95) 100%)`
                }}
              >
                {/* Colored Glow */}
                <div 
                  className="absolute -top-14 -right-14 w-40 h-40 rounded-full blur-[60px] opacity-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-35"
                  style={{ backgroundColor: item.color || "#888" }}
                />
                <div 
                  className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full blur-[50px] opacity-[0.08] pointer-events-none"
                  style={{ backgroundColor: item.color || "#c084fc" }}
                />
                
                {/* Card header row */}
                <div className="relative z-10 flex justify-between items-start mb-4">
                  <div className="flex flex-col flex-1 min-w-0 pr-3">
                    <span className="text-[10px] font-semibold text-white/30 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      {formatDate(item.createdAt)}
                    </span>
                    <h3 className="text-lg font-bold leading-tight flex items-center gap-2 tracking-tight truncate">
                      {item.title || "Nameless Vibe"}
                      <div 
                        className="w-2 h-2 rounded-full shrink-0 shadow-[0_0_10px_rgba(255,255,255,0.8)] border border-white/20"
                        style={{ backgroundColor: item.color || "#ccc" }}
                      />
                    </h3>
                  </div>
                  
                  <div className="text-[28px] font-black tabular-nums tracking-tighter leading-none drop-shadow-md shrink-0" style={{ color: item.color }}>
                    {item.score || 0}
                  </div>
                </div>

                {/* Comment */}
                <div className="relative z-10">
                  <div className="text-[14px] font-medium text-white/70 leading-relaxed bg-black/20 p-4 rounded-2xl border border-white/[0.04] italic">
                    &quot;{item.toxicComment || item.comment?.substring(0, 80) + "..."}&quot;
                  </div>
                </div>
                
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

    </main>
  );
}
