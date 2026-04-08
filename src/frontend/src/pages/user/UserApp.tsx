import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BottomNav } from "../../components/BottomNav";
import { clearSession, getSession } from "../../lib/auth";
import UserAccount from "./UserAccount";
import UserBookings from "./UserBookings";
import UserCheckout from "./UserCheckout";
import UserConfirmation from "./UserConfirmation";
import UserHome from "./UserHome";
import UserItemDetail from "./UserItemDetail";
import UserSearch from "./UserSearch";
import UserTickets from "./UserTickets";

export type UserRoute =
  | { page: "home" }
  | { page: "search"; q?: string; category?: string }
  | { page: "item"; id: string; category: string; ownerId: string }
  | {
      page: "checkout";
      itemId: string;
      itemName: string;
      ownerId: string;
      upiId: string;
      amount: bigint;
      category: string;
    }
  | { page: "confirmation"; orderId: string }
  | { page: "bookings" }
  | { page: "tickets" }
  | { page: "account" };

const NAV_ITEMS = [
  { icon: "🏠", label: "Home", path: "home" },
  { icon: "🔍", label: "Search", path: "search" },
  { icon: "📋", label: "Bookings", path: "bookings" },
  { icon: "🎫", label: "Support", path: "tickets" },
  { icon: "👤", label: "Account", path: "account" },
];

const BOTTOM_NAV_PAGES = ["home", "search", "bookings", "tickets", "account"];

export default function UserApp() {
  const topNavigate = useNavigate();
  const [route, setRoute] = useState<UserRoute>({ page: "home" });

  // Redirect to signin if no valid user session
  useEffect(() => {
    const session = getSession();
    if (!session || session.role !== "user") {
      topNavigate({ to: "/" });
    }
  }, [topNavigate]);

  const navigate = (r: UserRoute) => setRoute(r);

  function handleLogout() {
    clearSession();
    topNavigate({ to: "/" });
  }

  const showNav = BOTTOM_NAV_PAGES.includes(route.page);

  const handleNavNavigate = (path: string) => {
    if (path === "search") navigate({ page: "search" });
    else if (path === "bookings") navigate({ page: "bookings" });
    else if (path === "tickets") navigate({ page: "tickets" });
    else if (path === "account") navigate({ page: "account" });
    else navigate({ page: "home" });
  };

  const renderPage = () => {
    switch (route.page) {
      case "home":
        return <UserHome navigate={navigate} />;
      case "search":
        return (
          <UserSearch
            navigate={navigate}
            q={route.q}
            category={route.category}
          />
        );
      case "item":
        return (
          <UserItemDetail
            navigate={navigate}
            id={route.id}
            category={route.category}
            ownerId={route.ownerId}
          />
        );
      case "checkout":
        return (
          <UserCheckout
            navigate={navigate}
            itemId={route.itemId}
            itemName={route.itemName}
            ownerId={route.ownerId}
            upiId={route.upiId}
            amount={route.amount}
            category={route.category}
          />
        );
      case "confirmation":
        return <UserConfirmation navigate={navigate} orderId={route.orderId} />;
      case "bookings":
        return <UserBookings navigate={navigate} />;
      case "tickets":
        return <UserTickets navigate={navigate} />;
      case "account":
        return <UserAccount navigate={navigate} onLogout={handleLogout} />;
      default:
        return <UserHome navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className={showNav ? "pb-16" : ""}>{renderPage()}</div>
      {showNav && (
        <BottomNav
          items={NAV_ITEMS.map((n) => ({ ...n, path: n.path }))}
          currentPath={route.page}
          onNavigate={handleNavNavigate}
        />
      )}
    </div>
  );
}
