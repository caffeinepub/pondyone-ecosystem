import { AppButton } from "@/components/ui/AppButton";
import { useSignin } from "@/hooks/useQueries";
import { saveSession } from "@/lib/auth";
import { ADMIN_PHONE } from "@/lib/constants";
import { Eye, EyeOff, Lock, Phone } from "lucide-react";
import { useState } from "react";

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [phone, setPhone] = useState(ADMIN_PHONE);
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const signin = useSignin();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const result = await signin.mutateAsync({ phone, password });
      if (result.__kind__ === "ok") {
        const user = result.ok;
        if (user.role !== "admin") {
          setError("Access denied. This panel is for admins only.");
          return;
        }
        saveSession({
          userId: user.id,
          role: "admin",
          phone: user.phone,
          name: user.name,
          token: `admin_${Date.now()}`,
        });
        onLogin();
      } else {
        setError(result.err ?? "Invalid credentials");
      }
    } catch {
      setError("Login failed. Please try again.");
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#0f0f1e" }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="inline-flex w-16 h-16 rounded-2xl items-center justify-center mb-4 shadow-lg"
            style={{ backgroundColor: "#FF6B35" }}
          >
            <span className="text-white font-bold text-3xl font-display">
              P
            </span>
          </div>
          <h1 className="text-2xl font-bold font-display text-white">
            Pondy<span style={{ color: "#FF6B35" }}>One</span>
          </h1>
          <p className="text-sm mt-1" style={{ color: "#94a3b8" }}>
            Founder Admin Panel
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-6 shadow-xl border"
          style={{ backgroundColor: "#1A1A2E", borderColor: "#2d2d4a" }}
        >
          <h2 className="text-lg font-semibold text-white mb-5">
            Sign in to continue
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Phone */}
            <div>
              <label
                htmlFor="admin-phone"
                className="block text-xs font-medium mb-1.5"
                style={{ color: "#94a3b8" }}
              >
                Phone Number
              </label>
              <div className="relative">
                <Phone
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "#64748b" }}
                />
                <input
                  id="admin-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                  data-ocid="admin-login-phone"
                  className="w-full h-11 pl-10 pr-4 rounded-xl text-sm focus:outline-none focus:ring-2 border"
                  style={{
                    backgroundColor: "#0f0f1e",
                    borderColor: "#2d2d4a",
                    color: "#ffffff",
                    // @ts-ignore
                    "--tw-ring-color": "#FF6B35",
                  }}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-medium mb-1.5"
                style={{ color: "#94a3b8" }}
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "#64748b" }}
                />
                <input
                  id="admin-password"
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  data-ocid="admin-login-password"
                  className="w-full h-11 pl-10 pr-10 rounded-xl text-sm focus:outline-none focus:ring-2 border"
                  style={{
                    backgroundColor: "#0f0f1e",
                    borderColor: "#2d2d4a",
                    color: "#ffffff",
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5"
                  aria-label="Toggle password visibility"
                  style={{ color: "#64748b" }}
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
              <div
                className="rounded-xl px-4 py-3 text-sm"
                style={{
                  backgroundColor: "rgba(239,68,68,0.15)",
                  color: "#ef4444",
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              data-ocid="admin-login-submit"
              disabled={signin.isPending}
              className="w-full h-11 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-50 mt-1"
              style={{ backgroundColor: "#FF6B35" }}
            >
              {signin.isPending ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: "#475569" }}>
          PondyOne Founder Control Panel · Puducherry &amp; Chennai
        </p>
      </div>
    </div>
  );
}
