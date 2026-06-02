"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles, MessageSquareQuote } from "lucide-react";
import { motion } from "framer-motion";

export default function ReplyGuruLanding() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "The Reply Guru AI",
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Any",
    description: "Drop the screenshot and let our AI craft the perfect toxic, cool, or safe reply. Never stress about what to text back again.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };

  return (
    <div className="min-h-dvh bg-[#050510] text-white selection:bg-violet-500/30 overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-violet-900/20 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-slate-800/20 blur-[150px]" />
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
          <span className="text-sm font-medium tracking-widest text-violet-400 uppercase drop-shadow-[0_0_5px_rgba(139,92,246,0.5)]">AI Feature Spotlight</span>
        </motion.div>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="flex-1 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(139,92,246,0.2)]">
              <span className="text-base leading-none">💬</span>
              <span>Win The Mind Games</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-400">
              The Reply Guru AI
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
              Staring at your keyboard for 20 minutes? Drop the screenshot of their text and let the AI craft the perfect toxic, cool, or safe reply.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold tracking-wide hover:shadow-[0_0_30px_rgba(109,40,217,0.6)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
              >
                <MessageSquareQuote className="w-5 h-5 animate-pulse" />
                Generate Reply
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
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-violet-500/20 shadow-[0_0_40px_rgba(139,92,246,0.2)] glass-strong flex items-center justify-center bg-black/40">
              <div className="text-center p-6 space-y-4">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-7xl drop-shadow-[0_0_15px_rgba(139,92,246,0.8)]"
                >
                  💬
                </motion.div>
                <h3 className="text-xl font-black text-violet-400">AI Suggestion</h3>
                <p className="text-sm text-white/60 font-medium leading-relaxed">"Who's this?" (Sends them into an immediate panic spiral)</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features/How it works */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {[
            {
              title: "Multiple Tones",
              desc: "Choose between 'Toxic', 'Cool & Unbothered', or 'Playful' depending on your end goal.",
              icon: "🎭"
            },
            {
              title: "Context Aware",
              desc: "The AI reads the previous messages to match the energy perfectly.",
              icon: "🧠"
            },
            {
              title: "No More Panic",
              desc: "Stop crowd-sourcing your replies from the group chat. Get instant results.",
              icon: "🧘‍♀️"
            }
          ].map((feat, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/40 hover:bg-white/[0.08] transition-all duration-300 group"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{feat.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">{feat.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center p-10 rounded-3xl bg-gradient-to-br from-violet-950/60 to-black border border-violet-900/50 shadow-[0_0_50px_rgba(109,40,217,0.15)]"
        >
          <Sparkles className="w-10 h-10 text-purple-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">Leave them on read no more.</h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto text-lg">
            Let the Guru handle the heavy lifting. Win the argument, secure the date, or just cause chaos.
          </p>
          <Link
            href="/"
            className="inline-block px-10 py-4 rounded-full bg-white text-black font-bold tracking-wide hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
          >
            Launch VibeCheckr
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
