import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Heart, Zap, Sparkles } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "AI Duo Compatibility Test | Soulmate or Disaster?",
  description: "Upload two photos and let our AI calculate your exact relationship chemistry, aura blend, and romantic compatibility based on facial reading and zodiac signs.",
  alternates: {
    canonical: "https://thevibecheckr.vercel.app/duo-compatibility",
  },
};

export default function DuoCompatibilityLanding() {
  return (
    <div className="min-h-dvh bg-[#050510] text-white selection:bg-pink-500/30 overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-600/20 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-20">
        {/* Navigation */}
        <div className="flex items-center gap-4 mb-16">
          <Link
            href="/"
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-pink-500/30 transition-all cursor-pointer"
            aria-label="Go back home"
          >
            <ArrowLeft className="w-5 h-5 text-white/70" />
          </Link>
          <span className="text-sm font-medium tracking-widest text-pink-400 uppercase">AI Feature Spotlight</span>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-widest">
              <Heart className="w-4 h-4 fill-pink-400" />
              <span>Relationship Chemistry AI</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
              AI Duo Compatibility Test
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
              Are you soulmates or a walking disaster? Upload two selfies and our AI will calculate your energetic match, aura blend, and brutal relationship forecast.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold tracking-wide hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
              >
                <Zap className="w-5 h-5" />
                Test Your Compatibility
              </Link>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-sm relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-purple-500/20 blur-3xl rounded-full" />
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 shadow-2xl glass-strong flex flex-col items-center justify-center bg-black/40">
              <div className="flex items-center justify-center gap-2 mb-6">
                 <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 opacity-80 mix-blend-screen animate-pulse" />
                 <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 opacity-80 mix-blend-screen animate-pulse delay-75" />
              </div>
              <div className="text-center p-6 space-y-4">
                <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300">92% Match</h3>
                <p className="text-sm text-white/70">"A chaotic but highly magnetic bond. Expect intense loyalty mixed with dramatic arguments over nothing."</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {[
            {
              title: "Aura Blending",
              desc: "See exactly how your individual energies and micro-expressions mix together.",
              icon: "🔮"
            },
            {
              title: "Platonic or Romantic?",
              desc: "Select your relationship type. Works for crushes, couples, or just testing your BFF.",
              icon: "👯‍♀️"
            },
            {
              title: "Brutally Honest",
              desc: "No sugarcoating. If it's a toxic match, the AI will tell you to run.",
              icon: "🏃‍♂️"
            }
          ].map((feat, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500/30 transition-colors">
              <div className="text-3xl mb-4">{feat.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center p-10 rounded-3xl bg-gradient-to-br from-purple-950/50 to-black border border-pink-900/30">
          <Sparkles className="w-10 h-10 text-pink-400 mx-auto mb-6" />
          <h2 className="text-3xl font-black text-white mb-4">Curious about your chemistry?</h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            Find out if it's true love or just a shared delusion. Free, instant, and terrifyingly accurate.
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
