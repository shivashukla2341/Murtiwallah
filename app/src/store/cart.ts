"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { GST_RATE, demoCartItems } from "@/lib/mock/orders";
import type { CartLine } from "@/lib/types";

interface CartState {
  items: CartLine[];
  couponCode: string | null;
  addItem: (item: Omit<CartLine, "qty">, qty?: number) => void;
  removeItem: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  applyCoupon: (code: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: demoCartItems,
      couponCode: null,
      addItem: (item, qty = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.productId === item.productId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId ? { ...i, qty: i.qty + qty } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, qty }] };
        }),
      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) })),
      setQty: (productId, qty) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, qty: Math.max(1, qty) } : i
          ),
        })),
      applyCoupon: (code) => set({ couponCode: code }),
      clearCart: () => set({ items: [], couponCode: null }),
    }),
    { name: "murtiwallah-cart" }
  )
);

export function cartTotals(items: CartLine[]) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const gst = Math.round(subtotal * GST_RATE);
  const shipping = 0;
  const total = subtotal + gst + shipping;
  return { subtotal, gst, shipping, total };
}

export function useCartCount() {
  return useCartStore((s) => s.items.reduce((sum, i) => sum + i.qty, 0));
}
