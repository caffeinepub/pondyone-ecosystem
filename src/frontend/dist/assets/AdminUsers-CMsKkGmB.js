import { r as reactExports, j as jsxRuntimeExports } from "./index-CnBlQnJS.js";
import { S as StatusBadge, C as CategoryBadge } from "./AppBadge-DvzDMqlu.js";
import { A as AppButton } from "./AppButton-LApTkm6l.js";
import { A as AppCard } from "./AppCard-CqGSFxNm.js";
import { A as AppModal } from "./AppModal-CkVXozos.js";
import { J as useAllUsers, K as useAllOwners, L as useBanUser, M as useVerifyOwner, a as useUpdateUserProfile } from "./useQueries--SjqMtRM.js";
import { c as createLucideIcon, b as CATEGORY_LABELS } from "./createLucideIcon-DNEqdOjx.js";
import { u as ue } from "./index-lMFli-zp.js";
import { C as CircleCheckBig } from "./circle-check-big-Bl1GeW6b.js";
import "./x-BiXYAiTq.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  [
    "path",
    {
      d: "M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71",
      key: "1jlk70"
    }
  ],
  [
    "path",
    {
      d: "M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264",
      key: "18rp1v"
    }
  ]
];
const ShieldOff = createLucideIcon("shield-off", __iconNode);
function formatDate(ts) {
  return new Date(Number(ts / 1000000n)).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
function UserProfileModal({
  user,
  onClose
}) {
  const updateProfile = useUpdateUserProfile();
  const [name, setName] = reactExports.useState(user.name);
  const [location, setLocation] = reactExports.useState(user.locationText);
  const [saved, setSaved] = reactExports.useState(false);
  async function handleSave() {
    await updateProfile.mutateAsync({
      id: user.id,
      name,
      locationText: location,
      gpsLat: user.gpsLat,
      gpsLng: user.gpsLng
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2e3);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AppModal,
    {
      isOpen: true,
      onClose,
      title: `User: ${user.name}`,
      className: "max-w-lg",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Phone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: user.phone })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Joined" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: formatDate(user.createdAt) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatusBadge,
              {
                status: user.isBanned ? "declined" : "accepted",
                label: user.isBanned ? "Banned" : "Active"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 border-t border-border pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "edit-user-name",
                className: "block text-xs font-medium text-muted-foreground mb-1",
                children: "Name"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "edit-user-name",
                value: name,
                onChange: (e) => setName(e.target.value),
                className: "w-full h-9 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "edit-user-location",
                className: "block text-xs font-medium text-muted-foreground mb-1",
                children: "Location"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "edit-user-location",
                value: location,
                onChange: (e) => setLocation(e.target.value),
                className: "w-full h-9 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AppButton,
            {
              size: "sm",
              onClick: handleSave,
              disabled: updateProfile.isPending,
              children: saved ? "✓ Saved" : "Save Changes"
            }
          )
        ] }),
        user.activityLog.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3", children: "Activity Log" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-h-48 overflow-y-auto", children: [...user.activityLog].reverse().map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-start gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: entry.action }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatDate(entry.timestamp) })
                ] })
              ]
            },
            `${entry.timestamp}-${i}`
          )) })
        ] })
      ] })
    }
  );
}
function OwnerProfileModal({
  owner,
  onClose
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AppModal,
    {
      isOpen: true,
      onClose,
      title: `Owner: ${owner.businessName}`,
      className: "max-w-lg",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Business" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: owner.businessName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CategoryBadge,
              {
                category: owner.category
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Phone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: owner.phone })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "UPI ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate", children: owner.upiId || "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Verified" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatusBadge,
              {
                status: owner.isVerified ? "accepted" : "pending",
                label: owner.isVerified ? "Verified" : "Pending"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatusBadge,
              {
                status: owner.isBanned ? "declined" : "accepted",
                label: owner.isBanned ? "Banned" : "Active"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Joined" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: formatDate(owner.createdAt) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Location" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate", children: owner.locationText })
          ] })
        ] }),
        owner.activityLog.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3", children: "Activity Log" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-h-48 overflow-y-auto", children: [...owner.activityLog].reverse().map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-start gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: entry.action }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatDate(entry.timestamp) })
                ] })
              ]
            },
            `${entry.timestamp}-${i}`
          )) })
        ] })
      ] })
    }
  );
}
function AdminUsers() {
  const [tab, setTab] = reactExports.useState("users");
  const [search, setSearch] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [catFilter, setCatFilter] = reactExports.useState("all");
  const [selectedUser, setSelectedUser] = reactExports.useState(null);
  const [selectedOwner, setSelectedOwner] = reactExports.useState(null);
  const [verifyingOwnerId, setVerifyingOwnerId] = reactExports.useState(null);
  const { data: users = [], isLoading: loadingUsers } = useAllUsers();
  const { data: owners = [], isLoading: loadingOwners } = useAllOwners();
  const banUser = useBanUser();
  const verifyOwner = useVerifyOwner();
  const filteredUsers = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.phone.includes(search);
    const matchStatus = statusFilter === "all" || statusFilter === "banned" && u.isBanned || statusFilter === "active" && !u.isBanned;
    return matchSearch && matchStatus;
  });
  const filteredOwners = owners.filter((o) => {
    const matchSearch = o.businessName.toLowerCase().includes(search.toLowerCase()) || o.phone.includes(search) || o.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === "all" || o.category === catFilter;
    const matchStatus = statusFilter === "all" || statusFilter === "banned" && o.isBanned || statusFilter === "active" && !o.isBanned;
    return matchSearch && matchCat && matchStatus;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h1",
        {
          className: "text-2xl font-bold font-display",
          style: { color: "#1A1A2E" },
          children: "Users & Owners 👥"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Manage all registered users and business owners" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 mb-6 bg-muted/40 p-1 rounded-xl w-fit", children: ["users", "owners"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        "data-ocid": `admin-tab-${t}`,
        onClick: () => {
          setTab(t);
          setSearch("");
          setStatusFilter("all");
          setCatFilter("all");
        },
        className: "px-5 py-2 rounded-lg text-sm font-medium transition-colors capitalize",
        style: {
          backgroundColor: tab === t ? "#FF6B35" : "transparent",
          color: tab === t ? "#fff" : "#64748b"
        },
        children: t === "users" ? `Users (${users.length})` : `Owners (${owners.length})`
      },
      t
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[200px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "search",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            placeholder: tab === "users" ? "Search by name or phone…" : "Search by business or phone…",
            "data-ocid": "admin-users-search",
            className: "w-full h-10 pl-9 pr-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: statusFilter,
          onChange: (e) => setStatusFilter(e.target.value),
          className: "h-10 px-3 rounded-xl border border-input bg-background text-sm focus:outline-none",
          "aria-label": "Filter by status",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "active", children: "Active" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "banned", children: "Banned" })
          ]
        }
      ),
      tab === "owners" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: catFilter,
          onChange: (e) => setCatFilter(e.target.value),
          className: "h-10 px-3 rounded-xl border border-input bg-background text-sm focus:outline-none",
          "aria-label": "Filter by category",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Categories" }),
            Object.entries(CATEGORY_LABELS).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: k, children: v }, k))
          ]
        }
      )
    ] }),
    tab === "users" && /* @__PURE__ */ jsxRuntimeExports.jsx(AppCard, { padded: false, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 text-xs font-semibold text-muted-foreground", children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 text-xs font-semibold text-muted-foreground", children: "Phone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 text-xs font-semibold text-muted-foreground hidden md:table-cell", children: "Location" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 text-xs font-semibold text-muted-foreground hidden lg:table-cell", children: "Joined" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 text-xs font-semibold text-muted-foreground", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-5 py-3 text-xs font-semibold text-muted-foreground", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: loadingUsers ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "td",
        {
          colSpan: 6,
          className: "px-5 py-8 text-center text-muted-foreground",
          children: "Loading…"
        }
      ) }) : filteredUsers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "td",
        {
          colSpan: 6,
          className: "px-5 py-8 text-center text-muted-foreground",
          children: "No users found"
        }
      ) }) : filteredUsers.map((user) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          "data-ocid": `user-row-${user.id}`,
          className: "border-b border-border last:border-0 hover:bg-muted/20 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 font-medium text-foreground", children: user.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-muted-foreground", children: user.phone }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-muted-foreground hidden md:table-cell truncate max-w-[140px]", children: user.locationText || "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-muted-foreground hidden lg:table-cell", children: formatDate(user.createdAt) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatusBadge,
              {
                status: user.isBanned ? "declined" : "accepted",
                label: user.isBanned ? "Banned" : "Active"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                AppButton,
                {
                  size: "sm",
                  variant: user.isBanned ? "secondary" : "danger",
                  onClick: () => banUser.mutate({
                    id: user.id,
                    isBanned: !user.isBanned
                  }),
                  "data-ocid": `ban-user-${user.id}`,
                  children: [
                    user.isBanned ? /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3.5 h-3.5 mr-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldOff, { className: "w-3.5 h-3.5 mr-1" }),
                    user.isBanned ? "Unban" : "Ban"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                AppButton,
                {
                  size: "sm",
                  variant: "outline",
                  onClick: () => setSelectedUser(user),
                  "data-ocid": `view-user-${user.id}`,
                  children: "Profile"
                }
              )
            ] }) })
          ]
        },
        user.id
      )) })
    ] }) }) }),
    tab === "owners" && /* @__PURE__ */ jsxRuntimeExports.jsx(AppCard, { padded: false, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 text-xs font-semibold text-muted-foreground", children: "Business" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 text-xs font-semibold text-muted-foreground", children: "Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 text-xs font-semibold text-muted-foreground hidden md:table-cell", children: "Phone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 text-xs font-semibold text-muted-foreground", children: "Verified" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 text-xs font-semibold text-muted-foreground", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-5 py-3 text-xs font-semibold text-muted-foreground", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: loadingOwners ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "td",
        {
          colSpan: 6,
          className: "px-5 py-8 text-center text-muted-foreground",
          children: "Loading…"
        }
      ) }) : filteredOwners.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "td",
        {
          colSpan: 6,
          className: "px-5 py-8 text-center text-muted-foreground",
          children: "No owners found"
        }
      ) }) : filteredOwners.map((owner) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          "data-ocid": `owner-row-${owner.id}`,
          className: "border-b border-border last:border-0 hover:bg-muted/20 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 font-medium text-foreground", children: owner.businessName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              CategoryBadge,
              {
                category: owner.category
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-muted-foreground hidden md:table-cell", children: owner.phone }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: owner.isVerified ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5" }),
              " Verified"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              AppButton,
              {
                size: "sm",
                variant: "secondary",
                disabled: verifyingOwnerId === owner.id,
                onClick: () => {
                  setVerifyingOwnerId(owner.id);
                  verifyOwner.mutate(owner.id, {
                    onSuccess: () => {
                      ue.success("Owner verified successfully");
                      setVerifyingOwnerId(null);
                    },
                    onError: () => setVerifyingOwnerId(null)
                  });
                },
                "data-ocid": `verify-owner-${owner.id}`,
                children: [
                  verifyingOwnerId === owner.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin mr-1" }) : null,
                  verifyingOwnerId === owner.id ? "Verifying…" : "Verify"
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatusBadge,
              {
                status: owner.isBanned ? "declined" : "accepted",
                label: owner.isBanned ? "Banned" : "Active"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                AppButton,
                {
                  size: "sm",
                  variant: owner.isBanned ? "secondary" : "danger",
                  onClick: () => banUser.mutate({
                    id: owner.id,
                    isBanned: !owner.isBanned
                  }),
                  "data-ocid": `ban-owner-${owner.id}`,
                  children: owner.isBanned ? "Unban" : "Ban"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                AppButton,
                {
                  size: "sm",
                  variant: "outline",
                  onClick: () => setSelectedOwner(owner),
                  "data-ocid": `view-owner-${owner.id}`,
                  children: "Profile"
                }
              )
            ] }) })
          ]
        },
        owner.id
      )) })
    ] }) }) }),
    selectedUser && /* @__PURE__ */ jsxRuntimeExports.jsx(
      UserProfileModal,
      {
        user: selectedUser,
        onClose: () => setSelectedUser(null)
      }
    ),
    selectedOwner && /* @__PURE__ */ jsxRuntimeExports.jsx(
      OwnerProfileModal,
      {
        owner: selectedOwner,
        onClose: () => setSelectedOwner(null)
      }
    )
  ] });
}
export {
  AdminUsers as default
};
