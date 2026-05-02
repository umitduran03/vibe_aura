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
};

export default function ExtrasResultCard() {
  const resetWizard = useAppStore((s) => s.resetWizard);
  const extrasResult = useAppStore((s) => s.extrasResult);
  const extrasType = useAppStore((s) => s.extrasType);

  if (!extrasResult || !extrasType) return null;

  const theme = THEME[extrasType];
  const { title, analysis_text, verdict, theme_color_hex } = extrasResult;
  const color = theme_color_hex || theme.grad1;

  const handleReset = () => { hapticLight(); resetWizard(); };

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

          {verdict && (
            <div className="mx-auto mb-5 flex items-center gap-2 rounded-full px-5 py-2.5"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <Sparkles className="h-4 w-4" style={{ color }} />
              <span className="text-sm font-medium text-white/80">{verdict}</span>
            </div>
          )}

          <div className="flex-1">
            <div className="rounded-2xl p-5" style={{ backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <p className="text-[15px] leading-relaxed whitespace-pre-line font-medium" style={{ color: "#ebebf5" }}>
                {analysis_text}
              </p>
            </div>
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
