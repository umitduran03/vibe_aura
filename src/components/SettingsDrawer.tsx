"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  X,
  FileText,
  Shield,
  Crown,
  Coins,
  ExternalLink,
  Sparkles,
  LogOut,
  Pencil,
  BookOpen,
  Download,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { useStreakStore } from "@/store/useStreakStore";
import { hapticLight, hapticMedium } from "@/lib/haptics";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ZODIAC_SIGNS } from "@/lib/constants";
import { logOut } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { ZodiacIcon } from "@/components/ZodiacIcon";
import { getVibeRank } from "@/lib/streak-utils";
import { useT } from "@/hooks/useT";

export default function SettingsDrawer() {
  const isOpen = useAppStore((s) => s.isSettingsOpen);
  const setIsOpen = useAppStore((s) => s.setSettingsOpen);
  const tokenBalance = useAppStore((s) => s.tokenBalance);
  const vipExpiry = useAppStore((s) => s.vipExpiry);
  const setScreen = useAppStore((s) => s.setScreen);
  const resetWizard = useAppStore((s) => s.resetWizard);

  const deferredPrompt = useAppStore((s) => s.deferredPrompt);
  const isInstallable = useAppStore((s) => s.isInstallable);
  const setIsInstallable = useAppStore((s) => s.setIsInstallable);

  const streakCount = useStreakStore((s) => s.streakCount);
  const currentRank = getVibeRank(streakCount);
  const t = useT();
  const locale = useAppStore((s) => s.locale);
  const setLocale = useAppStore((s) => s.setLocale);

  const handleLocaleChange = (newLocale: "en" | "tr") => {
    hapticLight();
    setLocale(newLocale);
    if (typeof window !== "undefined") {
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
      const currentPath = window.location.pathname;
      const newPath = currentPath.replace(/^\/(en|tr)/, `/${newLocale}`);
      window.location.href = newPath;
    }
  };

  const isVipActive = vipExpiry ? new Date(vipExpiry) > new Date() : false;

  const [userZodiac, setUserZodiac] = useState<string | null>(null);
  const [isEditingZodiac, setIsEditingZodiac] = useState(false);

  // Profil Verileri
  const user = auth.currentUser;
  const displayName = user?.displayName || "Vibe Seeker";
  const photoURL = user?.photoURL;
  const initial = displayName.charAt(0).toUpperCase();

  useEffect(() => {
    if (isOpen && user?.uid) {
      getDoc(doc(db, "users", user.uid)).then(snap => {
        if (snap.exists()) {
          setUserZodiac(snap.data().zodiacSign || null);
        }
      });
    }
  }, [isOpen, user?.uid]);

  const handleZodiacSelect = async (zId: string) => {
    hapticLight();
    setUserZodiac(zId);
    setIsEditingZodiac(false);
    if (user?.uid) {
      await updateDoc(doc(db, "users", user.uid), {
        zodiacSign: zId,
        // Tüm locale-specific vibe cache'ini temizle — yeni burca göre yeniden çekilsin
        daily_vibe_text: null,
        last_vibe_date: null,
        daily_vibe_text_tr: null,
        last_vibe_date_tr: null,
        daily_vibe_text_en: null,
        last_vibe_date_en: null,
      });
      // Sayfayı yenileyerek Daily Vibe'ın yeni burca göre gelmesini sağla
      window.location.reload();
    }
  };

  const open = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    hapticLight();
    setIsOpen(true);
  };

  const close = () => {
    hapticLight();
    setIsOpen(false);
  };

  const handleLogout = async () => {
    hapticMedium();
    await logOut();
    resetWizard();
    useAppStore.getState().setHasAcceptedTerms(null);
    setScreen("onboarding");
    close();
  };

  const handleInstallClick = async () => {
    hapticMedium();
    if (!deferredPrompt) {
      alert("Bu cihazda otomatik yükleme desteklenmiyor veya uygulama zaten yüklü! 📱\n\nTarayıcınızın 'Paylaş' veya 'Seçenekler (⋮)' menüsünden 'Ana Ekrana Ekle' (Add to Home Screen) seçeneğine dokunarak yükleyebilirsiniz.");
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstallable(false);
    }
  };

  return (
    <>
      {/* ─── Trigger Button ─── */}
      <button
        onClick={open}
        className="group p-1.5 sm:p-2.5 rounded-xl transition-all duration-200 hover:bg-white/10 active:scale-90 cursor-pointer"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
        aria-label="Settings"
      >
        <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-white/60 transition-colors group-hover:text-white" />
      </button>

      {/* ─── Drawer ─── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
            />

            {/* Panel */}
            <motion.div
              className="fixed inset-y-0 right-0 z-[81] w-full max-w-[340px] flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              style={{
                background: "linear-gradient(180deg, rgba(18,12,30,0.98) 0%, rgba(8,6,15,0.99) 100%)",
                borderLeft: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "-20px 0 60px rgba(0,0,0,0.5)",
              }}
            >
              {/* ─── Header ─── */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4">
                <h2 className="text-lg font-bold text-white tracking-tight">{t.settings}</h2>
                <button
                  onClick={close}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close Settings"
                >
                  <X className="h-4 w-4 text-white/60" />
                </button>
              </div>

              {/* ─── Account Card ─── */}
              <div className="mx-5 mb-5">
                <div
                  className="p-4 rounded-2xl relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(236,72,153,0.08) 100%)",
                    border: "1px solid rgba(139,92,246,0.15)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-3 relative z-10">
                    {/* Profil Fotoğrafı / Baş Harf Avatar */}
                    {photoURL ? (
                      <div className="w-11 h-11 rounded-full overflow-hidden border border-white/20 shrink-0 shadow-lg">
                        <img
                          src={photoURL}
                          alt={displayName}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ) : (
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 border border-white/20 shadow-lg"
                        style={{
                          background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                        }}
                      >
                        <span className="text-white font-bold text-lg">{initial}</span>
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0 flex items-start justify-between">
                      <div>
                        <p className="text-[15px] font-semibold text-white truncate">
                          {displayName}
                        </p>
                        <p className="text-xs text-white/50 truncate flex items-center gap-1 mt-0.5">
                          {isVipActive ? (
                            <>
                              <Sparkles className="h-3 w-3 text-purple-400" />
                              <span className="text-purple-300">{t.settingsVipMember}</span>
                            </>
                          ) : (
                            t.settingsFreeAccount
                          )}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-1.5 ml-2">
                        {userZodiac ? (
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                            <ZodiacIcon id={userZodiac} className="w-4 h-4 text-cyan-400 drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]" />
                            <span className="text-[10px] font-bold text-cyan-50 uppercase tracking-widest">
                              {(() => {
                                const z = ZODIAC_SIGNS.find(z => z.id === userZodiac);
                                return z ? (locale === "tr" ? (z.nameTr || z.name) : z.name) : "";
                              })()}
                            </span>
                          </div>
                        ) : (
                          <div className="text-[10px] font-medium text-white/40 uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                            {t.settingsNoSign}
                          </div>
                        )}
                        <button
                          onClick={() => setIsEditingZodiac(!isEditingZodiac)}
                          className={`p-1.5 rounded-full transition-colors ${
                            isEditingZodiac 
                            ? "bg-cyan-500/20 shadow-[0_0_8px_rgba(6,182,212,0.4)]" 
                            : "bg-white/5 hover:bg-white/10"
                          }`}
                          aria-label="Edit Zodiac"
                        >
                          <Pencil className={`w-3.5 h-3.5 ${
                            isEditingZodiac 
                            ? "text-cyan-400 drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]" 
                            : "text-white/60 hover:text-cyan-300"
                          }`} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isEditingZodiac && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-2 pb-1 border-t border-white/10 relative z-10 grid grid-cols-4 gap-1.5">
                          {ZODIAC_SIGNS.map(z => {
                            const isSelected = userZodiac === z.id;
                            return (
                              <button
                                key={z.id}
                                onClick={() => handleZodiacSelect(z.id)}
                                className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 ${
                                  isSelected 
                                  ? "bg-cyan-950/40 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]" 
                                  : "bg-white/5 hover:bg-white/10 border border-transparent"
                                }`}
                              >
                                <ZodiacIcon 
                                  id={z.id} 
                                  className={`w-7 h-7 mb-2 transition-all duration-300 ${
                                    isSelected 
                                    ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" 
                                    : "text-white/40"
                                  }`} 
                                />
                                <span className={`text-[9px] font-bold tracking-wider uppercase ${
                                  isSelected ? "text-cyan-100" : "text-white/50"
                                }`}>
                                  {locale === "tr" ? (z.nameTr || z.name) : z.name}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center gap-2 relative z-10 pt-3 justify-between">
                    <div className="px-2.5 py-1 rounded-md bg-black/20 flex items-center gap-2 border border-white/5">
                      <Coins className="h-3.5 w-3.5 text-yellow-400" />
                      <span className="text-[13px] font-medium text-white/90">
                        {tokenBalance} {t.settingsTokens} {t.settingsTokensRemaining}
                      </span>
                    </div>

                    <div className={`px-2.5 py-1 rounded-md flex items-center gap-2 bg-gradient-to-r ${currentRank.gradient} border border-white/10 shadow-lg`}>
                      {currentRank.icon}
                      <span className="text-[12px] font-bold text-white tracking-wide">
                        {locale === "tr" ? (currentRank.nameTr || currentRank.name) : currentRank.name}
                      </span>
                    </div>
                  </div>

                  {/* Dekoratif arka plan yansıması */}
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-pink-500/20 blur-2xl rounded-full pointer-events-none" />
                </div>
              </div>

              {/* ─── Menu Items ─── */}
              <div className="flex-1 overflow-y-auto px-5">

                {/* ─── Language Selector ─── */}
                <p className="text-[11px] font-semibold tracking-widest uppercase text-white/30 mb-3 px-1">
                  {t.langSelectorTitle}
                </p>
                <div className="flex gap-2 mb-6">
                  {(["en", "tr"] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLocaleChange(lang)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                        locale === lang
                          ? "text-white shadow-lg"
                          : "text-white/50 bg-white/5 hover:bg-white/10"
                      }`}
                      style={locale === lang ? {
                        background: "linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(236,72,153,0.3) 100%)",
                        border: "1px solid rgba(139,92,246,0.4)",
                      } : {
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      {lang === "en" ? `🇬🇧 ${t.langEn}` : `🇹🇷 ${t.langTr}`}
                    </button>
                  ))}
                </div>

                <p className="text-[11px] font-semibold tracking-widest uppercase text-white/30 mb-3 px-1">
                  {t.settingsResources}
                </p>
                <div className="space-y-1.5 mb-6">
                  {/* ─── Trends & Articles ─── */}
                  <Link
                    href="/trends"
                    prefetch={true}
                    className="flex items-center gap-3 p-3.5 rounded-xl transition-all duration-200 hover:bg-white/5 group cursor-pointer"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "rgba(244,114,182,0.12)" }}
                    >
                      <Sparkles className="h-4 w-4 text-pink-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                        {t.settingsTrends}
                      </p>
                      <p className="text-[11px] text-white/35">{t.settingsTrendsSub}</p>
                    </div>
                  </Link>

                  {/* ─── Gen-Z Dictionary ─── */}
                  <Link
                    href="/vibe-dictionary"
                    prefetch={true}
                    className="flex items-center gap-3 p-3.5 rounded-xl transition-all duration-200 hover:bg-white/5 group cursor-pointer"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "rgba(168,85,247,0.12)" }}
                    >
                      <BookOpen className="h-4 w-4 text-purple-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                        {t.settingsDict}
                      </p>
                      <p className="text-[11px] text-white/35">{t.settingsDictSub}</p>
                    </div>
                  </Link>

                  {/* ─── FAQ ─── */}
                  <Link
                    href="/faq"
                    prefetch={true}
                    className="flex items-center gap-3 p-3.5 rounded-xl transition-all duration-200 hover:bg-white/5 group cursor-pointer"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "rgba(59,130,246,0.12)" }}
                    >
                      <FileText className="h-4 w-4 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                        {t.settingsFaq}
                      </p>
                      <p className="text-[11px] text-white/35">{t.settingsFaqSub}</p>
                    </div>
                  </Link>
                </div>

                <p className="text-[11px] font-semibold tracking-widest uppercase text-white/30 mb-3 px-1">
                  {t.settingsLegal}
                </p>
                <div className="space-y-1.5 mb-6">
                  <Link
                    href="/terms"
                    prefetch={false}
                    className="flex items-center gap-3 p-3.5 rounded-xl transition-all duration-200 hover:bg-white/5 group cursor-pointer"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "rgba(139,92,246,0.12)" }}
                    >
                      <FileText className="h-4 w-4 text-purple-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                        {t.settingsTerms}
                      </p>
                      <p className="text-[11px] text-white/35">{t.settingsTermsSub}</p>
                    </div>
                  </Link>

                  <Link
                    href="/privacy"
                    prefetch={false}
                    className="flex items-center gap-3 p-3.5 rounded-xl transition-all duration-200 hover:bg-white/5 group cursor-pointer"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "rgba(6,182,212,0.12)" }}
                    >
                      <Shield className="h-4 w-4 text-cyan-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                        {t.settingsPrivacy}
                      </p>
                      <p className="text-[11px] text-white/35">{t.settingsPrivacySub}</p>
                    </div>
                  </Link>
                </div>

                <p className="text-[11px] font-semibold tracking-widest uppercase text-white/30 mb-3 px-1">
                  {t.settingsApp}
                </p>
                <div className="space-y-1.5 mb-8">
                  <motion.button
                    onClick={handleInstallClick}
                    className="w-full relative flex items-center gap-3 p-3.5 rounded-xl transition-all duration-300 cursor-pointer text-left overflow-hidden group shadow-[0_0_20px_rgba(236,72,153,0.2)] hover:shadow-[0_0_30px_rgba(236,72,153,0.4)]"
                    style={{
                      background: "linear-gradient(135deg, rgba(139,92,246,0.25) 0%, rgba(236,72,153,0.25) 100%)",
                      border: "1px solid rgba(236,72,153,0.4)",
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Işık Yansıması (Shimmer Effect) */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
                      }}
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    />
                    
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 shadow-inner"
                      style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)" }}
                    >
                      <Download className="h-4 w-4 text-white drop-shadow-md animate-bounce" style={{ animationDuration: '2s' }} />
                    </div>
                    <div className="flex-1 min-w-0 relative z-10">
                      <p className="text-sm font-bold text-white drop-shadow-md tracking-wide">{t.settingsInstall}</p>
                      <p className="text-[11px] text-pink-200 font-medium tracking-wider uppercase mt-0.5">{t.settingsAddHome}</p>
                    </div>
                  </motion.button>

                  <div
                    className="flex items-center gap-3 p-3.5 rounded-xl"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "rgba(236,72,153,0.12)" }}
                    >
                      <Crown className="h-4 w-4 text-pink-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white/80">{t.settingsVersion}</p>
                      <p className="text-[11px] text-white/35">1.0.0 (beta)</p>
                    </div>
                  </div>
                </div>

                {/* ─── Log Out Button ─── */}
                <motion.button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 p-3.5 rounded-xl text-sm font-medium text-red-400/90 transition-all duration-300 cursor-pointer group"
                  style={{
                    background: "rgba(239, 68, 68, 0.05)",
                    border: "1px solid rgba(239, 68, 68, 0.1)",
                  }}
                  whileHover={{
                    background: "rgba(239, 68, 68, 0.1)",
                    border: "1px solid rgba(239, 68, 68, 0.2)",
                    boxShadow: "0 0 20px rgba(239, 68, 68, 0.15), 0 0 40px rgba(139, 92, 246, 0.1)",
                    color: "rgba(248, 113, 113, 1)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LogOut className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  {t.settingsLogout}
                </motion.button>

              </div>

              {/* ─── Footer ─── */}
              <div className="px-5 py-5 border-t border-white/5 mt-auto">
                <p className="text-[11px] text-center text-white/20 leading-relaxed">
                  {t.settingsMadeWith}
                  <br />
                  {t.settingsCopyright.replace("{year}", new Date().getFullYear().toString())}
                </p>
                <p className="text-[9px] text-center text-white/15 mt-2 tracking-wide">
                  {t.settingsForEntertainment}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
