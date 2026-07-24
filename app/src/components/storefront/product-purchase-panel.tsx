"use client";

import { useState } from "react";
import { toast } from "sonner";

import type { Product } from "@/lib/types";
import { formatINR } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { Badge } from "@/components/ui/badge";
import { Button, LinkButton } from "@/components/ui/button";
import { QtyStepper } from "@/components/ui/qty-stepper";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const minQty = Number(product.moq.match(/\d+/)?.[0] ?? 1);
  const [qty, setQty] = useState(minQty || 1);
  const addItem = useCartStore((s) => s.addItem);

  const discountPct = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : null;

  return (
    <div>
      {product.badge && (
        <Badge variant="accent" className="mb-3">
          {product.badge}
        </Badge>
      )}
      <h1 className="mb-1.5 text-[32px]">{product.name}</h1>
      {product.hindiName && (
        <p className="mb-4 font-devanagari text-sm text-accent-700">{product.hindiName}</p>
      )}
      <div className="mb-5 flex items-center gap-2.5">
        <span className="text-primary">{"★".repeat(Math.round(product.rating))}</span>
        <span className="text-[13.5px] text-foreground/65">
          {product.rating.toFixed(1)}
          {product.reviewCount ? ` (${product.reviewCount} wholesale reviews)` : ""}
        </span>
      </div>
      <div className="mb-1.5 flex items-baseline gap-3">
        <span className="font-heading text-[34px] font-semibold">{formatINR(product.price)}</span>
        {product.compareAtPrice && (
          <span className="text-[15px] text-foreground/55 line-through">
            {formatINR(product.compareAtPrice)}
          </span>
        )}
        {discountPct && <Badge variant="outline">{discountPct}% off</Badge>}
      </div>
      <p className="mb-6 text-[13px] text-foreground/60">
        Price per piece · GST billed separately · MOQ {product.moq}
      </p>

      {product.priceTiers && (
        <div className="mb-6 rounded-md border border-border p-4">
          <div className="mb-2 text-[10px] tracking-[0.1em] text-accent-700 uppercase">
            Wholesale price tiers
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="border-b border-border py-2 text-left text-[11px] tracking-[0.08em] text-foreground/60 uppercase">
                  Quantity
                </th>
                <th className="border-b border-border py-2 text-left text-[11px] tracking-[0.08em] text-foreground/60 uppercase">
                  Price / piece
                </th>
              </tr>
            </thead>
            <tbody>
              {product.priceTiers.map((tier) => (
                <tr key={tier.label}>
                  <td className="border-b border-border py-2">{tier.label}</td>
                  <td className="border-b border-border py-2">{formatINR(tier.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mb-5 flex flex-wrap items-center gap-3.5">
        <QtyStepper value={qty} onChange={setQty} min={1} />
        {product.stockLabel && (
          <span className="text-[13px] text-foreground/60">{product.stockLabel}</span>
        )}
      </div>

      <div className="mb-8 flex flex-col gap-3.5 sm:flex-row">
        <Button
          type="button"
          variant="primary"
          className="flex-1 py-3"
          onClick={() => {
            addItem(
              {
                productId: product.id,
                name: product.name,
                material: product.material,
                height: product.height,
                price: product.price,
              },
              qty
            );
            toast.success(`${product.name} added to cart`);
          }}
        >
          Add to Cart
        </Button>
        <LinkButton href="/wholesale" variant="secondary" className="flex-1 py-3">
          Request Bulk Quote
        </LinkButton>
      </div>

      <div className="mb-2 text-xs tracking-[0.08em] uppercase">Specifications</div>
      <div>
        {product.specs.map((s) => (
          <div
            key={s.k}
            className="flex justify-between border-b border-border py-2.5 text-sm"
          >
            <span className="text-foreground/60">{s.k}</span>
            <span>{s.v}</span>
          </div>
        ))}
      </div>

      {product.description && (
        <p className="mt-5.5 text-[14.5px] leading-relaxed text-foreground/78">
          {product.description}
        </p>
      )}
    </div>
  );
}
