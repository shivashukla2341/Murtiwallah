import type { Metadata } from "next";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FACET_MATCHERS, ProductBrowser } from "@/components/storefront/product-browser";
import { searchProducts } from "@/lib/services/products";

export const metadata: Metadata = {
  title: "Search",
};

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const results = await searchProducts(q);
  const materials = Array.from(new Set(results.map((p) => p.material))).sort();

  return (
    <div className="mx-auto max-w-[1320px] px-5 py-11 sm:px-8">
      <form action="/search" role="search" className="mb-6 flex gap-3">
        <Input
          name="q"
          type="text"
          defaultValue={q}
          placeholder="Search by god name, material, temple, festival…"
          aria-label="Search Murtiwallah"
          className="h-12 max-w-md text-[15px]"
        />
        <Button type="submit" variant="primary" className="h-12 px-7">
          Search
        </Button>
      </form>

      {q ? (
        <>
          <h1 className="mb-1.5 text-[26px]">Results for &ldquo;{q}&rdquo;</h1>
          <p className="mb-9 text-[13.5px] text-foreground/65">{results.length} pieces found</p>

          {results.length === 0 ? (
            <p className="py-16 text-center text-foreground/60">
              No pieces matched &ldquo;{q}&rdquo; — try a god name, material or occasion instead.
            </p>
          ) : (
            <ProductBrowser
              products={results}
              showRating={false}
              showPagination={false}
              pageSize={999}
              sortOptions={[
                { value: "popular", label: "Relevance" },
                { value: "price-asc", label: "Price ↑" },
              ]}
              facetGroups={[
                {
                  key: "material",
                  label: "Material",
                  options: materials.map((m) => ({ value: m, label: m })),
                  match: FACET_MATCHERS.material,
                },
              ]}
            />
          )}
        </>
      ) : (
        <p className="py-16 text-center text-foreground/60">
          Search by god name, material, temple or festival to get started.
        </p>
      )}
    </div>
  );
}
