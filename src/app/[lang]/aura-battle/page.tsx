"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Zap, Sparkles, Swords } from "lucide-react";
import { motion } from "framer-motion";
import SeoFooter from "@/components/SeoFooter";

export default function AuraBattleLanding() {
  const params = useParams();
  const isTr = params?.lang === "tr";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: isTr ? "Vibe Savaşları (Aura Battle) YZ" : "Aura Battle AI",
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Any",
    description: isTr 
      ? "Kimin aurası daha yüksek? İki fotoğraf yükleyin ve yapay zeka ikinizi kıyaslayıp kazananı belirlesin, kaybedeni ise fena gömsün."
      : "Who has the higher aura? Upload two photos and let the AI compare both of you, declare a winner, and brutally roast the loser.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };

  return (
    <div className="min-h-dvh bg-[#050510] text-white selection:bg-amber-500/30 overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

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
                href={`/${isTr ? "tr" : "en"}`}
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

        {/* Features/How it works */}
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
            href={`/${isTr ? "tr" : "en"}`}
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
