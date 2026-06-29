"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Sparkles, SmartphoneNfc, Brain, MessageSquareWarning, ShieldAlert, Flame, CheckCircle, XCircle, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import SeoFooter from "@/components/SeoFooter";
import InArticleAd from "@/components/InArticleAd";
import FeatureSeoContent from "@/components/FeatureSeoContent";

const scenarios = [
  {
    emoji: "👀",
    labelEn: "They viewed your story but haven't replied in 9 hours",
    labelTr: "Story'ni görmüş ama 9 saattir cevap vermemiş",
    verdictEn: "DELULU",
    verdictTr: "DELULU",
    verdictColor: "rose",
  },
  {
    emoji: "📲",
    labelEn: "They texted 'lol' at 2am after ignoring you all day",
    labelTr: "Seherce seni görmezden gelip gece 2'de 'haha' yazmış",
    verdictEn: "DELULU",
    verdictTr: "DELULU",
    verdictColor: "rose",
  },
  {
    emoji: "😮‍💨",
    labelEn: "They said 'we should hang out sometime' for the 4th time",
    labelTr: "4. kez 'bir gün buluşalım' demiş ama tarih yok",
    verdictEn: "DELULU",
    verdictTr: "DELULU",
    verdictColor: "rose",
  },
  {
    emoji: "🫶",
    labelEn: "They introduced you to their friends as their 'person'",
    labelTr: "'Özel kişim' diye arkadaşlarıyla tanıştırdı",
    verdictEn: "NOT DELULU ✓",
    verdictTr: "DEĞİL ✓",
    verdictColor: "emerald",
  },
];

const redGreenFlags = [
  {
    type: "red",
    icon: <XCircle className="w-5 h-5" />,
    titleEn: "Red flags you're delulu",
    titleTr: "Delulu olduğunun kırmızı sinyalleri",
    itemsEn: [
      "You've analyzed the same 3 messages for 2 days",
      "You're explaining away their cancelled plans",
      "You think their 'k.' reply has hidden meaning",
      "You've re-read the conversation 10+ times looking for clues",
    ],
    itemsTr: [
      "2 gündür aynı 3 mesajı analiz ediyorsun",
      "Sürekli iptal ettiği planlarına bahane buluyorsun",
      "'Tmsn.' cevabının gizli anlamı olduğunu düşünüyorsun",
      "İpucu aramak için konuşmayı 10+ kez okumuşsun",
    ],
  },
  {
    type: "green",
    icon: <CheckCircle className="w-5 h-5" />,
    titleEn: "Signs you're actually valid",
    titleTr: "Haklı olduğunun yeşil sinyalleri",
    itemsEn: [
      "They initiate plans and actually follow through",
      "They reply consistently within reasonable time",
      "They introduce you to people they care about",
      "Their actions match their words",
    ],
    itemsTr: [
      "Planları kendileri kuruyor ve gerçekten geliyor",
      "Makul süre içinde tutarlı cevap veriyor",
      "Seni önem verdiği insanlarla tanıştırıyor",
      "Sözleri ve eylemleri birbiriyle örtüşüyor",
    ],
  },
];

const stats = [
  { value: "94%", descEn: "of users were diagnosed correctly on first try", descTr: "kullanıcı ilk denemede doğru teşhis aldı" },
  { value: "2M+", descEn: "mixed signal conversations analyzed", descTr: "karma sinyal konuşması analiz edildi" },
  { value: "3 sec", descEn: "average time to get your reality check", descTr: "ortalama reality check süresi" },
  { value: "100%", descEn: "brutally honest — zero sugarcoating", descTr: "acımasız dürüst — sıfır sugarcoating" },
];

const howItWorksSteps = [
  {
    icon: "📋",
    titleEn: "Describe the situation",
    titleTr: "Durumu anlat",
    descEn: "Paste their messages, describe their behavior, or explain the scenario that's keeping you up at night. The more detail, the sharper the read.",
    descTr: "Mesajlarını yapıştır, davranışlarını anlat ya da geceleri seni uyutmayan senaryoyu açıkla. Ne kadar detay, o kadar keskin yorum.",
  },
  {
    icon: "🧠",
    titleEn: "AI reads the receipts",
    titleTr: "Yapay zeka kanıtları okur",
    descEn: "The AI cross-references your story against real behavioral patterns, attachment styles, and red flag databases — not your hopeful interpretation.",
    descTr: "Yapay zeka anlattıklarını gerçek davranış kalıpları, bağlanma stilleri ve red flag veritabanıyla kıyaslar — senin umutlu yorumunla değil.",
  },
  {
    icon: "⚖️",
    titleEn: "Get the brutal verdict",
    titleTr: "Acımasız kararı al",
    descEn: "Delulu or valid? The AI delivers the unfiltered truth: a reality score, what the signs actually mean, and exactly what to do next.",
    descTr: "Delulu musun yoksa haklı mısın? Yapay zeka filtresiz gerçeği verir: bir gerçeklik puanı, sinyallerin gerçekte ne anlama geldiği ve sırada ne yapman gerektiği.",
  },
];

export default function DeluluCheckLanding() {
  const params = useParams();
  const lang = (params?.lang as string) ?? "en";
  const isTr = lang === "tr";

  return (
    <div className="min-h-dvh bg-[#050510] text-white selection:bg-amber-500/30 overflow-x-hidden">

      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[55%] h-[55%] rounded-full bg-amber-900/20 blur-[160px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-yellow-900/10 blur-[150px]" />
        <div className="absolute top-[45%] left-[25%] w-[35%] h-[35%] rounded-full bg-orange-900/10 blur-[120px]" />
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
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all cursor-pointer"
            aria-label={isTr ? "Ana sayfaya dön" : "Go back home"}
          >
            <ArrowLeft className="w-5 h-5 text-white/70" />
          </Link>
          <span className="text-sm font-medium tracking-widest text-amber-400 uppercase drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]">
            {isTr ? "DELULU CHECK YZ" : "AI REALITY CHECK"}
          </span>
        </motion.div>

        {/* ── HERO ── */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="flex-1 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(251,191,36,0.2)]">
              <Brain className="w-4 h-4" />
              <span>{isTr ? "Yapay Zeka Gerçeklik Testi" : "AI Reality Check"}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400">
                {isTr ? "Delulu Check" : "Delulu Check"}
              </span>
              <br />
              <span className="text-white/90 text-3xl md:text-4xl">
                {isTr ? "— Delulu musun?" : "— Am I Delusional?"}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
              {isTr
                ? "Karışık sinyaller mi alıyorsun, yoksa tamamen mi delulu'sun? Durumu yapay zekaya anlat ve ikinci mesajı atmadan önce acımasız bir gerçeklik tokadı ye."
                : "Getting mixed signals or just being delusional? Drop the situation to the AI and get an unfiltered reality check before you embarrass yourself with a double text."}
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${lang}?feature=delulu-check`}
                id="delulu-check-cta-hero"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold tracking-wide hover:shadow-[0_0_35px_rgba(251,191,36,0.5)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
              >
                <SmartphoneNfc className="w-5 h-5 animate-pulse" />
                {isTr ? "Durumu Analiz Et" : "Check My Receipts"}
              </Link>
              <Link
                href={`/${lang}/situationship-clarifier`}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/5 border border-white/15 text-white/70 font-semibold hover:border-amber-500/40 hover:text-white transition-all duration-300"
              >
                {isTr ? "Situationship mi?" : "In a situationship?"}
              </Link>
            </div>
          </motion.div>

          {/* Mock Phone UI */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            className="flex-1 w-full max-w-sm relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/25 to-orange-500/20 blur-3xl rounded-full" />
            <div className="relative rounded-3xl overflow-hidden border border-amber-500/20 shadow-[0_0_40px_rgba(251,191,36,0.15)] bg-black/60 backdrop-blur-sm">
              {/* Fake chat header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-white/5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-sm">😏</div>
                <div>
                  <div className="text-xs font-bold text-white">crush_unknown</div>
                  <div className="text-[10px] text-amber-400">{isTr ? "Son görülme: 9 saat önce" : "Last seen: 9 hours ago"}</div>
                </div>
              </div>
              {/* Chat messages */}
              <div className="p-4 space-y-3">
                <div className="flex justify-start">
                  <div className="bg-white/10 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[75%]">
                    <p className="text-xs text-white/80">{isTr ? "bügün ne yaptın" : "what did u do today"}</p>
                    <p className="text-[10px] text-white/30 mt-1">14:23</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-amber-500/30 border border-amber-500/20 rounded-2xl rounded-tr-sm px-3 py-2 max-w-[75%]">
                    <p className="text-xs text-white/90">{isTr ? "hiç, bekledim mesajını 😭" : "nothing, waited for ur text 😭"}</p>
                    <p className="text-[10px] text-white/30 mt-1">14:45 ✓✓</p>
                  </div>
                </div>
                {/* Seen but no reply */}
                <div className="flex justify-start">
                  <div className="bg-white/5 rounded-full px-3 py-1">
                    <p className="text-[10px] text-white/30">{isTr ? "mesajını okudu..." : "seen..."}</p>
                  </div>
                </div>
                {/* AI verdict */}
                <div className="mt-4 p-3 rounded-2xl bg-gradient-to-r from-amber-950/80 to-black border border-amber-500/30">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">AI Verdict</span>
                  </div>
                  <p className="text-xs text-white/80 leading-relaxed">
                    {isTr
                      ? '"9 saatlik görülüp cevap vermeme ile önceki 2 planı iptal etmesini birleştirince: %84 delulu. Move on."'
                      : '"Combining 9h read-no-reply with the 2 previous cancellations: 84% delulu. Move on."'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── STATS ── */}
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
              className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all text-center group"
            >
              <div className="text-2xl font-black text-amber-400 group-hover:scale-110 transition-transform">{stat.value}</div>
              <div className="text-xs text-white/50 mt-1 leading-snug">{isTr ? stat.descTr : stat.descEn}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── HOW IT WORKS ── */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
              {isTr ? "Nasıl Çalışır?" : "How It Works"}
            </h2>
            <p className="text-white/50 max-w-lg mx-auto">
              {isTr
                ? "3 adımda o acı gerçeği öğren"
                : "3 steps to learn the brutal truth"}
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {howItWorksSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/30 hover:bg-white/[0.07] transition-all duration-300 group"
              >
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
                  {i + 1}
                </div>
                <div className="text-3xl mb-4 mt-2">{step.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                  {isTr ? step.titleTr : step.titleEn}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {isTr ? step.descTr : step.descEn}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── SCENARIO SIMULATOR ── */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
              {isTr ? "Delulu musun? Örnekler" : "Are You Delulu? Examples"}
            </h2>
            <p className="text-white/50">
              {isTr
                ? "Bunlar tanıdık geldi mi? Yapay zeka gerçeği söyler."
                : "Sound familiar? The AI will tell you the truth."}
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
                <div className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-black tracking-wide ${
                  s.verdictColor === "rose"
                    ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                    : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                }`}>
                  {isTr ? s.verdictTr : s.verdictEn}
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
              href={`/${lang}?feature=delulu-check`}
              id="delulu-check-cta-scenarios"
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors"
            >
              <Flame className="w-4 h-4" />
              {isTr ? "Benim durumumu analiz et →" : "Analyze my situation →"}
            </Link>
          </motion.div>
        </div>

        <InArticleAd />

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

        {/* ── RELATED TOOLS ── */}
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
              {isTr ? "Delulu Check'ten sonra bunlara da bak" : "Also check these after your reality check"}
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                href: `/${lang}/situationship-clarifier`,
                emoji: "🌫️",
                titleEn: "Situationship Clarifier",
                titleTr: "Situationship Çözücü",
                descEn: "Find out if you're in a real relationship or just a placeholder",
                descTr: "Gerçek ilişkide misin yoksa yedek misin öğren",
              },
              {
                href: `/${lang}/toxic-ex-scanner`,
                emoji: "☢️",
                titleEn: "Toxic Ex Scanner",
                titleTr: "Toksik Eski Tarayıcı",
                descEn: "Scan for narcissistic and manipulative patterns",
                descTr: "Narsistik ve manipülatif kalıpları tara",
              },
              {
                href: `/${lang}/reply-guru`,
                emoji: "💬",
                titleEn: "Reply Guru",
                titleTr: "Mesaj Gurusu",
                descEn: "Get the perfect response to their confusing texts",
                descTr: "Kafa karıştıran mesajlarına mükemmel cevabı al",
              },
            ].map((tool, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={tool.href}
                  className="block p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/30 hover:bg-white/[0.07] transition-all duration-300 group h-full"
                >
                  <div className="text-2xl mb-3 group-hover:scale-110 transition-transform">{tool.emoji}</div>
                  <h3 className="text-sm font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                    {isTr ? tool.titleTr : tool.titleEn}
                  </h3>
                  <p className="text-xs text-white/50">{isTr ? tool.descTr : tool.descEn}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── FEATURE SEO CONTENT (How It Works, Use Cases, FAQ) ── */}
        <FeatureSeoContent featureId="delulu-check" isTr={isTr} />

        {/* ── BOTTOM CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center p-10 rounded-3xl bg-gradient-to-br from-amber-950/60 to-black border border-amber-900/50 shadow-[0_0_60px_rgba(217,119,6,0.15)] mt-8"
        >
          <div className="text-5xl mb-6">⏰</div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
            {isTr ? "Uyanma vakti geldi." : "Time to wake up."}
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto text-lg leading-relaxed">
            {isTr
              ? "O kuru mesajlarına bahane uydurmayı bırak. Yapay zekadan o acı gerçeği şimdi duy. Ücretsiz."
              : "Stop making excuses for their dry texts. Get the brutal truth from the AI right now. Completely free."}
          </p>
          <Link
            href={`/${lang}?feature=delulu-check`}
            id="delulu-check-cta-bottom"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold tracking-wide hover:shadow-[0_0_40px_rgba(251,191,36,0.5)] transition-all duration-300 hover:-translate-y-1 active:scale-95 text-lg"
          >
            <Sparkles className="w-5 h-5" />
            {isTr ? "Delulu Check'i Başlat" : "Start Delulu Check"}
          </Link>
          <p className="text-white/30 text-xs mt-4">
            {isTr ? "Kayıt gerektirmez · 100% ücretsiz · Anında sonuç" : "No sign-up required · 100% free · Instant results"}
          </p>
        </motion.div>

      </div>

      <SeoFooter />
    </div>
  );
}
