"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Sparkles, Star, AlertTriangle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import SeoFooter from "@/components/SeoFooter";
import FeatureSeoContent from "@/components/FeatureSeoContent";
import InArticleAd from "@/components/InArticleAd";

const platforms = [
  { name: "Tinder", emoji: "🔥" },
  { name: "Bumble", emoji: "🐝" },
  { name: "Hinge", emoji: "📎" },
  { name: "Instagram", emoji: "📸" },
  { name: "X", emoji: "🐦" },
  { name: "BeReal", emoji: "📱" },
];

const modes = [
  {
    icon: "🔬",
    titleEn: "Self Audit",
    titleTr: "Kendi Otopsini Yap",
    descEn: "Run your own profile through the AI operating table. Find out why you're getting left on seen.",
    descTr: "Kendi profilini yapay zeka ameliyat masasına yatır. Neden ignored olduğunu öğren.",
  },
  {
    icon: "🕵️",
    titleEn: "Detective Mode",
    titleTr: "Dedektif Modu",
    descEn: "Read someone else's profile. Decode their vibe before you even match.",
    descTr: "Başkasının profilini oku. Match etmeden önce vibe'ını çöz.",
  },
];

const featureCards = [
  {
    icon: <Star className="w-7 h-7" />,
    titleEn: "Overall Score",
    titleTr: "Genel Puan",
    descEn: "A realistic 0-100 score. No cap.",
    descTr: "Gerçekçi bir 0-100 puanı. Hiç abartısız.",
    color: "violet",
  },
  {
    icon: <CheckCircle className="w-7 h-7" />,
    titleEn: "Green Flags",
    titleTr: "Green Flag'ler",
    descEn: "What's actually working on your profile",
    descTr: "Profilinde gerçekten işe yarayan şeyler",
    color: "emerald",
  },
  {
    icon: <AlertTriangle className="w-7 h-7" />,
    titleEn: "Red Flags & Fixes",
    titleTr: "Red Flag'ler & Düzeltmeler",
    descEn: "What's killing your engagement + how to fix it",
    descTr: "Etkileşimini öldüren şeyler + nasıl düzelteceğin",
    color: "rose",
  },
];

export default function ProfileAutopsyLanding() {
  const params = useParams();
  const lang = (params?.lang as string) ?? "en";
  const isTr = lang === "tr";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Profile Autopsy AI",
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Any",
    description: isTr
      ? "Instagram, Tinder, Bumble, Hinge, X ve BeReal profilinizi yapay zeka ile analiz edin. 0-100 puan, green flag'ler ve red flag düzeltmeleri."
      : "Let AI dissect your Instagram, Tinder, Bumble, Hinge, X, and BeReal profiles. Get a brutal 0-100 score, green flags, red flags, and exactly how to fix them.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <div className="min-h-dvh bg-[#050510] text-white selection:bg-violet-500/30 overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[55%] h-[55%] rounded-full bg-violet-900/25 blur-[160px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[150px]" />
        <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] rounded-full bg-purple-900/15 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-20">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-16"
        >
          <Link
            href="/"
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-violet-500/30 transition-all cursor-pointer"
            aria-label="Go back home"
          >
            <ArrowLeft className="w-5 h-5 text-white/70" />
          </Link>
          <span className="text-sm font-medium tracking-widest text-violet-400 uppercase drop-shadow-[0_0_5px_rgba(124,58,237,0.5)]">
            {isTr ? "PROFİL OTOPSİSİ" : "PROFILE AUTOPSY"}
          </span>
        </motion.div>

        {/* Platform Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {platforms.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-semibold text-white/80 hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-300 transition-all duration-200 cursor-default"
            >
              <span>{p.emoji}</span>
              <span>{p.name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="flex-1 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(124,58,237,0.2)]">
              <Sparkles className="w-4 h-4" />
              <span>{isTr ? "Yapay Zeka Profil Analizi" : "AI Profile Analysis"}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400">
              {isTr ? "Profil Otopsisi" : "Profile Autopsy"}
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
              {isTr
                ? "Profilinde tam olarak neyin yanlış (ve doğru) olduğunu söyleyen yapay zeka"
                : "The AI that tells you EXACTLY what's wrong (and right) about your profile"}
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${lang}?feature=profile-autopsy`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold tracking-wide hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
              >
                <Sparkles className="w-5 h-5 animate-pulse" />
                {isTr ? "Profilimi Otopsiye Al" : "Get My Profile Autopsied"}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            className="flex-1 w-full max-w-sm relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/30 to-indigo-500/30 blur-3xl rounded-full" />
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-violet-500/20 shadow-[0_0_40px_rgba(124,58,237,0.2)] flex items-center justify-center bg-black/40">
              <div className="text-center p-6 space-y-5 w-full">
                <motion.div
                  animate={{ scale: [1, 1.15, 1], rotate: [0, -3, 3, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-5xl mx-auto w-fit"
                >
                  🔬
                </motion.div>
                <h3 className="text-lg font-black text-violet-300">
                  {isTr ? "Profil Otopsisi" : "Profile Autopsy"}
                </h3>
                {/* Mock score bar */}
                <div className="space-y-3 text-left px-2">
                  {[
                    { label: isTr ? "Genel Puan" : "Overall Score", val: 74, color: "bg-violet-500" },
                    { label: isTr ? "İlk İzlenim" : "First Impression", val: 88, color: "bg-indigo-500" },
                    { label: isTr ? "Biyografi Gücü" : "Bio Strength", val: 52, color: "bg-purple-500" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs text-white/60 mb-1">
                        <span>{item.label}</span>
                        <span className="text-white/80 font-bold">{item.val}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.val}%` }}
                          transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                          className={`h-full rounded-full ${item.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-white/50 italic">
                  {isTr
                    ? `"Hinge bio'n NPC enerjisi veriyor. Hemen değiştir."`
                    : `"Your Hinge bio is giving NPC energy. Fix it ASAP."`}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <InArticleAd />

        {/* Mode Cards */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-black text-white mb-6 text-center tracking-tight"
          >
            {isTr ? "Modu Seç" : "Pick Your Mode"}
          </motion.h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {modes.map((mode, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/40 hover:bg-violet-500/5 transition-all duration-300 group cursor-default"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
                  {mode.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                  {isTr ? mode.titleTr : mode.titleEn}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {isTr ? mode.descTr : mode.descEn}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Feature Cards – What AI checks */}
        <div className="mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-black text-white mb-6 text-center tracking-tight"
          >
            {isTr ? "Yapay Zeka Ne Analiz Eder?" : "What Does the AI Check?"}
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featureCards.map((feat, i) => {
              const colorMap: Record<string, string> = {
                violet: "text-violet-400 border-violet-500/40 group-hover:border-violet-500/60",
                emerald: "text-emerald-400 border-emerald-500/40 group-hover:border-emerald-500/60",
                rose: "text-rose-400 border-rose-500/40 group-hover:border-rose-500/60",
              };
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  key={i}
                  className={`p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all duration-300 group ${colorMap[feat.color]}`}
                >
                  <div className={`mb-4 group-hover:scale-110 transition-transform ${colorMap[feat.color].split(" ")[0]}`}>
                    {feat.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-inherit transition-colors">
                    {isTr ? feat.titleTr : feat.titleEn}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {isTr ? feat.descTr : feat.descEn}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <FeatureSeoContent featureId="profile-autopsy" isTr={isTr} />

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center p-10 rounded-3xl bg-gradient-to-br from-violet-950/60 to-black border border-violet-900/50 shadow-[0_0_50px_rgba(124,58,237,0.15)]"
        >
          <Sparkles className="w-10 h-10 text-violet-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
            {isTr ? "Profilini Otopsiye Hazır Mısın?" : "Ready to put your profile on the table?"}
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto text-lg">
            {isTr
              ? "%100 Ücretsiz. Egon biraz zarar görebilir. Ama en azından artık biliyorsun."
              : "100% Free. Your ego might take a hit. But at least you'll finally know."}
          </p>
          <Link
            href={`/${lang}?feature=profile-autopsy`}
            className="inline-block px-10 py-4 rounded-full bg-white text-black font-bold tracking-wide hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
          >
            {isTr ? "Profilimi Otopsiye Al" : "Get My Profile Autopsied"}
          </Link>
        </motion.div>
      </div>

      <SeoFooter />
    </div>
  );
}
