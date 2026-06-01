import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";
import { trendsData } from "@/lib/trends-data";

export async function generateStaticParams() {
  return trendsData.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = trendsData.find((a) => a.slug === params.slug);
  
  if (!article) {
    return { title: "Not Found" };
  }

  return {
    title: `${article.title} | VibeCheckr Trends`,
    description: article.description,
    keywords: article.keywords,
    alternates: {
      canonical: `https://thevibecheckr.vercel.app/trends/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.publishDate,
      authors: ["VibeCheckr AI"],
    }
  };
}

export default function TrendArticlePage({ params }: { params: { slug: string } }) {
  const article = trendsData.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  // Article JSON-LD Schema for Google Discover and Rich Results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    author: {
      "@type": "Organization",
      name: "VibeCheckr AI",
      url: "https://thevibecheckr.vercel.app"
    },
    publisher: {
      "@type": "Organization",
      name: "VibeCheckr",
      logo: {
        "@type": "ImageObject",
        url: "https://thevibecheckr.vercel.app/vibecheckr-logo.png"
      }
    },
    datePublished: article.publishDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://thevibecheckr.vercel.app/trends/${article.slug}`
    }
  };

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
            href="/trends"
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            aria-label="Back to trends"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="text-sm font-medium tracking-widest text-indigo-400 uppercase">Vibe Analysis</span>
        </div>

        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-6 text-sm font-medium text-white/50">
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

        {/* Content */}
        <div className="space-y-12 mb-16 text-lg text-white/80 leading-relaxed">
          {article.content.sections.map((section, idx) => (
            <section key={idx}>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-indigo-500" />
                {section.heading}
              </h2>
              <p className="pl-9">{section.paragraph}</p>
            </section>
          ))}
          
          <div className="p-6 rounded-2xl bg-white/5 border-l-4 border-indigo-500 italic">
            <p>{article.content.conclusion}</p>
          </div>
        </div>

        {/* Article CTA */}
        <div className="p-10 rounded-3xl bg-gradient-to-br from-indigo-900/40 to-black border border-indigo-500/30 text-center">
          <Sparkles className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-3">Don't just read about it.</h3>
          <p className="text-white/60 mb-8 max-w-sm mx-auto">
            Experience the internet's most brutally honest AI algorithm for yourself. Free and instant.
          </p>
          <Link
            href={article.ctaLink}
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-indigo-500 text-white font-bold tracking-wide hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all hover:-translate-y-1"
          >
            {article.ctaLabel}
          </Link>
        </div>
      </article>
    </div>
  );
}
