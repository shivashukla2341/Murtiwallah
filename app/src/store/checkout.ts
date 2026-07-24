"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Address } from "@/lib/types";

export type ShippingMethod = "standard" | "express";

interface CheckoutState {
  address: Partial<Address>;
  shippingMethod: ShippingMethod;
  setAddress: (address: Partial<Address>) => void;
  setShippingMethod: (method: ShippingMethod) => void;
}

export const SHIPPING_COSTS: Record<ShippingMethod, number> = {
  standard: 0,
  express: 450,
};

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      address: {},
      shippingMethod: "standard",
      setAddress: (address) => set((s) => ({ address: { ...s.address, ...address } })),
      setShippingMethod: (shippingMethod) => set({ shippingMethod }),
    }),
    { name: "murtiwallah-checkout" }
  )
);
