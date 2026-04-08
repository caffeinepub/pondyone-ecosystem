import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { useSignin } from "@/hooks/useQueries";
import { saveSession } from "@/lib/auth";
import { SAFFRON } from "@/lib/constants";
import { useState } from "react";
import type { OwnerPage } from "./OwnerApp";

interface Props {
  navigate: (page: OwnerPage) => void;
  navigateHome: () => void;
}

export default function OwnerLogin({ navigate, navigateHome }: Props) {
  const signin = useSignin();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const result = await signin.mutateAsync({ phone, password });
      if (result.__kind__ === "err") {
        setError(result.err);
        return;
      }
      const user = result.ok;
      if (user.role !== "owner") {
        setError("This account is not an owner account.");
        return;
      }
      const ownerData = user as { businessName?: string };
      saveSession({
        userId: user.id,
        role: "owner",
        phone: user.phone,
        name: user.name,
        token: user.id,
        onboardingDone: !!ownerData.businessName,
      });
      if (!ownerData.businessName) {
        navigate("onboarding");
      } else {
        navigate("dashboard");
      }
    } catch {
      setError("Invalid phone number or password.");
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="pt-12 pb-8 px-6 text-center">
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 shadow-elevated"
          style={{ backgroundColor: SAFFRON }}
        >
          <span className="text-white text-2xl font-bold font-display">P</span>
        </div>
        <h1 className="text-2xl font-bold font-display text-foreground">
          Owner <span style={{ color: SAFFRON }}>Login</span>
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your business on PondyOne
        </p>
      </div>

      <div className="flex-1 px-6 pb-12 max-w-sm mx-auto w-full">
        <AppCard>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="login-phone"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Phone Number
              </label>
              <input
                id="login-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit mobile number"
                required
                data-ocid="owner-login-phone"
                className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <label
                htmlFor="login-password"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Password
              </label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                data-ocid="owner-login-password"
                className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
              />
            </div>
            {error && (
              <div className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
                {error}
              </div>
            )}
            <AppButton
              type="submit"
              fullWidth
              size="lg"
              disabled={signin.isPending}
              data-ocid="owner-login-submit"
            >
              {signin.isPending ? "Signing in…" : "Sign In"}
            </AppButton>
          </form>
        </AppCard>

        <div className="text-center mt-6 space-y-3">
          <p className="text-sm text-muted-foreground">
            New to PondyOne?{" "}
            <button
              type="button"
              onClick={() => navigate("onboarding")}
              className="font-semibold focus-visible:outline-none"
              style={{ color: SAFFRON }}
            >
              Register your business
            </button>
          </p>
          <button
            type="button"
            onClick={navigateHome}
            className="text-xs text-muted-foreground underline focus-visible:outline-none"
          >
            ← Back to home
          </button>
        </div>
      </div>
    </div>
  );
}
