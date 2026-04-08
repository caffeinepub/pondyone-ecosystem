import { clearSession, getSession } from "@/lib/auth";
import { ADMIN_PHONE } from "@/lib/constants";
import {
  BarChart3,
  Grid3X3,
  Headphones,
  LogOut,
  Menu,
  Radio,
  Users,
  X,
} from "lucide-react";
import { Suspense, lazy, useEffect, useState } from "react";

const AdminLogin = lazy(() => import("./AdminLogin"));
const AdminDashboard = lazy(() => import("./AdminDashboard"));
const AdminUsers = lazy(() => import("./AdminUsers"));
const AdminCategories = lazy(() => import("./AdminCategories"));
const AdminSupport = lazy(() => import("./AdminSupport"));
const AdminBroadcast = lazy(() => import("./AdminBroadcast"));

type AdminRoute =
  | "login"
  | "dashboard"
  | "users"
  | "categories"
  | "support"
  | "broadcast";

function getRouteFromPath(): AdminRoute {
  const path = window.location.pathname;
  if (path.includes("/admin/dashboard")) return "dashboard";
  if (path.includes("/admin/users")) return "users";
  if (path.includes("/admin/categories")) return "categories";
  if (path.includes("/admin/support")) return "support";
  if (path.includes("/admin/broadcast")) return "broadcast";
  if (path.includes("/admin/login")) return "login";
  return "login";
}

function setRouteInPath(route: AdminRoute) {
  window.history.pushState({}, "", `/admin/${route}`);
}

const NAV_ITEMS = [
  {
    id: "dashboard" as AdminRoute,
    label: "Dashboard",
    icon: BarChart3,
    emoji: "📊",
  },
  {
    id: "users" as AdminRoute,
    label: "Users & Owners",
    icon: Users,
    emoji: "👥",
  },
  {
    id: "categories" as AdminRoute,
    label: "Category Architect",
    icon: Grid3X3,
    emoji: "🏗️",
  },
  {
    id: "support" as AdminRoute,
    label: "Support Inbox",
    icon: Headphones,
    emoji: "🎫",
  },
  {
    id: "broadcast" as AdminRoute,
    label: "Broadcast",
    icon: Radio,
    emoji: "📢",
  },
];

function AdminLoader() {
  return (
    <div className="flex items-center justify-center h-full min-h-[200px]">
      <div className="flex flex-col items-center gap-2">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center animate-pulse"
          style={{ backgroundColor: "#FF6B35" }}
        >
          <span className="text-white font-bold text-sm">P</span>
        </div>
        <p className="text-sm" style={{ color: "#94a3b8" }}>
          Loading…
        </p>
      </div>
    </div>
  );
}

function Sidebar({
  active,
  onNavigate,
  onLogout,
  collapsed,
  onToggle,
}: {
  active: AdminRoute;
  onNavigate: (r: AdminRoute) => void;
  onLogout: () => void;
  collapsed: boolean;
  onToggle: () => void;
}) {
  return (
    <aside
      className="flex flex-col h-full"
      style={{
        backgroundColor: "#1A1A2E",
        width: collapsed ? "64px" : "240px",
        transition: "width 0.2s ease",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-4 py-5 border-b"
        style={{ borderColor: "#2d2d4a" }}
      >
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "#FF6B35" }}
        >
          <span className="text-white font-bold text-sm">P</span>
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p
              className="font-bold font-display text-base leading-none"
              style={{ color: "#ffffff" }}
            >
              Pondy<span style={{ color: "#FF6B35" }}>One</span>
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>
              Founder Panel
            </p>
          </div>
        )}
        <button
          type="button"
          onClick={onToggle}
          className="ml-auto p-1 rounded-lg transition-colors flex-shrink-0"
          style={{ color: "#94a3b8" }}
          aria-label="Toggle sidebar"
        >
          {collapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              type="button"
              data-ocid={`admin-nav-${item.id}`}
              onClick={() => onNavigate(item.id)}
              title={collapsed ? item.label : undefined}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors relative focus-visible:outline-none"
              style={{
                color: isActive ? "#FF6B35" : "#94a3b8",
                backgroundColor: isActive
                  ? "rgba(255,107,53,0.1)"
                  : "transparent",
                borderLeft: isActive
                  ? "3px solid #FF6B35"
                  : "3px solid transparent",
              }}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t py-3 px-4" style={{ borderColor: "#2d2d4a" }}>
        {!collapsed && (
          <p className="text-xs mb-3 truncate" style={{ color: "#64748b" }}>
            📞 {ADMIN_PHONE}
          </p>
        )}
        <button
          type="button"
          onClick={onLogout}
          data-ocid="admin-logout"
          title="Logout"
          className="flex items-center gap-2 text-sm font-medium transition-colors w-full px-1 py-1 rounded-lg hover:opacity-80"
          style={{ color: "#ef4444" }}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

export default function AdminApp() {
  const [route, setRoute] = useState<AdminRoute>(() => {
    const session = getSession();
    if (!session || session.role !== "admin") return "login";
    const r = getRouteFromPath();
    return r === "login" ? "dashboard" : r;
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const isAuthenticated = getSession()?.role === "admin";

  useEffect(() => {
    const handlePopState = () => {
      const r = getRouteFromPath();
      setRoute(r);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  function navigate(r: AdminRoute) {
    setRouteInPath(r);
    setRoute(r);
    setMobileSidebarOpen(false);
  }

  function handleLogin() {
    navigate("dashboard");
  }

  function handleLogout() {
    clearSession();
    navigate("login");
  }

  if (!isAuthenticated || route === "login") {
    return (
      <Suspense fallback={<AdminLoader />}>
        <AdminLogin onLogin={handleLogin} />
      </Suspense>
    );
  }

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ backgroundColor: "#0f0f1e" }}
    >
      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") setMobileSidebarOpen(false);
          }}
          role="button"
          tabIndex={-1}
          aria-label="Close sidebar"
        />
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-shrink-0">
        <Sidebar
          active={route}
          onNavigate={navigate}
          onLogout={handleLogout}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((c) => !c)}
        />
      </div>

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 flex lg:hidden transition-transform duration-200 ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar
          active={route}
          onNavigate={navigate}
          onLogout={handleLogout}
          collapsed={false}
          onToggle={() => setMobileSidebarOpen(false)}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-background">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-border bg-card">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(true)}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-foreground" />
          </button>
          <p className="font-bold font-display" style={{ color: "#1A1A2E" }}>
            Pondy<span style={{ color: "#FF6B35" }}>One</span>
          </p>
          <span className="text-xs text-muted-foreground ml-auto">
            Founder Panel
          </span>
        </div>

        <main className="flex-1 overflow-y-auto">
          <Suspense fallback={<AdminLoader />}>
            {route === "dashboard" && (
              <AdminDashboard onNavigate={(r) => navigate(r as AdminRoute)} />
            )}
            {route === "users" && <AdminUsers />}
            {route === "categories" && <AdminCategories />}
            {route === "support" && <AdminSupport />}
            {route === "broadcast" && <AdminBroadcast />}
          </Suspense>
        </main>
      </div>
    </div>
  );
}
