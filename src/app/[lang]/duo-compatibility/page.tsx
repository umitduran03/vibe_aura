"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Users, Sparkles, HeartCrack, Heart, Zap, CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import SeoFooter from "@/components/SeoFooter";
import FeatureSeoContent from "@/components/FeatureSeoContent";
import InArticleAd from "@/components/InArticleAd";

const stats = [
  { value: "3M+", descEn: "duos analyzed", descTr: "ikili analiz edildi" },
  { value: "67%", descEn: "were toxic duos", descTr: "toksik ikili çıktı" },
  { value: "< 10 sec", descEn: "to get your result", descTr: "sonuç süresi" },
  { value: "100%", descEn: "free forever", descTr: "ücretsiz, her zaman" },
];

const scenarios = [
  {
    emoji: "👯",
    labelEn: "Best friends forever → AI: 78% toxic duo energy, 22% support",
    labelTr: "Sonsuza dek en iyi arkadaşlar → YZ: %78 toksik ikili enerjisi, %22 destek",
  },
  {
    emoji: "💑",
    labelEn: "New couple → 91% chaos potential, 9% stability",
    labelTr: "Yeni çift → %91 kaos potansiyeli, %9 istikrar",
  },
  {
    emoji: "👨‍👧",
    labelEn: "Siblings → AI confirmed you have competitive sibling energy",
    labelTr: "Kardeşler → YZ, rekabetçi kardeş enerjisi taşıdığınızı doğruladı",
  },
  {
    emoji: "💼",
    labelEn: "Coworkers → AI: one of you is carrying the team",
    labelTr: "İş arkadaşları → YZ: biriniz takımı sırtlıyor",
  },
];

const relatedTools = [
  {
    slug: "aura-battle",
    emoji: "⚔️",
    titleEn: "Aura Battle",
    titleTr: "Aura Savaşı",
    descEn: "Pit your aura against someone else's and see who wins",
    descTr: "Auranı bir başkasıyla karşılaştır, kim kazanır gör",
  },
  {
    slug: "bff-vibe-check",
    emoji: "🤝",
    titleEn: "BFF Vibe Check",
    titleTr: "En İyi Arkadaş Vibe Testi",
    descEn: "Find out if your friendship energy is aligned or chaotic",
    descTr: "Arkadaşlık enerjinizin uyumlu mu kaotik mi olduğunu öğren",
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

const redGreenFlags = [
  {
    type: "red",
    icon: <XCircle className="w-5 h-5" />,
    titleEn: "Red flags",
    titleTr: "Kırmızı Bayraklar",
    itemsEn: [
      "Competes with you",
      "Drains your energy",
      "Talks behind your back",
    ],
    itemsTr: [
      "Seninle rekabet etmesi",
      "Enerjini sömürmesi",
      "Arkandan konuşması",
    ],
  },
  {
    type: "green",
    icon: <CheckCircle className="w-5 h-5" />,
    titleEn: "Green flags",
    titleTr: "Yeşil Bayraklar",
    itemsEn: [
      "Hypes you up",
      "Mutual effort",
      "Safe space",
    ],
    itemsTr: [
      "Seni yükseltmesi",
      "Karşılıklı çaba",
      "Güvenli alan olması",
    ],
  },
];

export default function DuoCompatibilityLanding() {
  const params = useParams();
  const lang = (params?.lang as string) ?? "en";
  const isTr = lang === "tr";

  return (
    <div className="min-h-dvh bg-[#050510] text-white selection:bg-pink-500/30 overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-600/20 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[150px]" />
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
          <span className="text-sm font-medium tracking-widest text-pink-400 uppercase drop-shadow-[0_0_5px_rgba(236,72,153,0.5)]">
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(236,72,153,0.2)]">
              <Heart className="w-4 h-4 fill-pink-400" />
              <span>{isTr ? "İlişki Kimyası YZ" : "Relationship Chemistry AI"}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
              {isTr ? "YZ İkili Uyumluluk Testi" : "AI Duo Compatibility Test"}
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
              {isTr 
                ? "Ruh eşi misiniz yoksa yürüyen bir felaket mi? İki selfie yükleyin ve yapay zekamız enerji uyumunuzu, aura birleşiminizi ve acımasız ilişki tahmininizi hesaplasın."
                : "Are you soulmates or a walking disaster? Upload two selfies and our AI will calculate your energetic match, aura blend, and brutal relationship forecast."}
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${lang}?feature=duo-compatibility`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold tracking-wide hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
              >
                <Zap className="w-5 h-5 animate-pulse" />
                {isTr ? "Uyumluluğunu Test Et" : "Test Your Compatibility"}
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            className="flex-1 w-full max-w-sm relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-purple-500/20 blur-3xl rounded-full" />
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-pink-500/20 shadow-[0_0_40px_rgba(236,72,153,0.15)] glass-strong flex flex-col items-center justify-center bg-black/40">
              <div className="flex items-center justify-center gap-2 mb-6">
                 <motion.div 
                   animate={{ scale: [1, 1.1, 1], x: [0, 5, 0] }}
                   transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                   className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 opacity-80 mix-blend-screen" 
                 />
                 <motion.div 
                   animate={{ scale: [1, 1.1, 1], x: [0, -5, 0] }}
                   transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                   className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 opacity-80 mix-blend-screen" 
                 />
              </div>
              <div className="text-center p-6 space-y-4">
                <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]">
                  {isTr ? "%92 Uyum" : "92% Match"}
                </h3>
                <p className="text-sm text-white/70 font-medium leading-relaxed">
                  {isTr 
                    ? `"Kaotik ama inanılmaz çekici bir bağ. Hiçbir şey yüzünden çıkan dramatik kavgalarla harmanlanmış yoğun bir sadakat sizi bekliyor."`
                    : `"A chaotic but highly magnetic bond. Expect intense loyalty mixed with dramatic arguments over nothing."`}
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
              className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500/30 transition-all text-center group"
            >
              <div className="text-2xl font-black text-pink-400 group-hover:scale-110 transition-transform">{stat.value}</div>
              <div className="text-xs text-white/50 mt-1 leading-snug">{isTr ? stat.descTr : stat.descEn}</div>
            </motion.div>
          ))}
        </motion.div>

        <InArticleAd />

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {[
            {
              title: isTr ? "Aura Harmanlama" : "Aura Blending",
              desc: isTr ? "Bireysel enerjilerinizin ve mikro ifadelerinizin birbiriyle tam olarak nasıl karıştığını görün." : "See exactly how your individual energies and micro-expressions mix together.",
              icon: "🔮"
            },
            {
              title: isTr ? "Platonik mi Romantik mi?" : "Platonic or Romantic?",
              desc: isTr ? "İlişki türünüzü seçin. Crush'ınız, sevgiliniz veya sadece kankanızı test etmek için mükemmel." : "Select your relationship type. Works for crushes, couples, or just testing your BFF.",
              icon: "👯‍♀️"
            },
            {
              title: isTr ? "Aşırı Dürüst" : "Brutally Honest",
              desc: isTr ? "Tatlı yalanlar yok. Eğer toksik bir eşleşmeyse, yapay zeka size anında kaçmanızı söyleyecek." : "No sugarcoating. If it's a toxic match, the AI will tell you to run.",
              icon: "🏃‍♂️"
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

        {/* Scenario Examples Section */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
              {isTr ? "Gerçek İkili Analiz Örnekleri" : "Real Duo Analysis Examples"}
            </h2>
            <p className="text-white/50">
              {isTr ? "Bunlar tanıdık geldi mi? Yapay zeka gerçeği söyler." : "Sound familiar? The AI will tell you the truth."}
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
                <div className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-black tracking-wide bg-pink-500/20 text-pink-400 border border-pink-500/30">
                  🔮 {isTr ? 'ANALİZ' : 'ANALYZED'}
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
              href={`/${lang}?feature=duo-compatibility`}
              className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 text-sm font-semibold transition-colors"
            >
              <Zap className="w-4 h-4" />
              {isTr ? "İkilimi analiz et →" : "Analyze my duo →"}
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
              {isTr ? "Duo Compatibility'den sonra bunlara da bak" : "Also check these after your compatibility test"}
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
                  className="block p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500/30 hover:bg-white/[0.07] transition-all duration-300 group h-full"
                >
                  <div className="text-2xl mb-3 group-hover:scale-110 transition-transform">{tool.emoji}</div>
                  <h3 className="text-sm font-bold text-white mb-1 group-hover:text-pink-300 transition-colors">
                    {isTr ? tool.titleTr : tool.titleEn}
                  </h3>
                  <p className="text-xs text-white/50">{isTr ? tool.descTr : tool.descEn}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── RED vs GREEN FLAGS ── */}
        <div className="mb-24 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
              {isTr ? "Sinyalleri Oku" : "Read the Signals"}
            </h2>
            <p className="text-white/50">
              {isTr ? "Yapay zeka her iki tarafı da analiz eder" : "The AI analyzes both sides of the story"}
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {redGreenFlags.map((side, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 rounded-2xl border transition-all ${
                  side.type === "red"
                    ? "bg-rose-950/30 border-rose-500/20 hover:border-rose-500/40"
                    : "bg-emerald-950/30 border-emerald-500/20 hover:border-emerald-500/40"
                }`}
              >
                <div className={`flex items-center gap-2 mb-5 font-bold ${
                  side.type === "red" ? "text-rose-400" : "text-emerald-400"
                }`}>
                  {side.icon}
                  <h3 className="text-base">{isTr ? side.titleTr : side.titleEn}</h3>
                </div>
                <ul className="space-y-3">
                  {(isTr ? side.itemsTr : side.itemsEn).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className={`mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full ${
                        side.type === "red" ? "bg-rose-500" : "bg-emerald-500"
                      }`} />
                      <span className="text-sm text-white/70 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <FeatureSeoContent featureId="duo-compatibility" isTr={isTr} />

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center p-10 rounded-3xl bg-gradient-to-br from-purple-950/60 to-black border border-pink-900/50 shadow-[0_0_50px_rgba(236,72,153,0.15)]"
        >
          <Sparkles className="w-10 h-10 text-pink-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
            {isTr ? "Kimyanızı merak mı ediyorsunuz?" : "Curious about your chemistry?"}
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto text-lg">
            {isTr 
              ? "Gerçek aşk mı yoksa ortak bir halüsinasyon (delulu) mu öğrenin. Ücretsiz, anında ve korkutucu derecede isabetli."
              : "Find out if it's true love or just a shared delusion. Free, instant, and terrifyingly accurate."}
          </p>
          <Link
            href={`/${lang}?feature=duo-compatibility`}
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
