"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Heart, Sparkles, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";
import SeoFooter from "@/components/SeoFooter";
import FeatureSeoContent from "@/components/FeatureSeoContent";
import InArticleAd from "@/components/InArticleAd";

export default function SoulmateRadarLanding() {
  const params = useParams();
  const isTr = params?.lang === "tr";

  const stats = [
    { value: "1M+", label: isTr ? "bulunan ruh eşi" : "soulmates found" },
    { value: "89%", label: isTr ? "ideal tipiyle eşleşti" : "matched their ideal type" },
    { value: "< 10 sn", label: isTr ? "analiz süresi" : "< 10 sec" },
    { value: "100%", label: isTr ? "ücretsiz" : "free" },
  ];

  const scenarios = [
    {
      input: isTr ? "Senin özelliklerin: kaotik, aşırı düşünen, sadık" : "Your stats: chaotic, overthinking, loyal",
      output: isTr ? "YZ eşleşti: sakin ama maceracı" : "AI matched: calm but adventurous",
    },
    {
      input: isTr ? "Viben: gece 2 enerjisi, niş müzik" : "Your vibe: 2am energy, niche music",
      output: isTr ? "YZ: ruh eşin muhtemelen bir kitapçıda" : "AI: your soulmate is probably at a bookstore",
    },
    {
      input: isTr ? "Kırmızı bayraklardan: bağlılık sorunları" : "Red flags you have: commitment issues",
      output: isTr ? "YZ: ruh eşin daha da beter, birbirinizi dengeleyeceksiniz" : "AI: your soulmate is even worse, you'll cancel each other out",
    },
    {
      input: isTr ? "Az ilgi isteyen biri istiyorsun" : "You want someone low-maintenance",
      output: isTr ? "YZ: var ama hep yanlış olanları seçiyorsun" : "AI: they're out there but you keep choosing the wrong ones",
    },
  ];

  const relatedTools = [
    {
      href: `/${isTr ? "tr" : "en"}?feature=duo-compatibility`,
      emoji: "💞",
      title: isTr ? "İkili Uyum" : "Duo Compatibility",
      desc: isTr ? "İki kişinin enerjisini kıyasla" : "Compare two people's energy",
    },
    {
      href: `/${isTr ? "tr" : "en"}?feature=crush-calculator`,
      emoji: "💘",
      title: isTr ? "Crush Hesaplayıcı" : "Crush Calculator",
      desc: isTr ? "Crush'ınla şansın var mı?" : "Do you have a shot?",
    },
    {
      href: `/${isTr ? "tr" : "en"}?feature=ex-compatibility`,
      emoji: "💔",
      title: isTr ? "Eski Uyumu" : "Ex Compatibility",
      desc: isTr ? "Eski sevgilini gerçekten unuttun mu?" : "Did you ever really move on?",
    },
  ];

  return (
    <div className="min-h-dvh bg-[#050510] text-white selection:bg-pink-500/30 overflow-x-hidden">
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
        <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
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
                  {isTr
                    ? `"Kitapçıda seninle aynı indie gruba tapan ve iced americano içen o golden retriever enerjili kişi."`
                    : `"A golden retriever energy who loves the exact same indie bands as you and drinks iced matcha."`}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500/30 transition-all text-center group"
            >
              <div className="text-2xl font-black text-pink-400 group-hover:scale-110 transition-transform">
                {stat.value}
              </div>
              <div className="text-xs text-white/50 mt-1 leading-tight">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <InArticleAd />

        {/* Features / How it works */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: isTr ? "Aura Uyum Analizi" : "Aura Compatibility",
              desc: isTr
                ? "Senin titreşimine tam olarak karşılık verecek o eksik parçayı enerjetik olarak hesaplar."
                : "Calculates the exact energetic match that will complement your specific vibe perfectly.",
              icon: "🌌",
            },
            {
              title: isTr ? "Karakter Profili" : "Trait Blueprint",
              desc: isTr
                ? "Ruh eşinin burcundan tut, en belirgin toksik olmayan özelliklerine kadar her detayı ifşalar."
                : "Reveals every detail from their likely zodiac sign to their completely non-toxic green flags.",
              icon: "📝",
            },
            {
              title: isTr ? "Karşılaşma İhtimali" : "Meeting Prediction",
              desc: isTr
                ? "Gelecekteki o film sahnelerindeki gibi tanışma anınızı nokta atışı tahmin eder."
                : "Predicts exactly the rom-com meet-cute scenario where you two will accidentally bump into each other.",
              icon: "✨",
            },
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

        {/* Scenario Examples Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-black text-white mb-2">
            {isTr ? "Gerçek Örnekler" : "Real Scenarios"}
          </h2>
          <p className="text-white/50 text-sm mb-6">
            {isTr ? "Kullanıcıların aldığı gerçek sonuçlardan örnekler" : "Examples from real user results"}
          </p>
          <div className="space-y-3">
            {scenarios.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/10"
              >
                <span className="text-white/70 text-sm shrink-0">✨ {s.input}</span>
                <span className="text-pink-400 text-sm font-medium text-right">→ {s.output}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <FeatureSeoContent featureId="soulmate-radar" isTr={isTr} />

        {/* Related Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-black text-white mb-2">
            {isTr ? "Benzer Araçlar" : "Related Tools"}
          </h2>
          <p className="text-white/50 text-sm mb-6">
            {isTr ? "Bunları da beğenebilirsin" : "You might also like these"}
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {relatedTools.map((tool, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={tool.href}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500/30 hover:bg-white/[0.07] transition-all duration-300 group flex flex-col gap-2 h-full"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform inline-block">{tool.emoji}</span>
                  <span className="font-bold text-white group-hover:text-pink-300 transition-colors">{tool.title}</span>
                  <span className="text-white/50 text-sm leading-relaxed">{tool.desc}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

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
