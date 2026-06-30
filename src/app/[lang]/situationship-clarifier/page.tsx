"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Sparkles, MessageCircleHeart, ExternalLink, CheckCircle, XCircle } from "lucide-react";
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
      "Only texts late at night",
      "Avoids DTR conversation",
      "Hot and cold behavior",
    ],
    itemsTr: [
      "Sadece gece geç saatlerde mesaj atması",
      "İlişkinin adını koymaktan kaçınması",
      "Bir sıcak bir soğuk davranması",
    ],
  },
  {
    type: "green",
    icon: <CheckCircle className="w-5 h-5" />,
    titleEn: "Green flags",
    titleTr: "Yeşil Bayraklar",
    itemsEn: [
      "Plans real dates",
      "Introduces you to friends",
      "Clear communication",
    ],
    itemsTr: [
      "Gerçek buluşmalar planlaması",
      "Seni arkadaşlarıyla tanıştırması",
      "Net iletişim kurması",
    ],
  },
];

export default function SituationshipClarifierLanding() {
  const params = useParams();
  const isTr = params?.lang === "tr";

  const stats = isTr
    ? [
        { value: "2M+", label: "Netleştirilen Durum" },
        { value: "%89", label: "Situationship'te olduğunu bilmiyordu" },
        { value: "3 sn", label: "Sonuç süresi" },
        { value: "%100", label: "Ücretsiz" },
      ]
    : [
        { value: "2M+", label: "Clarified" },
        { value: "89%", label: "Were in situationships and didn't know" },
        { value: "3 sec", label: "To get results" },
        { value: "100%", label: "Free" },
      ];

  const scenarios = isTr
    ? [
        {
          scenario: "6 aydır 'konuşuyoruz'",
          verdict: "YZ kararı: %91 situationship, %0 ilişki",
          badge: "Situationship 💀",
          badgeColor: "text-purple-400 border-purple-500/40 bg-purple-500/10",
        },
        {
          scenario: "3 kez randevuyu iptal etti ama her gece 'iyi geceler' mesajı atıyor",
          verdict: "Dikkat dağıtıcı, ciddi değil.",
          badge: "Mixed Signals",
          badgeColor: "text-fuchsia-400 border-fuchsia-500/40 bg-fuchsia-500/10",
        },
        {
          scenario: "Annesine 'bir arkadaşım' diye tanıttı",
          verdict: "Bu kırmızı bayrak, sevgilim değil.",
          badge: "Red Flag 🚩",
          badgeColor: "text-red-400 border-red-500/40 bg-red-500/10",
        },
        {
          scenario: "Birlikteykende mükemmel, sonra 2 gün hayalet oluyor",
          verdict: "Sıcak-soğuk döngüsü: klasik situationship.",
          badge: "Situationship 😶",
          badgeColor: "text-indigo-400 border-indigo-500/40 bg-indigo-500/10",
        },
      ]
    : [
        {
          scenario: "6 months in, still 'talking'",
          verdict: "AI verdict: 91% situationship, 0% relationship",
          badge: "Situationship 💀",
          badgeColor: "text-purple-400 border-purple-500/40 bg-purple-500/10",
        },
        {
          scenario: "They cancelled plans 3 times but text goodnight every day",
          verdict: "Keeping you on the bench. Not serious.",
          badge: "Mixed Signals",
          badgeColor: "text-fuchsia-400 border-fuchsia-500/40 bg-fuchsia-500/10",
        },
        {
          scenario: "Introduced you as 'a friend' to their mom",
          verdict: "That's a red flag, not a slow burn.",
          badge: "Red Flag 🚩",
          badgeColor: "text-red-400 border-red-500/40 bg-red-500/10",
        },
        {
          scenario: "Perfect when together, ghosts you for 2 days after",
          verdict: "Hot-cold cycle: classic situationship behavior.",
          badge: "Situationship 😶",
          badgeColor: "text-indigo-400 border-indigo-500/40 bg-indigo-500/10",
        },
      ];

  const relatedTools = isTr
    ? [
        {
          href: "/tr/delulu-check",
          title: "Delulu Check",
          desc: "Onunla ilgili hayal mi kuruyorsun yoksa gerçekten bir şans var mı?",
          emoji: "🤡",
          color: "hover:border-pink-500/40",
        },
        {
          href: "/tr/toxic-ex-scanner",
          title: "Toksik Ex Tarayıcı",
          desc: "Eski sevgilinin red flag'lerini YZ ile ifşa et.",
          emoji: "🚩",
          color: "hover:border-red-500/40",
        },
        {
          href: "/tr/reply-guru",
          title: "Reply Guru",
          desc: "O mesaja ne cevap vereceğini bilemiyor musun? YZ sana yardım etsin.",
          emoji: "💬",
          color: "hover:border-cyan-500/40",
        },
      ]
    : [
        {
          href: "/en/delulu-check",
          title: "Delulu Check",
          desc: "Are you manifesting or just delusional about this person?",
          emoji: "🤡",
          color: "hover:border-pink-500/40",
        },
        {
          href: "/en/toxic-ex-scanner",
          title: "Toxic Ex Scanner",
          desc: "Expose your ex's red flags with brutal AI honesty.",
          emoji: "🚩",
          color: "hover:border-red-500/40",
        },
        {
          href: "/en/reply-guru",
          title: "Reply Guru",
          desc: "Don't know how to respond to their text? Let AI craft the perfect reply.",
          emoji: "💬",
          color: "hover:border-cyan-500/40",
        },
      ];

  return (
    <div className="min-h-dvh bg-[#050510] text-white selection:bg-purple-500/30 overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/10 blur-[150px]" />
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              <span className="text-base leading-none">🤡</span>
              <span>{isTr ? `"Biz şimdi neyiz?" Çözücü` : `The "What are we?" Decoder`}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-500 to-indigo-500">
              {isTr ? "Situationship Çözücü YZ" : "Situationship Clarifier AI"}
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
              {isTr 
                ? "Belirsizlikten yoruldun mu? Onun mesajlarını aşırı analiz etmeyi bırak ve yapay zekamızın aranızdaki o gerçek enerjiyi okumasına izin ver."
                : "Tired of the grey zone? Stop overanalyzing their texts and let our AI read the actual energy between you two."}
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${isTr ? "tr" : "en"}?feature=situationship`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold tracking-wide hover:shadow-[0_0_30px_rgba(147,51,234,0.6)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
              >
                <MessageCircleHeart className="w-5 h-5 animate-pulse" />
                {isTr ? "Gerçeği Öğren" : "Get Clarity Now"}
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            className="flex-1 w-full max-w-sm relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 to-indigo-500/30 blur-3xl rounded-full" />
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-purple-500/20 shadow-[0_0_40px_rgba(168,85,247,0.2)] glass-strong flex items-center justify-center bg-black/40">
              <div className="text-center p-6 space-y-4">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="text-7xl drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]"
                >
                  🤡
                </motion.div>
                <h3 className="text-xl font-black text-purple-400">{isTr ? "Teşhis: Delulu" : "Diagnosis: Delusion"}</h3>
                <p className="text-sm text-white/60 font-medium leading-relaxed">
                  {isTr 
                    ? `"İlgin hoşlarına gidiyor ama seninle ciddi düşünecek kadar da sevmiyorlar."`
                    : `"They like the attention, but they don't like you enough to commit."`}
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
              className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 text-center hover:border-purple-500/50 hover:bg-purple-500/5 transition-all duration-300"
            >
              <div className="text-2xl md:text-3xl font-black text-purple-400 mb-1">{stat.value}</div>
              <div className="text-xs text-white/50 font-medium leading-snug">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* How It Works */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {[
            {
              title: isTr ? "Enerji Okuması" : "Energy Reading",
              desc: isTr ? "Yapay zeka bu ilişkinin arkasındaki gizli güç dinamiklerini ve gerçek niyetleri deşifre eder." : "AI decodes the hidden power dynamics and true intentions behind the relationship.",
              icon: "🔮"
            },
            {
              title: isTr ? "Acı Gerçekler" : "Brutal Truth",
              desc: isTr ? "Oynatılıyor musun yoksa sadece ağırdan mı alıyorsunuz? Anında öğren." : "Are you being played or just taking things slow? Find out immediately.",
              icon: "🔪"
            },
            {
              title: isTr ? "Gelecek Tahmini" : "Future Forecast",
              desc: isTr ? "Bu situationship'in aslında nereye gittiğine dair istatistiksel bir döküm." : "A statistical breakdown of where this situationship is actually heading.",
              icon: "📈"
            }
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

        <InArticleAd />

        {/* Scenarios Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">
            {isTr ? "Tanıdık Geliyor mu?" : "Sound Familiar?"}
          </h2>
          <p className="text-white/50 text-sm mb-8">
            {isTr ? "Gerçek situationship vakaları ve YZ sonuçları." : "Real situationship cases and AI verdicts."}
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {scenarios.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 hover:bg-white/[0.07] transition-all duration-300"
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

        <FeatureSeoContent featureId="situationship-clarifier" isTr={isTr} />

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
                    <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">{tool.title}</h3>
                    <ExternalLink className="w-3 h-3 text-white/30 group-hover:text-purple-400 transition-colors" />
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
          className="text-center p-10 rounded-3xl bg-gradient-to-br from-purple-950/60 to-black border border-purple-900/50 shadow-[0_0_50px_rgba(147,51,234,0.15)]"
        >
          <Sparkles className="w-10 h-10 text-fuchsia-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
            {isTr ? "Tahmin etmeyi bırakmaya hazır mısın?" : "Ready to stop guessing?"}
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto text-lg">
            {isTr 
              ? "Arkadaşlarına taktik sormayı bırak. Yapay zekanın sana ihtiyacın olan o acımasız reality check'i (gerçeklik tokatını) atmasına izin ver."
              : "Stop asking your friends for advice. Let the AI give you the brutal reality check you need."}
          </p>
          <Link
            href={`/${isTr ? "tr" : "en"}?feature=situationship`}
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
