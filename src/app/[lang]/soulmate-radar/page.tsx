"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Heart, Sparkles, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";
import SeoFooter from "@/components/SeoFooter";
import InArticleAd from "@/components/InArticleAd";

export default function SoulmateRadarLanding() {
  const params = useParams();
  const isTr = params?.lang === "tr";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: isTr ? "YZ Ruh Eşi Radarı & Gelecek Tahmini" : "AI Soulmate Radar & Future Predictor",
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Any",
    description: isTr 
      ? "Yapay zeka auranı tarasın ve senin için mükemmel ruh eşinin tam olarak nasıl biri olduğunu, nerede tanışacağınızı söylesin."
      : "Let AI scan your aura to predict exactly what your true soulmate acts like and where you will meet them.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };

  return (
    <div className="min-h-dvh bg-[#050510] text-white selection:bg-pink-500/30 overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-900/20 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-rose-900/10 blur-[150px]" />
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
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-pink-500/30 transition-all cursor-pointer"
            aria-label="Go back home"
          >
            <ArrowLeft className="w-5 h-5 text-white/70" />
          </Link>
          <span className="text-sm font-medium tracking-widest text-pink-400 uppercase drop-shadow-[0_0_5px_rgba(244,114,182,0.5)]">
            {isTr ? "YZ AŞK FALCISI" : "AI LOVE PREDICTOR"}
          </span>
        </motion.div>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="flex-1 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(244,114,182,0.2)]">
              <HeartHandshake className="w-4 h-4" />
              <span>{isTr ? "Ruh Eşin Seni Bekliyor" : "Your Soulmate is Waiting"}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-rose-500 to-purple-500">
              {isTr ? "Ruh Eşinin Profilini Çıkar" : "Discover Your True Soulmate"}
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
              {isTr 
                ? "Yanlış insanlarla vakit kaybetmeyi bırak. Auranı tarat ve yapay zekanın senin için biçilmiş o mükemmel ruh eşinin karakterini, vibe'ını ve seninle nerede çarpışacağını söylemesine izin ver."
                : "Stop wasting time on the wrong people. Scan your aura and let our AI accurately predict the exact personality, vibe, and location of your future soulmate."}
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${isTr ? "tr" : "en"}?feature=soulmate-radar`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold tracking-wide hover:shadow-[0_0_30px_rgba(225,29,72,0.6)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
              >
                <Heart className="w-5 h-5 animate-pulse" />
                {isTr ? "Ruh Eşimi Bul" : "Find My Soulmate"}
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            className="flex-1 w-full max-w-sm relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/30 to-purple-500/30 blur-3xl rounded-full" />
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-pink-500/20 shadow-[0_0_40px_rgba(244,114,182,0.2)] glass-strong flex items-center justify-center bg-black/40">
              <div className="text-center p-6 space-y-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <HeartHandshake className="w-16 h-16 text-pink-500 mx-auto drop-shadow-[0_0_15px_rgba(244,114,182,0.8)]" />
                </motion.div>
                <h3 className="text-xl font-black text-pink-400">{isTr ? "Eşleşme Bulundu" : "Match Found"}</h3>
                <p className="text-sm text-white/60 font-medium leading-relaxed">
                  {isTr ? `"Kitapçıda seninle aynı indie gruba tapan ve iced americano içen o golden retriever enerjili kişi."` : `"A golden retriever energy who loves the exact same indie bands as you and drinks iced matcha."`}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <InArticleAd />

        {/* Features/How it works */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {[
            {
              title: isTr ? "Aura Uyum Analizi" : "Aura Compatibility",
              desc: isTr ? "Senin titreşimine tam olarak karşılık verecek o eksik parçayı enerjetik olarak hesaplar." : "Calculates the exact energetic match that will complement your specific vibe perfectly.",
              icon: "🌌"
            },
            {
              title: isTr ? "Karakter Profili" : "Trait Blueprint",
              desc: isTr ? "Ruh eşinin burcundan tut, en belirgin toksik olmayan özelliklerine kadar her detayı ifşalar." : "Reveals every detail from their likely zodiac sign to their completely non-toxic green flags.",
              icon: "📝"
            },
            {
              title: isTr ? "Karşılaşma İhtimali" : "Meeting Prediction",
              desc: isTr ? "Gelecekteki o film sahnelerindeki gibi tanışma anınızı nokta atışı tahmin eder." : "Predicts exactly the rom-com meet-cute scenario where you two will accidentally bump into each other.",
              icon: "✨"
            }
          ].map((feat, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500/40 hover:bg-white/[0.08] transition-all duration-300 group"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{feat.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-pink-300 transition-colors">{feat.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center p-10 rounded-3xl bg-gradient-to-br from-pink-950/60 to-black border border-pink-900/50 shadow-[0_0_50px_rgba(244,114,182,0.15)]"
        >
          <Sparkles className="w-10 h-10 text-pink-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
            {isTr ? "Kaderini Görmeye Hazır mısın?" : "Ready to meet your destiny?"}
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto text-lg">
            {isTr 
              ? "Ücretsiz ve anında analiz. Gerçek aşkının kim olduğunu öğren."
              : "100% Free and instant analysis. Discover who your true love really is."}
          </p>
          <Link
            href={`/${isTr ? "tr" : "en"}?feature=soulmate-radar`}
            className="inline-block px-10 py-4 rounded-full bg-white text-black font-bold tracking-wide hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
          >
            {isTr ? "Radarı Başlat" : "Launch Soulmate Radar"}
          </Link>
        </motion.div>
      </div>
      <SeoFooter />
    </div>
  );
}
