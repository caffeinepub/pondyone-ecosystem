import { CategoryBadge, StatusBadge } from "../../components/ui/AppBadge";
import { AppButton } from "../../components/ui/AppButton";
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

function sortBookings(bookings: Booking[]): Booking[] {
  return [...bookings].sort((a, b) => {
    const ai = STATUS_ORDER.indexOf(a.status);
    const bi = STATUS_ORDER.indexOf(b.status);
    if (ai !== bi) return ai - bi;
    return Number(b.createdAt - a.createdAt);
  });
}

export default function UserBookings({ navigate }: Props) {
  const session = getSession();
  const { data: bookings = [], isLoading } = useBookingsByUser(
    session?.userId ?? "",
  );

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
              <div
                key={booking.id}
                className="bg-card rounded-2xl shadow-card border border-border p-4"
                data-ocid={`booking-item-${idx}`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm text-foreground truncate">
                      {booking.itemRef}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5 truncate">
                      #{booking.id.slice(0, 12)}…
                    </p>
                  </div>
                  <p className="font-bold shrink-0" style={{ color: SAFFRON }}>
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
