import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale, SUPPORTED_LOCALES } from "@/lib/dictionaries";
import LocaleSync from "@/components/LocaleSync";

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
  const canonicalBase = "https://thevibecheckr.vercel.app";

  return {
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
      <LocaleSync lang={lang} />
      {children}
    </>
  );
}
