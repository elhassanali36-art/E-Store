"use client";

import React from "react";
import { RegionKey, REGIONS } from "@/lib/currency";
import {
  Heart,
  Flame,
  Zap,
  ShieldCheck,
  Truck,
  ArrowDownCircle,
  RefreshCw,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

interface HeroProps {
  lang: "ar" | "en";
  region: RegionKey;
  totalHearts: number;
  openImporter: () => void;
  scrollToCatalog: () => void;
}

export function Hero({
  lang,
  region,
  totalHearts,
  openImporter,
  scrollToCatalog,
}: HeroProps) {
  const isAr = lang === "ar";
  const regionInfo = REGIONS[region];

  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pb-16 border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950">
      {/* Glow Backdrops */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[250px] bg-orange-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {isAr
                ? "مستورد ذكي تلقائي أسبوعياً من Amazon & AliExpress"
                : "Weekly Automated Importer Engine for Amazon & AliExpress"}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium">
            <span>{regionInfo.flag}</span>
            <span>
              {isAr
                ? `مخصص لـ ${regionInfo.nameAr}`
                : `Tailored for ${regionInfo.nameEn}`}
            </span>
          </div>
        </div>

        {/* Main Hero Title */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight sm:leading-tight">
            {isAr ? (
              <>
                متجر المنتجات{" "}
                <span className="bg-gradient-to-r from-rose-500 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                  الأكثر قلباً ورواجاً ❤️
                </span>{" "}
                المستوردة أسبوعياً
              </>
            ) : (
              <>
                Weekly Auto-Imported{" "}
                <span className="bg-gradient-to-r from-rose-500 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                  Most-Hearted Trends ❤️
                </span>{" "}
                from Amazon & AliExpress
              </>
            )}
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {isAr
              ? "نظام ذكي يستورد تلقائياً أفضل المنتجات طلباً وإعجاباً كل أسبوع. نوفر التوصيل السريع لجميع دول العالم مع التركيز على دول الخليج وأمريكا وأوروبا، وبوابات دفع مباشرة عبر بينانس باي (Binance Pay) المشفرة وبيبال (PayPal)."
              : "Smart automated pipeline importing top trending, most-loved viral hits from Amazon Best Sellers & AliExpress. Express fulfillment for USA, Europe, GCC & Worldwide with Binance Pay (Crypto) & PayPal zero-fee checkouts."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
          <button
            onClick={scrollToCatalog}
            className="flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-amber-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <Heart className="w-5 h-5 fill-slate-950 text-slate-950" />
            <span>{isAr ? "استكشف المنتجات الأكثر قلباً" : "Explore Most Loved Items"}</span>
          </button>

          <button
            onClick={openImporter}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-amber-500/30 text-amber-300 font-bold text-sm sm:text-base transition-all hover:border-amber-400"
          >
            <RefreshCw className="w-4 h-4 text-amber-400" />
            <span>{isAr ? "تشغيل المزامنة الأسبوعية 🔄" : "Run Weekly Sync Engine 🔄"}</span>
          </button>
        </div>

        {/* Feature Pill Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
              <Heart className="w-5 h-5 fill-rose-500/30 text-rose-400" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-black text-white">
                {totalHearts > 0 ? totalHearts.toLocaleString() : "245,000+"}
              </div>
              <div className="text-[11px] text-slate-400 font-medium">
                {isAr ? "إجمالي القلوب والإعجابات ❤️" : "Total Weekly Hearts ❤️"}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400 shrink-0">
              <span className="font-black text-xs">🟡 Pay</span>
            </div>
            <div>
              <div className="text-sm sm:text-base font-black text-amber-300">
                Binance Pay
              </div>
              <div className="text-[11px] text-slate-400 font-medium">
                {isAr ? "دفع بالعملات المشفرة USDT/BTC" : "Zero-Fee Crypto Checkout"}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <span className="font-black text-xs">🔵 PP</span>
            </div>
            <div>
              <div className="text-sm sm:text-base font-black text-blue-300">
                PayPal Gateway
              </div>
              <div className="text-[11px] text-slate-400 font-medium">
                {isAr ? "حماية المشتري 180 يوماً" : "180-Day Buyer Protection"}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Truck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-black text-emerald-300">
                {isAr ? "شحن إقليمي سريع" : "Express Hub Shipping"}
              </div>
              <div className="text-[11px] text-slate-400 font-medium">
                {isAr ? "الخليج، أمريكا، أوروبا" : "GCC, USA, Europe Hubs"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
