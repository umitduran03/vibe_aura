import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/payment-success", "/history"],
      },
    ],
    sitemap: "https://thevibecheckr.vercel.app/sitemap.xml",
  };
}
