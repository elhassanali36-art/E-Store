import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://trendwave.store";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        crawlDelay: 1,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "facebookexternalhit",
        allow: "/",
      },
      {
        userAgent: "TikTokBot",
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
