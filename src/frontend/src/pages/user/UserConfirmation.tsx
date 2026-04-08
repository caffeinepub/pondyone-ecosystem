import { useEffect, useState } from "react";
import { StatusBadge } from "../../components/ui/AppBadge";
import { AppButton } from "../../components/ui/AppButton";
import { SAFFRON } from "../../lib/constants";
import type { UserRoute } from "./UserApp";

interface Props {
  navigate: (r: UserRoute) => void;
  orderId: string;
}

export default function UserConfirmation({ navigate, orderId }: Props) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
      {/* Success animation */}
      <div
        className="transition-all duration-700 ease-out"
        style={{
          transform: animate ? "scale(1)" : "scale(0.5)",
          opacity: animate ? 1 : 0,
        }}
      >
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center text-5xl mb-6 mx-auto shadow-elevated"
          style={{
            backgroundColor: `${SAFFRON}20`,
            border: `3px solid ${SAFFRON}`,
          }}
        >
          ✅
        </div>
      </div>

      <h1
        className="text-2xl font-bold font-display mb-2 transition-all duration-700 delay-200"
        style={{
          color: SAFFRON,
          opacity: animate ? 1 : 0,
          transform: animate ? "translateY(0)" : "translateY(10px)",
        }}
      >
        Booking Confirmed!
      </h1>

      <p
        className="text-muted-foreground text-sm mb-6 transition-all duration-700 delay-300"
        style={{
          opacity: animate ? 1 : 0,
          transform: animate ? "translateY(0)" : "translateY(10px)",
        }}
      >
        Your booking has been submitted successfully.
      </p>

      {/* Order ID */}
      <div
        className="bg-card rounded-2xl border border-border shadow-card p-4 w-full max-w-xs mb-4 transition-all duration-700 delay-300"
        style={{ opacity: animate ? 1 : 0 }}
      >
        <p className="text-xs text-muted-foreground mb-1">Order ID</p>
        <p className="font-mono font-bold text-foreground text-sm break-all">
          {orderId}
        </p>
      </div>

      {/* Status */}
      <div
        className="mb-8 transition-all duration-700 delay-400"
        style={{ opacity: animate ? 1 : 0 }}
      >
        <StatusBadge status="pending" label="Pending Approval" />
        <p className="text-xs text-muted-foreground mt-2">
          The owner will review and accept your booking shortly.
        </p>
      </div>

      {/* Actions */}
      <div
        className="flex flex-col gap-3 w-full max-w-xs transition-all duration-700 delay-500"
        style={{ opacity: animate ? 1 : 0 }}
      >
        <AppButton
          fullWidth
          size="lg"
          onClick={() => navigate({ page: "bookings" })}
          data-ocid="confirmation-view-bookings"
        >
          View All Bookings
        </AppButton>
        <AppButton
          fullWidth
          variant="outline"
          size="lg"
          onClick={() => navigate({ page: "home" })}
          data-ocid="confirmation-back-home"
        >
          Back to Home
        </AppButton>
      </div>
    </div>
  );
}
