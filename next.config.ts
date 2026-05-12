import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Vercel Reverse Proxy — Firebase Auth First-Party Domain
   *
   * Safari ITP, 3. parti çerezleri (cross-origin) engelliyor.
   * Bu rewrite kuralı, Firebase Auth'un /__/auth/* yollarını
   * kendi domain'imiz (vibe-aura.vercel.app) üzerinden proxy'leyerek
   * "first-party" bağlamında çalışmasını sağlar.
   *
   * Sonuç: signInWithRedirect artık same-origin olarak değerlendirilir,
   * ITP çerez engellemesi devre dışı kalır.
   */
  async rewrites() {
    return [
      {
        source: "/__/auth/:path*",
        destination: "https://vibe-and-aura.firebaseapp.com/__/auth/:path*",
      },
    ];
  },
};

export default nextConfig;
