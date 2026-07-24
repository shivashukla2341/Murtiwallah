"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { cartTotals, useCartStore } from "@/store/cart";
import { SHIPPING_COSTS, useCheckoutStore } from "@/store/checkout";
import { useHasMounted } from "@/lib/use-has-mounted";
import { formatINR } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckoutStepper } from "@/components/storefront/checkout-stepper";
import { OrderSummary } from "@/components/storefront/order-summary";
import { getDemoOrder } from "@/lib/mock";

const METHODS = [
  { value: "upi", label: "UPI" },
  { value: "cards", label: "Cards" },
  { value: "netbanking", label: "Net Banking" },
  { value: "wallet", label: "Wallet" },
  { value: "emi", label: "EMI" },
];

export default function PaymentPage() {
  const mounted = useHasMounted();
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const shippingMethod = useCheckoutStore((s) => s.shippingMethod);
  const { subtotal, gst } = cartTotals(items);
  const shipping = SHIPPING_COSTS[shippingMethod];
  const total = subtotal + gst + shipping;
  const [method, setMethod] = useState("upi");
  const [paying, setPaying] = useState(false);

  if (!mounted) return null;

  const handlePay = () => {
    setPaying(true);
    // Razorpay checkout + signature verification lands in Phase 5 — this
    // simulates a successful capture so the order-confirmation flow can be
    // built and reviewed end to end against mock data in the meantime.
    setTimeout(() => {
      clearCart();
      toast.success("Payment successful");
      router.push(`/checkout/success/${getDemoOrder().id}`);
    }, 700);
  };

  return (
    <div className="mx-auto max-w-[1320px] px-5 py-9 sm:px-8">
      <div className="mb-6 text-[13px] text-foreground/60">
        <a href="/cart" className="text-inherit no-underline hover:text-accent-700">
          Cart
        </a>
        {" / "}
        <a href="/checkout" className="text-inherit no-underline hover:text-accent-700">
          Checkout
        </a>
        {" / "}
        Payment
      </div>
      <CheckoutStepper current={3} />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <h2 className="mb-4 font-heading text-lg font-semibold">Payment Method</h2>
          <Tabs value={method} onValueChange={setMethod}>
            <TabsList className="mb-5 h-auto flex-wrap justify-start gap-1 bg-transparent p-0">
              {METHODS.map((m) => (
                <TabsTrigger
                  key={m.value}
                  value={m.value}
                  className="rounded-full border border-border px-4 py-1.5 text-[13px] data-active:border-primary data-active:bg-accent-100 data-active:text-accent-700 data-active:shadow-none"
                >
                  {m.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="upi" className="flex flex-col gap-3">
              <Label className="text-[12px] text-foreground/70">UPI ID</Label>
              <div className="flex gap-2">
                <Input placeholder="yourname@upi" />
                <Button type="button" variant="secondary" className="flex-none">
                  Verify UPI ID
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="cards" className="flex flex-col gap-3">
              <Label className="text-[12px] text-foreground/70">Card Number</Label>
              <Input placeholder="1234 5678 9012 3456" />
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="MM/YY" />
                <Input placeholder="CVV" />
              </div>
            </TabsContent>
            <TabsContent value="netbanking" className="text-[14px] text-foreground/70">
              You&rsquo;ll be redirected to your bank to complete payment.
            </TabsContent>
            <TabsContent value="wallet" className="text-[14px] text-foreground/70">
              Pay using Paytm, PhonePe or Amazon Pay.
            </TabsContent>
            <TabsContent value="emi" className="text-[14px] text-foreground/70">
              No-cost EMI available on select cards for orders above ₹5,000.
            </TabsContent>
          </Tabs>

          <div className="mt-7 flex items-start gap-2.5 rounded-md border border-border p-4 text-[12.5px] text-foreground/65">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-accent-700" strokeWidth={1.8} />
            256-bit encrypted · PCI-DSS compliant · Your payment details are never stored on our
            servers.
          </div>

          <Button
            type="button"
            variant="primary"
            size="lg"
            className="mt-7 w-full py-3.5 text-base sm:w-auto sm:px-10"
            disabled={paying}
            onClick={handlePay}
          >
            {paying ? "Processing…" : `Pay ${formatINR(total)}`}
          </Button>
        </div>

        <OrderSummary items={items} subtotal={subtotal} gst={gst} shipping={shipping} total={total} />
      </div>
    </div>
  );
}
