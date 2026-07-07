"use client";

import { useEffect } from "react";

/**
 * HtmlLangSync — document.documentElement.lang'ı locale'e göre ayarlar.
 *
 * Root layout'ta <html lang="en"> sabit tanımlı. Bu component, [lang]/layout.tsx
 * üzerinden çağrılarak doğru dil kodunu DOM'a yazar.
 * Google bu attribute'u sayfa dilini belirlemek için kullanır.
 *
 * NOT: suppressHydrationWarning root layout'ta aktif, React uyarısını bastırır.
 */
export default function HtmlLangSync({ lang }: { lang: string }) {
  useEffect(() => {
    const validLang = lang === "tr" ? "tr" : "en";
    document.documentElement.lang = validLang;
    document.documentElement.setAttribute("xml:lang", validLang);
  }, [lang]);

  return null;
}
