/**
 * HomeSeoContent — Server Component
 *
 * Googlebot ve diger arama motoru botlarinin tarayabilecegi statik SEO icerigi.
 * Mevcut "use client" page.tsx hicbir logic degistirmeden ustune eklenir.
 *
 * Strateji: position:absolute; left:-9999px ile gorunmez ama DOM icinde var.
 * Googlebot JavaScript gerektirmeden okuyabilir.
 * NOT: display:none veya visibility:hidden KULLANILMAZ — spam sinyali sayilir.
 */

import Link from "next/link";

interface Props {
  lang: "en" | "tr";
}

const seoContent = {
  en: {
    h1: "VibeCheckr — AI Vibe Check & Photo Roast",
    tagline:
      "Upload your selfie. Get a brutally honest AI personality analysis, aura score & savage roast. 100% free.",
    featuresTitle: "AI-Powered Features",
    features: [
      { name: "AI Vibe Check", desc: "Upload your selfie for a free AI personality analysis and aura score.", href: "/en" },
      { name: "AI Photo Roast", desc: "Get roasted by AI. Savage, brutally honest, and hilarious results.", href: "/en?feature=ai-roast-me" },
      { name: "Delulu Check", desc: "Am I delusional? Take the AI reality check before you double text.", href: "/en/delulu-check" },
      { name: "Aura Battle", desc: "Upload two photos. AI decides who has the stronger aura.", href: "/en/aura-battle" },
      { name: "Duo Compatibility", desc: "Test your relationship chemistry with AI photo analysis.", href: "/en/duo-compatibility" },
      { name: "Toxic Ex Scanner", desc: "AI analyzes your ex behavior and exposes toxic patterns.", href: "/en/toxic-ex-scanner" },
      { name: "Situationship Clarifier", desc: "Decode mixed signals. Are you in a situationship or a real relationship?", href: "/en/situationship-clarifier" },
      { name: "Crush Calculator", desc: "Does your crush like you? AI calculates the probability.", href: "/en/crush-calculator" },
      { name: "Soulmate Radar", desc: "AI scans your aura to reveal your perfect soulmate profile.", href: "/en/soulmate-radar" },
      { name: "Profile Autopsy", desc: "Brutal AI audit of your dating or social media profile.", href: "/en/profile-autopsy" },
      { name: "BFF Vibe Check", desc: "Test friendship compatibility and expose chaos levels.", href: "/en/bff-vibe-check" },
      { name: "Reply Guru", desc: "AI generates the perfect flirty or savage reply to any text.", href: "/en/reply-guru" },
    ],
    trendsTitle: "Trending on VibeCheckr",
    trends: [
      { name: "What is an Ick?", href: "/en/trends/what-is-an-ick" },
      { name: "Am I Delulu?", href: "/en/trends/are-you-delulu" },
      { name: "Situationship vs Relationship", href: "/en/trends/situationship-vs-relationship" },
      { name: "What Are Aura Points?", href: "/en/trends/what-are-aura-points" },
      { name: "What is Rizz?", href: "/en/trends/what-is-rizz" },
      { name: "Biggest Dating Red Flags 2026", href: "/en/trends/biggest-dating-red-flags-2026" },
    ],
    dictionaryTitle: "Vibe Dictionary — Gen-Z Slang Guide",
    dictionaryDesc:
      "The authoritative encyclopedia for Gen-Z internet slang: ick, rizz, delulu, vibe check, situationship, aura points, red flags and hundreds more.",
    dictionaryHref: "/en/vibe-dictionary",
  },
  tr: {
    h1: "VibeCheckr — Yapay Zeka Vibe Check ve Fotoğraf Analizi",
    tagline:
      "Selfie yükle, yapay zeka aura skorunu ve kişiliğini acımasızca açığa çıkarsın. Ücretsiz vibe check uygulaması.",
    featuresTitle: "Yapay Zeka Özellikleri",
    features: [
      { name: "Yapay Zeka Vibe Check", desc: "Selfie yükle, ücretsiz yapay zeka kişilik analizi ve aura skoru al.", href: "/tr" },
      { name: "Fotoğraf Roast", desc: "Yapay zeka seni acımasızca eleştiriyor. Dene.", href: "/tr?feature=ai-roast-me" },
      { name: "Delulu Check", desc: "Delulu muyum? Çift mesaj atmadan önce yapay zeka gerçeklik testini yap.", href: "/tr/delulu-check" },
      { name: "Aura Savaşı", desc: "İki fotoğraf yükle, yapay zeka kimin aurasının güçlü olduğuna karar versin.", href: "/tr/aura-battle" },
      { name: "İkili Uyum Testi", desc: "Fotoğraflarla ilişki kimyasını test et. Romantik veya platonik uyumunu öğren.", href: "/tr/duo-compatibility" },
      { name: "Toksik Ex Tarayıcı", desc: "Yapay zeka eskinin davranışlarını analiz ediyor ve red flag'leri ifşa ediyor.", href: "/tr/toxic-ex-scanner" },
      { name: "Situationship Aydınlatıcı", desc: "Karışık sinyalleri çöz. Situationship mı yoksa gerçek bir ilişki mi?", href: "/tr/situationship-clarifier" },
      { name: "Aşk Hesaplayıcı", desc: "Aşkın seni seviyor mu? Yapay zeka olasılığı hesaplıyor.", href: "/tr/crush-calculator" },
      { name: "Ruh Eşi Radarı", desc: "Yapay zeka auranı tarayıp ideal ruh eşi profilini açıklıyor.", href: "/tr/soulmate-radar" },
      { name: "Profil Otopsisi", desc: "Dating veya sosyal medya profilinin acımasız yapay zeka denetimi. Red flag'leri bul.", href: "/tr/profile-autopsy" },
      { name: "BFF Vibe Check", desc: "Arkadaşlık uyumunu test et ve kaos seviyesini öğren.", href: "/tr/bff-vibe-check" },
      { name: "Mesaj Gurusu", desc: "Yapay zeka her mesaja mükemmel yanıtı üretiyor. Artık ne yazacağını bilmiyorum derdin yok.", href: "/tr/reply-guru" },
    ],
    trendsTitle: "VibeCheckr Trendleri",
    trends: [
      { name: "Ick Nedir?", href: "/tr/trends/what-is-an-ick" },
      { name: "Delulu Muyum?", href: "/tr/trends/are-you-delulu" },
      { name: "Situationship ve İlişki Farkı", href: "/tr/trends/situationship-vs-relationship" },
      { name: "Aura Puanları Nedir?", href: "/tr/trends/what-are-aura-points" },
      { name: "Rizz Ne Demek?", href: "/tr/trends/what-is-rizz" },
      { name: "2026 En Büyük Red Flag'ler", href: "/tr/trends/biggest-dating-red-flags-2026" },
    ],
    dictionaryTitle: "Vibe Sözlüğü — Gen-Z Slang Rehberi",
    dictionaryDesc:
      "Gen-Z internet slanglerinin yetkili ansiklopedisi: ick ne demek, rizz ne demek, delulu, vibe check ne demek, situationship, aura puanları ve daha yüzlerce terim.",
    dictionaryHref: "/tr/vibe-dictionary",
  },
};

/**
 * Gorsel olarak gizli ama DOM ve botlar icin erisebilir SEO icerigi.
 * Kullanici goremez, Googlebot okuyabilir.
 */
export default function HomeSeoContent({ lang }: Props) {
  const c = seoContent[lang] ?? seoContent.en;

  return (
    <div
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
      <h1>{c.h1}</h1>
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
    </div>
  );
}
