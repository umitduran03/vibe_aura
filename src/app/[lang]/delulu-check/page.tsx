"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Sparkles, SmartphoneNfc } from "lucide-react";
import { motion } from "framer-motion";
import SeoFooter from "@/components/SeoFooter";

export default function DeluluCheckLanding() {
  const params = useParams();
  const isTr = params?.lang === "tr";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: isTr ? "Delulu Check YZ" : "Delulu Check AI",
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Any",
    description: isTr 
      ? "Kafan mı karışık? Chat detaylarını sal ve o ikinci mesajı atmadan önce acı gerçeklerle yüzleş."
      : "Mixed signals? Drop the receipts and get an unfiltered reality check before you double text.",
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
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-yellow-900/10 blur-[150px]" />
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
          <span className="text-sm font-medium tracking-widest text-amber-400 uppercase drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]">
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(251,191,36,0.2)]">
              <span className="text-base leading-none">📱</span>
              <span>{isTr ? "O İkinci Mesajı Atma" : "Stop The Double Text"}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500">
              {isTr ? "Delulu Check YZ" : "Delulu Check AI"}
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
              {isTr
                ? "O mu sana karışık sinyaller veriyor, yoksa sen mi tamamen delulu'sun? Sohbeti yapay zekaya dök ve kendini rezil etmeden önce sana acımasız bir reality check (gerçeklik tokatı) atmasına izin ver."
                : "Are they giving mixed signals, or are you just delusional? Drop the chat receipts and let our AI give you an unfiltered reality check before you do something embarrassing."}
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${isTr ? "tr" : "en"}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-bold tracking-wide hover:shadow-[0_0_30px_rgba(217,119,6,0.6)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
              >
                <SmartphoneNfc className="w-5 h-5 animate-pulse" />
                {isTr ? "Durumu Analiz Et" : "Check My Receipts"}
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            className="flex-1 w-full max-w-sm relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/30 to-yellow-500/30 blur-3xl rounded-full" />
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-amber-500/20 shadow-[0_0_40px_rgba(251,191,36,0.2)] glass-strong flex items-center justify-center bg-black/40">
              <div className="text-center p-6 space-y-4">
                <motion.div
                  animate={{ rotate: [-5, 5, -5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="text-7xl drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]"
                >
                  📱
                </motion.div>
                <h3 className="text-xl font-black text-amber-400">{isTr ? "Teşhis: Delulu" : "Diagnosis: Delulu"}</h3>
                <p className="text-sm text-white/60 font-medium leading-relaxed">
                  {isTr 
                    ? `"Sana 14 saat sonra 'aynen sjsj' diye cevap vermiş. Hayır, güzelliğinden falan çekinmiyor. Sadece başkasıyla yazışmakla meşgul."`
                    : `"They took 14 hours to reply 'lol yeah'. No, they aren't intimidated by your beauty. They are busy texting someone else."`}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features/How it works */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {[
            {
              title: isTr ? "Chat Analizi" : "Receipt Analysis",
              desc: isTr ? "Yapay zeka o mesajların tonunu, cevaplama süresini ve kelime seçimlerini didik didik eder." : "The AI reads the exact tone, response time, and word choice of their messages.",
              icon: "🧾"
            },
            {
              title: "Reality Check",
              desc: isTr ? "Kendi kafanda kurduğun o tatlı hayalleri, konuşmanın o soğuk ve acı gerçeklerinden ayırır." : "Separates your hopeful delusions from the cold, hard facts of the conversation.",
              icon: "⚖️"
            },
            {
              title: isTr ? "Şimdi Ne Yapmalı?" : "Next Steps",
              desc: isTr ? "Ona cevap mı vermelisin, engellemeli misin, yoksa telefonunu komple denize mi fırlatmalısın söyler." : "Tells you whether to respond, block them, or throw your phone in a lake.",
              icon: "🛑"
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
          className="text-center p-10 rounded-3xl bg-gradient-to-br from-amber-950/60 to-black border border-amber-900/50 shadow-[0_0_50px_rgba(217,119,6,0.15)]"
        >
          <Sparkles className="w-10 h-10 text-yellow-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
            {isTr ? "Uyanma vakti geldi." : "Time to wake up."}
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto text-lg">
            {isTr 
              ? "Onun o kuru mesajlarına kılıf uydurmayı bırak. Yapay zekadan o acımasız gerçekleri şimdi duy."
              : "Stop making excuses for their dry texts. Get the brutal truth from the AI now."}
          </p>
          <Link
            href={`/${isTr ? "tr" : "en"}`}
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
