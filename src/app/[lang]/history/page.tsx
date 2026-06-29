"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, Sparkles, AlertCircle, Calendar, ChevronDown, Share2, Loader2 } from "lucide-react";
import { getAuraHistory } from "@/lib/services";
import { hapticLight, hapticMedium } from "@/lib/haptics";
import { WaveLogoIcon } from "@/components/ui/WaveLogoIcon";
import { useT } from "@/hooks/useT";
import { useAppStore } from "@/store/useAppStore";

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const t = useT();
  const locale = useAppStore((s) => s.locale);
  const userId = useAppStore((s) => s.userId);
  
  // Infinite scroll states
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Share states
  const [sharingId, setSharingId] = useState<string | null>(null);
  const [sharingItem, setSharingItem] = useState<any>(null);
  const shareRef = useRef<HTMLDivElement>(null);

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

  const handleShare = async (item: any) => {
    if (sharingId) return;
    
    hapticMedium();
    setSharingId(item.id);
    setSharingItem(item);

    // Give React time to render the offscreen component
    await new Promise(r => setTimeout(r, 150));

    try {
      if (!shareRef.current) return;
      
      const filter = (node: HTMLElement) => {
        const exclusionClasses = ['google-translate', 'skiptranslate'];
        return !exclusionClasses.some(cls => node.classList?.contains?.(cls));
      };

      const htmlToImage = await import("html-to-image");
      const blob = await htmlToImage.toBlob(shareRef.current, {
        backgroundColor: "#050510",
        pixelRatio: 3,
        filter: filter as any,
      });

      if (!blob) throw new Error("Canvas blob failed");

      const file = new File([blob], "vibecheckr-history.png", { type: "image/png" });
      const filename = `vibecheckr-history-${item.id}.png`;

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({
            title: "VibeCheckr",
            text: t.historyShareText,
            files: [file],
          });
        } catch (shareErr: any) {
          if (shareErr?.name !== "AbortError") {
            downloadBlob(blob, filename);
          }
        }
      } else {
        downloadBlob(blob, filename);
      }
    } catch (err) {
      console.error("[Share] Export error:", err);
    } finally {
      setSharingId(null);
      setSharingItem(null);
    }
  };

  const fetchHistory = async (isLoadMore = false) => {
    if (!userId) return;
    if (isLoadMore && (!hasMore || loadingMore)) return;
    
    try {
      if (isLoadMore) setLoadingMore(true);
      else setLoading(true);

      const { history: newHistory, lastVisible: newLastVisible } = await getAuraHistory(userId, isLoadMore ? lastVisible : null);
      
      const filteredData = newHistory.filter((item: any) => item.isUnlocked !== false);

      if (filteredData.length === 0) {
        setHasMore(false);
      } else {
        setHistory(prev => isLoadMore ? [...prev, ...filteredData] : filteredData);
        setLastVisible(newLastVisible);
        
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
    if (userId) {
      fetchHistory();
    }
  }, [userId]);

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
    if (!timestamp) return t.historyUnknownDate;
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
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

      {/* Off-screen Share Container */}
      <div className="fixed top-0 left-[-9999px] z-[-1] pointer-events-none">
        {sharingItem && (
          <div 
            ref={shareRef}
            className="relative p-8 overflow-hidden rounded-[2rem] border border-white/10 w-[420px]"
            style={{
              background: `linear-gradient(145deg, rgba(28,28,34,0.95) 0%, rgba(12,12,18,1) 100%)`
            }}
          >
            <div className="absolute -top-14 -right-14 w-40 h-40 rounded-full blur-[60px] opacity-30" style={{ backgroundColor: sharingItem.color || "#888" }} />
            <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full blur-[50px] opacity-10" style={{ backgroundColor: sharingItem.color || "#c084fc" }} />

            <div className="relative z-10 flex justify-between items-start mb-6">
              <div className="flex flex-col flex-1 pr-3">
                <span className="text-[12px] font-semibold text-white/40 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(sharingItem.createdAt)}
                </span>
                <h3 className="text-2xl font-bold leading-tight flex items-center gap-2">
                  <span>{sharingItem.title || (sharingItem.type === "extras" ? t.historyExtrasLabel : t.historyNamelessVibe)}</span>
                </h3>
              </div>
              {sharingItem.score !== undefined && sharingItem.score !== null && (
                <div className="text-[40px] font-black tabular-nums tracking-tighter leading-none drop-shadow-lg" style={{ color: sharingItem.color }}>
                  {sharingItem.score}
                </div>
              )}
            </div>

            <div className="relative z-10 bg-black/40 p-6 rounded-2xl border border-white/5">
              <div className="text-[16px] font-medium text-white/90 leading-relaxed italic whitespace-pre-wrap">
                {sharingItem.comment || sharingItem.vibe_check || sharingItem.toxicComment || t.historyAnalysisComplete}
              </div>
              {sharingItem.type === 'extras' && sharingItem.verdict && (
                <div className="mt-6 pt-6 border-t border-white/10">
                  <span className="block text-[12px] font-bold uppercase tracking-widest text-white/40 mb-1.5">{t.historyVerdict}</span>
                  <span className="text-[16px] font-bold text-white/90">{sharingItem.verdict}</span>
                </div>
              )}
            </div>

            <div className="relative z-10 mt-8 flex items-center justify-between opacity-50">
              <div className="flex items-center gap-1.5">
                <WaveLogoIcon size={16} />
                <span className="text-[12px] font-bold tracking-widest uppercase">thevibecheckr.com</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest border border-white/20 px-2 py-1 rounded-full">{t.historyBadge}</span>
            </div>
          </div>
        )}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-8 pb-4 z-10 sticky top-0 bg-bg-primary/80 backdrop-blur-xl border-b border-white/5">
        <Link href="/" prefetch={false} onClick={() => hapticLight()}>
          <motion.button
            className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="font-medium">{t.historyHome}</span>
          </motion.button>
        </Link>
        <span className="text-sm font-semibold tracking-wide flex items-center gap-1">
          <Sparkles className="w-4 h-4 text-accent-primary" />
          {t.historyTitle}
        </span>
        <div className="w-20" />
      </div>

      {/* TTL Info */}
      {!loading && !error && history.length > 0 && (
        <div className="z-10 px-6 pt-5 pb-2">
          <p className="text-center text-[11px] text-white/20 font-light tracking-wider leading-relaxed italic">
            {t.historyTtl}
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
            <h3 className="text-lg font-bold mb-1">{t.historyErrorTitle}</h3>
            <p className="text-sm text-text-secondary">{t.historyErrorDesc}</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && history.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-80 glass-panel mt-6">
            <Sparkles className="w-12 h-12 text-text-secondary mb-4 opacity-50" />
            <h3 className="text-xl font-bold mb-2">{t.historyEmptyTitle}</h3>
            <p className="text-sm text-text-secondary px-8">{t.historyEmptyDesc}</p>
            <Link href="/" prefetch={false} className="mt-6">
              <button 
                onClick={() => hapticLight()}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 transition-all active:scale-95 rounded-full text-sm font-semibold border border-white/10"
              >
                {t.historyEmptyCta}
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
                          {item.title || (item.type === "extras" ? t.historyExtrasLabel : t.historyNamelessVibe)}
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
                        className={`text-[14px] font-medium text-white/80 leading-relaxed italic ${!isExpanded ? "line-clamp-3" : "whitespace-pre-wrap"}`}
                      >
                        {isExpanded 
                          ? (item.comment || item.vibe_check || item.toxicComment || t.historyAnalysisComplete)
                          : `"${item.type === 'extras' ? (item.vibe_check || item.comment || t.historyAnalysisComplete) : (item.toxicComment || item.comment || t.historyAnalysisComplete)}"`}
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
                              <span className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">{t.historyVerdict}</span>
                              <span className="text-[14px] font-bold text-white/90">{item.verdict}</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <motion.div layout="position" className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                          <span className="text-[10px] uppercase tracking-widest font-semibold">
                            {isExpanded ? t.historyShowLess : t.historyReadMore}
                          </span>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="w-3 h-3" />
                          </motion.div>
                        </div>

                        <button 
                          onClick={(e) => { e.stopPropagation(); handleShare(item); }}
                          disabled={sharingId === item.id}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"
                        >
                          {sharingId === item.id ? <Loader2 className="w-3 h-3 animate-spin text-white/70" /> : <Share2 className="w-3 h-3" />}
                          <span className="text-[10px] font-bold tracking-widest uppercase">{locale === 'tr' ? 'PAYLAŞ' : 'SHARE'}</span>
                        </button>
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
               <span className="text-xs font-medium tracking-widest text-white/20 uppercase">{t.historyEnd}</span>
             </div>
          )}
        </div>
      </div>

    </main>
  );
}
