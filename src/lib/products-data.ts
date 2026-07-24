export interface ProductItem {
  id?: number;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  category: string;
  price: string; // Store retail price (calculated with +60% on AliExpress, +30% on Amazon)
  originalPrice: string; // Supplier / Retail anchor
  supplierPrice?: string; // Base supplier acquisition cost
  markupPercent?: number; // 60 for AliExpress, 30 for Amazon
  rating: string;
  reviewCount: number;
  loveCount: number;
  salesRank: number;
  source: "amazon" | "aliexpress";
  sourceBadgeAr: string;
  sourceBadgeEn: string;
  sourceUrl: string;
  imageUrl: string;
  galleryImages: string;
  targetRegions: string; // JSON string array e.g. '["USA", "EU", "GCC", "GLOBAL"]'
  stockStatus: string;
  stockQuantity: number;
  weeklyTrending: boolean;
  featuresAr: string;
  featuresEn: string;
  importedWeek: string;
}

// Utility to calculate store retail price based on source:
// AliExpress = +60% markup (1.60x supplier cost)
// Amazon = +30% markup (1.30x supplier cost)
export function calculateStorePrice(supplierCost: number, source: "amazon" | "aliexpress"): {
  storePrice: string;
  markupPercent: number;
  supplierCostStr: string;
} {
  const markupPercent = source === "aliexpress" ? 60 : 30;
  const multiplier = 1 + markupPercent / 100;
  const storePrice = (supplierCost * multiplier).toFixed(2);
  return {
    storePrice,
    markupPercent,
    supplierCostStr: supplierCost.toFixed(2),
  };
}

export const INITIAL_PRODUCTS: ProductItem[] = [
  // --- GCC & Middle East Curated Viral / Most Loved ---
  {
    titleAr: "مبخرة ذكية ألتراسونيك فاخرة بإضاءة ليد هادئة ومؤقت ذكي",
    titleEn: "Smart Ultrasonic Luxury Oud & Bakhoor Diffuser with Aura LED",
    descriptionAr: "المنتج الأكثر طلباً وقلباً في دول الخليج هذا الأسبوع على أمازون وعلي إكسبريس. تبخير فوري بارد وآمن بدون فحم مع شريحة تسخين ذكية من السيراميك وتحكم عبر تطبيق الجوال.",
    descriptionEn: "Top trending #1 best-seller in GCC & Middle East. Instant cold waterless diffusion with smart ceramic heating chip, ambient night aura, and mobile app control.",
    category: "luxury-gcc",
    // Sourced from Amazon: supplier base $38.45 + 30% markup = $49.99
    price: "49.99",
    originalPrice: "79.99",
    supplierPrice: "38.45",
    markupPercent: 30,
    rating: "4.9",
    reviewCount: 3840,
    loveCount: 42150,
    salesRank: 1,
    source: "amazon",
    sourceBadgeAr: "أمازون (+30% هامش ربح) 🟠",
    sourceBadgeEn: "Amazon (+30% Margin) 🟠",
    sourceUrl: "https://amazon.com/dp/B09GCCBAKHOOR",
    imageUrl: "https://images.pexels.com/photos/16045136/pexels-photo-16045136.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    galleryImages: JSON.stringify([
      "https://images.pexels.com/photos/16045136/pexels-photo-16045136.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      "https://images.pexels.com/photos/29283981/pexels-photo-29283981.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    ]),
    targetRegions: JSON.stringify(["GCC", "GLOBAL", "USA"]),
    stockStatus: "in_stock",
    stockQuantity: 45,
    weeklyTrending: true,
    featuresAr: JSON.stringify(["تبخير ذكي فوري بدون فحم", "بطارية ليثيوم تدوم 14 يوماً", "متوافق مع جميع أنواع البخور والعود", "شحن سريع تايب سي"]),
    featuresEn: JSON.stringify(["Instant smokeless ceramic diffusion", "14-day long battery life", "Compatible with all Oud & Incense types", "Fast USB-C charging"]),
    importedWeek: "2026-W15",
  },
  {
    titleAr: "خاتم الصحة الذكي من التيتانيوم لتتبع النوم والنبض والنشاط",
    titleEn: "Smart Titanium Health & Sleep Tracker Ring Pro 2026",
    descriptionAr: "الخاتم الصحي الذكي المصنوع من التيتانيوم فائق الخفة والمقاوم للماء حتى عمق 50 متراً. يراقب نبضات القلب، جودة النوم، ومستوى الأكسجين بدقة متناهية.",
    descriptionEn: "Aerospace-grade titanium smart health ring. 50m waterproof, real-time sleep stage tracking, HRV, heart rate and body temperature monitor.",
    category: "luxury-gcc",
    // Sourced from AliExpress: supplier base $56.24 + 60% markup = $89.99
    price: "89.99",
    originalPrice: "149.99",
    supplierPrice: "56.24",
    markupPercent: 60,
    rating: "4.9",
    reviewCount: 4210,
    loveCount: 38900,
    salesRank: 2,
    source: "aliexpress",
    sourceBadgeAr: "علي إكسبريس (+60% هامش ربح) 🔴",
    sourceBadgeEn: "AliExpress (+60% Margin) 🔴",
    sourceUrl: "https://aliexpress.com/item/1005006789123.html",
    imageUrl: "https://images.pexels.com/photos/12835314/pexels-photo-12835314.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    galleryImages: JSON.stringify([
      "https://images.pexels.com/photos/12835314/pexels-photo-12835314.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      "https://images.pexels.com/photos/12564670/pexels-photo-12564670.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    ]),
    targetRegions: JSON.stringify(["GCC", "USA", "EU", "GLOBAL"]),
    stockStatus: "in_stock",
    stockQuantity: 32,
    weeklyTrending: true,
    featuresAr: JSON.stringify(["هيكل تيتانيوم من الدرجة الفضائية", "مقاوم للماء 5ATM", "عمر بطارية يصل إلى 7 أيام", "تطبيق ذكي مجاني بدون اشتراك"]),
    featuresEn: JSON.stringify(["Aerospace grade titanium body", "5ATM waterproof rating", "7-day battery life", "Lifetime free companion app"]),
    importedWeek: "2026-W15",
  },
  {
    titleAr: "مروحة الرقبة التوربينية بتقنية التبريد الثلجي الفوري لصيف الخليج",
    titleEn: "Semiconductor Hydro-Cooling Wearable Neck Fan Pro",
    descriptionAr: "تقنية تبريد كهروحراري متطورة تخفض درجة حرارة الجسم بـ 15 درجة مئوية في 3 ثوانٍ. مثالية لحرارة الصيف في الخليج والسفر والرياضة الخارجية.",
    descriptionEn: "Semiconductor peltier cooling plate lowers body temperature by 15°C in 3 seconds. 360-degree silent airflow for extreme hot climates.",
    category: "luxury-gcc",
    // Sourced from Amazon: supplier base $30.76 + 30% markup = $39.99
    price: "39.99",
    originalPrice: "65.00",
    supplierPrice: "30.76",
    markupPercent: 30,
    rating: "4.8",
    reviewCount: 2950,
    loveCount: 31200,
    salesRank: 3,
    source: "amazon",
    sourceBadgeAr: "أمازون (+30% هامش ربح) 🟠",
    sourceBadgeEn: "Amazon (+30% Margin) 🟠",
    sourceUrl: "https://amazon.com/dp/B08NECKFANPRO",
    imageUrl: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    galleryImages: JSON.stringify([
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    ]),
    targetRegions: JSON.stringify(["GCC", "USA", "GLOBAL"]),
    stockStatus: "in_stock",
    stockQuantity: 60,
    weeklyTrending: true,
    featuresAr: JSON.stringify(["شريحة تبريد ثلجي نشطة", "3 سرعات توربينية هادئة جداً", "بطارية 6000mAh تدوم 12 ساعة"]),
    featuresEn: JSON.stringify(["Active Peltier cold plate", "3 ultra-quiet turbine speeds", "6000mAh 12-hour battery"]),
    importedWeek: "2026-W15",
  },

  // --- USA & North America Trending ---
  {
    titleAr: "محطة الشحن اللاسلكية المغناطيسية 3 في 1 القابلة للطي (MagSafe)",
    titleEn: "3-in-1 Foldable Magnetic MagSafe Fast Wireless Charging Station",
    descriptionAr: "المنتج الأعلى مبيعاً في أمازون أمريكا. يشحن الآيفون وساعة أبل وسماعات AirPods في آن واحد بقوة شحن سريع 15W مع تصميم مدمج قابل للطي للسفر.",
    descriptionEn: "Top #1 Best-Seller on Amazon USA. Charges iPhone, Apple Watch, and AirPods simultaneously with 15W fast MagSafe alignment and ultra-compact travel fold.",
    category: "tech-gadgets",
    // Sourced from Amazon: supplier base $34.60 + 30% markup = $44.99
    price: "44.99",
    originalPrice: "74.99",
    supplierPrice: "34.60",
    markupPercent: 30,
    rating: "4.9",
    reviewCount: 8930,
    loveCount: 51200,
    salesRank: 1,
    source: "amazon",
    sourceBadgeAr: "أمازون (+30% هامش ربح) 🟠",
    sourceBadgeEn: "Amazon (+30% Margin) 🟠",
    sourceUrl: "https://amazon.com/dp/B08MAGSAFE3IN1",
    imageUrl: "https://images.pexels.com/photos/4533076/pexels-photo-4533076.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    galleryImages: JSON.stringify([
      "https://images.pexels.com/photos/4533076/pexels-photo-4533076.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      "https://images.pexels.com/photos/4225229/pexels-photo-4225229.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    ]),
    targetRegions: JSON.stringify(["USA", "EU", "GCC", "GLOBAL"]),
    stockStatus: "in_stock",
    stockQuantity: 85,
    weeklyTrending: true,
    featuresAr: JSON.stringify(["شحن 15W MagSafe مغناطيسي قوي", "تصميم ألومنيوم فائق النحافة قابل للطي", "حماية ذكية من الحرارة والجهد الزائد"]),
    featuresEn: JSON.stringify(["15W fast MagSafe magnetic snap", "Foldable ultra-slim aircraft aluminum", "Smart thermal & overvoltage protection"]),
    importedWeek: "2026-W15",
  },
  {
    titleAr: "طائرة درونز 4K صغيرة قابلة للطي مع مستشعر تجنب العوائق الذكي",
    titleEn: "SkyMaster 4K Ultra-HD Mini Pocket Drone with Optical Flow GPS",
    descriptionAr: "طائرة درون بوزن أقل من 249 جرام بدون حاجة لتسجيل ترخيص. كاميرا 4K بدوران 90 درجة مع نظام تتبع بصري والعودة التلقائية بنقرة واحدة.",
    descriptionEn: "Sub-249g ultra-light foldable drone. 4K HDR stabilized camera, 360-degree obstacle avoidance, GPS auto return, and 30-minute flight time.",
    category: "tech-gadgets",
    // Sourced from AliExpress: supplier base $62.49 + 60% markup = $99.99
    price: "99.99",
    originalPrice: "169.99",
    supplierPrice: "62.49",
    markupPercent: 60,
    rating: "4.8",
    reviewCount: 3180,
    loveCount: 29400,
    salesRank: 4,
    source: "aliexpress",
    sourceBadgeAr: "علي إكسبريس (+60% هامش ربح) 🔴",
    sourceBadgeEn: "AliExpress (+60% Margin) 🔴",
    sourceUrl: "https://aliexpress.com/item/100500778899.html",
    imageUrl: "https://images.pexels.com/photos/4765366/pexels-photo-4765366.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    galleryImages: JSON.stringify([
      "https://images.pexels.com/photos/4765366/pexels-photo-4765366.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    ]),
    targetRegions: JSON.stringify(["USA", "EU", "GLOBAL"]),
    stockStatus: "in_stock",
    stockQuantity: 28,
    weeklyTrending: true,
    featuresAr: JSON.stringify(["كاميرا 4K HDR ومثبت جيرسكوبي", "وزن خفيف 240g لا يتطلب ترخيص", "عودة تلقائية ذكية عبر GPS"]),
    featuresEn: JSON.stringify(["4K HDR EIS stabilized camera", "Lightweight 240g no FAA license required", "GPS smart one-key return home"]),
    importedWeek: "2026-W15",
  },
  {
    titleAr: "حامل الهاتف المغناطيسي الذكي للسيارة مع شاحن لاسلكي سريع وتثبيت نانو",
    titleEn: "MagGrip Smart Auto-Clamping Car Mount with 15W Qi Fast Charger",
    descriptionAr: "المنتج الذي حصد أكثر من 20 مليون مشاهدة على تيك توك. مستشعر حركة ذكي يفتح ويغلق المقبض أوتوماتيكياً عند اقتراب الهاتف مع شحن سريع.",
    descriptionEn: "Viral TikTok sensation with over 20M views. Smart infrared motion sensor auto-clamps phone in 0.1s while delivering 15W fast wireless charging.",
    category: "viral-tiktok",
    // Sourced from AliExpress: supplier base $18.74 + 60% markup = $29.99
    price: "29.99",
    originalPrice: "49.99",
    supplierPrice: "18.74",
    markupPercent: 60,
    rating: "4.9",
    reviewCount: 9400,
    loveCount: 68400,
    salesRank: 1,
    source: "aliexpress",
    sourceBadgeAr: "علي إكسبريس (+60% هامش ربح) 🔴",
    sourceBadgeEn: "AliExpress (+60% Margin) 🔴",
    sourceUrl: "https://aliexpress.com/item/100500991122.html",
    imageUrl: "https://images.pexels.com/photos/4225229/pexels-photo-4225229.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    galleryImages: JSON.stringify([
      "https://images.pexels.com/photos/4225229/pexels-photo-4225229.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    ]),
    targetRegions: JSON.stringify(["GLOBAL", "GCC", "USA", "EU"]),
    stockStatus: "in_stock",
    stockQuantity: 110,
    weeklyTrending: true,
    featuresAr: JSON.stringify(["فتح وقفل أوتوماتيكي ذكي بالاستشعار", "تثبيت فائق الثبات على فتحات المكيف والزجاج", "شحن لاسلكي سريع 15W Qi"]),
    featuresEn: JSON.stringify(["Smart infrared auto-lock clamp", "Rock-solid air vent & dash suction", "15W Qi high-speed wireless charging"]),
    importedWeek: "2026-W15",
  }
];
