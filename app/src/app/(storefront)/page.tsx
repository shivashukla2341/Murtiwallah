import type { Metadata } from "next";
import Link from "next/link";
import { Globe, Package, Receipt, ShieldCheck, Truck, Users } from "lucide-react";

import { Button, LinkButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plate } from "@/components/ui/plate";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { ProductCard } from "@/components/storefront/product-card";
import {
  HOME_MATERIALS,
  OCCASIONS,
  blogPosts,
  getCollections,
  testimonials,
} from "@/lib/mock";
import { getAllProducts, getBestSellers } from "@/lib/services/products";
import { getCategories } from "@/lib/services/categories";
import { SiteImage } from "@/components/ui/site-image";

export const metadata: Metadata = {
  title: "Handcrafted Idols & Temple Décor, Wholesale & Retail",
};

const FACETS = ["God Name", "Material", "Height", "Temple", "Festival", "Bulk Order"];

export default async function HomePage() {
  const [categories, bestSellers, allProducts] = await Promise.all([
    getCategories(),
    getBestSellers(4),
    getAllProducts(),
  ]);
  const collections = getCollections();

  const trustStats = [
    { icon: Users, value: "10,000+", label: "Dealers" },
    { icon: Package, value: `${allProducts.length}+`, label: "Products" },
    { icon: Truck, value: "Pan-India", label: "Delivery" },
    { icon: Globe, value: "Worldwide", label: "Export" },
    { icon: Receipt, value: "100%", label: "GST Billing" },
    { icon: ShieldCheck, value: "Secure", label: "Payments" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-secondary">
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div>
            <p className="mb-2.5 font-devanagari text-sm text-accent-700">
              आस्था • शिल्प • विरासत — Faith, Craft, Heritage
            </p>
            <h1 className="mb-5 text-[38px] leading-[1.08] sm:text-[48px] lg:text-[60px]">
              Crafted with Devotion.
              <br />
              Delivered with Trust.
            </h1>
            <p className="mb-7 max-w-[46ch] text-[17px] text-foreground/68">
              India&rsquo;s largest wholesale destination for premium handcrafted idols and
              spiritual décor — from home temples to hotel lobbies to Pan-India dealer shelves.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <LinkButton href="/products" variant="primary" size="lg">
                Explore Collection
              </LinkButton>
              <LinkButton href="/wholesale" variant="secondary" size="lg">
                Shop Wholesale
              </LinkButton>
            </div>
          </div>
          <Plate className="aspect-6/5 w-full overflow-hidden">
            <SiteImage
              src="/hero.jpg"
              alt="Handcrafted idols in warm studio light"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Plate>
        </div>
      </section>

      {/* Search + facets */}
      <section className="pt-11 pb-3">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <div className="flex flex-col gap-4.5 rounded-md border border-border p-5 shadow-md sm:p-6.5">
            <form
              className="flex gap-3"
              action="/search"
              role="search"
            >
              <Input
                name="q"
                type="text"
                placeholder="Search by god name, material, temple, festival…"
                aria-label="Search Murtiwallah"
                className="h-12 text-[15px]"
              />
              <Button type="submit" variant="primary" className="h-12 px-7">
                Search
              </Button>
            </form>
            <div className="flex flex-wrap gap-2.5">
              {FACETS.map((f) => (
                <Link
                  key={f}
                  href="/products"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-[13.5px] text-foreground no-underline transition-colors hover:border-primary hover:text-accent-700"
                >
                  {f}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <Reveal>
        <section className="py-14 sm:py-17">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <p className="mb-2.5 font-devanagari text-sm text-accent-700">श्रेणियाँ — Categories</p>
            <h2 className="mb-2 text-[28px] sm:text-[38px]">Shop by Deity</h2>
            <p className="mb-9 max-w-[62ch] text-[15.5px] text-foreground/70">
              {categories.length} collections, each carved by artisan families who have worked the
              same murti tradition for generations.
            </p>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/categories/${c.slug}`}
                  className="group flex flex-col gap-2.5 text-foreground no-underline"
                >
                  <div className="aspect-square relative overflow-hidden rounded-lg border border-border transition-[box-shadow,transform] duration-250 group-hover:-translate-y-1 group-hover:shadow-lg">
                    <SiteImage src={`/categories/${c.slug}.jpg`} alt={c.name} fill sizes="(max-width: 640px) 50vw, 20vw" />
                  </div>
                  <div>
                    <div className="font-heading text-[17px] font-semibold">{c.name}</div>
                    <div className="font-devanagari text-[13px] text-foreground/65">{c.hindi}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Featured collections */}
      <Reveal>
        <section className="bg-secondary py-14 sm:py-17">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <p className="mb-2.5 font-devanagari text-sm text-accent-700">विशेष संग्रह — Featured</p>
            <h2 className="mb-2 text-[28px] sm:text-[38px]">Featured Collections</h2>
            <p className="mb-9 max-w-[62ch] text-[15.5px] text-foreground/70">
              Curated edits for the moments that call for something considered.
            </p>
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {collections.map((c) => (
                <Link
                  key={c.id}
                  href="/products"
                  className="group relative block overflow-hidden rounded-lg border border-border no-underline"
                >
                  <div className="relative aspect-4/5 overflow-hidden">
                    <SiteImage
                      src={`/collections/${c.slug}.jpg`}
                      alt={c.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/55 to-transparent p-4.5 font-heading text-lg font-semibold text-white">
                    {c.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Materials */}
      <Reveal>
        <section className="py-14 sm:py-17">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <p className="mb-2.5 font-devanagari text-sm text-accent-700">माध्यम — Material</p>
            <h2 className="text-[28px] sm:text-[38px]">Shop by Material</h2>
            <div className="mt-7 flex flex-wrap justify-between gap-6">
              {HOME_MATERIALS.map((m) => (
                <Link
                  key={m}
                  href="/products"
                  className="group flex flex-col items-center gap-2.5 text-foreground no-underline"
                >
                  <div className="size-[74px] relative overflow-hidden rounded-full border border-border transition-colors group-hover:border-primary">
                    <SiteImage src={`/materials/${m.toLowerCase()}.jpg`} alt={m} fill sizes="74px" />
                  </div>
                  <span className="text-[13.5px]">{m}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Best sellers */}
      <Reveal>
        <section className="bg-secondary py-14 sm:py-17">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="mb-2.5 font-devanagari text-sm text-accent-700">बेस्टसेलर — Best Sellers</p>
                <h2 className="mb-0 text-[28px] sm:text-[38px]">Best Sellers</h2>
              </div>
              <LinkButton href="/products" variant="ghost">
                View all →
              </LinkButton>
            </div>
            <p className="mt-2 mb-9 max-w-[62ch] text-[15.5px] text-foreground/70">
              Dealer-favourite pieces, ready to ship from stock.
            </p>
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {bestSellers.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Occasions */}
      <Reveal>
        <section className="py-14 sm:py-17">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <p className="mb-2.5 font-devanagari text-sm text-accent-700">अवसर — Occasion</p>
            <h2 className="text-[28px] sm:text-[38px]">Shop by Occasion</h2>
            <div className="mt-7 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {OCCASIONS.map((o) => (
                <Link
                  key={o}
                  href="/products"
                  className="flex flex-col items-start gap-2 rounded-lg border border-border px-5 py-5.5 text-foreground no-underline transition-colors hover:border-primary"
                >
                  <span className="text-primary">✦</span>
                  <span className="font-heading text-[17px] font-semibold">{o}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Wholesale CTA band */}
      <Reveal>
        <section className="bg-neutral-900 py-14 text-neutral-200 sm:py-17">
          <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="mb-2.5 font-devanagari text-sm text-accent-400">थोक — Wholesale</p>
              <h2 className="mb-4 text-[28px] text-neutral-100 sm:text-[38px]">
                Bulk &amp; Export Orders, Handled Properly
              </h2>
              <p className="mb-7 max-w-[50ch] text-[15.5px] text-neutral-400">
                Temple trusts, hotel groups, exporters and dealers — get GST-billed quotes, MOQ
                pricing and pan-India logistics from a single desk.
              </p>
              <LinkButton href="/wholesale" variant="primary" size="lg">
                Request Wholesale Quote
              </LinkButton>
            </div>
            <Plate className="aspect-6/5 w-full !border-neutral-800 overflow-hidden">
              <SiteImage src="/wholesale-banner.jpg" alt="Warehouse and dispatch floor" fill sizes="(max-width: 1024px) 100vw, 50vw" />
            </Plate>
          </div>
        </section>
      </Reveal>

      {/* Craftsmanship */}
      <Reveal>
        <section className="bg-secondary py-14 sm:py-17">
          <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
            <Plate className="aspect-6/5 w-full lg:order-first overflow-hidden">
              <SiteImage src="/craftsmanship.jpg" alt="Artisan hand-carving a murti" fill sizes="(max-width: 1024px) 100vw, 50vw" />
            </Plate>
            <div>
              <p className="mb-2.5 font-devanagari text-sm text-accent-700">शिल्प कथा — Craftsmanship</p>
              <h2 className="mb-4 text-[28px] sm:text-[38px]">
                Every Murti Begins With a Hand, Not a Mould
              </h2>
              <p className="mb-6 max-w-[54ch] text-[15.5px] text-foreground/68">
                Our karigar families rough-cut stone and cast metal the way their grandparents
                did — measuring proportion by eye against shastra ratios, then finishing every
                eye, ornament and fold entirely by hand. A single large murti can take three
                artisans six weeks.
              </p>
              <LinkButton href="/about" variant="ghost">
                Read the full story →
              </LinkButton>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Trust stats */}
      <section className="py-12">
        <div className="mx-auto grid max-w-[1320px] grid-cols-3 gap-6 px-5 text-center sm:px-8 lg:grid-cols-6">
          {trustStats.map(({ icon: Icon, value, label }) => (
            <div key={label}>
              <Icon className="mx-auto mb-2.5 size-6.5 text-accent-700" strokeWidth={1.6} />
              <div className="font-heading text-[26px] font-semibold text-accent-700">{value}</div>
              <div className="mt-1 text-[13px] text-foreground/65">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <Reveal>
        <section className="bg-secondary py-14 sm:py-17">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <p className="mb-2.5 font-devanagari text-sm text-accent-700">विश्वास — Trusted By</p>
            <h2 className="text-[28px] sm:text-[38px]">What Our Buyers Say</h2>
            <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {testimonials.map((t) => (
                <div key={t.id} className="flex flex-col gap-3.5 rounded-lg border border-border p-6.5">
                  <p className="m-0 text-[14.5px] text-foreground/82">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-2.5">
                    <div className="size-10 shrink-0 overflow-hidden rounded-full border border-border">
                      <SiteImage src={`/testimonials/${t.id}.jpg`} alt={t.name} fill sizes="40px" />
                    </div>
                    <div>
                      <div className="font-heading text-[15px] font-semibold">{t.name}</div>
                      <Badge variant="outline" className="mt-1">
                        {t.role}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Journal preview */}
      <Reveal>
        <section className="py-14 sm:py-17">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="mb-2.5 font-devanagari text-sm text-accent-700">पत्रिका — Journal</p>
                <h2 className="mb-0 text-[28px] sm:text-[38px]">From the Journal</h2>
              </div>
              <LinkButton href="/blog" variant="ghost">
                Visit journal →
              </LinkButton>
            </div>
            <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {blogPosts.slice(0, 3).map((b) => (
                <Link
                  key={b.id}
                  href={`/blog/${b.slug}`}
                  className="flex flex-col gap-3 text-foreground no-underline"
                >
                  <div className="relative aspect-3/2 overflow-hidden rounded-lg border border-border">
                    <SiteImage src={`/blog/${b.slug}.jpg`} alt={b.title} fill sizes="(max-width: 640px) 100vw, 33vw" />
                  </div>
                  <Badge variant="neutral" className="self-start">
                    {b.tag}
                  </Badge>
                  <div className="font-heading text-lg font-semibold">{b.title}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
    </>
  );
}
