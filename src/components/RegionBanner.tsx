"use client";

import React from "react";
import { RegionKey, REGIONS, CurrencyKey, formatPrice } from "@/lib/currency";
import { Truck, ShieldCheck, MapPin, Sparkles } from "lucide-react";

interface RegionBannerProps {
  region: RegionKey;
  currency: CurrencyKey;
  lang: "ar" | "en";
}

export function RegionBanner({ region, currency, lang }: RegionBannerProps) {
  const isAr = lang === "ar";
  const r = REGIONS[region];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border border-amber-500/20 p-4 sm:p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl sm:text-4xl p-2 rounded-2xl bg-slate-950 border border-slate-800 shrink-0">
            {r.flag}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                {isAr ? "الإقليم المختار للتوصيل" : "Active Destination Hub"}
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <h3 className="text-base sm:text-lg font-black text-white">
              {isAr ? r.nameAr : r.nameEn}
            </h3>
            <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-0.5">
              <Truck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{isAr ? r.deliveryEstimateAr : r.deliveryEstimateEn}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>
              {isAr
                ? "دفع مؤمن 100% عبر بينانس باي وبيبال"
                : "100% Insured via Binance Pay & PayPal"}
            </span>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {isAr
                ? "شحن مجاني للطلبات فوق " + formatPrice(75, currency, lang)
                : "Free Shipping on orders over " + formatPrice(75, currency, lang)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
