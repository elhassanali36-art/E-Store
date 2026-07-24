import { pgTable, serial, text, numeric, integer, boolean, timestamp } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  titleAr: text("title_ar").notNull(),
  titleEn: text("title_en").notNull(),
  descriptionAr: text("description_ar").notNull(),
  descriptionEn: text("description_en").notNull(),
  category: text("category").notNull(), // 'tech-gadgets', 'home-living', 'luxury-gcc', 'viral-tiktok', 'beauty-wellness'
  price: numeric("price", { precision: 10, scale: 2 }).notNull(), // USD Base Price
  originalPrice: numeric("original_price", { precision: 10, scale: 2 }).notNull(),
  rating: numeric("rating", { precision: 3, scale: 1 }).notNull().default("4.8"),
  reviewCount: integer("review_count").notNull().default(120),
  loveCount: integer("love_count").notNull().default(500), // الأكثر قلباً
  salesRank: integer("sales_rank").notNull().default(1),
  source: text("source").notNull(), // 'amazon' | 'aliexpress'
  sourceBadgeAr: text("source_badge_ar").notNull(),
  sourceBadgeEn: text("source_badge_en").notNull(),
  sourceUrl: text("source_url"),
  imageUrl: text("imageUrl").notNull(),
  galleryImages: text("gallery_images"), // JSON string array of image URLs
  targetRegions: text("target_regions").notNull(), // JSON string array: ["USA", "EU", "GCC", "GLOBAL"]
  stockStatus: text("stock_status").notNull().default("in_stock"), // 'in_stock' | 'low_stock'
  stockQuantity: integer("stock_quantity").notNull().default(50),
  weeklyTrending: boolean("weekly_trending").notNull().default(true),
  featuresAr: text("features_ar"), // JSON string array
  featuresEn: text("features_en"), // JSON string array
  importedWeek: text("imported_week").notNull().default("2026-W15"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const importLogs = pgTable("import_logs", {
  id: serial("id").primaryKey(),
  source: text("source").notNull(), // 'amazon', 'aliexpress', 'both'
  status: text("status").notNull().default("completed"), // 'completed', 'syncing'
  itemsImported: integer("items_imported").notNull().default(0),
  weeklyPeriod: text("weekly_period").notNull(),
  summaryAr: text("summary_ar").notNull(),
  summaryEn: text("summary_en").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone"),
  shippingAddress: text("shipping_address").notNull(),
  targetRegion: text("target_region").notNull(), // 'USA' | 'EU' | 'GCC' | 'GLOBAL'
  country: text("country").notNull(),
  city: text("city").notNull(),
  paymentGateway: text("payment_gateway").notNull(), // 'binance_pay' | 'paypal'
  paymentStatus: text("payment_status").notNull().default("paid"), // 'paid' | 'pending' | 'verified'
  cryptoCurrency: text("crypto_currency"), // 'USDT' | 'BTC' | 'ETH' | 'BNB' for Binance Pay
  cryptoTxHash: text("crypto_tx_hash"),
  paypalOrderId: text("paypal_order_id"),
  totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("USD"),
  itemsJson: text("items_json").notNull(), // JSON string of cart items
  orderStatus: text("order_status").notNull().default("processing"), // 'processing' | 'sourced_from_supplier' | 'shipped' | 'delivered'
  trackingCode: text("tracking_code").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
