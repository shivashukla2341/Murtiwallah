"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BUYER_TYPES = ["Dealer", "Temple Trust", "Exporter", "Interior Designer", "Corporate Buyer", "Hotel Group"];

const quoteSchema = z.object({
  fullName: z.string().min(2, "Enter your name"),
  businessName: z.string().min(2, "Enter your business name"),
  buyerType: z.string().min(1, "Select a buyer type"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Enter a valid phone number"),
  requirement: z.string().min(10, "Tell us a bit more about what you need"),
});

type QuoteForm = z.infer<typeof quoteSchema>;

export function WholesaleQuoteForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteForm>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { fullName: "", businessName: "", buyerType: "", email: "", phone: "", requirement: "" },
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 500));
    toast.success("Quote request received — our desk will reach out within 24 hours.");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 rounded-md border border-border p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Full Name" error={errors.fullName?.message}>
          <Input {...register("fullName")} placeholder="Your name" />
        </Field>
        <Field label="Business Name" error={errors.businessName?.message}>
          <Input {...register("businessName")} placeholder="Your business" />
        </Field>
      </div>
      <Field label="Buyer Type" error={errors.buyerType?.message}>
        <Controller
          control={control}
          name="buyerType"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select buyer type" />
              </SelectTrigger>
              <SelectContent>
                {BUYER_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </Field>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Email" error={errors.email?.message}>
          <Input type="email" {...register("email")} placeholder="you@business.com" />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <Input {...register("phone")} placeholder="+91 98765 43210" />
        </Field>
      </div>
      <Field label="Requirement" error={errors.requirement?.message}>
        <Textarea
          {...register("requirement")}
          placeholder="Deity, material, height, quantity…"
          rows={4}
        />
      </Field>
      <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} className="mt-1">
        {isSubmitting ? "Sending…" : "Request Wholesale Quote"}
      </Button>
    </form>
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
