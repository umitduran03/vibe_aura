/**
 * [lang]/page.tsx - Server Component Wrapper
 *
 * HomeClient: Tüm uygulama mantığı (min-h-dvh tam ekran mobil uygulama kabı).
 * HomeSeoContent: Tam ekran uygulama kabının altında (katlamanın altında), aynı
 * 430px genişlikte yer alan SSR SEO ve iç link bölümü. HomeClient her ekran
 * geçişinde ve yenilemede scrollTo(0,0) yaptığı için sayfa her zaman en üstteki
 * uygulama ekranından başlar.
 */

import HomeClient from "@/components/HomeClient";
import HomeSeoContent from "@/components/HomeSeoContent";

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function Home({ params }: Props) {
  const { lang } = await params;
  const locale = lang === "tr" ? "tr" : "en";

  return (
    <>
      <HomeClient />
      <HomeSeoContent lang={locale} />
    </>
  );
}
