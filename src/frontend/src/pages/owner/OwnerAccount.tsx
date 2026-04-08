import { CategoryBadge } from "@/components/ui/AppBadge";
import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { useGetOwnerById, useUpdateOwnerProfile } from "@/hooks/useQueries";
import { clearSession, getSession, updateSession } from "@/lib/auth";
import { SAFFRON } from "@/lib/constants";
import { useState } from "react";
import type { OwnerPage as _OwnerPage } from "./OwnerApp";

interface Props {
  navigate: (page: _OwnerPage) => void;
  navigateHome: () => void;
}

export default function OwnerAccount({ navigateHome }: Props) {
  const session = getSession();
  const ownerId = session?.userId ?? "";
  const { data: owner, isLoading } = useGetOwnerById(ownerId);
  const updateProfile = useUpdateOwnerProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [upiId, setUpiId] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [saved, setSaved] = useState(false);

  function startEdit() {
    setBusinessName(owner?.businessName ?? "");
    setUpiId(owner?.upiId ?? "");
    setIsActive(owner?.isActive ?? true);
    setIsEditing(true);
  }

  async function handleSave() {
    if (!businessName.trim()) return;
    await updateProfile.mutateAsync({
      id: ownerId,
      businessName,
      upiId,
      isActive,
    });
    updateSession({ name: businessName });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setIsEditing(false);
  }

  function handleLogout() {
    clearSession();
    navigateHome();
  }

  const category = owner?.category ?? "food";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 pt-10 pb-6">
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-card"
            style={{ backgroundColor: `${SAFFRON}20` }}
          >
            🏪
          </div>
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <div className="space-y-2">
                <div className="h-5 w-40 bg-muted rounded animate-pulse" />
                <div className="h-4 w-24 bg-muted rounded animate-pulse" />
              </div>
            ) : (
              <>
                <h1 className="text-lg font-bold font-display text-foreground truncate">
                  {owner?.businessName || session?.name || "Business Owner"}
                </h1>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <CategoryBadge
                    category={category as "food" | "stay" | "play" | "retail"}
                  />
                  {owner?.isVerified ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold">
                      ✓ Verified
                    </span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold">
                      Unverified
                    </span>
                  )}
                  {owner?.isActive ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-semibold">
                      Active
                    </span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-semibold">
                      Inactive
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-5 max-w-lg mx-auto space-y-4">
        {/* Profile info */}
        {!isEditing ? (
          <AppCard>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold font-display text-foreground">
                  Business Info
                </h2>
                <AppButton
                  size="sm"
                  variant="outline"
                  onClick={startEdit}
                  data-ocid="edit-profile-btn"
                >
                  Edit
                </AppButton>
              </div>
              <div className="space-y-3">
                <InfoRow
                  label="Business Name"
                  value={owner?.businessName || "—"}
                />
                <InfoRow label="UPI ID" value={owner?.upiId || "—"} />
                <InfoRow label="Phone" value={session?.phone || "—"} />
                <InfoRow label="Location" value={owner?.locationText || "—"} />
                <InfoRow
                  label="Status"
                  value={owner?.isActive ? "Active" : "Inactive"}
                />
              </div>
            </div>
          </AppCard>
        ) : (
          <AppCard>
            <div className="space-y-4">
              <h2 className="text-sm font-bold font-display text-foreground">
                Edit Profile
              </h2>
              <div>
                <label
                  htmlFor="acc-biz-name"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Business Name
                </label>
                <input
                  id="acc-biz-name"
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="acc-upi"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  UPI ID
                </label>
                <input
                  id="acc-upi"
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="e.g. business@paytm"
                  className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Accepting Orders?
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Customers can only book active businesses
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsActive((v) => !v)}
                  className="w-12 h-6 rounded-full transition-colors focus-visible:outline-none"
                  style={{ backgroundColor: isActive ? "#22C55E" : "#d1d5db" }}
                  aria-label="Toggle active status"
                >
                  <span
                    className="block w-5 h-5 rounded-full bg-white shadow transition-transform mx-0.5"
                    style={{
                      transform: isActive
                        ? "translateX(24px)"
                        : "translateX(0)",
                    }}
                  />
                </button>
              </div>
              <div className="flex gap-3">
                <AppButton
                  variant="outline"
                  fullWidth
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </AppButton>
                <AppButton
                  fullWidth
                  onClick={handleSave}
                  disabled={!businessName.trim() || updateProfile.isPending}
                  data-ocid="save-profile-btn"
                >
                  {updateProfile.isPending ? "Saving…" : "Save Changes"}
                </AppButton>
              </div>
              {saved && (
                <p className="text-sm text-center" style={{ color: "#22C55E" }}>
                  ✓ Profile updated!
                </p>
              )}
            </div>
          </AppCard>
        )}

        {/* Stats */}
        <AppCard>
          <h2 className="text-sm font-bold font-display text-foreground mb-3">
            Account Details
          </h2>
          <div className="space-y-3">
            <InfoRow label="Owner ID" value={`#${ownerId.slice(0, 8)}…`} />
            <InfoRow label="Role" value="Business Owner" />
            <InfoRow
              label="Member Since"
              value={
                owner?.createdAt
                  ? new Date(
                      Number(owner.createdAt / 1_000_000n),
                    ).toLocaleDateString("en-IN")
                  : "—"
              }
            />
          </div>
        </AppCard>

        {/* Logout */}
        <AppButton
          variant="danger"
          fullWidth
          size="lg"
          onClick={handleLogout}
          data-ocid="owner-logout"
        >
          Sign Out
        </AppButton>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground pb-4">
          © {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Built with love using caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-foreground text-right truncate max-w-[60%]">
        {value}
      </p>
    </div>
  );
}
