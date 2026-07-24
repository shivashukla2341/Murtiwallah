"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SegmentedControl } from "@/components/ui/segmented-control";

const ENQUIRY_TYPES = [
  { value: "Retail", label: "Retail" },
  { value: "Wholesale", label: "Wholesale" },
  { value: "Export", label: "Export" },
  { value: "Support", label: "Support" },
];

const contactSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  phone: z.string().min(10, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email"),
  enquiryType: z.string().min(1),
  message: z.string().min(10, "Tell us a little more"),
});

type ContactForm = z.infer<typeof contactSchema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", phone: "", email: "", enquiryType: "Retail", message: "" },
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 500));
    toast.success("Message sent — we'll get back to you shortly.");
    reset({ name: "", phone: "", email: "", enquiryType: "Retail", message: "" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <Input {...register("name")} placeholder="Your name" />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <Input {...register("phone")} placeholder="+91 98765 43210" />
        </Field>
      </div>
      <Field label="Email" error={errors.email?.message}>
        <Input type="email" {...register("email")} placeholder="you@example.com" />
      </Field>
      <Field label="Enquiry Type">
        <Controller
          control={control}
          name="enquiryType"
          render={({ field }) => (
            <SegmentedControl
              aria-label="Enquiry type"
              options={ENQUIRY_TYPES}
              value={field.value}
              onValueChange={field.onChange}
            />
          )}
        />
      </Field>
      <Field label="Message" error={errors.message?.message}>
        <Textarea {...register("message")} placeholder="How can we help?" rows={5} />
      </Field>
      <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} className="self-start">
        {isSubmitting ? "Sending…" : "Send Message"}
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
