import type { Metadata } from "next";

import { Plate } from "@/components/ui/plate";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { ContactForm } from "@/components/storefront/contact-form";
import { contactDesks } from "@/lib/mock";

export const metadata: Metadata = {
  title: "Contact",
  description: "Retail support, wholesale desk, export desk and custom temple orders.",
};

export default function ContactPage() {
  return (
    <div>
      <div className="mx-auto max-w-[1320px] px-5 py-11 sm:px-8">
        <p className="mb-2.5 font-devanagari text-sm text-accent-700">संपर्क — Contact</p>
        <h1 className="mb-4 text-[32px] sm:text-[38px]">Get in Touch</h1>
        <p className="max-w-[62ch] text-[15.5px] text-foreground/70">
          Whether you&rsquo;re placing a single retail order or fitting out a temple, the right desk
          is one message away.
        </p>

        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {contactDesks.map((desk) => (
            <div key={desk.tag} className="rounded-lg border border-border p-5">
              <div className="mb-2 text-[10px] tracking-[0.1em] text-accent-700 uppercase">
                {desk.tag}
              </div>
              <div className="mb-2.5 font-heading text-base font-semibold">{desk.title}</div>
              <div className="text-[13.5px] text-foreground/72">{desk.phone}</div>
              <div className="text-[13.5px] text-foreground/72">{desk.email}</div>
            </div>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-5 font-heading text-lg font-semibold">General Enquiry</h2>
            <ContactForm />
          </div>
          <div>
            <Plate className="mb-5 aspect-3/2 w-full">
              <ImagePlaceholder label="Map — Aligarh head office" />
            </Plate>
            <div className="text-[14px] text-foreground/72">
              <div className="mb-1 font-heading text-base font-semibold text-foreground">
                Head Office
              </div>
              Murtiwallah Handicrafts Pvt. Ltd.
              <br />
              Industrial Area, Aligarh, Uttar Pradesh 202001, India
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
