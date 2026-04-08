import { useState } from "react";
import { CategoryBadge, StatusBadge } from "../../components/ui/AppBadge";
import { AppButton } from "../../components/ui/AppButton";
import { AppModal } from "../../components/ui/AppModal";
import { useBookingsByUser } from "../../hooks/useQueries";
import type { Booking } from "../../hooks/useQueries";
import { BookingStatus } from "../../hooks/useQueries";
import { getSession } from "../../lib/auth";
import { SAFFRON } from "../../lib/constants";
import type { UserRoute } from "./UserApp";

interface Props {
  navigate: (r: UserRoute) => void;
}

const STATUS_ORDER: BookingStatus[] = [
  BookingStatus.pending,
  BookingStatus.accepted,
  BookingStatus.completed,
  BookingStatus.declined,
];

const CATEGORY_EMOJI: Record<string, string> = {
  food: "🍛",
  stay: "🏨",
  play: "🏏",
  retail: "🛍️",
};

function sortBookings(bookings: Booking[]): Booking[] {
  return [...bookings].sort((a, b) => {
    const ai = STATUS_ORDER.indexOf(a.status);
    const bi = STATUS_ORDER.indexOf(b.status);
    if (ai !== bi) return ai - bi;
    return Number(b.createdAt - a.createdAt);
  });
}

function nightsBetween(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const d1 = new Date(checkIn).getTime();
  const d2 = new Date(checkOut).getTime();
  if (Number.isNaN(d1) || Number.isNaN(d2)) return 0;
  return Math.max(0, Math.round((d2 - d1) / 86400000));
}

function BookingDetailModal({
  booking,
  onClose,
}: {
  booking: Booking;
  onClose: () => void;
}) {
  const cat = booking.category as string;
  const nights =
    cat === "stay"
      ? nightsBetween(booking.checkInDate, booking.checkOutDate)
      : 0;

  return (
    <AppModal
      isOpen
      onClose={onClose}
      title="Booking Details"
      className="max-w-sm w-full"
    >
      <div className="space-y-4">
        {/* Item + category */}
        <div className="flex items-center gap-3">
          <span className="text-3xl">{CATEGORY_EMOJI[cat] ?? "📋"}</span>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-foreground text-base leading-snug truncate">
              {booking.itemRef}
            </p>
            <CategoryBadge
              category={cat as "food" | "stay" | "play" | "retail"}
            />
          </div>
        </div>

        <div className="bg-muted/40 rounded-xl divide-y divide-border">
          {/* Order ID */}
          <div className="flex justify-between items-center px-4 py-2.5">
            <span className="text-xs text-muted-foreground">Order ID</span>
            <span className="text-xs font-mono font-medium text-foreground">
              #{booking.id.slice(0, 14)}…
            </span>
          </div>

          {/* Booking date */}
          <div className="flex justify-between items-center px-4 py-2.5">
            <span className="text-xs text-muted-foreground">Booked on</span>
            <span className="text-xs font-medium text-foreground">
              {new Date(
                Number(booking.createdAt / 1_000_000n),
              ).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>

          {/* Category-specific details */}
          {cat === "stay" && booking.checkInDate && booking.checkOutDate && (
            <div className="px-4 py-2.5">
              <span className="text-xs text-muted-foreground block mb-1">
                Stay Duration
              </span>
              <p className="text-xs font-medium text-foreground">
                Check-in:{" "}
                <span className="font-semibold">{booking.checkInDate}</span>
                {"  ·  "}
                Check-out:{" "}
                <span className="font-semibold">{booking.checkOutDate}</span>
              </p>
              {nights > 0 && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {nights} night{nights !== 1 ? "s" : ""}
                </p>
              )}
            </div>
          )}

          {cat === "play" && booking.slotDate && (
            <div className="flex justify-between items-center px-4 py-2.5">
              <span className="text-xs text-muted-foreground">Slot Date</span>
              <span className="text-xs font-medium text-foreground">
                {booking.slotDate}
              </span>
            </div>
          )}

          {cat === "retail" && booking.deliveryFee > 0n && (
            <div className="flex justify-between items-center px-4 py-2.5">
              <span className="text-xs text-muted-foreground">
                Delivery Fee
              </span>
              <span className="text-xs font-semibold text-foreground">
                ₹{booking.deliveryFee.toString()}
              </span>
            </div>
          )}

          {/* Amount */}
          <div className="flex justify-between items-center px-4 py-2.5">
            <span className="text-xs text-muted-foreground">Amount Paid</span>
            <span className="text-sm font-bold" style={{ color: SAFFRON }}>
              ₹{booking.amountInr.toString()}
            </span>
          </div>

          {/* UPI ref */}
          {booking.upiRef && (
            <div className="flex justify-between items-center px-4 py-2.5">
              <span className="text-xs text-muted-foreground">UPI Ref</span>
              <span className="text-xs font-mono font-medium text-foreground truncate max-w-[160px]">
                {booking.upiRef}
              </span>
            </div>
          )}

          {/* Status */}
          <div className="flex justify-between items-center px-4 py-2.5">
            <span className="text-xs text-muted-foreground">Status</span>
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
        </div>

        <AppButton
          fullWidth
          variant="outline"
          onClick={onClose}
          data-ocid="booking-detail-close"
        >
          Close
        </AppButton>
      </div>
    </AppModal>
  );
}

export default function UserBookings({ navigate }: Props) {
  const session = getSession();
  const { data: bookings = [], isLoading } = useBookingsByUser(
    session?.userId ?? "",
  );
  const [selected, setSelected] = useState<Booking | null>(null);

  const sorted = sortBookings(bookings);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-30 shadow-subtle">
        <div className="max-w-lg mx-auto px-4 py-3">
          <h1 className="text-base font-bold font-display text-foreground">
            My Bookings
          </h1>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-4">
        {isLoading ? (
          <div className="flex flex-col gap-3">
            {(["bsk1", "bsk2", "bsk3"] as const).map((id) => (
              <div
                key={id}
                className="h-24 bg-muted rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 text-center"
            data-ocid="bookings-empty-state"
          >
            <p className="text-5xl mb-4">📋</p>
            <p className="font-semibold text-foreground text-lg mb-1">
              No bookings yet
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Discover food, stays, turfs and more.
            </p>
            <AppButton
              onClick={() => navigate({ page: "home" })}
              data-ocid="bookings-browse-cta"
            >
              Browse Listings
            </AppButton>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {sorted.map((booking, idx) => (
              <button
                key={booking.id}
                type="button"
                onClick={() => setSelected(booking)}
                data-ocid={`booking-item-${idx}`}
                className="w-full text-left bg-card rounded-2xl shadow-card border border-border p-4 hover:bg-muted/20 active:scale-[0.99] transition-smooth cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="min-w-0 flex-1 flex items-center gap-2">
                    <span className="text-xl shrink-0">
                      {CATEGORY_EMOJI[booking.category as string] ?? "📋"}
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-foreground truncate">
                        {booking.itemRef}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono mt-0.5 truncate">
                        #{booking.id.slice(0, 12)}…
                      </p>
                    </div>
                  </div>
                  <p
                    className="font-bold shrink-0 text-sm"
                    style={{ color: SAFFRON }}
                  >
                    ₹{booking.amountInr.toString()}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <CategoryBadge
                    category={
                      booking.category as "food" | "stay" | "play" | "retail"
                    }
                  />
                  <StatusBadge
                    status={
                      booking.status as
                        | "pending"
                        | "accepted"
                        | "declined"
                        | "completed"
                    }
                  />
                  <span className="text-xs text-muted-foreground ml-auto">
                    {new Date(
                      Number(booking.createdAt / 1_000_000n),
                    ).toLocaleDateString("en-IN")}
                  </span>
                </div>
                {/* Stay date hint */}
                {(booking.category as string) === "stay" &&
                  booking.checkInDate && (
                    <p className="text-xs text-muted-foreground mt-1.5">
                      📅 {booking.checkInDate} → {booking.checkOutDate}
                    </p>
                  )}
                {(booking.category as string) === "play" &&
                  booking.slotDate && (
                    <p className="text-xs text-muted-foreground mt-1.5">
                      🕐 Slot: {booking.slotDate}
                    </p>
                  )}
              </button>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <BookingDetailModal
          booking={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
