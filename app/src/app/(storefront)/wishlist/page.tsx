"use client";

import { X } from "lucide-react";
import { toast } from "sonner";

import { formatINR } from "@/lib/utils";
import { useHasMounted } from "@/lib/use-has-mounted";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { Button, LinkButton } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

export default function WishlistPage() {
  const mounted = useHasMounted();
  const items = useWishlistStore((s) => s.items);
  const removeItem = useWishlistStore((s) => s.removeItem);
  const addToCart = useCartStore((s) => s.addItem);

  if (!mounted) return null;

  return (
    <div className="mx-auto max-w-[1320px] px-5 py-11 sm:px-8">
      <p className="mb-2.5 font-devanagari text-sm text-accent-700">पसंदीदा — Saved For Later</p>
      <h1 className="mb-2 text-[32px] sm:text-[38px]">Your Wishlist</h1>
      <p className="mb-9 text-[15.5px] text-foreground/70">
        {items.length} {items.length === 1 ? "piece" : "pieces"} saved
      </p>

      {items.length === 0 ? (
        <div className="py-16 text-center">
          <p className="mb-5 text-foreground/65">Nothing saved yet.</p>
          <LinkButton href="/products" variant="primary">
            Explore Collection
          </LinkButton>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.productId} className="flex flex-col gap-2.5">
              <div className="relative aspect-4/5 overflow-hidden rounded-lg border border-border">
                <ImagePlaceholder label={item.name} />
                <button
                  type="button"
                  aria-label={`Remove ${item.name} from wishlist`}
                  onClick={() => removeItem(item.productId)}
                  className="absolute top-2.5 right-2.5 flex size-7 items-center justify-center rounded-full bg-background text-foreground shadow-sm transition-colors hover:text-destructive"
                >
                  <X className="size-3.5" />
                </button>
              </div>
              <div className="font-heading text-base font-semibold">{item.name}</div>
              <div className="text-[12.5px] text-foreground/65">
                {item.material} · {item.height}
              </div>
              <div className="font-heading text-lg font-semibold">{formatINR(item.price)}</div>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => {
                  addToCart({
                    productId: item.productId,
                    name: item.name,
                    material: item.material,
                    height: item.height,
                    price: item.price,
                  });
                  removeItem(item.productId);
                  toast.success(`${item.name} moved to cart`);
                }}
              >
                Move to Cart
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
