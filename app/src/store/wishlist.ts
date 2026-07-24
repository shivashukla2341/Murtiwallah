"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { demoWishlistItems } from "@/lib/mock/orders";
import type { WishlistLine } from "@/lib/types";

interface WishlistState {
  items: WishlistLine[];
  addItem: (item: WishlistLine) => void;
  removeItem: (productId: string) => void;
  hasItem: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: demoWishlistItems,
      addItem: (item) =>
        set((state) =>
          state.items.some((i) => i.productId === item.productId)
            ? state
            : { items: [...state.items, item] }
        ),
      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) })),
      hasItem: (productId) => get().items.some((i) => i.productId === productId),
    }),
    { name: "murtiwallah-wishlist" }
  )
);
