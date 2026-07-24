import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

import { cn, formatINR } from "@/lib/utils";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { getDemoOrder } from "@/lib/mock";

export const metadata: Metadata = {
  title: "Track Order",
};

export default async function OrderTrackingPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const order = getDemoOrder();

  return (
    <div className="mx-auto max-w-[860px] px-5 py-9 sm:px-8">
      <div className="mb-6 text-[13px] text-foreground/60">
        <Link href="/" className="text-inherit no-underline hover:text-accent-700">
          Home
        </Link>
        {" / "}
        Track Order
      </div>

      <div className="mb-9 rounded-md border border-border p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h1 className="text-[22px]">Order #{orderId}</h1>
        </div>
        <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-[13.5px] text-foreground/65">
          <span>Placed {order.placedDate}</span>
          <span>Estimated delivery {order.estimatedDelivery}</span>
        </div>
      </div>

      <div className="mb-9 flex flex-col">
        {order.stages.map((stage, i) => (
          <div key={stage.title} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full border text-[11px]",
                  stage.done
                    ? "border-primary bg-primary text-white"
                    : "border-border text-foreground/40"
                )}
              >
                {stage.done ? <Check className="size-3.5" /> : i + 1}
              </span>
              {i < order.stages.length - 1 && (
                <span
                  className={cn("w-px flex-1 min-h-8", stage.done ? "bg-primary" : "bg-border")}
                />
              )}
            </div>
            <div className="pb-7">
              <div
                className={cn(
                  "font-heading text-[15px] font-semibold",
                  !stage.done && "text-foreground/50"
                )}
              >
                {stage.title}
              </div>
              <p className="mt-0.5 text-[13px] text-foreground/60">{stage.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-md border border-border p-6">
        <h2 className="mb-4 font-heading text-lg font-semibold">Items in this order</h2>
        <div className="flex flex-col gap-4">
          {order.items.map((item) => (
            <div key={item.productId} className="flex items-center gap-4">
              <div className="size-14 shrink-0 overflow-hidden rounded-md border border-border">
                <ImagePlaceholder label={item.name} />
              </div>
              <div className="flex-1">
                <div className="font-heading text-[15px] font-semibold">{item.name}</div>
                <div className="text-[12.5px] text-foreground/65">
                  Qty {item.qty} · {item.material} · {item.height}
                </div>
              </div>
              <div className="font-heading font-semibold">{formatINR(item.price * item.qty)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
