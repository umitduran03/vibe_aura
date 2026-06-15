"use client";

import Link from "next/link";
import { ArrowLeft, Flame, Sparkles, TrendingUp } from "lucide-react";
import { trendsDataEn, trendsDataTr } from "@/lib/trends-data";
import SeoFooter from "@/components/SeoFooter";
import { useAppStore } from "@/store/useAppStore";

const strings = {
  en: {
    title: "Vibe Culture Hub",
    intro: "The pulse of the internet.",
    introPara: "From viral TikTok challenges to the brutal psychology behind situationships. We break down the trends so you don't have to.",
    readMore: "Read full analysis",
    ctaTitle: "Less reading, more roasting.",
    ctaPara: "Experience our viral AI engine firsthand. Let our algorithm scan your face and tell you exactly what vibe you're giving off.",
    ctaBtn: "Start Vibe Check",
    ariaBack: "Go back home",
  },
  tr: {
    title: "Vibe Kültür Merkezi",
    intro: "İnternetin nabzı burada atıyor.",
    introPara: "Viral TikTok akımlarından situationship'lerin o lanet psikolojisine kadar her şeyi inceliyoruz. Sen araştırmakla uğraşma diye trendleri biz analiz ediyoruz.",
    readMore: "Analizin tamamını oku",
    ctaTitle: "Okumayı bırak, yüzleşmeye bak.",
    ctaPara: "İnterneti sallayan yapay zeka motorumuzu kendi üzerinde dene. Algoritma yüzünü tarasın ve dışarıya tam olarak nasıl bir vibe verdiğini yüzüne vursun.",
    ctaBtn: "Vibe Check'i Başlat",
    ariaBack: "Ana sayfaya dön",
  },
};

export default function TrendsHubPage() {
  const locale = useAppStore((s) => s.locale) as "en" | "tr";
  const isTr = locale === "tr";
  const s = strings[locale] ?? strings.en;
  const currentTrends = isTr ? trendsDataTr : trendsDataEn;

  return (
    <div className="min-h-dvh bg-[#050510] text-white">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-600/20 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-20">
        {/* Navigation */}
        <div className="flex items-center gap-4 mb-12">
          <Link
            href="/"
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            aria-label={s.ariaBack}
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
              {s.title}
            </h1>
          </div>
        </div>

        {/* Intro */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">{s.intro}</h2>
          <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl">
            {s.introPara}
          </p>
        </div>

        {/* Article Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {currentTrends.map((article, idx) => (
            <Link 
              key={article.slug} 
              href={`/trends/${article.slug}`}
              className="group flex flex-col p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-indigo-500/30 hover:bg-white/[0.08] transition-all duration-300 relative overflow-hidden"
            >
              {/* Card Glow Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-cyan-500/0 group-hover:from-indigo-500/10 group-hover:to-cyan-500/10 transition-colors duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-white/80">
                    <Flame className="w-3.5 h-3.5 text-orange-400" />
                    {article.category}
                  </span>
                  <span className="text-xs text-white/40 font-medium">{article.readTime}</span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                  {article.title}
                </h3>
                <p className="text-white/60 leading-relaxed mb-6 line-clamp-3">
                  {article.description}
                </p>
                
                <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center text-sm font-semibold text-indigo-400">
                  <span>{s.readMore}</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 p-10 rounded-3xl bg-gradient-to-br from-indigo-950/50 to-black border border-indigo-900/30 text-center">
          <Sparkles className="w-10 h-10 text-cyan-400 mx-auto mb-6" />
          <h2 className="text-3xl font-black text-white mb-4">{s.ctaTitle}</h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            {s.ctaPara}
          </p>
          <Link
            href="/"
            className="inline-block px-10 py-4 rounded-full bg-white text-black font-bold tracking-wide hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
          >
            {s.ctaBtn}
          </Link>
        </div>
      </div>
      <SeoFooter />
    </div>
  );
}
