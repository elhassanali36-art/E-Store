import { MetadataRoute } from "next";
import { db } from "@/db";
import { products } from "@/db/schema";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://trendwave.store";
  let productUrls: MetadataRoute.Sitemap = [];

  try {
    const allProducts = await db.select().from(products);
    productUrls = allProducts.map((p) => ({
      url: `${baseUrl}/#product-${p.id}`,
      lastModified: p.createdAt || new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    }));
  } catch (e) {
    console.error("Sitemap generation error", e);
  }

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/?region=GCC`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/?region=USA`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/?region=EU`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
  ];

  return [...staticUrls, ...productUrls];
}
