"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Flame, Sparkles, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import SeoFooter from "@/components/SeoFooter";
import FeatureSeoContent from "@/components/FeatureSeoContent";
import InArticleAd from "@/components/InArticleAd";

export default function AIRoastMeLanding() {
  const params = useParams();
  const isTr = params?.lang === "tr";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: isTr ? "YZ Fotoğraf Gömme & Aura Okuma" : "AI Photo Roast & Aura Reading",
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Any",
    description: isTr 
      ? "Bir selfie yükle ve yapay zekanın tüm sırlarını, insecure davranışlarını ve red flag'lerini acımasızca yüzüne vurmasına hazır ol."
      : "Upload a selfie and let our AI ruthlessly roast your aura, expose your insecurities, and highlight your red flags.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };

  return (
    <div className="min-h-dvh bg-[#050510] text-white selection:bg-orange-500/30 overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-orange-900/20 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-red-900/10 blur-[150px]" />
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
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-orange-500/30 transition-all cursor-pointer"
            aria-label="Go back home"
          >
            <ArrowLeft className="w-5 h-5 text-white/70" />
          </Link>
          <span className="text-sm font-medium tracking-widest text-orange-400 uppercase drop-shadow-[0_0_5px_rgba(249,115,22,0.5)]">
            {isTr ? "YZ İLE YÜZLEŞ" : "AI ROAST EXPERIENCE"}
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(249,115,22,0.2)]">
              <AlertTriangle className="w-4 h-4" />
              <span>{isTr ? "Uyarı: Egonuz Zarar Görebilir" : "Warning: Ego Damage Inbound"}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-amber-500 to-red-500">
              {isTr ? "Yapay Zeka Seni Çiğ Çiğ Yesin" : "Let the AI Roast Your Entire Existence"}
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
              {isTr 
                ? "Burçlardan gelen tatlı yalanlardan sıkılmadın mı? Bir selfie yükle ve yapay zekanın tüm karakter defolarını, saklamaya çalıştığın ezik yanlarını yüzüne vurmasına izin ver."
                : "Tired of sweet horoscopes? Upload a selfie and let our AI ruthlessly expose every character flaw, insecurity, and cringe trait you try so hard to hide."}
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${isTr ? "tr" : "en"}?feature=ai-roast-me`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold tracking-wide hover:shadow-[0_0_30px_rgba(234,88,12,0.6)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
              >
                <Flame className="w-5 h-5 animate-pulse" />
                {isTr ? "Hemen Beni Göm" : "Roast Me Now"}
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            className="flex-1 w-full max-w-sm relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/30 to-red-500/30 blur-3xl rounded-full" />
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-orange-500/20 shadow-[0_0_40px_rgba(249,115,22,0.2)] glass-strong flex items-center justify-center bg-black/40">
              <div className="text-center p-6 space-y-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Flame className="w-16 h-16 text-orange-500 mx-auto drop-shadow-[0_0_15px_rgba(249,115,22,0.8)]" />
                </motion.div>
                <h3 className="text-xl font-black text-orange-400">{isTr ? "Vibe Analizi" : "Vibe Analysis"}</h3>
                <p className="text-sm text-white/60 font-medium leading-relaxed">
                  {isTr ? `"Günde 4 saatini TikTok'ta harcayıp 'hayatım neden düzelmiyor' diye ağlayan bir aurası var."` : `"Gives off 'complains about being tired but stays up till 4 AM scrolling TikTok' energy."`}
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
              title: isTr ? "Mikro İfade Analizi" : "Micro-Expression AI",
              desc: isTr ? "O sahte gülümsemenin altındaki tüm yıkıklığı saniyeler içinde tespit eder." : "Detects the crippling insecurity hiding right behind that fake smile.",
              icon: "📸"
            },
            {
              title: isTr ? "0 Tolerans" : "Zero Filters",
              desc: isTr ? "Arkadaşlarının yüzüne söyleyemediği tüm gerçekleri acımasızca suratına çarpar." : "Says all the brutal truths your friends are too nice to tell you.",
              icon: "🔥"
            },
            {
              title: isTr ? "Viral Format" : "Viral Ready",
              desc: isTr ? "Analiz sonucunu anında arkadaşlarınla paylaşıp kendini rezil edebilirsin." : "Share your brutal roast instantly and let the whole group chat laugh at you.",
              icon: "🤡"
            }
          ].map((feat, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/40 hover:bg-white/[0.08] transition-all duration-300 group"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{feat.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">{feat.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>

        <FeatureSeoContent featureId="ai-roast-me" isTr={isTr} />

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center p-10 rounded-3xl bg-gradient-to-br from-orange-950/60 to-black border border-orange-900/50 shadow-[0_0_50px_rgba(249,115,22,0.15)]"
        >
          <Sparkles className="w-10 h-10 text-orange-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
            {isTr ? "Gerçeklerle Yüzleşmeye Hazır mısın?" : "Ready to get humbled?"}
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto text-lg">
            {isTr 
              ? "%100 Ücretsiz. Sadece biraz ağlayabilirsin. Fotoğraflarını asla kaydetmiyoruz."
              : "100% Free. You might cry a little. We never save your photos."}
          </p>
          <Link
            href={`/${isTr ? "tr" : "en"}?feature=ai-roast-me`}
            className="inline-block px-10 py-4 rounded-full bg-white text-black font-bold tracking-wide hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
          >
            {isTr ? "Beni Göm" : "Roast Me AI"}
          </Link>
        </motion.div>
      </div>
      <SeoFooter />
    </div>
  );
}
