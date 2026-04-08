import { StatusBadge } from "@/components/ui/AppBadge";
import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import {
  type Booking,
  BookingStatus,
  useBookingsByOwner,
  useUpdateBookingStatus,
} from "@/hooks/useQueries";
import { getSession } from "@/lib/auth";
import { SAFFRON } from "@/lib/constants";
import { useState } from "react";

type Tab = "active" | "all";

function formatTime(ts: bigint): string {
  try {
    const ms = Number(ts / 1_000_000n);
    return new Date(ms).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "—";
  }
}

function BookingCard({
  booking,
  showComplete,
}: { booking: Booking; showComplete: boolean }) {
  const updateStatus = useUpdateBookingStatus();

  async function markComplete() {
    await updateStatus.mutateAsync({
      id: booking.id,
      status: BookingStatus.completed,
    });
  }

  return (
    <AppCard>
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">
              {booking.itemRef}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Customer: {booking.userId.slice(0, 12)}…
            </p>
          </div>
          <StatusBadge
            status={
              booking.status as
                | "pending"
                | "accepted"
                | "declined"
                | "completed"
            }
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-bold" style={{ color: SAFFRON }}>
              ₹{booking.amountInr.toString()}
            </p>
            <p className="text-[10px] text-muted-foreground">
              {formatTime(booking.createdAt)}
            </p>
          </div>
          {booking.upiRef && (
            <span className="text-xs text-muted-foreground truncate max-w-[120px]">
              UPI: {booking.upiRef}
            </span>
          )}
        </div>
        {showComplete && (
          <AppButton
            size="sm"
            fullWidth
            onClick={markComplete}
            disabled={updateStatus.isPending}
            data-ocid={`mark-complete-${booking.id}`}
          >
            ✓ Mark Completed
          </AppButton>
        )}
      </div>
    </AppCard>
  );
}

export default function OwnerOrders() {
  const session = getSession();
  const ownerId = session?.userId ?? "";
  const { data: bookings = [], isLoading } = useBookingsByOwner(ownerId);
  const [activeTab, setActiveTab] = useState<Tab>("active");

  const activeOrders = bookings.filter(
    (b) => b.status === BookingStatus.accepted,
  );
  const allOrders = [...bookings].sort((a, b) =>
    Number(b.createdAt - a.createdAt),
  );

  const displayed = activeTab === "active" ? activeOrders : allOrders;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 pt-10 pb-4">
        <h1 className="text-xl font-bold font-display text-foreground">
          📦 Orders
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {bookings.length} total order{bookings.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-card border-b border-border px-4">
        <div className="flex max-w-lg mx-auto">
          {(["active", "all"] as Tab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              data-ocid={`orders-tab-${tab}`}
              className="flex-1 py-3 text-sm font-semibold transition-colors border-b-2 focus-visible:outline-none"
              style={{
                borderBottomColor: activeTab === tab ? SAFFRON : "transparent",
                color: activeTab === tab ? SAFFRON : "#6b7280",
              }}
            >
              {tab === "active"
                ? `Active (${activeOrders.length})`
                : `All (${allOrders.length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-5 max-w-lg mx-auto space-y-3">
        {isLoading ? (
          [1, 2, 3].map((n) => (
            <div key={n} className="h-28 rounded-2xl bg-muted animate-pulse" />
          ))
        ) : displayed.length === 0 ? (
          <AppCard>
            <div className="text-center py-8">
              <p className="text-3xl mb-2">📭</p>
              <p className="text-sm font-semibold text-foreground">
                {activeTab === "active" ? "No active orders" : "No orders yet"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {activeTab === "active"
                  ? "Orders you accept will appear here"
                  : "When customers book your services, they'll show here"}
              </p>
            </div>
          </AppCard>
        ) : (
          displayed.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              showComplete={booking.status === BookingStatus.accepted}
            />
          ))
        )}
      </div>
    </div>
  );
}
