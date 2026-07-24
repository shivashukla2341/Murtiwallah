import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/lib/types";

// ─── Row mapper ─────────────────────────────────────────────────────────────
// Supabase uses snake_case columns; our app uses camelCase. This adapter keeps
// the rest of the codebase unchanged.
function toProduct(row: Record<string, unknown>): Product {
  return {
    id: row.id as string,
    slug: row.slug as string,
    name: row.name as string,
    hindiName: row.hindi_name as string | undefined,
    categorySlug: row.category_slug as string,
    material: row.material as string,
    height: row.height as string,
    weight: row.weight as string | undefined,
    moq: row.moq as string,
    rating: Number(row.rating ?? 0),
    reviewCount: Number(row.review_count ?? 0),
    price: Number(row.price),
    compareAtPrice: row.compare_at_price ? Number(row.compare_at_price) : undefined,
    badge: row.badge as string | undefined,
    occasions: (row.occasions as string[]) ?? [],
    images: (row.images as string[]) ?? [],
    specs: (row.specs as Product["specs"]) ?? [],
    priceTiers: row.price_tiers as Product["priceTiers"] | undefined,
    stock: row.stock as Product["stock"],
    stockLabel: row.stock_label as string | undefined,
    description: row.description as string | undefined,
  };
}

// ─── Queries ─────────────────────────────────────────────────────────────────

export async function getAllProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    // Seeded rows share the same created_at (one bulk insert), so an update
    // (e.g. editing a price in /admin) would otherwise shuffle row order —
    // slug is a stable tiebreaker.
    .order("created_at", { ascending: false })
    .order("slug", { ascending: true });

  if (error) {
    console.error("[getAllProducts]", error.message);
    return [];
  }
  return (data ?? []).map(toProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("[getProductBySlug]", error.message);
    return undefined;
  }
  return data ? toProduct(data) : undefined;
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category_slug", categorySlug)
    .order("created_at", { ascending: false })
    .order("slug", { ascending: true });

  if (error) {
    console.error("[getProductsByCategory]", error.message);
    return [];
  }
  return (data ?? []).map(toProduct);
}

export async function getBestSellers(limit = 4): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("badge", "Bestseller")
    .order("review_count", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[getBestSellers]", error.message);
    return [];
  }
  return (data ?? []).map(toProduct);
}

export async function getRelatedProducts(
  product: Product,
  limit = 4
): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category_slug", product.categorySlug)
    .neq("id", product.id)
    .limit(limit);

  if (error) {
    console.error("[getRelatedProducts]", error.message);
    return [];
  }
  return (data ?? []).map(toProduct);
}

export async function searchProducts(query: string): Promise<Product[]> {
  const q = query.trim();
  if (!q) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .or(
      `name.ilike.%${q}%,category_slug.ilike.%${q}%,material.ilike.%${q}%`
    );

  if (error) {
    console.error("[searchProducts]", error.message);
    return [];
  }
  return (data ?? []).map(toProduct);
}

export async function getMaterialFacets(): Promise<string[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("material");

  if (error) {
    console.error("[getMaterialFacets]", error.message);
    return [];
  }
  const unique = Array.from(new Set((data ?? []).map((r) => r.material as string)));
  return unique.sort();
}
