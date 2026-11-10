"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, BookOpen, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import VibeDictionaryClient from "@/components/VibeDictionaryClient";
import { dictionaryTermsEn, dictionaryTermsTr } from "@/lib/dictionary-data";
import SeoFooter from "@/components/SeoFooter";
import InArticleAd from "@/components/InArticleAd";
import { useAppStore } from "@/store/useAppStore";

const strings = {
  en: {
    heroH1: "Gen-Z Slang & Dating Dictionary (300+ Terms) — Ick, Delulu, Rizz & Vibe Check Meaning",
    heroSubtitle: "What does delulu, rizz, the ick, situationship, orbiting, or aura points mean? Search 300+ modern Gen-Z internet & dating slang definitions with real examples.",
    heroBadge: "300+ terms",
    title: "Gen-Z Vibe Dictionary",
    intro: "Confused by modern texting and dating slang? Not sure if your crush is love bombing, breadcrumbing, orbiting, or giving you the ick? Browse our complete 300+ term encyclopedia of Gen-Z slang, relationship red flags, aura terms, and zodiac traits—then test your own energy with our free AI Vibe Check.",
    ctaTopTitle: "Curious about your own vibe & aura score? 📸",
    ctaTopDesc: "Upload a selfie or chat screenshot and let our AI score your 0–100 aura or roast your vibe.",
    ctaTopBtn: "Get My Vibe Check",
    ctaBottomTitle: "Ready to test your real-life vibe?",
    ctaBottomDesc: "Stop just reading slang definitions—upload a selfie or text screenshot to find out what your aura, crush chemistry, or situationship actually looks like.",
    ctaBottomBtn: "Start AI Vibe Check Now",
    ariaBack: "Go back home",
    statsLabels: ["300+ slang terms", "Updated weekly", "TR + EN", "Free forever"],
    relatedTitle: "Free AI Vibe & Dating Tools",
    relatedSubtitle: "Put your new vocabulary to the test",
  },
  tr: {
    heroH1: "Gen-Z & İlişki Terimleri Sözlüğü (300+ Terim) — Vibe Check, Ick, Delulu & Rizz Ne Demek?",
    heroSubtitle: "Vibe check ne demek? Ick nedir, delulu, rizz, situationship, ghosting, red flag ve aura puanı ne anlama gelir? 300+ güncel internet ve flört terimini örnekleriyle keşfet.",
    heroBadge: "300+ terim",
    title: "Gen-Z Vibe Sözlüğü",
    intro: "Sosyal medya ve flört jargonunda sıkça duyduğun kelimelerin gerçek anlamını mı merak ediyorsun? Hoşlandığın kişi sana breadcrumbing mi yapıyor, gaslighting mi uyguluyor yoksa tam bir walking red flag mi? 300'den fazla Gen-Z terimi, ilişki psikolojisi kavramı ve burç analizini buradan öğren; ardından ücretsiz yapay zeka Vibe Check testini dene.",
    ctaTopTitle: "Kendi vibe ve aura puanını mı merak ediyorsun? 📸",
    ctaTopDesc: "Hemen bir selfie veya mesaj ekran görüntüsü yükle, yapay zeka 0–100 Aura Skorunu hesaplasın.",
    ctaTopBtn: "Vibe Check'imi Al",
    ctaBottomTitle: "Gerçeklerle yüzleşmeye hazır mısın?",
    ctaBottomDesc: "Tanım okumayı bırak da fotoğrafının veya mesajlarının dışarıya nasıl bir sinyal verdiğini gör. Ücretsiz yapay zeka araçlarımızla anında test et.",
    ctaBottomBtn: "AI Vibe Check'i Başlat",
    ariaBack: "Ana sayfaya dön",
    statsLabels: ["300+ slang terimi", "Haftalık güncelleme", "TR + EN", "Sonsuza kadar ücretsiz"],
    relatedTitle: "Ücretsiz Yapay Zeka İlişki & Vibe Araçları",
    relatedSubtitle: "Yeni öğrendiklerini hemen test et",
  },
};

export default function VibeDictionaryPage() {
  const params = useParams();
  const routeLang = (params?.lang as string) ?? "";
  const storeLocale = useAppStore((s) => s.locale);
  const locale = (routeLang || storeLocale) as "en" | "tr";
  const isTr = locale === "tr";
  const s = strings[locale] ?? strings.en;

  const currentDictionary = isTr ? dictionaryTermsTr : dictionaryTermsEn;

  const statsValues = ["300+", "📅", "🌍", "♾️"];

  const relatedTools = [
    {
      href: `/${isTr ? "tr" : "en"}/delulu-check`,
      emoji: "🤡",
      title: isTr ? "Delulu Kontrol" : "Delulu Check",
      desc: isTr ? "Gerçekten delulu musun, yoksa haklı mısın?" : "Are you actually delusional or just right?",
    },
    {
      href: `/${isTr ? "tr" : "en"}/reply-guru`,
      emoji: "💬",
      title: isTr ? "Mesaj Gurusu" : "Reply Guru",
      desc: isTr ? "Ne yazacağını bilemiyor musun?" : "Don't know what to text back?",
    },
    {
      href: `/${isTr ? "tr" : "en"}/situationship-clarifier`,
      emoji: "🌀",
      title: isTr ? "Situationship Netleştirici" : "Situationship Clarifier",
      desc: isTr ? "Bu ilişkinin ne olduğunu öğren" : "Figure out what this even is",
    },
  ];

  return (
    <div className="min-h-dvh bg-[#050510] text-white">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-pink-600/20 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-12 md:py-20">
        {/* Navigation */}
        <div className="flex items-center gap-4 mb-10">
          <Link
            href={`/${locale}`}
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            aria-label={s.ariaBack}
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-lg font-bold text-purple-400">{s.title}</span>
          </div>
        </div>

        {/* Hero Section */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{s.heroBadge}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
            {s.heroH1}
          </h1>
          <p className="text-lg text-white/70 leading-relaxed">
            {s.heroSubtitle}
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {s.statsLabels.map((label, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all text-center group"
            >
              <div className="text-2xl font-black text-cyan-400 group-hover:scale-110 transition-transform">
                {statsValues[i]}
              </div>
              <div className="text-xs text-white/50 mt-1 leading-tight">{label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Intro */}
        <p className="text-white/70 text-lg mb-12 leading-relaxed">
          {s.intro}
        </p>

        {/* CTA Banner (Top) */}
        <div className="mb-14 p-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-center">
          <h2 className="text-xl font-bold text-white mb-2">{s.ctaTopTitle}</h2>
          <p className="text-white/70 mb-5">{s.ctaTopDesc}</p>
          <Link
            href={`/${locale}`}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform"
          >
            {s.ctaTopBtn}
          </Link>
        </div>

        {/* Dictionary Client Component with Search */}
        <VibeDictionaryClient dictionaryTerms={currentDictionary} />

        {/* In-Article Ad */}
        <InArticleAd />

        {/* CTA Banner (Bottom) */}
        <div className="mt-20 p-8 rounded-3xl bg-black/40 border border-white/10 text-center backdrop-blur-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-4 shadow-lg shadow-purple-500/20">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">{s.ctaBottomTitle}</h2>
          <p className="text-white/60 mb-6 max-w-md mx-auto">
            {s.ctaBottomDesc}
          </p>
          <Link
            href={`/${locale}`}
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all hover:-translate-y-1"
          >
            {s.ctaBottomBtn}
          </Link>
        </div>

        {/* Related Tools Section */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-black text-white mb-2">{s.relatedTitle}</h2>
          <p className="text-white/50 text-sm mb-6">{s.relatedSubtitle}</p>
          <div className="grid md:grid-cols-3 gap-4">
            {relatedTools.map((tool, i) => (
              <motion.div
                key={i}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
              >
                <Link
                  href={tool.href}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-white/[0.07] transition-all duration-300 group flex flex-col gap-2 h-full"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform inline-block">{tool.emoji}</span>
                  <span className="font-bold text-white group-hover:text-cyan-300 transition-colors">{tool.title}</span>
                  <span className="text-white/50 text-sm leading-relaxed">{tool.desc}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <SeoFooter />
    </div>
  );
}
