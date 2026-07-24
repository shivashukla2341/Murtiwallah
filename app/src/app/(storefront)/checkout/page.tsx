"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { cartTotals, useCartStore } from "@/store/cart";
import { SHIPPING_COSTS, useCheckoutStore, type ShippingMethod } from "@/store/checkout";
import { useHasMounted } from "@/lib/use-has-mounted";
import { formatINR } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckoutStepper } from "@/components/storefront/checkout-stepper";
import { OrderSummary } from "@/components/storefront/order-summary";

const addressSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  phone: z.string().min(10, "Enter a valid phone number"),
  line1: z.string().min(5, "Enter your address"),
  city: z.string().min(2, "Enter your city"),
  state: z.string().min(2, "Enter your state"),
  pincode: z.string().min(6, "Enter a valid 6-digit PIN").max(6, "Enter a valid 6-digit PIN"),
  businessName: z.string().optional(),
  gstNumber: z.string().optional(),
});

type AddressForm = z.infer<typeof addressSchema>;

export default function CheckoutPage() {
  const mounted = useHasMounted();
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const { address, shippingMethod, setAddress, setShippingMethod } = useCheckoutStore();
  const { subtotal, gst } = cartTotals(items);
  const shipping = SHIPPING_COSTS[shippingMethod];
  const total = subtotal + gst + shipping;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: address.fullName ?? "",
      phone: address.phone ?? "",
      line1: address.line1 ?? "",
      city: address.city ?? "",
      state: address.state ?? "",
      pincode: address.pincode ?? "",
      businessName: address.businessName ?? "",
      gstNumber: address.gstNumber ?? "",
    },
  });

  if (!mounted) return null;

  const onSubmit = (data: AddressForm) => {
    setAddress(data);
    router.push("/checkout/payment");
  };

  return (
    <div className="mx-auto max-w-[1320px] px-5 py-9 sm:px-8">
      <div className="mb-6 text-[13px] text-foreground/60">
        <a href="/cart" className="text-inherit no-underline hover:text-accent-700">
          Cart
        </a>
        {" / "}
        Checkout
      </div>
      <CheckoutStepper current={1} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-10 lg:grid-cols-[1.6fr_1fr]"
      >
        <div className="flex flex-col gap-8">
          <section>
            <h2 className="mb-4 font-heading text-lg font-semibold">Contact &amp; Shipping Address</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Full Name" error={errors.fullName?.message}>
                <Input {...register("fullName")} placeholder="Ananya Rao" />
              </Field>
              <Field label="Phone" error={errors.phone?.message}>
                <Input {...register("phone")} placeholder="+91 98765 43210" />
              </Field>
            </div>
            <div className="mt-4">
              <Field label="Address" error={errors.line1?.message}>
                <Input {...register("line1")} placeholder="Street, locality" />
              </Field>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Field label="City" error={errors.city?.message}>
                <Input {...register("city")} placeholder="Mumbai" />
              </Field>
              <Field label="State" error={errors.state?.message}>
                <Input {...register("state")} placeholder="Maharashtra" />
              </Field>
              <Field label="PIN Code" error={errors.pincode?.message}>
                <Input {...register("pincode")} placeholder="400001" />
              </Field>
            </div>
          </section>

          <section>
            <h2 className="mb-1 font-heading text-lg font-semibold">Business Details</h2>
            <p className="mb-4 text-[13px] text-foreground/60">Optional — for a GST invoice.</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Business Name">
                <Input {...register("businessName")} placeholder="Om Decor, Jaipur" />
              </Field>
              <Field label="GST Number">
                <Input {...register("gstNumber")} placeholder="27ABCDE1234F1Z5" />
              </Field>
            </div>
          </section>

          <section>
            <h2 className="mb-4 font-heading text-lg font-semibold">Shipping Method</h2>
            <RadioGroup
              value={shippingMethod}
              onValueChange={(v) => setShippingMethod(v as ShippingMethod)}
              className="gap-3"
            >
              <ShippingOption
                value="standard"
                title="Standard"
                detail="6–8 days"
                price="Free"
              />
              <ShippingOption
                value="express"
                title="Express"
                detail="2–3 days"
                price={formatINR(SHIPPING_COSTS.express)}
              />
            </RadioGroup>
          </section>

          <Button type="submit" variant="primary" size="lg" className="self-start px-8">
            Continue to Payment →
          </Button>
        </div>

        <OrderSummary items={items} subtotal={subtotal} gst={gst} shipping={shipping} total={total} />
      </form>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label className="mb-1.5 block text-[12px] text-foreground/70">{label}</Label>
      {children}
      {error && <p className="mt-1 text-[12px] text-destructive">{error}</p>}
    </div>
  );
}

function ShippingOption({
  value,
  title,
  detail,
  price,
}: {
  value: string;
  title: string;
  detail: string;
  price: string;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-md border border-border p-4 has-[[data-checked]]:border-primary">
      <span className="flex items-center gap-3">
        <RadioGroupItem value={value} />
        <span>
          <span className="block font-heading text-[15px] font-semibold">{title}</span>
          <span className="block text-[13px] text-foreground/60">{detail}</span>
        </span>
      </span>
      <span className="font-heading font-semibold">{price}</span>
    </label>
  );
}
