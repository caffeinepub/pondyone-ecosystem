import { useNavigate } from "@tanstack/react-router";
import { type ReactNode, useEffect } from "react";
import { getSession } from "../lib/auth";

interface AuthGuardProps {
  children: ReactNode;
  requiredRole: "user" | "owner" | "admin";
}

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const session = getSession();
    if (!session) {
      navigate({ to: "/" });
      return;
    }
    if (session.role !== requiredRole) {
      // Redirect to correct app based on actual role
      const roleRoutes: Record<string, string> = {
        user: "/user",
        owner: "/owner",
        admin: "/admin",
      };
      navigate({ to: roleRoutes[session.role] ?? "/" });
    }
  }, [navigate, requiredRole]);

  const session = getSession();
  if (!session || session.role !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground text-sm animate-pulse">
          Checking access...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
