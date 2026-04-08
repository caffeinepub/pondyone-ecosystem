import { r as reactExports, j as jsxRuntimeExports } from "./index-DcI09W8W.js";
import { A as AppButton } from "./AppButton-DpTDxkZU.js";
import { A as AppCard } from "./AppCard-T1oYP_Vp.js";
import { X as useAllNotifications, Y as useCreateNotification } from "./useQueries-CSZps6Zw.js";
import { u as ue } from "./index-C6mKIPDd.js";
import { a as SoundType } from "./backend.d-DzWmo78T.js";
import { S as Send } from "./send-D7q-2a2h.js";
import { c as createLucideIcon } from "./createLucideIcon-BoNvu6Kr.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "13", r: "8", key: "3y4lt7" }],
  ["path", { d: "M12 9v4l2 2", key: "1c63tq" }],
  ["path", { d: "M5 3 2 6", key: "18tl5t" }],
  ["path", { d: "m22 6-3-3", key: "1opdir" }],
  ["path", { d: "M6.38 18.7 4 21", key: "17xu3x" }],
  ["path", { d: "M17.64 18.67 20 21", key: "kv2oe2" }]
];
const AlarmClock = createLucideIcon("alarm-clock", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
];
const Bell = createLucideIcon("bell", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["line", { x1: "22", x2: "16", y1: "9", y2: "15", key: "1ewh16" }],
  ["line", { x1: "16", x2: "22", y1: "9", y2: "15", key: "5ykzw1" }]
];
const VolumeX = createLucideIcon("volume-x", __iconNode);
const SOUND_OPTIONS = [
  {
    value: SoundType.ping,
    label: "Ping 🔔",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4" }),
    desc: "Short pleasant tone"
  },
  {
    value: SoundType.alarm,
    label: "Alarm 🚨",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(AlarmClock, { className: "w-4 h-4" }),
    desc: "Urgent looping alarm"
  },
  {
    value: SoundType.silent,
    label: "Silent 🔇",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { className: "w-4 h-4" }),
    desc: "No sound"
  }
];
function formatDate(ts) {
  return new Date(Number(ts / 1000000n)).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function getTargetLabel(target) {
  if (target === "all_users") return "All Users";
  if (target === "all_owners") return "All Owners";
  return `ID: ${target.slice(0, 10)}…`;
}
function getSoundEmoji(sound) {
  if (sound === SoundType.ping) return "🔔";
  if (sound === SoundType.alarm) return "🚨";
  return "🔇";
}
function AdminBroadcast() {
  const { data: notifications = [] } = useAllNotifications();
  const createNotification = useCreateNotification();
  const [title, setTitle] = reactExports.useState("");
  const [body, setBody] = reactExports.useState("");
  const [targetType, setTargetType] = reactExports.useState("all_users");
  const [specificId, setSpecificId] = reactExports.useState("");
  const [soundType, setSoundType] = reactExports.useState(SoundType.ping);
  const [filterTarget, setFilterTarget] = reactExports.useState("all");
  const isSpecific = targetType === "specific_user" || targetType === "specific_owner";
  function resolvedTarget() {
    if (targetType === "all_users") return "all_users";
    if (targetType === "all_owners") return "all_owners";
    return specificId.trim();
  }
  async function handleSend() {
    if (!title.trim() || !body.trim()) {
      ue.error("Title and message are required");
      return;
    }
    if (isSpecific && !specificId.trim()) {
      ue.error("Please enter a target user/owner ID");
      return;
    }
    try {
      await createNotification.mutateAsync({
        target: resolvedTarget(),
        title: title.trim(),
        body: body.trim(),
        soundType
      });
      ue.success("Broadcast sent successfully!");
      setTitle("");
      setBody("");
      setSpecificId("");
    } catch {
      ue.error("Failed to send broadcast");
    }
  }
  const filteredHistory = notifications.filter((n) => {
    if (filterTarget === "all") return true;
    if (filterTarget === "all_users") return n.target === "all_users";
    if (filterTarget === "all_owners") return n.target === "all_owners";
    return n.target !== "all_users" && n.target !== "all_owners";
  });
  const previewTitle = title || "Notification Title";
  const previewBody = body || "Your message will appear here…";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h1",
        {
          className: "text-2xl font-bold font-display",
          style: { color: "#1A1A2E" },
          children: "Broadcast 📢"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Send notifications to users and owners across the platform" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AppCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h2",
          {
            className: "font-semibold font-display mb-4",
            style: { color: "#1A1A2E" },
            children: "Compose Notification"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "broadcast-title",
                className: "block text-xs font-medium text-muted-foreground mb-1",
                children: "Title *"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "broadcast-title",
                value: title,
                onChange: (e) => setTitle(e.target.value),
                placeholder: "e.g. Special Offer Alert!",
                "data-ocid": "broadcast-title",
                className: "w-full h-10 px-3 rounded-xl border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "broadcast-body",
                className: "block text-xs font-medium text-muted-foreground mb-1",
                children: "Message *"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                id: "broadcast-body",
                value: body,
                onChange: (e) => setBody(e.target.value),
                placeholder: "Write your notification message here…",
                "data-ocid": "broadcast-body",
                rows: 4,
                className: "w-full px-3 py-2.5 rounded-xl border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "broadcast-target",
                className: "block text-xs font-medium text-muted-foreground mb-1",
                children: "Send To"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "broadcast-target",
                value: targetType,
                onChange: (e) => setTargetType(e.target.value),
                "data-ocid": "broadcast-target",
                className: "w-full h-10 px-3 rounded-xl border border-input bg-background text-sm text-foreground focus:outline-none",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all_users", children: "All Users" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all_owners", children: "All Owners" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "specific_user", children: "Specific User ID" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "specific_owner", children: "Specific Owner ID" })
                ]
              }
            )
          ] }),
          isSpecific && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "broadcast-specific-id",
                className: "block text-xs font-medium text-muted-foreground mb-1",
                children: targetType === "specific_user" ? "User ID" : "Owner ID"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "broadcast-specific-id",
                value: specificId,
                onChange: (e) => setSpecificId(e.target.value),
                placeholder: "Enter ID…",
                "data-ocid": "broadcast-specific-id",
                className: "w-full h-10 px-3 rounded-xl border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring font-mono"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-2", children: "Sound Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: SOUND_OPTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setSoundType(s.value),
                "data-ocid": `sound-type-${s.value}`,
                className: "flex flex-col items-center gap-1 p-3 rounded-xl border text-sm font-medium transition-colors",
                style: {
                  borderColor: soundType === s.value ? "#FF6B35" : "var(--border)",
                  backgroundColor: soundType === s.value ? "rgba(255,107,53,0.08)" : "transparent",
                  color: soundType === s.value ? "#FF6B35" : "var(--muted-foreground)"
                },
                "aria-pressed": soundType === s.value,
                children: [
                  s.icon,
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: s.label })
                ]
              },
              s.value
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            AppButton,
            {
              fullWidth: true,
              onClick: handleSend,
              disabled: createNotification.isPending,
              "data-ocid": "broadcast-send",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4 mr-2" }),
                createNotification.isPending ? "Sending…" : "Send Broadcast"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AppCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h2",
          {
            className: "font-semibold font-display mb-4",
            style: { color: "#1A1A2E" },
            children: "Preview"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "rounded-2xl p-4 border",
            style: { backgroundColor: "#1A1A2E", borderColor: "#2d2d4a" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                  style: { backgroundColor: "#FF6B35" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-sm", children: "P" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-white truncate", children: previewTitle }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: getSoundEmoji(soundType) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs mt-0.5 line-clamp-3",
                    style: { color: "#94a3b8" },
                    children: previewBody
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "text-[10px] px-2 py-0.5 rounded-full",
                      style: { backgroundColor: "#2d2d4a", color: "#94a3b8" },
                      children: [
                        "→",
                        " ",
                        targetType === "all_users" ? "All Users" : targetType === "all_owners" ? "All Owners" : "Specific"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px]", style: { color: "#64748b" }, children: "Just now" })
                ] })
              ] })
            ] })
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h2",
          {
            className: "font-semibold font-display",
            style: { color: "#1A1A2E" },
            children: "Broadcast History"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: filterTarget,
            onChange: (e) => setFilterTarget(e.target.value),
            className: "h-9 px-3 rounded-xl border border-input bg-background text-sm focus:outline-none",
            "aria-label": "Filter broadcast history",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all_users", children: "Users" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all_owners", children: "Owners" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "specific", children: "Specific" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AppCard, { padded: false, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 text-xs font-semibold text-muted-foreground", children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 text-xs font-semibold text-muted-foreground hidden md:table-cell", children: "Target" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 text-xs font-semibold text-muted-foreground hidden lg:table-cell", children: "Sound" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 text-xs font-semibold text-muted-foreground hidden lg:table-cell", children: "Sent At" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-5 py-3 text-xs font-semibold text-muted-foreground", children: "Read Rate" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filteredHistory.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            colSpan: 5,
            className: "px-5 py-8 text-center text-muted-foreground",
            children: "No broadcasts sent yet"
          }
        ) }) : filteredHistory.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-border last:border-0 hover:bg-muted/20 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate max-w-[180px]", children: n.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate max-w-[180px]", children: n.body })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-muted-foreground hidden md:table-cell", children: getTargetLabel(n.target) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 hidden lg:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: getSoundEmoji(n.soundType) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-muted-foreground hidden lg:table-cell", children: formatDate(n.createdAt) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-xs font-semibold px-2 py-0.5 rounded-full",
                  style: {
                    backgroundColor: n.isRead ? "rgba(126,211,33,0.1)" : "rgba(255,140,66,0.1)",
                    color: n.isRead ? "#7ED321" : "#FF8C42"
                  },
                  children: n.isRead ? "100%" : "—"
                }
              ) })
            ]
          },
          n.id
        )) })
      ] }) }) })
    ] })
  ] });
}
export {
  AdminBroadcast as default
};
