import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "TrendWave Global | متجر المنتجات الأكثر قلباً وطلباً من أمازون وعلي إكسبريس",
  description:
    "المتجر العالمي الأول لاستيراد المنتجات الأكثر قلباً وطلباً أسبوعياً من Amazon و AliExpress مع شحن سريع لدول الخليج وأمريكا وأوروبا، وبوابات دفع بينانس باي (Binance Pay) المشفرة وبيبال (PayPal).",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-amber-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
