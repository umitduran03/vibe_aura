import type { Metadata } from "next";
import { featureSeoData } from "@/lib/seo-feature-data";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

const baseUrl = "https://thevibecheckr.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isTr = lang === "tr";

  const featureData = featureSeoData["delulu-check"]?.[isTr ? "tr" : "en"];
  let faqJsonLd = null;
  if (featureData?.faq?.questions) {
    faqJsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: featureData.faq.questions.map((q: any) => ({
        "@type": "Question",
        name: q.q,
        acceptedAnswer: { "@type": "Answer", text: q.a },
      })),
    };
  }

  // SoftwareApplication + FAQPage combined JSON-LD — SSR so Googlebot sees it
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: isTr ? "Delulu Check YZ" : "Delulu Check AI",
      applicationCategory: "EntertainmentApplication",
      operatingSystem: "Web, Android, iOS",
      url: isTr ? `${baseUrl}/tr/delulu-check` : `${baseUrl}/en/delulu-check`,
      description: isTr
        ? "Karışık sinyaller mi alıyorsun yoksa tamamen delulu musun? Yapay zeka gerçeklik testini çift mesaj atmadan önce yap."
        : "Getting mixed signals or just being delusional? Take the AI reality check before you double text.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      featureList: [
        "AI Reality Check",
        "Mixed Signal Analysis",
        "Delulu Score (0-100%)",
        "Red Flag Detection",
        "Next Step Recommendations",
        "Turkish & English Support",
      ],
      screenshot: `${baseUrl}/opengraph-image.png`,
      creator: {
        "@type": "Organization",
        name: "VibeCheckr",
        url: baseUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: isTr
        ? [
            {
              "@type": "Question",
              name: "Delulu check nedir?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Delulu check, aşk hayatında yaşanan belirsiz durumlara (karışık sinyaller, ghostlama, read-delivered durumu) yapay zeka aracılığıyla gerçekçi bir bakış açısı sunan bir reality check aracıdır. 'Delulu muyum yoksa haklı mıyım?' sorusuna yanıt verir.",
              },
            },
            {
              "@type": "Question",
              name: "Delulu check nasıl yapılır?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Durumu veya mesajları VibeCheckr Delulu Check özelliğine yapıştır. Yapay zeka anlattıklarını gerçek davranış kalıpları ve red flag veritabanıyla kıyaslayarak sana bir gerçeklik puanı ve 'sırada ne yapmalısın' tavsiyesi verir.",
              },
            },
            {
              "@type": "Question",
              name: "Delulu muyum nasıl anlarım?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Aynı mesajları defalarca okuyorsan, yapılan planlar hep iptal ediliyorsa, 'görüldü' kalıp cevap gelmiyorsa veya davranışlara sürekli bahane buluyorsan delulu olma ihtimalin yüksek. Yapay zeka kesin cevabı verir.",
              },
            },
            {
              "@type": "Question",
              name: "Delulu check ücretsiz mi?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Evet, VibeCheckr Delulu Check tamamen ücretsizdir. Google ile giriş yap ve anında reality check'ini al.",
              },
            },
          ]
        : [
            {
              "@type": "Question",
              name: "What is a delulu check?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A delulu check is an AI-powered reality check that analyzes confusing romantic situations — mixed signals, ghosting, being left on read — and tells you honestly whether you are being delusional or actually valid.",
              },
            },
            {
              "@type": "Question",
              name: "Am I delusional or getting mixed signals?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "If you have re-read the same conversation multiple times, made excuses for cancelled plans, or think a one-word reply has hidden meaning, there's a high chance you're being delulu. The AI will give you the definitive answer.",
              },
            },
            {
              "@type": "Question",
              name: "How does the delulu check AI work?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Paste their messages or describe the situation in VibeCheckr's Delulu Check tool. The AI cross-references your story against real behavioral patterns, attachment styles, and red flag databases — then gives you a reality score and next steps.",
              },
            },
            {
              "@type": "Question",
              name: "Is the delulu check free?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, VibeCheckr's Delulu Check is completely free. Sign in with Google and get your instant reality check.",
              },
            },
          ],
    },
  ];

  if (isTr) {
    return {
      title: "Delulu Check — Delulu Muyum? Yapay Zeka Gerçeklik Testi | VibeCheckr",
      description:
        "Delulu check nedir? Karışık sinyaller mi alıyorsun? Çift mesaj atmadan önce yapay zeka gerçeklik testini yap. O gerçekten seni seviyor mu, yoksa sen mi delusional'sın? Ücretsiz dene.",
      keywords: [
        "delulu check",
        "delulu muyum",
        "gerçeklik testi",
        "karışık sinyaller",
        "delulu check nedir",
        "am i delulu",
        "double text yapmalı mıyım",
        "yapay zeka ilişki analizi",
        "mixed signal ne demek",
        "delulu testi ücretsiz",
      ],
      alternates: {
        canonical: `${baseUrl}/tr/delulu-check`,
        languages: {
          en: `${baseUrl}/en/delulu-check`,
          tr: `${baseUrl}/tr/delulu-check`,
          "x-default": `${baseUrl}/en/delulu-check`,
        },
      },
      openGraph: {
        title: "Delulu Check — Delulu Muyum? Yapay Zeka Gerçeklik Testi",
        description:
          "Delulu check nedir? Karışık sinyaller mi alıyorsun? Çift mesaj atmadan önce yapay zeka gerçeklik testini yap. O gerçekten seni seviyor mu, yoksa sen mi delusional'sın?",
        url: `${baseUrl}/tr/delulu-check`,
        type: "website",
        locale: "tr_TR",
        images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
      },
      other: {
        "application-ld+json": JSON.stringify(faqJsonLd ? [jsonLd, faqJsonLd] : jsonLd),
      },
    };
  }

  return {
    title: "Delulu Check — Am I Delusional? AI Reality Check | VibeCheckr",
    description:
      "What is a delulu check? Getting mixed signals? Take the AI reality check before double texting. Are they really interested or are you delusional? Find out instantly — 100% free.",
    keywords: [
      "delulu check",
      "am i delusional",
      "delulu check ai",
      "am i being delusional",
      "mixed signals ai",
      "stop double texting",
      "should i text them",
      "mixed signals meaning",
      "reality check ai",
      "delulu check test free",
    ],
    alternates: {
      canonical: `${baseUrl}/en/delulu-check`,
      languages: {
        en: `${baseUrl}/en/delulu-check`,
        tr: `${baseUrl}/tr/delulu-check`,
        "x-default": `${baseUrl}/en/delulu-check`,
      },
    },
    openGraph: {
      title: "Delulu Check — Am I Delusional? AI Reality Check",
      description:
        "Getting mixed signals? Take the AI reality check before double texting. Are they really interested or are you just being delusional? Find out instantly.",
      url: `${baseUrl}/en/delulu-check`,
      type: "website",
      locale: "en_US",
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    },
    other: {
      "application-ld+json": JSON.stringify(faqJsonLd ? [jsonLd, faqJsonLd] : jsonLd),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
