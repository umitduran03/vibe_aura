"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, HelpCircle } from "lucide-react";
import InArticleAd from "@/components/InArticleAd";
import { featureSeoData } from "@/lib/seo-feature-data";

type Props = {
  featureId: string;
  isTr: boolean;
};

export default function FeatureSeoContent({ featureId, isTr }: Props) {
  const data = featureSeoData[featureId]?.[isTr ? "tr" : "en"];

  if (!data) return null;

  const { howItWorks, useCases, faq } = data;

  // Generate FAQPage JSON-LD
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.questions.map((q: { q: string; a: string }) => ({
      "@type": "Question",
      name: q.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.a,
      },
    })),
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12 md:py-24 space-y-24 border-t border-white/5">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

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
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 group"
            >
              <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform">
                {idx + 1}
              </div>
              <h3 className="text-xl font-bold text-white mt-4 mb-3">{step.title}</h3>
              <p className="text-white/60 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AD BREAK */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-sm">
          <InArticleAd />
        </div>
      </div>

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
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-colors"
            >
              <div className="mt-1 flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-pink-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{uc.title}</h3>
                <p className="text-white/70 leading-relaxed">{uc.desc}</p>
              </div>
            </motion.div>
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
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-black/40 border border-white/10 glass-strong"
            >
              <h3 className="text-xl font-bold text-amber-400 mb-3 flex items-start gap-3">
                <span className="text-amber-500/50">Q.</span> {q.q}
              </h3>
              <p className="text-white/70 leading-relaxed pl-8 border-l-2 border-white/10">
                {q.a}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
