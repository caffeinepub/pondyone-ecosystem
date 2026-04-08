import { r as reactExports, j as jsxRuntimeExports } from "./index-CnBlQnJS.js";
import { A as AppCard } from "./AppCard-CqGSFxNm.js";
import { G as useAdminStats, H as useAllCategories, I as useRevenueByOwner } from "./useQueries--SjqMtRM.js";
import { c as createLucideIcon } from "./createLucideIcon-DNEqdOjx.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
const ChevronUp = createLucideIcon("chevron-up", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
function seedCount(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i) | 0;
  }
  return Math.abs(h) % 80 + 10;
}
function StatCard({
  label,
  value,
  accent,
  emoji
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppCard, { className: "relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute top-0 right-0 w-16 h-16 rounded-bl-3xl opacity-10",
        style: { backgroundColor: accent }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-display", style: { color: "#1A1A2E" }, children: emoji }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "text-2xl font-bold font-display mt-2",
        style: { color: accent },
        children: value
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: label })
  ] });
}
function AdminDashboard({
  onNavigate: _onNavigate
}) {
  const { data: stats } = useAdminStats();
  const { data: categories = [] } = useAllCategories();
  const { data: revenue = [] } = useRevenueByOwner();
  const [sortKey, setSortKey] = reactExports.useState("totalRevenue");
  const [sortAsc, setSortAsc] = reactExports.useState(false);
  const allKeywords = [];
  for (const cat of categories) {
    for (const kw of cat.searchKeywords) {
      allKeywords.push({ word: kw, count: seedCount(kw) });
    }
  }
  const trending = allKeywords.sort((a, b) => b.count - a.count).slice(0, 8);
  const sorted = [...revenue].sort((a, b) => {
    let diff = 0;
    if (sortKey === "businessName") {
      diff = a.businessName.localeCompare(b.businessName);
    } else if (sortKey === "totalRevenue") {
      diff = Number(a.totalRevenue - b.totalRevenue);
    } else {
      diff = Number(a.todayRevenue - b.todayRevenue);
    }
    return sortAsc ? diff : -diff;
  });
  function toggleSort(key) {
    if (sortKey === key) setSortAsc((v) => !v);
    else {
      setSortKey(key);
      setSortAsc(false);
    }
  }
  function SortIcon({ k }) {
    if (sortKey !== k) return /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3 h-3 opacity-30" });
    return sortAsc ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3 h-3", style: { color: "#FF6B35" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3 h-3", style: { color: "#FF6B35" } });
  }
  const statCards = [
    {
      label: "Total Users",
      value: String((stats == null ? void 0 : stats.totalUsers) ?? 0),
      accent: "#4A90E2",
      emoji: "👤"
    },
    {
      label: "Total Owners",
      value: String((stats == null ? void 0 : stats.totalOwners) ?? 0),
      accent: "#7ED321",
      emoji: "🏪"
    },
    {
      label: "Today's Bookings",
      value: String((stats == null ? void 0 : stats.todayBookings) ?? 0),
      accent: "#FF8C42",
      emoji: "📋"
    },
    {
      label: "Platform Revenue",
      value: `₹${Number((stats == null ? void 0 : stats.platformRevenue) ?? 0).toLocaleString("en-IN")}`,
      accent: "#9B59B6",
      emoji: "💰"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h1",
        {
          className: "text-2xl font-bold font-display",
          style: { color: "#1A1A2E" },
          children: "The Pulse 📊"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Real-time overview of the PondyOne ecosystem" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8", children: statCards.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { ...card }, card.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AppCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4", style: { color: "#FF6B35" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              className: "font-semibold font-display",
              style: { color: "#1A1A2E" },
              children: "🔥 Trending Searches"
            }
          )
        ] }),
        trending.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No categories yet" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: trending.map(({ word, count }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border",
            style: {
              backgroundColor: "rgba(255,107,53,0.08)",
              borderColor: "rgba(255,107,53,0.25)",
              color: "#c05a28"
            },
            children: [
              word,
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "px-1.5 py-0.5 rounded-full text-[10px] font-bold",
                  style: { backgroundColor: "#FF6B35", color: "#fff" },
                  children: count
                }
              )
            ]
          },
          word
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AppCard, { padded: false, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-4 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h2",
          {
            className: "font-semibold font-display",
            style: { color: "#1A1A2E" },
            children: "Revenue by Owner"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 text-xs font-semibold text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => toggleSort("businessName"),
                className: "flex items-center gap-1 hover:text-foreground transition-colors",
                children: [
                  "Owner ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SortIcon, { k: "businessName" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-5 py-3 text-xs font-semibold text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => toggleSort("totalRevenue"),
                className: "flex items-center gap-1 hover:text-foreground transition-colors ml-auto",
                children: [
                  "Total ₹ ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SortIcon, { k: "totalRevenue" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-5 py-3 text-xs font-semibold text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => toggleSort("todayRevenue"),
                className: "flex items-center gap-1 hover:text-foreground transition-colors ml-auto",
                children: [
                  "Today ₹ ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SortIcon, { k: "todayRevenue" })
                ]
              }
            ) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "td",
            {
              colSpan: 3,
              className: "px-5 py-8 text-center text-muted-foreground text-sm",
              children: "No revenue data yet"
            }
          ) }) : sorted.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "border-b border-border last:border-0 hover:bg-muted/20 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 font-medium text-foreground", children: row.businessName }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "td",
                  {
                    className: "px-5 py-3 text-right font-mono font-medium",
                    style: { color: "#7ED321" },
                    children: [
                      "₹",
                      Number(row.totalRevenue).toLocaleString("en-IN")
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3 text-right font-mono text-muted-foreground", children: [
                  "₹",
                  Number(row.todayRevenue).toLocaleString("en-IN")
                ] })
              ]
            },
            row.ownerId
          )) })
        ] }) })
      ] }) })
    ] })
  ] });
}
export {
  AdminDashboard as default
};
