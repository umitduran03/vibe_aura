import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Skull, Sparkles, AlertTriangle } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Toxic Ex Scanner AI | Find Red Flags Instantly",
  description: "Upload a photo of your ex or situationship and let our AI scanner brutally expose their red flags and toxic traits. Free AI ex analyzer.",
  alternates: {
    canonical: "https://thevibecheckr.vercel.app/toxic-ex-scanner",
  },
};

export default function ToxicExScannerLanding() {
  return (
    <div className="min-h-dvh bg-[#050510] text-white selection:bg-red-500/30 overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-red-900/20 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-orange-900/10 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-20">
        {/* Navigation */}
        <div className="flex items-center gap-4 mb-16">
          <Link
            href="/"
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-red-500/30 transition-all cursor-pointer"
            aria-label="Go back home"
          >
            <ArrowLeft className="w-5 h-5 text-white/70" />
          </Link>
          <span className="text-sm font-medium tracking-widest text-red-400 uppercase">AI Feature Spotlight</span>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest">
              <AlertTriangle className="w-4 h-4" />
              <span>Warning: Brutally Honest</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-rose-500 to-orange-500">
              Toxic Ex Scanner AI
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
              Still hung up on them? Stop texting back and let our AI read their aura. Upload a photo and discover the red flags you completely ignored.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold tracking-wide hover:shadow-[0_0_30px_rgba(225,29,72,0.5)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
              >
                <Skull className="w-5 h-5" />
                Scan Their Vibe Now
              </Link>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-sm relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-red-500/20 to-orange-500/20 blur-3xl rounded-full" />
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 shadow-2xl glass-strong flex items-center justify-center bg-black/40">
              <div className="text-center p-6 space-y-4">
                <Skull className="w-16 h-16 text-red-500 mx-auto animate-pulse" />
                <h3 className="text-xl font-bold text-red-400">Red Flag Detected</h3>
                <p className="text-sm text-white/50">"Chronically uncommunicative with a superiority complex..."</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features/How it works */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {[
            {
              title: "Aura Reading",
              desc: "Our AI analyzes facial micro-expressions to determine their true energetic vibe.",
              icon: "✨"
            },
            {
              title: "Red Flag Extraction",
              desc: "It pinpoints the exact toxic traits that made them a walking disaster.",
              icon: "🚩"
            },
            {
              title: "Instant Closure",
              desc: "A brutal reality check to stop you from sending that 'I miss you' text at 2 AM.",
              icon: "📱"
            }
          ].map((feat, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-red-500/30 transition-colors">
              <div className="text-3xl mb-4">{feat.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center p-10 rounded-3xl bg-gradient-to-br from-red-950/50 to-black border border-red-900/30">
          <Sparkles className="w-10 h-10 text-rose-400 mx-auto mb-6" />
          <h2 className="text-3xl font-black text-white mb-4">Ready for the truth?</h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            100% Free. 100% Brutal. We don't save the photos, we just destroy their ego.
          </p>
          <Link
            href="/"
            className="inline-block px-10 py-4 rounded-full bg-white text-black font-bold tracking-wide hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
          >
            Launch VibeCheckr
          </Link>
        </div>
      </div>
    </div>
  );
}
