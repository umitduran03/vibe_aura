import Link from "next/link";

interface Props {
  lang: "en" | "tr";
}

const seoContent = {
  en: {
    badge: "AI Vibe Check & Aura Analysis",
    heading: "VibeCheckr — AI Vibe Check Test, Aura Score & Photo Roast",
    tagline:
      "What is your vibe? Upload a selfie or chat screenshot for an unfiltered AI vibe check test, aura score, relationship compatibility analysis, and savage roast.",
    whatIsTitle: "What Is an AI Vibe Check & How Does It Work?",
    whatIsDesc:
      "A vibe check measures the energy, personality cues, and unspoken signals you give off in photos and text messages. VibeCheckr combines multimodal AI face/chat reading with zodiac psychology to score your aura from 0 to 100, expose hidden red flags, and generate shareable result cards in seconds.",
    steps: [
      { step: "1", title: "Upload Selfie or Chat", desc: "Drop a photo, two photos for Duo mode, or a text screenshot." },
      { step: "2", title: "AI Scans Your Vibe", desc: "Our AI reads micro-expressions, aura energy, and hidden signals." },
      { step: "3", title: "Get Your Score & Roast", desc: "Unlock your 0–100 Aura Score, red flags, and shareable story card." },
    ],
    featuresTitle: "AI Vibe & Relationship Tools",
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
      { name: "What is an Ick?", href: "/en/trends/what-is-an-ick" },
      { name: "Are You Delulu?", href: "/en/trends/are-you-delulu" },
      { name: "Situationship vs Relationship", href: "/en/trends/situationship-vs-relationship" },
      { name: "What Are Aura Points?", href: "/en/trends/what-are-aura-points" },
      { name: "What is Rizz?", href: "/en/trends/what-is-rizz" },
      { name: "Biggest Dating Red Flags 2026", href: "/en/trends/biggest-dating-red-flags-2026" },
      { name: "Attachment Styles Explained", href: "/en/trends/attachment-styles-explained" },
      { name: "Gen-Z Dating Terms 2026", href: "/en/trends/gen-z-dating-terms-2026" },
    ],
    faqTitle: "Vibe Check — Frequently Asked Questions",
    faqs: [
      {
        q: "What does vibe check mean?",
        a: "A vibe check is a quick assessment of someone's energy, mood, personality, or intentions. On VibeCheckr, our AI analyzes your selfie or chat messages to calculate your Aura Score, personality traits, and relationship red flags.",
      },
      {
        q: "How do I take the free AI vibe check test?",
        a: "Sign in with Google or continue as a Guest to claim 5 free welcome tokens immediately, choose Solo, Duo, or Crisis Center mode, and upload your photo or text scenario for an instant AI reading.",
      },
      {
        q: "Are my uploaded photos stored or shared?",
        a: "No. Your photos are processed securely in real time to generate your AI vibe analysis and are never sold or shared publicly.",
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
    badge: "Yapay Zeka Vibe Check & Aura Testi",
    heading: "VibeCheckr — Yapay Zeka Vibe Check Testi, Aura Skoru ve Fotoğraf Analizi",
    tagline:
      "Vibe check ne demek? Selfie'ni veya mesaj ekran görüntünü yükle; yapay zeka ile ücretsiz vibe check testi, aura puanı, ikili ilişki uyumu ve acımasız roast analizini anında öğren.",
    whatIsTitle: "Vibe Check Nedir? Yapay Zeka Vibe Testi Nasıl Çalışır?",
    whatIsDesc:
      "Vibe check; bir kişinin fotoğrafından, duruşundan veya mesajlarından dışarıya yaydığı enerjiyi (vibe), samimiyeti ve gizli sinyalleri ölçen enerji kontrolüdür. VibeCheckr yapay zeka motoru; yüz ifadelerini, burç dinamiklerini ve sohbet metinlerini analiz ederek 0–100 arası Aura Skorunu hesaplar, red flag'leri yakalar ve paylaşılabilir sonuç kartları üretir.",
    steps: [
      { step: "1", title: "Fotoğraf veya Mesaj Yükle", desc: "Selfie'ni, İkili (Duo) mod için iki fotoğrafı veya sohbet görüntünü seç." },
      { step: "2", title: "YZ Auranı & Sinyalleri Okusun", desc: "Algoritma mikro ifadeleri, enerji uyumunu ve gizli red flag'leri tarar." },
      { step: "3", title: "Vibe Skorunu & Kartını Al", desc: "100 üzerinden Aura Skorunu, acımasız roast yorumunu ve story kartını gör." },
    ],
    featuresTitle: "Yapay Zeka Vibe ve İlişki Araçları",
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
      { name: "Ick Nedir?", href: "/tr/trends/what-is-an-ick" },
      { name: "Delulu Muyum?", href: "/tr/trends/are-you-delulu" },
      { name: "Situationship ve İlişki Farkı", href: "/tr/trends/situationship-vs-relationship" },
      { name: "Aura Puanı Nedir?", href: "/tr/trends/what-are-aura-points" },
      { name: "Rizz Ne Demek?", href: "/tr/trends/what-is-rizz" },
      { name: "2026 En Büyük Red Flag'ler", href: "/tr/trends/biggest-dating-red-flags-2026" },
      { name: "Bağlanma Stilleri Rehberi", href: "/tr/trends/attachment-styles-explained" },
      { name: "2026 Gen-Z İlişki Terimleri", href: "/tr/trends/gen-z-dating-terms-2026" },
    ],
    faqTitle: "Vibe Check — Sıkça Sorulan Sorular",
    faqs: [
      {
        q: "Vibe check ne demek?",
        a: "Vibe check; bir kişinin, fotoğrafın, mesajın veya ortamın yaydığı enerjiyi ve havayı kontrol etmek anlamına gelir. VibeCheckr'da ise yapay zeka fotoğrafını veya sohbetini analiz ederek Aura Skorunu, kişilik özelliklerini ve ilişkideki gizli sinyalleri ortaya çıkarır.",
      },
      {
        q: "Ücretsiz yapay zeka vibe check testi nasıl yapılır?",
        a: "Google hesabınla veya tek tıkla Misafir girişi yaparak anında tanımlanan 5 bedava hoş geldin jetonunla Bireysel, İkili Uyum veya Kriz Merkezi araçlarından istediğini seçip fotoğraf ya da mesaj analizi yapabilirsin.",
      },
      {
        q: "Yüklediğim fotoğraflar kaydediliyor veya paylaşılıyor mu?",
        a: "Hayır. Yüklenen fotoğraflar yalnızca anlık yapay zeka analizi üretmek için işlenir; üçüncü kişilerle paylaşılmaz veya satılmaz.",
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
