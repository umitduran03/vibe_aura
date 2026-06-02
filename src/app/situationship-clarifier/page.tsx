"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles, MessageCircleHeart } from "lucide-react";
import { motion } from "framer-motion";
import SeoFooter from "@/components/SeoFooter";

export default function SituationshipClarifierLanding() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Situationship Clarifier AI",
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Any",
    description: "Decoding the 'What are we?' mystery. Brutal compatibility stats included.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };

  return (
    <div className="min-h-dvh bg-[#050510] text-white selection:bg-purple-500/30 overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/10 blur-[150px]" />
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
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all cursor-pointer"
            aria-label="Go back home"
          >
            <ArrowLeft className="w-5 h-5 text-white/70" />
          </Link>
          <span className="text-sm font-medium tracking-widest text-purple-400 uppercase drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]">AI Feature Spotlight</span>
        </motion.div>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="flex-1 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              <span className="text-base leading-none">🤡</span>
              <span>The "What are we?" Decoder</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-500 to-indigo-500">
              Situationship Clarifier AI
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
              Tired of the grey zone? Stop overanalyzing their texts and let our AI read the actual energy between you two. 
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold tracking-wide hover:shadow-[0_0_30px_rgba(147,51,234,0.6)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
              >
                <MessageCircleHeart className="w-5 h-5 animate-pulse" />
                Get Clarity Now
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            className="flex-1 w-full max-w-sm relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 to-indigo-500/30 blur-3xl rounded-full" />
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-purple-500/20 shadow-[0_0_40px_rgba(168,85,247,0.2)] glass-strong flex items-center justify-center bg-black/40">
              <div className="text-center p-6 space-y-4">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="text-7xl drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]"
                >
                  🤡
                </motion.div>
                <h3 className="text-xl font-black text-purple-400">Diagnosis: Delusion</h3>
                <p className="text-sm text-white/60 font-medium leading-relaxed">"They like the attention, but they don't like you enough to commit."</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features/How it works */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {[
            {
              title: "Energy Reading",
              desc: "AI decodes the hidden power dynamics and true intentions behind the relationship.",
              icon: "🔮"
            },
            {
              title: "Brutal Truth",
              desc: "Are you being played or just taking things slow? Find out immediately.",
              icon: "🔪"
            },
            {
              title: "Future Forecast",
              desc: "A statistical breakdown of where this situationship is actually heading.",
              icon: "📈"
            }
          ].map((feat, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/40 hover:bg-white/[0.08] transition-all duration-300 group"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{feat.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{feat.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center p-10 rounded-3xl bg-gradient-to-br from-purple-950/60 to-black border border-purple-900/50 shadow-[0_0_50px_rgba(147,51,234,0.15)]"
        >
          <Sparkles className="w-10 h-10 text-fuchsia-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">Ready to stop guessing?</h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto text-lg">
            Stop asking your friends for advice. Let the AI give you the brutal reality check you need.
          </p>
          <Link
            href="/"
            className="inline-block px-10 py-4 rounded-full bg-white text-black font-bold tracking-wide hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
          >
            Launch VibeCheckr
          </Link>
        </motion.div>
      </div>
      <SeoFooter />
    </div>
  );
}
