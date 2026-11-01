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
  Trash2,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { useStreakStore } from "@/store/useStreakStore";
import { hapticLight, hapticMedium } from "@/lib/haptics";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ZODIAC_SIGNS } from "@/lib/constants";
import { logOut, deleteAccount, linkGuestAccount, type LinkProvider } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { ZodiacIcon } from "@/components/ZodiacIcon";
import { getVibeRank } from "@/lib/streak-utils";
import { useT } from "@/hooks/useT";
import { ShareEarnBanner } from "@/components/ShareEarnBanner";

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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showGuestLogoutConfirm, setShowGuestLogoutConfirm] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isLinking, setIsLinking] = useState(false);
  const [linkFeedback, setLinkFeedback] = useState<{ text: string; type: "success" | "info" | "error" } | null>(null);
  const [isNativeIOS, setIsNativeIOS] = useState(false);

  const isGuest = useAppStore((s) => s.isGuest);
  const storeDisplayName = useAppStore((s) => s.displayName);
  const storePhotoUrl = useAppStore((s) => s.profilePhotoUrl);

  useEffect(() => {
    import("@capacitor/core").then(({ Capacitor }) => {
      if (Capacitor.isNativePlatform() && Capacitor.getPlatform() === "ios") {
        setIsNativeIOS(true);
      }
    }).catch(() => {});
  }, []);

  // Profil Verileri
  const user = auth.currentUser;
  const displayName = storeDisplayName || user?.displayName || "Vibe Seeker";
  const photoURL = storePhotoUrl || user?.photoURL;
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
    setShowGuestLogoutConfirm(false);
    await logOut();
    resetWizard();
    useAppStore.getState().setHasAcceptedTerms(null);
    setScreen("onboarding");
    close();
  };

  const handleLinkAccount = async (provider: LinkProvider) => {
    if (isLinking) return;
    hapticMedium();
    setIsLinking(true);
    setLinkFeedback(null);
    try {
      const result = await linkGuestAccount(provider);
      setShowGuestLogoutConfirm(false);
      if (result.status === "linked") {
        useAppStore.getState().setIsGuest(false);
        if (auth.currentUser?.displayName) {
          useAppStore.getState().setDisplayName(auth.currentUser.displayName);
        }
        if (auth.currentUser?.photoURL) {
          useAppStore.getState().setProfilePhotoUrl(auth.currentUser.photoURL);
        }
        setLinkFeedback({
          text: result.awarded > 0 ? t.settingsLinkRewardSuccess : t.settingsLinkSuccessNoBonus,
          type: "success",
        });
      } else if (result.status === "switched") {
        useAppStore.getState().setIsGuest(false);
        if (auth.currentUser?.displayName) {
          useAppStore.getState().setDisplayName(auth.currentUser.displayName);
        }
        if (auth.currentUser?.photoURL) {
          useAppStore.getState().setProfilePhotoUrl(auth.currentUser.photoURL);
        }
        setLinkFeedback({
          text: t.settingsLinkSwitchedNotice,
          type: "info",
        });
      }
    } catch (err: any) {
      console.error("[SettingsDrawer] Link account failed:", err);
      if (err?.code !== "auth/popup-closed-by-user" && err?.code !== "auth/cancelled-popup-request") {
        setLinkFeedback({
          text: t.onboardingGenericError,
          type: "error",
        });
      }
    } finally {
      setIsLinking(false);
    }
  };

  const handleDeleteAccount = async () => {
    hapticMedium();
    setIsDeletingAccount(true);
    setDeleteError(null);
    try {
      await deleteAccount();
      resetWizard();
      useAppStore.getState().setHasAcceptedTerms(null);
      setScreen("onboarding");
      close();
    } catch (err: any) {
      console.error("[SettingsDrawer] Delete account error:", err);
      setDeleteError(t.settingsDeleteAccountError);
    } finally {
      setIsDeletingAccount(false);
      setShowDeleteConfirm(false);
    }
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
                          ) : isGuest ? (
                            <span className="text-amber-300/90 font-medium">{t.settingsGuestAccount}</span>
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

                {/* ─── Misafir Hesabı Google Bağlama Kartı (+5 Jeton) ─── */}
                {linkFeedback && (
                  <div
                    className={`mb-4 p-3.5 rounded-2xl border text-xs font-medium leading-relaxed ${
                      linkFeedback.type === "success"
                        ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-200"
                        : linkFeedback.type === "info"
                        ? "bg-purple-500/15 border-purple-500/30 text-purple-200"
                        : "bg-red-500/15 border-red-500/30 text-red-300"
                    }`}
                  >
                    {linkFeedback.text}
                  </div>
                )}

                {isGuest && (
                  <div
                    className="mb-5 p-4 rounded-2xl relative overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, rgba(139,92,246,0.22) 0%, rgba(236,72,153,0.18) 100%)",
                      border: "1px solid rgba(236,72,153,0.35)",
                      boxShadow: "0 10px 30px rgba(139,92,246,0.2)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="text-sm font-bold text-white flex items-center gap-1.5">
                          <Sparkles className="h-4 w-4 text-pink-400 shrink-0" />
                          {t.settingsLinkGoogleTitle}
                        </p>
                        <p className="text-[11px] text-white/70 mt-0.5 leading-snug">
                          {t.settingsLinkGoogleSub}
                        </p>
                      </div>
                      <span className="shrink-0 px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/40">
                        {t.settingsLinkGoogleBadge}
                      </span>
                    </div>

                    <button
                      onClick={() => handleLinkAccount("google")}
                      disabled={isLinking}
                      className="w-full mt-2 py-2.5 px-3 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95 disabled:opacity-60"
                      style={{
                        background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                        boxShadow: "0 0 16px rgba(139,92,246,0.45)",
                      }}
                    >
                      {isLinking ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {t.onboardingConnecting}
                        </>
                      ) : (
                        <>
                          <svg className="h-4 w-4 bg-white rounded-full p-[1.5px] shrink-0" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                          </svg>
                          {t.settingsLinkGoogleBtn}
                        </>
                      )}
                    </button>

                    {isNativeIOS && (
                      <button
                        onClick={() => handleLinkAccount("apple")}
                        disabled={isLinking}
                        className="w-full mt-2 py-2.5 px-3 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 cursor-pointer bg-white/10 border border-white/15 active:scale-95 disabled:opacity-60"
                      >
                        <svg className="h-4 w-4 fill-white shrink-0" viewBox="0 0 24 24">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.1 2.48-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91 1.65.17 2.47.81 3.01 1.59-4.32 1.51-3.61 7.33.68 9.07zM13 3.5c.73-.89 1.22-2.13 1.08-3.38-1.08.04-2.39.71-3.16 1.61-.69.79-1.3 2.05-1.14 3.26 1.2.1 2.43-.59 3.22-1.5z"/>
                        </svg>
                        {t.settingsLinkAppleBtn}
                      </button>
                    )}
                  </div>
                )}

                {/* ─── Share & Earn Banner ─── */}
                <ShareEarnBanner />

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
                    href={`/${locale}/trends`}
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
                    href={`/${locale}/vibe-dictionary`}
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
                    href={`/${locale}/faq`}
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
                    href={`/${locale}/terms`}
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
                    href={`/${locale}/privacy`}
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
                  onClick={() => {
                    if (isGuest) {
                      hapticMedium();
                      setShowGuestLogoutConfirm(true);
                    } else {
                      handleLogout();
                    }
                  }}
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

                {/* ─── Delete Account Button ─── */}
                <motion.button
                  onClick={() => { hapticMedium(); setShowDeleteConfirm(true); setDeleteError(null); }}
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-medium text-white/25 hover:text-red-400/60 transition-all duration-300 cursor-pointer mt-1"
                  whileTap={{ scale: 0.98 }}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  {t.settingsDeleteAccount}
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

      {/* ─── Guest Logout Warning Modal ─── */}
      <AnimatePresence>
        {showGuestLogoutConfirm && (
          <>
            <motion.div
              className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isLinking && setShowGuestLogoutConfirm(false)}
            />
            <motion.div
              className="fixed inset-0 z-[91] flex items-center justify-center px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-full max-w-[320px] rounded-2xl p-6"
                style={{
                  background: "linear-gradient(170deg, rgba(25,16,40,0.98) 0%, rgba(12,8,20,0.99) 100%)",
                  border: "1px solid rgba(139,92,246,0.3)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                }}
                initial={{ scale: 0.85, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.85, y: 20 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/25 mx-auto mb-4">
                  <AlertTriangle className="h-6 w-6 text-amber-400" />
                </div>
                <h3 className="text-center text-[16px] font-bold text-white mb-2">
                  {t.settingsGuestLogoutConfirmTitle}
                </h3>
                <p className="text-center text-[12px] text-white/60 leading-relaxed mb-5">
                  {t.settingsGuestLogoutConfirmDesc}
                </p>

                <motion.button
                  onClick={() => handleLinkAccount("google")}
                  disabled={isLinking}
                  className="w-full py-3 rounded-xl text-[13px] font-bold text-white mb-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  style={{
                    background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                    boxShadow: "0 0 20px rgba(139,92,246,0.35)",
                  }}
                  whileTap={!isLinking ? { scale: 0.97 } : {}}
                >
                  {isLinking ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t.onboardingConnecting}
                    </>
                  ) : (
                    t.settingsLinkGoogleBtn
                  )}
                </motion.button>

                <motion.button
                  onClick={handleLogout}
                  disabled={isLinking}
                  className="w-full py-2.5 rounded-xl text-[13px] font-semibold text-red-400/90 hover:text-red-300 bg-red-500/10 border border-red-500/20 mb-1 cursor-pointer disabled:opacity-40"
                  whileTap={{ scale: 0.97 }}
                >
                  {t.settingsGuestLogoutConfirmBtn}
                </motion.button>

                <motion.button
                  onClick={() => setShowGuestLogoutConfirm(false)}
                  disabled={isLinking}
                  className="w-full py-2.5 rounded-xl text-[12px] font-medium text-white/40 hover:text-white/70 transition-colors cursor-pointer disabled:opacity-40"
                  whileTap={{ scale: 0.97 }}
                >
                  {t.settingsDeleteAccountCancel}
                </motion.button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ─── Delete Account Confirmation Modal ─── */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <>
            <motion.div
              className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isDeletingAccount && setShowDeleteConfirm(false)}
            />
            <motion.div
              className="fixed inset-0 z-[91] flex items-center justify-center px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-full max-w-[320px] rounded-2xl p-6"
                style={{
                  background: "linear-gradient(170deg, rgba(35,10,10,0.97) 0%, rgba(15,5,5,0.99) 100%)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                }}
                initial={{ scale: 0.85, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.85, y: 20 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 mx-auto mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                </div>
                <h3 className="text-center text-[16px] font-bold text-white mb-2">
                  {t.settingsDeleteAccountConfirmTitle}
                </h3>
                <p className="text-center text-[12px] text-white/50 leading-relaxed mb-6">
                  {t.settingsDeleteAccountConfirmDesc}
                </p>

                {deleteError && (
                  <p className="text-center text-[12px] text-red-400 mb-4">{deleteError}</p>
                )}

                <motion.button
                  onClick={handleDeleteAccount}
                  disabled={isDeletingAccount}
                  className="w-full py-3 rounded-xl text-[14px] font-bold text-white mb-2 disabled:opacity-60 cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, #dc2626, #b91c1c)",
                    boxShadow: "0 0 20px rgba(220,38,38,0.3)",
                  }}
                  whileTap={!isDeletingAccount ? { scale: 0.97 } : {}}
                >
                  {isDeletingAccount ? t.settingsDeleteAccountDeleting : t.settingsDeleteAccountConfirm}
                </motion.button>

                <motion.button
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isDeletingAccount}
                  className="w-full py-3 rounded-xl text-[13px] font-medium text-white/40 hover:text-white/70 transition-colors cursor-pointer disabled:opacity-40"
                  whileTap={{ scale: 0.97 }}
                >
                  {t.settingsDeleteAccountCancel}
                </motion.button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
