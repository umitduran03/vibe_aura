"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Skull, Sparkles, AlertTriangle, ExternalLink, CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import InArticleAd from "@/components/InArticleAd";
import SeoFooter from "@/components/SeoFooter";
import FeatureSeoContent from "@/components/FeatureSeoContent";

const redGreenFlags = [
  {
    type: "red",
    icon: <XCircle className="w-5 h-5" />,
    titleEn: "Red flags",
    titleTr: "Kırmızı Bayraklar",
    itemsEn: [
      "Gaslighting",
      "Love bombing",
      "Shifting blame",
    ],
    itemsTr: [
      "Gaslighting (Manipülasyon)",
      "Aşk bombardımanı (Love bombing)",
      "Suçu sana atması",
    ],
  },
  {
    type: "green",
    icon: <CheckCircle className="w-5 h-5" />,
    titleEn: "Green flags",
    titleTr: "Yeşil Bayraklar",
    itemsEn: [
      "Takes accountability",
      "Respects boundaries",
      "Consistent",
    ],
    itemsTr: [
      "Sorumluluk alması",
      "Sınırlarına saygı duyması",
      "Tutarlı davranması",
    ],
  },
];

export default function ToxicExScannerLanding() {
  const params = useParams();
  const isTr = params?.lang === "tr";

  const stats = isTr
    ? [
        { value: "3M+", label: "Ex Tarandı" },
        { value: "%94", label: "En az 1 red flag çıktı" },
        { value: "Anlık", label: "Sonuçlar" },
        { value: "%100", label: "Ücretsiz" },
      ]
    : [
        { value: "3M+", label: "Exes Scanned" },
        { value: "94%", label: "Had at least 1 red flag" },
        { value: "Instant", label: "Results" },
        { value: "100%", label: "Free" },
      ];

  const scenarios = isTr
    ? [
        {
          scenario: "Fotoğraf yüklendi",
          verdict: "YZ tespit etti: ekmek kırıntısı bırakma, aşk bombardımanı, gaslighting",
          badge: "3 Red Flag 🚩🚩🚩",
          badgeColor: "text-red-400 border-red-500/40 bg-red-500/10",
        },
        {
          scenario: "Sınır koyduğunda 'Çok hassassın' dedi",
          verdict: "Bu gaslighting. Çok hassas olan sen değilsin.",
          badge: "Gaslighting",
          badgeColor: "text-rose-400 border-rose-500/40 bg-rose-500/10",
        },
        {
          scenario: "Her acı yorumdan sonra 'Şaka yapıyordum' dedi",
          verdict: "Şaka maskeli kontrol. Klasik toksik davranış.",
          badge: "Toksik 🚩",
          badgeColor: "text-orange-400 border-orange-500/40 bg-orange-500/10",
        },
        {
          scenario: "Mesajları iyi ama davranışları...",
          verdict: "🚩🚩🚩 — Onu değil, davranışlarını gör.",
          badge: "Eylemler Konuşuyor",
          badgeColor: "text-amber-400 border-amber-500/40 bg-amber-500/10",
        },
      ]
    : [
        {
          scenario: "Photo uploaded",
          verdict: "AI detected: breadcrumbing, love bombing, gaslighting",
          badge: "3 Red Flags 🚩🚩🚩",
          badgeColor: "text-red-400 border-red-500/40 bg-red-500/10",
        },
        {
          scenario: "They said 'you are too sensitive' when you set a boundary",
          verdict: "That's gaslighting. You're not too sensitive.",
          badge: "Gaslighting",
          badgeColor: "text-rose-400 border-rose-500/40 bg-rose-500/10",
        },
        {
          scenario: "'I was joking' after every hurtful comment",
          verdict: "Control masked as humor. Classic toxic behavior.",
          badge: "Toxic 🚩",
          badgeColor: "text-orange-400 border-orange-500/40 bg-orange-500/10",
        },
        {
          scenario: "Their texts are fine but their actions...",
          verdict: "🚩🚩🚩 — Watch what they do, not what they say.",
          badge: "Actions Speak",
          badgeColor: "text-amber-400 border-amber-500/40 bg-amber-500/10",
        },
      ];

  const relatedTools = isTr
    ? [
        {
          href: "/tr/situationship-clarifier",
          title: "Situationship Çözücü",
          desc: "Hâlâ 'ne olduğunu' bilmiyor musun? YZ seni aydınlatsın.",
          emoji: "🤡",
          color: "hover:border-purple-500/40",
        },
        {
          href: "/tr/delulu-check",
          title: "Delulu Check",
          desc: "Onun için hayal mi kuruyorsun yoksa gerçekten bir şans var mı?",
          emoji: "🌙",
          color: "hover:border-pink-500/40",
        },
        {
          href: "/tr/profile-autopsy",
          title: "Profil Otopsisi",
          desc: "Sosyal medya profilini YZ ile analiz et ve gerçeği öğren.",
          emoji: "🔬",
          color: "hover:border-cyan-500/40",
        },
      ]
    : [
        {
          href: "/en/situationship-clarifier",
          title: "Situationship Clarifier",
          desc: "Still don't know 'what you are'? Let AI clarify the situationship.",
          emoji: "🤡",
          color: "hover:border-purple-500/40",
        },
        {
          href: "/en/delulu-check",
          title: "Delulu Check",
          desc: "Are you manifesting or just delusional about this person?",
          emoji: "🌙",
          color: "hover:border-pink-500/40",
        },
        {
          href: "/en/profile-autopsy",
          title: "Profile Autopsy",
          desc: "AI analyzes their social media profile and exposes the truth.",
          emoji: "🔬",
          color: "hover:border-cyan-500/40",
        },
      ];

  return (
    <div className="min-h-dvh bg-[#050510] text-white selection:bg-red-500/30 overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-red-900/20 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-orange-900/10 blur-[150px]" />
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
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-red-500/30 transition-all cursor-pointer"
            aria-label="Go back home"
          >
            <ArrowLeft className="w-5 h-5 text-white/70" />
          </Link>
          <span className="text-sm font-medium tracking-widest text-red-400 uppercase drop-shadow-[0_0_5px_rgba(248,113,113,0.5)]">
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              <AlertTriangle className="w-4 h-4" />
              <span>{isTr ? "Uyarı: Aşırı Linç İçerir" : "Warning: Brutally Honest"}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-rose-500 to-orange-500">
              {isTr ? "Toksik Eski Sevgili Tarayıcı YZ" : "Toxic Ex Scanner AI"}
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
              {isTr 
                ? "Hâlâ ona mı takıksın? Şu mesaja cevap vermeyi bırak da yapay zekamız onun aurasını bir okusun. Bir fotoğrafını yükle ve o kör kütük aşıkken tamamen görmezden geldiğin o devasa red flag'lerle yüzleş."
                : "Still hung up on them? Stop texting back and let our AI read their aura. Upload a photo and discover the red flags you completely ignored."}
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${isTr ? "tr" : "en"}?feature=toxic-ex`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold tracking-wide hover:shadow-[0_0_30px_rgba(225,29,72,0.6)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
              >
                <Skull className="w-5 h-5 animate-pulse" />
                {isTr ? "Hemen Vibe'ını Tarat" : "Scan Their Vibe Now"}
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            className="flex-1 w-full max-w-sm relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-red-500/30 to-orange-500/30 blur-3xl rounded-full" />
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-red-500/20 shadow-[0_0_40px_rgba(239,68,68,0.2)] glass-strong flex items-center justify-center bg-black/40">
              <div className="text-center p-6 space-y-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Skull className="w-16 h-16 text-red-500 mx-auto drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
                </motion.div>
                <h3 className="text-xl font-black text-red-400">{isTr ? "Red Flag Alarmı" : "Red Flag Detected"}</h3>
                <p className="text-sm text-white/60 font-medium leading-relaxed">
                  {isTr ? `"Kronik iletişimsiz, üstelik tanrı kompleksi var. Kaç kurtul..."` : `"Chronically uncommunicative with a superiority complex..."`}
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-5 rounded-2xl bg-white/5 border border-red-500/20 text-center hover:border-red-500/50 hover:bg-red-500/5 transition-all duration-300"
            >
              <div className="text-2xl md:text-3xl font-black text-red-400 mb-1">{stat.value}</div>
              <div className="text-xs text-white/50 font-medium leading-snug">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* How It Works */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {[
            {
              title: isTr ? "Aura Okuması" : "Aura Reading",
              desc: isTr ? "Yapay zekamız yüzündeki mikro ifadeleri analiz edip içindeki o gizli toksik enerjiyi ifşalar." : "Our AI analyzes facial micro-expressions to determine their true energetic vibe.",
              icon: "✨"
            },
            {
              title: isTr ? "Red Flag Avcısı" : "Red Flag Extraction",
              desc: isTr ? "Onu yürüyen bir felaket yapan o toksik özelliklerin tam olarak haritasını çıkarır." : "It pinpoints the exact toxic traits that made them a walking disaster.",
              icon: "🚩"
            },
            {
              title: isTr ? "Anında Reality Check" : "Instant Closure",
              desc: isTr ? "Gece 2'de o 'özledim' mesajını atmanı engellemek için yüzüne çarpılan acımasız bir gerçeklik tokatı." : "A brutal reality check to stop you from sending that 'I miss you' text at 2 AM.",
              icon: "📱"
            }
          ].map((feat, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-red-500/40 hover:bg-white/[0.08] transition-all duration-300 group"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{feat.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-300 transition-colors">{feat.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>

        <InArticleAd />

        {/* Scenarios Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">
            {isTr ? "Tarama Sonuçları" : "Real Scan Results"}
          </h2>
          <p className="text-white/50 text-sm mb-8">
            {isTr ? "Gerçek kullanıcıların YZ tarama sonuçları." : "What the AI found from real user scans."}
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {scenarios.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-red-500/30 hover:bg-white/[0.07] transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="text-sm font-semibold text-white/80">{s.scenario}</span>
                  <span className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-full border ${s.badgeColor}`}>
                    {s.badge}
                  </span>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">{s.verdict}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

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

        <FeatureSeoContent featureId="toxic-ex-scanner" isTr={isTr} />

        {/* Related Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-2xl font-black text-white mb-2 tracking-tight">
            {isTr ? "İlgili Araçlar" : "Related Tools"}
          </h2>
          <p className="text-white/50 text-sm mb-8">
            {isTr ? "Bunlar da işine yarayabilir." : "You might also like these."}
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
                  className={`block p-5 rounded-2xl bg-white/5 border border-white/10 ${tool.color} hover:bg-white/[0.08] transition-all duration-300 group h-full`}
                >
                  <div className="text-2xl mb-3 group-hover:scale-110 transition-transform inline-block">{tool.emoji}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-sm font-bold text-white group-hover:text-red-300 transition-colors">{tool.title}</h3>
                    <ExternalLink className="w-3 h-3 text-white/30 group-hover:text-red-400 transition-colors" />
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed">{tool.desc}</p>
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
          className="text-center p-10 rounded-3xl bg-gradient-to-br from-red-950/60 to-black border border-red-900/50 shadow-[0_0_50px_rgba(225,29,72,0.15)]"
        >
          <Sparkles className="w-10 h-10 text-rose-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
            {isTr ? "Gerçeklerle Yüzleşmeye Hazır mısın?" : "Ready for the truth?"}
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto text-lg">
            {isTr 
              ? "%100 Ücretsiz. %100 Acımasız. Fotoğrafları asla kaydetmiyoruz, sadece onların egosunu paramparça ediyoruz."
              : "100% Free. 100% Brutal. We don't save the photos, we just destroy their ego."}
          </p>
          <Link
            href={`/${isTr ? "tr" : "en"}?feature=toxic-ex`}
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
