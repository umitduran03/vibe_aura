import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, Sparkles, Zap, HeartPulse } from "lucide-react";

export const metadata: Metadata = {
  title: "Gen-Z Vibe & Astrology Dictionary",
  description: "Learn the meanings of Gen-Z slang, red flags, aura colors, and zodiac traits. The ultimate dictionary for vibes, delulu moments, and situationships.",
  alternates: {
    canonical: "https://thevibecheckr.vercel.app/vibe-dictionary",
  },
};

import VibeDictionaryClient from "@/components/VibeDictionaryClient";

export default function VibeDictionaryPage() {
  return (
    <div className="min-h-dvh bg-[#050510] text-white">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-pink-600/20 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-12 md:py-20">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <Link
            href="/"
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            aria-label="Go back home"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <BookOpen className="w-6 h-6" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Gen-Z Vibe Dictionary
            </h1>
          </div>
        </div>

        {/* Intro */}
        <p className="text-white/70 text-lg mb-12 leading-relaxed">
          Confused by the internet? Don't know if your crush is a walking red flag or just a Scorpio? 
          Welcome to the ultimate dictionary of Gen-Z slang, vibes, and astrology. Learn the lingo before 
          you take your ultimate <strong className="text-white">AI Vibe Check</strong>.
        </p>

        {/* CTA Banner (Top) */}
        <div className="mb-14 p-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Curious about your own vibe? 📸</h2>
          <p className="text-white/70 mb-5">Upload a selfie and let our AI brutally roast or hype you up.</p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform"
          >
            Get My Vibe Check
          </Link>
        </div>

        {/* Dictionary Client Component with Search */}
        <VibeDictionaryClient />

        {/* CTA Banner (Bottom) */}
        <div className="mt-20 p-8 rounded-3xl bg-black/40 border border-white/10 text-center backdrop-blur-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-4 shadow-lg shadow-purple-500/20">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Ready to face the truth?</h2>
          <p className="text-white/60 mb-6 max-w-md mx-auto">
            Stop reading definitions and find out what your aura actually says about you. Our AI is waiting to humble you.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all hover:-translate-y-1"
          >
            Start AI Vibe Check Now
          </Link>
        </div>
      </div>
    </div>
  );
}
