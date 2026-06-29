"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Sparkles, HeartPulse, Infinity as InfinityIcon } from "lucide-react";
import { motion } from "framer-motion";
import SeoFooter from "@/components/SeoFooter";
import FeatureSeoContent from "@/components/FeatureSeoContent";
import InArticleAd from "@/components/InArticleAd";

export default function CrushCalculatorLanding() {
  const params = useParams();
  const isTr = params?.lang === "tr";

  const stats = [
    { value: "8M+", label: isTr ? "hesaplanan crush" : "crushes calculated" },
    { value: "64%", label: isTr ? "delulu çıktı" : "were delusional" },
    { value: "< 5 sn", label: isTr ? "analiz süresi" : "< 5 sec" },
    { value: "100%", label: isTr ? "ücretsiz" : "free" },
  ];

  const scenarios = [
    {
      input: isTr ? "30 saniyede geri mesaj atıyor" : "He texts back in 30 sec",
      output: isTr ? "YZ: %78 ihtimalle seni seviyor" : "AI: 78% chance they like you",
    },
    {
      input: isTr ? "3 yıllık fotoğrafını beğendi" : "She liked your 3-year-old photo",
      output: isTr ? "Kesinlikle kaza değil" : "AI: definitely not an accident",
    },
    {
      input: isTr ? "Kahve siparişini hatırladı" : "They remembered your coffee order",
      output: isTr ? "YZ: bu aslında aşk" : "AI: this is actually love",
    },
    {
      input: isTr ? "6 saat bekletip tüm storylerine bakıyor" : "Left you on read for 6 hours but watches all your stories",
      output: isTr ? "YZ: %34 delulu uyarısı" : "AI: 34% delulu warning",
    },
  ];

  const relatedTools = [
    {
      href: `/${isTr ? "tr" : "en"}?feature=delulu-check`,
      emoji: "🤡",
      title: isTr ? "Delulu Kontrol" : "Delulu Check",
      desc: isTr ? "Kafanda mı yoksa gerçek mi?" : "Is it in your head or real?",
    },
    {
      href: `/${isTr ? "tr" : "en"}?feature=situationship-clarifier`,
      emoji: "🌀",
      title: isTr ? "Situationship Netleştirici" : "Situationship Clarifier",
      desc: isTr ? "Bu ilişki ne?" : "What even is this relationship?",
    },
    {
      href: `/${isTr ? "tr" : "en"}?feature=reply-guru`,
      emoji: "💬",
      title: isTr ? "Mesaj Gurusu" : "Reply Guru",
      desc: isTr ? "Ne yazacağını bilemiyor musun?" : "Don't know what to text?",
    },
  ];

  return (
    <div className="min-h-dvh bg-[#050510] text-white selection:bg-purple-500/30 overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-fuchsia-900/10 blur-[150px]" />
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
          <span className="text-sm font-medium tracking-widest text-purple-400 uppercase drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]">
            {isTr ? "YZ CRUSH ANALİZİ" : "AI CRUSH ANALYSIS"}
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              <InfinityIcon className="w-4 h-4" />
              <span>{isTr ? "Delulu Seviyesi: %99" : "Delulu Level: 99%"}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-500 to-pink-500">
              {isTr ? "Crush'ınla Gerçekten Oluru Var Mı?" : "Do You And Your Crush Actually Have A Chance?"}
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
              {isTr
                ? "Sana 3 gün önce attığı o emojinin ne anlama geldiğini düşünmeyi bırak. İkinizin birer fotoğrafını yükle, yapay zeka aranızdaki platonik enerjiyi okusun ve acı gerçekleri yüzüne vursun."
                : "Stop overanalyzing that emoji they sent 3 days ago. Upload both your photos, let the AI read the platonic energy between you, and give you the brutal truth."}
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${isTr ? "tr" : "en"}?feature=crush-calculator`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-bold tracking-wide hover:shadow-[0_0_30px_rgba(192,38,211,0.6)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
              >
                <HeartPulse className="w-5 h-5 animate-pulse" />
                {isTr ? "Crush Uyumu Test Et" : "Test Crush Compatibility"}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            className="flex-1 w-full max-w-sm relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 to-pink-500/30 blur-3xl rounded-full" />
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-purple-500/20 shadow-[0_0_40px_rgba(168,85,247,0.2)] glass-strong flex items-center justify-center bg-black/40">
              <div className="text-center p-6 space-y-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <HeartPulse className="w-16 h-16 text-purple-500 mx-auto drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
                </motion.div>
                <h3 className="text-xl font-black text-purple-400">{isTr ? "Uyum Sonucu" : "Compatibility Result"}</h3>
                <p className="text-sm text-white/60 font-medium leading-relaxed">
                  {isTr
                    ? `"Seni sadece ödevleri sorduğu bir 'okul arkadaşı' olarak görüyor. İleri gitme."`
                    : `"They literally just see you as the person they ask for homework answers. Do not proceed."`}
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
              className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all text-center group"
            >
              <div className="text-2xl font-black text-purple-400 group-hover:scale-110 transition-transform">
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
              title: isTr ? "Çift Vibe Taraması" : "Duo Vibe Scan",
              desc: isTr
                ? "İkinizin aurasını kıyaslayıp o elektriklenmenin gerçek mi sahte mi olduğunu anlar."
                : "Compares both your auras to detect if that spark is real or totally made up.",
              icon: "⚡",
            },
            {
              title: isTr ? "Delulu Kontrolü" : "Delulu Check",
              desc: isTr
                ? "Onun en ufak bir hareketinden çıkardığın abartılı senaryoları çürütür."
                : "Debunks all those wild scenarios you created from their smallest, meaningless actions.",
              icon: "🤡",
            },
            {
              title: isTr ? "Aksiyon Tavsiyesi" : "Actionable Advice",
              desc: isTr
                ? "Gidip açılmalı mısın yoksa sessizce unutmalı mısın? Sana net bir taktik verir."
                : "Tells you whether you should shoot your shot or silently retreat and forget about it.",
              icon: "🎯",
            },
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
                <span className="text-white/70 text-sm shrink-0">💭 {s.input}</span>
                <span className="text-purple-400 text-sm font-medium text-right">→ {s.output}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <FeatureSeoContent featureId="crush-calculator" isTr={isTr} />

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
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 hover:bg-white/[0.07] transition-all duration-300 group flex flex-col gap-2 h-full"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform inline-block">{tool.emoji}</span>
                  <span className="font-bold text-white group-hover:text-purple-300 transition-colors">{tool.title}</span>
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
          className="text-center p-10 rounded-3xl bg-gradient-to-br from-purple-950/60 to-black border border-purple-900/50 shadow-[0_0_50px_rgba(168,85,247,0.15)]"
        >
          <Sparkles className="w-10 h-10 text-purple-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
            {isTr ? "Gerçeklerle Yüzleşmeye Hazır mısın?" : "Ready for the reality check?"}
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto text-lg">
            {isTr
              ? "%100 Ücretsiz. Gizlilik garantili. Arkadaş grubuna rezil olmadan önce gerçeği öğren."
              : "100% Free. Completely private. Find out the truth before you embarrass yourself in the group chat."}
          </p>
          <Link
            href={`/${isTr ? "tr" : "en"}?feature=crush-calculator`}
            className="inline-block px-10 py-4 rounded-full bg-white text-black font-bold tracking-wide hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
          >
            {isTr ? "VibeCheckr'ı Başlat" : "Launch VibeCheckr"}
          </Link>
        </motion.div>
      </div>
      <SeoFooter />
    </div>
  );
}
