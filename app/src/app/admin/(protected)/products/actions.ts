"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

// Defense in depth: Server Actions are their own POST endpoints and are NOT
// automatically protected just because the calling page is gated — re-check
// auth here even though src/app/admin/(protected)/layout.tsx already does.
async function assertAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
}

export async function updateProduct(formData: FormData) {
  await assertAdmin();

  const id = formData.get("id") as string;
  const price = Number(formData.get("price"));
  const compareAtPriceRaw = formData.get("compareAtPrice") as string;
  const compareAtPrice = compareAtPriceRaw ? Number(compareAtPriceRaw) : null;
  const stock = formData.get("stock") as string;
  const badgeRaw = (formData.get("badge") as string)?.trim();
  const badge = badgeRaw || null;

  if (!id || !Number.isFinite(price) || price < 0) {
    throw new Error("Invalid product data");
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from("products")
    .update({
      price,
      compare_at_price: compareAtPrice,
      stock,
      badge,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/products");
}
