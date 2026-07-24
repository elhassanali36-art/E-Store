"use client";

import React, { useState } from "react";
import { ProductItem } from "@/lib/products-data";
import { CurrencyKey, formatPrice, RegionKey, REGIONS } from "@/lib/currency";
import {
  X,
  Heart,
  Star,
  Truck,
  CheckCircle,
  ShoppingBag,
  Share2,
  Search,
} from "lucide-react";

interface ProductModalProps {
  product: ProductItem | null;
  lang: "ar" | "en";
  currency: CurrencyKey;
  region: RegionKey;
  onClose: () => void;
  onAddToCart: (item: ProductItem) => void;
  onInstantBuy: (item: ProductItem, gateway: "binance_pay" | "paypal") => void;
  onHeart: (productId: number) => void;
  onSocialShare: (item: ProductItem) => void;
}

export function ProductModal({
  product,
  lang,
  currency,
  region,
  onClose,
  onAddToCart,
  onInstantBuy,
  onHeart,
  onSocialShare,
}: ProductModalProps) {
  if (!product) return null;

  const isAr = lang === "ar";
  const regionInfo = REGIONS[region];
  const [activeImage, setActiveImage] = useState(product.imageUrl);

  let gallery: string[] = [product.imageUrl];
  try {
    if (product.galleryImages) {
      gallery = JSON.parse(product.galleryImages);
    }
  } catch {}

  let features: string[] = [];
  try {
    const raw = isAr ? product.featuresAr : product.featuresEn;
    if (raw) features = JSON.parse(raw);
  } catch {}

  const markupText = product.source === "aliexpress" ? "+60% (AliExpress)" : "+30% (Amazon)";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Gallery Section */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
              <img
                src={activeImage}
                alt={isAr ? product.titleAr : product.titleEn}
                className="w-full h-full object-cover"
              />
              <span
                className={`absolute top-3 left-3 px-3 py-1 rounded-lg text-xs font-black uppercase text-white shadow-lg ${
                  product.source === "amazon" ? "bg-amber-600" : "bg-rose-600"
                }`}
              >
                {product.source === "amazon"
                  ? isAr ? "أمازون (+30% ربح)" : "Amazon (+30%)"
                  : isAr ? "علي إكسبريس (+60% ربح)" : "AliExpress (+60%)"}
              </span>
            </div>

            {gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      activeImage === imgUrl ? "border-amber-400 scale-105" : "border-slate-800 opacity-60"
                    }`}
                  >
                    <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Specs */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Top Meta & Social Share Trigger */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-rose-500" />
                    <span>
                      {(product.loveCount || 0).toLocaleString()} {isAr ? "قلباً" : "Hearts"}
                    </span>
                  </span>
                  <span className="text-amber-400 font-bold text-xs flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{product.rating}</span>
                  </span>
                </div>

                <button
                  onClick={() => onSocialShare(product)}
                  className="px-2.5 py-1 rounded-lg bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs font-bold flex items-center gap-1 hover:bg-pink-500/25 transition-all"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{isAr ? "نشر تيك توك / سوشيال" : "Share Social / TikTok"}</span>
                </button>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
                {isAr ? product.titleAr : product.titleEn}
              </h2>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                {isAr ? product.descriptionAr : product.descriptionEn}
              </p>

              {/* Price & Markup Breakdown Card */}
              <div className="my-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-baseline justify-between gap-2">
                  <div>
                    <span className="text-xs text-slate-400 block mb-1">
                      {isAr ? "سعر المتجر الحصري:" : "Our Exclusive Direct Price:"}
                    </span>
                    <div className="text-2xl font-black text-amber-400">
                      {formatPrice(product.price, currency, lang)}
                    </div>
                  </div>
                  <div className="text-right rtl:text-left">
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded block mb-1">
                      {markupText} {isAr ? "هامش ربح المتجر" : "Store Margin"}
                    </span>
                    <span className="text-[11px] text-slate-500 line-through">
                      {formatPrice(product.originalPrice, currency, lang)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Regional Shipping Promise */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-300 mb-4">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="font-bold text-white">{regionInfo.flag} {isAr ? regionInfo.nameAr : regionInfo.nameEn}: </span>
                  <span>{isAr ? regionInfo.deliveryEstimateAr : regionInfo.deliveryEstimateEn}</span>
                </div>
              </div>

              {/* Features bullets */}
              {features.length > 0 && (
                <div className="space-y-1.5 mb-6">
                  {features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Checkout Buttons */}
            <div className="space-y-2 pt-4 border-t border-slate-800">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onInstantBuy(product, "binance_pay");
                    onClose();
                  }}
                  className="py-3 px-3 rounded-xl bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/50 text-yellow-300 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <span>🟡 {isAr ? "شراء فوري بـ Binance Pay" : "Buy with Binance Pay"}</span>
                </button>

                <button
                  onClick={() => {
                    onInstantBuy(product, "paypal");
                    onClose();
                  }}
                  className="py-3 px-3 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-300 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <span>🔵 {isAr ? "شراء فوري بـ PayPal" : "Buy with PayPal"}</span>
                </button>
              </div>

              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isAr ? "أضف إلى سلة التسوق" : "Add to Shopping Cart"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
