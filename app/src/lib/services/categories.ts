import { createClient } from "@/lib/supabase/server";
import type { Category } from "@/lib/types";

// ─── Row mapper ───────────────────────────────────────────────────────────────
function toCategory(row: Record<string, unknown>): Category {
  return {
    id: row.id as string,
    slug: row.slug as string,
    name: row.name as string,
    hindi: row.hindi as string,
    description: row.description as string | undefined,
    productCount: row.product_count ? Number(row.product_count) : undefined,
  };
}

// ─── Queries ──────────────────────────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("[getCategories]", error.message);
    return [];
  }
  return (data ?? []).map(toCategory);
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("[getCategoryBySlug]", error.message);
    return undefined;
  }
  return data ? toCategory(data) : undefined;
}
