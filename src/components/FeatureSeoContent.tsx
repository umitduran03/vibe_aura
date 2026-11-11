import React from "react";
import Link from "next/link";
import { BookOpen, CheckCircle2, ChevronRight, HelpCircle } from "lucide-react";
import { featureSeoData } from "@/lib/seo-feature-data";
import { trendsDataEn, trendsDataTr } from "@/lib/trends-data";

type Props = {
  featureId: string;
  isTr: boolean;
};

export default function FeatureSeoContent({ featureId, isTr }: Props) {
  const locale = isTr ? "tr" : "en";
  const data = featureSeoData[featureId]?.[locale];

  if (!data) return null;

  const { howItWorks, useCases, faq } = data;

  const allTrends = isTr ? trendsDataTr : trendsDataEn;
  const directMatches = allTrends.filter((a) => a.ctaLink === `/${featureId}`);
  const fallbackSlugs = [
    "what-is-a-vibe-check",
    "ai-photo-personality-test",
    "what-is-rizz",
    "aura-battle-who-is-cooler",
    "gen-z-dating-terms-2026",
  ];
  const fallbackMatches = allTrends.filter(
    (a) =>
      fallbackSlugs.includes(a.slug) &&
      !directMatches.some((d) => d.slug === a.slug)
  );
  const relatedGuides = [...directMatches, ...fallbackMatches].slice(0, 4);


  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12 md:py-24 space-y-24 border-t border-white/5">
      {/* HOW IT WORKS */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-4 inline-block">
            {howItWorks.title}
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {howItWorks.steps.map((step: any, idx: number) => (
            <div
              key={idx}
              className="relative p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 group"
            >
              <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform">
                {idx + 1}
              </div>
              <h3 className="text-xl font-bold text-white mt-4 mb-3">{step.title}</h3>
              <p className="text-white/60 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>


      {/* USE CASES */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-4 inline-block">
            {useCases.title}
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-600 mx-auto rounded-full" />
        </div>
        <div className="space-y-4 max-w-3xl mx-auto">
          {useCases.cases.map((uc: any, idx: number) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-colors"
            >
              <div className="mt-1 flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-pink-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{uc.title}</h3>
                <p className="text-white/70 leading-relaxed">{uc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 flex items-center justify-center gap-3">
            <HelpCircle className="w-8 h-8 text-amber-500" />
            {faq.title}
          </h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-6">
          {faq.questions.map((q: any, idx: number) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-black/40 border border-white/10 glass-strong"
            >
              <h3 className="text-xl font-bold text-amber-400 mb-3 flex items-start gap-3">
                <span className="text-amber-500/50">Q.</span> {q.q}
              </h3>
              <p className="text-white/70 leading-relaxed pl-8 border-l-2 border-white/10">
                {q.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* RELATED DEEP-DIVE GUIDES (Bidirectional Topic Cluster) */}
      {relatedGuides.length > 0 && (
        <section>
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3 flex items-center justify-center gap-3">
              <BookOpen className="w-7 h-7 text-indigo-400" />
              {isTr
                ? "İlgili Rehberler & Derinlemesine Analizler"
                : "Related Guides & Deep-Dive Articles"}
            </h2>
            <p className="text-white/50 text-sm">
              {isTr
                ? "Bu aracın arkasındaki ilişki psikolojisi, aura sinyalleri ve Gen-Z terimleri"
                : "Explore the dating psychology, aura signals, and Gen-Z slang behind this tool"}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {relatedGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/${locale}/trends/${guide.slug}`}
                className="group flex flex-col justify-between p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.08] hover:border-indigo-500/40 transition-all duration-300"
              >
                <div>
                  <div className="text-xs font-bold text-indigo-400 mb-2">
                    {guide.category} • {guide.readTime}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-white/60 line-clamp-2 leading-relaxed mb-3">
                    {guide.description}
                  </p>
                </div>
                <div className="flex items-center text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors">
                  <span>{isTr ? "Rehberi Oku" : "Read Guide"}</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
