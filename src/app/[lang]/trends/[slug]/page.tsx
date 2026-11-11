import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Sparkles, CheckCircle2, ChevronRight } from "lucide-react";
import { trendsDataEn, trendsDataTr } from "@/lib/trends-data";
import SeoFooter from "@/components/SeoFooter";
import InArticleAd from "@/components/InArticleAd";

export async function generateStaticParams() {
  const locales = ["en", "tr"];
  const enSlugs = trendsDataEn.map((article) => article.slug);
  const trSlugs = trendsDataTr.map((article) => article.slug);
  const allSlugs = [...new Set([...enSlugs, ...trSlugs])];
  return locales.flatMap((lang) =>
    allSlugs.map((slug) => ({ lang, slug }))
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string, lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const currentTrends = resolvedParams.lang === "tr" ? trendsDataTr : trendsDataEn;
  const article = currentTrends.find((a) => a.slug === resolvedParams.slug);
  
  if (!article) {
    return { title: "Not Found" };
  }

  const baseUrl = "https://thevibecheckr.com";
  const localeKey = resolvedParams.lang === "tr" ? "tr" : "en";
  const resolvedImage = article.imageUrl
    ? article.imageUrl.startsWith("http")
      ? article.imageUrl
      : `${baseUrl}${article.imageUrl}`
    : `${baseUrl}/opengraph-image.png`;

  return {
    title: `${article.title} | VibeCheckr`,
    description: article.description,
    keywords: article.keywords,
    alternates: {
      canonical: `${baseUrl}/${localeKey}/trends/${article.slug}`,
      languages: {
        en: `${baseUrl}/en/trends/${article.slug}`,
        tr: `${baseUrl}/tr/trends/${article.slug}`,
        "x-default": `${baseUrl}/en/trends/${article.slug}`,
      },
    },
    openGraph: {
      title: `${article.title} | VibeCheckr`,
      description: article.description,
      url: `${baseUrl}/${localeKey}/trends/${article.slug}`,
      siteName: "VibeCheckr",
      type: "article",
      publishedTime: article.publishDate,
      modifiedTime: "2026-11-11",
      authors: ["VibeCheckr AI"],
      images: [resolvedImage],
      locale: localeKey === "tr" ? "tr_TR" : "en_US",
      alternateLocale: localeKey === "tr" ? ["en_US"] : ["tr_TR"],
    },
  };
}

export default async function TrendArticlePage({ params }: { params: Promise<{ slug: string, lang: string }> }) {
  const resolvedParams = await params;
  const isTr = resolvedParams.lang === "tr";
  const localeKey = isTr ? "tr" : "en";
  const baseUrl = "https://thevibecheckr.com";
  const currentTrends = isTr ? trendsDataTr : trendsDataEn;
  const currentIdx = currentTrends.findIndex((a) => a.slug === resolvedParams.slug);
  const article = currentIdx >= 0 ? currentTrends[currentIdx] : undefined;

  if (!article) {
    notFound();
  }

  // Deterministic 4-article ring cross-linking so every article receives 4 incoming internal links
  const relatedOffsets = [1, 2, 5, 11];
  const relatedArticles = relatedOffsets
    .map((offset) => currentTrends[(currentIdx + offset) % currentTrends.length])
    .filter(
      (a, idx, arr) =>
        a &&
        a.slug !== resolvedParams.slug &&
        arr.findIndex((x) => x.slug === a.slug) === idx
    );

  const resolvedImageUrl = article.imageUrl
    ? article.imageUrl.startsWith("http")
      ? article.imageUrl
      : `${baseUrl}${article.imageUrl}`
    : `${baseUrl}/opengraph-image.png`;

  const pageUrl = `${baseUrl}/${localeKey}/trends/${article.slug}`;

  const ctaHref =
    article.ctaLink === "/"
      ? `/${resolvedParams.lang}`
      : `/${resolvedParams.lang}${article.ctaLink}`;

  // Article + FAQPage + BreadcrumbList JSON-LD Schema for Google Discover and Rich Results
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.description,
      inLanguage: isTr ? "tr-TR" : "en-US",
      image: [resolvedImageUrl],
      author: {
        "@type": "Organization",
        name: "VibeCheckr AI",
        url: baseUrl,
      },
      publisher: {
        "@type": "Organization",
        name: "VibeCheckr",
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/v-wave.png`,
        },
      },
      datePublished: article.publishDate,
      dateModified: "2026-11-11",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": pageUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: article.content.sections.map((sec) => ({
        "@type": "Question",
        name: sec.heading.trim().endsWith("?")
          ? sec.heading.trim()
          : `${sec.heading.trim()}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: sec.paragraph,
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
          item: `${baseUrl}/${localeKey}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: isTr ? "Vibe Kültür Merkezi" : "Vibe Culture Hub",
          item: `${baseUrl}/${localeKey}/trends`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: article.title,
          item: pageUrl,
        },
      ],
    },
  ];

  return (
    <div className="min-h-dvh bg-[#050510] text-white selection:bg-indigo-500/30">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-600/10 blur-[150px]" />
      </div>

      <article className="relative z-10 max-w-3xl mx-auto px-6 py-12 md:py-20">
        {/* Navigation */}
        <div className="flex items-center gap-4 mb-12">
          <Link
            href={`/${resolvedParams.lang}/trends`}
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            aria-label={isTr ? "Trendlere geri dön" : "Back to trends"}
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="text-sm font-medium tracking-widest text-indigo-400 uppercase">{isTr ? "Vibe Analizi" : "Vibe Analysis"}</span>
        </div>

        {/* Header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-6 text-sm font-medium text-white/50">
            <span className="text-indigo-400">{article.category}</span>
            <span>•</span>
            <span>{article.publishDate}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
            {article.title}
          </h1>
          <p className="text-xl text-white/70 leading-relaxed font-medium">
            {article.content.intro}
          </p>
        </header>

        {/* Quick Above-the-Fold Interactive Tool Callout */}
        <div className="mb-12 p-5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-sm text-white/80 font-medium">
              {isTr
                ? "Ücretsiz yapay zeka aracımızla kendi fotoğrafını veya mesajını 3 saniyede test et:"
                : "Test your own selfie or chat screenshot in 3 seconds with our free AI tool:"}
            </p>
          </div>
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center shrink-0 px-5 py-2.5 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-bold tracking-wide transition-all"
          >
            {article.ctaLabel} →
          </Link>
        </div>

        {/* Hero Image */}
        {article.imageUrl && (
          <div className="mb-16 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative aspect-video bg-white/5">
            <img 
              src={article.imageUrl} 
              alt={article.title} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}

        <div className="space-y-12 mb-16 text-lg text-white/80 leading-relaxed">
          {article.content.sections.map((section, idx) => (
            <React.Fragment key={idx}>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-indigo-500 shrink-0" />
                  <span>{section.heading}</span>
                </h2>
                <p className="pl-9">{section.paragraph}</p>
                {section.items && section.items.length > 0 && (
                  <ul className="pl-9 mt-4 space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-white/70 text-base">
                        <span className="text-indigo-400 mt-1 shrink-0 font-bold">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.scenario && (
                  <div className="pl-9 mt-5">
                    <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-white/60 text-base italic leading-relaxed">
                      <span className="not-italic text-indigo-400 font-semibold mr-2">
                        {isTr ? "💬 Örnek:" : "💬 Example:"}
                      </span>
                      {section.scenario}
                    </div>
                  </div>
                )}
              </section>
              {/* Her 2 bölümden sonra in-article reklam */}
              {idx > 0 && idx % 2 === 1 && <InArticleAd />}
            </React.Fragment>
          ))}
          
          <div className="p-6 rounded-2xl bg-white/5 border-l-4 border-indigo-500 italic mt-12">
            <p>{article.content.conclusion}</p>
          </div>
        </div>

        {/* Article CTA */}
        <div className="mb-20 p-10 rounded-3xl bg-gradient-to-br from-indigo-900/40 to-black border border-indigo-500/30 text-center">
          <Sparkles className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-3">{isTr ? "Sadece okumakla kalma." : "Don't just read about it."}</h3>
          <p className="text-white/60 mb-8 max-w-sm mx-auto">
            {isTr ? "İnternetin en acımasızca dürüst yapay zeka algoritmasını kendin deneyimle. Ücretsiz ve anında." : "Experience the internet's most brutally honest AI algorithm for yourself. Free and instant."}
          </p>
          <Link
            href={article.ctaLink === "/" ? `/${resolvedParams.lang}` : `/${resolvedParams.lang}${article.ctaLink}`}
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-indigo-500 text-white font-bold tracking-wide hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all hover:-translate-y-1"
          >
            {article.ctaLabel}
          </Link>
        </div>

        {/* Related Articles (Cross-linking) */}
        {relatedArticles.length > 0 && (
          <div className="border-t border-white/10 pt-16">
            <h3 className="text-2xl font-bold text-white mb-8">{isTr ? "Sıradakini Oku" : "Read Next"}</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedArticles.map((rel) => (
                <Link 
                  key={rel.slug} 
                  href={`/${resolvedParams.lang}/trends/${rel.slug}`}
                  className="group block p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.08] hover:border-indigo-500/50 transition-all duration-300"
                >
                  <div className="text-xs font-bold text-indigo-400 mb-2">{rel.category}</div>
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                    {rel.title}
                  </h4>
                  <div className="flex items-center text-sm font-medium text-white/50 group-hover:text-white/70 transition-colors">
                    {isTr ? "Makaleyi oku" : "Read article"} <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
      <SeoFooter />
    </div>
  );
}
