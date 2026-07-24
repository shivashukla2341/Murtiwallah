import type { Metadata } from "next";

import { Plate } from "@/components/ui/plate";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { LinkButton } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { careers } from "@/lib/mock";

export const metadata: Metadata = {
  title: "Careers",
  description: "Open roles across craft, wholesale and logistics at Murtiwallah.",
};

const CULTURE = [
  { title: "Craft-Led", desc: "Karigars sit at the center of every decision we make." },
  { title: "Ownership", desc: "Small teams, real accountability, fast decisions." },
  { title: "Direct Feedback", desc: "We say what we mean, kindly and quickly." },
  { title: "Built to Last", desc: "We plan in years, not quarters." },
];

export default function CareersPage() {
  return (
    <div>
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="mb-2.5 font-devanagari text-sm text-accent-700">करियर — Careers</p>
            <h1 className="mb-5 text-[36px] sm:text-[46px]">Build the Next Chapter With Us</h1>
            <p className="max-w-[50ch] text-[15.5px] text-foreground/70">
              From the karigar&rsquo;s bench to the export desk, we&rsquo;re hiring people who care about
              doing the work properly.
            </p>
          </div>
          <Plate className="aspect-6/5 w-full">
            <ImagePlaceholder label="Workshop floor" />
          </Plate>
        </div>
      </section>

      <Reveal>
        <section className="py-14 sm:py-17">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <h2 className="mb-9 text-[28px] sm:text-[36px]">What It&rsquo;s Like Here</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {CULTURE.map((c) => (
                <div key={c.title} className="rounded-lg border border-border p-6">
                  <div className="mb-2 font-heading text-lg font-semibold">{c.title}</div>
                  <p className="text-[14px] text-foreground/70">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="bg-secondary py-14 sm:py-17">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <h2 className="mb-7 text-[28px] sm:text-[36px]">Open Positions</h2>
            <div className="flex flex-col">
              {careers.map((role) => (
                <div
                  key={role.title}
                  className="flex flex-wrap items-center justify-between gap-4 border-b border-border py-5"
                >
                  <div>
                    <div className="font-heading text-lg font-semibold">{role.title}</div>
                    <div className="mt-0.5 text-[13.5px] text-foreground/65">
                      {role.location} · {role.type}
                    </div>
                  </div>
                  <LinkButton href="/contact" variant="secondary">
                    Apply →
                  </LinkButton>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
