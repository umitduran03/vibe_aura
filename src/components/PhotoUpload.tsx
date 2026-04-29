"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, Loader2 } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { compressAndEncodeImage } from "@/lib/services";
import { hapticLight, hapticMedium } from "@/lib/haptics";

export default function PhotoUpload() {
  const photoUrl = useAppStore((s) => s.photoUrl);
  const isUploading = useAppStore((s) => s.isUploadingPhoto);
  const setPhotoUrl = useAppStore((s) => s.setPhotoUrl);
  const setIsUploading = useAppStore((s) => s.setIsUploadingPhoto);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    
    hapticLight();
    setIsUploading(true);

    try {
      const url = await compressAndEncodeImage(file);
      setPhotoUrl(url);
      hapticMedium();
    } catch (err) {
      console.error("Error uploading photo:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
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
      // Check if we're running on a native platform
      const { Capacitor } = await import("@capacitor/core");
      const platform = Capacitor.getPlatform();

      if (platform === "web") {
        // On web, skip Capacitor Camera entirely and use file input
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

        const url = await compressAndEncodeImage(file);
        setPhotoUrl(url);
        hapticMedium();
      }
    } catch (e: any) {
      console.warn("Capacitor Camera unavailable, falling back to file input.", e);
      triggerWebFallback(sourceType);
    } finally {
      setIsUploading(false);
    }
  };

  const removePhoto = () => {
    hapticLight();
    if (photoUrl && photoUrl.startsWith("blob:")) {
      URL.revokeObjectURL(photoUrl);
    }
    setPhotoUrl(null);
  };

  return (
    <div className="w-full">
      {/* Hidden file input — web fallback */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />

      <AnimatePresence mode="wait">
        {photoUrl ? (
          /* — Yüklenmiş fotoğraf önizleme — */
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="relative mx-auto h-28 w-28 rounded-2xl overflow-hidden glass"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoUrl}
              alt="Uploaded photo"
              className="h-full w-full object-cover"
            />
            <motion.button
              onClick={(e) => { e.stopPropagation(); removePhoto(); }}
              whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(236, 72, 153, 0.8)", borderColor: "rgba(236, 72, 153, 0.6)" }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full cursor-pointer z-10 transition-all duration-300 group"
              style={{
                background: "rgba(10, 10, 15, 0.6)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                boxShadow: "0 0 8px rgba(236, 72, 153, 0.4)", // Default soft neon glow
              }}
            >
              {/* İç Hover Glow */}
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                   style={{ background: "radial-gradient(circle, rgba(236,72,153,0.5) 0%, transparent 70%)" }} />
              <X className="h-4 w-4 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] relative z-20 transition-transform group-hover:rotate-90 duration-300" strokeWidth={2.5} />
            </motion.button>
          </motion.div>
        ) : (
          /* — Upload butonu — */
          <motion.label
            key="upload"
            htmlFor="photo-upload"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileTap={{ scale: 0.96 }}
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
              hapticLight();
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`
              mx-auto flex h-28 w-28 cursor-pointer flex-col items-center justify-center
              rounded-2xl transition-all duration-300
              ${dragOver ? "glass-strong border-accent/40" : "glass"}
              ${isUploading ? "pointer-events-none" : ""}
            `}
          >
            {isUploading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="h-6 w-6 text-accent" />
              </motion.div>
            ) : (
              <>
                <Camera className="h-6 w-6 text-text-secondary/60 mb-1" />
                <span className="text-[10px] text-text-secondary/40 font-medium">
                  Photo
                </span>
              </>
            )}
            {isUploading && (
              <span className="mt-1 text-[10px] text-accent font-medium">
                Analyzing vibe...
              </span>
            )}
          </motion.label>
        )}
      </AnimatePresence>

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
