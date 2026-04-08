import { BottomNav } from "@/components/BottomNav";
import { AppButton } from "@/components/ui/AppButton";
import {
  type Booking,
  BookingStatus,
  useBookingsByOwner,
  useUpdateBookingStatus,
} from "@/hooks/useQueries";
import { playAlarm, stopAlarm } from "@/lib/audio";
import { getSession } from "@/lib/auth";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import OwnerAccount from "./OwnerAccount";
import OwnerDashboard from "./OwnerDashboard";
import OwnerOnboarding from "./OwnerOnboarding";
import OwnerOrders from "./OwnerOrders";
import OwnerTickets from "./OwnerTickets";

const SEEN_BOOKINGS_KEY = "pondyone_seen_bookings";

export type OwnerPage =
  | "onboarding"
  | "dashboard"
  | "orders"
  | "tickets"
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
  { icon: "👤", label: "Account", path: "/owner/account" },
];

const AUTH_PAGES: OwnerPage[] = ["onboarding"];

function getInitialPage(): OwnerPage {
  const session = getSession();
  if (!session || session.role !== "owner") return "dashboard"; // will redirect via navigateHome
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

  // Redirect to unified signin if no valid owner session
  useEffect(() => {
    const s = getSession();
    if (!s || s.role !== "owner") {
      topNavigate({ to: "/" });
    }
  }, [topNavigate]);

  const { data: bookings } = useBookingsByOwner(ownerId);
  const updateStatus = useUpdateBookingStatus();

  const isAuthPage = AUTH_PAGES.includes(page);

  // Detect new pending bookings
  useEffect(() => {
    if (!bookings || isAuthPage) return;
    const seen = getSeenSet();
    const newPending = bookings.filter(
      (b) => b.status === BookingStatus.pending && !seen.has(b.id),
    );
    if (newPending.length > 0 && !alarmActiveRef.current) {
      alarmActiveRef.current = true;
      playAlarm();
      setAlertBooking(newPending[0]);
    }
  }, [bookings, isAuthPage]);

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
