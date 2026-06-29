"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Sparkles, BatteryCharging, Zap } from "lucide-react";
import { motion } from "framer-motion";
import SeoFooter from "@/components/SeoFooter";
import FeatureSeoContent from "@/components/FeatureSeoContent";
import InArticleAd from "@/components/InArticleAd";

const stats = [
  { value: "2M+", descEn: "moods reset", descTr: "mod sıfırlandı" },
  { value: "94%", descEn: "felt better instantly", descTr: "anında daha iyi hissetti" },
  { value: "< 5 sec", descEn: "to reset your vibe", descTr: "vibe sıfırlama süresi" },
  { value: "100%", descEn: "free forever", descTr: "ücretsiz, her zaman" },
];

const scenarios = [
  {
    emoji: "🎉",
    labelEn: "Pre-party anxiety → AI hype mode activated, 100% main character energy",
    labelTr: "Parti öncesi anksiyete → YZ hype modu aktifleşti, %100 ana karakter enerjisi",
  },
  {
    emoji: "💔",
    labelEn: "Post-breakup spiral → AI delivered brutal but necessary reality check",
    labelTr: "Ayrılık sonrası çöküş → YZ acı ama gerekli gerçeklik tokadını verdi",
  },
  {
    emoji: "😰",
    labelEn: "Sunday scaries → AI reset in 5 seconds flat",
    labelTr: "Pazar sıkıntısı → YZ 5 saniyede sıfırladı",
  },
  {
    emoji: "🤯",
    labelEn: "Friend drama overload → AI cleared the vibe immediately",
    labelTr: "Arkadaş draması yüklemesi → YZ vibe'ı anında temizledi",
  },
];

const relatedTools = [
  {
    slug: "delulu-check",
    emoji: "🧠",
    titleEn: "Delulu Check",
    titleTr: "Delulu Check",
    descEn: "Find out if you're being delusional about your situation",
    descTr: "Durumun hakkında delulu olup olmadığını öğren",
  },
  {
    slug: "reply-guru",
    emoji: "💬",
    titleEn: "Reply Guru",
    titleTr: "Mesaj Gurusu",
    descEn: "Get the perfect response to their confusing texts",
    descTr: "Kafa karıştıran mesajlarına mükemmel cevabı al",
  },
  {
    slug: "situationship-clarifier",
    emoji: "🌫️",
    titleEn: "Situationship Clarifier",
    titleTr: "Situationship Çözücü",
    descEn: "Find out if you're in a real relationship or just a placeholder",
    descTr: "Gerçek ilişkide misin yoksa yedek misin öğren",
  },
];

export default function MoodResetLanding() {
  const params = useParams();
  const lang = (params?.lang as string) ?? "en";
  const isTr = lang === "tr";

  return (
    <div className="min-h-dvh bg-[#050510] text-white selection:bg-emerald-500/30 overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-900/20 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-teal-900/10 blur-[150px]" />
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
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-500/30 transition-all cursor-pointer"
            aria-label="Go back home"
          >
            <ArrowLeft className="w-5 h-5 text-white/70" />
          </Link>
          <span className="text-sm font-medium tracking-widest text-emerald-400 uppercase drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]">
            {isTr ? "YZ İFŞA RADARI" : "AI Feature Spotlight"}
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(52,211,153,0.2)]">
              <span className="text-base leading-none">🔋</span>
              <span>{isTr ? "Enerjini Fulleyelim" : "Recharge Your Energy"}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500">
              {isTr ? "Mod Sıfırlama YZ" : "Mood Reset AI"}
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
              {isTr 
                ? "Kötü bir gün mü geçiriyorsun? Sadece seni onaylayan arkadaşlarına sızlanmayı bırak. Kendine gelmek ve vibe'ını düzeltmek için yapay zekadan acımasızca dürüst bir gerçeklik tokatı ye."
                : "Having a bad day? Stop complaining to friends who just agree with you. Get a brutally honest AI wake-up call to snap out of it and fix your vibe."}
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${lang}?feature=mood-reset`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold tracking-wide hover:shadow-[0_0_30px_rgba(5,150,105,0.6)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
              >
                <BatteryCharging className="w-5 h-5 animate-pulse" />
                {isTr ? "Modumu Sıfırla" : "Reset My Mood"}
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            className="flex-1 w-full max-w-sm relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/30 to-teal-500/30 blur-3xl rounded-full" />
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-emerald-500/20 shadow-[0_0_40px_rgba(52,211,153,0.2)] glass-strong flex items-center justify-center bg-black/40">
              <div className="text-center p-6 space-y-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-7xl drop-shadow-[0_0_15px_rgba(52,211,153,0.8)]"
                >
                  🔋
                </motion.div>
                <h3 className="text-xl font-black text-emerald-400">{isTr ? "Enerji Tükendi" : "Energy Depleted"}</h3>
                <p className="text-sm text-white/60 font-medium leading-relaxed">
                  {isTr 
                    ? `"Ufak bir aksiliğin mükemmel geçebilecek koca bir 24 saati mahvetmesine izin veriyorsun. Kalk ayağa."`
                    : `"You are letting a minor inconvenience ruin a perfectly good 24 hours. Stand up."`}
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
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all text-center group"
            >
              <div className="text-2xl font-black text-emerald-400 group-hover:scale-110 transition-transform">{stat.value}</div>
              <div className="text-xs text-white/50 mt-1 leading-snug">{isTr ? stat.descTr : stat.descEn}</div>
            </motion.div>
          ))}
        </motion.div>

        <InArticleAd />

        {/* Features/How it works */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {[
            {
              title: isTr ? "Acı Gerçekler" : "Tough Love",
              desc: isTr ? "Yapay zeka tükenmiş auranı okur ve tam olarak duyman gereken o acı gerçeği yüzüne çarpar." : "The AI reads your exhausted aura and delivers exactly the harsh truth you need to hear.",
              icon: "🗣️"
            },
            {
              title: isTr ? "Perspektif Değişimi" : "Perspective Shift",
              desc: isTr ? "Seni anında o anki mental çöküntünden uzaklaştırır ve ayaklarını yere bastırır." : "Instantly zooms you out of your current mental breakdown and grounds you.",
              icon: "🌍"
            },
            {
              title: isTr ? "Anında Şarj" : "Instant Recharge",
              desc: isTr ? "Uygulamadan yenilenmiş bir main character (ana karakter) enerjisiyle ayrıl." : "Leave the app with a restored sense of main character energy.",
              icon: "⚡"
            }
          ].map((feat, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/40 hover:bg-white/[0.08] transition-all duration-300 group"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{feat.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">{feat.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Scenario Examples Section */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
              {isTr ? "Gerçek Mod Sıfırlama Örnekleri" : "Real Mood Reset Examples"}
            </h2>
            <p className="text-white/50">
              {isTr ? "Bunlar tanıdık geldi mi? Yapay zeka vibe'ını düzeltir." : "Sound familiar? The AI will fix your vibe."}
            </p>
          </motion.div>
          <div className="space-y-3">
            {scenarios.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{s.emoji}</span>
                  <p className="text-sm text-white/80">{isTr ? s.labelTr : s.labelEn}</p>
                </div>
                <div className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-black tracking-wide bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ⚡ RESET
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-6"
          >
            <Link
              href={`/${lang}?feature=mood-reset`}
              className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-semibold transition-colors"
            >
              <Zap className="w-4 h-4" />
              {isTr ? "Modumu sıfırla →" : "Reset my mood →"}
            </Link>
          </motion.div>
        </div>

        {/* Related Tools Section */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-black text-white mb-2">
              {isTr ? "İlgili Araçlar" : "Related Tools"}
            </h2>
            <p className="text-white/40 text-sm">
              {isTr ? "Mood Reset'ten sonra bunlara da bak" : "Also check these after your mood reset"}
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-4">
            {relatedTools.map((tool, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={`/${lang}/${tool.slug}`}
                  className="block p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/30 hover:bg-white/[0.07] transition-all duration-300 group h-full"
                >
                  <div className="text-2xl mb-3 group-hover:scale-110 transition-transform">{tool.emoji}</div>
                  <h3 className="text-sm font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">
                    {isTr ? tool.titleTr : tool.titleEn}
                  </h3>
                  <p className="text-xs text-white/50">{isTr ? tool.descTr : tool.descEn}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <FeatureSeoContent featureId="mood-reset" isTr={isTr} />

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center p-10 rounded-3xl bg-gradient-to-br from-emerald-950/60 to-black border border-emerald-900/50 shadow-[0_0_50px_rgba(5,150,105,0.15)]"
        >
          <Sparkles className="w-10 h-10 text-teal-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
            {isTr ? "Surat asmayı bırakmaya hazır mısın?" : "Ready to stop sulking?"}
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto text-lg">
            {isTr 
              ? "Bir fotoğraf yükle ve yapay zekanın içindeki o negatifliği söküp atmasına izin ver."
              : "Upload a selfie and let the AI roast the negativity straight out of your system."}
          </p>
          <Link
            href={`/${lang}?feature=mood-reset`}
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
