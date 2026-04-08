import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useNavigate,
} from "@tanstack/react-router";
import { Suspense, lazy, useEffect, useState } from "react";
import { getSession } from "./lib/auth";

// Lazy-loaded app sections
const UserApp = lazy(() => import("./pages/user/UserApp"));
const OwnerApp = lazy(() => import("./pages/owner/OwnerApp"));
const AdminApp = lazy(() => import("./pages/admin/AdminApp"));
const SignIn = lazy(() => import("./pages/auth/SignIn"));
const SignUp = lazy(() => import("./pages/auth/SignUp"));

// Loading fallback
function AppLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: "#FF6B35" }}
        >
          <span className="text-white text-xl font-bold font-display">P</span>
        </div>
        <div className="text-sm text-muted-foreground animate-pulse">
          Loading PondyOne…
        </div>
      </div>
    </div>
  );
}

// ─── Auth screen (root "/") ──────────────────────────────────────────────────
type AuthView = "signin" | "signup";

function AuthRoot() {
  const navigate = useNavigate();
  const [view, setView] = useState<AuthView>("signin");

  // Redirect if already logged in
  useEffect(() => {
    const session = getSession();
    if (session) {
      const routes: Record<string, string> = {
        user: "/user",
        owner: "/owner",
        admin: "/admin",
      };
      navigate({ to: routes[session.role] ?? "/user" });
    }
  }, [navigate]);

  function handleSigninSuccess(role: "user" | "owner" | "admin") {
    const routes: Record<string, string> = {
      user: "/user",
      owner: "/owner",
      admin: "/admin",
    };
    navigate({ to: routes[role] ?? "/user" });
  }

  function handleSignupSuccess(role: "user" | "owner") {
    navigate({ to: role === "owner" ? "/owner" : "/user" });
  }

  if (view === "signup") {
    return (
      <Suspense fallback={<AppLoader />}>
        <SignUp
          onNavigateToSignin={() => setView("signin")}
          onSuccess={handleSignupSuccess}
        />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<AppLoader />}>
      <SignIn
        onNavigateToSignup={() => setView("signup")}
        onNavigateToAdmin={() => navigate({ to: "/admin-login" })}
        onSuccess={handleSigninSuccess}
      />
    </Suspense>
  );
}

// ─── Signup route ("/signup") ────────────────────────────────────────────────
function SignupRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    const session = getSession();
    if (session) {
      const routes: Record<string, string> = {
        user: "/user",
        owner: "/owner",
        admin: "/admin",
      };
      navigate({ to: routes[session.role] ?? "/user" });
    }
  }, [navigate]);

  return (
    <Suspense fallback={<AppLoader />}>
      <SignUp
        onNavigateToSignin={() => navigate({ to: "/" })}
        onSuccess={(role) =>
          navigate({ to: role === "owner" ? "/owner" : "/user" })
        }
      />
    </Suspense>
  );
}

// ─── Admin login route ("/admin-login") ─────────────────────────────────────
function AdminLoginRoute() {
  return (
    <Suspense fallback={<AppLoader />}>
      <AdminApp />
    </Suspense>
  );
}

// ─── Routes ──────────────────────────────────────────────────────────────────
const rootRoute = createRootRoute({ component: () => <Outlet /> });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: AuthRoot,
});

const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: SignupRoute,
});

const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin-login",
  component: AdminLoginRoute,
});

const userRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/user",
  component: () => (
    <Suspense fallback={<AppLoader />}>
      <UserApp />
    </Suspense>
  ),
});

const userWildcardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/user/$",
  component: () => (
    <Suspense fallback={<AppLoader />}>
      <UserApp />
    </Suspense>
  ),
});

const ownerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/owner",
  component: () => (
    <Suspense fallback={<AppLoader />}>
      <OwnerApp />
    </Suspense>
  ),
});

const ownerWildcardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/owner/$",
  component: () => (
    <Suspense fallback={<AppLoader />}>
      <OwnerApp />
    </Suspense>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <Suspense fallback={<AppLoader />}>
      <AdminApp />
    </Suspense>
  ),
});

const adminWildcardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/$",
  component: () => (
    <Suspense fallback={<AppLoader />}>
      <AdminApp />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  signupRoute,
  adminLoginRoute,
  userRoute,
  userWildcardRoute,
  ownerRoute,
  ownerWildcardRoute,
  adminRoute,
  adminWildcardRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
