/**
 * [lang]/page.tsx - Server Component Wrapper
 *
 * Bu dosya kasitli olarak Server Component'tir.
 * Googlebot SSR ile render edilen SEO icerigini buradan okur.
 *
 * HomeSeoContent: Gorunmez ama taranabilir semantik HTML (h1, h2, linkler)
 * HomeClient: Tum uygulama mantigi, 'use client' ile calisir
 */

import HomeSeoContent from '@/components/HomeSeoContent';
import HomeClient from '@/components/HomeClient';

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function Home({ params }: Props) {
  const { lang } = await params;
  const locale = lang === 'tr' ? 'tr' : 'en';

  return (
    <>
      {/* SSR: Googlebot icin semantik icerik. Kullanici gormez. */}
      <HomeSeoContent lang={locale} />

      {/* Client: Tum uygulama mantigi */}
      <HomeClient />
    </>
  );
}
