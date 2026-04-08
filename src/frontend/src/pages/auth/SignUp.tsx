import { UserRole, useSignup } from "@/hooks/useQueries";
import { saveSession } from "@/lib/auth";
import { DEFAULT_LOCATION, SAFFRON } from "@/lib/constants";
import { Eye, EyeOff, Lock, MapPin, Phone, User } from "lucide-react";
import { useState } from "react";

type SelectedRole = "user" | "owner";

interface Props {
  onNavigateToSignin: () => void;
  onSuccess: (role: SelectedRole) => void;
}

export default function SignUp({ onNavigateToSignin, onSuccess }: Props) {
  const [selectedRole, setSelectedRole] = useState<SelectedRole>("user");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState<string>(DEFAULT_LOCATION.text);
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const signup = useSignup();
  const isBackendReady = signup.isBackendReady;

  function validate(): Record<string, string> {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Full name is required.";
    if (!/^\d{10}$/.test(phone.trim()))
      e.phone = "Enter a valid 10-digit phone number.";
    if (password.length < 6)
      e.password = "Password must be at least 6 characters.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
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
        role: selectedRole === "owner" ? UserRole.owner : UserRole.user,
        gpsLat: DEFAULT_LOCATION.lat,
        gpsLng: DEFAULT_LOCATION.lng,
        locationText: location.trim() || DEFAULT_LOCATION.text,
      });

      if (result.__kind__ === "ok") {
        const user = result.ok;
        saveSession({
          userId: user.id,
          role: selectedRole,
          phone: user.phone,
          name: user.name,
          token: `${user.id}_${Date.now()}`,
        });
        onSuccess(selectedRole);
      } else {
        setErrors({
          form: result.err ?? "Sign up failed. Try a different phone number.",
        });
      }
    } catch {
      setErrors({ form: "Sign up failed. Please try again." });
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
        <div className="text-center mb-6">
          <div
            className="inline-flex w-14 h-14 rounded-2xl items-center justify-center mb-3 shadow-lg"
            style={{ backgroundColor: SAFFRON }}
          >
            <span className="text-white font-bold text-2xl font-display">
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
            Create your account
          </p>
        </div>

        {/* Card */}
        <div className="bg-card rounded-2xl shadow-lg border border-border p-6">
          {/* Role toggle */}
          <div className="mb-5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
              I am a…
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                data-ocid="role-toggle-customer"
                onClick={() => setSelectedRole("user")}
                className="flex-1 h-11 rounded-xl text-sm font-semibold transition-all"
                style={{
                  backgroundColor:
                    selectedRole === "user" ? SAFFRON : "#f1f1f1",
                  color: selectedRole === "user" ? "#ffffff" : "#374151",
                }}
              >
                🛍️ Customer
              </button>
              <button
                type="button"
                data-ocid="role-toggle-owner"
                onClick={() => setSelectedRole("owner")}
                className="flex-1 h-11 rounded-xl text-sm font-semibold transition-all"
                style={{
                  backgroundColor:
                    selectedRole === "owner" ? SAFFRON : "#f1f1f1",
                  color: selectedRole === "owner" ? "#ffffff" : "#374151",
                }}
              >
                🏪 Business Owner
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="su-name"
                className="text-sm font-medium text-foreground"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="su-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  data-ocid="signup-name"
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 transition-colors"
                />
              </div>
              {errors.name && (
                <span className="text-xs text-destructive">{errors.name}</span>
              )}
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="su-phone"
                className="text-sm font-medium text-foreground"
              >
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="su-phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  data-ocid="signup-phone"
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 transition-colors"
                />
              </div>
              {errors.phone && (
                <span className="text-xs text-destructive">{errors.phone}</span>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="su-password"
                className="text-sm font-medium text-foreground"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="su-password"
                  type={showPwd ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  data-ocid="signup-password"
                  className="w-full h-12 pl-10 pr-11 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 transition-colors"
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
              {errors.password && (
                <span className="text-xs text-destructive">
                  {errors.password}
                </span>
              )}
            </div>

            {/* Location (optional) */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="su-location"
                className="text-sm font-medium text-foreground"
              >
                City / Area{" "}
                <span className="text-muted-foreground font-normal">
                  (optional)
                </span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="su-location"
                  type="text"
                  placeholder="e.g. White Town, Puducherry"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  data-ocid="signup-location"
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 transition-colors"
                />
              </div>
            </div>

            {errors.form && (
              <div className="text-sm text-destructive bg-destructive/10 rounded-xl px-4 py-3">
                {errors.form}
              </div>
            )}

            <button
              type="submit"
              data-ocid="signup-submit"
              disabled={signup.isPending || !isBackendReady}
              className="w-full h-12 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-50 mt-1"
              style={{ backgroundColor: SAFFRON }}
            >
              {!isBackendReady
                ? "Connecting…"
                : signup.isPending
                  ? "Creating account…"
                  : selectedRole === "owner"
                    ? "Register as Business Owner"
                    : "Create Account"}
            </button>
          </form>

          {/* Sign In link */}
          <div className="mt-5 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                type="button"
                onClick={onNavigateToSignin}
                data-ocid="goto-signin"
                className="font-semibold transition-colors hover:opacity-80"
                style={{ color: SAFFRON }}
              >
                Sign In
              </button>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Serving Puducherry &amp; Chennai 📍
        </p>
      </div>
    </div>
  );
}
