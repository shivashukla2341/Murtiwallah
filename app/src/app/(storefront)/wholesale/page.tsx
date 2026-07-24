import type { Metadata } from "next";

import { Plate } from "@/components/ui/plate";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { LinkButton } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { WholesaleQuoteForm } from "@/components/storefront/wholesale-quote-form";
import { wholesaleBuyers, wholesaleSteps, wholesaleTrustStats } from "@/lib/mock";

export const metadata: Metadata = {
  title: "Wholesale — Bulk & Export Orders",
  description: "GST-billed quotes, MOQ pricing and Pan-India logistics for dealers, temple trusts and exporters.",
};

export default function WholesalePage() {
  return (
    <div>
      <section className="bg-neutral-900 text-neutral-200">
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="mb-2.5 font-devanagari text-sm text-accent-400">थोक — Wholesale</p>
            <h1 className="mb-5 text-[34px] text-neutral-100 sm:text-[44px]">
              Stock Your Shelves, Fit Out a Temple, or Furnish a Hotel Chain
            </h1>
            <div className="flex flex-wrap gap-3.5">
              <LinkButton href="#quote" variant="primary" size="lg">
                Request Wholesale Quote
              </LinkButton>
              <LinkButton href="/contact" variant="secondary" size="lg" className="border-neutral-700 text-neutral-200">
                Talk to a Dealer Manager
              </LinkButton>
            </div>
          </div>
          <Plate className="aspect-6/5 w-full !border-neutral-800">
            <ImagePlaceholder label="Dealer showroom shelving" />
          </Plate>
        </div>
      </section>

      <section className="py-11">
        <div className="mx-auto grid max-w-[1320px] grid-cols-2 gap-6 px-5 text-center sm:px-8 lg:grid-cols-6">
          {wholesaleTrustStats.map((s) => (
            <div key={s.label}>
              <div className="font-heading text-[22px] font-semibold text-accent-700">{s.stat}</div>
              <div className="mt-1 text-[12.5px] text-foreground/65">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <Reveal>
        <section className="bg-secondary py-14 sm:py-17">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <h2 className="mb-9 text-[28px] sm:text-[36px]">From Enquiry to Dispatch</h2>
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-5">
              {wholesaleSteps.map((s) => (
                <div key={s.n}>
                  <div className="mb-2 font-heading text-2xl font-semibold text-accent-700">{s.n}</div>
                  <div className="mb-1.5 font-heading text-lg font-semibold">{s.title}</div>
                  <p className="text-[14px] text-foreground/70">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="py-14 sm:py-17">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <h2 className="mb-9 text-[28px] sm:text-[36px]">Built for Every Kind of Bulk Buyer</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {wholesaleBuyers.map((b) => (
                <div key={b.title} className="rounded-lg border border-border p-5">
                  <div className="mb-1.5 font-heading text-base font-semibold">{b.title}</div>
                  <p className="text-[13.5px] text-foreground/70">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section id="quote" className="scroll-mt-20 bg-secondary py-14 sm:py-17">
          <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="mb-2.5 font-devanagari text-sm text-accent-700">अनुरोध — Quote</p>
              <h2 className="mb-4 text-[28px] sm:text-[36px]">Request a Wholesale Quote</h2>
              <p className="mb-6 max-w-[46ch] text-[15px] text-foreground/70">
                Tell us what you need and our wholesale desk will get back to you with GST-billed,
                MOQ-tiered pricing within 24 hours.
              </p>
              <div className="rounded-md border border-border p-5">
                <div className="mb-2 text-[10px] tracking-[0.1em] text-accent-700 uppercase">
                  What to expect
                </div>
                <ul className="flex flex-col gap-2 text-[13.5px] text-foreground/72">
                  <li>A dedicated wholesale desk contact within 24 hours</li>
                  <li>GST-billed quote with MOQ pricing tiers</li>
                  <li>Option to order a paid sample first</li>
                </ul>
              </div>
            </div>
            <WholesaleQuoteForm />
          </div>
        </section>
      </Reveal>
    </div>
  );
}
