import type { Metadata } from "next";

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
      title: "Delulu Check — Delulu Muyum? Yapay Zeka Gerçeklik Testi | VibeCheckr",
      description: "Delulu check nedir? Karışık sinyaller mi alıyorsun? Çift mesaj atmadan önce yapay zeka gerçeklik testini yap. O gerçekten seni seviyor mu, yoksa sen mi delusionalsın?",
      keywords: ["delulu check","delulu muyum","gerçeklik testi","karışık sinyaller"],
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
        description: "Delulu check nedir? Karışık sinyaller mi alıyorsun? Çift mesaj atmadan önce yapay zeka gerçeklik testini yap. O gerçekten seni seviyor mu, yoksa sen mi delusionalsın?",
        url: `${baseUrl}/tr/delulu-check`,
        type: "website",
        locale: "tr_TR",
      },
    };
  }

  return {
    title: "Delulu Check — Am I Delusional? Reality Check AI | VibeCheckr",
    description: "What is a delulu check? Getting mixed signals? Take the AI reality check before double texting. Do they really like you or are you delusional?",
    keywords: ["delulu check test","am i delusional","mixed signals ai","stop double texting"],
    alternates: {
      canonical: `${baseUrl}/en/delulu-check`,
      languages: {
        en: `${baseUrl}/en/delulu-check`,
        tr: `${baseUrl}/tr/delulu-check`,
        "x-default": `${baseUrl}/en/delulu-check`,
      },
    },
    openGraph: {
      title: "Delulu Check — Am I Delusional? Reality Check AI",
      description: "What is a delulu check? Getting mixed signals? Take the AI reality check before double texting. Do they really like you or are you delusional?",
      url: `${baseUrl}/en/delulu-check`,
      type: "website",
      locale: "en_US",
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
