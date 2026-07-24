"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";

import type { Product } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { ProductCard } from "@/components/storefront/product-card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type FacetGroup = {
  key: string;
  label: string;
  options: { value: string; label: string }[];
  /** Whether `product` matches a single selected facet value. */
  match: (product: Product, value: string) => boolean;
};

const SORTS = [
  { value: "popular", label: "Popular" },
  { value: "price-asc", label: "Price ↑" },
  { value: "newest", label: "Newest" },
];

export const FACET_MATCHERS = {
  category: (product: Product, value: string) => product.categorySlug === value,
  material: (product: Product, value: string) => product.material === value,
  occasion: (product: Product, value: string) => product.occasions.includes(value),
  stock: (product: Product, value: string) => product.stock === value,
  height: (product: Product, value: string) => {
    const inches = parseInt(product.height, 10);
    if (Number.isNaN(inches)) return false;
    switch (value) {
      case "under-12":
        return inches < 12;
      case "12-24":
        return inches >= 12 && inches <= 24;
      case "24-48":
        return inches > 24 && inches <= 48;
      case "above-48":
        return inches > 48;
      default:
        return false;
    }
  },
};

function matchesFacets(
  product: Product,
  facetGroups: FacetGroup[],
  selected: Record<string, Set<string>>
) {
  return facetGroups.every((group) => {
    const values = selected[group.key];
    if (!values || values.size === 0) return true;
    return Array.from(values).some((v) => group.match(product, v));
  });
}

export function ProductBrowser({
  products,
  facetGroups,
  pageSize = 9,
  showRating = true,
  sortOptions = SORTS,
  showPagination = true,
}: {
  products: Product[];
  facetGroups: FacetGroup[];
  pageSize?: number;
  showRating?: boolean;
  sortOptions?: { value: string; label: string }[];
  showPagination?: boolean;
}) {
  const [selected, setSelected] = useState<Record<string, Set<string>>>({});
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [wholesaleOnly, setWholesaleOnly] = useState(false);
  const [sort, setSort] = useState(sortOptions[0]?.value ?? "popular");
  const [page, setPage] = useState(1);

  const toggle = (key: string, value: string) => {
    setSelected((prev) => {
      const next = { ...prev, [key]: new Set(prev[key] ?? []) };
      if (next[key].has(value)) next[key].delete(value);
      else next[key].add(value);
      return next;
    });
    setPage(1);
  };

  const filtered = useMemo(() => {
    let list = products.filter((p) => matchesFacets(p, facetGroups, selected));
    const min = priceMin ? Number(priceMin) : undefined;
    const max = priceMax ? Number(priceMax) : undefined;
    if (min !== undefined) list = list.filter((p) => p.price >= min);
    if (max !== undefined) list = list.filter((p) => p.price <= max);
    if (wholesaleOnly) list = list.filter((p) => p.badge === "Wholesale");

    list = [...list];
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "newest") list.sort((a, b) => Number(b.id) - Number(a.id));

    return list;
  }, [products, facetGroups, selected, priceMin, priceMax, wholesaleOnly, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  const activeFilterCount =
    Object.values(selected).reduce((n, set) => n + set.size, 0) +
    (priceMin ? 1 : 0) +
    (priceMax ? 1 : 0) +
    (wholesaleOnly ? 1 : 0);

  const facetsContent = (
    <>
      {facetGroups.map((group) => (
        <div key={group.key}>
          <h3 className="mb-3 text-xs tracking-[0.08em] text-foreground uppercase">
            {group.label}
          </h3>
          <div className="flex flex-col gap-2.5">
            {group.options.map((opt) => (
              <label key={opt.value} className="flex cursor-pointer items-center gap-2.5 text-[13.5px]">
                <Checkbox
                  checked={selected[group.key]?.has(opt.value) ?? false}
                  onCheckedChange={() => toggle(group.key, opt.value)}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>
      ))}

      <div>
        <h3 className="mb-3 text-xs tracking-[0.08em] text-foreground uppercase">Price Range</h3>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            inputMode="numeric"
            placeholder="Min"
            aria-label="Minimum price"
            value={priceMin}
            onChange={(e) => {
              setPriceMin(e.target.value);
              setPage(1);
            }}
          />
          <span className="text-foreground/50">–</span>
          <Input
            type="number"
            inputMode="numeric"
            placeholder="Max"
            aria-label="Maximum price"
            value={priceMax}
            onChange={(e) => {
              setPriceMax(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-2.5 text-[13.5px]">
        <Checkbox
          checked={wholesaleOnly}
          onCheckedChange={(v) => {
            setWholesaleOnly(v === true);
            setPage(1);
          }}
        />
        Wholesale / Bulk Only
      </label>
    </>
  );

  return (
    <div className="grid grid-cols-1 gap-9 lg:grid-cols-[240px_1fr]">
      {/* Desktop filter sidebar — hidden below lg. On mobile these render in
          a Sheet instead (below), so the product grid is what a phone
          visitor sees first rather than a wall of checkboxes to scroll past. */}
      <aside className="hidden flex-col gap-7 lg:flex">{facetsContent}</aside>

      <div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[13.5px] text-foreground/65">{filtered.length} pieces found</p>
          <div className="flex items-center gap-2.5">
            <Sheet>
              <SheetTrigger
                render={
                  <Button variant="secondary" size="sm" className="lg:hidden" />
                }
              >
                <SlidersHorizontal className="size-3.5" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-white">
                    {activeFilterCount}
                  </span>
                )}
              </SheetTrigger>
              <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-7 px-4 pb-4">{facetsContent}</div>
              </SheetContent>
            </Sheet>
            <SegmentedControl
              aria-label="Sort products"
              options={sortOptions}
              value={sort}
              onValueChange={setSort}
            />
          </div>
        </div>

        {pageItems.length === 0 ? (
          <p className="py-16 text-center text-foreground/60">
            No pieces match these filters yet — try widening your search.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">
            {pageItems.map((p) => (
              <ProductCard key={p.id} product={p} showMeta={showRating} />
            ))}
          </div>
        )}

        {showPagination && totalPages > 1 && (
          <Pagination className="mt-9">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage((p) => Math.max(1, p - 1));
                  }}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <PaginationItem key={n}>
                  <PaginationLink
                    href="#"
                    isActive={n === page}
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(n);
                    }}
                  >
                    {n}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage((p) => Math.min(totalPages, p + 1));
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
