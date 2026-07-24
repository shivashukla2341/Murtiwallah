import type { Metadata } from "next";

import { TrackOrderForm } from "@/components/storefront/track-order-form";

export const metadata: Metadata = {
  title: "Track Order",
};

export default function TrackOrderLookupPage() {
  return (
    <div className="mx-auto max-w-[520px] px-5 py-14 sm:px-8">
      <h1 className="mb-2 text-[28px]">Track Your Order</h1>
      <p className="mb-7 text-[14.5px] text-foreground/70">
        Enter the order ID from your confirmation email or SMS to see its status.
      </p>
      <TrackOrderForm />
    </div>
  );
}
