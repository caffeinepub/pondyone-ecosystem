import { BottomNav } from "@/components/BottomNav";
import { AppButton } from "@/components/ui/AppButton";
import {
  type Booking,
  BookingStatus,
  SubscriptionStatus,
  useBookingsByOwner,
  useGetOwnerById,
  useUpdateBookingStatus,
  useVerifySubscriptionPayment,
} from "@/hooks/useQueries";
import { playAlarm, stopAlarm } from "@/lib/audio";
import { getSession } from "@/lib/auth";
import { SAFFRON } from "@/lib/constants";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import OwnerAccount from "./OwnerAccount";
import OwnerDashboard from "./OwnerDashboard";
import OwnerInventory from "./OwnerInventory";
import OwnerOnboarding from "./OwnerOnboarding";
import OwnerOrders from "./OwnerOrders";
import OwnerTickets from "./OwnerTickets";

const SEEN_BOOKINGS_KEY = "pondyone_seen_bookings";

export type OwnerPage =
  | "onboarding"
  | "dashboard"
  | "orders"
  | "tickets"
  | "inventory"
  | "account";

function getSeenSet(): Set<string> {
  try {
    const raw = localStorage.getItem(SEEN_BOOKINGS_KEY);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

function addSeen(id: string): void {
  const seen = getSeenSet();
  seen.add(id);
  localStorage.setItem(SEEN_BOOKINGS_KEY, JSON.stringify([...seen]));
}

const NAV_ITEMS = [
  { icon: "🏪", label: "Dashboard", path: "/owner/dashboard" },
  { icon: "📦", label: "Orders", path: "/owner/orders" },
  { icon: "🎫", label: "Support", path: "/owner/tickets" },
  { icon: "🗃️", label: "Inventory", path: "/owner/inventory" },
  { icon: "👤", label: "Account", path: "/owner/account" },
];

const AUTH_PAGES: OwnerPage[] = ["onboarding"];

function getInitialPage(): OwnerPage {
  const session = getSession();
  if (!session || session.role !== "owner") return "dashboard";
  if (!session.onboardingDone) return "onboarding";
  return "dashboard";
}

export default function OwnerApp() {
  const topNavigate = useNavigate();
  const [page, setPage] = useState<OwnerPage>(getInitialPage);

  const session = getSession();
  const ownerId = session?.role === "owner" ? session.userId : "";
  const [alertBooking, setAlertBooking] = useState<Booking | null>(null);
  const alarmActiveRef = useRef(false);

  // Subscription popup state
  const [showSubPopup, setShowSubPopup] = useState(false);
  const [txId, setTxId] = useState("");
  const [subError, setSubError] = useState("");
  const [subSuccess, setSubSuccess] = useState(false);

  const { data: ownerProfile } = useGetOwnerById(ownerId);
  const verifyPayment = useVerifySubscriptionPayment();

  // Redirect to unified signin if no valid owner session
  useEffect(() => {
    const s = getSession();
    if (!s || s.role !== "owner") {
      topNavigate({ to: "/" });
    }
  }, [topNavigate]);

  // Check subscription status after onboarding is done
  useEffect(() => {
    if (!ownerProfile || page === "onboarding") return;
    const status = ownerProfile.subscriptionStatus;
    if (
      status === SubscriptionStatus.inactive ||
      status === SubscriptionStatus.expired
    ) {
      setShowSubPopup(true);
    }
  }, [ownerProfile, page]);

  const { data: bookings } = useBookingsByOwner(ownerId);
  const updateStatus = useUpdateBookingStatus();

  const isAuthPage = AUTH_PAGES.includes(page);

  // Detect new pending bookings
  useEffect(() => {
    if (!bookings || isAuthPage || showSubPopup) return;
    const seen = getSeenSet();
    const newPending = bookings.filter(
      (b) => b.status === BookingStatus.pending && !seen.has(b.id),
    );
    if (newPending.length > 0 && !alarmActiveRef.current) {
      alarmActiveRef.current = true;
      playAlarm();
      setAlertBooking(newPending[0]);
    }
  }, [bookings, isAuthPage, showSubPopup]);

  const handleAlertAction = useCallback(
    (booking: Booking, accept: boolean) => {
      updateStatus.mutate({
        id: booking.id,
        status: accept ? BookingStatus.accepted : BookingStatus.declined,
      });
      addSeen(booking.id);
      stopAlarm();
      alarmActiveRef.current = false;
      setAlertBooking(null);
    },
    [updateStatus],
  );

  async function handleVerifyPayment() {
    if (!txId.trim()) return;
    setSubError("");
    try {
      const result = await verifyPayment.mutateAsync({
        ownerId,
        txId: txId.trim(),
      });
      if (result.__kind__ === "ok") {
        setSubSuccess(true);
        setTimeout(() => {
          setShowSubPopup(false);
          setSubSuccess(false);
          setTxId("");
        }, 2500);
      } else {
        setSubError(
          "Transaction ID not accepted. Please try again or contact support.",
        );
      }
    } catch {
      setSubError(
        "Transaction ID not accepted. Please try again or contact support.",
      );
    }
  }

  function handlePayLater() {
    setShowSubPopup(false);
  }

  function navigate(p: OwnerPage) {
    setPage(p);
  }

  function navigateHome() {
    topNavigate({ to: "/" });
  }

  const currentNavPath = `/owner/${page}`;

  function renderPage() {
    switch (page) {
      case "onboarding":
        return <OwnerOnboarding navigate={navigate} />;
      case "orders":
        return <OwnerOrders />;
      case "tickets":
        return <OwnerTickets />;
      case "inventory":
        return <OwnerInventory />;
      case "account":
        return <OwnerAccount navigate={navigate} navigateHome={navigateHome} />;
      default:
        return <OwnerDashboard />;
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className={isAuthPage ? "" : "pb-16"}>{renderPage()}</div>

      {/* Bottom nav — only for authenticated pages */}
      {!isAuthPage && session && (
        <BottomNav
          items={NAV_ITEMS}
          currentPath={currentNavPath}
          onNavigate={(path) => {
            const seg = path.replace("/owner/", "") as OwnerPage;
            setPage(seg);
          }}
        />
      )}

      {/* Subscription Popup */}
      {showSubPopup && (
        <dialog
          open
          className="fixed inset-0 z-[9998] flex items-center justify-center p-4 w-full h-full max-w-none m-0 bg-transparent"
          aria-label="Subscription Required"
          data-ocid="subscription-popup"
        >
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
          <div className="relative z-10 w-full max-w-sm mx-auto">
            <div className="bg-card rounded-2xl p-6 shadow-2xl border border-border">
              {subSuccess ? (
                <div className="text-center py-6">
                  <div className="text-5xl mb-4">🎉</div>
                  <h2 className="text-xl font-bold font-display text-foreground mb-2">
                    You're All Set!
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Your account is now active and verified!
                  </p>
                  <div
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: "#22C55E" }}
                  >
                    ✓ Active & Verified
                  </div>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="text-center mb-5">
                    <div className="text-4xl mb-3">🏪</div>
                    <h2
                      className="text-xl font-bold font-display"
                      style={{ color: SAFFRON }}
                    >
                      Activate Your Store
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      Subscription required to be visible to customers
                    </p>
                  </div>

                  {/* Plan details */}
                  <div
                    className="rounded-xl p-4 mb-5 border"
                    style={{
                      backgroundColor: `${SAFFRON}10`,
                      borderColor: `${SAFFRON}30`,
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-foreground">
                        Monthly Plan
                      </span>
                      <span
                        className="text-2xl font-bold"
                        style={{ color: SAFFRON }}
                      >
                        ₹1,500
                      </span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <span style={{ color: "#22C55E" }}>✓</span>
                        Store visible to all customers
                      </li>
                      <li className="flex items-center gap-2">
                        <span style={{ color: "#22C55E" }}>✓</span>
                        Receive bookings and orders
                      </li>
                      <li className="flex items-center gap-2">
                        <span style={{ color: "#22C55E" }}>✓</span>
                        Full dashboard access
                      </li>
                    </ul>
                  </div>

                  {/* Payment instructions */}
                  <div className="bg-muted/50 rounded-xl p-4 mb-4 text-center">
                    <p className="text-xs text-muted-foreground mb-2">
                      Pay via UPI to
                    </p>
                    <p
                      className="text-base font-bold font-mono tracking-wide"
                      style={{ color: SAFFRON }}
                    >
                      akkumaresh@ybl
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Amount: ₹1,500
                    </p>
                    <div className="mt-3 mx-auto w-24 h-24 bg-muted rounded-xl flex items-center justify-center text-4xl">
                      📱
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-2">
                      Open any UPI app → Pay to the ID above
                    </p>
                  </div>

                  {/* Transaction ID input */}
                  <div className="mb-3">
                    <label
                      htmlFor="sub-txid"
                      className="block text-xs font-medium text-foreground mb-1.5"
                    >
                      Enter UPI Transaction ID
                    </label>
                    <input
                      id="sub-txid"
                      type="text"
                      value={txId}
                      onChange={(e) => {
                        setTxId(e.target.value);
                        setSubError("");
                      }}
                      placeholder="e.g. 407835921234"
                      className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
                      data-ocid="subscription-txid-input"
                    />
                    {subError && (
                      <p
                        className="text-xs mt-1.5"
                        style={{ color: "#EF4444" }}
                      >
                        {subError}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <button
                      type="button"
                      disabled={!txId.trim() || verifyPayment.isPending}
                      onClick={handleVerifyPayment}
                      data-ocid="subscription-verify-btn"
                      className="w-full h-12 rounded-xl font-bold text-sm text-white transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ backgroundColor: SAFFRON }}
                    >
                      {verifyPayment.isPending
                        ? "Verifying…"
                        : "✓ Verify Payment"}
                    </button>
                    <button
                      type="button"
                      onClick={handlePayLater}
                      data-ocid="subscription-skip-btn"
                      className="w-full h-10 rounded-xl font-medium text-xs text-muted-foreground border border-border bg-transparent hover:bg-muted/40 transition-colors"
                    >
                      Pay Later — store will be hidden from customers
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </dialog>
      )}

      {/* New Order Alert Modal */}
      {alertBooking && (
        <dialog
          open
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 w-full h-full max-w-none m-0 bg-transparent"
          aria-label="New Order Alert"
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div className="relative z-10 w-full max-w-sm mx-auto">
            <div
              className="bg-card rounded-2xl p-6 shadow-2xl border-4 animate-pulse"
              style={{ borderColor: "#FF4444" }}
            >
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">🚨</div>
                <h2
                  className="text-2xl font-bold font-display"
                  style={{ color: "#FF4444" }}
                >
                  NEW ORDER!
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  A new booking just came in
                </p>
              </div>

              <div className="bg-muted/50 rounded-xl p-4 mb-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Customer</span>
                  <span className="font-medium text-foreground truncate ml-4">
                    {alertBooking.userId.slice(0, 8)}…
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Item</span>
                  <span className="font-medium text-foreground truncate ml-4">
                    {alertBooking.itemRef}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-bold text-foreground">
                    ₹{alertBooking.amountInr.toString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">UPI Ref</span>
                  <span className="font-medium text-foreground truncate ml-4">
                    {alertBooking.upiRef || "N/A"}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <AppButton
                  variant="danger"
                  size="lg"
                  fullWidth
                  data-ocid="alert-decline"
                  onClick={() => handleAlertAction(alertBooking, false)}
                >
                  ✕ Decline
                </AppButton>
                <button
                  type="button"
                  data-ocid="alert-accept"
                  onClick={() => handleAlertAction(alertBooking, true)}
                  className="flex-1 h-12 px-6 text-base rounded-xl font-bold text-white transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98] shadow-sm"
                  style={{ backgroundColor: "#22C55E" }}
                >
                  ✓ Accept
                </button>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
