import Link from "next/link";

interface Props {
  lang: "en" | "tr";
}

const seoContent = {
  en: {
    heading: "VibeCheckr — AI Vibe Check, Aura Score & Photo Roast",
    tagline:
      "Upload a selfie or describe your situation for an unfiltered AI personality analysis, aura score, relationship compatibility test, and savage roast.",
    featuresTitle: "AI Vibe & Relationship Tools",
    features: [
      { name: "AI Photo Roast", desc: "Brutally honest AI comedy roast of your selfie and vibe.", href: "/en/ai-roast-me" },
      { name: "Delulu Check", desc: "Am I delusional? Decode mixed signals before you double text.", href: "/en/delulu-check" },
      { name: "Aura Battle", desc: "Upload two photos and let AI decide who has higher main character energy.", href: "/en/aura-battle" },
      { name: "Duo Compatibility", desc: "Test romantic chemistry and zodiac aura alignment.", href: "/en/duo-compatibility" },
      { name: "Toxic Ex Scanner", desc: "Expose hidden red flags and toxic patterns before texting back.", href: "/en/toxic-ex-scanner" },
      { name: "Situationship Clarifier", desc: "Find out where you actually stand in your talking stage.", href: "/en/situationship-clarifier" },
      { name: "Crush Calculator", desc: "Calculate platonic vs. romantic energy from your photos.", href: "/en/crush-calculator" },
      { name: "Soulmate Radar", desc: "Discover your ideal partner profile and zodiac match.", href: "/en/soulmate-radar" },
      { name: "Profile Autopsy", desc: "Get a ruthless AI audit of your dating or social profile.", href: "/en/profile-autopsy" },
      { name: "BFF Vibe Check", desc: "Test best-friend compatibility and chaos levels.", href: "/en/bff-vibe-check" },
      { name: "Ex Compatibility", desc: "Should you get back together or block them forever?", href: "/en/ex-compatibility" },
      { name: "Reply Guru", desc: "Generate the perfect witty, flirty, or savage text reply.", href: "/en/reply-guru" },
      { name: "Mood Reset", desc: "Snap out of a bad day with a sharp, no-nonsense reality check.", href: "/en/mood-reset" },
    ],
    trendsTitle: "Trending Relationship & Gen-Z Guides",
    trends: [
      { name: "What is an Ick?", href: "/en/trends/what-is-an-ick" },
      { name: "Are You Delulu?", href: "/en/trends/are-you-delulu" },
      { name: "Situationship vs Relationship", href: "/en/trends/situationship-vs-relationship" },
      { name: "What Are Aura Points?", href: "/en/trends/what-are-aura-points" },
      { name: "What is Rizz?", href: "/en/trends/what-is-rizz" },
      { name: "Biggest Dating Red Flags 2026", href: "/en/trends/biggest-dating-red-flags-2026" },
      { name: "Attachment Styles Explained", href: "/en/trends/attachment-styles-explained" },
      { name: "Gen-Z Dating Terms 2026", href: "/en/trends/gen-z-dating-terms-2026" },
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
    heading: "VibeCheckr — Yapay Zeka Vibe Check, Aura Skoru ve Fotoğraf Analizi",
    tagline:
      "Selfie yükle veya durumunu anlat; yapay zeka ile acımasız kişilik analizi, aura puanı, ilişki uyumu testi ve eğlenceli roast sonucunu anında öğren.",
    featuresTitle: "Yapay Zeka Vibe ve İlişki Araçları",
    features: [
      { name: "YZ Fotoğraf Roast", desc: "Selfie'ni yükle, yapay zeka auranı acımasızca ve esprili dille yorumlasın.", href: "/tr/ai-roast-me" },
      { name: "Delulu Check", desc: "Delulu muyum? İkinci mesajı atmadan önce karışık sinyalleri çöz.", href: "/tr/delulu-check" },
      { name: "Aura Savaşı", desc: "İki fotoğraf yükle, kimin ana karakter enerjisinin daha yüksek olduğunu gör.", href: "/tr/aura-battle" },
      { name: "İkili Uyum Testi", desc: "Fotoğraf ve burçlarla romantik kimya ve enerji uyumunu test et.", href: "/tr/duo-compatibility" },
      { name: "Toksik Ex Tarayıcı", desc: "Eski sevgiline mesaj atmadan önce gizli red flag'leri ortaya çıkar.", href: "/tr/toxic-ex-scanner" },
      { name: "Situationship Çözücü", desc: "Belirsiz ilişkide gerçekten ne durumda olduğunuzu netleştir.", href: "/tr/situationship-clarifier" },
      { name: "Platonik / Crush Testi", desc: "Hoşlandığın kişiyle aranızdaki platonik ve romantik enerjiyi ölç.", href: "/tr/crush-calculator" },
      { name: "Ruh Eşi Radarı", desc: "Auranıza en uygun ideal partner profilini ve burç uyumunu keşfet.", href: "/tr/soulmate-radar" },
      { name: "Profil Otopsisi", desc: "Sosyal medya veya tanışma uygulaması profilini yapay zekaya denetlet.", href: "/tr/profile-autopsy" },
      { name: "BFF Kanka Uyumu", desc: "En yakın arkadaşınla uyumunu ve kaos seviyenizi test et.", href: "/tr/bff-vibe-check" },
      { name: "Eski Sevgili Uyumu", desc: "Yeniden denemeli mi yoksa tamamen engellemeli mi? YZ analizi.", href: "/tr/ex-compatibility" },
      { name: "Mesaj Gurusu", desc: "Zor mesajlara verilecek en zekice, flörtöz veya net yanıtı üret.", href: "/tr/reply-guru" },
      { name: "Mod Sıfırlama", desc: "Kötü bir günü geride bırakmak için net ve pratik farkındalık adımları.", href: "/tr/mood-reset" },
    ],
    trendsTitle: "Popüler İlişki ve Gen-Z Rehberleri",
    trends: [
      { name: "Ick Nedir?", href: "/tr/trends/what-is-an-ick" },
      { name: "Delulu Muyum?", href: "/tr/trends/are-you-delulu" },
      { name: "Situationship ve İlişki Farkı", href: "/tr/trends/situationship-vs-relationship" },
      { name: "Aura Puanı Nedir?", href: "/tr/trends/what-are-aura-points" },
      { name: "Rizz Ne Demek?", href: "/tr/trends/what-is-rizz" },
      { name: "2026 En Büyük Red Flag'ler", href: "/tr/trends/biggest-dating-red-flags-2026" },
      { name: "Bağlanma Stilleri Rehberi", href: "/tr/trends/attachment-styles-explained" },
      { name: "2026 Gen-Z İlişki Terimleri", href: "/tr/trends/gen-z-dating-terms-2026" },
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

  return (
    <div
      className="sr-only"
      style={{
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: 0,
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        border: 0,
      }}
    >
      <h1>{c.heading}</h1>
      <p>{c.tagline}</p>

      <section>
        <h2>{c.featuresTitle}</h2>
        <ul>
          {c.features.map((f) => (
            <li key={f.href}>
              <Link href={f.href}>
                <strong>{f.name}</strong>
              </Link>
              <span> {f.desc}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{c.trendsTitle}</h2>
        <ul>
          {c.trends.map((t) => (
            <li key={t.href}>
              <Link href={t.href}>{t.name}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{c.dictionaryTitle}</h2>
        <p>{c.dictionaryDesc}</p>
        <Link href={c.dictionaryHref}>{c.dictionaryTitle}</Link>
      </section>

      <nav aria-label={c.resourcesTitle}>
        <Link href={`/${lang}/trends`}>{c.allTrendsLabel}</Link>
        <Link href={`/${lang}/faq`}>{c.faqLabel}</Link>
        <Link href={`/${lang}/privacy`}>{c.privacyLabel}</Link>
        <Link href={`/${lang}/terms`}>{c.termsLabel}</Link>
      </nav>
    </div>
  );
}
