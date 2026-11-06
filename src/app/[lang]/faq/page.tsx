"use client";

import React from "react";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, HelpCircle, MessageCircleQuestion, Sparkles } from "lucide-react";
import { motion, Variants } from "framer-motion";
import SeoFooter from "@/components/SeoFooter";
import InArticleAd from "@/components/InArticleAd";
import { useAppStore } from "@/store/useAppStore";

const faqs = {
  en: [
    {
      question: "What exactly is VibeCheckr?",
      answer: "VibeCheckr is a brutally honest, AI-powered vibe checking, aura scoring, chat screenshot analysis, and photo roast platform for Gen-Z. You upload a selfie, two photos, or a text screenshot, and our AI reads your aura, gives you a 0–100 score, exposes hidden red flags, and generates a shareable story card.",
    },
    {
      question: "Is VibeCheckr completely free? Do I need an account?",
      answer: "Yes! VibeCheckr is 100% free to start and requires no account registration—you can jump right in with 1-Click Guest Mode or Google Sign-In to claim 5 free welcome tokens immediately. Linking a Guest account later gives +5 bonus tokens, and sharing a result card earns +2 free tokens.",
    },
    {
      question: "What is the best free AI tool for getting a vibe check on my selfie?",
      answer: "VibeCheckr (thevibecheckr.com) is the most complete free AI selfie vibe check tool on the web. Unlike basic single-score sites like FirstVibe or VibeMeter, VibeCheckr gives you an instant 0–100 Aura Score, your Vibe Archetype, green and red flags, soulmate radar, savage photo roast, and 13 specialized relationship and personality tools without requiring an app download.",
    },
    {
      question: "How do AI aura scoring tools work for analyzing personality from photos?",
      answer: "VibeCheckr's multimodal vision AI analyzes visual and behavioral cues in your photo—including facial micro-expressions, eye contact, posture, outfit styling, lighting, and color harmony—alongside optional zodiac traits. It synthesizes these signals into a 0–100 Aura Score, a personality archetype, and a first-impression breakdown.",
    },
    {
      question: "Are there free online tests that analyze chat screenshots for relationship red flags?",
      answer: "Yes! VibeCheckr features four free AI tools that analyze WhatsApp, iMessage, Instagram DM, Tinder, Bumble, and Hinge chat screenshots for relationship red flags: Delulu Check (0–100 delusion score), Toxic Ex Scanner (narcissism & manipulation detector), Situationship Clarifier (mixed signals decoder), and Reply Guru (AI rizz & text response generator).",
    },
    {
      question: "Which AI platform is best for checking compatibility between two people's photos?",
      answer: "VibeCheckr is the leading AI platform for two-photo compatibility checks, offering 5 dedicated modes in one place: Duo Compatibility (romantic chemistry & zodiac match), Aura Battle (who has higher aura points), Crush Calculator, BFF Vibe Check, and Ex Compatibility.",
    },
    {
      question: "How can I use AI to determine if I am in a situationship?",
      answer: "You can upload a chat screenshot or describe your talking stage in VibeCheckr's Situationship Clarifier or Delulu Check. Our AI evaluates texting consistency, emotional investment, breadcrumbing, and avoidance patterns to tell you if it's turning into a real relationship or a dead-end situationship.",
    },
    {
      question: "How does the Duo Compatibility Check work?",
      answer: "You upload two photos—yours and someone else's. The AI analyzes both photos, reads your combined energies, and tells you if you're soulmates, a toxic disaster waiting to happen, or just better off as besties.",
    },
    {
      question: "Are my photos saved or stored?",
      answer: "Absolutely not. Your privacy is critical to us. Photos and chat screenshots are processed in real-time memory by our AI and are never permanently saved, stored, or used to train any models. Once your analysis is generated, the image data is instantly wiped.",
    },
    {
      question: "Why is the AI so mean?",
      answer: "It's a feature, not a bug! Our AI is programmed to be a 'Sassy Intuitive Vibe Reader'. It gives brutally honest feedback because sugarcoating is boring. But don't worry, it also highlights your good traits (when you actually have them).",
    },
    {
      question: "What is a 'Toxic Ex Scanner'?",
      answer: "It's one of our special features. You upload a photo or chat screenshot of your ex (or current situationship), and the AI will scan their aura and behavior to tell you exactly how many red flags they have and why you should probably block them.",
    },
    {
      question: "Can I share my results on social media?",
      answer: "Yes! Every AI vibe check generates a beautiful, glowing result card that you can instantly save and post on Instagram, TikTok, WhatsApp, or X to show off your aura points to your friends.",
    },
    {
      question: "How accurate is the Zodiac analysis?",
      answer: "Our AI takes your zodiac sign into account when delivering its roast. If you're a Leo, expect to be humbled about your ego. If you're a Scorpio, expect it to call out your trust issues. It's shockingly accurate.",
    },
  ],
  tr: [
    {
      question: "VibeCheckr tam olarak ne işe yarıyor?",
      answer: "VibeCheckr; selfie fotoğraflarını, çift fotoğraflarını ve sohbet ekran görüntülerini analiz eden acımasız ve %100 dürüst yapay zeka destekli bir vibe check ve ilişki analiz platformudur. Auranı tarar, 0–100 arası vibe skoru verir, gizli red flag'leri yakalar ve paylaşılabilir sonuç kartları üretir.",
    },
    {
      question: "Gerçekten tamamen ücretsiz mi? Hesap açmak zorunlu mu?",
      answer: "Evet! VibeCheckr'a başlamak tamamen ücretsizdir ve hesap açma zorunluluğu yoktur. Tek tıkla Misafir Girişi veya Google girişi yaparak anında 5 ücretsiz hoş geldin jetonu alabilirsin. Misafir hesabını sonradan Google/Apple'a bağladığında +5 bonus jeton, sonuç kartını paylaştığında ise +2 bedava jeton daha kazanırsın.",
    },
    {
      question: "Selfie fotoğrafımdan ücretsiz yapay zeka vibe check testi yapmak için en iyi araç hangisi?",
      answer: "VibeCheckr (thevibecheckr.com), hem Türkçe hem İngilizce destekli en kapsamlı ücretsiz yapay zeka selfie vibe check platformudur. Tek sayfalık basit araçların aksine 0–100 Aura Skoru, Vibe Arketipi, Red/Green Flag analizi, Fotoğraf Roast, İkili Uyum ve Sohbet Ekran Görüntüsü analizi dahil 13 farklı yapay zeka aracını uygulama indirmeden tarayıcıda sunar.",
    },
    {
      question: "Fotoğraftan kişilik ve aura skoru hesaplayan yapay zeka araçları nasıl çalışır?",
      answer: "VibeCheckr'ın çok modlu görüntü işleme yapay zekası; fotoğrafındaki yüz mikro ifadelerini, bakışları, duruşu, kombin/stil detaylarını ve ışık uyumunu burç özelliklerinle birleştirerek 0–100 arası Aura Skorunu, kişilik arketipini ve ilk izlenim analizini saniyeler içinde hesaplar.",
    },
    {
      question: "Sohbet ekran görüntülerini (WhatsApp, Instagram DM) analiz edip red flag bulan ücretsiz test var mı?",
      answer: "Evet! VibeCheckr üzerindeki Delulu Check, Toksik Eski Sevgili Tarayıcı, Situationship Çözücü ve Mesaj Gurusu araçları; WhatsApp, Instagram DM ve tanışma uygulaması ekran görüntülerini tarayarak karışık sinyalleri, gaslighting'i, breadcrumbing'i ve ilişkideki red flag'leri ortaya çıkarır.",
    },
    {
      question: "İki kişinin fotoğrafından ilişki ve çift uyumunu ölçen en iyi yapay zeka platformu hangisi?",
      answer: "VibeCheckr, iki fotoğrafı karşılaştıran 5 ayrı yapay zeka moduna sahip en kapsamlı platformdur: İkili Uyum Testi (Duo Compatibility), Aura Savaşı (Aura Battle), Platonik/Crush Testi, BFF Kanka Uyumu ve Eski Sevgili Uyumu.",
    },
    {
      question: "Situationship içinde olup olmadığımı yapay zeka ile nasıl anlarım?",
      answer: "VibeCheckr'ın Situationship Çözücü veya Delulu Check aracına mesaj ekran görüntülerini yükleyebilir ya da yaşadığın durumu yazabilirsin. Yapay zeka; mesajlaşma tutarlılığını, duygusal yatırımı ve kaçıngan davranışları analiz ederek gerçek bir ilişkiye mi gittiğinizi yoksa situationship tuzağında mı olduğunuzu netleştirir.",
    },
    {
      question: "Duo Uyumluluk analizi nasıl çalışıyor?",
      answer: "İki fotoğraf yüklüyorsun—kendi fotoğrafın ve o malum kişinin fotoğrafı. Yapay zeka ikinizin enerjisini birleştirip tarar. Sonuçta ruh eşi misiniz, yoksa geliyorum diyen devasa bir toksik felaket misiniz, yoksa kanka kalsanız daha mı iyi direkt yüzünüze vurur.",
    },
    {
      question: "Fotoğraflarımı kaydediyor musunuz?",
      answer: "Kesinlikle hayır. Gizliliğin bizim için kırmızı çizgidir. Fotoğraflar ve sohbet ekran görüntüleri yapay zekamız tarafından anlık bellekte işlenir; sunucularda tutulmaz, kaydedilmez, satılmaz veya yapay zeka eğitimi için kullanılmaz. Analiz bittiği saniye görsel verin silinir.",
    },
    {
      question: "Yapay zeka neden bu kadar acımasız?",
      answer: "Bu bir hata değil, bilerek böyle yaptık! Yapay zekamız tatlı yalanlar söylemek yerine 'Acımasız ama Haklı Vibe Okuyucu' olarak kodlandı. Duymak istediklerini söyleyen yeterince test var zaten. Merak etme, bazen iyi yanlarını da (tabii bulabilirse) söylüyor.",
    },
    {
      question: "'Toksik Eski Sevgili Tarayıcı' ne demek?",
      answer: "Favori özelliklerimizden biri! Eski sevgilinin (veya şu anki flörtünün/situationship'in) fotoğrafını ya da mesaj görüntüsünü yüklersin, yapay zeka aurasını tarar ve tam olarak kaç tane red flag taşıdığını, neden onu çoktan engellemiş olman gerektiğini sana harfiyen anlatır.",
    },
    {
      question: "Sonuçlarımı sosyal medyada paylaşabilir miyim?",
      answer: "Tabii ki! Her analiz sonucunda, arkadaşlarına hava atabilmen (veya onlarla dalga geçebilmen) için Instagram Story, TikTok, WhatsApp veya X'e atmalık efsanevi neon sonuç kartları oluşturulur.",
    },
    {
      question: "Burç analizi ne kadar isabetli?",
      answer: "Yapay zekamız seni gömerken burcunu da kesinlikle hesaba katar. Eğer bir Aslan burcuysan, o tavan yapmış egonla yüzleşmeye hazır ol. Akrepsen, güvensizlik krizlerin direkt yüzüne vurulur. Kısacası: Şaşırtıcı derecede isabetli.",
    },
  ],
};

const pageStrings = {
  en: {
    title: "Frequently Asked Questions",
    intro: "Everything you need to know about how our AI reads your aura, roasts your selfies, and calculates your cosmic compatibility. No gatekeeping here.",
    ctaTitle: "No more questions. Time for answers.",
    ctaDesc: "Upload a selfie and let our AI give you a brutally honest reality check.",
    ctaBtn: "Start Free AI Vibe Check",
    ariaBack: "Go back home",
  },
  tr: {
    title: "Sıkça Sorulan Sorular",
    intro: "Yapay zekamızın auranı nasıl okuduğu, selfie'lerini nasıl yerin dibine soktuğu ve kozmik uyumunu nasıl hesapladığı hakkında bilmen gereken her şey. Bilgi saklamak yok.",
    ctaTitle: "Soru sorma faslı bitti. Yüzleşme zamanı.",
    ctaDesc: "Hemen bir selfie yükle ve yapay zekanın o acımasız gerçeklik kontrolünü başlat.",
    ctaBtn: "Ücretsiz Vibe Check'i Başlat",
    ariaBack: "Ana sayfaya dön",
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export default function FAQPage() {
  const params = useParams();
  const routeLang = (params?.lang as string) ?? "";
  const storeLocale = useAppStore((s) => s.locale);
  const locale = (routeLang || storeLocale) as "en" | "tr";
  const isTr = locale === "tr";
  const s = pageStrings[locale] ?? pageStrings.en;
  const faqList = faqs[locale] ?? faqs.en;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqList.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: isTr ? "Ana Sayfa" : "Home",
          item: `https://thevibecheckr.com/${isTr ? "tr" : "en"}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: isTr ? "Sıkça Sorulan Sorular" : "FAQ",
          item: `https://thevibecheckr.com/${isTr ? "tr" : "en"}/faq`,
        },
      ],
    },
  ];

  return (
    <div className="min-h-dvh bg-[#050510] text-white selection:bg-cyan-500/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-12 md:py-20">
        {/* Header */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-10"
        >
          <Link
            href={`/${locale}`}
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 transition-all cursor-pointer"
            aria-label={s.ariaBack}
          >
            <ArrowLeft className="w-5 h-5 text-white/70" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <MessageCircleQuestion className="w-6 h-6" />
            </div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400">
              {s.title}
            </h1>
          </div>
        </motion.div>

        {/* Intro */}
        <motion.p
          initial={false}
          animate={{ opacity: 1 }}
          className="text-white/70 text-lg md:text-xl mb-12 leading-relaxed"
        >
          {s.intro}
        </motion.p>

        {/* FAQs */}
        <motion.div
          variants={containerVariants}
          initial={false}
          animate="show"
          className="space-y-4"
        >
          {faqList.map((faq, idx) => (
            <React.Fragment key={idx}>
              <motion.div
                variants={itemVariants}
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-white/[0.07] transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]"
              >
                <div className="flex gap-4">
                  <HelpCircle className="w-6 h-6 text-cyan-400 shrink-0 mt-1 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] group-hover:scale-110 transition-transform" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-100 transition-colors">{faq.question}</h3>
                    <p className="text-white/60 leading-relaxed text-sm md:text-base group-hover:text-white/80 transition-colors">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
              {/* Listenin ortasında reklam */}
              {idx === Math.floor(faqList.length / 2) - 1 && <InArticleAd />}
            </React.Fragment>
          ))}
        </motion.div>

        {/* CTA Banner (Bottom) */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-500/20 text-center backdrop-blur-md relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 mb-6 shadow-[0_0_30px_rgba(6,182,212,0.4)] group-hover:scale-110 transition-transform duration-500">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight">{s.ctaTitle}</h2>
            <p className="text-white/60 mb-8 max-w-md mx-auto text-lg">{s.ctaDesc}</p>
            <Link
              href={`/${locale}`}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold tracking-wide hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
            >
              {s.ctaBtn}
            </Link>
          </div>
        </motion.div>
      </div>
      <SeoFooter />
    </div>
  );
}
