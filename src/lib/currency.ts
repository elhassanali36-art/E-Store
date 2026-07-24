export type RegionKey = "GCC" | "USA" | "EU" | "GLOBAL";
export type CurrencyKey = "USD" | "SAR" | "AED" | "EUR" | "GBP" | "QAR";

export interface RegionInfo {
  key: RegionKey;
  flag: string;
  nameAr: string;
  nameEn: string;
  defaultCurrency: CurrencyKey;
  deliveryEstimateAr: string;
  deliveryEstimateEn: string;
}

export const REGIONS: Record<RegionKey, RegionInfo> = {
  GCC: {
    key: "GCC",
    flag: "🇸🇦",
    nameAr: "دول الخليج والشرق الأوسط",
    nameEn: "GCC & Middle East",
    defaultCurrency: "SAR",
    deliveryEstimateAr: "شحن سريع خلال 2 - 4 أيام عمل (مستودع دبي والرياض)",
    deliveryEstimateEn: "Express Air Delivery 2-4 Days (Dubai & Riyadh Hub)",
  },
  USA: {
    key: "USA",
    flag: "🇺🇸",
    nameAr: "الولايات المتحدة وأمريكا الشمالية",
    nameEn: "USA & North America",
    defaultCurrency: "USD",
    deliveryEstimateAr: "شحن سريع خلال 2 - 3 أيام عمل (مستودع كاليفورنيا ونيويورك)",
    deliveryEstimateEn: "Fast Prime Air Shipping 2-3 Days (US Hub)",
  },
  EU: {
    key: "EU",
    flag: "🇪🇺",
    nameAr: "أوروبا والمملكة المتحدة",
    nameEn: "Europe & United Kingdom",
    defaultCurrency: "EUR",
    deliveryEstimateAr: "شحن سريع خلال 3 - 5 أيام عمل (مستودع فرانكفورت ولندن)",
    deliveryEstimateEn: "Fast Direct EU Express 3-5 Days (Frankfurt & London Hub)",
  },
  GLOBAL: {
    key: "GLOBAL",
    flag: "🌍",
    nameAr: "جميع دول العالم",
    nameEn: "Worldwide / Global",
    defaultCurrency: "USD",
    deliveryEstimateAr: "شحن دولي مؤمن لـ 150 دولة خلال 4 - 7 أيام عمل",
    deliveryEstimateEn: "Insured Global Shipping to 150+ Countries (4-7 Days)",
  },
};

export const CURRENCY_RATES: Record<CurrencyKey, { symbol: string; rateFromUSD: number; symbolAr: string }> = {
  USD: { symbol: "$", rateFromUSD: 1.0, symbolAr: "$" },
  SAR: { symbol: "SAR", rateFromUSD: 3.75, symbolAr: "ر.س" },
  AED: { symbol: "AED", rateFromUSD: 3.67, symbolAr: "د.إ" },
  EUR: { symbol: "€", rateFromUSD: 0.92, symbolAr: "€" },
  GBP: { symbol: "£", rateFromUSD: 0.79, symbolAr: "£" },
  QAR: { symbol: "QAR", rateFromUSD: 3.64, symbolAr: "ر.ق" },
};

export function formatPrice(priceInUSD: number | string, currency: CurrencyKey = "USD", lang: "ar" | "en" = "ar") {
  const num = typeof priceInUSD === "string" ? parseFloat(priceInUSD) : priceInUSD;
  const rateObj = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
  const converted = (num * rateObj.rateFromUSD).toFixed(2);

  if (lang === "ar") {
    return `${converted} ${rateObj.symbolAr}`;
  }
  return `${rateObj.symbol}${converted}`;
}
