"use client";

import React, { useState, useEffect } from "react";
import { CurrencyKey, formatPrice } from "@/lib/currency";
import { X, Copy, Check, ShieldCheck, QrCode, Timer, ArrowRight } from "lucide-react";

interface BinancePayModalProps {
  isOpen: boolean;
  onClose: () => void;
  amountUSD: number;
  currency: CurrencyKey;
  lang: "ar" | "en";
  onSuccess: (cryptoData: { cryptoCurrency: string; txHash: string }) => void;
}

export function BinancePayModal({
  isOpen,
  onClose,
  amountUSD,
  currency,
  lang,
  onSuccess,
}: BinancePayModalProps) {
  if (!isOpen) return null;

  const isAr = lang === "ar";
  const [selectedCrypto, setSelectedCrypto] = useState<"USDT" | "BTC" | "ETH" | "BNB">("USDT");
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(899); // 15 minutes timer

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Crypto conversion rate approximations
  let cryptoAmount = amountUSD.toFixed(2);
  if (selectedCrypto === "BTC") cryptoAmount = (amountUSD / 94000).toFixed(6);
  if (selectedCrypto === "ETH") cryptoAmount = (amountUSD / 3200).toFixed(5);
  if (selectedCrypto === "BNB") cryptoAmount = (amountUSD / 620).toFixed(4);

  const binancePayId = "BINANCE-PAY-983104";

  const handleCopy = () => {
    navigator.clipboard.writeText(binancePayId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const fakeTxHash = `0x${Array.from({ length: 40 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join("")}`;
      onSuccess({ cryptoCurrency: selectedCrypto, txHash: fakeTxHash });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-[#181A20] border border-[#F0B90B]/30 shadow-2xl p-6 text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-1.5 rounded-full bg-[#2B313A] text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Binance Pay Brand Header */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-9 h-9 rounded-xl bg-[#F0B90B] flex items-center justify-center font-black text-black text-sm">
            🟡
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-base text-[#F0B90B] tracking-tight">
                BINANCE PAY
              </span>
              <span className="text-[10px] font-bold bg-[#F0B90B]/20 text-[#F0B90B] px-1.5 py-0.5 rounded">
                Official Gateway
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              {isAr ? "بوابة الدفع الفوري بالعملات المشفرة بدون رسوم" : "Instant 0-Fee Crypto Payment Gateway"}
            </p>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0B0E11] border border-slate-800 text-xs mb-4">
          <span className="text-slate-400 flex items-center gap-1">
            <Timer className="w-3.5 h-3.5 text-[#F0B90B]" />
            <span>{isAr ? "صلاحية طلب الدفع:" : "Payment Expiration:"}</span>
          </span>
          <span className="font-mono font-bold text-[#F0B90B]">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
        </div>

        {/* Crypto Asset Selector */}
        <div className="mb-4">
          <label className="block text-[11px] font-bold text-slate-400 mb-1.5">
            {isAr ? "اختر العملة المشفرة للدفع:" : "Select Crypto Currency:"}
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {(["USDT", "BTC", "ETH", "BNB"] as const).map((coin) => (
              <button
                key={coin}
                onClick={() => setSelectedCrypto(coin)}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCrypto === coin
                    ? "bg-[#F0B90B] text-black shadow-lg shadow-[#F0B90B]/20"
                    : "bg-[#2B313A] text-slate-300 hover:bg-[#363D47]"
                }`}
              >
                {coin}
              </button>
            ))}
          </div>
        </div>

        {/* Total Crypto Amount Box */}
        <div className="p-4 rounded-2xl bg-[#0B0E11] border border-[#F0B90B]/20 text-center mb-4">
          <div className="text-xs text-slate-400">
            {isAr ? "المبلغ المطلوب سداده بدقة:" : "Total Payable Amount:"}
          </div>
          <div className="text-2xl font-black text-[#F0B90B] mt-0.5">
            {cryptoAmount} <span className="text-sm">{selectedCrypto}</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            ≈ {formatPrice(amountUSD, currency, lang)} USD
          </div>
        </div>

        {/* QR Code & Binance ID Simulator */}
        <div className="p-3 rounded-2xl bg-[#2B313A]/60 border border-slate-700 flex items-center gap-3 mb-5">
          <div className="w-20 h-20 bg-white rounded-xl p-1.5 shrink-0 flex items-center justify-center">
            {/* Custom SVG QR Code Mockup */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-black">
              <rect width="100" height="100" fill="white" />
              <rect x="10" y="10" width="30" height="30" fill="black" />
              <rect x="15" y="15" width="20" height="20" fill="white" />
              <rect x="20" y="20" width="10" height="10" fill="black" />
              <rect x="60" y="10" width="30" height="30" fill="black" />
              <rect x="65" y="15" width="20" height="20" fill="white" />
              <rect x="70" y="20" width="10" height="10" fill="black" />
              <rect x="10" y="60" width="30" height="30" fill="black" />
              <rect x="15" y="65" width="20" height="20" fill="white" />
              <rect x="20" y="70" width="10" height="10" fill="black" />
              <circle cx="50" cy="50" r="10" fill="#F0B90B" />
            </svg>
          </div>
          <div className="flex-1 min-w-0 text-xs">
            <div className="text-slate-400 text-[10px]">
              {isAr ? "معرف تاجر بينانس باي (Pay ID):" : "Binance Merchant Pay ID:"}
            </div>
            <div className="font-mono font-bold text-white truncate text-xs mt-0.5">
              {binancePayId}
            </div>
            <button
              onClick={handleCopy}
              className="mt-1.5 flex items-center gap-1 text-[11px] font-bold text-[#F0B90B] hover:underline"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (isAr ? "تم النسخ!" : "Copied!") : (isAr ? "نسخ المعرف" : "Copy ID")}</span>
            </button>
          </div>
        </div>

        {/* Confirm Action Button */}
        <button
          onClick={handleConfirmPayment}
          disabled={isProcessing}
          className="w-full py-3.5 rounded-xl bg-[#F0B90B] hover:bg-[#d8a509] text-black font-black text-sm transition-all shadow-xl shadow-[#F0B90B]/20 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
        >
          {isProcessing ? (
            <span>{isAr ? "جارٍ التحقق على شبكة البلوكتشين..." : "Verifying on Blockchain..."}</span>
          ) : (
            <>
              <span>{isAr ? "تأكيد الدفع عبر تطبيق بينانس" : "Confirm Binance Pay Payment"}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
