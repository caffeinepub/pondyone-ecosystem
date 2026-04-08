import { useEffect, useState } from "react";
import { AppButton } from "../../components/ui/AppButton";
import {
  Category,
  useCreateBooking,
  useGetDeliveryFee,
} from "../../hooks/useQueries";
import { playPing } from "../../lib/audio";
import { getSession } from "../../lib/auth";
import { DEFAULT_LOCATION, SAFFRON } from "../../lib/constants";
import type { UserRoute } from "./UserApp";

interface Props {
  navigate: (r: UserRoute) => void;
  itemId: string;
  itemName: string;
  ownerId: string;
  upiId: string;
  amount: bigint;
  category: string;
  checkInDate?: string;
  checkOutDate?: string;
  slotDate?: string;
  startTime?: string;
  endTime?: string;
}

interface GeoCoords {
  lat: number;
  lng: number;
}

export default function UserCheckout({
  navigate,
  itemId,
  itemName,
  ownerId,
  upiId,
  amount,
  category,
  checkInDate,
  checkOutDate,
  slotDate,
  startTime,
  endTime,
}: Props) {
  const [upiRef, setUpiRef] = useState("");
  const [error, setError] = useState("");
  const [coords, setCoords] = useState<GeoCoords>({
    lat: DEFAULT_LOCATION.lat,
    lng: DEFAULT_LOCATION.lng,
  });
  const [geoResolved, setGeoResolved] = useState(false);

  const session = getSession();
  const createBooking = useCreateBooking();
  const isRetail = category === "retail";

  // Resolve geolocation for retail orders
  useEffect(() => {
    if (!isRetail) {
      setGeoResolved(true);
      return;
    }
    if (!navigator.geolocation) {
      setGeoResolved(true);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setGeoResolved(true);
      },
      () => {
        // Fall back to Puducherry default
        setGeoResolved(true);
      },
      { timeout: 6000 },
    );
  }, [isRetail]);

  const { data: deliveryFeeBigint, isLoading: feeLoading } = useGetDeliveryFee(
    ownerId,
    coords.lat,
    coords.lng,
    isRetail && geoResolved,
  );

  const deliveryFee = deliveryFeeBigint ?? 0n;
  const total = amount + deliveryFee;

  const categoryMap: Record<string, Category> = {
    food: Category.food,
    stay: Category.stay,
    play: Category.play,
    retail: Category.retail,
  };

  const handleConfirm = async () => {
    if (!upiRef.trim()) {
      setError("Please enter your UPI transaction reference.");
      return;
    }
    if (!session) {
      navigate({ page: "home" });
      return;
    }
    setError("");
    try {
      const result = await createBooking.mutateAsync({
        userId: session.userId,
        ownerId,
        category: categoryMap[category] ?? Category.food,
        itemRef: itemId,
        amountInr: amount,
        upiRef: upiRef.trim(),
        checkInDate: checkInDate ?? "",
        checkOutDate: checkOutDate ?? "",
        slotDate: slotDate ?? "",
        deliveryFee: isRetail ? deliveryFee : 0n,
      });
      if (result.__kind__ === "ok") {
        playPing();
        navigate({ page: "confirmation", orderId: result.ok.id });
      } else {
        setError(result.err ?? "Booking failed. Please try again.");
      }
    } catch {
      setError("Booking failed. Please check your connection and try again.");
    }
  };

  const showFeeLoader = isRetail && (!geoResolved || feeLoading);
  const payAmount = isRetail && !showFeeLoader ? total : amount;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-subtle">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate({ page: "search" })}
            className="p-2 rounded-xl hover:bg-muted transition-colors"
            aria-label="Back"
          >
            ←
          </button>
          <h1 className="text-base font-bold font-display text-foreground">
            Checkout
          </h1>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-5 flex flex-col gap-4">
        {/* Order summary */}
        <div className="bg-card rounded-2xl shadow-card border border-border p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Order Summary
          </p>

          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-foreground truncate mr-3 flex-1 min-w-0">
              {itemName}
            </p>
            <p
              className="font-bold text-lg shrink-0"
              style={{ color: SAFFRON }}
            >
              ₹{amount.toString()}
            </p>
          </div>

          {/* Stay dates summary */}
          {category === "stay" &&
            checkInDate &&
            checkOutDate &&
            (() => {
              const stayNights = Math.round(
                (new Date(checkOutDate).getTime() -
                  new Date(checkInDate).getTime()) /
                  86400000,
              );
              const fmt = (d: string) =>
                new Date(d).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });
              return (
                <div className="mt-2 pt-2 border-t border-border space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Check-in</span>
                    <span className="font-medium text-foreground">
                      {fmt(checkInDate)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Check-out</span>
                    <span className="font-medium text-foreground">
                      {fmt(checkOutDate)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-muted-foreground">Duration</span>
                    <span
                      className="font-semibold px-2 py-0.5 rounded-full text-xs"
                      style={{
                        backgroundColor: `${SAFFRON}20`,
                        color: SAFFRON,
                      }}
                    >
                      🌙 {stayNights} night{stayNights !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              );
            })()}

          {/* Slot date summary */}
          {category === "play" && slotDate && (
            <p className="text-xs text-muted-foreground mt-1">
              🗓 {slotDate}
              {startTime && endTime && ` · ⏰ ${startTime}–${endTime}`}
            </p>
          )}

          {/* Retail delivery fee breakdown */}
          {isRetail && (
            <>
              <div className="border-t border-border my-3" />
              {showFeeLoader ? (
                <div className="flex items-center gap-2 py-1">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-muted-foreground">
                    Calculating delivery fee…
                  </p>
                </div>
              ) : (
                <div
                  className="rounded-xl p-3 mb-2"
                  style={{ backgroundColor: `${SAFFRON}12` }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        🚚 Delivery Fee
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Based on your location
                      </p>
                    </div>
                    <p
                      className="font-semibold text-sm shrink-0"
                      style={{ color: SAFFRON }}
                    >
                      {deliveryFee > 0n
                        ? `+₹${deliveryFee.toString()}`
                        : "FREE"}
                    </p>
                  </div>
                </div>
              )}
              {!showFeeLoader && (
                <div className="flex items-center justify-between pt-1">
                  <p className="font-bold text-foreground">Total</p>
                  <p className="font-bold text-xl" style={{ color: SAFFRON }}>
                    ₹{total.toString()}
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* UPI payment section */}
        <div className="bg-card rounded-2xl shadow-card border border-border p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Pay via UPI
          </p>

          {/* UPI ID */}
          <div className="bg-muted/40 rounded-xl p-3 mb-3">
            <p className="text-xs text-muted-foreground mb-1">
              Send payment to
            </p>
            <p className="font-mono font-bold text-foreground text-sm select-all">
              {upiId || "owner@upi"}
            </p>
          </div>

          {/* Amount */}
          <div className="bg-muted/40 rounded-xl p-3 mb-4">
            <p className="text-xs text-muted-foreground mb-1">
              {isRetail ? "Total amount to pay" : "Amount"}
            </p>
            <p className="font-bold text-xl" style={{ color: SAFFRON }}>
              {showFeeLoader
                ? `₹${amount.toString()} + delivery`
                : `₹${payAmount.toString()}`}
            </p>
          </div>

          {/* Instructions */}
          <div
            className="rounded-xl p-3 mb-4 text-xs leading-relaxed"
            style={{ backgroundColor: `${SAFFRON}15`, color: "#1A1A2E" }}
          >
            <p className="font-semibold mb-1">📱 How to pay:</p>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>Open any UPI app (PhonePe, GPay, Paytm)</li>
              <li>
                Send ₹{showFeeLoader ? amount.toString() : payAmount.toString()}{" "}
                to the UPI ID above
              </li>
              <li>Copy the transaction reference number</li>
              <li>Paste it below and confirm your booking</li>
            </ol>
          </div>

          {/* UPI Ref input */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="upi-ref"
            >
              UPI Transaction Reference *
            </label>
            <input
              id="upi-ref"
              type="text"
              placeholder="e.g. 4056789123456"
              value={upiRef}
              onChange={(e) => setUpiRef(e.target.value)}
              data-ocid="checkout-upi-ref"
              className="h-12 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
            />
            {error && <span className="text-xs text-destructive">{error}</span>}
          </div>
        </div>

        {/* Confirm button */}
        <AppButton
          fullWidth
          size="lg"
          onClick={handleConfirm}
          disabled={createBooking.isPending || showFeeLoader}
          data-ocid="checkout-confirm"
        >
          {createBooking.isPending ? "Confirming…" : "✅ Confirm Booking"}
        </AppButton>

        <p className="text-xs text-muted-foreground text-center">
          By confirming, you agree that payment has been made outside the app.
          The owner will verify and accept your booking.
        </p>
      </div>
    </div>
  );
}
