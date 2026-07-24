import type { Metadata } from "next";
import Link from "next/link";

import { SiteImage } from "@/components/ui/site-image";
import { getCategories } from "@/lib/services/categories";

export async function generateMetadata(): Promise<Metadata> {
  const categories = await getCategories();
  return {
    title: "Categories",
    description: `Shop by deity — ${categories.length} collections, each carved by artisan families.`,
  };
}

export default async function CategoriesIndexPage() {
  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-[1320px] px-5 py-11 sm:px-8">
      <p className="mb-2.5 font-devanagari text-sm text-accent-700">श्रेणियाँ — Categories</p>
      <h1 className="mb-2 text-[32px] sm:text-[38px]">Shop by Deity</h1>
      <p className="mb-9 max-w-[62ch] text-[15.5px] text-foreground/70">
        {categories.length} collections, each carved by artisan families who have worked the same
        murti tradition for generations.
      </p>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/categories/${c.slug}`}
            className="group flex flex-col gap-2.5 text-foreground no-underline"
          >
            <div className="aspect-square relative overflow-hidden rounded-lg border border-border transition-[box-shadow,transform] duration-250 group-hover:-translate-y-1 group-hover:shadow-lg">
                <SiteImage
                  src={`/categories/${c.slug}.jpg`}
                  alt={c.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
            </div>
            <div>
              <div className="font-heading text-[17px] font-semibold">{c.name}</div>
              <div className="font-devanagari text-[13px] text-foreground/65">{c.hindi}</div>
              {c.productCount && (
                <div className="mt-0.5 text-[12px] text-foreground/55">
                  {c.productCount} {c.productCount === 1 ? "piece" : "pieces"}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
