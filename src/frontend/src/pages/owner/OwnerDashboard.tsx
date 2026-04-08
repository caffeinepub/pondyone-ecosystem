import { StatusBadge } from "@/components/ui/AppBadge";
import { AppCard } from "@/components/ui/AppCard";
import {
  type Booking,
  BookingStatus,
  Category,
  useBookingsByOwner,
  useGetOwnerById,
} from "@/hooks/useQueries";
import { getSession } from "@/lib/auth";
import { CATEGORY_COLORS, SAFFRON } from "@/lib/constants";
import { useMemo, useState } from "react";

// ─── Time Period Helpers ──────────────────────────────────────────────────────

type Period = "today" | "week" | "month";

function getPeriodStart(period: Period): number {
  const now = new Date();
  if (period === "today") {
    return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  }
  if (period === "week") {
    const day = now.getDay(); // 0=Sun, 1=Mon...
    const diff = day === 0 ? -6 : 1 - day; // roll back to Monday
    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + diff,
    ).getTime();
  }
  // month
  return new Date(now.getFullYear(), now.getMonth(), 1).getTime();
}

function filterByPeriod(bookings: Booking[], period: Period): Booking[] {
  const start = getPeriodStart(period);
  return bookings.filter((b) => Number(b.createdAt / 1_000_000n) >= start);
}

function isCompleted(b: Booking) {
  return (
    b.status === BookingStatus.accepted || b.status === BookingStatus.completed
  );
}

// ─── Chart Helpers ────────────────────────────────────────────────────────────

interface ChartBar {
  label: string;
  value: number;
}

function buildChartBars(bookings: Booking[], period: Period): ChartBar[] {
  const completed = bookings.filter(isCompleted);

  if (period === "today") {
    // 6-hour buckets: 00-06, 06-12, 12-18, 18-24
    const buckets = ["12AM–6AM", "6AM–12PM", "12PM–6PM", "6PM–12AM"];
    const values = [0, 0, 0, 0];
    for (const b of completed) {
      const h = new Date(Number(b.createdAt / 1_000_000n)).getHours();
      values[Math.floor(h / 6)] += Number(b.amountInr);
    }
    return buckets.map((label, i) => ({ label, value: values[i] }));
  }

  if (period === "week") {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const values = [0, 0, 0, 0, 0, 0, 0];
    const weekStart = getPeriodStart("week");
    for (const b of completed) {
      const ms = Number(b.createdAt / 1_000_000n);
      const dayIdx = Math.floor((ms - weekStart) / 86400000);
      if (dayIdx >= 0 && dayIdx < 7) values[dayIdx] += Number(b.amountInr);
    }
    return days.map((label, i) => ({ label, value: values[i] }));
  }

  // month — weekly buckets W1..W5
  const monthStart = getPeriodStart("month");
  const values = [0, 0, 0, 0, 0];
  for (const b of completed) {
    const ms = Number(b.createdAt / 1_000_000n);
    const weekIdx = Math.min(Math.floor((ms - monthStart) / (7 * 86400000)), 4);
    if (weekIdx >= 0) values[weekIdx] += Number(b.amountInr);
  }
  return ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5"].map((label, i) => ({
    label,
    value: values[i],
  }));
}

// ─── CSS Bar Chart ────────────────────────────────────────────────────────────

function BarChart({ bars }: { bars: ChartBar[] }) {
  const max = Math.max(...bars.map((b) => b.value), 1);
  return (
    <div className="flex items-end gap-1.5 h-28 w-full">
      {bars.map((bar) => {
        const pct = (bar.value / max) * 100;
        return (
          <div
            key={bar.label}
            className="flex flex-col items-center gap-1 flex-1 min-w-0"
          >
            <div className="w-full flex items-end justify-center h-20">
              <div
                className="w-full rounded-t-md transition-all duration-500"
                style={{
                  height: `${Math.max(pct, 4)}%`,
                  backgroundColor: pct > 0 ? SAFFRON : "#e5e7eb",
                  opacity: pct > 0 ? 1 : 0.4,
                }}
                title={`₹${bar.value.toLocaleString()}`}
              />
            </div>
            <span className="text-[9px] text-muted-foreground text-center leading-tight truncate w-full text-center">
              {bar.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Category Emoji ───────────────────────────────────────────────────────────

const CATEGORY_EMOJI: Record<string, string> = {
  [Category.food]: "🍽️",
  [Category.stay]: "🏨",
  [Category.play]: "⚽",
  [Category.retail]: "🛒",
};

// ─── Recent Orders ────────────────────────────────────────────────────────────

function RecentOrders({ bookings }: { bookings: Booking[] }) {
  const recent = [...bookings]
    .sort((a, b) => Number(b.createdAt - a.createdAt))
    .slice(0, 5);

  if (recent.length === 0) {
    return (
      <AppCard>
        <p className="text-sm text-muted-foreground text-center py-4">
          No bookings yet for this period
        </p>
      </AppCard>
    );
  }

  return (
    <div className="space-y-2">
      {recent.map((order) => (
        <AppCard key={order.id} padded={false}>
          <div className="flex items-center gap-3 p-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
              style={{
                backgroundColor: `${CATEGORY_COLORS[order.category as keyof typeof CATEGORY_COLORS] ?? SAFFRON}20`,
              }}
            >
              {CATEGORY_EMOJI[order.category] ?? "📋"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                {order.itemRef}
              </p>
              <p className="text-xs text-muted-foreground">
                ₹{order.amountInr.toString()} ·{" "}
                {new Date(
                  Number(order.createdAt / 1_000_000n),
                ).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                })}
              </p>
            </div>
            <StatusBadge status={order.status as "pending" | "accepted"} />
          </div>
        </AppCard>
      ))}
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

const PERIODS: { key: Period; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "week", label: "This Week" },
  { key: "month", label: "This Month" },
];

export default function OwnerDashboard() {
  const session = getSession();
  const ownerId = session?.userId ?? "";
  const { data: owner, isLoading: ownerLoading } = useGetOwnerById(ownerId);
  const { data: allBookings = [], isLoading: bookingsLoading } =
    useBookingsByOwner(ownerId);

  const [period, setPeriod] = useState<Period>("week");

  const periodBookings = useMemo(
    () => filterByPeriod(allBookings, period),
    [allBookings, period],
  );

  const completedBookings = useMemo(
    () => periodBookings.filter(isCompleted),
    [periodBookings],
  );

  const totalSales = completedBookings.length;
  const totalEarnings = completedBookings.reduce(
    (sum, b) => sum + Number(b.amountInr),
    0,
  );

  const chartBars = useMemo(
    () => buildChartBars(periodBookings, period),
    [periodBookings, period],
  );

  const businessName = owner?.businessName || session?.name || "My Business";
  const isLoading = ownerLoading || bookingsLoading;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 pt-10 pb-4">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0"
            style={{ backgroundColor: SAFFRON }}
          >
            📊
          </div>
          <div className="min-w-0">
            <h1 className="text-base font-bold font-display text-foreground truncate">
              {businessName}
            </h1>
            <p className="text-xs text-muted-foreground">Analytics Dashboard</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-5 max-w-lg mx-auto space-y-5">
        {/* Period Selector */}
        <div className="flex gap-2" data-ocid="period-selector">
          {PERIODS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setPeriod(key)}
              data-ocid={`period-${key}`}
              className="flex-1 py-2 rounded-xl text-xs font-semibold transition-colors border"
              style={{
                backgroundColor: period === key ? SAFFRON : "transparent",
                color: period === key ? "#fff" : undefined,
                borderColor: period === key ? SAFFRON : "var(--border)",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        {isLoading ? (
          <div className="grid grid-cols-2 gap-3">
            {[1, 2].map((n) => (
              <div
                key={n}
                className="h-24 rounded-2xl bg-muted animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <AppCard padded={false}>
              <div className="p-4 space-y-1">
                <p className="text-xs text-muted-foreground font-medium">
                  Total Sales
                </p>
                <p
                  className="text-3xl font-bold font-display"
                  style={{ color: SAFFRON }}
                  data-ocid="stat-total-sales"
                >
                  {totalSales}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  accepted bookings
                </p>
              </div>
            </AppCard>

            <AppCard padded={false}>
              <div className="p-4 space-y-1">
                <p className="text-xs text-muted-foreground font-medium">
                  Total Earnings
                </p>
                <p
                  className="text-2xl font-bold font-display"
                  style={{ color: SAFFRON }}
                  data-ocid="stat-total-earnings"
                >
                  ₹
                  {totalEarnings >= 1000
                    ? `${(totalEarnings / 1000).toFixed(1)}k`
                    : totalEarnings.toLocaleString("en-IN")}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  from completed orders
                </p>
              </div>
            </AppCard>
          </div>
        )}

        {/* Revenue Chart */}
        <AppCard padded={false}>
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold font-display text-foreground">
                Revenue Trend
              </h2>
              <span className="text-xs text-muted-foreground">
                {period === "today"
                  ? "By 6-hour block"
                  : period === "week"
                    ? "This week"
                    : "By week"}
              </span>
            </div>
            {isLoading ? (
              <div className="h-28 rounded-xl bg-muted animate-pulse" />
            ) : (
              <BarChart bars={chartBars} />
            )}
          </div>
        </AppCard>

        {/* Recent Orders */}
        <div>
          <h2 className="text-sm font-bold font-display text-foreground mb-3">
            📦 Recent Orders
          </h2>
          {isLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-16 rounded-xl bg-muted animate-pulse"
                />
              ))}
            </div>
          ) : (
            <RecentOrders bookings={periodBookings} />
          )}
        </div>
      </div>
    </div>
  );
}
