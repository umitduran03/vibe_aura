import Link from "next/link";

interface Props {
  lang: "en" | "tr";
}

const seoContent = {
  en: {
    badge: "Free AI Vibe Check & Aura Analysis",
    heading: "VibeCheckr — Free AI Vibe Check Test, 0–100 Aura Score, Photo Roast & Text Analyzer",
    tagline:
      "What is your vibe? Upload a selfie, two photos, or a chat screenshot for a free AI vibe check test, 0–100 aura score, savage photo roast, delulu check, crush calculator & couple compatibility—instant, no sign-up required.",
    whatIsTitle: "What Is an AI Vibe Check Test & How Does It Work?",
    whatIsDesc:
      "A vibe check measures the energy, personality cues, and unspoken signals you give off in selfies and text messages. VibeCheckr combines multimodal AI face/chat reading with zodiac psychology to score your aura from 0 to 100, decode mixed signals in WhatsApp/iMessage/Instagram DM screenshots, test two-photo compatibility, and generate shareable story cards in seconds.",
    steps: [
      { step: "1", title: "Upload Selfie or Chat", desc: "Drop a selfie, two photos for Duo/Crush mode, or a text screenshot." },
      { step: "2", title: "AI Scans Your Vibe", desc: "Our AI reads micro-expressions, 0–100 aura energy, and hidden red flags." },
      { step: "3", title: "Get Your Score & Roast", desc: "Unlock your 0–100 Aura Score, compatibility %, and shareable story card." },
    ],
    featuresTitle: "13 Free AI Vibe Check, Aura & Relationship Tools",
    features: [
      { emoji: "🔥", name: "AI Photo Roast", desc: "Brutally honest AI comedy roast of your selfie and vibe.", href: "/en/ai-roast-me" },
      { emoji: "🤡", name: "Delulu Check", desc: "Am I delusional? Decode mixed signals before you double text.", href: "/en/delulu-check" },
      { emoji: "⚔️", name: "Aura Battle", desc: "Upload two photos and let AI decide who has higher main character energy.", href: "/en/aura-battle" },
      { emoji: "💞", name: "Duo Compatibility", desc: "Test romantic chemistry and zodiac aura alignment.", href: "/en/duo-compatibility" },
      { emoji: "💀", name: "Toxic Ex Scanner", desc: "Expose hidden red flags and toxic patterns before texting back.", href: "/en/toxic-ex-scanner" },
      { emoji: "🌀", name: "Situationship Clarifier", desc: "Find out where you actually stand in your talking stage.", href: "/en/situationship-clarifier" },
      { emoji: "💘", name: "Crush Calculator", desc: "Calculate platonic vs. romantic energy from your photos.", href: "/en/crush-calculator" },
      { emoji: "🔮", name: "Soulmate Radar", desc: "Discover your ideal partner profile and zodiac match.", href: "/en/soulmate-radar" },
      { emoji: "🔬", name: "Profile Autopsy", desc: "Get a ruthless AI audit of your dating or social profile.", href: "/en/profile-autopsy" },
      { emoji: "👯", name: "BFF Vibe Check", desc: "Test best-friend compatibility and chaos levels.", href: "/en/bff-vibe-check" },
      { emoji: "💔", name: "Ex Compatibility", desc: "Should you get back together or block them forever?", href: "/en/ex-compatibility" },
      { emoji: "💬", name: "Reply Guru", desc: "Generate the perfect witty, flirty, or savage text reply.", href: "/en/reply-guru" },
      { emoji: "🔋", name: "Mood Reset", desc: "Snap out of a bad day with a sharp, no-nonsense reality check.", href: "/en/mood-reset" },
    ],
    trendsTitle: "Trending Relationship & Gen-Z Guides",
    trends: [
      { name: "What Is a Vibe Check?", href: "/en/trends/what-is-a-vibe-check" },
      { name: "AI Photo Personality Test", href: "/en/trends/ai-photo-personality-test" },
      { name: "Aura Battle: Who Is Cooler?", href: "/en/trends/aura-battle-who-is-cooler" },
      { name: "What is Rizz? (Spoken vs Unspoken)", href: "/en/trends/what-is-rizz" },
      { name: "What Are Aura Points?", href: "/en/trends/what-are-aura-points" },
      { name: "What is an Ick?", href: "/en/trends/what-is-an-ick" },
      { name: "Are You Delulu?", href: "/en/trends/are-you-delulu" },
      { name: "Situationship vs Relationship", href: "/en/trends/situationship-vs-relationship" },
      { name: "How to Stop Overthinking Texts", href: "/en/trends/how-to-stop-overthinking-texts" },
      { name: "Biggest Dating Red Flags 2026", href: "/en/trends/biggest-dating-red-flags-2026" },
      { name: "Attachment Styles Explained", href: "/en/trends/attachment-styles-explained" },
      { name: "Gen-Z Dating Terms 2026", href: "/en/trends/gen-z-dating-terms-2026" },
    ],
    faqTitle: "Vibe Check — Frequently Asked Questions",
    faqs: [
      {
        q: "What does vibe check mean?",
        a: "A vibe check is a quick assessment of someone's energy, mood, personality, or intentions. On VibeCheckr, our AI analyzes your selfie or chat messages to calculate your 0–100 Aura Score, personality traits, and relationship red flags.",
      },
      {
        q: "How do I take the free AI vibe check test?",
        a: "Sign in with Google or continue as a Guest to claim 5 free welcome tokens immediately, choose Solo, Duo, or Crisis Center mode, and upload your photo or text scenario for an instant AI reading.",
      },
      {
        q: "What is the best free AI tool for getting a vibe check on my selfie?",
        a: "VibeCheckr is a 100% free-to-start AI selfie vibe check platform with instant 1-Click Guest Mode (5 free tokens, no registration required). Unlike single-purpose tools like FirstVibe or VibeMeter, VibeCheckr offers 13 AI tools including 0–100 Aura Scoring, Savage Photo Roast, Two-Photo Duo Compatibility, and Chat Screenshot Red Flag Analysis.",
      },
      {
        q: "How do AI aura scoring tools work for analyzing personality from photos?",
        a: "VibeCheckr's multimodal AI analyzes facial micro-expressions, posture, lighting, outfit aesthetics, and optional zodiac traits in your photo to compute a 0–100 Aura Score, identify your Vibe Archetype, and highlight green and red flags.",
      },
      {
        q: "Are there free online tests that analyze chat screenshots for relationship red flags?",
        a: "Yes. VibeCheckr's Delulu Check, Toxic Ex Scanner, Situationship Clarifier, and Reply Guru analyze WhatsApp, iMessage, Instagram DM, and dating app chat screenshots to expose mixed signals, breadcrumbing, gaslighting, and red flags.",
      },
      {
        q: "Which AI platform is best for checking compatibility between two people's photos?",
        a: "VibeCheckr features 5 dedicated two-photo compatibility tests in one free web app: Duo Compatibility, Aura Battle, Crush Calculator, BFF Vibe Check, and Ex Compatibility.",
      },
      {
        q: "Are my uploaded photos stored or shared?",
        a: "No. Your photos and chat screenshots are processed securely in real-time memory to generate your AI vibe analysis and are immediately deleted—never stored, sold, or used to train AI models.",
      },
    ],
    dictionaryTitle: "Vibe Dictionary — Gen-Z Slang & Dating Glossary",
    dictionaryDesc:
      "The complete encyclopedia for modern internet and dating slang: ick, rizz, delulu, vibe check, situationship, aura points, love bombing, ghosting, red flags, and more.",
    dictionaryHref: "/en/vibe-dictionary",
    resourcesTitle: "Explore More",
    allTrendsLabel: "All Trends & Articles",
    faqLabel: "FAQ",
    privacyLabel: "Privacy Policy",
    termsLabel: "Terms of Service",
  },
  tr: {
    badge: "Ücretsiz Yapay Zeka Vibe Check & Aura Testi",
    heading: "VibeCheckr — Ücretsiz Yapay Zeka Vibe Check Testi, 0–100 Aura Skoru, Fotoğraf & Mesaj Analizi",
    tagline:
      "Vibe check ne demek? Selfie'ni, iki fotoğrafı veya WhatsApp/DM mesaj ekran görüntünü yükle; yapay zeka ile ücretsiz vibe check testi, 0–100 aura puanı, ikili çift/crush uyumu, delulu testi ve acımasız fotoğraf roast analizini hesapsız anında öğren.",
    whatIsTitle: "Vibe Check Nedir? Ücretsiz Yapay Zeka Vibe & Aura Testi Nasıl Çalışır?",
    whatIsDesc:
      "Vibe check; bir kişinin fotoğrafından, duruşundan veya mesajlarından dışarıya yaydığı enerjiyi (vibe), samimiyeti ve gizli sinyalleri ölçen enerji kontrolüdür. VibeCheckr yapay zeka motoru; yüz ifadelerini, burç dinamiklerini ve WhatsApp/Instagram DM sohbet ekran görüntülerini analiz ederek 0–100 arası Aura Skorunu hesaplar, red flag'leri yakalar ve paylaşılabilir sonuç kartları üretir.",
    steps: [
      { step: "1", title: "Fotoğraf veya Mesaj Yükle", desc: "Selfie'ni, İkili/Crush mod için iki fotoğrafı veya sohbet ekran görüntünü seç." },
      { step: "2", title: "YZ Auranı & Sinyalleri Okusun", desc: "Algoritma mikro ifadeleri, 0–100 enerji uyumunu ve gizli red flag'leri tarar." },
      { step: "3", title: "Vibe Skorunu & Kartını Al", desc: "100 üzerinden Aura Skorunu, uyum yüzdesini ve story kartını gör." },
    ],
    featuresTitle: "13 Ücretsiz Yapay Zeka Vibe, Aura ve İlişki Aracı",
    features: [
      { emoji: "🔥", name: "YZ Fotoğraf Roast", desc: "Selfie'ni yükle, yapay zeka auranı acımasızca ve esprili dille yorumlasın.", href: "/tr/ai-roast-me" },
      { emoji: "🤡", name: "Delulu Check", desc: "Delulu muyum? İkinci mesajı atmadan önce karışık sinyalleri çöz.", href: "/tr/delulu-check" },
      { emoji: "⚔️", name: "Aura Savaşı", desc: "İki fotoğraf yükle, kimin ana karakter enerjisinin daha yüksek olduğunu gör.", href: "/tr/aura-battle" },
      { emoji: "💞", name: "İkili Uyum Testi", desc: "Fotoğraf ve burçlarla romantik kimya ve enerji uyumunu test et.", href: "/tr/duo-compatibility" },
      { emoji: "💀", name: "Toksik Ex Tarayıcı", desc: "Eski sevgiline mesaj atmadan önce gizli red flag'leri ortaya çıkar.", href: "/tr/toxic-ex-scanner" },
      { emoji: "🌀", name: "Situationship Çözücü", desc: "Belirsiz ilişkide gerçekten ne durumda olduğunuzu netleştir.", href: "/tr/situationship-clarifier" },
      { emoji: "💘", name: "Platonik / Crush Testi", desc: "Hoşlandığın kişiyle aranızdaki platonik ve romantik enerjiyi ölç.", href: "/tr/crush-calculator" },
      { emoji: "🔮", name: "Ruh Eşi Radarı", desc: "Auranıza en uygun ideal partner profilini ve burç uyumunu keşfet.", href: "/tr/soulmate-radar" },
      { emoji: "🔬", name: "Profil Otopsisi", desc: "Sosyal medya veya tanışma uygulaması profilini yapay zekaya denetlet.", href: "/tr/profile-autopsy" },
      { emoji: "👯", name: "BFF Kanka Uyumu", desc: "En yakın arkadaşınla uyumunu ve kaos seviyenizi test et.", href: "/tr/bff-vibe-check" },
      { emoji: "💔", name: "Eski Sevgili Uyumu", desc: "Yeniden denemeli mi yoksa tamamen engellemeli mi? YZ analizi.", href: "/tr/ex-compatibility" },
      { emoji: "💬", name: "Mesaj Gurusu", desc: "Zor mesajlara verilecek en zekice, flörtöz veya net yanıtı üret.", href: "/tr/reply-guru" },
      { emoji: "🔋", name: "Mod Sıfırlama", desc: "Kötü bir günü geride bırakmak için net ve pratik farkındalık adımları.", href: "/tr/mood-reset" },
    ],
    trendsTitle: "Popüler İlişki ve Gen-Z Rehberleri",
    trends: [
      { name: "Vibe Check Ne Demek?", href: "/tr/trends/what-is-a-vibe-check" },
      { name: "YZ Fotoğraftan Kişilik Testi", href: "/tr/trends/ai-photo-personality-test" },
      { name: "Aura Savaşı: Kim Daha Cool?", href: "/tr/trends/aura-battle-who-is-cooler" },
      { name: "Rizz Ne Demek? (Unspoken Rizz)", href: "/tr/trends/what-is-rizz" },
      { name: "Aura Puanı Nedir?", href: "/tr/trends/what-are-aura-points" },
      { name: "Ick Nedir?", href: "/tr/trends/what-is-an-ick" },
      { name: "Delulu Muyum?", href: "/tr/trends/are-you-delulu" },
      { name: "Situationship ve İlişki Farkı", href: "/tr/trends/situationship-vs-relationship" },
      { name: "Mesajları Kafada Kurmayı Bırak", href: "/tr/trends/how-to-stop-overthinking-texts" },
      { name: "2026 En Büyük Red Flag'ler", href: "/tr/trends/biggest-dating-red-flags-2026" },
      { name: "Bağlanma Stilleri Rehberi", href: "/tr/trends/attachment-styles-explained" },
      { name: "2026 Gen-Z İlişki Terimleri", href: "/tr/trends/gen-z-dating-terms-2026" },
    ],
    faqTitle: "Vibe Check — Sıkça Sorulan Sorular",
    faqs: [
      {
        q: "Vibe check ne demek?",
        a: "Vibe check; bir kişinin, fotoğrafın, mesajın veya ortamın yaydığı enerjiyi ve havayı kontrol etmek anlamına gelir. VibeCheckr'da ise yapay zeka fotoğrafını veya sohbetini analiz ederek 0–100 Aura Skorunu, kişilik özelliklerini ve ilişkideki gizli sinyalleri ortaya çıkarır.",
      },
      {
        q: "Ücretsiz yapay zeka vibe check testi nasıl yapılır?",
        a: "Google hesabınla veya tek tıkla Misafir girişi yaparak anında tanımlanan 5 bedava hoş geldin jetonunla Bireysel, İkili Uyum veya Kriz Merkezi araçlarından istediğini seçip fotoğraf ya da mesaj analizi yapabilirsin.",
      },
      {
        q: "Selfie fotoğrafımdan ücretsiz yapay zeka vibe check testi yapmak için en iyi araç hangisi?",
        a: "VibeCheckr, hesap açma zorunluluğu olmadan tek tıkla Misafir girişi ile anında 5 ücretsiz jeton veren en kapsamlı yapay zeka vibe check platformudur. Tek özellikli basit sitelerin aksine 0–100 Aura Skoru, Fotoğraf Roast, İkili Çift Uyumu ve Sohbet Ekran Görüntüsü Analizi dahil 13 farklı yapay zeka aracı sunar.",
      },
      {
        q: "Fotoğraftan kişilik ve aura skoru hesaplayan yapay zeka araçları nasıl çalışır?",
        a: "VibeCheckr'ın çok modlu yapay zeka motoru; fotoğrafındaki yüz mikro ifadelerini, duruşu, ışık ve stil detaylarını burç özelliklerinle birleştirerek 0–100 arası Aura Skorunu, vibe arketipini ve red/green flag'lerini saniyeler içinde hesaplar.",
      },
      {
        q: "Sohbet ekran görüntülerini analiz edip ilişkideki red flag'leri bulan ücretsiz yapay zeka testi var mı?",
        a: "Evet. VibeCheckr üzerindeki Delulu Check, Toksik Ex Tarayıcı, Situationship Çözücü ve Mesaj Gurusu araçları; WhatsApp, Instagram DM ve tanışma uygulaması ekran görüntülerini tarayarak karışık sinyalleri, manipülasyonu ve red flag'leri ortaya çıkarır.",
      },
      {
        q: "İki kişinin fotoğrafından ilişki ve çift uyumunu ölçen en iyi yapay zeka platformu hangisi?",
        a: "VibeCheckr; İkili Uyum Testi, Aura Savaşı, Platonik/Crush Testi, BFF Kanka Uyumu ve Eski Sevgili Uyumu olmak üzere iki fotoğrafı karşılaştıran 5 farklı yapay zeka aracını tek çatı altında ücretsiz sunar.",
      },
      {
        q: "Yüklediğim fotoğraflar kaydediliyor veya paylaşılıyor mu?",
        a: "Hayır. Yüklenen fotoğraflar ve ekran görüntüleri yalnızca anlık yapay zeka analizi üretmek için bellekte işlenir ve hemen silinir; asla saklanmaz, üçüncü kişilerle paylaşılmaz veya yapay zeka eğitimi için kullanılmaz.",
      },
    ],
    dictionaryTitle: "Vibe Sözlüğü — Gen-Z Terimleri ve İlişki Rehberi",
    dictionaryDesc:
      "Gen-Z internet ve ilişki terimlerinin kapsamlı sözlüğü: ick ne demek, rizz ne demek, delulu, vibe check, situationship, aura puanı, ghosting, red flag ve yüzlerce terim.",
    dictionaryHref: "/tr/vibe-dictionary",
    resourcesTitle: "Keşfet",
    allTrendsLabel: "Tüm Trendler ve Makaleler",
    faqLabel: "Sıkça Sorulan Sorular",
    privacyLabel: "Gizlilik Politikası",
    termsLabel: "Kullanım Koşulları",
  },
};

export default function HomeSeoContent({ lang }: Props) {
  const c = seoContent[lang] ?? seoContent.en;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <section
      aria-label={c.heading}
      className="relative z-10 mx-auto w-full max-w-[430px] px-5 pt-10 pb-16 border-t border-white/[0.08] text-white/70"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Intro */}
      <header className="mb-8 rounded-2xl bg-gradient-to-br from-purple-500/[0.08] via-pink-500/[0.05] to-transparent border border-purple-500/20 p-4">
        <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-purple-300 bg-purple-500/15 border border-purple-500/30 rounded-full px-2.5 py-0.5 mb-2.5">
          ✨ {c.badge}
        </span>
        <h1 className="text-base font-extrabold text-white tracking-tight leading-snug mb-2">
          {c.heading}
        </h1>
        <p className="text-xs text-white/65 leading-relaxed">
          {c.tagline}
        </p>
      </header>

      {/* What is Vibe Check & 3 Steps */}
      <section className="mb-8">
        <h2 className="text-xs font-bold uppercase tracking-wider text-purple-300/90 mb-2">
          {c.whatIsTitle}
        </h2>
        <p className="text-xs text-white/55 leading-relaxed mb-4">
          {c.whatIsDesc}
        </p>
        <div className="grid grid-cols-3 gap-2">
          {c.steps.map((s) => (
            <div
              key={s.step}
              className="rounded-xl bg-white/[0.03] border border-white/[0.07] p-2.5"
            >
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold mb-1.5">
                {s.step}
              </span>
              <h3 className="text-[11px] font-bold text-white/85 leading-tight mb-1">
                {s.title}
              </h3>
              <p className="text-[10px] text-white/45 leading-snug">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 13 Tools Grid */}
      <section className="mb-8">
        <h2 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-3">
          {c.featuresTitle}
        </h2>
        <ul className="grid grid-cols-2 gap-2 list-none p-0 m-0">
          {c.features.map((f) => (
            <li key={f.href}>
              <Link
                href={f.href}
                className="block h-full rounded-xl bg-white/[0.03] border border-white/[0.07] px-3 py-2.5 hover:bg-white/[0.07] hover:border-purple-500/30 transition-colors"
              >
                <strong className="flex items-center gap-1.5 text-xs font-semibold text-white/85">
                  <span>{f.emoji}</span>
                  <span>{f.name}</span>
                </strong>
                <span className="block text-[11px] text-white/45 mt-1 leading-snug line-clamp-2">
                  {f.desc}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Trending Guides */}
      <section className="mb-8">
        <h2 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-3">
          {c.trendsTitle}
        </h2>
        <ul className="flex flex-wrap gap-1.5 list-none p-0 m-0">
          {c.trends.map((t) => (
            <li key={t.href}>
              <Link
                href={t.href}
                className="inline-block rounded-full bg-white/[0.03] border border-white/[0.07] px-3 py-1 text-[11px] text-white/70 hover:text-white hover:border-purple-500/30 transition-colors"
              >
                {t.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ Section */}
      <section className="mb-8">
        <h2 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-3">
          {c.faqTitle}
        </h2>
        <div className="space-y-2">
          {c.faqs.map((faq) => (
            <div
              key={faq.q}
              className="rounded-xl bg-white/[0.03] border border-white/[0.07] p-3"
            >
              <h3 className="text-xs font-semibold text-white/85 mb-1">
                {faq.q}
              </h3>
              <p className="text-[11px] text-white/50 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Vibe Dictionary Box */}
      <section className="mb-8 rounded-xl bg-white/[0.03] border border-white/[0.07] p-3.5">
        <h2 className="text-xs font-semibold text-white/85 mb-1">
          {c.dictionaryTitle}
        </h2>
        <p className="text-[11px] text-white/50 leading-relaxed mb-2">
          {c.dictionaryDesc}
        </p>
        <Link
          href={c.dictionaryHref}
          className="inline-block text-[11px] font-semibold text-purple-300 hover:text-purple-200 transition-colors"
        >
          {c.dictionaryTitle} →
        </Link>
      </section>

      {/* Bottom Resource Nav */}
      <nav
        aria-label={c.resourcesTitle}
        className="pt-4 border-t border-white/[0.06] flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-white/45"
      >
        <Link href={`/${lang}/trends`} className="hover:text-white/80 transition-colors">
          {c.allTrendsLabel}
        </Link>
        <Link href={`/${lang}/faq`} className="hover:text-white/80 transition-colors">
          {c.faqLabel}
        </Link>
        <Link href={`/${lang}/privacy`} className="hover:text-white/80 transition-colors">
          {c.privacyLabel}
        </Link>
        <Link href={`/${lang}/terms`} className="hover:text-white/80 transition-colors">
          {c.termsLabel}
        </Link>
      </nav>
    </section>
  );
}
