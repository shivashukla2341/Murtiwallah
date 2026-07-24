"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterForm() {
  return (
    <form
      className="flex gap-2"
      aria-label="Subscribe to newsletter"
      onSubmit={(e) => {
        e.preventDefault();
        toast.success("You're on the list — welcome to the journal.");
        e.currentTarget.reset();
      }}
    >
      <Input type="email" required placeholder="you@example.com" aria-label="Email address" />
      <Button type="submit" variant="primary" className="flex-none">
        Join
      </Button>
    </form>
  );
}
