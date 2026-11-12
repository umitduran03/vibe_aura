import type { Metadata } from "next";
import { buildToolJsonLd } from "@/lib/seo-schema";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

const baseUrl = "https://thevibecheckr.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isTr = lang === "tr";

  if (isTr) {
    return {
      title: { absolute: "Delulu Check Testi — Delulu Muyum? Ücretsiz YZ Gerçeklik Kontrolü" },
      description:
        "Karışık sinyaller mi alıyorsun yoksa delulu musun? Mesaj ekran görüntüsünü at veya durumu yaz → 0–100 Delulu Skorunu hesapsız & ücretsiz 3 saniyede öğren!",
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
        "delulu ne demek",
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
        title: "Delulu Check Testi — Delulu Muyum? (Ücretsiz YZ) | VibeCheckr",
        description:
          "İkinci mesajı atmadan önce dur! Mesajları yapay zekaya okut, 0–100 Delulu Skorunu hesapsız & ücretsiz anında öğren.",
        url: `${baseUrl}/tr/delulu-check`,
        siteName: "VibeCheckr",
        type: "website",
        locale: "tr_TR",
        alternateLocale: ["en_US"],
        images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
      },
    };
  }

  return {
    title: { absolute: "Delulu Check — Am I Delusional? Free AI Text & Mixed Signal Test" },
    description:
      "Are they actually into you or are you delulu? Paste texts or drop a chat screenshot → get an unfiltered 0–100% Delulu Score in 3 sec. Free & no sign-up!",
    keywords: [
      "delulu check",
      "am i delusional",
      "delulu check ai",
      "am i being delusional",
      "am i delulu quiz",
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
      title: "Delulu Check — Am I Delusional? Free AI Reality Check | VibeCheckr",
      description:
        "Getting mixed signals? Take the free AI Delulu Check before double texting. 0–100% reality score in 3 seconds — no sign-up needed!",
      url: `${baseUrl}/en/delulu-check`,
      siteName: "VibeCheckr",
      type: "website",
      locale: "en_US",
      alternateLocale: ["tr_TR"],
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    },
  };
}

export default async function Layout({ children, params }: Props) {
  const { lang } = await params;
  const isTr = lang === "tr";

  const extraFaqs = isTr
    ? [
        {
          q: "Delulu check nedir?",
          a: "Delulu check, aşk hayatında yaşanan belirsiz durumlara (karışık sinyaller, ghostlama, görüldü bırakma) yapay zeka aracılığıyla gerçekçi bir bakış açısı sunan bir reality check aracıdır. 'Delulu muyum yoksa haklı mıyım?' sorusuna 0–100 arası skorla yanıt verir.",
        },
        {
          q: "Delulu check nasıl yapılır?",
          a: "Durumu yaz veya sohbet ekran görüntüsünü VibeCheckr Delulu Check aracına yükle. Yapay zeka anlattıklarını gerçek davranış kalıpları ve red flag veritabanıyla kıyaslayarak sana bir gerçeklik puanı ve sıradaki hamleni verir.",
        },
        {
          q: "Delulu muyum nasıl anlarım?",
          a: "Aynı mesajları defalarca okuyorsan, planlar sürekli iptal ediliyorsa, görüldü kalıp saatlerce cevap gelmiyorsa veya davranışlara sürekli bahane buluyorsan delulu olma ihtimalin yüksektir.",
        },
        {
          q: "Delulu check ücretsiz mi? Kayıt gerekir mi?",
          a: "Evet, VibeCheckr Delulu Check tamamen ücretsizdir ve tek tıkla Misafir Girişi sayesinde hesap açmadan anında kullanılabilir.",
        },
      ]
    : [
        {
          q: "What is a delulu check?",
          a: "A delulu check is a free AI-powered reality check that analyzes confusing romantic situations—mixed signals, dry texts, ghosting, or being left on read—and scores from 0–100% whether you are being delusional or actually valid.",
        },
        {
          q: "Am I delusional or getting mixed signals?",
          a: "If you have re-read the same conversation 10+ times, made excuses for cancelled plans, or think a one-word reply has hidden meaning, there is a high chance you are being delulu. Our AI checks your receipts objectively.",
        },
        {
          q: "How does the Delulu Check AI work?",
          a: "Paste messages, upload a chat screenshot, or describe the situation in VibeCheckr's Delulu Check tool. The AI cross-references texting effort, attachment patterns, and red flags to give you a brutal reality score and next steps.",
        },
        {
          q: "Is the Delulu Check completely free without signing up?",
          a: "Yes! VibeCheckr's Delulu Check is free to start via 1-Click Guest Mode with 5 instant welcome tokens—no account registration required.",
        },
      ];

  const jsonLd = buildToolJsonLd({
    slug: "delulu-check",
    lang,
    name: isTr ? "Delulu Check YZ — Gerçeklik Testi" : "Delulu Check AI — Reality Check",
    breadcrumbName: "Delulu Check",
    description: isTr
      ? "Karışık sinyalleri ve mesaj ekran görüntülerini analiz ederek 0–100 Delulu Skoru veren ücretsiz yapay zeka gerçeklik testi."
      : "Free AI reality check tool that analyzes chat screenshots and mixed signals to deliver an unfiltered 0–100% Delulu Score.",
    featureList: [
      "AI Reality Check & Mixed Signal Decoder",
      "Chat Screenshot & Text Receipt Analysis",
      "0–100% Delulu Score",
      "Red Flag & Breadcrumbing Detection",
      "1-Click Guest Mode (No Sign-Up Required)",
    ],
    extraFaqs,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
