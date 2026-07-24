import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";

export async function GET() {
  try {
    const allProducts = await db.select().from(products);
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://trendwave.store";

    const socialCatalog = allProducts.map((p) => ({
      id: `TW-${p.id}`,
      title: p.titleEn,
      title_ar: p.titleAr,
      description: p.descriptionEn,
      description_ar: p.descriptionAr,
      availability: "in stock",
      condition: "new",
      price: `${p.price} USD`,
      link: `${baseUrl}/#product-${p.id}`,
      image_link: p.imageUrl,
      brand: "TrendWave",
      source_platform: p.source,
      tiktok_hashtags: ["#TikTokMadeMeBuyIt", "#ViralGadgets", "#AmazonFinds", "#AliExpressGems", "#Trending2026"],
      instagram_share_caption: `🔥 ${p.titleAr}\n💰 Price: $${p.price}\n❤️ Weekly Hearts: ${p.loveCount}\n📦 Fast Insured Express Delivery\n👉 Shop Link in Bio & Story!`,
      facebook_post_preview: `✨ Trending this week: ${p.titleAr}! Auto-synced from ${p.source.toUpperCase()}. Order today with Binance Pay & PayPal.`,
    }));

    return NextResponse.json({
      success: true,
      meta_platform: "Meta (Facebook & Instagram) / TikTok Shop Catalog Feed",
      updated_at: new Date().toISOString(),
      item_count: socialCatalog.length,
      items: socialCatalog,
    });
  } catch (error) {
    console.error("Social catalog error", error);
    return NextResponse.json({ success: false, error: "Failed to generate social catalog" }, { status: 500 });
  }
}
