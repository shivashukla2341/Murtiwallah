"use client";

import Link from "next/link";
import { toast } from "sonner";

import { formatINR } from "@/lib/utils";
import { cartTotals, useCartStore } from "@/store/cart";
import { useHasMounted } from "@/lib/use-has-mounted";
import { Button, LinkButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QtyStepper } from "@/components/ui/qty-stepper";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

export default function CartPage() {
  const mounted = useHasMounted();
  const items = useCartStore((s) => s.items);
  const setQty = useCartStore((s) => s.setQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const couponCode = useCartStore((s) => s.couponCode);
  const applyCoupon = useCartStore((s) => s.applyCoupon);

  const { subtotal, gst, shipping, total } = cartTotals(items);

  if (!mounted) return null;

  return (
    <div className="mx-auto max-w-[1320px] px-5 py-9 sm:px-8">
      <div className="mb-6 text-[13px] text-foreground/60">
        <Link href="/" className="text-inherit no-underline hover:text-accent-700">
          Home
        </Link>
        {" / "}
        Cart
      </div>
      <h1 className="mb-8 text-[30px]">Your Cart</h1>

      {items.length === 0 ? (
        <div className="py-16 text-center">
          <p className="mb-5 text-foreground/65">Your cart is empty.</p>
          <LinkButton href="/products" variant="primary">
            Explore Collection
          </LinkButton>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="flex flex-col gap-5">
            {items.map((item) => (
              <div
                key={item.productId}
                className="grid grid-cols-[80px_1fr] items-center gap-4 border-b border-border pb-5 sm:grid-cols-[80px_1fr_auto_auto]"
              >
                <div className="size-20 overflow-hidden rounded-md border border-border">
                  <ImagePlaceholder label={item.name} />
                </div>
                <div>
                  <div className="font-heading text-base font-semibold">{item.name}</div>
                  <div className="mt-1 text-[12.5px] text-foreground/65">
                    {item.material} · {item.height}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      removeItem(item.productId);
                      toast(`${item.name} removed from cart`);
                    }}
                    className="mt-1.5 text-[12.5px] text-accent-700 underline-offset-3 hover:underline"
                  >
                    Remove
                  </button>
                </div>
                <QtyStepper
                  value={item.qty}
                  onChange={(qty) => setQty(item.productId, qty)}
                  className="col-span-2 sm:col-span-1"
                />
                <div className="col-span-2 font-heading text-lg font-semibold sm:col-span-1 sm:text-right">
                  {formatINR(item.price * item.qty)}
                </div>
              </div>
            ))}
          </div>

          <div className="h-fit rounded-md border border-border p-6">
            <h2 className="mb-4 font-heading text-lg font-semibold">Order Summary</h2>
            <form
              className="mb-5 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                const code = new FormData(e.currentTarget).get("coupon");
                if (typeof code === "string" && code.trim()) {
                  applyCoupon(code.trim().toUpperCase());
                  toast.success(`Coupon "${code.trim().toUpperCase()}" applied`);
                }
              }}
            >
              <Input name="coupon" placeholder="Coupon code" aria-label="Coupon code" defaultValue={couponCode ?? ""} />
              <Button type="submit" variant="secondary" className="flex-none">
                Apply
              </Button>
            </form>
            <div className="flex flex-col gap-2.5 text-[14px]">
              <Row label="Subtotal" value={formatINR(subtotal)} />
              <Row label="GST (18%)" value={formatINR(gst)} />
              <Row label="Shipping" value={shipping === 0 ? "Free" : formatINR(shipping)} />
              <hr className="hr my-1" />
              <Row label="Total" value={formatINR(total)} bold />
            </div>
            <LinkButton href="/checkout" variant="primary" size="block" className="mt-5 py-3">
              Proceed to Checkout
            </LinkButton>
            <p className="mt-4 text-center text-[12.5px] text-foreground/60">
              Need 20+ pieces?{" "}
              <Link href="/wholesale" className="text-accent-700 hover:underline">
                Get a wholesale quote
              </Link>
            </p>
          </div>
        </div>
      )}
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
