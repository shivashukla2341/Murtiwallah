import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Plate } from "@/components/ui/plate";
import { SiteImage } from "@/components/ui/site-image";
import { ProductCard } from "@/components/storefront/product-card";
import { ProductPurchasePanel } from "@/components/storefront/product-purchase-panel";
import {
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/services/products";
import { getCategoryBySlug } from "@/lib/services/categories";
import { publicImageExists } from "@/lib/seo";

// Pages are rendered on-demand (SSR) so product data is always fresh.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  const title = product.name;
  const description =
    product.description ?? `${product.name} — ${product.material}, ${product.height}.`;
  const images = publicImageExists(`products/${slug}.jpg`)
    ? [`/products/${slug}.jpg`]
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: `/products/${slug}` },
    openGraph: { title, description, images, type: "website" },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [category, related] = await Promise.all([
    getCategoryBySlug(product.categorySlug),
    getRelatedProducts(product, 4),
  ]);
  const thumbs = product.images.length > 1 ? product.images.slice(1, 5) : [1, 2, 3, 4];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    material: product.material,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price,
      availability:
        product.stock === "out-of-stock"
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
    },
    aggregateRating: product.reviewCount
      ? {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviewCount,
        }
      : undefined,
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-[1320px] px-5 pt-5 sm:px-8">
        <div className="text-[13px] text-foreground/60">
          <Link href="/" className="text-inherit no-underline hover:text-accent-700">
            Home
          </Link>
          {" / "}
          {category && (
            <>
              <Link
                href={`/categories/${category.slug}`}
                className="text-inherit no-underline hover:text-accent-700"
              >
                {category.name} Collection
              </Link>
              {" / "}
            </>
          )}
          {product.name}
        </div>
      </div>

      <section className="mx-auto grid max-w-[1320px] grid-cols-1 gap-10 px-5 py-7 sm:px-8 lg:grid-cols-2 lg:gap-14">
        <div>
          <Plate className="mb-3.5 aspect-square w-full overflow-hidden">
            <SiteImage
              src={`/products/${product.slug}.jpg`}
              alt={`${product.name} — main photo`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Plate>
          <div className="grid grid-cols-4 gap-2.5">
            {[2, 3, 4, 5].map((n) => (
              <div key={n} className="relative aspect-square overflow-hidden rounded-sm border border-border">
                <SiteImage
                  src={`/products/${product.slug}-${n}.jpg`}
                  alt={`${product.name} — view ${n - 1}`}
                  fill
                  sizes="25vw"
                />
              </div>
            ))}
          </div>
        </div>

        <ProductPurchasePanel product={product} />
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-[1320px] px-5 pb-16 sm:px-8">
          <h2 className="mb-6 text-[26px]">You may also like</h2>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} showMeta={false} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
