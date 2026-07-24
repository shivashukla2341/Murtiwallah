import type { Metadata } from "next";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LinkButton } from "@/components/ui/button";

export const metadata: Metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center px-5 py-24 text-center">
        <span className="mb-5 font-heading text-5xl text-primary">ॐ</span>
        <p className="mb-2.5 font-devanagari text-sm text-accent-700">
          मार्ग खो गया — Lost the Path
        </p>
        <h1 className="mb-4 text-[30px] sm:text-[36px]">404 — This Page Has Wandered Off</h1>
        <p className="mb-8 max-w-[46ch] text-[15px] text-foreground/70">
          The page you&rsquo;re looking for may have moved, been renamed, or never existed. Let&rsquo;s get
          you back on track.
        </p>
        <div className="flex flex-wrap justify-center gap-3.5">
          <LinkButton href="/" variant="primary">
            Back to Homepage
          </LinkButton>
          <LinkButton href="/products" variant="secondary">
            Browse the Catalogue
          </LinkButton>
        </div>
      </main>
      <Footer />
    </>
  );
}
