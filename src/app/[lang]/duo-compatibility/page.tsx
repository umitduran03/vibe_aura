"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Users, Sparkles, HeartCrack, Heart, Zap } from "lucide-react";
import { motion } from "framer-motion";
import SeoFooter from "@/components/SeoFooter";
import FeatureSeoContent from "@/components/FeatureSeoContent";

export default function DuoCompatibilityLanding() {
  const params = useParams();
  const isTr = params?.lang === "tr";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: isTr ? "YZ İkili Uyumluluk Testi" : "AI Duo Compatibility Test",
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Any",
    description: isTr 
      ? "İki fotoğraf yükle ve yapay zekamız ilişkinizin tam kimyasını, auralarınızın nasıl karıştığını ve romantik uyumluluğunuzu hesaplasın."
      : "Upload two photos and let our AI calculate your exact relationship chemistry, aura blend, and romantic compatibility.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };

  return (
    <div className="min-h-dvh bg-[#050510] text-white selection:bg-pink-500/30 overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

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
                href={`/${isTr ? "tr" : "en"}?feature=duo-compatibility`}
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
            href={`/${isTr ? "tr" : "en"}?feature=duo-compatibility`}
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
