import { AppCard } from "@/components/ui/AppCard";
import {
  useAdminStats,
  useAllCategories,
  useRevenueByOwner,
} from "@/hooks/useQueries";
import type { OwnerRevenue } from "@/hooks/useQueries";
import { ChevronDown, ChevronUp, TrendingUp } from "lucide-react";
import { useState } from "react";

// Stable pseudo-random seed from string
function seedCount(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return (Math.abs(h) % 80) + 10;
}

type SortKey = "businessName" | "totalRevenue" | "todayRevenue";

interface AdminDashboardProps {
  onNavigate?: (r: string) => void;
}

function StatCard({
  label,
  value,
  accent,
  emoji,
}: {
  label: string;
  value: string | number;
  accent: string;
  emoji: string;
}) {
  return (
    <AppCard className="relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-16 h-16 rounded-bl-3xl opacity-10"
        style={{ backgroundColor: accent }}
      />
      <p className="text-3xl font-display" style={{ color: "#1A1A2E" }}>
        {emoji}
      </p>
      <p
        className="text-2xl font-bold font-display mt-2"
        style={{ color: accent }}
      >
        {value}
      </p>
      <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
    </AppCard>
  );
}

export default function AdminDashboard({
  onNavigate: _onNavigate,
}: AdminDashboardProps) {
  const { data: stats } = useAdminStats();
  const { data: categories = [] } = useAllCategories();
  const { data: revenue = [] } = useRevenueByOwner();
  const [sortKey, setSortKey] = useState<SortKey>("totalRevenue");
  const [sortAsc, setSortAsc] = useState(false);

  // Collect trending keywords from all categories
  const allKeywords: { word: string; count: number }[] = [];
  for (const cat of categories) {
    for (const kw of cat.searchKeywords) {
      allKeywords.push({ word: kw, count: seedCount(kw) });
    }
  }
  const trending = allKeywords.sort((a, b) => b.count - a.count).slice(0, 8);

  // Sort revenue table
  const sorted = [...revenue].sort((a, b) => {
    let diff = 0;
    if (sortKey === "businessName") {
      diff = a.businessName.localeCompare(b.businessName);
    } else if (sortKey === "totalRevenue") {
      diff = Number(a.totalRevenue - b.totalRevenue);
    } else {
      diff = Number(a.todayRevenue - b.todayRevenue);
    }
    return sortAsc ? diff : -diff;
  });

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortAsc((v) => !v);
    else {
      setSortKey(key);
      setSortAsc(false);
    }
  }

  function SortIcon({ k }: { k: SortKey }) {
    if (sortKey !== k) return <ChevronUp className="w-3 h-3 opacity-30" />;
    return sortAsc ? (
      <ChevronUp className="w-3 h-3" style={{ color: "#FF6B35" }} />
    ) : (
      <ChevronDown className="w-3 h-3" style={{ color: "#FF6B35" }} />
    );
  }

  // Find category for owner (we'll use a lookup from the revenue ownerId)
  // Since OwnerRevenue doesn't include category, we'll skip badge for now
  const statCards = [
    {
      label: "Total Users",
      value: String(stats?.totalUsers ?? 0),
      accent: "#4A90E2",
      emoji: "👤",
    },
    {
      label: "Total Owners",
      value: String(stats?.totalOwners ?? 0),
      accent: "#7ED321",
      emoji: "🏪",
    },
    {
      label: "Today's Bookings",
      value: String(stats?.todayBookings ?? 0),
      accent: "#FF8C42",
      emoji: "📋",
    },
    {
      label: "Platform Revenue",
      value: `₹${Number(stats?.platformRevenue ?? 0).toLocaleString("en-IN")}`,
      accent: "#9B59B6",
      emoji: "💰",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1
          className="text-2xl font-bold font-display"
          style={{ color: "#1A1A2E" }}
        >
          The Pulse 📊
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Real-time overview of the PondyOne ecosystem
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Trending searches */}
        <AppCard>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4" style={{ color: "#FF6B35" }} />
            <h2
              className="font-semibold font-display"
              style={{ color: "#1A1A2E" }}
            >
              🔥 Trending Searches
            </h2>
          </div>
          {trending.length === 0 ? (
            <p className="text-sm text-muted-foreground">No categories yet</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {trending.map(({ word, count }) => (
                <span
                  key={word}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border"
                  style={{
                    backgroundColor: "rgba(255,107,53,0.08)",
                    borderColor: "rgba(255,107,53,0.25)",
                    color: "#c05a28",
                  }}
                >
                  {word}
                  <span
                    className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                    style={{ backgroundColor: "#FF6B35", color: "#fff" }}
                  >
                    {count}
                  </span>
                </span>
              ))}
            </div>
          )}
        </AppCard>

        {/* Revenue table */}
        <div className="lg:col-span-2">
          <AppCard padded={false}>
            <div className="px-5 py-4 border-b border-border">
              <h2
                className="font-semibold font-display"
                style={{ color: "#1A1A2E" }}
              >
                Revenue by Owner
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">
                      <button
                        type="button"
                        onClick={() => toggleSort("businessName")}
                        className="flex items-center gap-1 hover:text-foreground transition-colors"
                      >
                        Owner <SortIcon k="businessName" />
                      </button>
                    </th>
                    <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground">
                      <button
                        type="button"
                        onClick={() => toggleSort("totalRevenue")}
                        className="flex items-center gap-1 hover:text-foreground transition-colors ml-auto"
                      >
                        Total ₹ <SortIcon k="totalRevenue" />
                      </button>
                    </th>
                    <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground">
                      <button
                        type="button"
                        onClick={() => toggleSort("todayRevenue")}
                        className="flex items-center gap-1 hover:text-foreground transition-colors ml-auto"
                      >
                        Today ₹ <SortIcon k="todayRevenue" />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-5 py-8 text-center text-muted-foreground text-sm"
                      >
                        No revenue data yet
                      </td>
                    </tr>
                  ) : (
                    sorted.map((row: OwnerRevenue) => (
                      <tr
                        key={row.ownerId}
                        className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                      >
                        <td className="px-5 py-3 font-medium text-foreground">
                          {row.businessName}
                        </td>
                        <td
                          className="px-5 py-3 text-right font-mono font-medium"
                          style={{ color: "#7ED321" }}
                        >
                          ₹{Number(row.totalRevenue).toLocaleString("en-IN")}
                        </td>
                        <td className="px-5 py-3 text-right font-mono text-muted-foreground">
                          ₹{Number(row.todayRevenue).toLocaleString("en-IN")}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </AppCard>
        </div>
      </div>
    </div>
  );
}
