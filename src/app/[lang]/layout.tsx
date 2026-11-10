import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale, SUPPORTED_LOCALES } from "@/lib/dictionaries";
import LocaleSync from "@/components/LocaleSync";
import HtmlLangSync from "@/components/HtmlLangSync";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};

  const dict = await getDictionary(lang as Locale);
  const canonicalBase = "https://thevibecheckr.com";
  const isTr = lang === "tr";

  return {
    metadataBase: new URL("https://thevibecheckr.com"),
    title: {
      absolute: dict.seo.title,
      template: "%s | VibeCheckr",
    },
    description: dict.seo.description,
    keywords: isTr
      ? [
          "vibe check",
          "vibe check testi",
          "vibe check ne demek",
          "vibe testi ücretsiz",
          "yapay zeka vibe check",
          "fotoğraftan aura puanı hesaplama",
          "aura skoru testi",
          "yapay zeka fotoğraf analizi",
          "beni göm ai",
          "delulu testi",
          "delulu check türkçe",
          "ikili çift uyum testi fotoğraflı",
          "hoşlandığım kişi benden hoşlanıyor mu testi",
          "platonik aşk testi",
          "arkadaşlık uyum testi",
          "situationship testi",
          "mesaj ekran görüntüsü analizi",
          "toksik eski sevgili testi",
          "vibecheckr",
        ]
      : [
          "vibe check",
          "AI vibe check",
          "vibe check test free",
          "what is a vibe check",
          "free vibe check online",
          "aura score test from photo",
          "what vibe do I give off quiz",
          "AI photo roast",
          "roast my selfie AI",
          "delulu check test",
          "am I delusional quiz",
          "crush compatibility calculator with photos",
          "does my crush like me test",
          "couple compatibility test from 2 photos",
          "best friend compatibility test",
          "situationship clarifier",
          "text screenshot red flag analyzer",
          "rizz AI reply generator",
          "toxic ex scanner",
          "vibecheckr",
        ],
    alternates: {
      canonical: `${canonicalBase}/${lang}`,
      languages: {
        en: `${canonicalBase}/en`,
        tr: `${canonicalBase}/tr`,
        "x-default": `${canonicalBase}/en`,
      },
    },
    openGraph: {
      title: dict.seo.title,
      description: dict.seo.description,
      url: `${canonicalBase}/${lang}`,
      siteName: "VibeCheckr",
      type: "website",
      locale: isTr ? "tr_TR" : "en_US",
      alternateLocale: isTr ? ["en_US"] : ["tr_TR"],
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    },
  };
}

/**
 * Locale Layout — Server Component
 * Validates the lang param. LocaleSync (client) writes locale to Zustand
 * so ALL child pages/components get the correct language automatically.
 */
export default async function LocaleLayout({ children, params }: Props) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  return (
    <>
      {/* Kritik: <html lang> attribute'unu locale'e göre dinamik ayarlar */}
      <HtmlLangSync lang={lang} />
      <LocaleSync lang={lang} />
      {children}
    </>
  );
}
