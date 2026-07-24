import Link from "next/link";

import type { Product } from "@/lib/types";
import { formatINR } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { SiteImage } from "@/components/ui/site-image";

function ProductCard({
  product,
  showMeta = true,
}: {
  product: Product;
  showMeta?: boolean;
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border text-foreground no-underline transition-[box-shadow,transform] duration-250 hover:-translate-y-1 hover:shadow-lg"
    >
        <div className="relative aspect-4/5 overflow-hidden">
        <SiteImage
          src={`/products/${product.slug}.jpg`}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <Badge variant="accent" className="absolute top-2.5 left-2.5">
            {product.badge}
          </Badge>
        )}
      </div>
      <div className="flex flex-col gap-1.5 p-3.5">
        <div className="font-heading text-base font-semibold">{product.name}</div>
        <div className="flex flex-wrap gap-x-2 gap-y-1 text-[12.5px] text-foreground/70">
          <span>{product.material}</span>
          <span>·</span>
          <span>{product.height}</span>
        </div>
        {showMeta && (
          <div className="flex flex-wrap gap-x-2 gap-y-1 text-[12.5px] text-foreground/70">
            <span>MOQ {product.moq}</span>
            <span>·</span>
            <span>{product.stockLabel ?? (product.stock === "in-stock" ? "In stock" : "Made to order")}</span>
            <span>·</span>
            <span>★ {product.rating}</span>
          </div>
        )}
        <div className="mt-0.5 flex items-baseline gap-2 font-heading text-lg font-semibold">
          {formatINR(product.price)}
          <span className="font-sans text-[13px] font-normal text-foreground/65">/ piece</span>
          {product.compareAtPrice && (
            <span className="font-sans text-[12px] font-normal text-foreground/50 line-through">
              {formatINR(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export { ProductCard };
