import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FACET_MATCHERS, ProductBrowser } from "@/components/storefront/product-browser";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { getProductsByCategory } from "@/lib/services/products";
import { getCategories, getCategoryBySlug } from "@/lib/services/categories";
import { SiteImage } from "@/components/ui/site-image";
import { publicImageExists } from "@/lib/seo";

// Pages are rendered on-demand (SSR) so product/category data is always fresh.
export const dynamic = "force-dynamic";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};

  const title = `${category.name} Collection`;
  const description = `${category.productCount ?? ""} handcrafted ${category.name} idols and décor, wholesale and retail.`;
  const images = publicImageExists(`categories/${slug}.jpg`)
    ? [`/categories/${slug}.jpg`]
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: `/categories/${slug}` },
    openGraph: { title, description, images, type: "website" },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

const HEIGHTS = [
  { value: "under-12", label: "Under 12 in" },
  { value: "12-24", label: "12 – 24 in" },
  { value: "24-48", label: "24 – 48 in" },
  { value: "above-48", label: "Above 48 in" },
];

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const products = await getProductsByCategory(slug);
  const materials = Array.from(new Set(products.map((p) => p.material))).sort();

  return (
    <div>
      <div className="mx-auto max-w-[1320px] px-5 pt-5 sm:px-8">
        <div className="text-[13px] text-foreground/60">
          <Link href="/" className="text-inherit no-underline hover:text-accent-700">
            Home
          </Link>
          {" / "}
          <Link href="/categories" className="text-inherit no-underline hover:text-accent-700">
            Categories
          </Link>
          {" / "}
          {category.name} Collection
        </div>
      </div>

      <div className="relative mt-5 h-56 overflow-hidden sm:h-64">
        <SiteImage
          src={`/categories/${category.slug}.jpg`}
          alt={`${category.name} collection banner`}
          fill
          priority
          sizes="100vw"
          className="object-center"
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/60 to-black/10 p-6 text-white sm:p-9">
          <p className="mb-1.5 font-devanagari text-sm text-accent-300">{category.hindi}</p>
          <h1 className="mb-1 text-[28px] text-white sm:text-[36px]">{category.name} Collection</h1>
          {category.productCount && (
            <p className="text-[14.5px] text-white/80">
              {category.productCount} handcrafted {category.productCount === 1 ? "piece" : "pieces"}
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-[1320px] px-5 py-9 sm:px-8">
        <ProductBrowser
          products={products}
          facetGroups={[
            {
              key: "material",
              label: "Material",
              options: materials.map((m) => ({ value: m, label: m })),
              match: FACET_MATCHERS.material,
            },
            {
              key: "height",
              label: "Height",
              options: HEIGHTS,
              match: FACET_MATCHERS.height,
            },
            {
              key: "stock",
              label: "Availability",
              options: [
                { value: "in-stock", label: "In Stock" },
                { value: "made-to-order", label: "Made to Order" },
              ],
              match: FACET_MATCHERS.stock,
            },
          ]}
        />
      </div>
    </div>
  );
}
