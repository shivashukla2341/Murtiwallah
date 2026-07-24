import type { Metadata } from "next";

import { getAllProducts } from "@/lib/services/products";
import { ProductsTable } from "@/components/admin/products-table";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Products",
  robots: { index: false, follow: false },
};

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-[26px] text-neutral-100">Products</h1>
        <p className="text-[13.5px] text-neutral-400">{products.length} SKUs in the catalog.</p>
      </div>

      <ProductsTable products={products} />
    </div>
  );
}
