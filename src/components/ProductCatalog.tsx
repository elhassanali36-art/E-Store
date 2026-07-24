"use client";

import React, { useState } from "react";
import { ProductItem } from "@/lib/products-data";
import { CurrencyKey, formatPrice, RegionKey } from "@/lib/currency";
import {
  Heart,
  Star,
  Sparkles,
  ShoppingBag,
  Eye,
  Search,
  Share2,
  TrendingUp,
  Globe,
} from "lucide-react";

interface ProductCatalogProps {
  products: ProductItem[];
  lang: "ar" | "en";
  currency: CurrencyKey;
  region: RegionKey;
  onAddToCart: (item: ProductItem) => void;
  onQuickView: (item: ProductItem) => void;
  onInstantBuy: (item: ProductItem, gateway: "binance_pay" | "paypal") => void;
  onHeart: (productId: number) => void;
  onSocialShare: (item: ProductItem) => void;
}

export function ProductCatalog({
  products,
  lang,
  currency,
  region,
  onAddToCart,
  onQuickView,
  onInstantBuy,
  onHeart,
  onSocialShare,
}: ProductCatalogProps) {
  const isAr = lang === "ar";
  const [sourceFilter, setSourceFilter] = useState<"all" | "amazon" | "aliexpress">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortOption, setSortOption] = useState<"most_loved" | "rating" | "price_low" | "price_high">("most_loved");
  const [searchQuery, setSearchQuery] = useState("");
  const [heartedLocal, setHeartedLocal] = useState<Record<number, boolean>>({});

  // Filter & Sort
  const filtered = products
    .filter((p) => {
      if (sourceFilter !== "all" && p.source !== sourceFilter) return false;
      if (categoryFilter !== "all" && p.category !== categoryFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = (p.titleAr + " " + p.titleEn).toLowerCase().includes(q);
        const matchDesc = (p.descriptionAr + " " + p.descriptionEn).toLowerCase().includes(q);
        if (!matchTitle && !matchDesc) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortOption === "most_loved") return (b.loveCount || 0) - (a.loveCount || 0);
      if (sortOption === "rating") return parseFloat(b.rating) - parseFloat(a.rating);
      if (sortOption === "price_low") return parseFloat(a.price) - parseFloat(b.price);
      if (sortOption === "price_high") return parseFloat(b.price) - parseFloat(a.price);
      return 0;
    });

  const handleHeartClick = (e: React.MouseEvent, p: ProductItem) => {
    e.stopPropagation();
    if (p.id) {
      setHeartedLocal((prev) => ({ ...prev, [p.id!]: true }));
      onHeart(p.id);
    }
  };

  return (
    <section id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Section Header & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold mb-2">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>{isAr ? "المنتجات الأكثر قلباً ❤️ ومربحة بنسبة 60% / 30%" : "Weekly Most Hearted Trends (+60% / +30% Margins)"}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {isAr ? "كتالوج الترندات الأكثر طلباً وإعجاباً" : "Top Hearted & Best-Selling Catalog"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {isAr
              ? "مستورد أسبوعياً مع هامش (+60% لعلي إكسبريس) و (+30% لأمازون) ومتوافق مع النشر اليومي في Google SEO ومواقع التواصل"
              : "Auto-synced weekly: (+60% markup for AliExpress, +30% for Amazon) with daily free Google SEO & TikTok/Instagram/Facebook integrations"}
          </p>
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isAr ? "ابحث عن منتج أو ترند..." : "Search products or trends..."}
            className="w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-amber-500/60 focus:outline-none text-xs sm:text-sm text-white placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Filter Tabs & Source Switcher */}
      <div className="flex flex-col gap-4 mb-8 bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
        {/* Source Pills with Markup Rules */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400">
              {isAr ? "المصدر وهامش الربح:" : "Source & Markup:"}
            </span>
            <button
              onClick={() => setSourceFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                sourceFilter === "all"
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {isAr ? "الكل" : "All Sources"}
            </button>
            <button
              onClick={() => setSourceFilter("amazon")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                sourceFilter === "amazon"
                  ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                  : "bg-slate-800 text-orange-400 hover:bg-slate-700"
              }`}
            >
              <span>🟠 Amazon (+30% {isAr ? "ربح" : "Margin"})</span>
            </button>
            <button
              onClick={() => setSourceFilter("aliexpress")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                sourceFilter === "aliexpress"
                  ? "bg-rose-600 text-white shadow-md shadow-rose-600/20"
                  : "bg-slate-800 text-rose-400 hover:bg-slate-700"
              }`}
            >
              <span>🔴 AliExpress (+60% {isAr ? "ربح" : "Margin"})</span>
            </button>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">
              {isAr ? "الترتيب حسب:" : "Sort By:"}
            </span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-amber-300 font-medium focus:outline-none"
            >
              <option value="most_loved">
                {isAr ? "❤️ الأكثر قلباً (Most Loved)" : "❤️ Most Loved"}
              </option>
              <option value="rating">
                {isAr ? "⭐ الأعلى تقييماً" : "⭐ Top Rated"}
              </option>
              <option value="price_low">
                {isAr ? "💵 السعر: من الأقل للأعلى" : "💵 Price: Low to High"}
              </option>
              <option value="price_high">
                {isAr ? "💵 السعر: من الأعلى للأقل" : "💵 Price: High to Low"}
              </option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-800">
          {[
            { key: "all", ar: "جميع الترندات", en: "All Categories" },
            { key: "luxury-gcc", ar: "🇸🇦 فخامة الخليج والشرق الأوسط", en: "🇸🇦 GCC Curated" },
            { key: "tech-gadgets", ar: "📱 تقنية وأجهزة ذكية", en: "Smart Tech" },
            { key: "home-living", ar: "🏡 المنزل والمعيشة", en: "Home & Living" },
            { key: "viral-tiktok", ar: "🔥 ترند تيك توك", en: "Viral TikTok" },
            { key: "beauty-wellness", ar: "✨ الجمال والعناية", en: "Beauty & Wellness" },
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => setCategoryFilter(cat.key)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                categoryFilter === cat.key
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold"
                  : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              {isAr ? cat.ar : cat.en}
            </button>
          ))}
        </div>
      </div>

      {/* Product Cards Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/30 rounded-3xl border border-slate-800">
          <p className="text-slate-400 text-sm">
            {isAr ? "لم يتم العثور على منتجات مطابقة لهذا الفلتر." : "No matching products found."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => {
            const isHearted = product.id ? heartedLocal[product.id] : false;
            const displayHearts = (product.loveCount || 0) + (isHearted ? 1 : 0);
            const markup = product.source === "aliexpress" ? "+60%" : "+30%";

            return (
              <div
                id={`product-${product.id}`}
                key={product.id || product.titleEn}
                className="group relative rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-amber-500/10"
              >
                {/* Top Image Container */}
                <div className="relative aspect-square w-full overflow-hidden bg-slate-950">
                  <img
                    src={product.imageUrl}
                    alt={isAr ? product.titleAr : product.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Top Floating Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 pointer-events-none">
                    {/* Source Markup Badge */}
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-md ${
                        product.source === "amazon"
                          ? "bg-amber-600/90 text-white"
                          : "bg-rose-600/90 text-white"
                      }`}
                    >
                      {product.source === "amazon"
                        ? isAr ? "أمازون (+30% ربح)" : "Amazon (+30%)"
                        : isAr ? "علي إكسبريس (+60% ربح)" : "AliExpress (+60%)"}
                    </span>

                    {/* Google SEO Ready Tag */}
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/90 text-slate-950 text-[9px] font-black backdrop-blur-md">
                      Google SEO
                    </span>
                  </div>

                  {/* Top Action Icons: Heart & Social Share */}
                  <div className="absolute bottom-2.5 right-2.5 rtl:right-auto rtl:left-2.5 flex items-center gap-1.5">
                    {/* Social Media Share Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSocialShare(product);
                      }}
                      className="p-2 rounded-xl bg-slate-950/85 hover:bg-slate-900 text-pink-400 hover:text-pink-300 backdrop-blur-md transition-all shadow-lg"
                      title={isAr ? "مشاركة ونشر على تيك توك وإنستغرام وفيس بوك" : "Share on TikTok/Instagram/Facebook"}
                    >
                      <Share2 className="w-4 h-4" />
                    </button>

                    {/* Interactive Heart Button ("الأكثر قلباً") */}
                    <button
                      onClick={(e) => handleHeartClick(e, product)}
                      className={`p-2 rounded-xl backdrop-blur-md transition-all shadow-lg flex items-center gap-1.5 ${
                        isHearted
                          ? "bg-rose-500 text-white scale-110"
                          : "bg-slate-950/85 text-slate-300 hover:text-rose-400 hover:bg-slate-900"
                      }`}
                      title={isAr ? "أضف لقلوبك وإعجابك" : "Heart this item"}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isHearted ? "fill-white text-white animate-bounce" : "fill-rose-500/40 text-rose-400"
                        }`}
                      />
                      <span className="text-[11px] font-black">
                        {displayHearts.toLocaleString()}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Rating & Weekly Tag */}
                    <div className="flex items-center justify-between gap-2 mb-2 text-xs">
                      <div className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{product.rating}</span>
                        <span className="text-[10px] text-slate-400">
                          ({product.reviewCount})
                        </span>
                      </div>
                      <span className="text-[10px] font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full">
                        {isAr ? "❤️ الأكثر قلباً" : "❤️ Most Loved"}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => onQuickView(product)}
                      className="text-sm font-bold text-white line-clamp-2 hover:text-amber-300 cursor-pointer transition-colors"
                    >
                      {isAr ? product.titleAr : product.titleEn}
                    </h3>

                    {/* Short Description */}
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-1.5">
                      {isAr ? product.descriptionAr : product.descriptionEn}
                    </p>
                  </div>

                  {/* Price & Direct Checkout Actions */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80">
                    {/* Pricing Display with Markup Notice */}
                    <div className="flex items-baseline justify-between gap-2 mb-3">
                      <div>
                        <div className="text-lg font-black text-amber-400">
                          {formatPrice(product.price, currency, lang)}
                        </div>
                        <div className="text-[10px] text-slate-500 line-through">
                          {formatPrice(product.originalPrice, currency, lang)}
                        </div>
                      </div>
                      <div className="text-[10px] text-amber-300 font-semibold bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                        {markup} {isAr ? "هامش ربح" : "Margin"}
                      </div>
                    </div>

                    {/* Action Buttons: 1-Click Buy Binance Pay & PayPal */}
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <button
                        onClick={() => onInstantBuy(product, "binance_pay")}
                        className="flex items-center justify-center gap-1 py-2 px-2 rounded-lg bg-yellow-500/15 hover:bg-yellow-500/25 border border-yellow-500/40 text-yellow-300 text-[11px] font-bold transition-all active:scale-95"
                        title={isAr ? "شراء فوري عبر بينانس باي" : "1-Click Binance Pay"}
                      >
                        <span>🟡 Binance Pay</span>
                      </button>

                      <button
                        onClick={() => onInstantBuy(product, "paypal")}
                        className="flex items-center justify-center gap-1 py-2 px-2 rounded-lg bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/40 text-blue-300 text-[11px] font-bold transition-all active:scale-95"
                        title={isAr ? "شراء فوري عبر بيبال" : "1-Click PayPal"}
                      >
                        <span>🔵 PayPal</span>
                      </button>
                    </div>

                    {/* Add to Cart & Quick View */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onAddToCart(product)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs transition-all shadow-md active:scale-95"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>{isAr ? "أضف للسلة" : "Add to Cart"}</span>
                      </button>

                      <button
                        onClick={() => onQuickView(product)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
                        title={isAr ? "نظرة سريعة" : "Quick View"}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
