"use client";

import Link from "next/link";
import { ArrowLeft, HelpCircle, MessageCircleQuestion, Sparkles } from "lucide-react";
import { motion, Variants } from "framer-motion";

const faqs = [
  {
    question: "What exactly is VibeCheckr?",
    answer: "VibeCheckr is a brutally honest, AI-powered vibe checking and photo analysis app for Gen-Z. You upload a selfie, and our AI reads your aura, gives you a savage roast, determines your soulmate profile, and calculates your vibe score.",
  },
  {
    question: "Is VibeCheckr completely free?",
    answer: "Yes! The core AI vibe check, photo roasts, and duo compatibility features are 100% free to use. We believe everyone deserves to get absolutely roasted by AI without paying a dime.",
  },
  {
    question: "How does the Duo Compatibility Check work?",
    answer: "You upload two photos—yours and someone else's. The AI analyzes both photos, reads your combined energies, and tells you if you're soulmates, a toxic disaster waiting to happen, or just better off as besties.",
  },
  {
    question: "Are my photos saved or stored?",
    answer: "Absolutely not. Your privacy is critical to us. Photos are processed in real-time by our AI and are not permanently saved, stored, or used to train any models. Once your analysis is generated, the photo data is instantly wiped.",
  },
  {
    question: "Why is the AI so mean?",
    answer: "It's a feature, not a bug! Our AI is programmed to be a 'Sassy Intuitive Vibe Reader'. It gives brutally honest feedback because sugarcoating is boring. But don't worry, it also highlights your good traits (when you actually have them).",
  },
  {
    question: "What is a 'Toxic Ex Scanner'?",
    answer: "It's one of our special features. You upload a photo of your ex (or current situationship), and the AI will scan their aura to tell you exactly how many red flags they have and why you should probably block them.",
  },
  {
    question: "Can I share my results on social media?",
    answer: "Yes! Every AI vibe check generates a beautiful, glowing result card that you can instantly save and post on Instagram, TikTok, or Twitter to show off your aura points to your friends.",
  },
  {
    question: "How accurate is the Zodiac analysis?",
    answer: "Our AI takes your zodiac sign into account when delivering its roast. If you're a Leo, expect to be humbled about your ego. If you're a Scorpio, expect it to call out your trust issues. It's shockingly accurate.",
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function FAQPage() {
  // Generate JSON-LD dynamically
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-dvh bg-[#050510] text-white selection:bg-cyan-500/30">
      {/* ─── Localized JSON-LD ─── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-12 md:py-20">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-10"
        >
          <Link
            href="/"
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 transition-all cursor-pointer"
            aria-label="Go back home"
          >
            <ArrowLeft className="w-5 h-5 text-white/70" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <MessageCircleQuestion className="w-6 h-6" />
            </div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400">
              Frequently Asked Questions
            </h1>
          </div>
        </motion.div>

        {/* Intro */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white/70 text-lg md:text-xl mb-12 leading-relaxed"
        >
          Everything you need to know about how our AI reads your aura, roasts your selfies, and calculates your cosmic compatibility. No gatekeeping here.
        </motion.p>

        {/* FAQs */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {faqs.map((faq, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-white/[0.07] transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]"
            >
              <div className="flex gap-4">
                <HelpCircle className="w-6 h-6 text-cyan-400 shrink-0 mt-1 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-100 transition-colors">{faq.question}</h3>
                  <p className="text-white/60 leading-relaxed text-sm md:text-base group-hover:text-white/80 transition-colors">{faq.answer}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Banner (Bottom) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, type: "spring" }}
          className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-500/20 text-center backdrop-blur-md relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 mb-6 shadow-[0_0_30px_rgba(6,182,212,0.4)] group-hover:scale-110 transition-transform duration-500">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight">No more questions. Time for answers.</h2>
            <p className="text-white/60 mb-8 max-w-md mx-auto text-lg">
              Upload a selfie and let our AI give you a brutally honest reality check.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold tracking-wide hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
            >
              Start Free AI Vibe Check
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
