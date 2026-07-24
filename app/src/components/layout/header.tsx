"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, Search, ShoppingCart } from "lucide-react";

import { cn } from "@/lib/utils";
import { useHasMounted } from "@/lib/use-has-mounted";
import { useCartCount } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LinkButton } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/categories", label: "Categories" },
  { href: "/products", label: "Shop All" },
  { href: "/wholesale", label: "Wholesale" },
  { href: "/about", label: "Craftsmanship" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

function IconLink({
  href,
  label,
  children,
  badge,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  badge?: number;
}) {
  return (
    <Link
      href={href}
      aria-label={badge ? `${label}, ${badge} items` : label}
      title={label}
      className="relative inline-flex h-9.5 w-9.5 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent-100 hover:text-accent-700"
    >
      {children}
      {!!badge && (
        <span
          aria-hidden
          className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-[9px] font-semibold text-white"
        >
          {badge}
        </span>
      )}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const mounted = useHasMounted();
  const cartCount = useCartCount();
  const wishlistCount = useWishlistStore((s) => s.items.length);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header>
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-100 focus-visible:rounded-md focus-visible:bg-primary focus-visible:px-4 focus-visible:py-2.5 focus-visible:text-sm focus-visible:text-white"
      >
        Skip to main content
      </a>
      <div className="bg-neutral-900 text-neutral-300">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-5 py-1.5 text-xs sm:px-8">
          <span className="truncate">Pan-India Delivery &nbsp;·&nbsp; Export Worldwide &nbsp;·&nbsp; GST Billing</span>
          <span className="hidden shrink-0 gap-4.5 sm:flex">
            <Link href="/orders/track" className="hover:text-accent-300">
              Track Order
            </Link>
            <Link href="/wholesale" className="hover:text-accent-300">
              Dealer Login
            </Link>
          </span>
        </div>
      </div>
      <div className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-[1320px] items-center gap-7 px-5 py-3.5 sm:px-8">
          <Link href="/" className="flex flex-none items-baseline gap-2 text-foreground no-underline">
            <span className="font-heading text-[26px] text-primary">ॐ</span>
            <span className="font-heading text-[25px] font-semibold tracking-tight">Murtiwallah</span>
          </Link>

          <nav className="hidden flex-1 items-center gap-6.5 min-[860px]:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "text-[14.5px] whitespace-nowrap text-foreground no-underline transition-colors hover:text-accent-700",
                  isActive(link.href) && "text-accent-700"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex flex-none items-center gap-1 min-[860px]:ml-0">
            <Link
              href="/search"
              aria-label="Search"
              title="Search"
              className="inline-flex h-9.5 w-9.5 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent-100 hover:text-accent-700"
            >
              <Search className="size-[19px]" strokeWidth={1.8} />
            </Link>
            <IconLink href="/wishlist" label="Wishlist" badge={mounted ? wishlistCount : undefined}>
              <Heart className="size-[19px]" strokeWidth={1.8} />
            </IconLink>
            <IconLink href="/cart" label="Cart" badge={mounted ? cartCount : undefined}>
              <ShoppingCart className="size-[19px]" strokeWidth={1.8} />
            </IconLink>
            <LinkButton
              href="/wholesale"
              variant="primary"
              className="ml-2 hidden whitespace-nowrap min-[860px]:inline-flex"
            >
              Get Wholesale Quote
            </LinkButton>

            <Sheet>
              <SheetTrigger
                render={
                  <button
                    type="button"
                    aria-label="Open menu"
                    className="inline-flex h-9.5 w-9.5 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent-100 hover:text-accent-700 min-[860px]:hidden"
                  />
                }
              >
                <Menu className="size-[21px]" strokeWidth={1.8} />
              </SheetTrigger>
              <SheetContent side="right" className="w-[85%] gap-0 border-l border-border bg-background">
                <SheetHeader className="border-b border-border">
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col px-4 py-2">
                  {NAV_LINKS.map((link) => (
                    <SheetClose
                      key={link.href}
                      render={
                        <Link
                          href={link.href}
                          className={cn(
                            "block min-h-11 border-b border-border py-3.5 text-base text-foreground no-underline",
                            isActive(link.href) && "text-accent-700"
                          )}
                        />
                      }
                    >
                      {link.label}
                    </SheetClose>
                  ))}
                  <LinkButton href="/wholesale" variant="primary" size="block" className="mt-3.5">
                    Get Wholesale Quote
                  </LinkButton>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
