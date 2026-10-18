/**
 * [lang]/page.tsx - Server Component Wrapper
 *
 * HomeClient: Tüm uygulama mantığı (min-h-dvh tam ekran mobil uygulama kabı).
 * HomeSeoContent: SSR HTML içinde yer alan ancak sr-only ile 0px yer kaplayan
 * semantik başlık, açıklama ve iç link yapısı (uygulama ekranını kaydırmaz).
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
