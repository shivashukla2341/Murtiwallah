"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email" className="text-neutral-300">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="username"
          className="border-neutral-700 bg-neutral-900 text-neutral-100"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password" className="text-neutral-300">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="border-neutral-700 bg-neutral-900 text-neutral-100"
        />
      </div>
      {error && <p className="text-[13px] text-red-400">{error}</p>}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={loading}
        className="mt-2 border-accent-400 text-accent-400 hover:bg-neutral-700"
      >
        {loading ? "Signing in…" : "Sign In"}
      </Button>
    </form>
  );
}
