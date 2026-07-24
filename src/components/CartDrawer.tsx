"use client";

import React, { useState } from "react";
import { ProductItem } from "@/lib/products-data";
import { CurrencyKey, formatPrice, RegionKey, REGIONS } from "@/lib/currency";
import { X, Trash2, Plus, Minus, ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  lang: "ar" | "en";
  currency: CurrencyKey;
  region: RegionKey;
  setRegion: (r: RegionKey) => void;
  onUpdateQty: (productId: number, qty: number) => void;
  onRemoveItem: (productId: number) => void;
  onProceedToCheckout: (shippingDetails: any, gateway: "binance_pay" | "paypal") => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  cart,
  lang,
  currency,
  region,
  setRegion,
  onUpdateQty,
  onRemoveItem,
  onProceedToCheckout,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const isAr = lang === "ar";
  const regionInfo = REGIONS[region];

  const [step, setStep] = useState<"cart" | "shipping">("cart");
  const [name, setName] = useState("خالد الشمري");
  const [email, setEmail] = useState("customer@trendwave.store");
  const [phone, setPhone] = useState("+966 54 892 1400");
  const [address, setAddress] = useState("طريق الملك فهد، حي الصحافة");
  const [city, setCity] = useState("الرياض - Riyadh");
  const [country, setCountry] = useState("Saudi Arabia 🇸🇦");

  const subtotalUSD = cart.reduce(
    (acc, item) => acc + parseFloat(item.product.price) * item.quantity,
    0
  );

  const shippingUSD = subtotalUSD > 75 ? 0 : 9.99;
  const totalUSD = subtotalUSD + shippingUSD;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 max-w-full flex pl-10 rtl:pl-0 rtl:pr-10">
        <div className="w-screen max-w-md bg-slate-900 border-l rtl:border-l-0 rtl:border-r border-slate-800 shadow-2xl flex flex-col justify-between p-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h3 className="text-lg font-black text-white">
              {step === "cart"
                ? isAr
                  ? "سلة التسوق الذكية"
                  : "Shopping Cart"
                : isAr
                ? "بيانات الشحن والدفع"
                : "Shipping & Payment Gateway"}
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 text-slate-400 text-xs">
                {isAr ? "سلة التسوق فارغة حالياً." : "Your shopping cart is empty."}
              </div>
            ) : step === "cart" ? (
              // Step 1: Cart Items
              <div className="space-y-3">
                {cart.map(({ product, quantity }) => (
                  <div
                    key={product.id || product.titleEn}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800"
                  >
                    <img
                      src={product.imageUrl}
                      alt=""
                      className="w-16 h-16 rounded-lg object-cover bg-slate-900 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">
                        {isAr ? product.titleAr : product.titleEn}
                      </h4>
                      <div className="text-xs font-black text-amber-400 mt-1">
                        {formatPrice(product.price, currency, lang)}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            onUpdateQty(product.id!, Math.max(1, quantity - 1))
                          }
                          className="w-6 h-6 rounded bg-slate-800 text-white flex items-center justify-center text-xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white px-1">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQty(product.id!, quantity + 1)}
                          className="w-6 h-6 rounded bg-slate-800 text-white flex items-center justify-center text-xs"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveItem(product.id!)}
                      className="p-2 text-rose-400 hover:text-rose-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              // Step 2: Shipping & Gateway Select
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">
                    {isAr ? "الاسم الكامل للمستلم" : "Full Name"}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-400 mb-1">
                      {isAr ? "البريد الإلكتروني" : "Email"}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">
                      {isAr ? "رقم الهاتف / واتساب" : "Phone / WhatsApp"}
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">
                    {isAr ? "عنوان التوصيل والشارع" : "Delivery Address & Street"}
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-400 mb-1">
                      {isAr ? "المدينة" : "City"}
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">
                      {isAr ? "الدولة" : "Country"}
                    </label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer & Totals */}
          {cart.length > 0 && (
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="space-y-1.5 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>{isAr ? "المجموع الفرعي:" : "Subtotal:"}</span>
                  <span className="text-white font-bold">
                    {formatPrice(subtotalUSD, currency, lang)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{isAr ? "الشحن الإقليمي السريع:" : "Express Shipping:"}</span>
                  <span className="text-emerald-400 font-bold">
                    {shippingUSD === 0
                      ? isAr
                        ? "مجاني"
                        : "FREE"
                      : formatPrice(shippingUSD, currency, lang)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-amber-400 pt-2 border-t border-slate-800">
                  <span>{isAr ? "الإجمالي النهائي:" : "Grand Total:"}</span>
                  <span>{formatPrice(totalUSD, currency, lang)}</span>
                </div>
              </div>

              {step === "cart" ? (
                <button
                  onClick={() => setStep("shipping")}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <span>{isAr ? "متابعة لإتمام الطلب والدفع" : "Proceed to Checkout"}</span>
                  {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              ) : (
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-slate-400 text-center uppercase tracking-wider">
                    {isAr ? "اختر بوابة الدفع الفوري" : "Choose Payment Gateway"}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() =>
                        onProceedToCheckout(
                          { name, email, phone, address, city, country },
                          "binance_pay"
                        )
                      }
                      className="py-3 px-2 rounded-xl bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/50 text-yellow-300 font-black text-xs transition-all active:scale-95 flex items-center justify-center gap-1.5 shadow-lg shadow-yellow-500/10"
                    >
                      <span>🟡 Binance Pay</span>
                    </button>

                    <button
                      onClick={() =>
                        onProceedToCheckout(
                          { name, email, phone, address, city, country },
                          "paypal"
                        )
                      }
                      className="py-3 px-2 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-300 font-black text-xs transition-all active:scale-95 flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/10"
                    >
                      <span>🔵 PayPal Gateway</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setStep("cart")}
                    className="w-full py-2 text-xs text-slate-400 hover:text-white text-center"
                  >
                    {isAr ? "الرجوع لتعديل السلة" : "Back to Cart"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
