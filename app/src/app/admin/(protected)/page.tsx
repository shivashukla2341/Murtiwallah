import type { Metadata } from "next";

import { getAllProducts } from "@/lib/services/products";
import { getCategories } from "@/lib/services/categories";
import { formatINR } from "@/lib/utils";
import { DashboardCharts } from "@/components/admin/dashboard-charts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const [products, categories] = await Promise.all([getAllProducts(), getCategories()]);

  const prices = products.map((p) => p.price);
  const avgPrice = prices.length
    ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)
    : 0;
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;

  const stockCounts = products.reduce<Record<string, number>>((acc, p) => {
    acc[p.stock] = (acc[p.stock] ?? 0) + 1;
    return acc;
  }, {});

  const categoryCounts = categories
    .map((c) => ({
      name: c.name,
      count: products.filter((p) => p.categorySlug === c.slug).length,
    }))
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-[26px] text-neutral-100">Dashboard</h1>
        <p className="text-[13.5px] text-neutral-400">
          Live counts from your Supabase catalog — no fabricated numbers.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Products" value={String(products.length)} />
        <StatCard label="Total Categories" value={String(categories.length)} />
        <StatCard label="Average Price" value={formatINR(avgPrice)} />
        <StatCard label="Price Range" value={`${formatINR(minPrice)} – ${formatINR(maxPrice)}`} />
      </div>

      <DashboardCharts categoryCounts={categoryCounts} stockCounts={stockCounts} />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-5">
      <div className="text-[11.5px] tracking-[0.08em] text-neutral-500 uppercase">{label}</div>
      <div className="mt-1.5 font-heading text-[22px] font-semibold text-neutral-100">{value}</div>
    </div>
  );
}
