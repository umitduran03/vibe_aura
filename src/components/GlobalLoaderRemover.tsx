"use client";

import { useEffect } from "react";

/**
 * GlobalLoaderRemover — Her sayfada root layout'tan mount edilir.
 * Ana sayfada zaten [lang]/page.tsx içinde kaldırılıyor,
 * SEO sayfalarında (trends, vibe-dictionary, toxic-ex-scanner vb.) ise
 * bu component global-loader'ı otomatik kaldırır.
 */
export default function GlobalLoaderRemover() {
  useEffect(() => {
    const loader = document.getElementById("global-loader");
    if (loader) {
      loader.style.opacity = "0";
      setTimeout(() => loader.remove(), 600);
    }
  }, []);

  return null;
}
