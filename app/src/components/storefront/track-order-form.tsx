"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function TrackOrderForm() {
  const router = useRouter();
  const [orderId, setOrderId] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const id = orderId.trim();
    if (!id) return;
    router.push(`/orders/track/${encodeURIComponent(id)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="orderId">Order ID</Label>
        <Input
          id="orderId"
          name="orderId"
          placeholder="e.g. MW-20260723-4471"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          required
        />
      </div>
      <Button type="submit" variant="primary" size="lg">
        Track Order
      </Button>
    </form>
  );
}
