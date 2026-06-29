"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Sparkles, MessageSquareQuote, Zap } from "lucide-react";
import { motion } from "framer-motion";
import SeoFooter from "@/components/SeoFooter";
import FeatureSeoContent from "@/components/FeatureSeoContent";
import InArticleAd from "@/components/InArticleAd";

const stats = [
  {
    value: "10M+",
    descEn: "replies generated",
    descTr: "cevap üretildi",
  },
  {
    value: "97%",
    descEn: "said it actually worked",
    descTr: "işe yaradığını söyledi",
  },
  {
    value: "< 5s",
    descEn: "average reply time",
    descTr: "ortalama cevap süresi",
  },
  {
    value: "100%",
    descEn: "free — no sign-up",
    descTr: "ücretsiz — kayıt yok",
  },
];

const scenarios = [
  {
    emoji: "💀",
    situation: { en: "They texted 'k.'", tr: "'Tmm.' yazdılar" },
    aiReply: {
      en: '"Interesting." (Leave them spiraling. No punctuation, no context — pure power.)',
      tr: '"İlginç." (Onları çıldırsın. Noktalama yok, bağlam yok — saf güç.)',
    },
    tag: { en: "Mysterious", tr: "Gizemli" },
    tagColor: "violet",
  },
  {
    emoji: "👻",
    situation: {
      en: "Left on read for 2 days",
      tr: "2 gün önce görüldü bıraktılar",
    },
    aiReply: {
      en: '"Oh hey, didn\'t see this. Busy week." (Power move. You\'re unbothered. You won.)',
      tr: '"Ah, görememişim. Yoğun bir haftaydı." (Güç hamlesi. Hiç umursamıyorsun. Kazandın.)',
    },
    tag: { en: "Power Move", tr: "Güç Hamlesi" },
    tagColor: "indigo",
  },
  {
    emoji: "🌀",
    situation: {
      en: "They're giving mixed signals",
      tr: "Karma sinyaller veriyorlar",
    },
    aiReply: {
      en: '"Hey, what are we actually doing? Just want clarity." (Brave, direct, and low-key irresistible.)',
      tr: '"Biz aslında ne yapıyoruz? Sadece netlik istiyorum." (Cesur, direkt ve kaçınılmaz derecede çekici.)',
    },
    tag: { en: "Clarity Text", tr: "Netlik Mesajı" },
    tagColor: "purple",
  },
  {
    emoji: "🔥",
    situation: {
      en: "They're suddenly cold after being hot",
      tr: "Sıcakken aniden soğudular",
    },
    aiReply: {
      en: '"No worries, I\'ve been pretty busy too." (Mirror their energy. Watch them panic.)',
      tr: '"Sorun değil, ben de oldukça meşguldüm." (Enerjilerini yansıt. Paniği izle.)',
    },
    tag: { en: "Mirror Energy", tr: "Enerji Yansıt" },
    tagColor: "fuchsia",
  },
];

const relatedTools = [
  {
    href: "situationship-clarifier",
    emoji: "🌫️",
    titleEn: "Situationship Clarifier",
    titleTr: "Situationship Çözücü",
    descEn: "Find out if you're in a real relationship or just a placeholder",
    descTr: "Gerçek ilişkide misin yoksa yedek misin öğren",
  },
  {
    href: "delulu-check",
    emoji: "🧠",
    titleEn: "Delulu Check",
    titleTr: "Delulu Check",
    descEn: "Get a brutal AI reality check on your situation",
    descTr: "Durumuna dair acımasız bir AI gerçeklik tokadı ye",
  },
  {
    href: "toxic-ex-scanner",
    emoji: "☢️",
    titleEn: "Toxic Ex Scanner",
    titleTr: "Toksik Eski Tarayıcı",
    descEn: "Scan for narcissistic and manipulative patterns",
    descTr: "Narsistik ve manipülatif kalıpları tara",
  },
];

const tagColorMap: Record<string, string> = {
  violet: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  indigo: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  purple: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  fuchsia: "bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30",
};

export default function ReplyGuruLanding() {
  const params = useParams();
  const lang = (params?.lang as string) ?? "en";
  const isTr = lang === "tr";

  return (
    <div className="min-h-dvh bg-[#050510] text-white selection:bg-violet-500/30 overflow-x-hidden">

      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-violet-900/20 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-slate-800/20 blur-[150px]" />
        <div className="absolute top-[45%] left-[20%] w-[35%] h-[35%] rounded-full bg-indigo-900/15 blur-[120px]" />
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
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-violet-500/30 transition-all cursor-pointer"
            aria-label={isTr ? "Ana sayfaya dön" : "Go back home"}
          >
            <ArrowLeft className="w-5 h-5 text-white/70" />
          </Link>
          <span className="text-sm font-medium tracking-widest text-violet-400 uppercase drop-shadow-[0_0_5px_rgba(139,92,246,0.5)]">
            {isTr ? "YZ İFŞA RADARI" : "AI Feature Spotlight"}
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(139,92,246,0.2)]">
              <span className="text-base leading-none">💬</span>
              <span>{isTr ? "Akıl Oyunlarını Kazan" : "Win The Mind Games"}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-400">
              {isTr ? "Mesaj Gurusu YZ" : "The Reply Guru AI"}
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
              {isTr
                ? "20 dakikadır klavyeye mi bakıyorsun? Mesajın ekran görüntüsünü sal ve yapay zekanın tam o mükemmel toksik, cool veya garantici cevabı yapıştırmasına izin ver."
                : "Staring at your keyboard for 20 minutes? Drop the screenshot of their text and let the AI craft the perfect toxic, cool, or safe reply."}
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${lang}?feature=reply-guru`}
                id="reply-guru-cta-hero"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold tracking-wide hover:shadow-[0_0_30px_rgba(109,40,217,0.6)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
              >
                <MessageSquareQuote className="w-5 h-5 animate-pulse" />
                {isTr ? "Cevap Üret" : "Generate Reply"}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            className="flex-1 w-full max-w-sm relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/30 to-indigo-500/30 blur-3xl rounded-full" />
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-violet-500/20 shadow-[0_0_40px_rgba(139,92,246,0.2)] glass-strong flex items-center justify-center bg-black/40">
              <div className="text-center p-6 space-y-4">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-7xl drop-shadow-[0_0_15px_rgba(139,92,246,0.8)]"
                >
                  💬
                </motion.div>
                <h3 className="text-xl font-black text-violet-400">{isTr ? "YZ Tavsiyesi" : "AI Suggestion"}</h3>
                <p className="text-sm text-white/60 font-medium leading-relaxed">
                  {isTr
                    ? `"Sen kimdin ya?" (Onu anında bir panik krizine sokar)`
                    : `"Who's this?" (Sends them into an immediate panic spiral)`}
                </p>
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
              className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all text-center group"
            >
              <div className="text-2xl font-black text-violet-400 group-hover:scale-110 transition-transform">
                {stat.value}
              </div>
              <div className="text-xs text-white/50 mt-1 leading-snug">
                {isTr ? stat.descTr : stat.descEn}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── HOW IT WORKS (3-card grid) ── */}
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
              {isTr ? "3 adımda mükemmel cevabı al" : "3 steps to the perfect reply"}
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🎭",
                titleEn: "Multiple Tones",
                titleTr: "Farklı Vibe'lar",
                descEn:
                  "Choose between 'Toxic', 'Cool & Unbothered', or 'Playful' depending on your end goal.",
                descTr:
                  "Nihai hedefine göre 'Toksik', 'Umursamaz' veya 'Flörtöz' arasında seçim yap.",
              },
              {
                icon: "🧠",
                titleEn: "Context Aware",
                titleTr: "Bağlamı Anlar",
                descEn: "The AI reads the previous messages to match the energy perfectly.",
                descTr:
                  "Yapay zeka enerjiyi mükemmel eşleştirmek için önceki mesajları da okur.",
              },
              {
                icon: "🧘‍♀️",
                titleEn: "No More Panic",
                titleTr: "Panik Yok",
                descEn: "Stop crowd-sourcing your replies from the group chat. Get instant results.",
                descTr:
                  "Kız grubundan / kankalarından taktik dilenmeyi bırak. Anında sonuç al.",
              },
            ].map((feat, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={i}
                className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/40 hover:bg-white/[0.08] transition-all duration-300 group"
              >
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-violet-500/30 group-hover:scale-110 transition-transform">
                  {i + 1}
                </div>
                <div className="text-3xl mb-4 mt-2 group-hover:scale-110 transition-transform">
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                  {isTr ? feat.titleTr : feat.titleEn}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {isTr ? feat.descTr : feat.descEn}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── SCENARIO EXAMPLES ── */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
              {isTr ? "Tanıdık Senaryolar" : "Relatable Scenarios"}
            </h2>
            <p className="text-white/50">
              {isTr
                ? "Yapay zeka tam da bu durumlarda ne yazacağını bilir"
                : "The AI knows exactly what to say in these situations"}
            </p>
          </motion.div>
          <div className="space-y-4">
            {scenarios.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/30 hover:bg-white/[0.07] transition-all duration-300"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{s.emoji}</span>
                    <p className="text-sm font-semibold text-white/80">
                      {isTr ? s.situation.tr : s.situation.en}
                    </p>
                  </div>
                  <span
                    className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-black tracking-wide border ${tagColorMap[s.tagColor]}`}
                  >
                    {isTr ? s.tag.tr : s.tag.en}
                  </span>
                </div>
                <div className="ml-9 pl-1 border-l-2 border-violet-500/30">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Zap className="w-3 h-3 text-violet-400" />
                    <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest">
                      {isTr ? "AI Önerisi" : "AI Reply"}
                    </span>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed italic">
                    {isTr ? s.aiReply.tr : s.aiReply.en}
                  </p>
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
              href={`/${lang}?feature=reply-guru`}
              id="reply-guru-cta-scenarios"
              className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 text-sm font-semibold transition-colors"
            >
              <MessageSquareQuote className="w-4 h-4" />
              {isTr ? "Benim cevabımı üret →" : "Generate my reply →"}
            </Link>
          </motion.div>
        </div>

        <InArticleAd />

        {/* ── FEATURE SEO CONTENT ── */}
        <FeatureSeoContent featureId="reply-guru" isTr={isTr} />

        {/* ── RELATED TOOLS ── */}
        <div className="mb-24 mt-16">
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
              {isTr
                ? "Reply Guru'dan sonra bunlara da bak"
                : "Also check these after crafting your reply"}
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
                  href={`/${lang}/${tool.href}`}
                  className="block p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/30 hover:bg-white/[0.07] transition-all duration-300 group h-full"
                >
                  <div className="text-2xl mb-3 group-hover:scale-110 transition-transform">
                    {tool.emoji}
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1 group-hover:text-violet-300 transition-colors">
                    {isTr ? tool.titleTr : tool.titleEn}
                  </h3>
                  <p className="text-xs text-white/50">
                    {isTr ? tool.descTr : tool.descEn}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── BOTTOM CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center p-10 rounded-3xl bg-gradient-to-br from-violet-950/60 to-black border border-violet-900/50 shadow-[0_0_50px_rgba(109,40,217,0.15)]"
        >
          <Sparkles className="w-10 h-10 text-purple-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
            {isTr ? "Artık onları görüldüde bırakmaya son." : "Leave them on read no more."}
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto text-lg">
            {isTr
              ? "Ağır işi Guru'ya bırak. Tartışmayı kazan, date'i garantile veya sadece kaos yarat."
              : "Let the Guru handle the heavy lifting. Win the argument, secure the date, or just cause chaos."}
          </p>
          <Link
            href={`/${lang}?feature=reply-guru`}
            id="reply-guru-cta-bottom"
            className="inline-block px-10 py-4 rounded-full bg-white text-black font-bold tracking-wide hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
          >
            {isTr ? "VibeCheckr'ı Başlat" : "Launch VibeCheckr"}
          </Link>
          <p className="text-white/30 text-xs mt-4">
            {isTr
              ? "Kayıt gerektirmez · 100% ücretsiz · Anında sonuç"
              : "No sign-up required · 100% free · Instant results"}
          </p>
        </motion.div>

      </div>
      <SeoFooter />
    </div>
  );
}
