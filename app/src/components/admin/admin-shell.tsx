"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderTree, LayoutDashboard, Menu, Package } from "lucide-react";

import { cn } from "@/lib/utils";
import { LogoutButton } from "@/components/admin/logout-button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
];

function NavLinks({
  isActive,
  onNavigate,
}: {
  isActive: (href: string) => boolean;
  onNavigate?: React.ReactNode;
}) {
  return (
    <>
      {NAV.map(({ href, label, icon: Icon }) => {
        const link = (
          <Link
            href={href}
            className={cn(
              "flex items-center gap-2.5 rounded-md px-3 py-2.5 text-[14px] no-underline transition-colors hover:bg-neutral-800 hover:text-neutral-100",
              isActive(href) ? "bg-neutral-800 text-accent-400" : "text-neutral-300"
            )}
          >
            <Icon className="size-4" strokeWidth={1.8} />
            {label}
          </Link>
        );
        return onNavigate ? (
          <SheetClose key={href} render={link}>
            <Icon className="size-4" strokeWidth={1.8} />
            {label}
          </SheetClose>
        ) : (
          <div key={href}>{link}</div>
        );
      })}
    </>
  );
}

export function AdminShell({
  userEmail,
  children,
}: {
  userEmail: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Desktop sidebar — hidden below lg, where a fixed 226px rail would
          crush the content area on a phone-width screen. */}
      <aside className="fixed inset-y-0 left-0 hidden w-[226px] flex-col border-r border-neutral-800 bg-neutral-900 text-neutral-300 lg:flex">
        <div className="flex items-baseline gap-2 border-b border-neutral-800 px-5 py-4.5">
          <span className="font-heading text-[20px] text-accent-400">ॐ</span>
          <span className="font-heading text-[15.5px] font-semibold text-neutral-100">
            Murtiwallah Admin
          </span>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 p-3">
          <NavLinks isActive={isActive} />
        </nav>
        <div className="border-t border-neutral-800 p-3">
          <Link
            href="/"
            className="block rounded-md px-3 py-2.5 text-[13.5px] text-neutral-400 no-underline hover:bg-neutral-800 hover:text-neutral-100"
          >
            ← Exit to storefront
          </Link>
        </div>
      </aside>

      <div className="lg:ml-[226px]">
        <header className="flex h-14.5 items-center justify-between border-b border-neutral-800 bg-neutral-900 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger
                render={
                  <button
                    type="button"
                    aria-label="Open admin menu"
                    className="flex size-9 items-center justify-center rounded-md text-neutral-300 hover:bg-neutral-800 lg:hidden"
                  />
                }
              >
                <Menu className="size-[19px]" strokeWidth={1.8} />
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col gap-0 bg-neutral-900 text-neutral-300">
                <SheetHeader className="border-b border-neutral-800">
                  <SheetTitle className="flex items-baseline gap-2 text-neutral-100">
                    <span className="font-heading text-accent-400">ॐ</span>
                    Murtiwallah Admin
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-1 flex-col gap-0.5 p-3">
                  <NavLinks isActive={isActive} onNavigate />
                </nav>
                <div className="border-t border-neutral-800 p-3">
                  <SheetClose
                    render={
                      <Link
                        href="/"
                        className="block rounded-md px-3 py-2.5 text-[13.5px] text-neutral-400 no-underline hover:bg-neutral-800 hover:text-neutral-100"
                      />
                    }
                  >
                    ← Exit to storefront
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
            <span className="truncate text-[13.5px] text-neutral-400">{userEmail}</span>
          </div>
          <LogoutButton />
        </header>
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
