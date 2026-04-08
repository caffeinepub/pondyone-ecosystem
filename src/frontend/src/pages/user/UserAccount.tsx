import { useState } from "react";
import { AppButton } from "../../components/ui/AppButton";
import { useGetUserById, useUpdateUserProfile } from "../../hooks/useQueries";
import { clearSession, getSession, updateSession } from "../../lib/auth";
import { DEFAULT_LOCATION, SAFFRON } from "../../lib/constants";
import type { UserRoute } from "./UserApp";

interface Props {
  navigate: (r: UserRoute) => void;
  onLogout?: () => void;
}

export default function UserAccount({ navigate, onLogout }: Props) {
  const session = getSession();
  const { data: user, isLoading } = useGetUserById(session?.userId ?? "");
  const updateProfile = useUpdateUserProfile();

  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleStartEdit = () => {
    setEditName(user?.name ?? session?.name ?? "");
    setEditLocation(
      user?.locationText ?? session?.name ?? DEFAULT_LOCATION.text,
    );
    setSaveError("");
    setSaveSuccess(false);
    setEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) {
      setSaveError("Name is required.");
      return;
    }
    if (!session) return;
    setSaveError("");
    try {
      const result = await updateProfile.mutateAsync({
        id: session.userId,
        name: editName.trim(),
        locationText: editLocation.trim() || DEFAULT_LOCATION.text,
        gpsLat: DEFAULT_LOCATION.lat,
        gpsLng: DEFAULT_LOCATION.lng,
      });
      if (result.__kind__ === "ok") {
        updateSession({ name: editName.trim() });
        setSaveSuccess(true);
        setEditing(false);
      } else {
        setSaveError(result.err ?? "Failed to save profile.");
      }
    } catch {
      setSaveError("Failed to save. Please try again.");
    }
  };

  const handleLogout = () => {
    clearSession();
    if (onLogout) {
      onLogout();
    } else {
      navigate({ page: "home" });
    }
  };

  const displayName = user?.name ?? session?.name ?? "User";
  const displayPhone = user?.phone ?? session?.phone ?? "";
  const displayLocation = user?.locationText ?? DEFAULT_LOCATION.text;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-30 shadow-subtle">
        <div className="max-w-lg mx-auto px-4 py-3">
          <h1 className="text-base font-bold font-display text-foreground">
            My Account
          </h1>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-5 flex flex-col gap-4">
        {/* Avatar + name */}
        <div className="flex flex-col items-center py-4">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white mb-3 shadow-elevated"
            style={{ backgroundColor: SAFFRON }}
          >
            {displayName[0]?.toUpperCase() ?? "U"}
          </div>
          <h2 className="text-xl font-bold font-display text-foreground">
            {displayName}
          </h2>
          <p className="text-sm text-muted-foreground">{displayPhone}</p>
        </div>

        {isLoading ? (
          <div className="h-32 bg-muted rounded-2xl animate-pulse" />
        ) : editing ? (
          /* Edit form */
          <div className="bg-card rounded-2xl shadow-card border border-border p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Edit Profile
            </p>
            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-medium text-foreground"
                  htmlFor="acc-name"
                >
                  Full Name
                </label>
                <input
                  id="acc-name"
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  data-ocid="account-edit-name"
                  className="h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-medium text-foreground"
                  htmlFor="acc-location"
                >
                  Location
                </label>
                <input
                  id="acc-location"
                  type="text"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  data-ocid="account-edit-location"
                  className="h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                />
              </div>
              {saveError && (
                <p className="text-xs text-destructive">{saveError}</p>
              )}
              <div className="flex gap-2">
                <AppButton
                  type="submit"
                  fullWidth
                  disabled={updateProfile.isPending}
                  data-ocid="account-save"
                >
                  {updateProfile.isPending ? "Saving…" : "Save Changes"}
                </AppButton>
                <AppButton
                  type="button"
                  variant="outline"
                  fullWidth
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </AppButton>
              </div>
            </form>
          </div>
        ) : (
          /* Profile view */
          <div className="bg-card rounded-2xl shadow-card border border-border p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Profile
            </p>
            {saveSuccess && (
              <div className="text-sm text-green-700 bg-green-50 rounded-lg px-3 py-2 mb-3">
                ✅ Profile updated successfully!
              </div>
            )}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Name</p>
                  <p className="font-medium text-foreground">{displayName}</p>
                </div>
              </div>
              <div className="border-t border-border pt-3">
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="font-medium text-foreground">{displayPhone}</p>
              </div>
              <div className="border-t border-border pt-3">
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="font-medium text-foreground">
                  📍 {displayLocation}
                </p>
              </div>
            </div>
            <AppButton
              fullWidth
              variant="outline"
              className="mt-4"
              onClick={handleStartEdit}
              data-ocid="account-edit-btn"
            >
              Edit Profile
            </AppButton>
          </div>
        )}

        {/* Quick actions */}
        <div className="bg-card rounded-2xl shadow-card border border-border p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Quick Actions
          </p>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => navigate({ page: "bookings" })}
              className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-muted transition-colors text-left"
              data-ocid="account-nav-bookings"
            >
              <span className="text-xl">📋</span>
              <span className="text-sm font-medium text-foreground">
                My Bookings
              </span>
              <span className="ml-auto text-muted-foreground text-sm">›</span>
            </button>
            <button
              type="button"
              onClick={() => navigate({ page: "tickets" })}
              className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-muted transition-colors text-left"
              data-ocid="account-nav-support"
            >
              <span className="text-xl">🎫</span>
              <span className="text-sm font-medium text-foreground">
                Support Tickets
              </span>
              <span className="ml-auto text-muted-foreground text-sm">›</span>
            </button>
          </div>
        </div>

        {/* Logout */}
        <AppButton
          variant="danger"
          fullWidth
          size="lg"
          onClick={handleLogout}
          data-ocid="account-logout"
        >
          Sign Out
        </AppButton>

        <p className="text-xs text-center text-muted-foreground pb-2">
          © {new Date().getFullYear()} PondyOne. Serving Puducherry &amp;
          Chennai 📍
        </p>
      </div>
    </div>
  );
}
