"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { RegionBanner } from "@/components/RegionBanner";
import { ProductCatalog } from "@/components/ProductCatalog";
import { ProductModal } from "@/components/ProductModal";
import { CartDrawer, CartItem } from "@/components/CartDrawer";
import { BinancePayModal } from "@/components/BinancePayModal";
import { PayPalModal } from "@/components/PayPalModal";
import { OrderConfirmationModal } from "@/components/OrderConfirmationModal";
import { WeeklyImporterModal } from "@/components/WeeklyImporterModal";
import { SocialShareModal } from "@/components/SocialShareModal";
import { Footer } from "@/components/Footer";
import { ProductItem } from "@/lib/products-data";
import { RegionKey, CurrencyKey } from "@/lib/currency";

export default function HomePage() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [region, setRegion] = useState<RegionKey>("GCC");
  const [currency, setCurrency] = useState<CurrencyKey>("SAR");
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Cart
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modals
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);
  const [socialProduct, setSocialProduct] = useState<ProductItem | null>(null);
  const [isImporterOpen, setIsImporterOpen] = useState(false);
  const [isBinancePayOpen, setIsBinancePayOpen] = useState(false);
  const [isPayPalOpen, setIsPayPalOpen] = useState(false);
  const [checkoutPayload, setCheckoutPayload] = useState<any>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<any>(null);

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/products?region=${region}`);
      const data = await res.json();
      if (data.products) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [region]);

  const totalHearts = products.reduce((acc, p) => acc + (p.loveCount || 0), 0);

  // Heart click handler
  const handleHeartProduct = async (productId: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, loveCount: (p.loveCount || 0) + 1 } : p
      )
    );
    try {
      await fetch(`/api/products/${productId}/heart`, { method: "POST" });
    } catch (e) {
      console.error("Heart POST failed", e);
    }
  };

  // Add to cart
  const handleAddToCart = (product: ProductItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = (productId: number, qty: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  const handleRemoveItem = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Instant 1-Click Buy from Card or Modal
  const handleInstantBuy = (product: ProductItem, gateway: "binance_pay" | "paypal") => {
    const directCartItem = [{ product, quantity: 1 }];
    setCheckoutPayload({
      customerName: "خالد الشمري",
      customerEmail: "buyer@trendwave.store",
      customerPhone: "+966 54 892 1400",
      shippingAddress: "طريق الملك فهد، حي الصحافة",
      city: "الرياض - Riyadh",
      country: "Saudi Arabia 🇸🇦",
      items: directCartItem,
      totalAmount: product.price,
    });

    if (gateway === "binance_pay") {
      setIsBinancePayOpen(true);
    } else {
      setIsPayPalOpen(true);
    }
  };

  // Proceed to checkout from cart drawer
  const handleProceedToCheckout = (shippingDetails: any, gateway: "binance_pay" | "paypal") => {
    const subtotal = cart.reduce(
      (acc, item) => acc + parseFloat(item.product.price) * item.quantity,
      0
    );
    const shipping = subtotal > 75 ? 0 : 9.99;
    const grandTotal = subtotal + shipping;

    setCheckoutPayload({
      ...shippingDetails,
      items: cart,
      totalAmount: grandTotal.toFixed(2),
    });

    setIsCartOpen(false);
    if (gateway === "binance_pay") {
      setIsBinancePayOpen(true);
    } else {
      setIsPayPalOpen(true);
    }
  };

  // Binance Pay Success callback
  const handleBinancePaySuccess = async (cryptoData: { cryptoCurrency: string; txHash: string }) => {
    setIsBinancePayOpen(false);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...checkoutPayload,
          paymentGateway: "binance_pay",
          targetRegion: region,
          currency,
          cryptoCurrency: cryptoData.cryptoCurrency,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setConfirmedOrder(data.order);
        setCart([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // PayPal Success callback
  const handlePayPalSuccess = async (paypalData: { paypalOrderId: string }) => {
    setIsPayPalOpen(false);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...checkoutPayload,
          paymentGateway: "paypal",
          targetRegion: region,
          currency,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setConfirmedOrder(data.order);
        setCart([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const totalCartCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  // Schema.org JSON-LD for Google SEO Daily Free Indexing
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TrendWave Global Store",
    url: "https://trendwave.store",
    description: "Daily automated Google SEO publisher & weekly most-loved Amazon & AliExpress products.",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "29.99",
      highPrice: "99.99",
    },
  };

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={`min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950`}
    >
      {/* Google SEO JSON-LD Script Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* Header */}
      <Header
        lang={lang}
        setLang={setLang}
        region={region}
        setRegion={setRegion}
        currency={currency}
        setCurrency={setCurrency}
        cartCount={totalCartCount}
        openCart={() => setIsCartOpen(true)}
        openImporter={() => setIsImporterOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        lang={lang}
        region={region}
        totalHearts={totalHearts}
        openImporter={() => setIsImporterOpen(true)}
        scrollToCatalog={() => {
          document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* Regional Shipping & Warehouse Banner */}
      <RegionBanner region={region} currency={currency} lang={lang} />

      {/* Product Catalog */}
      <ProductCatalog
        products={products}
        lang={lang}
        currency={currency}
        region={region}
        onAddToCart={handleAddToCart}
        onQuickView={(p) => setQuickViewProduct(p)}
        onInstantBuy={handleInstantBuy}
        onHeart={handleHeartProduct}
        onSocialShare={(p) => setSocialProduct(p)}
      />

      {/* Footer */}
      <Footer lang={lang} />

      {/* Modals */}
      <ProductModal
        product={quickViewProduct}
        lang={lang}
        currency={currency}
        region={region}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onInstantBuy={handleInstantBuy}
        onHeart={handleHeartProduct}
        onSocialShare={(p) => setSocialProduct(p)}
      />

      <SocialShareModal
        isOpen={!!socialProduct}
        onClose={() => setSocialProduct(null)}
        product={socialProduct}
        currency={currency}
        lang={lang}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        lang={lang}
        currency={currency}
        region={region}
        setRegion={setRegion}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      <BinancePayModal
        isOpen={isBinancePayOpen}
        onClose={() => setIsBinancePayOpen(false)}
        amountUSD={checkoutPayload ? parseFloat(checkoutPayload.totalAmount) : 49.99}
        currency={currency}
        lang={lang}
        onSuccess={handleBinancePaySuccess}
      />

      <PayPalModal
        isOpen={isPayPalOpen}
        onClose={() => setIsPayPalOpen(false)}
        amountUSD={checkoutPayload ? parseFloat(checkoutPayload.totalAmount) : 49.99}
        currency={currency}
        lang={lang}
        onSuccess={handlePayPalSuccess}
      />

      <OrderConfirmationModal
        isOpen={!!confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
        order={confirmedOrder}
        currency={currency}
        lang={lang}
      />

      <WeeklyImporterModal
        isOpen={isImporterOpen}
        onClose={() => setIsImporterOpen(false)}
        lang={lang}
        onSyncCompleted={fetchProducts}
      />
    </div>
  );
}
