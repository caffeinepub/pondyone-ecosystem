import { CategoryBadge, StatusBadge } from "@/components/ui/AppBadge";
import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppModal } from "@/components/ui/AppModal";
import {
  useAllOwners,
  useAllUsers,
  useBanUser,
  useDeleteOwner,
  useDeleteUser,
  useUpdateUserProfile,
  useVerifyOwner,
} from "@/hooks/useQueries";
import type { OwnerRecord, UserRecord } from "@/hooks/useQueries";
import { CATEGORY_LABELS } from "@/lib/constants";
import {
  CheckCircle,
  Loader2,
  Search,
  ShieldCheck,
  ShieldOff,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Tab = "users" | "owners";

function formatDate(ts: bigint): string {
  return new Date(Number(ts / 1_000_000n)).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ─── Delete confirmation dialog ────────────────────────────────────────────
function DeleteConfirmModal({
  name,
  onConfirm,
  onCancel,
  isPending,
}: {
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
}) {
  return (
    <AppModal
      isOpen
      onClose={onCancel}
      title="Confirm Deletion"
      className="max-w-sm"
    >
      <div className="space-y-4">
        <p className="text-sm text-foreground">
          Are you sure you want to permanently delete{" "}
          <span className="font-semibold">{name}</span>? This cannot be undone.
        </p>
        <div className="flex gap-3">
          <AppButton
            variant="outline"
            fullWidth
            onClick={onCancel}
            disabled={isPending}
            data-ocid="delete-cancel"
          >
            Cancel
          </AppButton>
          <AppButton
            variant="danger"
            fullWidth
            onClick={onConfirm}
            disabled={isPending}
            data-ocid="delete-confirm"
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin mr-1" />
            ) : (
              <Trash2 className="w-4 h-4 mr-1" />
            )}
            {isPending ? "Deleting…" : "Delete"}
          </AppButton>
        </div>
      </div>
    </AppModal>
  );
}

// ─── User profile modal ────────────────────────────────────────────────────
function UserProfileModal({
  user,
  onClose,
}: {
  user: UserRecord;
  onClose: () => void;
}) {
  const updateProfile = useUpdateUserProfile();
  const [name, setName] = useState(user.name);
  const [location, setLocation] = useState(user.locationText);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    await updateProfile.mutateAsync({
      id: user.id,
      name,
      locationText: location,
      gpsLat: user.gpsLat,
      gpsLng: user.gpsLng,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <AppModal
      isOpen
      onClose={onClose}
      title={`User: ${user.name}`}
      className="max-w-lg"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Phone</p>
            <p className="font-medium text-foreground">{user.phone}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Joined</p>
            <p className="font-medium text-foreground">
              {formatDate(user.createdAt)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Status</p>
            <StatusBadge
              status={user.isBanned ? "declined" : "accepted"}
              label={user.isBanned ? "Banned" : "Active"}
            />
          </div>
        </div>

        <div className="space-y-3 border-t border-border pt-4">
          <div>
            <label
              htmlFor="edit-user-name"
              className="block text-xs font-medium text-muted-foreground mb-1"
            >
              Name
            </label>
            <input
              id="edit-user-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-9 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label
              htmlFor="edit-user-location"
              className="block text-xs font-medium text-muted-foreground mb-1"
            >
              Location
            </label>
            <input
              id="edit-user-location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full h-9 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <AppButton
            size="sm"
            onClick={handleSave}
            disabled={updateProfile.isPending}
          >
            {saved ? "✓ Saved" : "Save Changes"}
          </AppButton>
        </div>

        {user.activityLog.length > 0 && (
          <div className="border-t border-border pt-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Activity Log
            </p>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {[...user.activityLog].reverse().map((entry, i) => (
                <div
                  key={`${entry.timestamp}-${i}`}
                  className="flex items-start gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-foreground">{entry.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(entry.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppModal>
  );
}

// ─── Owner profile modal ───────────────────────────────────────────────────
function OwnerProfileModal({
  owner,
  onClose,
}: {
  owner: OwnerRecord;
  onClose: () => void;
}) {
  return (
    <AppModal
      isOpen
      onClose={onClose}
      title={`Owner: ${owner.businessName}`}
      className="max-w-lg"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Business</p>
            <p className="font-medium text-foreground">{owner.businessName}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Category</p>
            <CategoryBadge
              category={owner.category as "food" | "stay" | "play" | "retail"}
            />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Phone</p>
            <p className="font-medium text-foreground">{owner.phone}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">UPI ID</p>
            <p className="font-medium text-foreground truncate">
              {owner.upiId || "—"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Verified</p>
            <StatusBadge
              status={owner.isVerified ? "accepted" : "pending"}
              label={owner.isVerified ? "Verified" : "Pending"}
            />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Status</p>
            <StatusBadge
              status={owner.isBanned ? "declined" : "accepted"}
              label={owner.isBanned ? "Banned" : "Active"}
            />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Joined</p>
            <p className="font-medium text-foreground">
              {formatDate(owner.createdAt)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Location</p>
            <p className="font-medium text-foreground truncate">
              {owner.locationText}
            </p>
          </div>
        </div>
        {owner.activityLog.length > 0 && (
          <div className="border-t border-border pt-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Activity Log
            </p>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {[...owner.activityLog].reverse().map((entry, i) => (
                <div
                  key={`${entry.timestamp}-${i}`}
                  className="flex items-start gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-foreground">{entry.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(entry.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppModal>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────
export default function AdminUsers() {
  const [tab, setTab] = useState<Tab>("users");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [catFilter, setCatFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [selectedOwner, setSelectedOwner] = useState<OwnerRecord | null>(null);
  const [verifyingOwnerId, setVerifyingOwnerId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    name: string;
    type: "user" | "owner";
  } | null>(null);

  const { data: users = [], isLoading: loadingUsers } = useAllUsers();
  const { data: owners = [], isLoading: loadingOwners } = useAllOwners();
  const banUser = useBanUser();
  const verifyOwner = useVerifyOwner();
  const deleteUser = useDeleteUser();
  const deleteOwner = useDeleteOwner();

  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.phone.includes(search);
    const matchStatus =
      statusFilter === "all" ||
      (statusFilter === "banned" && u.isBanned) ||
      (statusFilter === "active" && !u.isBanned);
    return matchSearch && matchStatus;
  });

  const filteredOwners = owners.filter((o) => {
    const matchSearch =
      o.businessName.toLowerCase().includes(search.toLowerCase()) ||
      o.phone.includes(search) ||
      o.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === "all" || o.category === catFilter;
    const matchStatus =
      statusFilter === "all" ||
      (statusFilter === "banned" && o.isBanned) ||
      (statusFilter === "active" && !o.isBanned);
    return matchSearch && matchCat && matchStatus;
  });

  function handleDeleteConfirm() {
    if (!deleteTarget) return;
    const mutation = deleteTarget.type === "user" ? deleteUser : deleteOwner;
    mutation.mutate(deleteTarget.id, {
      onSuccess: () => {
        toast.success(`${deleteTarget.name} has been permanently deleted.`);
        setDeleteTarget(null);
      },
      onError: () => {
        toast.error("Failed to delete. Please try again.");
        setDeleteTarget(null);
      },
    });
  }

  const isDeletePending = deleteUser.isPending || deleteOwner.isPending;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1
          className="text-2xl font-bold font-display"
          style={{ color: "#1A1A2E" }}
        >
          Users &amp; Owners 👥
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage all registered users and business owners
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-muted/40 p-1 rounded-xl w-fit">
        {(["users", "owners"] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            data-ocid={`admin-tab-${t}`}
            onClick={() => {
              setTab(t);
              setSearch("");
              setStatusFilter("all");
              setCatFilter("all");
            }}
            className="px-5 py-2 rounded-lg text-sm font-medium transition-colors capitalize"
            style={{
              backgroundColor: tab === t ? "#FF6B35" : "transparent",
              color: tab === t ? "#fff" : "#64748b",
            }}
          >
            {t === "users"
              ? `Users (${users.length})`
              : `Owners (${owners.length})`}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              tab === "users"
                ? "Search by name or phone…"
                : "Search by business or phone…"
            }
            data-ocid="admin-users-search"
            className="w-full h-10 pl-9 pr-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-10 px-3 rounded-xl border border-input bg-background text-sm focus:outline-none"
          aria-label="Filter by status"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="banned">Banned</option>
        </select>
        {tab === "owners" && (
          <select
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
            className="h-10 px-3 rounded-xl border border-input bg-background text-sm focus:outline-none"
            aria-label="Filter by category"
          >
            <option value="all">All Categories</option>
            {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Users Table */}
      {tab === "users" && (
        <AppCard padded={false}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">
                    Name
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">
                    Phone
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground hidden md:table-cell">
                    Location
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground hidden lg:table-cell">
                    Joined
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">
                    Status
                  </th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loadingUsers ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-8 text-center text-muted-foreground"
                    >
                      Loading…
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-8 text-center text-muted-foreground"
                    >
                      No users found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      data-ocid={`user-row-${user.id}`}
                      className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-5 py-3 font-medium text-foreground">
                        {user.name}
                      </td>
                      <td className="px-5 py-3 text-muted-foreground">
                        {user.phone}
                      </td>
                      <td className="px-5 py-3 text-muted-foreground hidden md:table-cell truncate max-w-[140px]">
                        {user.locationText || "—"}
                      </td>
                      <td className="px-5 py-3 text-muted-foreground hidden lg:table-cell">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="px-5 py-3">
                        <StatusBadge
                          status={user.isBanned ? "declined" : "accepted"}
                          label={user.isBanned ? "Banned" : "Active"}
                        />
                      </td>
                      <td className="px-5 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <AppButton
                            size="sm"
                            variant={user.isBanned ? "secondary" : "danger"}
                            onClick={() =>
                              banUser.mutate({
                                id: user.id,
                                isBanned: !user.isBanned,
                              })
                            }
                            data-ocid={`ban-user-${user.id}`}
                          >
                            {user.isBanned ? (
                              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                            ) : (
                              <ShieldOff className="w-3.5 h-3.5 mr-1" />
                            )}
                            {user.isBanned ? "Unban" : "Ban"}
                          </AppButton>
                          <AppButton
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedUser(user)}
                            data-ocid={`view-user-${user.id}`}
                          >
                            Profile
                          </AppButton>
                          <AppButton
                            size="sm"
                            variant="danger"
                            onClick={() =>
                              setDeleteTarget({
                                id: user.id,
                                name: user.name,
                                type: "user",
                              })
                            }
                            data-ocid={`delete-user-${user.id}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </AppButton>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </AppCard>
      )}

      {/* Owners Table */}
      {tab === "owners" && (
        <AppCard padded={false}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">
                    Business
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">
                    Category
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground hidden md:table-cell">
                    Phone
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">
                    Verified
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">
                    Status
                  </th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loadingOwners ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-8 text-center text-muted-foreground"
                    >
                      Loading…
                    </td>
                  </tr>
                ) : filteredOwners.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-8 text-center text-muted-foreground"
                    >
                      No owners found
                    </td>
                  </tr>
                ) : (
                  filteredOwners.map((owner) => (
                    <tr
                      key={owner.id}
                      data-ocid={`owner-row-${owner.id}`}
                      className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-5 py-3 font-medium text-foreground">
                        {owner.businessName}
                      </td>
                      <td className="px-5 py-3">
                        <CategoryBadge
                          category={
                            owner.category as
                              | "food"
                              | "stay"
                              | "play"
                              | "retail"
                          }
                        />
                      </td>
                      <td className="px-5 py-3 text-muted-foreground hidden md:table-cell">
                        {owner.phone}
                      </td>
                      <td className="px-5 py-3">
                        {owner.isVerified ? (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                            <CheckCircle className="w-3.5 h-3.5" /> Verified
                          </span>
                        ) : (
                          <AppButton
                            size="sm"
                            variant="secondary"
                            disabled={verifyingOwnerId === owner.id}
                            onClick={() => {
                              setVerifyingOwnerId(owner.id);
                              verifyOwner.mutate(owner.id, {
                                onSuccess: () => {
                                  toast.success("Owner verified successfully");
                                  setVerifyingOwnerId(null);
                                },
                                onError: () => setVerifyingOwnerId(null),
                              });
                            }}
                            data-ocid={`verify-owner-${owner.id}`}
                          >
                            {verifyingOwnerId === owner.id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" />
                            ) : null}
                            {verifyingOwnerId === owner.id
                              ? "Verifying…"
                              : "Verify"}
                          </AppButton>
                        )}
                      </td>
                      <td className="px-5 py-3">
                        <StatusBadge
                          status={owner.isBanned ? "declined" : "accepted"}
                          label={owner.isBanned ? "Banned" : "Active"}
                        />
                      </td>
                      <td className="px-5 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <AppButton
                            size="sm"
                            variant={owner.isBanned ? "secondary" : "danger"}
                            onClick={() =>
                              banUser.mutate({
                                id: owner.id,
                                isBanned: !owner.isBanned,
                              })
                            }
                            data-ocid={`ban-owner-${owner.id}`}
                          >
                            {owner.isBanned ? "Unban" : "Ban"}
                          </AppButton>
                          <AppButton
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedOwner(owner)}
                            data-ocid={`view-owner-${owner.id}`}
                          >
                            Profile
                          </AppButton>
                          <AppButton
                            size="sm"
                            variant="danger"
                            onClick={() =>
                              setDeleteTarget({
                                id: owner.id,
                                name: owner.businessName,
                                type: "owner",
                              })
                            }
                            data-ocid={`delete-owner-${owner.id}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </AppButton>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </AppCard>
      )}

      {/* Profile modals */}
      {selectedUser && (
        <UserProfileModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
      {selectedOwner && (
        <OwnerProfileModal
          owner={selectedOwner}
          onClose={() => setSelectedOwner(null)}
        />
      )}

      {/* Delete confirmation */}
      {deleteTarget && (
        <DeleteConfirmModal
          name={deleteTarget.name}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
          isPending={isDeletePending}
        />
      )}
    </div>
  );
}
