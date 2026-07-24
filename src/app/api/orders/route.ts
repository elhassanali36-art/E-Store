import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderNumber = searchParams.get("orderNumber");

    if (orderNumber) {
      const found = await db
        .select()
        .from(orders)
        .where(eq(orders.orderNumber, orderNumber));
      if (found.length === 0) {
        return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, order: found[0] });
    }

    const allOrders = await db
      .select()
      .from(orders)
      .orderBy(desc(orders.createdAt))
      .limit(20);

    return NextResponse.json({ success: true, orders: allOrders });
  } catch (error) {
    console.error("Orders GET error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      targetRegion = "GCC",
      country = "Saudi Arabia",
      city = "Riyadh",
      paymentGateway = "binance_pay", // 'binance_pay' | 'paypal'
      cryptoCurrency = "USDT",
      totalAmount,
      currency = "USD",
      items = [],
    } = body;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber =
      paymentGateway === "binance_pay"
        ? `ORD-BIN-${randomSuffix}`
        : `ORD-PP-${randomSuffix}`;

    const trackingCode = `TRK-${targetRegion}-${Math.floor(100000 + Math.random() * 900000)}`;

    const cryptoTxHash =
      paymentGateway === "binance_pay"
        ? `0x${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`
        : null;

    const paypalOrderId =
      paymentGateway === "paypal"
        ? `PAYID-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
        : null;

    const [createdOrder] = await db
      .insert(orders)
      .values({
        orderNumber,
        customerName: customerName || "Customer",
        customerEmail: customerEmail || "buyer@example.com",
        customerPhone: customerPhone || "+966 50 123 4567",
        shippingAddress: shippingAddress || "King Fahd Road, District 4",
        targetRegion,
        country,
        city,
        paymentGateway,
        paymentStatus: "paid",
        cryptoCurrency: paymentGateway === "binance_pay" ? cryptoCurrency : null,
        cryptoTxHash,
        paypalOrderId,
        totalAmount: totalAmount ? parseFloat(totalAmount).toFixed(2) : "49.99",
        currency,
        itemsJson: JSON.stringify(items),
        orderStatus: "processing",
        trackingCode,
      })
      .returning();

    return NextResponse.json({
      success: true,
      order: createdOrder,
      message:
        paymentGateway === "binance_pay"
          ? "تم الدفع بنجاح عبر منصة بينانس باي (Binance Pay) وتأكيد المعاملة المشفرة"
          : "تم الدفع بنجاح عبر بوابة بيبال (PayPal) وتأكيد حماية المشتري",
    });
  } catch (error) {
    console.error("Orders POST error:", error);
    return NextResponse.json({ success: false, error: "Failed to create order" }, { status: 500 });
  }
}
