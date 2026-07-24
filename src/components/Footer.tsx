"use client";

import React from "react";
import { Sparkles, ShieldCheck, Heart, Truck, Lock } from "lucide-react";

interface FooterProps {
  lang: "ar" | "en";
}

export function Footer({ lang }: FooterProps) {
  const isAr = lang === "ar";

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Platform About */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-black text-lg">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>TrendWave Global</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              {isAr
                ? "المنصة العالمية الأولى لاستيراد وعرض أكثر منتجات أمازون وعلي إكسبريس طلباً وقلباً ورواجاً أسبوعياً مع الشحن السريع ودعم بوابات الدفع المشفرة بينانس باي وبيبال."
                : "The premier global platform auto-importing weekly top-hearted best sellers from Amazon & AliExpress with express regional fulfillment and zero-fee Binance Pay & PayPal checkout."}
            </p>
          </div>

          {/* Col 2: Supported Regions */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              {isAr ? "الأقاليم ومناطق التغطية" : "Fulfillment Regions"}
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>🇸🇦 {isAr ? "دول الخليج (السعودية، الإمارات، قطر، الكويت)" : "GCC (Saudi Arabia, UAE, Qatar, Kuwait)"}</li>
              <li>🇺🇸 {isAr ? "الولايات المتحدة وأمريكا الشمالية" : "USA & North America"}</li>
              <li>🇪🇺 {isAr ? "أوروبا والمملكة المتحدة" : "Europe & United Kingdom"}</li>
              <li>🌍 {isAr ? "شحن دولي لأكثر من 150 دولة" : "Worldwide Insured Shipping (150+ Countries)"}</li>
            </ul>
          </div>

          {/* Col 3: Payment Gateways */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              {isAr ? "بوابات الدفع المعتمدة" : "Payment Gateways"}
            </h4>
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-yellow-500/20 text-yellow-300 font-bold flex items-center gap-2">
                <span>🟡 Binance Pay (USDT / BTC / ETH / BNB)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-blue-500/20 text-blue-300 font-bold flex items-center gap-2">
                <span>🔵 PayPal 180-Day Buyer Protection</span>
              </div>
            </div>
          </div>

          {/* Col 4: Trust & Quality */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              {isAr ? "الضمان وحماية المشتري" : "Buyer Guarantee"}
            </h4>
            <p className="text-slate-400 leading-relaxed">
              {isAr
                ? "جميع المنتجات تخضع لفحص جودة شامل ومطابقة للمواصفات العالمية قبل الشحن مع ضمان استرجاع كامل 30 يوماً."
                : "All items undergo rigorous quality checks, CE/FCC certification compliance, and 30-day money-back guarantee."}
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
          <div>
            © 2026 TrendWave Global Store. {isAr ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </div>
          <div className="flex items-center gap-2 text-rose-400 font-medium">
            <span>❤️ الأكثر قلباً وطلباً من Amazon & AliExpress</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
