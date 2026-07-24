import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";

export async function GET() {
  try {
    const allProducts = await db.select().from(products);
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://trendwave.store";

    const itemsXml = allProducts
      .map(
        (p) => `
    <item>
      <g:id>${p.id}</g:id>
      <g:title><![CDATA[${p.titleAr} - ${p.titleEn}]]></g:title>
      <g:description><![CDATA[${p.descriptionAr}]]></g:description>
      <g:link>${baseUrl}/#product-${p.id}</g:link>
      <g:image_link>${p.imageUrl}</g:image_link>
      <g:availability>in_stock</g:availability>
      <g:price>${p.price} USD</g:price>
      <g:brand>TrendWave</g:brand>
      <g:condition>new</g:condition>
      <g:google_product_category>Electronics &gt; Tech &gt; Smart Gadgets</g:google_product_category>
    </item>`
      )
      .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>TrendWave Global Store - Google Merchant Free Listing Feed</title>
    <link>${baseUrl}</link>
    <description>Daily automated feed for Google SEO, Google Shopping &amp; Search Free Listings</description>
    ${itemsXml}
  </channel>
</rss>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "s-maxage=3600, stale-while-revalidate",
      },
    });
  } catch (error) {
    console.error("Google feed error", error);
    return new NextResponse("<error>Failed to generate feed</error>", { status: 500 });
  }
}
