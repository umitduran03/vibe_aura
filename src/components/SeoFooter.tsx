"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { trendsDataEn, trendsDataTr } from "@/lib/trends-data";

const strings = {
  en: {
    tagline: "The internet's most brutally honest AI algorithm. Scan your vibes, decode mixed signals, and get the reality check you desperately need.",
    aiFeatures: "AI Features",
    resources: "Resources",
    legal: "Legal",
    allTrends: "All Trends & Articles →",
    vibeDictionary: "Vibe Dictionary",
    faq: "FAQ",
    topReads: "Top Reads",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    copyright: "© {year} VibeCheckr AI. All rights reserved. Not actual medical or psychological advice.",
    toxicEx: "Toxic Ex Scanner",
    duoCompat: "Duo Compatibility",
    situation: "Situationship Clarifier",
    moodReset: "Mood Reset",
    deluluCheck: "Delulu Check",
    replyGuru: "The Reply Guru",
    auraBattle: "Aura Battle",
  },
  tr: {
    tagline: "İnternetin en acımasız dürüst yapay zeka algoritması. Vibe'larını tara, karma sinyalleri çöz ve çok ihtiyacın olan gerçeklik kontrolünü al.",
    aiFeatures: "YZ Özellikleri",
    resources: "Kaynaklar",
    legal: "Yasal",
    allTrends: "Tüm Trendler & Makaleler →",
    vibeDictionary: "Vibe Sözlüğü",
    faq: "SSS",
    topReads: "Öne Çıkanlar",
    privacyPolicy: "Gizlilik Politikası",
    termsOfService: "Kullanım Koşulları",
    copyright: "© {year} VibeCheckr AI. Tüm hakları saklıdır. Gerçek tıbbi veya psikolojik tavsiye değildir.",
    toxicEx: "Toksik Eski Sevgili Tarayıcı",
    duoCompat: "İkili Uyumluluk",
    situation: "Situationship Çözücü",
    moodReset: "Mod Sıfırlama",
    deluluCheck: "Delulu Check",
    replyGuru: "Mesaj Gurusu",
    auraBattle: "Vibe Savaşları",
  },
};

export default function SeoFooter() {
  const currentYear = new Date().getFullYear();
  const locale = useAppStore((s) => s.locale) as "en" | "tr";
  const isTr = locale === "tr";
  const s = strings[locale] ?? strings.en;
  const currentTrends = isTr ? trendsDataTr : trendsDataEn;
  const topReads = currentTrends.slice(0, 5);

  return (
    <footer className="w-full border-t border-white/10 bg-black/40 backdrop-blur-md py-12 px-6 mt-20 relative z-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand Section */}
        <div className="md:col-span-1 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl text-white tracking-tight">VibeCheckr</span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed">
            {s.tagline}
          </p>
        </div>

        {/* AI Features */}
        <div className="md:col-span-1 space-y-4">
          <h4 className="text-white font-bold tracking-wide uppercase text-xs opacity-50">{s.aiFeatures}</h4>
          <ul className="space-y-3">
            <li>
              <Link href={`/${locale}/toxic-ex-scanner`} className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowRight className="w-3 h-3 text-red-400" />
                </span>
                {s.toxicEx}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/duo-compatibility`} className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowRight className="w-3 h-3 text-pink-400" />
                </span>
                {s.duoCompat}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/situationship-clarifier`} className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowRight className="w-3 h-3 text-purple-400" />
                </span>
                {s.situation}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/mood-reset`} className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowRight className="w-3 h-3 text-emerald-400" />
                </span>
                {s.moodReset}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/delulu-check`} className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowRight className="w-3 h-3 text-amber-400" />
                </span>
                {s.deluluCheck}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/reply-guru`} className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowRight className="w-3 h-3 text-indigo-400" />
                </span>
                {s.replyGuru}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/aura-battle`} className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowRight className="w-3 h-3 text-orange-400" />
                </span>
                {s.auraBattle}
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div className="md:col-span-1 space-y-4">
          <h4 className="text-white font-bold tracking-wide uppercase text-xs opacity-50">{s.resources}</h4>
          <ul className="space-y-3">
            <li>
              <Link href={`/${locale}/trends`} className="text-white/70 hover:text-white transition-colors text-sm font-semibold text-indigo-300">
                {s.allTrends}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/vibe-dictionary`} className="text-white/70 hover:text-white transition-colors text-sm">
                {s.vibeDictionary}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/faq`} className="text-white/70 hover:text-white transition-colors text-sm">
                {s.faq}
              </Link>
            </li>
            <li className="pt-2">
              <span className="text-xs text-white/40 uppercase font-bold tracking-wider">{s.topReads}</span>
            </li>
            {topReads.map((article) => (
              <li key={article.slug}>
                <Link href={`/${locale}/trends/${article.slug}`} className="text-white/60 hover:text-white transition-colors text-xs block truncate" title={article.title}>
                  {article.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div className="md:col-span-1 space-y-4">
          <h4 className="text-white font-bold tracking-wide uppercase text-xs opacity-50">{s.legal}</h4>
          <ul className="space-y-3">
            <li>
              <Link href={`/${locale}/privacy`} className="text-white/70 hover:text-white transition-colors text-sm">
                {s.privacyPolicy}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/terms`} className="text-white/70 hover:text-white transition-colors text-sm">
                {s.termsOfService}
              </Link>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white/40 text-xs">
          {s.copyright.replace("{year}", String(currentYear))}
        </p>
        <div className="flex gap-4">
          {/* Social placeholders if needed in future */}
        </div>
      </div>
    </footer>
  );
}
