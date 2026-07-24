import type { Metadata } from "next";

import { Plate } from "@/components/ui/plate";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Reveal } from "@/components/motion/reveal";
import { aboutProcess, aboutValues } from "@/lib/mock";

export const metadata: Metadata = {
  title: "About Us — Craftsmanship",
  description: "240 karigars, one standard — the story behind Murtiwallah's handcrafted idols.",
};

const STATS = [
  { value: "1998", label: "Founded" },
  { value: "240+", label: "Artisans" },
  { value: "3", label: "Workshop Cities" },
  { value: "42", label: "Export Countries" },
];

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="mb-2.5 font-devanagari text-sm text-accent-700">हमारी कहानी — Our Story</p>
            <h1 className="mb-5 text-[36px] sm:text-[46px]">
              Every Murti Carries a Family&rsquo;s Hands
            </h1>
            <p className="max-w-[50ch] text-[15.5px] text-foreground/70">
              Murtiwallah began as a single karigar workshop in Aligarh and has grown into a
              Pan-India wholesale house — without ever moving casting and carving off the karigar&rsquo;s
              bench.
            </p>
          </div>
          <Plate className="aspect-6/5 w-full">
            <ImagePlaceholder label="Founder's workshop" />
          </Plate>
        </div>
      </section>

      <Reveal>
        <section className="py-14 sm:py-17">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <p className="mb-2.5 font-devanagari text-sm text-accent-700">प्रक्रिया — Process</p>
            <h2 className="mb-9 text-[28px] sm:text-[36px]">How a Murti Is Made</h2>
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
              {aboutProcess.map((step) => (
                <div key={step.n}>
                  <div className="mb-3 font-heading text-2xl font-semibold text-accent-700">
                    0{step.n}
                  </div>
                  <div className="mb-1.5 font-heading text-lg font-semibold">{step.title}</div>
                  <p className="text-[14px] text-foreground/70">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="bg-secondary py-14 sm:py-17">
          <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-14">
            <Plate className="aspect-6/5 w-full">
              <ImagePlaceholder label="Artisan at work" />
            </Plate>
            <div>
              <p className="mb-2.5 font-devanagari text-sm text-accent-700">कारीगर — Karigars</p>
              <h2 className="mb-6 text-[28px] sm:text-[36px]">240 Karigars, One Standard</h2>
              <div className="grid grid-cols-2 gap-6">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <div className="font-heading text-2xl font-semibold text-accent-700">
                      {s.value}
                    </div>
                    <div className="mt-1 text-[13px] text-foreground/65">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="py-14 sm:py-17">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <p className="mb-2.5 font-devanagari text-sm text-accent-700">मूल्य — Values</p>
            <h2 className="mb-9 text-[28px] sm:text-[36px]">What We Hold To</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {aboutValues.map((v) => (
                <div key={v.title} className="rounded-lg border border-border p-6">
                  <div className="mb-2 font-heading text-lg font-semibold">{v.title}</div>
                  <p className="text-[14px] text-foreground/70">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
