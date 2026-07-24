"use client";

import React, { useState } from "react";
import { CurrencyKey, formatPrice } from "@/lib/currency";
import { X, ShieldCheck, CheckCircle2, CreditCard, Lock } from "lucide-react";

interface PayPalModalProps {
  isOpen: boolean;
  onClose: () => void;
  amountUSD: number;
  currency: CurrencyKey;
  lang: "ar" | "en";
  onSuccess: (paypalData: { paypalOrderId: string }) => void;
}

export function PayPalModal({
  isOpen,
  onClose,
  amountUSD,
  currency,
  lang,
  onSuccess,
}: PayPalModalProps) {
  if (!isOpen) return null;

  const isAr = lang === "ar";
  const [method, setMethod] = useState<"balance" | "card">("balance");
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayNow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const fakePaypalId = `PAYID-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      onSuccess({ paypalOrderId: fakePaypalId });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-blue-500/30 shadow-2xl p-6 text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* PayPal Header */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#003087] flex items-center justify-center font-black text-white text-lg">
            PP
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg text-blue-400">PayPal</span>
              <span className="text-[10px] font-bold bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded">
                Verified Checkout
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              {isAr ? "الدفع الآمن مع حماية المشتري لمدة 180 يوماً" : "Safe checkout with 180-day buyer protection"}
            </p>
          </div>
        </div>

        {/* Amount Box */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center mb-4">
          <div className="text-xs text-slate-400">
            {isAr ? "إجمالي المبلغ المطلوب دفعه:" : "Total Checkout Amount:"}
          </div>
          <div className="text-2xl font-black text-white mt-0.5">
            {formatPrice(amountUSD, currency, lang)}
          </div>
        </div>

        {/* Payment Source Options */}
        <div className="space-y-2 mb-4">
          <button
            onClick={() => setMethod("balance")}
            className={`w-full p-3 rounded-xl border flex items-center justify-between text-xs transition-all ${
              method === "balance"
                ? "bg-blue-500/15 border-blue-500 text-blue-300 font-bold"
                : "bg-slate-950 border-slate-800 text-slate-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
              <span>{isAr ? "رصيد حساب بيبال (PayPal Balance)" : "PayPal Account Balance"}</span>
            </div>
            {method === "balance" && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
          </button>

          <button
            onClick={() => setMethod("card")}
            className={`w-full p-3 rounded-xl border flex items-center justify-between text-xs transition-all ${
              method === "card"
                ? "bg-blue-500/15 border-blue-500 text-blue-300 font-bold"
                : "bg-slate-950 border-slate-800 text-slate-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-blue-400" />
              <span>{isAr ? "البطاقة البنكية المربوطة ببيبال" : "Linked Debit/Credit Card"}</span>
            </div>
            {method === "card" && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
          </button>
        </div>

        {/* Guarantee Badge */}
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2 text-xs text-emerald-300 mb-5">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            {isAr
              ? "مشمول تلقائياً ببرنامج PayPal لحماية المشتري واسترداد الأموال."
              : "Automatically covered by PayPal Buyer Protection guarantee."}
          </span>
        </div>

        {/* PayPal Action Button */}
        <button
          onClick={handlePayNow}
          disabled={isProcessing}
          className="w-full py-3.5 rounded-xl bg-[#0070BA] hover:bg-[#005ea6] text-white font-black text-sm transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
        >
          <Lock className="w-4 h-4" />
          <span>
            {isProcessing
              ? isAr
                ? "جارٍ المعالجة الآمنة عبر بيبال..."
                : "Processing via PayPal..."
              : isAr
              ? "إتمام الدفع الفوري عبر PayPal"
              : "Complete PayPal Payment"}
          </span>
        </button>
      </div>
    </div>
  );
}
