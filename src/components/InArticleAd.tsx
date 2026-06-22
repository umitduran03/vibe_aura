"use client";

import { useEffect, useRef } from "react";

/**
 * InArticleAd — SEO sayfaları için yazı içi reklam bileşeni.
 *
 * Google AdSense "Yazı içi" (in-article / fluid) formatı.
 * İçerik paragrafları arasına yerleştirilir.
 * Reklam yoksa (unfilled) kendi kendine çöker, boş alan kalmaz.
 */
export default function InArticleAd() {
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("InArticleAd AdSense error", e);
    }

    // Unfilled durumunda kapsayıcıyı gizle
    const observer = new MutationObserver(() => {
      const status = insRef.current?.getAttribute("data-ad-status");
      if (status === "unfilled") {
        if (insRef.current?.parentElement) {
          insRef.current.parentElement.style.display = "none";
        }
      }
    });

    if (insRef.current) {
      observer.observe(insRef.current, { attributes: true });
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ margin: "32px 0", textAlign: "center" }}>
      <p style={{
        fontSize: "8px",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.18)",
        marginBottom: "4px",
      }}>
        Reklam
      </p>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-4394628220494584"
        data-ad-slot="5066981650"
      />
    </div>
  );
}
