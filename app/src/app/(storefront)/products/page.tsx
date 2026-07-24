import type { Metadata } from "next";

import { FACET_MATCHERS, ProductBrowser } from "@/components/storefront/product-browser";
import { getAllProducts, getMaterialFacets } from "@/lib/services/products";
import { getCategories } from "@/lib/services/categories";

export const metadata: Metadata = {
  title: "Shop All Idols & Décor",
  description: "2,400+ handcrafted idol and temple décor SKUs, wholesale and retail.",
};

export default async function ProductListingPage() {
  const [products, categories, materials] = await Promise.all([
    getAllProducts(),
    getCategories(),
    getMaterialFacets(),
  ]);

  return (
    <div className="mx-auto max-w-[1320px] px-5 py-11 sm:px-8">
      <p className="mb-2.5 font-devanagari text-sm text-accent-700">संपूर्ण संग्रह</p>
      <h1 className="mb-2 text-[32px] sm:text-[38px]">Shop All Idols &amp; Décor</h1>
      <p className="mb-9 text-[15.5px] text-foreground/70">2,400+ SKUs</p>

      <ProductBrowser
        products={products}
        facetGroups={[
          {
            key: "category",
            label: "Category",
            options: categories.map((c) => ({ value: c.slug, label: c.name })),
            match: FACET_MATCHERS.category,
          },
          {
            key: "material",
            label: "Material",
            options: materials.map((m) => ({ value: m, label: m })),
            match: FACET_MATCHERS.material,
          },
          {
            key: "occasion",
            label: "Occasion",
            options: ["Diwali", "Wedding", "Housewarming", "Corporate Gifts"].map((o) => ({
              value: o,
              label: o,
            })),
            match: FACET_MATCHERS.occasion,
          },
        ]}
      />
    </div>
  );
}
