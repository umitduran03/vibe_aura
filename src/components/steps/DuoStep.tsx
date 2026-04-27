"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, Loader2, HeartOff, Flame, Eye, Users } from "lucide-react";
import { ZODIAC_SIGNS } from "@/lib/constants";
import { compressAndEncodeImage } from "@/lib/services";
import { hapticLight, hapticMedium } from "@/lib/haptics";
import { useAppStore, type DuoRelationType } from "@/store/useAppStore";
import type { ZodiacSign } from "@/lib/constants";

const DUO_RELATION_OPTIONS: { id: DuoRelationType; label: string; emoji: React.ReactNode; color: string }[] = [
  { id: "flirt", label: "Flirt / Lovers", emoji: <Flame className="w-4 h-4" />, color: "#ec4899" },
  { id: "ex", label: "Ex-Lovers", emoji: <HeartOff className="w-4 h-4" />, color: "#ef4444" },
  { id: "platonic", label: "Platonic / Crush", emoji: <Eye className="w-4 h-4" />, color: "#3b82f6" },
  { id: "bff", label: "BFF / Partner in Crime", emoji: <Users className="w-4 h-4" />, color: "#8b5cf6" },
];

/* Mini photo uploader for duo mode */
function DuoPhotoUploader({ 
  photoBase64, 
  onUpload, 
  onRemove, 
  label 
}: { 
  photoBase64: string | null; 
  onUpload: (b64: string) => void; 
  onRemove: () => void;
  label: string;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    hapticLight();
    setIsUploading(true);
    try {
      const base64 = await compressAndEncodeImage(file);
      onUpload(base64);
      hapticMedium();
    } catch (err) {
      console.error("Error uploading photo:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const triggerWebFallback = (sourceType: "camera" | "gallery") => {
    if (fileInputRef.current) {
      if (sourceType === "camera") {
        fileInputRef.current.setAttribute("capture", "environment");
      } else {
        fileInputRef.current.removeAttribute("capture");
      }
      fileInputRef.current.click();
    }
  };

  const handleCameraOption = async (sourceType: "camera" | "gallery") => {
    setIsModalOpen(false);
    hapticLight();

    try {
      const { Capacitor } = await import("@capacitor/core");
      const platform = Capacitor.getPlatform();

      if (platform === "web") {
        triggerWebFallback(sourceType);
        return;
      }

      const { Camera, CameraResultType, CameraSource } = await import("@capacitor/camera");
      const image = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: sourceType === "camera" ? CameraSource.Camera : CameraSource.Photos,
      });

      if (image.base64String) {
        setIsUploading(true);
        const mimeType = image.format === "png" ? "image/png" : "image/jpeg";
        const base64Url = `data:${mimeType};base64,${image.base64String}`;

        const res = await fetch(base64Url);
        const blob = await res.blob();
        const file = new File([blob], `photo.${image.format}`, { type: mimeType });

        const base64 = await compressAndEncodeImage(file);
        onUpload(base64);
        hapticMedium();
      }
    } catch (e: any) {
      console.warn("Capacitor Camera unavailable, falling back to file input.", e);
      triggerWebFallback(sourceType);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Hidden file input — web fallback */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />

      <AnimatePresence mode="wait">
        {photoBase64 ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            className="relative w-20 h-20 rounded-2xl overflow-hidden glass-panel"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photoBase64} alt={label} className="w-full h-full object-cover" />
            <motion.button
              onClick={(e) => { e.stopPropagation(); onRemove(); }}
              whileHover={{ scale: 1.1, boxShadow: "0 0 12px rgba(236, 72, 153, 0.6)", borderColor: "rgba(236, 72, 153, 0.6)" }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full cursor-pointer z-10 transition-all duration-300 group"
              style={{
                background: "rgba(10, 10, 15, 0.55)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 0 6px rgba(236, 72, 153, 0.3)"
              }}
            >
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                   style={{ background: "radial-gradient(circle, rgba(236,72,153,0.5) 0%, transparent 70%)" }} />
              <X className="h-3 w-3 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] relative z-20 transition-transform group-hover:rotate-90 duration-300" strokeWidth={2.5} />
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
              hapticLight();
            }}
            className="w-20 h-20 rounded-2xl glass-panel flex flex-col items-center justify-center cursor-pointer"
          >
            {isUploading ? (
              <Loader2 className="h-5 w-5 text-accent animate-spin" />
            ) : (
              <>
                <Camera className="h-5 w-5 text-text-secondary/60 mb-0.5" />
                <span className="text-[9px] text-text-secondary/40 font-medium">Photo</span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <span className="text-[11px] font-semibold text-text-secondary/70 uppercase tracking-wider">{label}</span>

      {/* Centered Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setIsModalOpen(false); hapticLight(); }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[99]"
            />
            <div className="fixed inset-0 flex items-center justify-center z-[100] pointer-events-none p-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-[320px] bg-[#1c1c1e]/90 backdrop-blur-xl rounded-3xl p-6 pointer-events-auto border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              >
                <button
                  onClick={() => { setIsModalOpen(false); hapticLight(); }}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>

                <h3 className="text-xl font-bold text-white mb-6 pr-8">Choose Photo</h3>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => handleCameraOption("camera")}
                    className="w-full py-4 px-6 rounded-2xl flex items-center justify-between transition-transform active:scale-95"
                    style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(236,72,153,0.15) 100%)", border: "1px solid rgba(192,132,252,0.3)" }}
                  >
                    <span className="text-[15px] font-bold text-white">Take a Selfie 📸</span>
                  </button>

                  <button
                    onClick={() => handleCameraOption("gallery")}
                    className="w-full py-4 px-6 rounded-2xl flex items-center justify-between transition-transform active:scale-95"
                    style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(236,72,153,0.15) 100%)", border: "1px solid rgba(192,132,252,0.3)" }}
                  >
                    <span className="text-[15px] font-bold text-white">Upload from Gallery 🖼️</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DuoStep() {
  const duoPerson1 = useAppStore((s) => s.duoPerson1);
  const duoPerson2 = useAppStore((s) => s.duoPerson2);
  const duoRelationType = useAppStore((s) => s.duoRelationType);
  const updateDuoPerson1 = useAppStore((s) => s.updateDuoPerson1);
  const updateDuoPerson2 = useAppStore((s) => s.updateDuoPerson2);
  const setDuoRelationType = useAppStore((s) => s.setDuoRelationType);

  const scrollRef1 = useRef<HTMLDivElement>(null);
  const scrollRef2 = useRef<HTMLDivElement>(null);

  const handleZodiacSelect = (person: 1 | 2, id: string, index: number) => {
    hapticLight();
    const container = person === 1 ? scrollRef1.current : scrollRef2.current;
    
    if (person === 1) updateDuoPerson1({ zodiac: id });
    else updateDuoPerson2({ zodiac: id });

    if (container) {
      const itemWidth = 64 + 8; // w-16 (64px) + gap-2 (8px)
      const centerPos = (index * itemWidth) - (container.clientWidth / 2) + (itemWidth / 2) + 120; // 120px padding
      container.scrollTo({ left: centerPos, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-4">
      {/* Photos side by side */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-center text-xl font-semibold text-foreground mb-4">
          Upload Photos 📸
        </h2>
        <div className="flex items-center justify-center gap-6">
          <DuoPhotoUploader
            photoBase64={duoPerson1.photoBase64}
            onUpload={(b64) => updateDuoPerson1({ photoBase64: b64 })}
            onRemove={() => updateDuoPerson1({ photoBase64: null })}
            label="Person 1"
          />
          <div className="text-2xl text-accent/40 font-black select-none">&</div>
          <DuoPhotoUploader
            photoBase64={duoPerson2.photoBase64}
            onUpload={(b64) => updateDuoPerson2({ photoBase64: b64 })}
            onRemove={() => updateDuoPerson2({ photoBase64: null })}
            label="Person 2"
          />
        </div>
      </motion.div>

      {/* Person 1 — Zodiac */}
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-center text-sm font-semibold text-white/90 tracking-wide uppercase mb-2">
          Person 1 Zodiac
        </h3>
        <div
          className="relative w-full max-w-[340px] rounded-[2rem] p-2"
          style={{
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.01)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
            maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          }}
        >
          <div 
            ref={scrollRef1}
            className="flex overflow-x-auto gap-2 py-4 px-[120px] snap-x snap-mandatory scrollbar-hide items-center h-[120px]"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {ZODIAC_SIGNS.map((sign: ZodiacSign, index: number) => {
              const isSelected = duoPerson1.zodiac === sign.id;
              return (
                <button
                  key={sign.id}
                  onClick={() => handleZodiacSelect(1, sign.id, index)}
                  className={`snap-center shrink-0 flex flex-col items-center justify-center w-16 h-20 transition-all duration-500 relative cursor-pointer outline-none ${
                    isSelected ? "scale-110 opacity-100" : "scale-75 opacity-30 hover:opacity-60"
                  }`}
                >
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute inset-0 rounded-full blur-xl z-0"
                        style={{ background: `radial-gradient(circle, ${sign.gradient[0]}60 0%, transparent 70%)` }}
                      />
                    )}
                  </AnimatePresence>
                  <span 
                    className="relative z-10 text-[40px] font-light leading-none mb-3"
                    style={{ 
                      fontFamily: "Times New Roman, serif",
                      color: isSelected ? "white" : "inherit",
                      textShadow: isSelected ? `0 0 15px ${sign.gradient[0]}` : "none",
                    }}
                  >
                    {sign.emoji}{'\uFE0E'}
                  </span>
                  <span 
                    className="absolute bottom-2 z-10 text-[9px] font-medium tracking-[0.15em] uppercase transition-all duration-500"
                    style={{ 
                      color: isSelected ? "white" : "rgba(255, 255, 255, 0.3)",
                      textShadow: isSelected ? `0 0 10px ${sign.gradient[1]}` : "none",
                    }}
                  >
                    {sign.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Person 2 — Zodiac */}
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-center text-sm font-semibold text-white/90 tracking-wide uppercase mb-2">
          Person 2 Zodiac
        </h3>
        <div
          className="relative w-full max-w-[340px] rounded-[2rem] p-2"
          style={{
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.01)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
            maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          }}
        >
          <div 
            ref={scrollRef2}
            className="flex overflow-x-auto gap-2 py-4 px-[120px] snap-x snap-mandatory scrollbar-hide items-center h-[120px]"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {ZODIAC_SIGNS.map((sign: ZodiacSign, index: number) => {
              const isSelected = duoPerson2.zodiac === sign.id;
              return (
                <button
                  key={sign.id}
                  onClick={() => handleZodiacSelect(2, sign.id, index)}
                  className={`snap-center shrink-0 flex flex-col items-center justify-center w-16 h-20 transition-all duration-500 relative cursor-pointer outline-none ${
                    isSelected ? "scale-110 opacity-100" : "scale-75 opacity-30 hover:opacity-60"
                  }`}
                >
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute inset-0 rounded-full blur-xl z-0"
                        style={{ background: `radial-gradient(circle, ${sign.gradient[0]}60 0%, transparent 70%)` }}
                      />
                    )}
                  </AnimatePresence>
                  <span 
                    className="relative z-10 text-[40px] font-light leading-none mb-3"
                    style={{ 
                      fontFamily: "Times New Roman, serif",
                      color: isSelected ? "white" : "inherit",
                      textShadow: isSelected ? `0 0 15px ${sign.gradient[0]}` : "none",
                    }}
                  >
                    {sign.emoji}{'\uFE0E'}
                  </span>
                  <span 
                    className="absolute bottom-2 z-10 text-[9px] font-medium tracking-[0.15em] uppercase transition-all duration-500"
                    style={{ 
                      color: isSelected ? "white" : "rgba(255, 255, 255, 0.3)",
                      textShadow: isSelected ? `0 0 10px ${sign.gradient[1]}` : "none",
                    }}
                  >
                    {sign.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Relation type selector */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-center text-base font-semibold text-foreground mb-3">
          Relation Type 💫
        </h3>
        <div className="flex gap-2">
          {DUO_RELATION_OPTIONS.map((opt) => (
            <motion.button
              key={opt.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => { hapticLight(); setDuoRelationType(opt.id); }}
              className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-2xl transition-all duration-200 cursor-pointer border ${
                duoRelationType === opt.id
                  ? "bg-white/10 border-white/20 shadow-lg"
                  : "bg-white/5 border-white/5 hover:bg-white/8"
              }`}
              style={duoRelationType === opt.id ? { boxShadow: `0 0 20px ${opt.color}20` } : {}}
            >
              <span style={{ color: duoRelationType === opt.id ? opt.color : "#a1a1aa" }}>
                {opt.emoji}
              </span>
              <span className={`text-[11px] font-semibold ${duoRelationType === opt.id ? "text-white" : "text-text-secondary/60"}`}>
                {opt.label}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
