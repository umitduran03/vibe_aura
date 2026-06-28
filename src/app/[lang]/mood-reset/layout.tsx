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
      title: "Mood Reset (YZ) — Acımasızca Dürüst Uyanış Çağrısı | VibeCheckr",
      description: "Kötü bir gün mü geçiriyorsun? Ruh halini düzeltmek, sızlanmayı bırakmak ve vibe'ını şarj etmek için yapay zekadan acımasızca dürüst bir reset al.",
      keywords: ["mood reset","ruh hali düzeltici","yapay zeka motivasyon","kötü gün kurtarıcısı"],
      alternates: {
        canonical: `${baseUrl}/tr/mood-reset`,
        languages: {
          en: `${baseUrl}/en/mood-reset`,
          tr: `${baseUrl}/tr/mood-reset`,
          "x-default": `${baseUrl}/en/mood-reset`,
        },
      },
      openGraph: {
        title: "Mood Reset (YZ) — Acımasızca Dürüst Uyanış Çağrısı",
        description: "Kötü bir gün mü geçiriyorsun? Ruh halini düzeltmek, sızlanmayı bırakmak ve vibe'ını şarj etmek için yapay zekadan acımasızca dürüst bir reset al.",
        url: `${baseUrl}/tr/mood-reset`,
        type: "website",
        locale: "tr_TR",
      },
    };
  }

  return {
    title: "Mood Reset AI — Brutally Honest Wake-up Call | VibeCheckr",
    description: "Having a bad day? Get a brutally honest wake-up call from our AI to fix your mood, stop complaining, and recharge your vibe instantly.",
    keywords: ["mood reset ai","fix bad mood","vibe recharge","brutal motivation"],
    alternates: {
      canonical: `${baseUrl}/en/mood-reset`,
      languages: {
        en: `${baseUrl}/en/mood-reset`,
        tr: `${baseUrl}/tr/mood-reset`,
        "x-default": `${baseUrl}/en/mood-reset`,
      },
    },
    openGraph: {
      title: "Mood Reset AI — Brutally Honest Wake-up Call",
      description: "Having a bad day? Get a brutally honest wake-up call from our AI to fix your mood, stop complaining, and recharge your vibe instantly.",
      url: `${baseUrl}/en/mood-reset`,
      type: "website",
      locale: "en_US",
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
