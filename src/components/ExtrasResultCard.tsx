"use client";
import { motion } from "framer-motion";
import { RotateCcw, Sparkles } from "lucide-react";
import { resultCardVariants, resultItemVariants } from "@/lib/animations";
import GlassButton from "@/components/ui/GlassButton";
import { useAppStore, type ExtrasType } from "@/store/useAppStore";
import { hapticLight } from "@/lib/haptics";
import SettingsDrawer from "@/components/SettingsDrawer";

const THEME: Record<ExtrasType, { emoji:string; label:string; grad1:string; grad2:string }> = {
  "toxic-ex": { emoji:"💀", label:"Toxic Ex Scanner", grad1:"#ef4444", grad2:"#f97316" },
  situationship: { emoji:"🤡", label:"Situationship Clarifier", grad1:"#d946ef", grad2:"#a855f7" },
  "mood-reset": { emoji:"🔋", label:"Mood Reset", grad1:"#06b6d4", grad2:"#14b8a6" },
  "delulu-check": { emoji:"📱", label:"Delulu Check", grad1:"#f59e0b", grad2:"#eab308" },
  "rizz-architect": { emoji:"💬", label:"The Reply Guru", grad1:"#8b5cf6", grad2:"#a855f7" },
};

export default function ExtrasResultCard() {
  const resetWizard = useAppStore((s) => s.resetWizard);
  const extrasResult = useAppStore((s) => s.extrasResult);
  const extrasType = useAppStore((s) => s.extrasType);

  if (!extrasResult || !extrasType) return null;

  const theme = THEME[extrasType];
  const { title, analysis_text, verdict, theme_color_hex, delulu_score, vibe_check, roast, rizz_options } = extrasResult;
  const color = theme_color_hex || theme.grad1;

  const handleReset = () => { hapticLight(); resetWizard(); };

  // Delulu score label
  const getDeluluLabel = (score: number) => {
    if (score <= 20) return "Grounded Queen 👑";
    if (score <= 40) return "Slightly Delusional 🤔";
    if (score <= 60) return "Copium Overdose 💨";
    if (score <= 80) return "Full Delulu Mode 🤡";
    return "Clinically Delulu 🚨";
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
    <motion.div className="flex flex-col min-h-dvh" variants={resultCardVariants} initial="hidden" animate="visible">
      <div className="fixed inset-0 -z-10" style={{
        background: `radial-gradient(ellipse at 50% 20%, ${color}25 0%, transparent 60%),
          radial-gradient(ellipse at 80% 80%, ${theme.grad2}20 0%, transparent 50%),
          linear-gradient(180deg, #050510 0%, #0d0d18 100%)`
      }} />

      <motion.div variants={resultItemVariants} className="pt-8 px-5 flex items-center justify-between">
        <div />
        <p className="text-center text-xs font-medium text-text-secondary/50 uppercase tracking-widest mb-2">
          {theme.label}
        </p>
        <div className="mb-2"><SettingsDrawer /></div>
      </motion.div>

      <div className="flex-1 px-5 pb-4 flex flex-col">
        <motion.div variants={resultItemVariants}
          className="glass-panel p-6 flex-1 flex flex-col relative overflow-hidden"
          style={{ background: "linear-gradient(170deg, rgba(30,30,40,0.85) 0%, rgba(10,10,18,0.95) 100%)" }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-24 rounded-full"
            style={{ background: `linear-gradient(90deg, transparent, ${theme.grad1}, ${theme.grad2}, transparent)` }} />

          <div className="text-center mt-4 mb-6">
            <div className="text-5xl mb-3">{theme.emoji}</div>
            <h2 className="text-lg font-medium text-text-secondary mb-1">{theme.label}</h2>
            <h1 className="text-2xl font-bold" style={{ color }}>{title}</h1>
          </div>

          {/* Delulu Score Gauge */}
          {extrasType === "delulu-check" && typeof delulu_score === "number" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="mx-auto mb-5 flex flex-col items-center gap-2"
            >
              <div className="relative w-28 h-28 flex items-center justify-center">
                {/* Background circle */}
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                  <motion.circle
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
                  <span className="text-[9px] font-bold text-white/40 uppercase tracking-wider">Delulu</span>
                </div>
              </div>
              <div className="px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide"
                style={{ backgroundColor: `${getDeluluColor(delulu_score)}15`, color: getDeluluColor(delulu_score), border: `1px solid ${getDeluluColor(delulu_score)}30` }}>
                {getDeluluLabel(delulu_score)}
              </div>
            </motion.div>
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
                    <h3 className="text-[11px] font-bold text-violet-400 mb-1.5 uppercase tracking-wider">Vibe Check</h3>
                    <p className="text-[15px] leading-relaxed font-medium text-white/90">{vibe_check}</p>
                  </div>
                )}
                
                {roast && (
                  <div className="rounded-2xl p-4" style={{ backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                    <h3 className="text-[11px] font-bold text-red-400 mb-1.5 uppercase tracking-wider">Draft Roast</h3>
                    <p className="text-[15px] leading-relaxed font-medium text-white/90">{roast}</p>
                  </div>
                )}

                {rizz_options && rizz_options.length > 0 && (
                  <div className="flex flex-col gap-3 mt-2">
                    <h3 className="text-[11px] font-bold text-white/50 uppercase tracking-wider text-center mb-1">GURU'S REPLIES</h3>
                    {rizz_options.map((option, i) => (
                      <div key={i} className="rounded-2xl p-4 relative group" style={{ backgroundColor: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.05)" }}>
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider" style={{ backgroundColor: "rgba(139,92,246,0.2)", color: "#c4b5fd" }}>
                            {option.type}
                          </span>
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(option.text);
                              hapticLight();
                            }}
                            className="text-white/40 hover:text-white transition-colors p-1"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
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

          <p className="absolute bottom-4 right-5 text-[11px] font-bold tracking-widest uppercase select-none"
            style={{ color: "rgba(255,255,255,0.15)" }}>vibe &amp; aura</p>
        </motion.div>

        <motion.div variants={resultItemVariants} className="mt-5 flex flex-col gap-3">
          <GlassButton variant="ghost" onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl transition-all hover:bg-white/10 active:scale-95 font-medium">
            <RotateCcw className="h-5 w-5" /><span>Try Again</span>
          </GlassButton>
        </motion.div>
      </div>
    </motion.div>
  );
}
