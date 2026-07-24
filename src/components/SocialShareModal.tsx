"use client";

import React, { useState } from "react";
import { ProductItem } from "@/lib/products-data";
import { CurrencyKey, formatPrice } from "@/lib/currency";
import {
  X,
  Share2,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Search,
  Globe,
} from "lucide-react";

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductItem | null;
  currency: CurrencyKey;
  lang: "ar" | "en";
}

export function SocialShareModal({
  isOpen,
  onClose,
  product,
  currency,
  lang,
}: SocialShareModalProps) {
  if (!isOpen || !product) return null;

  const isAr = lang === "ar";
  const [activeTab, setActiveTab] = useState<"tiktok" | "instagram" | "facebook" | "google_seo">("tiktok");
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const productUrl = typeof window !== "undefined"
    ? `${window.location.origin}/#product-${product.id}`
    : `https://trendwave.store/#product-${product.id}`;

  const priceFormatted = formatPrice(product.price, currency, lang);

  // Auto-generated social media captions
  const tiktokCaption = `🔥 ${product.titleAr}
✨ الأكثر طلباً وقلباً هذا الأسبوع على ${product.source === "amazon" ? "أمازون" : "علي إكسبريس"}!
💰 السعر: ${priceFormatted} (شحن سريع لدول الخليج وأمريكا وأوروبا)
🟡 نقبل Binance Pay و PayPal
🔗 رابط الطلب في البايو!
#TikTokMadeMeBuyIt #ViralProducts #AmazonFinds #AliExpressGems #ترند #السعودية #الخليج #تسوق`;

  const instagramCaption = `✨ ${product.titleAr} - ${product.titleEn}
━━━━━━━━━━━━━━━━━━━━
❤️ عدد القلوب هذا الأسبوع: ${(product.loveCount || 0).toLocaleString()}
💰 السعر الحصري: ${priceFormatted}
🚚 شحن سريع مؤمن لجميع دول العالم
💳 الدفع المباشر: Binance Pay (USDT/Crypto) & PayPal
━━━━━━━━━━━━━━━━━━━━
👉 اطلب الآن عبر الرابط الموجود في البايو أو عبر الستوري!`;

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    productUrl
  )}&quote=${encodeURIComponent(`${product.titleAr} - متوفر الآن بسعر ${priceFormatted}`)}`;

  const handleCopyCaption = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(productUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-xl rounded-3xl bg-slate-900 border border-amber-500/30 shadow-2xl p-6 text-white max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-400 p-0.5 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Share2 className="w-5 h-5 text-pink-400" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-black text-white">
              {isAr ? "مركز النشر والتسويق على منصات التواصل و Google SEO" : "Social Publishing & Google SEO Hub"}
            </h3>
            <p className="text-xs text-slate-400">
              {isAr
                ? "توليد تلقائي للمنشورات والوسوم الفيروسية والـ SEO اليومي المجاني"
                : "1-Click viral captions, hashtags & free daily Google SEO indexing"}
            </p>
          </div>
        </div>

        {/* Platform Tabs */}
        <div className="grid grid-cols-4 gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 mb-5 text-xs font-bold">
          <button
            onClick={() => setActiveTab("tiktok")}
            className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1 ${
              activeTab === "tiktok"
                ? "bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <span>🎵 TikTok</span>
          </button>

          <button
            onClick={() => setActiveTab("instagram")}
            className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1 ${
              activeTab === "instagram"
                ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <span>📸 Instagram</span>
          </button>

          <button
            onClick={() => setActiveTab("facebook")}
            className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1 ${
              activeTab === "facebook"
                ? "bg-blue-600 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <span>📘 Facebook</span>
          </button>

          <button
            onClick={() => setActiveTab("google_seo")}
            className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1 ${
              activeTab === "google_seo"
                ? "bg-amber-500 text-slate-950 shadow font-black"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <span>🔍 Google SEO</span>
          </button>
        </div>

        {/* Tab 1: TikTok Viral Video Caption Generator */}
        {activeTab === "tiktok" && (
          <div className="space-y-4 text-xs animate-in fade-in">
            <div className="p-3 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-300 flex items-center justify-between">
              <span>{isAr ? "جاهز للنشر على تيك توك وتيك توك شوب (TikTok Shop):" : "Ready for TikTok Video / Shop Post:"}</span>
              <span className="font-bold text-[10px] bg-pink-500/20 px-2 py-0.5 rounded">Viral Hook + Tags</span>
            </div>

            <textarea
              readOnly
              value={tiktokCaption}
              rows={6}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs focus:outline-none"
            />

            <div className="flex gap-2">
              <button
                onClick={() => handleCopyCaption(tiktokCaption)}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold transition-all flex items-center justify-center gap-1.5 shadow-lg active:scale-95"
              >
                {copiedCaption ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCaption ? (isAr ? "تم نسخ كابشن تيك توك!" : "TikTok Caption Copied!") : (isAr ? "نسخ كابشن تيك توك والهاشتاغات" : "Copy TikTok Caption & Tags")}</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Instagram Story & Reel Caption */}
        {activeTab === "instagram" && (
          <div className="space-y-4 text-xs animate-in fade-in">
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 flex items-center justify-between">
              <span>{isAr ? "جاهز لبوستات الستوري والريدز في إنستغرام:" : "Formatted for Instagram Reels & Stories:"}</span>
              <span className="font-bold text-[10px] bg-purple-500/20 px-2 py-0.5 rounded">Bio Link Ready</span>
            </div>

            <textarea
              readOnly
              value={instagramCaption}
              rows={6}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs focus:outline-none"
            />

            <button
              onClick={() => handleCopyCaption(instagramCaption)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold transition-all flex items-center justify-center gap-1.5 shadow-lg active:scale-95"
            >
              {copiedCaption ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCaption ? (isAr ? "تم نسخ نص إنستغرام!" : "Instagram Text Copied!") : (isAr ? "نسخ نص إنستغرام" : "Copy Instagram Caption")}</span>
            </button>
          </div>
        )}

        {/* Tab 3: Direct Facebook Share Dialog */}
        {activeTab === "facebook" && (
          <div className="space-y-4 text-xs animate-in fade-in">
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300">
              {isAr
                ? "انقر لنشر ومشاركة المنتج مباشرة على صفحات ومجموعات فيس بوك بنقرة واحدة:"
                : "1-Click direct Facebook Share dialog popup with OpenGraph rich card preview:"}
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
              <img src={product.imageUrl} alt="" className="w-14 h-14 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <div className="font-bold text-white truncate">{isAr ? product.titleAr : product.titleEn}</div>
                <div className="text-amber-400 font-bold mt-0.5">{priceFormatted}</div>
              </div>
            </div>

            <a
              href={facebookShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 block text-center"
            >
              <ExternalLink className="w-4 h-4 inline" />
              <span>{isAr ? "مشاركة فورية على Facebook 📘" : "Share Directly on Facebook 📘"}</span>
            </a>
          </div>
        )}

        {/* Tab 4: Google SEO Daily Publishing Diagnostic */}
        {activeTab === "google_seo" && (
          <div className="space-y-3 text-xs animate-in fade-in">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <Search className="w-4 h-4 text-amber-400" />
                <span>{isAr ? "نشر يومي متوافق مع معايير Google SEO المجاني 100%" : "Daily Free Organic Google SEO Indexing"}</span>
              </div>
              <p className="text-[11px] text-slate-300">
                {isAr
                  ? "يتم توليد بيانات Schema.org JSON-LD وخريطة Sitemap.xml وموجز Google Merchant تلقائياً للأرشفة اليومية في قوقل بدون أي تكلفة إعلانية."
                  : "Schema.org structured JSON-LD & Google Merchant RSS feed generated automatically for free daily Google organic crawling."}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-[11px]">
              <div className="flex justify-between text-slate-300">
                <span>Google Sitemap XML:</span>
                <a href="/sitemap.xml" target="_blank" className="text-amber-400 hover:underline flex items-center gap-1">
                  <span>/sitemap.xml</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Google Merchant XML Feed:</span>
                <a href="/api/feed/google-merchant" target="_blank" className="text-amber-400 hover:underline flex items-center gap-1">
                  <span>/api/feed/google-merchant</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Social Meta/TikTok Feed:</span>
                <a href="/api/feed/social-catalog" target="_blank" className="text-amber-400 hover:underline flex items-center gap-1">
                  <span>/api/feed/social-catalog</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <button
              onClick={handleCopyLink}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition-all flex items-center justify-center gap-1.5"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink ? (isAr ? "تم نسخ الرابط الكانوني لـ Google SEO!" : "Canonical SEO Link Copied!") : (isAr ? "نسخ الرابط المرجعي لـ Google SEO" : "Copy Google SEO Canonical Link")}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
