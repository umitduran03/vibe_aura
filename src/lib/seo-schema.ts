import { featureSeoData } from "@/lib/seo-feature-data";

const BASE_URL = "https://thevibecheckr.com";

type ExtraFaq = { q: string; a: string };

interface ToolSchemaOptions {
  slug: string;
  lang: string;
  name: string;
  breadcrumbName: string;
  description: string;
  featureList?: string[];
  extraFaqs?: ExtraFaq[];
}

export function buildToolJsonLd({
  slug,
  lang,
  name,
  breadcrumbName,
  description,
  featureList,
  extraFaqs = [],
}: ToolSchemaOptions) {
  const isTr = lang === "tr";
  const localeKey = isTr ? "tr" : "en";
  const pageUrl = `${BASE_URL}/${localeKey}/${slug}`;

  const appSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    url: pageUrl,
    inLanguage: isTr ? "tr-TR" : "en-US",
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Web, Android, iOS",
    isAccessibleForFree: true,
    description,
    screenshot: `${BASE_URL}/opengraph-image.png`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    creator: {
      "@type": "Organization",
      name: "VibeCheckr",
      url: BASE_URL,
      logo: `${BASE_URL}/v-wave.png`,
      sameAs: ["https://www.producthunt.com/products/vibecheckr"],
    },
  };

  if (featureList && featureList.length > 0) {
    appSchema.featureList = featureList;
  }

  const baseFaqs: ExtraFaq[] =
    featureSeoData[slug]?.[localeKey]?.faq?.questions ?? [];
  const seen = new Set<string>();
  const mergedFaqs: ExtraFaq[] = [];

  for (const item of [...extraFaqs, ...baseFaqs]) {
    const norm = item.q.trim().toLowerCase();
    if (!seen.has(norm)) {
      seen.add(norm);
      mergedFaqs.push(item);
    }
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isTr ? "Ana Sayfa" : "Home",
        item: `${BASE_URL}/${localeKey}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: breadcrumbName,
        item: pageUrl,
      },
    ],
  };

  if (mergedFaqs.length > 0) {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: mergedFaqs.map((q) => ({
        "@type": "Question",
        name: q.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: q.a,
        },
      })),
    };
    return [appSchema, faqSchema, breadcrumbSchema];
  }

  return [appSchema, breadcrumbSchema];
}

export function buildDictionaryJsonLd(lang: string) {
  const isTr = lang === "tr";
  const localeKey = isTr ? "tr" : "en";
  const pageUrl = `${BASE_URL}/${localeKey}/vibe-dictionary`;

  const definedTerms = isTr
    ? [
        {
          name: "Vibe Check",
          description:
            "Bir kişinin, fotoğrafın veya mesajın yaydığı anlık enerji, aura ve ilk izlenim analizi.",
        },
        {
          name: "Ick",
          description:
            "Hoşlandığın birinin yaptığı küçük bir hareket yüzünden tüm çekimin saniyesinde sıfırlanması ve soğuma hissi.",
        },
        {
          name: "Delulu",
          description:
            "Delusional kelimesinin kısaltması; karışık sinyalleri abartıp gerçek dışı romantik beklentilere girme hali.",
        },
        {
          name: "Rizz",
          description:
            "Karizma (charisma) kelimesinden türeyen, birini mesajla veya tavırla doğal şekilde etkileme ve flört yeteneği.",
        },
        {
          name: "Situationship",
          description:
            "Arkadaşlıktan ileri ama adı konmamış, belirsiz ve bağlanmaktan kaçılan gri bölge ilişkisi.",
        },
        {
          name: "Aura Points (Aura Puanı)",
          description:
            "Gen-Z kültüründe karizmatik veya utanç verici hareketlere göre kazanılan ya da kaybedilen görünmez sosyal prestij puanı.",
        },
        {
          name: "Orbiting",
          description:
            "Mesajlarına cevap vermeyip seni ghostlayan birinin tüm Instagram hikayelerini izlemeye devam etmesi.",
        },
        {
          name: "Gaslighting",
          description:
            "Karşı tarafın gerçekliği çarpıtarak seni kendi hafızandan ve haklılığından şüphe etmeye zorladığı psikolojik manipülasyon.",
        },
      ]
    : [
        {
          name: "Vibe Check",
          description:
            "A spontaneous evaluation of someone's energy, mood, aura, and first-impression personality cues.",
        },
        {
          name: "The Ick",
          description:
            "A sudden, irreversible wave of cringe or turn-off triggered by a small habit that instantly kills romantic attraction.",
        },
        {
          name: "Delulu",
          description:
            "Short for delusional; reading romantic meaning into dry texts, mixed signals, or dead-end situationships.",
        },
        {
          name: "Rizz",
          description:
            "Short for charisma; natural charm, effortless flirting ability, and magnetic texting game.",
        },
        {
          name: "Situationship",
          description:
            "An undefined romantic entanglement stuck between casual talking and an official committed relationship.",
        },
        {
          name: "Aura Points",
          description:
            "Gen-Z's invisible social currency gained through cool, smooth moments and lost through awkward mishaps.",
        },
        {
          name: "Orbiting",
          description:
            "When someone ghosts your messages or ends things, yet still views every single social media story you post.",
        },
        {
          name: "Gaslighting",
          description:
            "Psychological manipulation that makes you question your own memory, instincts, and perception of reality.",
        },
      ];

  const termSetSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: isTr
      ? "Vibe Sözlüğü — Gen-Z Slang, İlişki Terimleri & Vibe Check Anlamı"
      : "Vibe Dictionary — Gen-Z Slang, Dating Terms & Vibe Check Meaning",
    url: pageUrl,
    inLanguage: isTr ? "tr-TR" : "en-US",
    description: isTr
      ? "Vibe check ne demek, ick nedir, delulu, rizz, situationship, orbiting ve 300+ Gen-Z internet jargonu teriminin Türkçe sözlüğü."
      : "Complete 300+ term Gen-Z slang dictionary explaining vibe check, the ick, delulu, rizz, situationship, aura points, orbiting, and modern dating lingo.",
    hasDefinedTerm: definedTerms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.name,
      description: t.description,
      inDefinedTermSet: pageUrl,
    })),
  };

  const baseFaqs: ExtraFaq[] =
    featureSeoData["vibe-dictionary"]?.[localeKey]?.faq?.questions ?? [];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isTr ? "Ana Sayfa" : "Home",
        item: `${BASE_URL}/${localeKey}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isTr ? "Vibe Sözlüğü" : "Vibe Dictionary",
        item: pageUrl,
      },
    ],
  };

  if (baseFaqs.length > 0) {
    return [
      termSetSchema,
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: baseFaqs.map((q) => ({
          "@type": "Question",
          name: q.q,
          acceptedAnswer: { "@type": "Answer", text: q.a },
        })),
      },
      breadcrumbSchema,
    ];
  }

  return [termSetSchema, breadcrumbSchema];
}
