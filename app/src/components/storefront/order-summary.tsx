import type { CartLine } from "@/lib/types";
import { formatINR } from "@/lib/utils";

export function OrderSummary({
  items,
  subtotal,
  gst,
  shipping,
  total,
}: {
  items: CartLine[];
  subtotal: number;
  gst: number;
  shipping: number;
  total: number;
}) {
  return (
    <div className="h-fit rounded-md border border-border p-6">
      <h2 className="mb-4 font-heading text-lg font-semibold">Order Summary</h2>
      <div className="mb-4 flex flex-col gap-2.5 border-b border-border pb-4 text-[13.5px]">
        {items.map((item) => (
          <div key={item.productId} className="flex justify-between gap-3">
            <span className="text-foreground/75">
              {item.name} × {item.qty}
            </span>
            <span className="shrink-0">{formatINR(item.price * item.qty)}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2.5 text-[14px]">
        <Row label="Subtotal" value={formatINR(subtotal)} />
        <Row label="GST (18%)" value={formatINR(gst)} />
        <Row label="Shipping" value={shipping === 0 ? "Free" : formatINR(shipping)} />
        <hr className="hr my-1" />
        <Row label="Total" value={formatINR(total)} bold />
      </div>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "font-heading text-lg font-semibold" : ""}`}>
      <span className={bold ? "" : "text-foreground/65"}>{label}</span>
      <span>{value}</span>
    </div>
  );
}
