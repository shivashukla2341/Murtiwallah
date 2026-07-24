"use client";

import { useState, useTransition } from "react";

import type { Product } from "@/lib/types";
import { formatINR } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { updateProduct } from "@/app/admin/(protected)/products/actions";

const STOCK_OPTIONS: { value: Product["stock"]; label: string }[] = [
  { value: "in-stock", label: "In Stock" },
  { value: "made-to-order", label: "Made to Order" },
  { value: "out-of-stock", label: "Out of Stock" },
];

export function ProductsTable({ products }: { products: Product[] }) {
  const [editing, setEditing] = useState<Product | null>(null);

  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-900">
      <table className="w-full text-left text-[13.5px] text-neutral-300">
        <thead className="border-b border-neutral-800 text-[11.5px] tracking-[0.06em] text-neutral-500 uppercase">
          <tr>
            <th className="px-4 py-3 font-normal">Product</th>
            <th className="px-4 py-3 font-normal">Category</th>
            <th className="px-4 py-3 font-normal">Price</th>
            <th className="px-4 py-3 font-normal">Stock</th>
            <th className="px-4 py-3 font-normal">Badge</th>
            <th className="px-4 py-3 font-normal"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b border-neutral-800 last:border-0">
              <td className="px-4 py-3 text-neutral-100">{p.name}</td>
              <td className="px-4 py-3 capitalize">{p.categorySlug}</td>
              <td className="px-4 py-3">
                {formatINR(p.price)}
                {p.compareAtPrice && (
                  <span className="ml-1.5 text-neutral-500 line-through">
                    {formatINR(p.compareAtPrice)}
                  </span>
                )}
              </td>
              <td className="px-4 py-3">
                {STOCK_OPTIONS.find((s) => s.value === p.stock)?.label ?? p.stock}
              </td>
              <td className="px-4 py-3">
                {p.badge && <Badge variant="accent">{p.badge}</Badge>}
              </td>
              <td className="px-4 py-3 text-right">
                <Button variant="ghost" size="sm" onClick={() => setEditing(p)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent>
          {editing && <EditProductForm product={editing} onDone={() => setEditing(null)} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function EditProductForm({ product, onDone }: { product: Product; onDone: () => void }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        await updateProduct(formData);
        onDone();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    });
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <DialogHeader>
        <DialogTitle>{product.name}</DialogTitle>
      </DialogHeader>

      <input type="hidden" name="id" value={product.id} />

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="price">Price (₹)</Label>
          <Input id="price" name="price" type="number" min={0} step="1" defaultValue={product.price} required />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="compareAtPrice">Compare-at price (₹)</Label>
          <Input
            id="compareAtPrice"
            name="compareAtPrice"
            type="number"
            min={0}
            step="1"
            defaultValue={product.compareAtPrice ?? ""}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="stock">Stock status</Label>
        <select
          id="stock"
          name="stock"
          defaultValue={product.stock}
          className="h-9 w-full rounded-md border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-primary"
        >
          {STOCK_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="badge">Badge (optional)</Label>
        <Input id="badge" name="badge" defaultValue={product.badge ?? ""} placeholder="e.g. Bestseller" />
      </div>

      {error && <p className="text-[13px] text-destructive">{error}</p>}

      <DialogFooter>
        <Button type="submit" variant="primary" disabled={isPending}>
          {isPending ? "Saving…" : "Save Changes"}
        </Button>
      </DialogFooter>
    </form>
  );
}
