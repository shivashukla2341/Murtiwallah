"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const STOCK_LABELS: Record<string, string> = {
  "in-stock": "In Stock",
  "made-to-order": "Made to Order",
  "out-of-stock": "Out of Stock",
};

const STOCK_COLORS: Record<string, string> = {
  "in-stock": "#4ade80",
  "made-to-order": "#e1ad66",
  "out-of-stock": "#f87171",
};

const tooltipStyle = {
  background: "#2d2b2b",
  border: "1px solid #605d5d",
  borderRadius: 6,
  fontSize: 12,
};

export function DashboardCharts({
  categoryCounts,
  stockCounts,
}: {
  categoryCounts: { name: string; count: number }[];
  stockCounts: Record<string, number>;
}) {
  const stockData = Object.entries(stockCounts).map(([key, value]) => ({
    key,
    name: STOCK_LABELS[key] ?? key,
    value,
  }));

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-5">
        <div className="mb-4 text-[12px] tracking-[0.08em] text-accent-400 uppercase">
          Products by Category
        </div>
        <ResponsiveContainer width="100%" height={Math.max(220, categoryCounts.length * 34)}>
          <BarChart data={categoryCounts} layout="vertical" margin={{ left: 8, right: 16 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444141" horizontal={false} />
            <XAxis type="number" stroke="#9b9797" fontSize={12} allowDecimals={false} />
            <YAxis type="category" dataKey="name" stroke="#9b9797" fontSize={12} width={110} />
            <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "#f8f4f4" }} />
            <Bar dataKey="count" fill="#e1ad66" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-5">
        <div className="mb-4 text-[12px] tracking-[0.08em] text-accent-400 uppercase">
          Stock Status
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={stockData}
              dataKey="value"
              nameKey="name"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={2}
            >
              {stockData.map((entry) => (
                <Cell key={entry.key} fill={STOCK_COLORS[entry.key] ?? "#9b9797"} />
              ))}
            </Pie>
            <Legend
              verticalAlign="bottom"
              height={36}
              wrapperStyle={{ fontSize: 12, color: "#9b9797" }}
            />
            <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "#f8f4f4" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
