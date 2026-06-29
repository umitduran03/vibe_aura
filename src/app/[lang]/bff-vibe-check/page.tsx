"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Sparkles, Users, PartyPopper } from "lucide-react";
import { motion } from "framer-motion";
import SeoFooter from "@/components/SeoFooter";
import FeatureSeoContent from "@/components/FeatureSeoContent";
import InArticleAd from "@/components/InArticleAd";

export default function BffVibeCheckLanding() {
  const params = useParams();
  const isTr = params?.lang === "tr";

  const stats = [
    { value: "6M+", label: isTr ? "analiz edilen arkadaşlık" : "friendships analyzed" },
    { value: "71%", label: isTr ? "kaotik ikili" : "are chaotic besties" },
    { value: "< 10 sn", label: isTr ? "analiz süresi" : "< 10 sec" },
    { value: "100%", label: isTr ? "ücretsiz" : "free" },
  ];

  const scenarios = [
    {
      input: isTr ? "Sen ve en yakın arkadaşın" : "You and your bestie",
      output: isTr ? "YZ: %94 kaotik ikili, %6 sorumlu yetişkin" : "AI: 94% chaotic duo, 6% responsible adult",
    },
    {
      input: isTr ? "Sen ve iş arkadaşın" : "You and your coworker",
      output: isTr ? "Aslında çok iyi arkadaşsınız, YZ gizli dostluğu fark etti" : "Actually besties, AI detected secret friendship",
    },
    {
      input: isTr ? "Sen ve kardeşin" : "You and your sibling",
      output: isTr ? "YZ annenin her konuda haklı olduğunu doğruladı" : "AI confirmed your mom is right about everything",
    },
    {
      input: isTr ? "Sen ve eski arkadaşın" : "You and your ex-bestie",
      output: isTr ? "YZ her şeyin bozulduğu anı tespit etti" : "AI detected the moment it all went wrong",
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
      href: `/${isTr ? "tr" : "en"}?feature=aura-battle`,
      emoji: "⚔️",
      title: isTr ? "Aura Savaşı" : "Aura Battle",
      desc: isTr ? "Kimin aurası daha güçlü?" : "Whose aura wins the battle?",
    },
    {
      href: `/${isTr ? "tr" : "en"}?feature=ai-roast-me`,
      emoji: "🔥",
      title: isTr ? "Beni Yerden Ye" : "AI Roast Me",
      desc: isTr ? "YZ seni acımasızca eleştirsin" : "Let AI brutally roast you",
    },
  ];

  return (
    <div className="min-h-dvh bg-[#050510] text-white selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/20 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[150px]" />
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
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 transition-all cursor-pointer"
            aria-label="Go back home"
          >
            <ArrowLeft className="w-5 h-5 text-white/70" />
          </Link>
          <span className="text-sm font-medium tracking-widest text-cyan-400 uppercase drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
            {isTr ? "YZ KANKA TESTİ" : "AI BFF TEST"}
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(34,211,238,0.2)]">
              <PartyPopper className="w-4 h-4" />
              <span>{isTr ? "Kaos İkilisi" : "Chaotic Duo"}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">
              {isTr ? "Gerçek BFF misiniz Yoksa Sadece Dedikodu Ortağı mı?" : "True BFFs or Just Gossip Partners?"}
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
              {isTr
                ? "İkinizin bir fotoğrafını yükle ve yapay zeka bu arkadaşlığın ne kadar derin, toksik veya eğlenceli bir kaos olduğunu saniyeler içinde analiz etsin."
                : "Upload a pic of you two and let the AI analyze exactly how deep, toxic, or hilariously chaotic your friendship really is."}
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${isTr ? "tr" : "en"}?feature=bff-vibe-check`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold tracking-wide hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
              >
                <Users className="w-5 h-5 animate-pulse" />
                {isTr ? "BFF Uyumu Test Et" : "Test BFF Vibe"}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            className="flex-1 w-full max-w-sm relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 to-indigo-500/30 blur-3xl rounded-full" />
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-cyan-500/20 shadow-[0_0_40px_rgba(34,211,238,0.2)] glass-strong flex items-center justify-center bg-black/40">
              <div className="text-center p-6 space-y-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Users className="w-16 h-16 text-cyan-500 mx-auto drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
                </motion.div>
                <h3 className="text-xl font-black text-cyan-400">{isTr ? "İkili Dinamik" : "Duo Dynamic"}</h3>
                <p className="text-sm text-white/60 font-medium leading-relaxed">
                  {isTr
                    ? `"Biri mantıklı diğeri yürüyen felaket. Ortamlarda birbirinizi gazlamaktan başka bir işe yaramıyorsunuz."`
                    : `"One is the mom friend, the other is a walking disaster. You literally just enable each other's bad choices."`}
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
              className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all text-center group"
            >
              <div className="text-2xl font-black text-cyan-400 group-hover:scale-110 transition-transform">
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
              title: isTr ? "Kaos Seviyesi" : "Chaos Level",
              desc: isTr
                ? "Beraberken dışarıya yaydığınız o yıkıcı enerjinin yüzdesini ölçer."
                : "Measures the exact percentage of destructive energy you emit when together.",
              icon: "🌪️",
            },
            {
              title: isTr ? "Gizli Roller" : "Secret Roles",
              desc: isTr
                ? "Grupta kimin akıl hocası kimin sorunlu çocuk olduğunu acımasızca yüzünüze vurur."
                : "Brutally assigns who is the mastermind and who is the problematic child.",
              icon: "🎭",
            },
            {
              title: isTr ? "Dedikodu Uyumu" : "Gossip Sync",
              desc: isTr
                ? "Sadece bakışarak anlaştığınız o dedikodu telepatisinin ne kadar güçlü olduğunu anlar."
                : "Understands how strong your eye-contact gossip telepathy really is.",
              icon: "👀",
            },
          ].map((feat, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={i}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.08] transition-all duration-300 group"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{feat.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">{feat.title}</h3>
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
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-5 rounded-2xl bg-white/5 border border-white/10"
              >
                <span className="text-white/70 text-sm font-medium">📸 {s.input}</span>
                <span className="text-cyan-400 text-sm font-bold sm:text-right">→ {s.output}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <FeatureSeoContent featureId="bff-vibe-check" isTr={isTr} />

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
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-white/[0.07] transition-all duration-300 group flex flex-col gap-2 h-full"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform inline-block">{tool.emoji}</span>
                  <span className="font-bold text-white group-hover:text-cyan-300 transition-colors">{tool.title}</span>
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
          className="text-center p-10 rounded-3xl bg-gradient-to-br from-cyan-950/60 to-black border border-cyan-900/50 shadow-[0_0_50px_rgba(34,211,238,0.15)]"
        >
          <Sparkles className="w-10 h-10 text-cyan-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
            {isTr ? "Kankanı Test Etmeye Hazır mısın?" : "Ready to test your bestie?"}
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto text-lg">
            {isTr
              ? "Ücretsiz. Anında sonuç. Sonucu hikayeye atıp onu etiketleme garantili."
              : "Free. Instant. Guaranteed to make you tag them on your story immediately."}
          </p>
          <Link
            href={`/${isTr ? "tr" : "en"}?feature=bff-vibe-check`}
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
