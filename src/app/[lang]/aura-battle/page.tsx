"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Zap, Sparkles, Swords, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import SeoFooter from "@/components/SeoFooter";
import FeatureSeoContent from "@/components/FeatureSeoContent";

export default function AuraBattleLanding() {
  const params = useParams();
  const isTr = params?.lang === "tr";

  const stats = isTr
    ? [
        { value: "5M+", label: "Savaş Gerçekleşti" },
        { value: "%74", label: "En iyi arkadaşına yenildi" },
        { value: "< 10 sn", label: "Sonuç süresi" },
        { value: "%100", label: "Ücretsiz" },
      ]
    : [
        { value: "5M+", label: "Battles Fought" },
        { value: "74%", label: "Lost to their best friend" },
        { value: "< 10 sec", label: "To get results" },
        { value: "100%", label: "Free" },
      ];

  const scenarios = isTr
    ? [
        {
          scenario: "Sen ve en iyi arkadaşın",
          verdict: "YZ arkadaşını 12 aura puanıyla seçti 💀",
          badge: "Arkadaş Kazandı",
          badgeColor: "text-amber-400 border-amber-500/40 bg-amber-500/10",
        },
        {
          scenario: "Çift selfie'si",
          verdict: "O 73 puan, o 89 puan aldı. O kazandı.",
          badge: "Kız Kazandı",
          badgeColor: "text-orange-400 border-orange-500/40 bg-orange-500/10",
        },
        {
          scenario: "Aynı fotoğrafı iki kez yükledin",
          verdict: "YZ yine de öbürünü seçti 🤡",
          badge: "Kaybettin",
          badgeColor: "text-red-400 border-red-500/40 bg-red-500/10",
        },
        {
          scenario: "Sokaktaki yabancı vs sen",
          verdict: "Rastgele birine yenildin",
          badge: "Yabancı Kazandı",
          badgeColor: "text-rose-400 border-rose-500/40 bg-rose-500/10",
        },
      ]
    : [
        {
          scenario: "You vs your bestie",
          verdict: "AI picked bestie by 12 aura points 💀",
          badge: "Bestie Won",
          badgeColor: "text-amber-400 border-amber-500/40 bg-amber-500/10",
        },
        {
          scenario: "Couple selfie",
          verdict: "He got 73, she got 89. She won.",
          badge: "She Won",
          badgeColor: "text-orange-400 border-orange-500/40 bg-orange-500/10",
        },
        {
          scenario: "You submitted the same photo twice",
          verdict: "AI still picked the other one 🤡",
          badge: "You Lost",
          badgeColor: "text-red-400 border-red-500/40 bg-red-500/10",
        },
        {
          scenario: "Stranger on the street vs you",
          verdict: "You lost to a random",
          badge: "Stranger Won",
          badgeColor: "text-rose-400 border-rose-500/40 bg-rose-500/10",
        },
      ];

  const relatedTools = isTr
    ? [
        {
          href: "/tr/delulu-check",
          title: "Delulu Check",
          desc: "Hayal mi kuruyorsun yoksa gerçek mi? YZ sana acı gerçeği söylesin.",
          emoji: "🤡",
          color: "hover:border-pink-500/40",
        },
        {
          href: "/tr/duo-compatibility",
          title: "İkili Uyum Testi",
          desc: "İki kişinin gerçek uyumunu yapay zeka hesaplasın.",
          emoji: "💞",
          color: "hover:border-fuchsia-500/40",
        },
        {
          href: "/tr/ai-roast-me",
          title: "AI Roast Me",
          desc: "Kendini YZ'ye linç ettir. Acımasız bir gömme seni bekliyor.",
          emoji: "🔥",
          color: "hover:border-red-500/40",
        },
      ]
    : [
        {
          href: "/en/delulu-check",
          title: "Delulu Check",
          desc: "Are you manifesting or just delusional? Let the AI deliver the hard truth.",
          emoji: "🤡",
          color: "hover:border-pink-500/40",
        },
        {
          href: "/en/duo-compatibility",
          title: "Duo Compatibility",
          desc: "Find out your real compatibility score with your partner or crush.",
          emoji: "💞",
          color: "hover:border-fuchsia-500/40",
        },
        {
          href: "/en/ai-roast-me",
          title: "AI Roast Me",
          desc: "Get brutally roasted by our AI. No sugarcoating allowed.",
          emoji: "🔥",
          color: "hover:border-red-500/40",
        },
      ];

  return (
    <div className="min-h-dvh bg-[#050510] text-white selection:bg-amber-500/30 overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-900/20 blur-[150px]" />
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
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all cursor-pointer"
            aria-label="Go back home"
          >
            <ArrowLeft className="w-5 h-5 text-white/70" />
          </Link>
          <span className="text-sm font-medium tracking-widest text-amber-400 uppercase drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]">
            {isTr ? "YZ AURA ARENASI" : "AI AURA ARENA"}
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Swords className="w-4 h-4" />
              <span>{isTr ? "Uyarı: Egolar İncinir" : "Warning: Egos Will Break"}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">
              {isTr ? "Vibe Savaşları (Aura Battle)" : "AI Aura Battle"}
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
              {isTr 
                ? "Sen mi daha havalısın yoksa arkadaşın mı? İkinizin de fotoğrafını yükle, yapay zeka auralarınızı çarpıştırsın. Kazanan ana karakter ilan edilirken kaybeden fena gömülecek!"
                : "Who has more main character energy? Upload both your photos and let the AI clash your auras. The winner takes the crown, the loser gets brutally roasted."}
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${isTr ? "tr" : "en"}?feature=aura-battle`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold tracking-wide hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
              >
                <Zap className="w-5 h-5 animate-pulse" />
                {isTr ? "Savaşı Başlat" : "Start the Battle"}
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            className="flex-1 w-full max-w-sm relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/30 to-red-500/30 blur-3xl rounded-full" />
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-amber-500/20 shadow-[0_0_40px_rgba(245,158,11,0.2)] glass-strong flex items-center justify-center bg-black/40">
              <div className="text-center p-6 space-y-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Swords className="w-16 h-16 text-amber-500 mx-auto drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]" />
                </motion.div>
                <h3 className="text-xl font-black text-amber-400">{isTr ? "Auralar Çarpışıyor" : "Auras Clashing"}</h3>
                <p className="text-sm text-white/60 font-medium leading-relaxed">
                  {isTr ? `"Biri tam bir ana karakter, diğeri ise NPC enerjisi veriyor. Üzgünüm ama..."` : `"One is giving main character energy, the other is purely an NPC..."`}
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
              className="p-5 rounded-2xl bg-white/5 border border-amber-500/20 text-center hover:border-amber-500/50 hover:bg-amber-500/5 transition-all duration-300"
            >
              <div className="text-2xl md:text-3xl font-black text-amber-400 mb-1">{stat.value}</div>
              <div className="text-xs text-white/50 font-medium leading-snug">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* How It Works */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {[
            {
              title: isTr ? "Aura Ölçümü" : "Aura Measurement",
              desc: isTr ? "YZ her iki tarafın enerjisini ölçer ve kimin vibe'ının daha güçlü olduğunu hesaplar." : "The AI measures the energy of both people and calculates who has the stronger vibe.",
              icon: "✨"
            },
            {
              title: isTr ? "Acımasız Kıyaslama" : "Savage Comparison",
              desc: isTr ? "Kaybedeni yerin dibine sokan, kazananı tahta çıkartan detaylı bir gömme seansı." : "A detailed roast session that crowns the winner and completely destroys the loser.",
              icon: "⚔️"
            },
            {
              title: isTr ? "Ego Yıkıcı" : "Ego Destroyer",
              desc: isTr ? "Arkadaş gruplarında kimin daha havalı olduğu tartışmasını tek hamlede bitirir." : "Settle the debate of who is cooler in your friend group once and for all.",
              icon: "🔥"
            }
          ].map((feat, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/40 hover:bg-white/[0.08] transition-all duration-300 group"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{feat.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">{feat.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Scenarios Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">
            {isTr ? "Gerçek Savaş Hikayeleri" : "Real Battle Stories"}
          </h2>
          <p className="text-white/50 text-sm mb-8">
            {isTr ? "Aura Battle'da yaşanan acı gerçekler." : "The brutal truth from real aura battles."}
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {scenarios.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/30 hover:bg-white/[0.07] transition-all duration-300"
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

        <FeatureSeoContent featureId="aura-battle" isTr={isTr} />

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
                    <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">{tool.title}</h3>
                    <ExternalLink className="w-3 h-3 text-white/30 group-hover:text-amber-400 transition-colors" />
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
          className="text-center p-10 rounded-3xl bg-gradient-to-br from-amber-950/60 to-black border border-amber-900/50 shadow-[0_0_50px_rgba(245,158,11,0.15)]"
        >
          <Sparkles className="w-10 h-10 text-amber-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
            {isTr ? "Kimin Aurası Daha Yüksek?" : "Who Has The Higher Aura?"}
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto text-lg">
            {isTr 
              ? "%100 Ücretsiz. %100 Acımasız. Fotoğrafları saklamıyoruz, sadece egoları çarpıştırıyoruz."
              : "100% Free. 100% Savage. We don't save photos, we just clash egos."}
          </p>
          <Link
            href={`/${isTr ? "tr" : "en"}?feature=aura-battle`}
            className="inline-block px-10 py-4 rounded-full bg-white text-black font-bold tracking-wide hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
          >
            {isTr ? "Savaşı Başlat" : "Start Battle"}
          </Link>
        </motion.div>
      </div>
      <SeoFooter />
    </div>
  );
}
