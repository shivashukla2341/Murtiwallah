"use client";

import { useEffect } from "react";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button, LinkButton } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center px-5 py-24 text-center">
        <span className="mb-5 font-heading text-5xl text-primary">ॐ</span>
        <p className="mb-2.5 font-devanagari text-sm text-accent-700">
          कुछ गड़बड़ हुई — Something Went Wrong
        </p>
        <h1 className="mb-4 text-[30px] sm:text-[36px]">500 — Our Workshop Hit a Snag</h1>
        <p className="mb-8 max-w-[46ch] text-[15px] text-foreground/70">
          Something broke on our end, not yours. Try again, or reach out if it keeps happening.
        </p>
        <div className="flex flex-wrap justify-center gap-3.5">
          <Button type="button" variant="primary" onClick={reset}>
            Try Again
          </Button>
          <LinkButton href="/" variant="secondary">
            Back to Homepage
          </LinkButton>
          <LinkButton href="/contact" variant="ghost">
            Contact Support
          </LinkButton>
        </div>
      </main>
      <Footer />
    </>
  );
}
