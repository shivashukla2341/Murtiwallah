"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

async function assertAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
}

export async function updateCategory(formData: FormData) {
  await assertAdmin();

  const id = formData.get("id") as string;
  const name = (formData.get("name") as string)?.trim();
  const hindi = (formData.get("hindi") as string)?.trim();
  const descriptionRaw = (formData.get("description") as string)?.trim();
  const description = descriptionRaw || null;
  const productCountRaw = formData.get("productCount") as string;
  const productCount = productCountRaw ? Number(productCountRaw) : null;

  if (!id || !name || !hindi) {
    throw new Error("Name and Hindi name are required");
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from("categories")
    .update({ name, hindi, description, product_count: productCount })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/categories");
}
