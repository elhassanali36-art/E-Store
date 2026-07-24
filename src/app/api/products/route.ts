import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { INITIAL_PRODUCTS } from "@/lib/products-data";
import { desc, sql } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const region = searchParams.get("region") || "ALL";
    const source = searchParams.get("source") || "all";
    const category = searchParams.get("category") || "all";
    const sort = searchParams.get("sort") || "most_loved";
    const search = searchParams.get("q")?.toLowerCase() || "";

    // 1. Check if database has products. If not, auto-seed from INITIAL_PRODUCTS.
    const existing = await db.select().from(products);
    if (existing.length === 0) {
      for (const item of INITIAL_PRODUCTS) {
        await db.insert(products).values({
          titleAr: item.titleAr,
          titleEn: item.titleEn,
          descriptionAr: item.descriptionAr,
          descriptionEn: item.descriptionEn,
          category: item.category,
          price: item.price,
          originalPrice: item.originalPrice,
          rating: item.rating,
          reviewCount: item.reviewCount,
          loveCount: item.loveCount,
          salesRank: item.salesRank,
          source: item.source,
          sourceBadgeAr: item.sourceBadgeAr,
          sourceBadgeEn: item.sourceBadgeEn,
          sourceUrl: item.sourceUrl,
          imageUrl: item.imageUrl,
          galleryImages: item.galleryImages,
          targetRegions: item.targetRegions,
          stockStatus: item.stockStatus,
          stockQuantity: item.stockQuantity,
          weeklyTrending: item.weeklyTrending,
          featuresAr: item.featuresAr,
          featuresEn: item.featuresEn,
          importedWeek: item.importedWeek,
        });
      }
    }

    // 2. Fetch all products from DB
    let allProducts = await db
      .select()
      .from(products)
      .orderBy(desc(products.loveCount));

    // 3. Filter in memory for robust multi-region & JSON fields
    if (region && region !== "ALL" && region !== "GLOBAL") {
      allProducts = allProducts.filter((p) => {
        try {
          const regions: string[] = JSON.parse(p.targetRegions || "[]");
          return regions.includes(region) || regions.includes("GLOBAL");
        } catch {
          return true;
        }
      });
    }

    if (source && source !== "all") {
      allProducts = allProducts.filter((p) => p.source === source);
    }

    if (category && category !== "all") {
      allProducts = allProducts.filter((p) => p.category === category);
    }

    if (search) {
      allProducts = allProducts.filter(
        (p) =>
          p.titleAr.toLowerCase().includes(search) ||
          p.titleEn.toLowerCase().includes(search) ||
          p.descriptionAr.toLowerCase().includes(search) ||
          p.descriptionEn.toLowerCase().includes(search)
      );
    }

    // 4. Sort
    if (sort === "most_loved") {
      allProducts.sort((a, b) => b.loveCount - a.loveCount);
    } else if (sort === "price_low") {
      allProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sort === "price_high") {
      allProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sort === "rating") {
      allProducts.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    }

    return NextResponse.json({
      success: true,
      products: allProducts,
      count: allProducts.length,
    });
  } catch (error: unknown) {
    console.error("Products API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
