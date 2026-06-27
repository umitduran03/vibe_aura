"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Sparkles, HeartCrack, AlertOctagon } from "lucide-react";
import { motion } from "framer-motion";
import SeoFooter from "@/components/SeoFooter";
import FeatureSeoContent from "@/components/FeatureSeoContent";
import InArticleAd from "@/components/InArticleAd";

export default function ExCompatibilityLanding() {
  const params = useParams();
  const isTr = params?.lang === "tr";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: isTr ? "Eski Sevgili Uyumu & İlişki Analizi YZ" : "Ex Compatibility & Relationship Analysis AI",
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Any",
    description: isTr 
      ? "Eski sevgilinle gerçekten uyumlu muydunuz yoksa büyük bir hata mıydı? YZ auralarınızı kıyaslayıp neden ayrıldığınızı acımasızca ifşalasın."
      : "Were you and your ex actually compatible or was it a huge mistake? Let AI compare your auras and expose exactly why you broke up.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };

  return (
    <div className="min-h-dvh bg-[#050510] text-white selection:bg-slate-500/30 overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-slate-900/20 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[150px]" />
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
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-slate-500/30 transition-all cursor-pointer"
            aria-label="Go back home"
          >
            <ArrowLeft className="w-5 h-5 text-white/70" />
          </Link>
          <span className="text-sm font-medium tracking-widest text-slate-400 uppercase drop-shadow-[0_0_5px_rgba(148,163,184,0.5)]">
            {isTr ? "YZ ESKİ SEVGİLİ ANALİZİ" : "AI EX ANALYSIS"}
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-500/10 border border-slate-500/30 text-slate-400 text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(148,163,184,0.2)]">
              <AlertOctagon className="w-4 h-4" />
              <span>{isTr ? "Kapatılan Defterleri Açıyoruz" : "Opening Closed Chapters"}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-400 via-gray-500 to-indigo-500">
              {isTr ? "O Gerçekten 'Kaçan Balık' Mıydı?" : "Was It Really The 'One That Got Away'?"}
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
              {isTr 
                ? "Gecenin bir yarısı 'acaba yanlış mı yaptık' diye düşünmeyi bırak. İkinizin fotoğraflarını yükle ve yapay zekanın auralarınızı çarpıştırarak aslında ne kadar toksik bir ikili olduğunuzu sana kanıtlamasına izin ver."
                : "Stop wondering 'what if' at 2 AM. Upload both photos and let the AI clash your auras to prove exactly how toxic you two really were together."}
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${isTr ? "tr" : "en"}?feature=ex-compatibility`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-slate-600 to-indigo-600 text-white font-bold tracking-wide hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
              >
                <HeartCrack className="w-5 h-5 animate-pulse" />
                {isTr ? "Eski Sevgili Uyumu Test Et" : "Test Ex Compatibility"}
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            className="flex-1 w-full max-w-sm relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-500/30 to-indigo-500/30 blur-3xl rounded-full" />
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-slate-500/20 shadow-[0_0_40px_rgba(148,163,184,0.2)] glass-strong flex items-center justify-center bg-black/40">
              <div className="text-center p-6 space-y-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <HeartCrack className="w-16 h-16 text-slate-500 mx-auto drop-shadow-[0_0_15px_rgba(148,163,184,0.8)]" />
                </motion.div>
                <h3 className="text-xl font-black text-slate-400">{isTr ? "Acı Gerçekler" : "Brutal Truth"}</h3>
                <p className="text-sm text-white/60 font-medium leading-relaxed">
                  {isTr ? `"Ayrılmanız dünya barışı için verilmiş en iyi karardı. Asla geri dönme."` : `"Your breakup was the best thing to happen for world peace. Do NOT text them."`}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <InArticleAd />

        {/* Features/How it works */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {[
            {
              title: isTr ? "Ayrılık Sebebi Taraması" : "Breakup Autopsy",
              desc: isTr ? "Auralarınızdaki uyuşmazlığı tespit edip ilişkinin neden patladığını bilimsel(!) bir yolla ifşalar." : "Detects the exact mismatch in your auras and exposes scientifically(!) why it exploded.",
              icon: "🔍"
            },
            {
              title: isTr ? "Pişmanlık Sensörü" : "Regret Sensor",
              desc: isTr ? "Sen mi onu kaybettin, o mu seni kaybetti? Yapay zeka ego savaşını kimin kazandığını söyler." : "Who actually lost who? The AI determines who won the ultimate ego battle.",
              icon: "⚖️"
            },
            {
              title: isTr ? "Geri Dönüş Riski" : "Relapse Risk",
              desc: isTr ? "Onun mesaj atma ihtimalini ve senin o tuzağa düşme zayıflığını acımasızca hesaplar." : "Calculates the likelihood of them texting back and your pathetic weakness to reply.",
              icon: "⚠️"
            }
          ].map((feat, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-slate-500/40 hover:bg-white/[0.08] transition-all duration-300 group"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{feat.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-slate-300 transition-colors">{feat.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>

        <FeatureSeoContent featureId="ex-compatibility" isTr={isTr} />

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center p-10 rounded-3xl bg-gradient-to-br from-slate-950/60 to-black border border-slate-900/50 shadow-[0_0_50px_rgba(148,163,184,0.15)]"
        >
          <Sparkles className="w-10 h-10 text-slate-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
            {isTr ? "Geçmişle Yüzleşmeye Hazır mısın?" : "Ready to face the past?"}
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto text-lg">
            {isTr 
              ? "Ücretsiz. Tamamen gizli. Eski sevgiline asla bildirim gitmez."
              : "Free. Completely private. Your ex will never know you checked."}
          </p>
          <Link
            href={`/${isTr ? "tr" : "en"}?feature=ex-compatibility`}
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
