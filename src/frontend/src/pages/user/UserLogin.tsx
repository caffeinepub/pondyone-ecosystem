import { useState } from "react";
import { AppButton } from "../../components/ui/AppButton";
import { useSignin } from "../../hooks/useQueries";
import { saveSession } from "../../lib/auth";
import { SAFFRON } from "../../lib/constants";

interface Props {
  navigateHome: () => void;
  navigateSignup: () => void;
}

export default function UserLogin({ navigateHome, navigateSignup }: Props) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signin = useSignin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!phone.trim() || !password.trim()) {
      setError("Please enter phone and password.");
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
          setError("Your account has been banned. Contact support.");
          return;
        }
        if (user.role !== "user") {
          setError(
            "This account is not a customer account. Please use the correct login.",
          );
          return;
        }
        saveSession({
          userId: user.id,
          role: "user",
          phone: user.phone,
          name: user.name,
          token: `${user.id}_${Date.now()}`,
        });
        navigateHome();
      } else {
        setError(result.err ?? "Invalid phone or password.");
      }
    } catch {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero */}
      <div
        className="pt-16 pb-10 px-6 text-center"
        style={{
          background: `linear-gradient(145deg, ${SAFFRON}15, transparent)`,
        }}
      >
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-elevated"
          style={{ backgroundColor: SAFFRON }}
        >
          <span className="text-white text-3xl font-bold font-display">P</span>
        </div>
        <h1
          className="text-3xl font-bold font-display"
          style={{ color: "#1A1A2E" }}
        >
          Pondy<span style={{ color: SAFFRON }}>One</span>
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Sign in to your account
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 pb-8 max-w-sm mx-auto w-full">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          noValidate
        >
          <div className="flex flex-col gap-1.5">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="10-digit mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              data-ocid="login-phone"
              className="h-12 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              data-ocid="login-password"
              className="h-12 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
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
            data-ocid="login-submit"
          >
            {signin.isPending ? "Signing in…" : "Sign In"}
          </AppButton>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            New to PondyOne?{" "}
            <button
              type="button"
              onClick={navigateSignup}
              className="font-semibold focus-visible:outline-none"
              style={{ color: SAFFRON }}
              data-ocid="go-to-signup"
            >
              Create account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
