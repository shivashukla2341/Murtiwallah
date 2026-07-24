import type { CartLine, DemoOrder, WishlistLine } from "@/lib/types";

/**
 * The canonical demo order reused verbatim across Cart, Checkout, Payment,
 * OrderSuccess and OrderTracking in the mockups (order MW-20260723-4471,
 * total ₹45,194). Kept here as the single seam Phase 5 (Razorpay) will
 * eventually replace with real order creation.
 */
export const demoCartItems: CartLine[] = [
  { productId: "1", name: "Panchmukhi Hanuman", material: "Brass", height: "18 in", qty: 2, price: 8400 },
  { productId: "3", name: "Seated Ganesha", material: "White Marble", height: "12 in", qty: 1, price: 6750 },
  { productId: "4", name: "Radha Krishna", material: "Panchdhatu", height: "15 in", qty: 1, price: 12900 },
];

export const GST_RATE = 0.18;

export function computeCartTotals(items: CartLine[]) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const gst = Math.round(subtotal * GST_RATE);
  const shipping = 0;
  const total = subtotal + gst + shipping;
  return { subtotal, gst, shipping, total };
}

export function getDemoOrder(): DemoOrder {
  const { subtotal, gst, shipping, total } = computeCartTotals(demoCartItems);
  return {
    id: "MW-20260723-4471",
    shortId: "MW-4471",
    customerName: "Ananya Rao",
    placedDate: "23 Jul 2026",
    estimatedDelivery: "29–31 Jul 2026",
    paymentMethod: "UPI",
    status: "Processing",
    items: demoCartItems,
    subtotal,
    gst,
    shipping,
    total,
    stages: [
      { title: "Order Confirmed", detail: "We've received your order.", done: true },
      { title: "Payment Received", detail: "Payment verified via UPI.", done: true },
      { title: "Processing", detail: "Being hand-finished at our Aligarh workshop.", done: true },
      { title: "Packed", detail: "Awaiting dispatch from Aligarh warehouse.", done: false },
      { title: "Shipped", detail: "On the way to you.", done: false },
      { title: "Delivered", detail: "Expected 29–31 Jul 2026.", done: false },
    ],
  };
}

export const demoWishlistItems: WishlistLine[] = [
  { productId: "2", name: "Nataraja Shiva", material: "Bronze", height: "24 in", price: 21200 },
  { productId: "5", name: "Standing Durga", material: "Brass", height: "20 in", price: 16500 },
  { productId: "8", name: "Sai Baba Blessing", material: "Marble", height: "16 in", price: 9800 },
  { productId: "6", name: "Lakshmi on Lotus", material: "Silver Plated", height: "9 in", price: 3100 },
];
