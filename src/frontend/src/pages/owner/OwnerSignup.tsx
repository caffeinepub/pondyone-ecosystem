import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { UserRole, useSignup } from "@/hooks/useQueries";
import { saveSession } from "@/lib/auth";
import { DEFAULT_LOCATION, SAFFRON } from "@/lib/constants";
import { useState } from "react";
import type { OwnerPage } from "./OwnerApp";

interface Props {
  navigate: (page: OwnerPage) => void;
  navigateHome: () => void;
}

export default function OwnerSignup({ navigate, navigateHome }: Props) {
  const signup = useSignup();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [locationText, setLocationText] = useState<string>(
    DEFAULT_LOCATION.text,
  );
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (phone.length !== 10) {
      setError("Enter a valid 10-digit phone number.");
      return;
    }
    try {
      const result = await signup.mutateAsync({
        name,
        phone,
        password,
        role: UserRole.owner,
        gpsLat: DEFAULT_LOCATION.lat,
        gpsLng: DEFAULT_LOCATION.lng,
        locationText,
      });
      if (result.__kind__ === "err") {
        setError(result.err);
        return;
      }
      const user = result.ok;
      saveSession({
        userId: user.id,
        role: "owner",
        phone: user.phone,
        name: user.name,
        token: user.id,
        onboardingDone: false,
      });
      navigate("onboarding");
    } catch {
      setError("Signup failed. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="pt-10 pb-6 px-6 text-center">
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 shadow-elevated"
          style={{ backgroundColor: SAFFRON }}
        >
          <span className="text-white text-2xl font-bold font-display">P</span>
        </div>
        <h1 className="text-2xl font-bold font-display text-foreground">
          Join as <span style={{ color: SAFFRON }}>Business Owner</span>
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Start selling on PondyOne today
        </p>
      </div>

      <div className="flex-1 px-6 pb-12 max-w-sm mx-auto w-full">
        <AppCard>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="sig-name"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Your Name
              </label>
              <input
                id="sig-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                required
                data-ocid="owner-signup-name"
                className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <label
                htmlFor="sig-phone"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Phone Number
              </label>
              <input
                id="sig-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit mobile number"
                maxLength={10}
                required
                data-ocid="owner-signup-phone"
                className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <label
                htmlFor="sig-loc"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Business Location
              </label>
              <input
                id="sig-loc"
                type="text"
                value={locationText}
                onChange={(e) => setLocationText(e.target.value)}
                placeholder="e.g. White Town, Puducherry"
                data-ocid="owner-signup-location"
                className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <label
                htmlFor="sig-pw"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Password
              </label>
              <input
                id="sig-pw"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                required
                data-ocid="owner-signup-password"
                className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <label
                htmlFor="sig-cpw"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Confirm Password
              </label>
              <input
                id="sig-cpw"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat your password"
                required
                data-ocid="owner-signup-confirm"
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
              disabled={signup.isPending}
              data-ocid="owner-signup-submit"
            >
              {signup.isPending ? "Creating account…" : "Create Owner Account"}
            </AppButton>
          </form>
        </AppCard>

        <div className="text-center mt-6 space-y-3">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("onboarding")}
              className="font-semibold focus-visible:outline-none"
              style={{ color: SAFFRON }}
            >
              Sign in
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
