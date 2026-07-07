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

  return {
    metadataBase: new URL("https://thevibecheckr.com"),
    title: dict.seo.title,
    description: dict.seo.description,
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
      locale: lang === "tr" ? "tr_TR" : "en_US",
      alternateLocale: lang === "tr" ? ["en_US"] : ["tr_TR"],
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
