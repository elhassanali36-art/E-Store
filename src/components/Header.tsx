"use client";

import React, { useState } from "react";
import { RegionKey, CurrencyKey, REGIONS, CURRENCY_RATES } from "@/lib/currency";
import {
  ShoppingBag,
  Heart,
  Globe,
  RefreshCw,
  Sparkles,
  Zap,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

interface HeaderProps {
  lang: "ar" | "en";
  setLang: (l: "ar" | "en") => void;
  region: RegionKey;
  setRegion: (r: RegionKey) => void;
  currency: CurrencyKey;
  setCurrency: (c: CurrencyKey) => void;
  cartCount: number;
  openCart: () => void;
  openImporter: () => void;
}

export function Header({
  lang,
  setLang,
  region,
  setRegion,
  currency,
  setCurrency,
  cartCount,
  openCart,
  openImporter,
}: HeaderProps) {
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  const isAr = lang === "ar";
  const currentRegionInfo = REGIONS[region];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-500/20 bg-slate-950/90 backdrop-blur-md">
      {/* Top Notification Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 text-slate-950 text-xs font-semibold py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-2 shrink-0">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-900"></span>
            </span>
            <span>
              {isAr
                ? "⚡ تم استيراد المنتجات الأكثر قلباً ومبيعاً لهذا الأسبوع من Amazon & AliExpress"
                : "⚡ Weekly Auto-Import Synced: Top Most Loved Products from Amazon & AliExpress"}
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0 text-[11px] font-bold">
            <span className="flex items-center gap-1 bg-slate-950/15 px-2 py-0.5 rounded-full">
              🟡 Binance Pay (Crypto)
            </span>
            <span className="flex items-center gap-1 bg-slate-950/15 px-2 py-0.5 rounded-full">
              🔵 PayPal 0-Fee
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Logo & Platform Title */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-400 p-0.5 shadow-lg shadow-amber-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg sm:text-xl font-black tracking-tight text-white">
                Trend<span className="text-amber-400">Wave</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20">
                Global
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium truncate max-w-[200px] sm:max-w-none">
              {isAr
                ? "مستورد منتجات الأكثر قلباً من أمازون وعلي إكسبريس"
                : "Amazon & AliExpress Weekly Best Sellers"}
            </p>
          </div>
        </div>

        {/* Action Controls & Region Selector */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Region Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                setShowRegionDropdown(!showRegionDropdown);
                setShowCurrencyDropdown(false);
              }}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-xs text-slate-200 transition-all font-medium"
            >
              <span className="text-sm">{currentRegionInfo.flag}</span>
              <span className="hidden md:inline">
                {isAr ? currentRegionInfo.nameAr : currentRegionInfo.nameEn}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showRegionDropdown && (
              <div className="absolute right-0 sm:right-auto rtl:left-0 sm:rtl:right-0 mt-2 w-64 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="text-[11px] font-bold text-slate-400 px-2 py-1 uppercase tracking-wider">
                  {isAr ? "اختر إقليم التوصيل والعرض" : "Select Target Region"}
                </div>
                {(Object.keys(REGIONS) as RegionKey[]).map((rKey) => {
                  const reg = REGIONS[rKey];
                  const active = region === rKey;
                  return (
                    <button
                      key={rKey}
                      onClick={() => {
                        setRegion(rKey);
                        setCurrency(reg.defaultCurrency);
                        setShowRegionDropdown(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-lg text-xs transition-all ${
                        active
                          ? "bg-amber-500/15 text-amber-300 font-bold border border-amber-500/30"
                          : "text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      <div className="flex items-center gap-2 text-start">
                        <span className="text-base">{reg.flag}</span>
                        <div>
                          <div>{isAr ? reg.nameAr : reg.nameEn}</div>
                          <div className="text-[10px] text-slate-400">
                            {reg.defaultCurrency}
                          </div>
                        </div>
                      </div>
                      {active && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Currency Switcher */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => {
                setShowCurrencyDropdown(!showCurrencyDropdown);
                setShowRegionDropdown(false);
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-xs font-semibold text-amber-300"
            >
              <span>{currency}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showCurrencyDropdown && (
              <div className="absolute right-0 mt-2 w-32 rounded-xl bg-slate-900 border border-slate-800 shadow-xl p-1.5 z-50">
                {(Object.keys(CURRENCY_RATES) as CurrencyKey[]).map((cKey) => (
                  <button
                    key={cKey}
                    onClick={() => {
                      setCurrency(cKey);
                      setShowCurrencyDropdown(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs ${
                      currency === cKey
                        ? "bg-amber-500/20 text-amber-300 font-bold"
                        : "text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    <span>{cKey}</span>
                    <span className="text-[10px] text-slate-400">
                      {CURRENCY_RATES[cKey].symbolAr}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Switcher */}
          <button
            onClick={() => setLang(isAr ? "en" : "ar")}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-xs text-slate-300 font-medium transition-all"
            title="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>{isAr ? "English" : "العربية"}</span>
          </button>

          {/* Weekly Importer Engine Trigger Button */}
          <button
            onClick={openImporter}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 hover:border-amber-400 text-amber-300 text-xs font-semibold shadow-sm transition-all group"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-180 transition-transform duration-500" />
            <span>{isAr ? "لوحة الاستيراد الأسبوعي" : "Weekly Importer"}</span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={openCart}
            className="relative flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/25 transition-all active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-slate-950" />
            <span className="hidden sm:inline">{isAr ? "السلة" : "Cart"}</span>
            {cartCount > 0 && (
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-950 text-amber-400 text-[11px] font-black">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
