import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const productId = parseInt(id, 10);
    if (isNaN(productId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const updated = await db
      .update(products)
      .set({
        loveCount: sql`${products.loveCount} + 1`,
      })
      .where(eq(products.id, productId))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      loveCount: updated[0].loveCount,
    });
  } catch (error) {
    console.error("Heart error:", error);
    return NextResponse.json({ error: "Failed to heart product" }, { status: 500 });
  }
}
