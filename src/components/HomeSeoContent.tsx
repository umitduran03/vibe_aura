/**
 * HomeSeoContent — Server Component
 *
 * Ana sayfadaki SEO içeriği. Hem kullanıcıya hem Googlebot'a GÖRÜNÜR şekilde sunulur.
 * Gizli metin tekniği (clip, position:absolute, 1px) Google tarafından spam olarak
 * algılanır ve sıralama cezası verir — bu yüzden içerik normal şekilde render edilir.
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
      { name: "AI Photo Roast", desc: "Get roasted by AI. Savage, brutally honest, and hilarious results.", href: "/en/ai-roast-me" },
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
      { name: "Fotoğraf Roast", desc: "Yapay zeka seni acımasızca eleştiriyor. Dene.", href: "/tr/ai-roast-me" },
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
 * SEO içeriği — kullanıcıya GÖRÜNÜR, sayfanın alt kısmında yer alır.
 * Feature listesi, trend linkleri ve sözlük bağlantısı içerir.
 */
export default function HomeSeoContent({ lang }: Props) {
  const c = seoContent[lang] ?? seoContent.en;

  return (
    <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 border-t border-white/10">
      <h1 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
        {c.h1}
      </h1>
      <p className="text-lg text-white/70 mb-12 leading-relaxed max-w-2xl">
        {c.tagline}
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          {c.featuresTitle}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {c.features.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="group block p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/[0.08] hover:border-indigo-500/30 transition-all"
            >
              <strong className="text-white text-sm font-semibold group-hover:text-indigo-300 transition-colors">
                {f.name}
              </strong>
              <p className="text-white/50 text-xs mt-1 leading-relaxed">
                {f.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
          {c.trendsTitle}
        </h2>
        <div className="flex flex-wrap gap-2">
          {c.trends.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm hover:bg-indigo-500/20 hover:border-indigo-500/30 hover:text-white transition-all"
            >
              {t.name}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          {c.dictionaryTitle}
        </h2>
        <p className="text-white/60 text-sm mb-4 leading-relaxed max-w-xl">
          {c.dictionaryDesc}
        </p>
        <Link
          href={c.dictionaryHref}
          className="inline-flex items-center text-indigo-400 text-sm font-medium hover:text-indigo-300 transition-colors"
        >
          {c.dictionaryTitle} →
        </Link>
      </section>
    </div>
  );
}
