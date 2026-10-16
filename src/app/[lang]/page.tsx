/**
 * [lang]/page.tsx - Server Component Wrapper
 *
 * Bu dosya kasitli olarak Server Component'tir.
 * HomeClient: Tum uygulama mantigi, 'use client' ile calisir.
 *
 * NOT: Eskiden burada HomeSeoContent vardi. Once gizli metin (Google spam
 * sinyali) olarak, sonra gorunur blok olarak render edildi; ancak gorunur hali
 * mobil uygulama kabinin (max-w-[430px] min-h-dvh) disinda kaldigi icin sayfa
 * yenilemede ziplama/flash yapiyordu. Kaldirildi. Anasayfa SEO'su metadata +
 * JSON-LD (layout) ile, arac SEO'su ise kendi landing sayfalariyla saglaniyor.
 */

import HomeClient from '@/components/HomeClient';

export default function Home() {
  return <HomeClient />;
}
