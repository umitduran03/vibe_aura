"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, Sparkles, AlertCircle, Calendar, ChevronDown } from "lucide-react";
import { getAuraHistory } from "@/lib/services";
import { hapticLight } from "@/lib/haptics";

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  // Infinite scroll states
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchHistory = async (isLoadMore = false) => {
    if (isLoadMore && (!hasMore || loadingMore)) return;
    
    try {
      if (isLoadMore) setLoadingMore(true);
      else setLoading(true);

      const { history: newHistory, lastVisible: newLastVisible } = await getAuraHistory(isLoadMore ? lastVisible : null);
      
      const filteredData = newHistory.filter((item: any) => item.isUnlocked !== false);

      if (filteredData.length === 0) {
        setHasMore(false);
      } else {
        setHistory(prev => isLoadMore ? [...prev, ...filteredData] : filteredData);
        setLastVisible(newLastVisible);
        
        // If we got less than 5 items, there's no more data
        if (newHistory.length < 5) {
          setHasMore(false);
        }
      }
    } catch (err) {
      console.error("Error fetching history:", err);
      if (!isLoadMore) setError(true);
    } finally {
      if (isLoadMore) setLoadingMore(false);
      else setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !loadingMore) {
          fetchHistory(true);
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, loading, loadingMore, lastVisible]);

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

  const toggleExpand = (id: string) => {
    hapticLight();
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <main className="relative mx-auto w-full max-w-[430px] min-h-dvh bg-bg-primary text-text-primary overflow-y-auto overflow-x-hidden flex flex-col pb-12">
      
      {/* Decorative Blur */}
      <div className="absolute top-[-10%] right-[-20%] w-64 h-64 rounded-full bg-accent-primary/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-20%] w-80 h-80 rounded-full bg-accent-secondary/15 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-8 pb-4 z-10 sticky top-0 bg-bg-primary/80 backdrop-blur-xl border-b border-white/5">
        <Link href="/" prefetch={false} onClick={() => hapticLight()}>
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
            Vibes evolve. Your past analyses are permanently wiped from the digital void every 48 hours.
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
            <Link href="/" prefetch={false} className="mt-6">
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
            {!loading && !error && history.map((item, index) => {
              const isExpanded = expandedId === item.id;
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    delay: (index % 5) * 0.08, 
                    duration: 0.5, 
                    ease: [0.23, 1, 0.32, 1]
                  }}
                  className="relative p-6 overflow-hidden rounded-3xl border border-white/[0.06] transition-transform duration-300"
                  style={{
                    background: `linear-gradient(145deg, rgba(28,28,34,0.8) 0%, rgba(12,12,18,0.95) 100%)`
                  }}
                >
                  {/* Colored Glow */}
                  <div 
                    className="absolute -top-14 -right-14 w-40 h-40 rounded-full blur-[60px] opacity-20 pointer-events-none transition-opacity duration-500"
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
                      <h3 className={`text-lg font-bold leading-tight flex items-center gap-2 tracking-tight ${!isExpanded ? "truncate" : "whitespace-normal text-wrap"}`}>
                        <span className={`${!isExpanded ? "truncate" : ""}`}>
                          {item.title || (item.type === "extras" ? "Extras Analysis" : "Nameless Vibe")}
                        </span>
                        <div 
                          className="w-2 h-2 rounded-full shrink-0 shadow-[0_0_10px_rgba(255,255,255,0.8)] border border-white/20"
                          style={{ backgroundColor: item.color || "#ccc" }}
                        />
                      </h3>
                    </div>
                    
                    {item.score !== undefined && item.score !== null && (
                      <div className="text-[28px] font-black tabular-nums tracking-tighter leading-none drop-shadow-md shrink-0" style={{ color: item.color }}>
                        {item.score}
                      </div>
                    )}
                  </div>

                  {/* Comment (Accordion) */}
                  <div className="relative z-10 cursor-pointer group" onClick={() => toggleExpand(item.id)}>
                    <motion.div 
                      layout
                      className="bg-black/30 p-4 rounded-2xl border border-white/[0.04] transition-colors group-hover:bg-black/40"
                    >
                      <motion.div 
                        layout="position"
                        className={`text-[14px] font-medium text-white/80 leading-relaxed italic ${!isExpanded ? "line-clamp-3" : ""}`}
                      >
                        &quot;{item.type === 'extras' ? (item.vibe_check || item.comment || "Analysis complete.") : (item.toxicComment || item.comment || "Analysis complete.")}&quot;
                      </motion.div>
                      
                      <AnimatePresence>
                        {isExpanded && item.type === 'extras' && item.verdict && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 pt-4 border-t border-white/10">
                              <span className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Verdict</span>
                              <span className="text-[14px] font-bold text-white/90">{item.verdict}</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <motion.div layout="position" className="mt-3 flex items-center justify-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                        <span className="text-[10px] uppercase tracking-widest font-semibold">
                          {isExpanded ? "Show Less" : "Read More"}
                        </span>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-3 h-3" />
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </div>
                  
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Infinite Scroll Loader */}
          {hasMore && !loading && (
            <div ref={observerTarget} className="w-full flex justify-center py-6">
              {loadingMore && (
                <div className="flex gap-2 items-center">
                  <div className="w-2 h-2 rounded-full bg-white/20 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              )}
            </div>
          )}
          
          {!hasMore && history.length > 0 && (
             <div className="w-full text-center py-8">
               <span className="text-xs font-medium tracking-widest text-white/20 uppercase">End of history</span>
             </div>
          )}
        </div>
      </div>

    </main>
  );
}
