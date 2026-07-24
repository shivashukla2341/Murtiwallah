"use client";

import { useState, useTransition } from "react";

import type { Category } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { updateCategory } from "@/app/admin/(protected)/categories/actions";

export function CategoriesTable({ categories }: { categories: Category[] }) {
  const [editing, setEditing] = useState<Category | null>(null);

  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-900">
      <table className="w-full text-left text-[13.5px] text-neutral-300">
        <thead className="border-b border-neutral-800 text-[11.5px] tracking-[0.06em] text-neutral-500 uppercase">
          <tr>
            <th className="px-4 py-3 font-normal">Name</th>
            <th className="px-4 py-3 font-normal">Hindi</th>
            <th className="px-4 py-3 font-normal">Slug</th>
            <th className="px-4 py-3 font-normal">Product Count</th>
            <th className="px-4 py-3 font-normal"></th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c.id} className="border-b border-neutral-800 last:border-0">
              <td className="px-4 py-3 text-neutral-100">{c.name}</td>
              <td className="px-4 py-3 font-devanagari">{c.hindi}</td>
              <td className="px-4 py-3 text-neutral-500">{c.slug}</td>
              <td className="px-4 py-3">{c.productCount ?? "—"}</td>
              <td className="px-4 py-3 text-right">
                <Button variant="ghost" size="sm" onClick={() => setEditing(c)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent>
          {editing && <EditCategoryForm category={editing} onDone={() => setEditing(null)} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function EditCategoryForm({
  category,
  onDone,
}: {
  category: Category;
  onDone: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        await updateCategory(formData);
        onDone();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    });
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <DialogHeader>
        <DialogTitle>{category.name}</DialogTitle>
      </DialogHeader>

      <input type="hidden" name="id" value={category.id} />

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" defaultValue={category.name} required />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="hindi">Hindi name</Label>
          <Input id="hindi" name="hindi" defaultValue={category.hindi} required />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="productCount">Product count shown on site</Label>
        <Input
          id="productCount"
          name="productCount"
          type="number"
          min={0}
          defaultValue={category.productCount ?? ""}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" defaultValue={category.description ?? ""} rows={3} />
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
