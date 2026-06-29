"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import VibeDictionaryClient from "@/components/VibeDictionaryClient";
import { dictionaryTermsEn, dictionaryTermsTr } from "@/lib/dictionary-data";
import SeoFooter from "@/components/SeoFooter";
import InArticleAd from "@/components/InArticleAd";
import { useAppStore } from "@/store/useAppStore";

const strings = {
  en: {
    heroH1: "Gen Z Slang Dictionary — What Does the Word Mean?",
    heroSubtitle: "Decode every gen-z term, vibe, and dating slang from delulu to rizz to slay.",
    heroBadge: "300+ terms",
    title: "Gen-Z Vibe Dictionary",
    intro: "Confused by the internet? Don't know if your crush is a walking red flag or just a Scorpio? Welcome to the ultimate dictionary of Gen-Z slang, vibes, and astrology. Learn the lingo before you take your ultimate AI Vibe Check.",
    ctaTopTitle: "Curious about your own vibe? 📸",
    ctaTopDesc: "Upload a selfie and let our AI brutally roast or hype you up.",
    ctaTopBtn: "Get My Vibe Check",
    ctaBottomTitle: "Ready to face the truth?",
    ctaBottomDesc: "Stop reading definitions and find out what your aura actually says about you. Our AI is waiting to humble you.",
    ctaBottomBtn: "Start AI Vibe Check Now",
    ariaBack: "Go back home",
    statsLabels: ["300+ slang terms", "Updated weekly", "TR + EN", "Free forever"],
    relatedTitle: "Related Tools",
    relatedSubtitle: "Put your new vocabulary to the test",
  },
  tr: {
    heroH1: "Gen Z Sözlüğü — Kelimenin Anlamı Ne?",
    heroSubtitle: "Delulu'dan rizz'e, slay'den main character energy'ye kadar tüm gen-z terimlerini öğren.",
    heroBadge: "300+ terim",
    title: "Gen-Z Vibe Sözlüğü",
    intro: "İnternet jargonunda kaybolmuş gibi mi hissediyorsun? Manitan tam bir 'red flag' mi yoksa sadece klasik bir Akrep mi emin değil misin? Gen-Z argosunun, vibe muhabbetlerinin ve astrolojinin en dibine vurduğumuz efsane sözlüğe hoş geldin. O meşhur AI Vibe Check'i yaptırmadan önce jargonunu tazele.",
    ctaTopTitle: "Kendi vibe'ını mı merak ediyorsun? 📸",
    ctaTopDesc: "Hemen bir selfie yükle, yapay zekamız seni darmadağın etsin ya da arşa çıkarsın.",
    ctaTopBtn: "Vibe Check'imi Al",
    ctaBottomTitle: "Gerçeklerle yüzleşmeye hazır mısın?",
    ctaBottomDesc: "Tanım okumayı bırak da auranın dışarıya nasıl bir sinyal verdiğini gör. Yapay zekamız o çok güvendiğin egonu sarsmak için bekliyor.",
    ctaBottomBtn: "AI Vibe Check'i Başlat",
    ariaBack: "Ana sayfaya dön",
    statsLabels: ["300+ slang terimi", "Haftalık güncelleme", "TR + EN", "Sonsuza kadar ücretsiz"],
    relatedTitle: "İlgili Araçlar",
    relatedSubtitle: "Yeni öğrendiklerini test et",
  },
};

export default function VibeDictionaryPage() {
  const locale = useAppStore((s) => s.locale) as "en" | "tr";
  const isTr = locale === "tr";
  const s = strings[locale] ?? strings.en;

  const currentDictionary = isTr ? dictionaryTermsTr : dictionaryTermsEn;

  const statsValues = ["300+", "📅", "🌍", "♾️"];

  const relatedTools = [
    {
      href: `/${isTr ? "tr" : "en"}?feature=delulu-check`,
      emoji: "🤡",
      title: isTr ? "Delulu Kontrol" : "Delulu Check",
      desc: isTr ? "Gerçekten delulu musun, yoksa haklı mısın?" : "Are you actually delusional or just right?",
    },
    {
      href: `/${isTr ? "tr" : "en"}?feature=reply-guru`,
      emoji: "💬",
      title: isTr ? "Mesaj Gurusu" : "Reply Guru",
      desc: isTr ? "Ne yazacağını bilemiyor musun?" : "Don't know what to text back?",
    },
    {
      href: `/${isTr ? "tr" : "en"}?feature=situationship-clarifier`,
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
            href="/"
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {s.statsLabels.map((label, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
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
            href="/"
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
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all hover:-translate-y-1"
          >
            {s.ctaBottomBtn}
          </Link>
        </div>

        {/* Related Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h2 className="text-2xl font-black text-white mb-2">{s.relatedTitle}</h2>
          <p className="text-white/50 text-sm mb-6">{s.relatedSubtitle}</p>
          <div className="grid md:grid-cols-3 gap-4">
            {relatedTools.map((tool, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
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
