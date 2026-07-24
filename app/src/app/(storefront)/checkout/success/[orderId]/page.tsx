import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";

import { formatINR } from "@/lib/utils";
import { LinkButton } from "@/components/ui/button";
import { getDemoOrder } from "@/lib/mock";

export const metadata: Metadata = {
  title: "Order Confirmed",
};

export default async function OrderSuccessPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const order = getDemoOrder();

  return (
    <div className="mx-auto max-w-[560px] px-5 py-20 text-center sm:px-8">
      <CheckCircle2 className="mx-auto mb-5 size-14 text-accent-700" strokeWidth={1.4} />
      <h1 className="mb-2 text-[28px] sm:text-[34px]">Your Order Is Confirmed</h1>
      <p className="mb-8 text-foreground/70">
        Order <span className="text-foreground">#{orderId}</span> — thank you for your order.
      </p>

      <div className="mb-9 flex flex-col gap-3 rounded-md border border-border p-6 text-left text-[14px]">
        <Row label="Order Number" value={`#${order.id}`} />
        <Row label="Estimated Delivery" value={order.estimatedDelivery} />
        <Row label="Payment Method" value={order.paymentMethod} />
        <hr className="hr my-1" />
        <Row label="Total Paid" value={formatINR(order.total)} bold />
      </div>

      <div className="flex flex-col justify-center gap-3.5 sm:flex-row">
        <LinkButton href={`/orders/track/${order.id}`} variant="primary" className="flex-1 py-3">
          Track Your Order
        </LinkButton>
        <LinkButton href="/products" variant="secondary" className="flex-1 py-3">
          Continue Shopping
        </LinkButton>
      </div>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "font-heading text-lg font-semibold" : ""}`}>
      <span className={bold ? "" : "text-foreground/60"}>{label}</span>
      <span>{value}</span>
    </div>
  );
}
