import { useSignin } from "@/hooks/useQueries";
import { saveSession } from "@/lib/auth";
import { SAFFRON } from "@/lib/constants";
import { Eye, EyeOff, Lock, Phone } from "lucide-react";
import { useState } from "react";

interface Props {
  onNavigateToSignup: () => void;
  onNavigateToAdmin: () => void;
  onSuccess: (role: "user" | "owner" | "admin") => void;
}

export default function SignIn({
  onNavigateToSignup,
  onNavigateToAdmin,
  onSuccess,
}: Props) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");

  const signin = useSignin();
  const isBackendReady = signin.isBackendReady;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!phone.trim() || !password.trim()) {
      setError("Please enter your phone number and password.");
      return;
    }
    try {
      const result = await signin.mutateAsync({
        phone: phone.trim(),
        password,
      });
      if (result.__kind__ === "ok") {
        const user = result.ok;
        if (user.isBanned) {
          setError("Your account has been suspended. Contact support.");
          return;
        }
        const role = user.role as "user" | "owner" | "admin";
        saveSession({
          userId: user.id,
          role,
          phone: user.phone,
          name: user.name,
          token: `${user.id}_${Date.now()}`,
        });
        onSuccess(role);
      } else {
        setError(result.err ?? "Invalid phone number or password.");
      }
    } catch {
      setError("Sign in failed. Please try again.");
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-5"
      style={{
        background: `linear-gradient(160deg, ${SAFFRON}12 0%, transparent 60%)`,
        backgroundColor: "#fafaf9",
      }}
    >
      <div className="w-full max-w-sm">
        {/* Branding */}
        <div className="text-center mb-8">
          <div
            className="inline-flex w-16 h-16 rounded-2xl items-center justify-center mb-4 shadow-lg"
            style={{ backgroundColor: SAFFRON }}
          >
            <span className="text-white font-bold text-3xl font-display">
              P
            </span>
          </div>
          <h1
            className="text-3xl font-bold font-display"
            style={{ color: "#1A1A2E" }}
          >
            Pondy<span style={{ color: SAFFRON }}>One</span>
          </h1>
          <p className="text-sm mt-1 text-muted-foreground">
            Puducherry's Own Marketplace
          </p>
        </div>

        {/* Card */}
        <div className="bg-card rounded-2xl shadow-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-5">
            Sign In
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="signin-phone"
                className="text-sm font-medium text-foreground"
              >
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="signin-phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  data-ocid="signin-phone"
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 transition-colors"
                  style={{ "--tw-ring-color": SAFFRON } as React.CSSProperties}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="signin-password"
                className="text-sm font-medium text-foreground"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="signin-password"
                  type={showPwd ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  data-ocid="signin-password"
                  className="w-full h-12 pl-10 pr-11 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPwd ? "Hide password" : "Show password"}
                >
                  {showPwd ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-sm text-destructive bg-destructive/10 rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              data-ocid="signin-submit"
              disabled={signin.isPending || !isBackendReady}
              className="w-full h-12 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-50 mt-1"
              style={{ backgroundColor: SAFFRON }}
            >
              {!isBackendReady
                ? "Connecting…"
                : signin.isPending
                  ? "Signing in…"
                  : "Sign In"}
            </button>
          </form>

          {/* Sign Up link */}
          <div className="mt-5 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={onNavigateToSignup}
                data-ocid="goto-signup"
                className="font-semibold transition-colors hover:opacity-80"
                style={{ color: SAFFRON }}
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>

        {/* Admin link */}
        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={onNavigateToAdmin}
            data-ocid="goto-admin-login"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Admin Login →
          </button>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Serving Puducherry &amp; Chennai 📍
        </p>
      </div>
    </div>
  );
}
