import type { Metadata } from "next";

import { getCategories } from "@/lib/services/categories";
import { CategoriesTable } from "@/components/admin/categories-table";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Categories",
  robots: { index: false, follow: false },
};

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-[26px] text-neutral-100">Categories</h1>
        <p className="text-[13.5px] text-neutral-400">{categories.length} categories.</p>
      </div>

      <CategoriesTable categories={categories} />
    </div>
  );
}
