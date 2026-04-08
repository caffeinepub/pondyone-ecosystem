import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { useAllNotifications, useCreateNotification } from "@/hooks/useQueries";
import type { Notification } from "@/hooks/useQueries";
import { SoundType } from "@/hooks/useQueries";
import { AlarmClock, Bell, Send, VolumeX } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type TargetType =
  | "all_users"
  | "all_owners"
  | "specific_user"
  | "specific_owner";
type FilterTarget = "all" | "all_users" | "all_owners" | "specific";

const SOUND_OPTIONS: {
  value: SoundType;
  label: string;
  icon: React.ReactNode;
  desc: string;
}[] = [
  {
    value: SoundType.ping,
    label: "Ping 🔔",
    icon: <Bell className="w-4 h-4" />,
    desc: "Short pleasant tone",
  },
  {
    value: SoundType.alarm,
    label: "Alarm 🚨",
    icon: <AlarmClock className="w-4 h-4" />,
    desc: "Urgent looping alarm",
  },
  {
    value: SoundType.silent,
    label: "Silent 🔇",
    icon: <VolumeX className="w-4 h-4" />,
    desc: "No sound",
  },
];

function formatDate(ts: bigint): string {
  return new Date(Number(ts / 1_000_000n)).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getTargetLabel(target: string): string {
  if (target === "all_users") return "All Users";
  if (target === "all_owners") return "All Owners";
  return `ID: ${target.slice(0, 10)}…`;
}

function getSoundEmoji(sound: SoundType): string {
  if (sound === SoundType.ping) return "🔔";
  if (sound === SoundType.alarm) return "🚨";
  return "🔇";
}

export default function AdminBroadcast() {
  const { data: notifications = [] } = useAllNotifications();
  const createNotification = useCreateNotification();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [targetType, setTargetType] = useState<TargetType>("all_users");
  const [specificId, setSpecificId] = useState("");
  const [soundType, setSoundType] = useState<SoundType>(SoundType.ping);
  const [filterTarget, setFilterTarget] = useState<FilterTarget>("all");

  const isSpecific =
    targetType === "specific_user" || targetType === "specific_owner";

  function resolvedTarget(): string {
    if (targetType === "all_users") return "all_users";
    if (targetType === "all_owners") return "all_owners";
    return specificId.trim();
  }

  async function handleSend() {
    if (!title.trim() || !body.trim()) {
      toast.error("Title and message are required");
      return;
    }
    if (isSpecific && !specificId.trim()) {
      toast.error("Please enter a target user/owner ID");
      return;
    }

    try {
      await createNotification.mutateAsync({
        target: resolvedTarget(),
        title: title.trim(),
        body: body.trim(),
        soundType,
      });
      toast.success("Broadcast sent successfully!");
      setTitle("");
      setBody("");
      setSpecificId("");
    } catch {
      toast.error("Failed to send broadcast");
    }
  }

  const filteredHistory = notifications.filter((n) => {
    if (filterTarget === "all") return true;
    if (filterTarget === "all_users") return n.target === "all_users";
    if (filterTarget === "all_owners") return n.target === "all_owners";
    return n.target !== "all_users" && n.target !== "all_owners";
  });

  // Preview notification
  const previewTitle = title || "Notification Title";
  const previewBody = body || "Your message will appear here…";

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1
          className="text-2xl font-bold font-display"
          style={{ color: "#1A1A2E" }}
        >
          Broadcast 📢
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Send notifications to users and owners across the platform
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Compose form */}
        <AppCard>
          <h2
            className="font-semibold font-display mb-4"
            style={{ color: "#1A1A2E" }}
          >
            Compose Notification
          </h2>

          <div className="space-y-4">
            {/* Title */}
            <div>
              <label
                htmlFor="broadcast-title"
                className="block text-xs font-medium text-muted-foreground mb-1"
              >
                Title *
              </label>
              <input
                id="broadcast-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Special Offer Alert!"
                data-ocid="broadcast-title"
                className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Body */}
            <div>
              <label
                htmlFor="broadcast-body"
                className="block text-xs font-medium text-muted-foreground mb-1"
              >
                Message *
              </label>
              <textarea
                id="broadcast-body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write your notification message here…"
                data-ocid="broadcast-body"
                rows={4}
                className="w-full px-3 py-2.5 rounded-xl border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>

            {/* Target */}
            <div>
              <label
                htmlFor="broadcast-target"
                className="block text-xs font-medium text-muted-foreground mb-1"
              >
                Send To
              </label>
              <select
                id="broadcast-target"
                value={targetType}
                onChange={(e) => setTargetType(e.target.value as TargetType)}
                data-ocid="broadcast-target"
                className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm text-foreground focus:outline-none"
              >
                <option value="all_users">All Users</option>
                <option value="all_owners">All Owners</option>
                <option value="specific_user">Specific User ID</option>
                <option value="specific_owner">Specific Owner ID</option>
              </select>
            </div>

            {isSpecific && (
              <div>
                <label
                  htmlFor="broadcast-specific-id"
                  className="block text-xs font-medium text-muted-foreground mb-1"
                >
                  {targetType === "specific_user" ? "User ID" : "Owner ID"}
                </label>
                <input
                  id="broadcast-specific-id"
                  value={specificId}
                  onChange={(e) => setSpecificId(e.target.value)}
                  placeholder="Enter ID…"
                  data-ocid="broadcast-specific-id"
                  className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring font-mono"
                />
              </div>
            )}

            {/* Sound type */}
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">
                Sound Type
              </p>
              <div className="grid grid-cols-3 gap-2">
                {SOUND_OPTIONS.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setSoundType(s.value)}
                    data-ocid={`sound-type-${s.value}`}
                    className="flex flex-col items-center gap-1 p-3 rounded-xl border text-sm font-medium transition-colors"
                    style={{
                      borderColor:
                        soundType === s.value ? "#FF6B35" : "var(--border)",
                      backgroundColor:
                        soundType === s.value
                          ? "rgba(255,107,53,0.08)"
                          : "transparent",
                      color:
                        soundType === s.value
                          ? "#FF6B35"
                          : "var(--muted-foreground)",
                    }}
                    aria-pressed={soundType === s.value}
                  >
                    {s.icon}
                    <span className="text-xs">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Send button */}
            <AppButton
              fullWidth
              onClick={handleSend}
              disabled={createNotification.isPending}
              data-ocid="broadcast-send"
            >
              <Send className="w-4 h-4 mr-2" />
              {createNotification.isPending ? "Sending…" : "Send Broadcast"}
            </AppButton>
          </div>
        </AppCard>

        {/* Preview */}
        <div className="flex flex-col gap-4">
          <AppCard>
            <h2
              className="font-semibold font-display mb-4"
              style={{ color: "#1A1A2E" }}
            >
              Preview
            </h2>
            <div
              className="rounded-2xl p-4 border"
              style={{ backgroundColor: "#1A1A2E", borderColor: "#2d2d4a" }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#FF6B35" }}
                >
                  <span className="text-white font-bold text-sm">P</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm text-white truncate">
                      {previewTitle}
                    </p>
                    <span className="text-base">
                      {getSoundEmoji(soundType)}
                    </span>
                  </div>
                  <p
                    className="text-xs mt-0.5 line-clamp-3"
                    style={{ color: "#94a3b8" }}
                  >
                    {previewBody}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: "#2d2d4a", color: "#94a3b8" }}
                    >
                      →{" "}
                      {targetType === "all_users"
                        ? "All Users"
                        : targetType === "all_owners"
                          ? "All Owners"
                          : "Specific"}
                    </span>
                    <span className="text-[10px]" style={{ color: "#64748b" }}>
                      Just now
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </AppCard>
        </div>
      </div>

      {/* Broadcast history */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2
            className="font-semibold font-display"
            style={{ color: "#1A1A2E" }}
          >
            Broadcast History
          </h2>
          <select
            value={filterTarget}
            onChange={(e) => setFilterTarget(e.target.value as FilterTarget)}
            className="h-9 px-3 rounded-xl border border-input bg-background text-sm focus:outline-none"
            aria-label="Filter broadcast history"
          >
            <option value="all">All</option>
            <option value="all_users">Users</option>
            <option value="all_owners">Owners</option>
            <option value="specific">Specific</option>
          </select>
        </div>
        <AppCard padded={false}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">
                    Title
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground hidden md:table-cell">
                    Target
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground hidden lg:table-cell">
                    Sound
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground hidden lg:table-cell">
                    Sent At
                  </th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground">
                    Read Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-8 text-center text-muted-foreground"
                    >
                      No broadcasts sent yet
                    </td>
                  </tr>
                ) : (
                  filteredHistory.map((n: Notification) => (
                    <tr
                      key={n.id}
                      className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-5 py-3">
                        <p className="font-medium text-foreground truncate max-w-[180px]">
                          {n.title}
                        </p>
                        <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                          {n.body}
                        </p>
                      </td>
                      <td className="px-5 py-3 text-muted-foreground hidden md:table-cell">
                        {getTargetLabel(n.target)}
                      </td>
                      <td className="px-5 py-3 hidden lg:table-cell">
                        <span className="text-base">
                          {getSoundEmoji(n.soundType)}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-muted-foreground hidden lg:table-cell">
                        {formatDate(n.createdAt)}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: n.isRead
                              ? "rgba(126,211,33,0.1)"
                              : "rgba(255,140,66,0.1)",
                            color: n.isRead ? "#7ED321" : "#FF8C42",
                          }}
                        >
                          {n.isRead ? "100%" : "—"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </AppCard>
      </div>
    </div>
  );
}
