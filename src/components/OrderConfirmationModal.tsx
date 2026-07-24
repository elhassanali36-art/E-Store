"use client";

import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { CurrencyKey, formatPrice } from "@/lib/currency";
import {
  CheckCircle2,
  X,
  Truck,
  Package,
  ShieldCheck,
  Download,
  ExternalLink,
} from "lucide-react";

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
  currency: CurrencyKey;
  lang: "ar" | "en";
}

export function OrderConfirmationModal({
  isOpen,
  onClose,
  order,
  currency,
  lang,
}: OrderConfirmationModalProps) {
  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [isOpen]);

  if (!isOpen || !order) return null;

  const isAr = lang === "ar";
  const isBinance = order.paymentGateway === "binance_pay";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-emerald-500/30 shadow-2xl p-6 text-white max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {isAr ? "تم تأكيد طلبك ودفعك بنجاح! 🎉" : "Order & Payment Confirmed! 🎉"}
          </h2>
          <p className="text-xs text-slate-400">
            {isAr
              ? "شكراً لطلبك من متجر ترند ويف. جاري شحن وتجهيز طلبك من المستودع الإقليمي."
              : "Thank you for shopping with TrendWave. Your package is being prepared for express delivery."}
          </p>
        </div>

        {/* Order Receipt Box */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs mb-6">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <span className="text-slate-400">{isAr ? "رقم الطلب:" : "Order Number:"}</span>
            <span className="font-mono font-bold text-amber-400">{order.orderNumber}</span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <span className="text-slate-400">{isAr ? "بوابة الدفع المستخدمة:" : "Payment Gateway:"}</span>
            <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
              isBinance ? "bg-yellow-500/20 text-yellow-300" : "bg-blue-500/20 text-blue-300"
            }`}>
              {isBinance ? "🟡 Binance Pay (Crypto Paid)" : "🔵 PayPal Verified"}
            </span>
          </div>

          {order.cryptoTxHash && (
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span className="text-slate-400">{isAr ? "معرّف البلوكتشين (TxHash):" : "Blockchain TxHash:"}</span>
              <span className="font-mono text-[10px] text-slate-300 truncate max-w-[180px]">
                {order.cryptoTxHash}
              </span>
            </div>
          )}

          {order.paypalOrderId && (
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span className="text-slate-400">{isAr ? "معرّف عملية بيبال:" : "PayPal Order ID:"}</span>
              <span className="font-mono text-[10px] text-blue-300">
                {order.paypalOrderId}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center">
            <span className="text-slate-400">{isAr ? "رمز التتبع السريع:" : "Tracking Number:"}</span>
            <span className="font-mono font-bold text-emerald-400">{order.trackingCode}</span>
          </div>
        </div>

        {/* Live Shipping Timeline */}
        <div className="space-y-3 mb-6">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            {isAr ? "مراحل الشحن والتسليم المباشر:" : "Live Shipping Timeline:"}
          </h4>

          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-3 p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{isAr ? "1. تم استلام الطلب وتأكيد الدفع 100%" : "1. Order Placed & Paid"}</span>
            </div>

            <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
              <Package className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{isAr ? "2. جاري التغليف من مورد أمازون / علي إكسبريس" : "2. Supplier Hub Dispatch"}</span>
            </div>

            <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400">
              <Truck className="w-4 h-4 text-slate-500 shrink-0" />
              <span>{isAr ? "3. الشحن الجوي السريع للبلد والمدينة المحددة" : "3. Air Transit to Destination"}</span>
            </div>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm transition-all shadow-lg"
        >
          {isAr ? "العودة ومواصلة التسوق" : "Continue Shopping"}
        </button>
      </div>
    </div>
  );
}
