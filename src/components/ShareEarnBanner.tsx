"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, Share2, Mail, AlertCircle } from "lucide-react";
import { useT } from "@/hooks/useT";
import { hapticLight, hapticMedium } from "@/lib/haptics";

export function ShareEarnBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useT();

  const openModal = () => {
    hapticLight();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    hapticLight();
    setIsModalOpen(false);
  };

  return (
    <>
      {/* ─── Banner ─── */}
      <div 
        onClick={openModal}
        className="relative rounded-3xl p-[2px] shadow-lg hover:scale-[1.02] transition-transform duration-300 cursor-pointer overflow-hidden group mb-6"
        style={{
          background: "linear-gradient(270deg, #6366f1, #a855f7, #ec4899, #6366f1)",
          backgroundSize: "200% 200%",
          animation: "gradientMove 5s ease infinite",
        }}
      >
        <div className="relative bg-[#0f172a]/40 backdrop-blur-sm rounded-[22px] p-5 h-full overflow-hidden">
          {/* Shimmer Effect */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmerEffect_2s_infinite]" style={{ transform: "skewX(-20deg)" }} />

          {/* Decorative Light */}
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-pink-500 rounded-full blur-3xl opacity-30"></div>
          
          <div className="relative z-10 flex items-center gap-4">
            {/* Icon */}
            <div className="w-14 h-14 shrink-0 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6 border border-yellow-200/20">
              <span className="text-2xl drop-shadow-md">🪙</span>
            </div>
            
            {/* Text */}
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-white mb-1 truncate">{t.shareEarnTitle}</h2>
              <p className="text-xs text-slate-200 leading-snug line-clamp-2">{t.shareEarnDesc}</p>
            </div>
          </div>
          
          {/* Button */}
          <div className="mt-4 relative z-10">
            <button className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold transition-colors flex justify-center items-center gap-2">
              {t.shareEarnBtn}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ─── Modal ─── */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="w-full max-w-sm rounded-3xl p-6 relative shadow-2xl"
              style={{
                background: "rgba(30, 41, 59, 0.8)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={closeModal} 
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-800/50 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon & Title */}
              <div className="text-center mb-6 mt-2">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-500 to-purple-500 rounded-[2rem] flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30">
                  <span className="text-4xl">🎥</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{t.shareEarnModalTitle}</h2>
                <p className="text-slate-300 text-sm leading-relaxed">{t.shareEarnModalDesc}</p>
              </div>

              {/* Steps */}
              <div className="space-y-5 mb-6">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 font-bold border border-indigo-500/30">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1">{t.shareEarnStep1Title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{t.shareEarnStep1Desc}</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 font-bold border border-purple-500/30">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1">{t.shareEarnStep2Title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{t.shareEarnStep2Desc}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0 font-bold border border-pink-500/30">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1">{t.shareEarnStep3Title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{t.shareEarnStep3Desc}</p>
                  </div>
                </div>
              </div>

              {/* Rules Alert */}
              <div className="bg-slate-800/80 rounded-xl p-3 mb-6 border border-slate-700 flex gap-2 items-start">
                <AlertCircle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-300 leading-relaxed">
                  {t.shareEarnTerms}
                </p>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => {
                  hapticMedium();
                  closeModal();
                }} 
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold shadow-lg shadow-purple-500/25 transition-all active:scale-[0.98]"
              >
                {t.shareEarnGotIt}
              </button>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes shimmerEffect {
          0% { left: -100%; }
          100% { left: 200%; }
        }
      `}} />
    </>
  );
}
