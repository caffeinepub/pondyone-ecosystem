import { useState } from "react";
import { AppButton } from "../../components/ui/AppButton";
import { Category, useCreateBooking } from "../../hooks/useQueries";
import { playPing } from "../../lib/audio";
import { getSession } from "../../lib/auth";
import { SAFFRON } from "../../lib/constants";
import type { UserRoute } from "./UserApp";

interface Props {
  navigate: (r: UserRoute) => void;
  itemId: string;
  itemName: string;
  ownerId: string;
  upiId: string;
  amount: bigint;
  category: string;
}

export default function UserCheckout({
  navigate,
  itemId,
  itemName,
  ownerId,
  upiId,
  amount,
  category,
}: Props) {
  const [upiRef, setUpiRef] = useState("");
  const [error, setError] = useState("");
  const session = getSession();
  const createBooking = useCreateBooking();

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
          <div className="flex items-center justify-between">
            <p className="font-semibold text-foreground">{itemName}</p>
            <p className="font-bold text-lg" style={{ color: SAFFRON }}>
              ₹{amount.toString()}
            </p>
          </div>
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
            <p className="text-xs text-muted-foreground mb-1">Amount</p>
            <p className="font-bold text-xl" style={{ color: SAFFRON }}>
              ₹{amount.toString()}
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
              <li>Send ₹{amount.toString()} to the UPI ID above</li>
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
          disabled={createBooking.isPending}
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
