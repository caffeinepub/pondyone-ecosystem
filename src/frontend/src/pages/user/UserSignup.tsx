import { useState } from "react";
import { AppButton } from "../../components/ui/AppButton";
import { UserRole, useSignup } from "../../hooks/useQueries";
import { saveSession } from "../../lib/auth";
import { DEFAULT_LOCATION, SAFFRON } from "../../lib/constants";

interface Props {
  navigateLogin: () => void;
  onSuccess: () => void;
}

export default function UserSignup({ navigateLogin, onSuccess }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState<string>(DEFAULT_LOCATION.text);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const signup = useSignup();

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Name is required.";
    if (!/^\d{10}$/.test(phone.trim()))
      e.phone = "Enter a valid 10-digit phone number.";
    if (password.length < 6)
      e.password = "Password must be at least 6 characters.";
    if (!location.trim()) e.location = "Location is required.";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});

    try {
      const result = await signup.mutateAsync({
        name: name.trim(),
        phone: phone.trim(),
        password,
        role: UserRole.user,
        gpsLat: DEFAULT_LOCATION.lat,
        gpsLng: DEFAULT_LOCATION.lng,
        locationText: location.trim(),
      });
      if (result.__kind__ === "ok") {
        const user = result.ok;
        saveSession({
          userId: user.id,
          role: "user",
          phone: user.phone,
          name: user.name,
          token: `${user.id}_${Date.now()}`,
        });
        onSuccess();
      } else {
        setErrors({
          form: result.err ?? "Signup failed. Try a different phone number.",
        });
      }
    } catch {
      setErrors({ form: "Signup failed. Please try again." });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div
        className="pt-12 pb-8 px-6 text-center"
        style={{
          background: `linear-gradient(145deg, ${SAFFRON}15, transparent)`,
        }}
      >
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-elevated"
          style={{ backgroundColor: SAFFRON }}
        >
          <span className="text-white text-2xl font-bold font-display">P</span>
        </div>
        <h1
          className="text-2xl font-bold font-display"
          style={{ color: "#1A1A2E" }}
        >
          Create Account
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Join PondyOne today
        </p>
      </div>

      <div className="flex-1 px-6 pb-8 max-w-sm mx-auto w-full">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          noValidate
        >
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="su-name"
            >
              Full Name
            </label>
            <input
              id="su-name"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              data-ocid="signup-name"
              className="h-12 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
            />
            {errors.name && (
              <span className="text-xs text-destructive">{errors.name}</span>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="su-phone"
            >
              Phone Number
            </label>
            <input
              id="su-phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="10-digit mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              data-ocid="signup-phone"
              className="h-12 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
            />
            {errors.phone && (
              <span className="text-xs text-destructive">{errors.phone}</span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="su-password"
            >
              Password
            </label>
            <input
              id="su-password"
              type="password"
              autoComplete="new-password"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              data-ocid="signup-password"
              className="h-12 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
            />
            {errors.password && (
              <span className="text-xs text-destructive">
                {errors.password}
              </span>
            )}
          </div>

          {/* Location */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="su-location"
            >
              Your Location
            </label>
            <input
              id="su-location"
              type="text"
              placeholder="e.g. White Town, Puducherry"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              data-ocid="signup-location"
              className="h-12 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
            />
            {errors.location && (
              <span className="text-xs text-destructive">
                {errors.location}
              </span>
            )}
          </div>

          {errors.form && (
            <div className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
              {errors.form}
            </div>
          )}

          <AppButton
            type="submit"
            fullWidth
            size="lg"
            disabled={signup.isPending}
            data-ocid="signup-submit"
          >
            {signup.isPending ? "Creating account…" : "Create Account"}
          </AppButton>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <button
              type="button"
              onClick={navigateLogin}
              className="font-semibold focus-visible:outline-none"
              style={{ color: SAFFRON }}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
