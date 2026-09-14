/**
 * [lang]/page.tsx - Server Component Wrapper
 *
 * Bu dosya kasitli olarak Server Component'tir.
 * Googlebot SSR ile render edilen SEO icerigini buradan okur.
 *
 * HomeSeoContent: GORUNUR semantik HTML (h1, h2, feature grid, trend linkler)
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
      {/* Client: Tum uygulama mantigi */}
      <HomeClient />

      {/* SSR: Gorunur SEO icerigi — feature grid, trend linkler */}
      <HomeSeoContent lang={locale} />
    </>
  );
}
