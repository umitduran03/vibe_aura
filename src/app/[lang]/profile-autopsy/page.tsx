"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Sparkles, Star, AlertTriangle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import SeoFooter from "@/components/SeoFooter";
import FeatureSeoContent from "@/components/FeatureSeoContent";
import InArticleAd from "@/components/InArticleAd";

const platforms = [
  { name: "Tinder", emoji: "🔥" },
  { name: "Bumble", emoji: "🐝" },
  { name: "Hinge", emoji: "📎" },
  { name: "Instagram", emoji: "📸" },
  { name: "X", emoji: "🐦" },
  { name: "BeReal", emoji: "📱" },
];

const stats = [
  { value: "1M+", descEn: "profiles analyzed", descTr: "profil analiz edildi" },
  { value: "84%", descEn: "had hidden red flags", descTr: "gizli red flag içeriyordu" },
  { value: "< 10 sec", descEn: "to get your roast", descTr: "analiz süresi" },
  { value: "100%", descEn: "free forever", descTr: "ücretsiz, her zaman" },
];

const relatedTools = [
  {
    slug: "delulu-check",
    emoji: "🧠",
    titleEn: "Delulu Check",
    titleTr: "Delulu Check",
    descEn: "Find out if you're delusional or if they actually like you",
    descTr: "Gerçekten senden hoşlanıyor mu yoksa delulu musun öğren",
  },
  {
    slug: "toxic-ex-scanner",
    emoji: "☢️",
    titleEn: "Toxic Ex Scanner",
    titleTr: "Toksik Eski Sevgili Tarayıcı",
    descEn: "Scan for narcissistic and manipulative patterns",
    descTr: "Narsistik ve manipülatif kalıpları tara",
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

const modes = [
  {
    icon: "🔬",
    titleEn: "Self Audit (Fix Your Profile)",
    titleTr: "Kendi Profilin (Acil Müdahale)",
    descEn: "Run your own profile through the AI operating table. Find out exactly why you're not getting matches or getting left on read.",
    descTr: "Kendi profilini yapay zeka ameliyat masasına yatır. Neden eşleşme alamadığını veya ghostlandığını acımasızca öğren.",
    bulletsEn: [
      "Discover your hidden red flags and cringy habits",
      "Find out if your bio is giving 'NPC' energy",
      "Get a brutal priority list of exactly what to fix"
    ],
    bulletsTr: [
      "Farkında olmadığın toksik sinyalleri (red flag) gör",
      "Biyografinin 'NPC' enerjisi verip vermediğini öğren",
      "Profilini kurtarmak için 3 acil taktik (top fix) al"
    ]
  },
  {
    icon: "🕵️",
    titleEn: "Detective Mode (Stalk Them)",
    titleTr: "Dedektif Modu (Flörtünü Stalkla)",
    descEn: "Upload someone else's profile. Decode their true vibe and hidden red flags before you even swipe right or text them.",
    descTr: "Başkasının profilini yükle. Eşleşmeden veya mesaj atmadan önce o kişinin gerçek niyetini ve toksik aurasını çöz.",
    bulletsEn: [
      "Calculate their 'Swipe-Worthy' Vibe Score",
      "Expose hidden 'pick-me' or narcissist energy",
      "Get secret tips on how to approach them safely"
    ],
    bulletsTr: [
      "Kişinin etkileşime girmeye değer olup olmadığını (Vibe Skoru) gör",
      "Gizli 'pick-me' veya narsist enerjisini önceden ifşa et",
      "O kişiye nasıl yaklaşman veya kaçman gerektiğine dair taktik al"
    ]
  },
];

const featureCards = [
  {
    icon: <Star className="w-7 h-7" />,
    titleEn: "The Vibe Score (0-100)",
    titleTr: "Vibe Skoru (0-100)",
    descEn: "Not just a beauty rating. It calculates 'Main Character Energy' vs 'NPC Vibes' to tell you exactly how swipe-worthy the profile is.",
    descTr: "Sadece dış görünüş puanı değil. 'Ana Karakter' enerjisi ile 'NPC' aurasını kıyaslar. O profilin sağa kaydırmaya veya takip edilmeye değip değmeyeceğini söyler.",
    color: "violet",
  },
  {
    icon: <CheckCircle className="w-7 h-7" />,
    titleEn: "Green Flags & W Rizz",
    titleTr: "Green Flag'ler & Çekicilik",
    descEn: "What's actually working. Which photo goes hardest, and what specific details give off high-value, authentic energy.",
    descTr: "Gerçekten işe yarayan detaylar. Hangi fotoğrafın en iyi olduğu ve biyografideki hangi detayın 'high-value' (kaliteli) enerji verdiği.",
    color: "emerald",
  },
  {
    icon: <AlertTriangle className="w-7 h-7" />,
    titleEn: "Red Flags & Icks",
    titleTr: "Red Flag'ler & Ick'ler",
    descEn: "The cringy gym selfies, the generic bio lines, the hidden toxic traits. We brutally expose everything that ruins the vibe.",
    descTr: "Klişe ayna selfie'leri, sıkıcı biyografi yazıları ve gizli toksik sinyaller. Vibe'ı mahveden ve itici (ick) gelen her şeyi acımasızca ifşa ederiz.",
    color: "rose",
  },
];

export default function ProfileAutopsyLanding() {
  const params = useParams();
  const lang = (params?.lang as string) ?? "en";
  const isTr = lang === "tr";


  return (
    <div className="min-h-dvh bg-[#050510] text-white selection:bg-violet-500/30 overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[55%] h-[55%] rounded-full bg-violet-900/25 blur-[160px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[150px]" />
        <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] rounded-full bg-purple-900/15 blur-[120px]" />
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
            aria-label="Go back home"
          >
            <ArrowLeft className="w-5 h-5 text-white/70" />
          </Link>
          <span className="text-sm font-medium tracking-widest text-violet-400 uppercase drop-shadow-[0_0_5px_rgba(124,58,237,0.5)]">
            {isTr ? "PROFİL OTOPSİSİ" : "PROFILE AUTOPSY"}
          </span>
        </motion.div>

        {/* Platform Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {platforms.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-semibold text-white/80 hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-300 transition-all duration-200 cursor-default"
            >
              <span>{p.emoji}</span>
              <span>{p.name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="flex-1 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(124,58,237,0.2)]">
              <Sparkles className="w-4 h-4" />
              <span>{isTr ? "Yapay Zeka Profil Analizi" : "AI Profile Analysis"}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400">
              {isTr ? "Profil Otopsisi" : "Profile Autopsy"}
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
              {isTr
                ? "Kendi profilindeki toksik hataları yüzüne vuran veya Dedektif Moduyla flörtünü stalklayıp gerçek niyetini ifşa eden yapay zeka."
                : "The AI that roasts your own profile's red flags, or uses Detective Mode to stalk your crush's true vibe before you swipe right."}
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${lang}?feature=profile-autopsy`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold tracking-wide hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
              >
                <Sparkles className="w-5 h-5 animate-pulse" />
                {isTr ? "Profilimi Otopsiye Al" : "Get My Profile Autopsied"}
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
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-violet-500/20 shadow-[0_0_40px_rgba(124,58,237,0.2)] flex items-center justify-center bg-black/40">
              <div className="text-center p-6 space-y-5 w-full">
                <motion.div
                  animate={{ scale: [1, 1.15, 1], rotate: [0, -3, 3, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-5xl mx-auto w-fit"
                >
                  🔬
                </motion.div>
                <h3 className="text-lg font-black text-violet-300">
                  {isTr ? "Profil Otopsisi" : "Profile Autopsy"}
                </h3>
                {/* Mock score bar */}
                <div className="space-y-3 text-left px-2">
                  {[
                    { label: isTr ? "Genel Puan" : "Overall Score", val: 74, color: "bg-violet-500" },
                    { label: isTr ? "İlk İzlenim" : "First Impression", val: 88, color: "bg-indigo-500" },
                    { label: isTr ? "Biyografi Gücü" : "Bio Strength", val: 52, color: "bg-purple-500" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs text-white/60 mb-1">
                        <span>{item.label}</span>
                        <span className="text-white/80 font-bold">{item.val}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.val}%` }}
                          transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                          className={`h-full rounded-full ${item.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-white/50 italic">
                  {isTr
                    ? `"Hinge bio'n NPC enerjisi veriyor. Hemen değiştir."`
                    : `"Your Hinge bio is giving NPC energy. Fix it ASAP."`}
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
              className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all text-center group"
            >
              <div className="text-2xl font-black text-violet-400 group-hover:scale-110 transition-transform">{stat.value}</div>
              <div className="text-xs text-white/50 mt-1 leading-snug">{isTr ? stat.descTr : stat.descEn}</div>
            </motion.div>
          ))}
        </motion.div>

        <InArticleAd />

        {/* Mode Cards */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-black text-white mb-6 text-center tracking-tight"
          >
            {isTr ? "Modu Seç" : "Pick Your Mode"}
          </motion.h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {modes.map((mode, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/40 hover:bg-violet-500/5 transition-all duration-300 group cursor-default"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
                  {mode.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                  {isTr ? mode.titleTr : mode.titleEn}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-5">
                  {isTr ? mode.descTr : mode.descEn}
                </p>
                <div className="space-y-2.5 pt-4 border-t border-white/10">
                  {(isTr ? mode.bulletsTr : mode.bulletsEn).map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                      <span className="text-sm text-white/80 leading-snug">{bullet}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Feature Cards – What AI checks */}
        <div className="mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-black text-white mb-6 text-center tracking-tight"
          >
            {isTr ? "Yapay Zeka Ne Analiz Eder?" : "What Does the AI Check?"}
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featureCards.map((feat, i) => {
              const colorMap: Record<string, string> = {
                violet: "text-violet-400 border-violet-500/40 group-hover:border-violet-500/60",
                emerald: "text-emerald-400 border-emerald-500/40 group-hover:border-emerald-500/60",
                rose: "text-rose-400 border-rose-500/40 group-hover:border-rose-500/60",
              };
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  key={i}
                  className={`p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all duration-300 group ${colorMap[feat.color]}`}
                >
                  <div className={`mb-4 group-hover:scale-110 transition-transform ${colorMap[feat.color].split(" ")[0]}`}>
                    {feat.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-inherit transition-colors">
                    {isTr ? feat.titleTr : feat.titleEn}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {isTr ? feat.descTr : feat.descEn}
                  </p>
                </motion.div>
              );
            })}
          </div>
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
              {isTr ? "Profil otopsisinden sonra bunlara da bak" : "Also check these after your autopsy"}
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
                  className="block p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/30 hover:bg-white/[0.07] transition-all duration-300 group h-full"
                >
                  <div className="text-2xl mb-3 group-hover:scale-110 transition-transform">{tool.emoji}</div>
                  <h3 className="text-sm font-bold text-white mb-1 group-hover:text-violet-300 transition-colors">
                    {isTr ? tool.titleTr : tool.titleEn}
                  </h3>
                  <p className="text-xs text-white/50">{isTr ? tool.descTr : tool.descEn}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <FeatureSeoContent featureId="profile-autopsy" isTr={isTr} />

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center p-10 rounded-3xl bg-gradient-to-br from-violet-950/60 to-black border border-violet-900/50 shadow-[0_0_50px_rgba(124,58,237,0.15)]"
        >
          <Sparkles className="w-10 h-10 text-violet-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
            {isTr ? "Gerçeği Öğrenmeye Hazır Mısın?" : "Ready to face the brutal truth?"}
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto text-lg">
            {isTr
              ? "%100 Ücretsiz. İster kendi hatalarınla yüzleş, ister flörtünü stalklayıp toksik mi değil mi anında öğren."
              : "100% Free. Face your own red flags, or stalk your crush to see if they're actually swipe-worthy."}
          </p>
          <Link
            href={`/${lang}?feature=profile-autopsy`}
            className="inline-block px-10 py-4 rounded-full bg-white text-black font-bold tracking-wide hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
          >
            {isTr ? "Hemen Otopsiye Başla" : "Start The Autopsy"}
          </Link>
        </motion.div>
      </div>

      <SeoFooter />
    </div>
  );
}
