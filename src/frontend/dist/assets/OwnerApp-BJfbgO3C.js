import { g as getSession, r as reactExports, j as jsxRuntimeExports, u as updateSession, c as clearSession, a as useNavigate } from "./index-DcI09W8W.js";
import { a as playAlarm, s as stopAlarm, B as BottomNav } from "./audio-D-1z7YD3.js";
import { A as AppButton } from "./AppButton-DpTDxkZU.js";
import { i as useGetOwnerById, n as useUpdateOwnerProfile, o as useBookingsByOwner, p as useFoodItemsByOwner, q as useUpdateFoodItem, r as useAddFoodItem, s as usePlaySlotsByOwner, j as useSlotsByDate, t as useAddPlaySlot, v as useToggleSlotBooking, w as useStayRoomsByOwner, x as useAddStayRoom, y as useUpdateStayRoom, z as useRetailItemsByOwner, A as useAddRetailItem, B as useUpdateRetailItem, C as useUpdateDeliveryFeePerKm, D as useCompleteOwnerOnboarding, E as useUpdateBookingStatus, F as useTicketsByOwner, l as useCreateTicket, m as useAddTicketMessage, G as useVerifySubscriptionPayment } from "./useQueries-CSZps6Zw.js";
import { S as SAFFRON, C as CATEGORY_COLORS, D as DEFAULT_LOCATION } from "./createLucideIcon-BoNvu6Kr.js";
import { C as CategoryBadge, S as StatusBadge } from "./AppBadge-DSLVf7p8.js";
import { A as AppCard } from "./AppCard-T1oYP_Vp.js";
import { S as SubscriptionStatus, B as BookingStatus, C as Category } from "./backend.d-DzWmo78T.js";
import { A as AppModal } from "./AppModal-DZh7RKm5.js";
import { u as ue } from "./index-C6mKIPDd.js";
import "./x-DiEn2gaL.js";
function OwnerAccount({ navigateHome }) {
  const session = getSession();
  const ownerId = (session == null ? void 0 : session.userId) ?? "";
  const { data: owner, isLoading } = useGetOwnerById(ownerId);
  const updateProfile = useUpdateOwnerProfile();
  const [isEditing, setIsEditing] = reactExports.useState(false);
  const [businessName, setBusinessName] = reactExports.useState("");
  const [upiId, setUpiId] = reactExports.useState("");
  const [isActive, setIsActive] = reactExports.useState(true);
  const [saved, setSaved] = reactExports.useState(false);
  function startEdit() {
    setBusinessName((owner == null ? void 0 : owner.businessName) ?? "");
    setUpiId((owner == null ? void 0 : owner.upiId) ?? "");
    setIsActive((owner == null ? void 0 : owner.isActive) ?? true);
    setIsEditing(true);
  }
  async function handleSave() {
    if (!businessName.trim()) return;
    await updateProfile.mutateAsync({
      id: ownerId,
      businessName,
      upiId,
      isActive
    });
    updateSession({ name: businessName });
    setSaved(true);
    setTimeout(() => setSaved(false), 2e3);
    setIsEditing(false);
  }
  function handleLogout() {
    clearSession();
    navigateHome();
  }
  const category = (owner == null ? void 0 : owner.category) ?? "food";
  function SubscriptionBadge() {
    if (!owner) return null;
    const status = owner.subscriptionStatus;
    if (status === SubscriptionStatus.active) {
      const expiry = owner.subscriptionExpiryDate && owner.subscriptionExpiryDate > 0n ? new Date(
        Number(owner.subscriptionExpiryDate / 1000000n)
      ).toLocaleDateString("en-IN") : null;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-semibold", children: "✓ Subscription Active" }),
        expiry && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
          "Expires ",
          expiry
        ] })
      ] });
    }
    if (status === SubscriptionStatus.expired) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 font-semibold", children: "⚠ Subscription Expired" });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-semibold", children: "✕ Subscription Inactive" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-4 pt-10 pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-card",
          style: { backgroundColor: `${SAFFRON}20` },
          children: "🏪"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 w-40 bg-muted rounded animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-24 bg-muted rounded animate-pulse" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold font-display text-foreground truncate", children: (owner == null ? void 0 : owner.businessName) || (session == null ? void 0 : session.name) || "Business Owner" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CategoryBadge,
            {
              category
            }
          ),
          (owner == null ? void 0 : owner.isVerified) ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold", children: "✓ Verified" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold", children: "Unverified" }),
          (owner == null ? void 0 : owner.isActive) ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-semibold", children: "Active" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-semibold", children: "Inactive" })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-5 max-w-lg mx-auto space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AppCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold font-display text-foreground mb-2", children: "Subscription" }),
            isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 w-32 bg-muted rounded animate-pulse" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(SubscriptionBadge, {}),
            (owner == null ? void 0 : owner.lastSubscriptionTxId) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-1.5 truncate", children: [
              "Last Tx: ",
              owner.lastSubscriptionTxId
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0",
              style: { backgroundColor: `${SAFFRON}15` },
              children: "💳"
            }
          )
        ] }),
        owner && owner.subscriptionStatus !== SubscriptionStatus.active && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "mt-3 rounded-xl p-3 text-xs",
            style: {
              backgroundColor: "#FEF3C720",
              borderLeft: `3px solid ${SAFFRON}`
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium", children: "Store not visible to customers" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-0.5", children: [
                "Pay ₹1,500/month to",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold", children: "akkumaresh@ybl" }),
                " ",
                "to activate."
              ] })
            ]
          }
        )
      ] }),
      !isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsx(AppCard, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold font-display text-foreground", children: "Business Info" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AppButton,
            {
              size: "sm",
              variant: "outline",
              onClick: startEdit,
              "data-ocid": "edit-profile-btn",
              children: "Edit"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            InfoRow,
            {
              label: "Business Name",
              value: (owner == null ? void 0 : owner.businessName) || "—"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "UPI ID", value: (owner == null ? void 0 : owner.upiId) || "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Phone", value: (session == null ? void 0 : session.phone) || "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Location", value: (owner == null ? void 0 : owner.locationText) || "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            InfoRow,
            {
              label: "Status",
              value: (owner == null ? void 0 : owner.isActive) ? "Active" : "Inactive"
            }
          )
        ] })
      ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(AppCard, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold font-display text-foreground", children: "Edit Profile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "acc-biz-name",
              className: "block text-sm font-medium text-foreground mb-1.5",
              children: "Business Name"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "acc-biz-name",
              type: "text",
              value: businessName,
              onChange: (e) => setBusinessName(e.target.value),
              className: "w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "acc-upi",
              className: "block text-sm font-medium text-foreground mb-1.5",
              children: "UPI ID"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "acc-upi",
              type: "text",
              value: upiId,
              onChange: (e) => setUpiId(e.target.value),
              placeholder: "e.g. business@paytm",
              className: "w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 rounded-xl bg-muted/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Accepting Orders?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Customers can only book active businesses" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setIsActive((v) => !v),
              className: "w-12 h-6 rounded-full transition-colors focus-visible:outline-none",
              style: { backgroundColor: isActive ? "#22C55E" : "#d1d5db" },
              "aria-label": "Toggle active status",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "block w-5 h-5 rounded-full bg-white shadow transition-transform mx-0.5",
                  style: {
                    transform: isActive ? "translateX(24px)" : "translateX(0)"
                  }
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AppButton,
            {
              variant: "outline",
              fullWidth: true,
              onClick: () => setIsEditing(false),
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AppButton,
            {
              fullWidth: true,
              onClick: handleSave,
              disabled: !businessName.trim() || updateProfile.isPending,
              "data-ocid": "save-profile-btn",
              children: updateProfile.isPending ? "Saving…" : "Save Changes"
            }
          )
        ] }),
        saved && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-center", style: { color: "#22C55E" }, children: "✓ Profile updated!" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AppCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold font-display text-foreground mb-3", children: "Account Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Owner ID", value: `#${ownerId.slice(0, 8)}…` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Role", value: "Business Owner" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            InfoRow,
            {
              label: "Member Since",
              value: (owner == null ? void 0 : owner.createdAt) ? new Date(
                Number(owner.createdAt / 1000000n)
              ).toLocaleDateString("en-IN") : "—"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AppButton,
        {
          variant: "danger",
          fullWidth: true,
          size: "lg",
          onClick: handleLogout,
          "data-ocid": "owner-logout",
          children: "Sign Out"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground pb-4", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        ".",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`,
            className: "underline",
            target: "_blank",
            rel: "noopener noreferrer",
            children: "Built with love using caffeine.ai"
          }
        )
      ] })
    ] })
  ] });
}
function InfoRow({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground text-right truncate max-w-[60%]", children: value })
  ] });
}
function getPeriodStart(period) {
  const now = /* @__PURE__ */ new Date();
  if (period === "today") {
    return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  }
  if (period === "week") {
    const day = now.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + diff
    ).getTime();
  }
  return new Date(now.getFullYear(), now.getMonth(), 1).getTime();
}
function filterByPeriod(bookings, period) {
  const start = getPeriodStart(period);
  return bookings.filter((b) => Number(b.createdAt / 1000000n) >= start);
}
function isCompleted(b) {
  return b.status === BookingStatus.accepted || b.status === BookingStatus.completed;
}
function buildChartBars(bookings, period) {
  const completed = bookings.filter(isCompleted);
  if (period === "today") {
    const buckets = ["12AM–6AM", "6AM–12PM", "12PM–6PM", "6PM–12AM"];
    const values2 = [0, 0, 0, 0];
    for (const b of completed) {
      const h = new Date(Number(b.createdAt / 1000000n)).getHours();
      values2[Math.floor(h / 6)] += Number(b.amountInr);
    }
    return buckets.map((label, i) => ({ label, value: values2[i] }));
  }
  if (period === "week") {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const values2 = [0, 0, 0, 0, 0, 0, 0];
    const weekStart = getPeriodStart("week");
    for (const b of completed) {
      const ms = Number(b.createdAt / 1000000n);
      const dayIdx = Math.floor((ms - weekStart) / 864e5);
      if (dayIdx >= 0 && dayIdx < 7) values2[dayIdx] += Number(b.amountInr);
    }
    return days.map((label, i) => ({ label, value: values2[i] }));
  }
  const monthStart = getPeriodStart("month");
  const values = [0, 0, 0, 0, 0];
  for (const b of completed) {
    const ms = Number(b.createdAt / 1000000n);
    const weekIdx = Math.min(Math.floor((ms - monthStart) / (7 * 864e5)), 4);
    if (weekIdx >= 0) values[weekIdx] += Number(b.amountInr);
  }
  return ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5"].map((label, i) => ({
    label,
    value: values[i]
  }));
}
function BarChart({ bars }) {
  const max = Math.max(...bars.map((b) => b.value), 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-1.5 h-28 w-full", children: bars.map((bar) => {
    const pct = bar.value / max * 100;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-1 flex-1 min-w-0",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full flex items-end justify-center h-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-full rounded-t-md transition-all duration-500",
              style: {
                height: `${Math.max(pct, 4)}%`,
                backgroundColor: pct > 0 ? SAFFRON : "#e5e7eb",
                opacity: pct > 0 ? 1 : 0.4
              },
              title: `₹${bar.value.toLocaleString()}`
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground text-center leading-tight truncate w-full text-center", children: bar.label })
        ]
      },
      bar.label
    );
  }) });
}
const CATEGORY_EMOJI = {
  [Category.food]: "🍽️",
  [Category.stay]: "🏨",
  [Category.play]: "⚽",
  [Category.retail]: "🛒"
};
function RecentOrders({ bookings }) {
  const recent = [...bookings].sort((a, b) => Number(b.createdAt - a.createdAt)).slice(0, 5);
  if (recent.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AppCard, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-4", children: "No bookings yet for this period" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: recent.map((order) => /* @__PURE__ */ jsxRuntimeExports.jsx(AppCard, { padded: false, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0",
        style: {
          backgroundColor: `${CATEGORY_COLORS[order.category] ?? SAFFRON}20`
        },
        children: CATEGORY_EMOJI[order.category] ?? "📋"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: order.itemRef }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "₹",
        order.amountInr.toString(),
        " ·",
        " ",
        new Date(
          Number(order.createdAt / 1000000n)
        ).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short"
        })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: order.status })
  ] }) }, order.id)) });
}
const PERIODS = [
  { key: "today", label: "Today" },
  { key: "week", label: "This Week" },
  { key: "month", label: "This Month" }
];
function OwnerDashboard() {
  const session = getSession();
  const ownerId = (session == null ? void 0 : session.userId) ?? "";
  const { data: owner, isLoading: ownerLoading } = useGetOwnerById(ownerId);
  const { data: allBookings = [], isLoading: bookingsLoading } = useBookingsByOwner(ownerId);
  const [period, setPeriod] = reactExports.useState("week");
  const periodBookings = reactExports.useMemo(
    () => filterByPeriod(allBookings, period),
    [allBookings, period]
  );
  const completedBookings = reactExports.useMemo(
    () => periodBookings.filter(isCompleted),
    [periodBookings]
  );
  const totalSales = completedBookings.length;
  const totalEarnings = completedBookings.reduce(
    (sum, b) => sum + Number(b.amountInr),
    0
  );
  const chartBars = reactExports.useMemo(
    () => buildChartBars(periodBookings, period),
    [periodBookings, period]
  );
  const businessName = (owner == null ? void 0 : owner.businessName) || (session == null ? void 0 : session.name) || "My Business";
  const isLoading = ownerLoading || bookingsLoading;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-4 pt-10 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 max-w-lg mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0",
          style: { backgroundColor: SAFFRON },
          children: "📊"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-base font-bold font-display text-foreground truncate", children: businessName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Analytics Dashboard" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-5 max-w-lg mx-auto space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", "data-ocid": "period-selector", children: PERIODS.map(({ key, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setPeriod(key),
          "data-ocid": `period-${key}`,
          className: "flex-1 py-2 rounded-xl text-xs font-semibold transition-colors border",
          style: {
            backgroundColor: period === key ? SAFFRON : "transparent",
            color: period === key ? "#fff" : void 0,
            borderColor: period === key ? SAFFRON : "var(--border)"
          },
          children: label
        },
        key
      )) }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [1, 2].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-24 rounded-2xl bg-muted animate-pulse"
        },
        n
      )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AppCard, { padded: false, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: "Total Sales" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-3xl font-bold font-display",
              style: { color: SAFFRON },
              "data-ocid": "stat-total-sales",
              children: totalSales
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "accepted bookings" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AppCard, { padded: false, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: "Total Earnings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              className: "text-2xl font-bold font-display",
              style: { color: SAFFRON },
              "data-ocid": "stat-total-earnings",
              children: [
                "₹",
                totalEarnings >= 1e3 ? `${(totalEarnings / 1e3).toFixed(1)}k` : totalEarnings.toLocaleString("en-IN")
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "from completed orders" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AppCard, { padded: false, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold font-display text-foreground", children: "Revenue Trend" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: period === "today" ? "By 6-hour block" : period === "week" ? "This week" : "By week" })
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-28 rounded-xl bg-muted animate-pulse" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(BarChart, { bars: chartBars })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold font-display text-foreground mb-3", children: "📦 Recent Orders" }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-16 rounded-xl bg-muted animate-pulse"
          },
          n
        )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RecentOrders, { bookings: periodBookings })
      ] })
    ] })
  ] });
}
function FoodInventory({ ownerId }) {
  const { data: items = [], isLoading } = useFoodItemsByOwner(ownerId);
  const updateFood = useUpdateFoodItem();
  const addFood = useAddFoodItem();
  const [showAddModal, setShowAddModal] = reactExports.useState(false);
  const [editItem, setEditItem] = reactExports.useState(null);
  const [fname, setFname] = reactExports.useState("");
  const [fprice, setFprice] = reactExports.useState("");
  const [fveg, setFveg] = reactExports.useState(false);
  const [fdesc, setFdesc] = reactExports.useState("");
  function resetForm() {
    setFname("");
    setFprice("");
    setFveg(false);
    setFdesc("");
  }
  async function handleAdd() {
    if (!fname || !fprice) return;
    await addFood.mutateAsync({
      ownerId,
      itemName: fname,
      priceInr: BigInt(fprice),
      isVeg: fveg,
      description: fdesc
    });
    resetForm();
    setShowAddModal(false);
    ue.success("Item added!");
  }
  async function handleEdit() {
    if (!editItem) return;
    await updateFood.mutateAsync({ ...editItem, priceInr: editItem.priceInr });
    setEditItem(null);
    ue.success("Item updated!");
  }
  async function toggleAvailability(item) {
    await updateFood.mutateAsync({ ...item, isAvailable: !item.isAvailable });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold font-display text-foreground", children: "🍽️ Menu Items" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AppButton,
        {
          size: "sm",
          onClick: () => setShowAddModal(true),
          "data-ocid": "add-food-item",
          children: "+ Add Item"
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 rounded-xl bg-muted animate-pulse" }, n)) }) : items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(AppCard, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-4", children: "No menu items yet. Add your first dish!" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(AppCard, { padded: false, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0",
          style: {
            backgroundColor: `${CATEGORY_COLORS.food}20`,
            color: CATEGORY_COLORS.food
          },
          children: item.isVeg ? "🌿" : "🍗"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: item.itemName }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "₹",
          item.priceInr.toString()
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setEditItem({ ...item }),
            className: "text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded-lg hover:bg-muted transition-colors",
            "aria-label": "Edit item",
            children: "✏️"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => toggleAvailability(item),
            className: "w-10 h-5 rounded-full transition-colors focus-visible:outline-none",
            style: {
              backgroundColor: item.isAvailable ? "#22C55E" : "#d1d5db"
            },
            "aria-label": item.isAvailable ? "Mark unavailable" : "Mark available",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "block w-4 h-4 rounded-full bg-white shadow transition-transform mx-0.5",
                style: {
                  transform: item.isAvailable ? "translateX(20px)" : "translateX(0)"
                }
              }
            )
          }
        )
      ] })
    ] }) }, item.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AppModal,
      {
        isOpen: showAddModal,
        onClose: () => setShowAddModal(false),
        title: "Add Menu Item",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "inv-food-name",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Item Name"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "inv-food-name",
                type: "text",
                value: fname,
                onChange: (e) => setFname(e.target.value),
                placeholder: "e.g. Chicken Biryani",
                className: "w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "inv-food-price",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Price (₹)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "inv-food-price",
                type: "number",
                value: fprice,
                onChange: (e) => setFprice(e.target.value),
                min: "1",
                className: "w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "inv-food-desc",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Description"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                id: "inv-food-desc",
                value: fdesc,
                onChange: (e) => setFdesc(e.target.value),
                rows: 2,
                className: "w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: "Vegetarian" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setFveg((v) => !v),
                className: "w-10 h-5 rounded-full transition-colors",
                style: { backgroundColor: fveg ? "#22C55E" : "#d1d5db" },
                "aria-label": "Toggle vegetarian",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "block w-4 h-4 rounded-full bg-white shadow mx-0.5 transition-transform",
                    style: {
                      transform: fveg ? "translateX(20px)" : "translateX(0)"
                    }
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AppButton, { fullWidth: true, onClick: handleAdd, disabled: !fname || !fprice, children: "Save Item" })
        ] })
      }
    ),
    editItem && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AppModal,
      {
        isOpen: !!editItem,
        onClose: () => setEditItem(null),
        title: "Edit Item",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "inv-edit-food-name",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Item Name"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "inv-edit-food-name",
                type: "text",
                value: editItem.itemName,
                onChange: (e) => setEditItem({ ...editItem, itemName: e.target.value }),
                className: "w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "inv-edit-food-price",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Price (₹)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "inv-edit-food-price",
                type: "number",
                value: editItem.priceInr.toString(),
                onChange: (e) => setEditItem({
                  ...editItem,
                  priceInr: BigInt(e.target.value || "0")
                }),
                className: "w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AppButton, { fullWidth: true, onClick: handleEdit, children: "Update Item" })
        ] })
      }
    )
  ] });
}
function getTodayStr() {
  return (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
}
function TurfInventory({ ownerId }) {
  const today = getTodayStr();
  const [selectedDate, setSelectedDate] = reactExports.useState(today);
  const { data: allSlots = [], isLoading } = usePlaySlotsByOwner(ownerId);
  const { data: dateSlots = [] } = useSlotsByDate(ownerId, selectedDate);
  const addSlot = useAddPlaySlot();
  const toggleBooking = useToggleSlotBooking();
  const [showAddModal, setShowAddModal] = reactExports.useState(false);
  const [slotDate, setSlotDate] = reactExports.useState(today);
  const [startTime, setStartTime] = reactExports.useState("06:00");
  const [endTime, setEndTime] = reactExports.useState("07:00");
  const [hourlyRate, setHourlyRate] = reactExports.useState("500");
  const [surfaceType, setSurfaceType] = reactExports.useState("Natural Grass");
  const [slotDesc, setSlotDesc] = reactExports.useState("");
  const slotsByDate = allSlots.reduce((acc, s) => {
    const d = s.slotDate || today;
    if (!acc[d]) acc[d] = [];
    acc[d].push(s);
    return acc;
  }, {});
  const displaySlots = selectedDate in slotsByDate ? slotsByDate[selectedDate] : dateSlots;
  const uniqueDates = Array.from(
    new Set(allSlots.map((s) => s.slotDate || today))
  ).sort();
  async function handleAddSlot() {
    if (!slotDate || !startTime || !endTime || !hourlyRate) return;
    try {
      await addSlot.mutateAsync({
        ownerId,
        slotDate,
        startTime,
        endTime,
        surfaceType,
        hourlyRate: BigInt(hourlyRate),
        description: slotDesc
      });
      ue.success("Slot added!");
      setSlotDesc("");
      setShowAddModal(false);
      setSelectedDate(slotDate);
    } catch {
      ue.error("Failed to add slot");
    }
  }
  async function handleToggle(slot) {
    if (slot.isBooked) {
      const confirmed = window.confirm(
        `Unbook ${slot.startTime}–${slot.endTime}?`
      );
      if (!confirmed) return;
      await toggleBooking.mutateAsync({
        id: slot.id,
        isBooked: false,
        bookedByUserId: null
      });
      ue.success("Slot unbooked");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold font-display text-foreground", children: "⚽ Time Slots" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AppButton,
        {
          size: "sm",
          onClick: () => setShowAddModal(true),
          "data-ocid": "add-play-slot",
          children: "+ Add Slot"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "inv-slot-date",
          className: "block text-xs font-medium text-muted-foreground mb-1.5",
          children: "View date"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id: "inv-slot-date",
          type: "date",
          value: selectedDate,
          onChange: (e) => setSelectedDate(e.target.value),
          className: "h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        }
      )
    ] }),
    uniqueDates.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-1 scrollbar-none", children: uniqueDates.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setSelectedDate(d),
        className: "flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors",
        style: {
          backgroundColor: selectedDate === d ? SAFFRON : void 0,
          color: selectedDate === d ? "#fff" : void 0
        },
        children: d === today ? "Today" : d
      },
      d
    )) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: ["s1", "s2", "s3", "s4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 rounded-xl bg-muted animate-pulse" }, k)) }) : displaySlots.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(AppCard, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground text-center py-4", children: [
      "No slots for ",
      selectedDate === today ? "today" : selectedDate,
      '. Tap "+ Add Slot".'
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: displaySlots.map((slot) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl p-3 border-2",
        style: {
          backgroundColor: slot.isBooked ? "#FEF2F2" : "#F0FDF4",
          borderColor: slot.isBooked ? "#FCA5A5" : "#86EFAC"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
              style: {
                backgroundColor: slot.isBooked ? "#EF4444" : "#22C55E",
                color: "#fff"
              },
              children: slot.isBooked ? "BOOKED" : "AVAILABLE"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-foreground mt-1", children: [
            slot.startTime,
            " – ",
            slot.endTime
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "₹",
            slot.hourlyRate.toString(),
            "/hr"
          ] }),
          slot.isBooked && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => handleToggle(slot),
              className: "mt-2 w-full text-[11px] font-semibold py-1 rounded-lg",
              style: { backgroundColor: "#FEE2E2", color: "#EF4444" },
              children: "Unbook"
            }
          )
        ]
      },
      slot.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AppModal,
      {
        isOpen: showAddModal,
        onClose: () => setShowAddModal(false),
        title: "Add Time Slot",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "inv-slot-add-date",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Date"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "inv-slot-add-date",
                type: "date",
                value: slotDate,
                onChange: (e) => setSlotDate(e.target.value),
                min: today,
                className: "w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "inv-slot-start",
                  className: "block text-sm font-medium text-foreground mb-1",
                  children: "Start Time"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "inv-slot-start",
                  type: "time",
                  value: startTime,
                  onChange: (e) => setStartTime(e.target.value),
                  className: "w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "inv-slot-end",
                  className: "block text-sm font-medium text-foreground mb-1",
                  children: "End Time"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "inv-slot-end",
                  type: "time",
                  value: endTime,
                  onChange: (e) => setEndTime(e.target.value),
                  className: "w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "inv-slot-rate",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Hourly Rate (₹)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "inv-slot-rate",
                type: "number",
                value: hourlyRate,
                onChange: (e) => setHourlyRate(e.target.value),
                min: "1",
                className: "w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "inv-slot-surface",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Surface Type"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "inv-slot-surface",
                value: surfaceType,
                onChange: (e) => setSurfaceType(e.target.value),
                className: "w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Natural Grass" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Artificial Turf" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Concrete" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Wooden Court" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "inv-slot-desc",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Description (optional)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                id: "inv-slot-desc",
                value: slotDesc,
                onChange: (e) => setSlotDesc(e.target.value),
                rows: 2,
                className: "w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AppButton,
            {
              fullWidth: true,
              onClick: handleAddSlot,
              disabled: addSlot.isPending || !slotDate || !startTime || !endTime,
              children: addSlot.isPending ? "Adding…" : "Add Slot"
            }
          )
        ] })
      }
    )
  ] });
}
function StayInventory({ ownerId }) {
  const { data: rooms = [], isLoading } = useStayRoomsByOwner(ownerId);
  const addRoom = useAddStayRoom();
  const updateRoom = useUpdateStayRoom();
  const [showAddModal, setShowAddModal] = reactExports.useState(false);
  const [editRoom, setEditRoom] = reactExports.useState(null);
  const [roomName, setRoomName] = reactExports.useState("");
  const [amenities, setAmenities] = reactExports.useState("AC, WiFi, TV");
  const [pricePerNight, setPricePerNight] = reactExports.useState("1500");
  const [editRoomName, setEditRoomName] = reactExports.useState("");
  const [editAmenities, setEditAmenities] = reactExports.useState("");
  const [editPrice, setEditPrice] = reactExports.useState("");
  function openEdit(room) {
    setEditRoom(room);
    setEditRoomName(room.roomName);
    setEditAmenities(room.amenities.join(", "));
    setEditPrice(room.pricePerNight.toString());
  }
  async function handleAddRoom() {
    if (!roomName) return;
    await addRoom.mutateAsync({
      ownerId,
      roomName,
      amenities: amenities.split(",").map((a) => a.trim()).filter(Boolean),
      pricePerNight: BigInt(pricePerNight || "0")
    });
    setRoomName("");
    setAmenities("AC, WiFi, TV");
    setPricePerNight("1500");
    setShowAddModal(false);
    ue.success("Room added!");
  }
  async function handleEditRoom() {
    if (!editRoom) return;
    await updateRoom.mutateAsync({
      id: editRoom.id,
      roomName: editRoomName,
      amenities: editAmenities.split(",").map((a) => a.trim()).filter(Boolean),
      pricePerNight: BigInt(editPrice || "0"),
      isAvailable: editRoom.isAvailable
    });
    ue.success("Room updated!");
    setEditRoom(null);
  }
  async function toggleAvailable(room) {
    await updateRoom.mutateAsync({ ...room, isAvailable: !room.isAvailable });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold font-display text-foreground", children: "🏨 Rooms" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AppButton,
        {
          size: "sm",
          onClick: () => setShowAddModal(true),
          "data-ocid": "add-stay-room",
          children: "+ Add Room"
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [1, 2].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-36 rounded-2xl bg-muted animate-pulse" }, n)) }) : rooms.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(AppCard, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-4", children: "No rooms added yet" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: rooms.map((room) => /* @__PURE__ */ jsxRuntimeExports.jsx(AppCard, { padded: false, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-9 h-9 rounded-lg flex items-center justify-center",
            style: { backgroundColor: `${CATEGORY_COLORS.stay}20` },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "🏨" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => openEdit(room),
            "aria-label": "Edit room",
            className: "text-sm text-muted-foreground hover:text-foreground px-1.5 py-1 rounded-lg hover:bg-muted transition-colors",
            children: "✏️"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: room.roomName }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "₹",
        room.pricePerNight.toString(),
        "/night"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => toggleAvailable(room),
          className: "w-full text-xs font-semibold py-1.5 rounded-lg",
          style: {
            backgroundColor: room.isAvailable ? "#DCFCE7" : "#FEE2E2",
            color: room.isAvailable ? "#16A34A" : "#EF4444"
          },
          children: room.isAvailable ? "✓ Available" : "✕ Occupied"
        }
      )
    ] }) }, room.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AppModal,
      {
        isOpen: showAddModal,
        onClose: () => setShowAddModal(false),
        title: "Add Room",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "inv-room-name",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Room Name"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "inv-room-name",
                type: "text",
                value: roomName,
                onChange: (e) => setRoomName(e.target.value),
                placeholder: "e.g. Deluxe Suite",
                className: "w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "inv-room-amenities",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Amenities"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "inv-room-amenities",
                type: "text",
                value: amenities,
                onChange: (e) => setAmenities(e.target.value),
                placeholder: "AC, WiFi, TV",
                className: "w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "inv-room-price",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Price/Night (₹)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "inv-room-price",
                type: "number",
                value: pricePerNight,
                onChange: (e) => setPricePerNight(e.target.value),
                min: "1",
                className: "w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AppButton, { fullWidth: true, onClick: handleAddRoom, disabled: !roomName, children: "Add Room" })
        ] })
      }
    ),
    editRoom && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AppModal,
      {
        isOpen: !!editRoom,
        onClose: () => setEditRoom(null),
        title: "Edit Room",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "inv-edit-room-name",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Room Name"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "inv-edit-room-name",
                type: "text",
                value: editRoomName,
                onChange: (e) => setEditRoomName(e.target.value),
                className: "w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "inv-edit-room-amenities",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Amenities"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "inv-edit-room-amenities",
                type: "text",
                value: editAmenities,
                onChange: (e) => setEditAmenities(e.target.value),
                className: "w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "inv-edit-room-price",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Price/Night (₹)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "inv-edit-room-price",
                type: "number",
                value: editPrice,
                onChange: (e) => setEditPrice(e.target.value),
                min: "1",
                className: "w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AppButton,
            {
              fullWidth: true,
              onClick: handleEditRoom,
              disabled: updateRoom.isPending || !editRoomName,
              children: updateRoom.isPending ? "Saving…" : "Update Room"
            }
          )
        ] })
      }
    )
  ] });
}
function RetailInventory({ ownerId }) {
  var _a;
  const { data: items = [], isLoading } = useRetailItemsByOwner(ownerId);
  const addItem = useAddRetailItem();
  const updateItem = useUpdateRetailItem();
  const updateDeliveryFee = useUpdateDeliveryFeePerKm();
  const [showAddModal, setShowAddModal] = reactExports.useState(false);
  const [showDeliveryModal, setShowDeliveryModal] = reactExports.useState(false);
  const [editItem, setEditItem] = reactExports.useState(null);
  const [rname, setRname] = reactExports.useState("");
  const [rprice, setRprice] = reactExports.useState("");
  const [rcat, setRcat] = reactExports.useState("Groceries");
  const [rqty, setRqty] = reactExports.useState("50");
  const currentFeePerKm = ((_a = items[0]) == null ? void 0 : _a.deliveryFeePerKm) ?? 0n;
  const [deliveryRate, setDeliveryRate] = reactExports.useState(currentFeePerKm.toString());
  async function handleAdd() {
    if (!rname || !rprice) return;
    await addItem.mutateAsync({
      ownerId,
      itemName: rname,
      priceInr: BigInt(rprice),
      category: rcat,
      quantity: BigInt(rqty || "0")
    });
    setRname("");
    setRprice("");
    setRqty("50");
    setShowAddModal(false);
    ue.success("Item added!");
  }
  async function handleEdit() {
    if (!editItem) return;
    await updateItem.mutateAsync({
      id: editItem.id,
      itemName: editItem.itemName,
      priceInr: editItem.priceInr,
      category: editItem.category,
      inStock: editItem.inStock,
      quantity: editItem.quantity
    });
    ue.success("Item updated!");
    setEditItem(null);
  }
  async function toggleStock(item) {
    await updateItem.mutateAsync({ ...item, inStock: !item.inStock });
  }
  async function handleSaveDeliveryFee() {
    try {
      await updateDeliveryFee.mutateAsync({
        ownerId,
        rate: BigInt(deliveryRate || "0")
      });
      ue.success("Delivery fee updated!");
      setShowDeliveryModal(false);
    } catch {
      ue.error("Failed to update delivery fee");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppCard, { padded: false, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "🚚" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Delivery Fee" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: currentFeePerKm > 0n ? `₹${currentFeePerKm.toString()}/km` : "Not configured" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AppButton,
        {
          size: "sm",
          onClick: () => {
            setDeliveryRate(currentFeePerKm.toString());
            setShowDeliveryModal(true);
          },
          "data-ocid": "delivery-settings",
          children: "Configure"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold font-display text-foreground", children: "🛒 Inventory" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AppButton,
        {
          size: "sm",
          onClick: () => setShowAddModal(true),
          "data-ocid": "add-retail-item",
          children: "+ Add Item"
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 rounded-xl bg-muted animate-pulse" }, n)) }) : items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(AppCard, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-4", children: "No inventory added yet" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: items.map((item) => {
      const lowStock = item.quantity < 5n;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(AppCard, { padded: false, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0",
            style: { backgroundColor: `${CATEGORY_COLORS.retail}20` },
            children: "🛒"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: item.itemName }),
            lowStock && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-[10px] px-1.5 py-0.5 rounded-full font-semibold flex-shrink-0",
                style: {
                  backgroundColor: "#FFF3E0",
                  color: "#E65100"
                },
                children: "Low"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "₹",
            item.priceInr.toString(),
            " · ",
            item.category,
            " · Qty:",
            " ",
            item.quantity.toString()
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setEditItem({ ...item }),
              "aria-label": "Edit item",
              className: "text-sm text-muted-foreground hover:text-foreground px-1.5 py-1 rounded-lg hover:bg-muted transition-colors",
              children: "✏️"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => toggleStock(item),
              className: "text-xs font-semibold px-2.5 py-1.5 rounded-lg",
              style: {
                backgroundColor: item.inStock ? "#DCFCE7" : "#FEE2E2",
                color: item.inStock ? "#16A34A" : "#EF4444"
              },
              children: item.inStock ? "In Stock" : "Out"
            }
          )
        ] })
      ] }) }, item.id);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AppModal,
      {
        isOpen: showDeliveryModal,
        onClose: () => setShowDeliveryModal(false),
        title: "🚚 Delivery Settings",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rounded-xl p-3",
              style: { backgroundColor: `${SAFFRON}15` },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Flat rate per km. E.g. ₹10/km means a 5 km delivery costs ₹50." })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "inv-delivery-rate",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Rate per km (₹)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold text-muted-foreground", children: "₹" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "inv-delivery-rate",
                  type: "number",
                  value: deliveryRate,
                  onChange: (e) => setDeliveryRate(e.target.value),
                  min: "0",
                  step: "1",
                  placeholder: "e.g. 10",
                  className: "flex-1 h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary",
                  "data-ocid": "delivery-rate-input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "/km" })
            ] })
          ] }),
          deliveryRate && Number(deliveryRate) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl p-3 bg-muted/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: "Preview:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2 text-center", children: [2, 5, 10].map((km) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-lg p-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                km,
                " km"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-foreground", children: [
                "₹",
                (km * Number(deliveryRate)).toFixed(0)
              ] })
            ] }, km)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AppButton,
            {
              fullWidth: true,
              onClick: handleSaveDeliveryFee,
              disabled: updateDeliveryFee.isPending,
              children: updateDeliveryFee.isPending ? "Saving…" : "Save Delivery Rate"
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AppModal,
      {
        isOpen: showAddModal,
        onClose: () => setShowAddModal(false),
        title: "Add Inventory Item",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "inv-retail-name",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Item Name"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "inv-retail-name",
                type: "text",
                value: rname,
                onChange: (e) => setRname(e.target.value),
                className: "w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "inv-retail-price",
                  className: "block text-sm font-medium text-foreground mb-1",
                  children: "Price (₹)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "inv-retail-price",
                  type: "number",
                  value: rprice,
                  onChange: (e) => setRprice(e.target.value),
                  min: "1",
                  className: "w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "inv-retail-qty",
                  className: "block text-sm font-medium text-foreground mb-1",
                  children: "Quantity"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "inv-retail-qty",
                  type: "number",
                  value: rqty,
                  onChange: (e) => setRqty(e.target.value),
                  min: "0",
                  className: "w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "inv-retail-cat",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Category"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "inv-retail-cat",
                value: rcat,
                onChange: (e) => setRcat(e.target.value),
                className: "w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Groceries" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Meds" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Toys" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AppButton, { fullWidth: true, onClick: handleAdd, disabled: !rname || !rprice, children: "Add Item" })
        ] })
      }
    ),
    editItem && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AppModal,
      {
        isOpen: !!editItem,
        onClose: () => setEditItem(null),
        title: "Edit Item",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "inv-edit-retail-name",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Item Name"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "inv-edit-retail-name",
                type: "text",
                value: editItem.itemName,
                onChange: (e) => setEditItem({ ...editItem, itemName: e.target.value }),
                className: "w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "inv-edit-retail-price",
                  className: "block text-sm font-medium text-foreground mb-1",
                  children: "Price (₹)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "inv-edit-retail-price",
                  type: "number",
                  value: editItem.priceInr.toString(),
                  onChange: (e) => setEditItem({
                    ...editItem,
                    priceInr: BigInt(e.target.value || "0")
                  }),
                  min: "1",
                  className: "w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "inv-edit-retail-qty",
                  className: "block text-sm font-medium text-foreground mb-1",
                  children: "Quantity"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "inv-edit-retail-qty",
                  type: "number",
                  value: editItem.quantity.toString(),
                  onChange: (e) => setEditItem({
                    ...editItem,
                    quantity: BigInt(e.target.value || "0")
                  }),
                  min: "0",
                  className: "w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AppButton,
            {
              fullWidth: true,
              onClick: handleEdit,
              disabled: updateItem.isPending || !editItem.itemName,
              children: updateItem.isPending ? "Saving…" : "Update Item"
            }
          )
        ] })
      }
    )
  ] });
}
function OwnerInventory() {
  const session = getSession();
  const ownerId = (session == null ? void 0 : session.userId) ?? "";
  const { data: owner, isLoading } = useGetOwnerById(ownerId);
  const category = (owner == null ? void 0 : owner.category) ?? Category.food;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-4 pt-10 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold font-display text-foreground", children: "Inventory" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Manage your listings and stock" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-5 max-w-lg mx-auto", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-20 rounded-2xl bg-muted animate-pulse"
      },
      n
    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      category === Category.food && /* @__PURE__ */ jsxRuntimeExports.jsx(FoodInventory, { ownerId }),
      category === Category.play && /* @__PURE__ */ jsxRuntimeExports.jsx(TurfInventory, { ownerId }),
      category === Category.stay && /* @__PURE__ */ jsxRuntimeExports.jsx(StayInventory, { ownerId }),
      category === Category.retail && /* @__PURE__ */ jsxRuntimeExports.jsx(RetailInventory, { ownerId })
    ] }) })
  ] });
}
const CATEGORY_OPTIONS = [
  {
    key: Category.food,
    label: "Restaurant",
    emoji: "🍔",
    color: CATEGORY_COLORS.food
  },
  {
    key: Category.play,
    label: "Turf / Sport",
    emoji: "⚽",
    color: CATEGORY_COLORS.play
  },
  {
    key: Category.stay,
    label: "Stay / Hotel",
    emoji: "🏨",
    color: CATEGORY_COLORS.stay
  },
  {
    key: Category.retail,
    label: "Retail Shop",
    emoji: "🛒",
    color: CATEGORY_COLORS.retail
  }
];
const SLOT_TIMES = Array.from({ length: 18 }, (_, i) => {
  const hour = i + 6;
  const suffix = hour < 12 ? "AM" : "PM";
  const h12 = hour > 12 ? hour - 12 : hour;
  return `${h12}:00 ${suffix}`;
});
function InputField({
  id,
  label,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "label",
      {
        htmlFor: id,
        className: "block text-sm font-medium text-foreground mb-1.5",
        children: label
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        id,
        ...props,
        className: "w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
      }
    )
  ] });
}
function SelectField({
  id,
  label,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "label",
      {
        htmlFor: id,
        className: "block text-sm font-medium text-foreground mb-1.5",
        children: label
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "select",
      {
        id,
        ...props,
        className: "w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary",
        children
      }
    )
  ] });
}
function OwnerOnboarding({
  navigate
}) {
  const session = getSession();
  const completeOnboarding = useCompleteOwnerOnboarding();
  const addFood = useAddFoodItem();
  const addStay = useAddStayRoom();
  const addPlay = useAddPlaySlot();
  const addRetail = useAddRetailItem();
  const [step, setStep] = reactExports.useState(1);
  const [businessName, setBusinessName] = reactExports.useState("");
  const [locationText, setLocationText] = reactExports.useState(
    DEFAULT_LOCATION.text
  );
  const [selectedCategory, setSelectedCategory] = reactExports.useState(
    null
  );
  const [upiId, setUpiId] = reactExports.useState("");
  const [foodName, setFoodName] = reactExports.useState("Chicken Biryani");
  const [foodPrice, setFoodPrice] = reactExports.useState("199");
  const [isVeg, setIsVeg] = reactExports.useState(false);
  const [foodDesc, setFoodDesc] = reactExports.useState(
    "Fragrant basmati rice with tender chicken"
  );
  const [roomName, setRoomName] = reactExports.useState("Deluxe Room");
  const [amenities, setAmenities] = reactExports.useState("AC, WiFi, TV, Hot Water");
  const [pricePerNight, setPricePerNight] = reactExports.useState("1500");
  const [selectedSlots, setSelectedSlots] = reactExports.useState([
    "6:00 AM",
    "7:00 AM"
  ]);
  const [surfaceType, setSurfaceType] = reactExports.useState("Natural Grass");
  const [hourlyRate, setHourlyRate] = reactExports.useState("500");
  const [retailName, setRetailName] = reactExports.useState("Fresh Vegetables");
  const [retailPrice, setRetailPrice] = reactExports.useState("50");
  const [retailCategory, setRetailCategory] = reactExports.useState("Groceries");
  const [retailQty, setRetailQty] = reactExports.useState("100");
  const [error, setError] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  function toggleSlot(slot) {
    setSelectedSlots(
      (prev) => prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  }
  async function handleComplete() {
    if (!session || !selectedCategory) return;
    setLoading(true);
    setError("");
    try {
      const onboardResult = await completeOnboarding.mutateAsync({
        userId: session.userId,
        businessName,
        category: selectedCategory,
        upiId
      });
      if (onboardResult.__kind__ === "err") {
        setError(onboardResult.err);
        setLoading(false);
        return;
      }
      const ownerId = session.userId;
      if (selectedCategory === Category.food) {
        await addFood.mutateAsync({
          ownerId,
          itemName: foodName,
          priceInr: BigInt(foodPrice || "0"),
          isVeg,
          description: foodDesc
        });
      } else if (selectedCategory === Category.stay) {
        await addStay.mutateAsync({
          ownerId,
          roomName,
          amenities: amenities.split(",").map((a) => a.trim()).filter(Boolean),
          pricePerNight: BigInt(pricePerNight || "0")
        });
      } else if (selectedCategory === Category.play) {
        for (const slot of selectedSlots) {
          await addPlay.mutateAsync({
            ownerId,
            slotDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
            startTime: slot,
            endTime: slot,
            surfaceType,
            hourlyRate: BigInt(hourlyRate || "0"),
            description: ""
          });
        }
      } else if (selectedCategory === Category.retail) {
        await addRetail.mutateAsync({
          ownerId,
          itemName: retailName,
          priceInr: BigInt(retailPrice || "0"),
          category: retailCategory,
          quantity: BigInt(retailQty || "0")
        });
      }
      updateSession({ onboardingDone: true });
      navigate("dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  }
  const progressPercent = step / 4 * 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-b border-border px-6 pt-10 pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-10 h-10 rounded-xl flex items-center justify-center",
            style: { backgroundColor: SAFFRON },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold", children: "P" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: "PondyOne Business" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold font-display text-foreground", children: "Setup Wizard" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Step ",
            step,
            " of 4"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            step === 1 && "Business Details",
            step === 2 && "Select Category",
            step === 3 && "Payment Setup",
            step === 4 && "First Listing"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-full rounded-full transition-all duration-500",
            style: { width: `${progressPercent}%`, backgroundColor: SAFFRON }
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 px-6 py-6 max-w-sm mx-auto w-full", children: [
      step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold font-display text-foreground", children: "Tell us about your business 🏪" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InputField,
          {
            id: "biz-name",
            label: "Business Name",
            type: "text",
            value: businessName,
            onChange: (e) => setBusinessName(e.target.value),
            placeholder: "e.g. Aasife Biryani",
            "data-ocid": "onboard-business-name"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InputField,
          {
            id: "biz-loc",
            label: "Location",
            type: "text",
            value: locationText,
            onChange: (e) => setLocationText(e.target.value),
            placeholder: "e.g. Nehru Street, Puducherry",
            "data-ocid": "onboard-location"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputField,
            {
              id: "gps-lat",
              label: "GPS Latitude",
              type: "text",
              defaultValue: DEFAULT_LOCATION.lat,
              readOnly: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputField,
            {
              id: "gps-lng",
              label: "GPS Longitude",
              type: "text",
              defaultValue: DEFAULT_LOCATION.lng,
              readOnly: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AppButton,
          {
            fullWidth: true,
            size: "lg",
            disabled: !businessName.trim(),
            onClick: () => setStep(2),
            "data-ocid": "onboard-step1-next",
            children: "Next →"
          }
        )
      ] }),
      step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold font-display text-foreground", children: "What type of business? 🎯" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: CATEGORY_OPTIONS.map((opt) => {
          const isSelected = selectedCategory === opt.key;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `onboard-cat-${opt.key}`,
              onClick: () => setSelectedCategory(opt.key),
              className: "rounded-2xl p-4 text-center transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-2",
              style: {
                backgroundColor: isSelected ? opt.color : `${opt.color}18`,
                borderColor: isSelected ? opt.color : "transparent"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-2", children: opt.emoji }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-sm font-semibold font-display",
                    style: { color: isSelected ? "#fff" : opt.color },
                    children: opt.label
                  }
                )
              ]
            },
            opt.key
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AppButton, { variant: "outline", fullWidth: true, onClick: () => setStep(1), children: "← Back" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AppButton,
            {
              fullWidth: true,
              size: "lg",
              disabled: !selectedCategory,
              onClick: () => setStep(3),
              "data-ocid": "onboard-step2-next",
              children: "Next →"
            }
          )
        ] })
      ] }),
      step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold font-display text-foreground", children: "Set up payments 💳" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl p-4 border",
            style: { borderColor: SAFFRON, backgroundColor: `${SAFFRON}10` },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground font-medium", children: "💡 UPI payments are instant and free" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Customers will pay directly to your UPI ID" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InputField,
          {
            id: "upi-id",
            label: "Your UPI ID",
            type: "text",
            value: upiId,
            onChange: (e) => setUpiId(e.target.value),
            placeholder: "e.g. business@paytm or phone@upi",
            "data-ocid": "onboard-upi-id"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AppButton, { variant: "outline", fullWidth: true, onClick: () => setStep(2), children: "← Back" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AppButton,
            {
              fullWidth: true,
              size: "lg",
              disabled: !upiId.trim(),
              onClick: () => setStep(4),
              "data-ocid": "onboard-step3-next",
              children: "Next →"
            }
          )
        ] })
      ] }),
      step === 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold font-display text-foreground", children: "Add your first listing ✨" }),
        selectedCategory === Category.food && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputField,
            {
              id: "food-name",
              label: "Item Name",
              type: "text",
              value: foodName,
              onChange: (e) => setFoodName(e.target.value)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputField,
            {
              id: "food-price",
              label: "Price (₹)",
              type: "number",
              value: foodPrice,
              onChange: (e) => setFoodPrice(e.target.value),
              min: "1"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "food-desc",
                className: "block text-sm font-medium text-foreground mb-1.5",
                children: "Description"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                id: "food-desc",
                value: foodDesc,
                onChange: (e) => setFoodDesc(e.target.value),
                rows: 2,
                className: "w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 rounded-xl bg-muted/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Vegetarian?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Toggle if this is a veg item" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setIsVeg((v) => !v),
                className: "w-12 h-6 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                style: { backgroundColor: isVeg ? "#22C55E" : "#d1d5db" },
                "aria-label": "Toggle vegetarian",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "block w-5 h-5 rounded-full bg-white shadow transition-transform mx-0.5",
                    style: {
                      transform: isVeg ? "translateX(24px)" : "translateX(0)"
                    }
                  }
                )
              }
            )
          ] })
        ] }),
        selectedCategory === Category.stay && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputField,
            {
              id: "room-name",
              label: "Room Name",
              type: "text",
              value: roomName,
              onChange: (e) => setRoomName(e.target.value)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputField,
            {
              id: "amenities",
              label: "Amenities (comma-separated)",
              type: "text",
              value: amenities,
              onChange: (e) => setAmenities(e.target.value),
              placeholder: "AC, WiFi, TV, Hot Water"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputField,
            {
              id: "price-night",
              label: "Price per Night (₹)",
              type: "number",
              value: pricePerNight,
              onChange: (e) => setPricePerNight(e.target.value),
              min: "1"
            }
          )
        ] }),
        selectedCategory === Category.play && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            SelectField,
            {
              id: "surface-type",
              label: "Surface Type",
              value: surfaceType,
              onChange: (e) => setSurfaceType(e.target.value),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Natural Grass" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Artificial Turf" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Concrete" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Wooden Court" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputField,
            {
              id: "hourly-rate",
              label: "Hourly Rate (₹)",
              type: "number",
              value: hourlyRate,
              onChange: (e) => setHourlyRate(e.target.value),
              min: "1"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "block text-sm font-medium text-foreground mb-2", children: "Available Time Slots" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: SLOT_TIMES.map((slot) => {
              const isSelected = selectedSlots.includes(slot);
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => toggleSlot(slot),
                  className: "text-xs py-2 px-1 rounded-lg border transition-colors font-medium focus-visible:outline-none",
                  style: {
                    backgroundColor: isSelected ? CATEGORY_COLORS.play : void 0,
                    borderColor: isSelected ? CATEGORY_COLORS.play : void 0,
                    color: isSelected ? "#fff" : void 0
                  },
                  children: slot
                },
                slot
              );
            }) })
          ] })
        ] }),
        selectedCategory === Category.retail && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputField,
            {
              id: "retail-name",
              label: "Item Name",
              type: "text",
              value: retailName,
              onChange: (e) => setRetailName(e.target.value)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              InputField,
              {
                id: "retail-price",
                label: "Price (₹)",
                type: "number",
                value: retailPrice,
                onChange: (e) => setRetailPrice(e.target.value),
                min: "1"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              InputField,
              {
                id: "retail-qty",
                label: "Quantity",
                type: "number",
                value: retailQty,
                onChange: (e) => setRetailQty(e.target.value),
                min: "0"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            SelectField,
            {
              id: "retail-cat",
              label: "Category",
              value: retailCategory,
              onChange: (e) => setRetailCategory(e.target.value),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Groceries" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Meds" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Toys" })
              ]
            }
          )
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2", children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AppButton,
              {
                variant: "outline",
                fullWidth: true,
                onClick: () => setStep(3),
                children: "← Back"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AppButton,
              {
                fullWidth: true,
                size: "lg",
                disabled: loading,
                onClick: handleComplete,
                "data-ocid": "onboard-complete",
                children: loading ? "Setting up…" : "Complete Setup ✓"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                updateSession({ onboardingDone: true });
                navigate("dashboard");
              },
              className: "w-full text-sm text-muted-foreground underline focus-visible:outline-none",
              children: "Skip for now"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function formatTime(ts) {
  try {
    const ms = Number(ts / 1000000n);
    return new Date(ms).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch {
    return "—";
  }
}
function BookingCard({
  booking,
  showComplete
}) {
  const updateStatus = useUpdateBookingStatus();
  async function markComplete() {
    await updateStatus.mutateAsync({
      id: booking.id,
      status: BookingStatus.completed
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppCard, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: booking.itemRef }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
          "Customer: ",
          booking.userId.slice(0, 12),
          "…"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatusBadge,
        {
          status: booking.status
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base font-bold", style: { color: SAFFRON }, children: [
          "₹",
          booking.amountInr.toString()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: formatTime(booking.createdAt) })
      ] }),
      booking.upiRef && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground truncate max-w-[120px]", children: [
        "UPI: ",
        booking.upiRef
      ] })
    ] }),
    showComplete && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AppButton,
      {
        size: "sm",
        fullWidth: true,
        onClick: markComplete,
        disabled: updateStatus.isPending,
        "data-ocid": `mark-complete-${booking.id}`,
        children: "✓ Mark Completed"
      }
    )
  ] }) });
}
function OwnerOrders() {
  const session = getSession();
  const ownerId = (session == null ? void 0 : session.userId) ?? "";
  const { data: bookings = [], isLoading } = useBookingsByOwner(ownerId);
  const [activeTab, setActiveTab] = reactExports.useState("active");
  const activeOrders = bookings.filter(
    (b) => b.status === BookingStatus.accepted
  );
  const allOrders = [...bookings].sort(
    (a, b) => Number(b.createdAt - a.createdAt)
  );
  const displayed = activeTab === "active" ? activeOrders : allOrders;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-b border-border px-4 pt-10 pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold font-display text-foreground", children: "📦 Orders" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
        bookings.length,
        " total order",
        bookings.length !== 1 ? "s" : ""
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex max-w-lg mx-auto", children: ["active", "all"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setActiveTab(tab),
        "data-ocid": `orders-tab-${tab}`,
        className: "flex-1 py-3 text-sm font-semibold transition-colors border-b-2 focus-visible:outline-none",
        style: {
          borderBottomColor: activeTab === tab ? SAFFRON : "transparent",
          color: activeTab === tab ? SAFFRON : "#6b7280"
        },
        children: tab === "active" ? `Active (${activeOrders.length})` : `All (${allOrders.length})`
      },
      tab
    )) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-5 max-w-lg mx-auto space-y-3", children: isLoading ? [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-28 rounded-2xl bg-muted animate-pulse" }, n)) : displayed.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(AppCard, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl mb-2", children: "📭" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: activeTab === "active" ? "No active orders" : "No orders yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: activeTab === "active" ? "Orders you accept will appear here" : "When customers book your services, they'll show here" })
    ] }) }) : displayed.map((booking) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      BookingCard,
      {
        booking,
        showComplete: booking.status === BookingStatus.accepted
      },
      booking.id
    )) })
  ] });
}
function formatTs(ts) {
  try {
    const ms = Number(ts / 1000000n);
    return new Date(ms).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch {
    return "";
  }
}
function TicketThread({
  ticket,
  onBack
}) {
  const session = getSession();
  const addMessage = useAddTicketMessage();
  const [reply, setReply] = reactExports.useState("");
  async function handleSend() {
    if (!reply.trim()) return;
    await addMessage.mutateAsync({
      ticketId: ticket.id,
      sender: (session == null ? void 0 : session.name) ?? "Owner",
      text: reply.trim()
    });
    setReply("");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-b border-border px-4 pt-10 pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onBack,
          className: "flex items-center gap-2 text-sm text-muted-foreground mb-2 focus-visible:outline-none",
          children: "← Back to tickets"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold font-display text-foreground", children: ticket.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: ticket.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: ticket.status })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-muted/20", children: ticket.messages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-8", children: "No messages yet" }) : ticket.messages.map((msg, idx) => {
      const isOwn = msg.sender === (session == null ? void 0 : session.name) || msg.sender === "Owner";
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `flex ${isOwn ? "justify-end" : "justify-start"}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm",
              style: {
                backgroundColor: isOwn ? SAFFRON : "#fff",
                color: isOwn ? "#fff" : "#1A1A2E",
                border: isOwn ? "none" : "1px solid #e5e7eb"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold mb-0.5 opacity-70", children: msg.sender }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: msg.text }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] mt-1 opacity-60 text-right", children: formatTs(msg.timestamp) })
              ]
            }
          )
        },
        `${msg.timestamp}-${idx}`
      );
    }) }),
    ticket.status === "open" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-t border-border px-4 py-3 flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: reply,
          onChange: (e) => setReply(e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Enter") handleSend();
          },
          placeholder: "Type your reply…",
          "data-ocid": "ticket-reply-input",
          className: "flex-1 h-10 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AppButton,
        {
          size: "sm",
          onClick: handleSend,
          disabled: !reply.trim(),
          "data-ocid": "ticket-reply-send",
          children: "Send"
        }
      )
    ] })
  ] });
}
function OwnerTickets() {
  const session = getSession();
  const ownerId = (session == null ? void 0 : session.userId) ?? "";
  const { data: tickets = [], isLoading } = useTicketsByOwner(ownerId);
  const createTicket = useCreateTicket();
  const [selectedTicket, setSelectedTicket] = reactExports.useState(null);
  const [showNewModal, setShowNewModal] = reactExports.useState(false);
  const [description, setDescription] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState("Technical");
  const [imageUrl, setImageUrl] = reactExports.useState("");
  async function handleCreate() {
    if (!description.trim()) return;
    await createTicket.mutateAsync({
      raisedBy: ownerId,
      ownerId,
      category,
      description: description.trim(),
      imageUrl: imageUrl.trim() || null
    });
    setDescription("");
    setImageUrl("");
    setCategory("Technical");
    setShowNewModal(false);
  }
  if (selectedTicket) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      TicketThread,
      {
        ticket: selectedTicket,
        onBack: () => setSelectedTicket(null)
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-4 pt-10 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold font-display text-foreground", children: "🎫 Support" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
          tickets.length,
          " ticket",
          tickets.length !== 1 ? "s" : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AppButton,
        {
          size: "sm",
          onClick: () => setShowNewModal(true),
          "data-ocid": "new-ticket-btn",
          children: "+ Raise Ticket"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-5 max-w-lg mx-auto space-y-3", children: isLoading ? [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 rounded-2xl bg-muted animate-pulse" }, n)) : tickets.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(AppCard, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl mb-3", children: "🎫" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "No tickets raised" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Need help? Raise a support ticket" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AppButton,
        {
          size: "sm",
          className: "mt-4",
          onClick: () => setShowNewModal(true),
          "data-ocid": "empty-new-ticket",
          children: "Raise Ticket"
        }
      )
    ] }) }) : tickets.map((ticket) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      AppCard,
      {
        onClick: () => setSelectedTicket(ticket),
        "data-ocid": `ticket-${ticket.id}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground", children: ticket.category }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatusBadge,
                {
                  status: ticket.status
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground line-clamp-2", children: ticket.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
              ticket.messages.length,
              " message",
              ticket.messages.length !== 1 ? "s" : ""
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm flex-shrink-0", children: "›" })
        ] })
      },
      ticket.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AppModal,
      {
        isOpen: showNewModal,
        onClose: () => setShowNewModal(false),
        title: "Raise Support Ticket",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "ticket-cat",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Category"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "ticket-cat",
                value: category,
                onChange: (e) => setCategory(e.target.value),
                className: "w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Technical" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Payment" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Listing" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Account" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Other" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "ticket-desc",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Describe your issue"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                id: "ticket-desc",
                value: description,
                onChange: (e) => setDescription(e.target.value),
                rows: 3,
                placeholder: "Explain your issue in detail…",
                "data-ocid": "ticket-description",
                className: "w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none placeholder:text-muted-foreground"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "ticket-img",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Image URL (optional)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "ticket-img",
                type: "url",
                value: imageUrl,
                onChange: (e) => setImageUrl(e.target.value),
                placeholder: "https://...",
                className: "w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AppButton,
            {
              fullWidth: true,
              onClick: handleCreate,
              disabled: !description.trim() || createTicket.isPending,
              "data-ocid": "ticket-submit",
              children: createTicket.isPending ? "Raising…" : "Raise Ticket"
            }
          )
        ] })
      }
    )
  ] });
}
const SEEN_BOOKINGS_KEY = "pondyone_seen_bookings";
function getSeenSet() {
  try {
    const raw = localStorage.getItem(SEEN_BOOKINGS_KEY);
    return raw ? new Set(JSON.parse(raw)) : /* @__PURE__ */ new Set();
  } catch {
    return /* @__PURE__ */ new Set();
  }
}
function addSeen(id) {
  const seen = getSeenSet();
  seen.add(id);
  localStorage.setItem(SEEN_BOOKINGS_KEY, JSON.stringify([...seen]));
}
const NAV_ITEMS = [
  { icon: "🏪", label: "Dashboard", path: "/owner/dashboard" },
  { icon: "📦", label: "Orders", path: "/owner/orders" },
  { icon: "🎫", label: "Support", path: "/owner/tickets" },
  { icon: "🗃️", label: "Inventory", path: "/owner/inventory" },
  { icon: "👤", label: "Account", path: "/owner/account" }
];
const AUTH_PAGES = ["onboarding"];
function getInitialPage() {
  const session = getSession();
  if (!session || session.role !== "owner") return "dashboard";
  if (!session.onboardingDone) return "onboarding";
  return "dashboard";
}
function OwnerApp() {
  const topNavigate = useNavigate();
  const [page, setPage] = reactExports.useState(getInitialPage);
  const session = getSession();
  const ownerId = (session == null ? void 0 : session.role) === "owner" ? session.userId : "";
  const [alertBooking, setAlertBooking] = reactExports.useState(null);
  const alarmActiveRef = reactExports.useRef(false);
  const [showSubPopup, setShowSubPopup] = reactExports.useState(false);
  const [txId, setTxId] = reactExports.useState("");
  const [subError, setSubError] = reactExports.useState("");
  const [subSuccess, setSubSuccess] = reactExports.useState(false);
  const { data: ownerProfile } = useGetOwnerById(ownerId);
  const verifyPayment = useVerifySubscriptionPayment();
  reactExports.useEffect(() => {
    const s = getSession();
    if (!s || s.role !== "owner") {
      topNavigate({ to: "/" });
    }
  }, [topNavigate]);
  reactExports.useEffect(() => {
    if (!ownerProfile || page === "onboarding") return;
    const status = ownerProfile.subscriptionStatus;
    if (status === SubscriptionStatus.inactive || status === SubscriptionStatus.expired) {
      setShowSubPopup(true);
    }
  }, [ownerProfile, page]);
  const { data: bookings } = useBookingsByOwner(ownerId);
  const updateStatus = useUpdateBookingStatus();
  const isAuthPage = AUTH_PAGES.includes(page);
  reactExports.useEffect(() => {
    if (!bookings || isAuthPage || showSubPopup) return;
    const seen = getSeenSet();
    const newPending = bookings.filter(
      (b) => b.status === BookingStatus.pending && !seen.has(b.id)
    );
    if (newPending.length > 0 && !alarmActiveRef.current) {
      alarmActiveRef.current = true;
      playAlarm();
      setAlertBooking(newPending[0]);
    }
  }, [bookings, isAuthPage, showSubPopup]);
  const handleAlertAction = reactExports.useCallback(
    (booking, accept) => {
      updateStatus.mutate({
        id: booking.id,
        status: accept ? BookingStatus.accepted : BookingStatus.declined
      });
      addSeen(booking.id);
      stopAlarm();
      alarmActiveRef.current = false;
      setAlertBooking(null);
    },
    [updateStatus]
  );
  async function handleVerifyPayment() {
    if (!txId.trim()) return;
    setSubError("");
    try {
      const result = await verifyPayment.mutateAsync({
        ownerId,
        txId: txId.trim()
      });
      if (result.__kind__ === "ok") {
        setSubSuccess(true);
        setTimeout(() => {
          setShowSubPopup(false);
          setSubSuccess(false);
          setTxId("");
        }, 2500);
      } else {
        setSubError(
          "Transaction ID not accepted. Please try again or contact support."
        );
      }
    } catch {
      setSubError(
        "Transaction ID not accepted. Please try again or contact support."
      );
    }
  }
  function handlePayLater() {
    setShowSubPopup(false);
  }
  function navigate(p) {
    setPage(p);
  }
  function navigateHome() {
    topNavigate({ to: "/" });
  }
  const currentNavPath = `/owner/${page}`;
  function renderPage() {
    switch (page) {
      case "onboarding":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(OwnerOnboarding, { navigate });
      case "orders":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(OwnerOrders, {});
      case "tickets":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(OwnerTickets, {});
      case "inventory":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(OwnerInventory, {});
      case "account":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(OwnerAccount, { navigate, navigateHome });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(OwnerDashboard, {});
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: isAuthPage ? "" : "pb-16", children: renderPage() }),
    !isAuthPage && session && /* @__PURE__ */ jsxRuntimeExports.jsx(
      BottomNav,
      {
        items: NAV_ITEMS,
        currentPath: currentNavPath,
        onNavigate: (path) => {
          const seg = path.replace("/owner/", "");
          setPage(seg);
        }
      }
    ),
    showSubPopup && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "dialog",
      {
        open: true,
        className: "fixed inset-0 z-[9998] flex items-center justify-center p-4 w-full h-full max-w-none m-0 bg-transparent",
        "aria-label": "Subscription Required",
        "data-ocid": "subscription-popup",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/85 backdrop-blur-sm" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 w-full max-w-sm mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-2xl p-6 shadow-2xl border border-border", children: subSuccess ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", children: "🎉" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold font-display text-foreground mb-2", children: "You're All Set!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Your account is now active and verified!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white",
                style: { backgroundColor: "#22C55E" },
                children: "✓ Active & Verified"
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-3", children: "🏪" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "text-xl font-bold font-display",
                  style: { color: SAFFRON },
                  children: "Activate Your Store"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Subscription required to be visible to customers" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-xl p-4 mb-5 border",
                style: {
                  backgroundColor: `${SAFFRON}10`,
                  borderColor: `${SAFFRON}30`
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "Monthly Plan" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-2xl font-bold",
                        style: { color: SAFFRON },
                        children: "₹1,500"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1.5 text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#22C55E" }, children: "✓" }),
                      "Store visible to all customers"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#22C55E" }, children: "✓" }),
                      "Receive bookings and orders"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#22C55E" }, children: "✓" }),
                      "Full dashboard access"
                    ] })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 rounded-xl p-4 mb-4 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: "Pay via UPI to" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-base font-bold font-mono tracking-wide",
                  style: { color: SAFFRON },
                  children: "akkumaresh@ybl"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Amount: ₹1,500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 mx-auto w-24 h-24 bg-muted rounded-xl flex items-center justify-center text-4xl", children: "📱" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-2", children: "Open any UPI app → Pay to the ID above" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "sub-txid",
                  className: "block text-xs font-medium text-foreground mb-1.5",
                  children: "Enter UPI Transaction ID"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "sub-txid",
                  type: "text",
                  value: txId,
                  onChange: (e) => {
                    setTxId(e.target.value);
                    setSubError("");
                  },
                  placeholder: "e.g. 407835921234",
                  className: "w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground",
                  "data-ocid": "subscription-txid-input"
                }
              ),
              subError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs mt-1.5",
                  style: { color: "#EF4444" },
                  children: subError
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  disabled: !txId.trim() || verifyPayment.isPending,
                  onClick: handleVerifyPayment,
                  "data-ocid": "subscription-verify-btn",
                  className: "w-full h-12 rounded-xl font-bold text-sm text-white transition-smooth disabled:opacity-50 disabled:cursor-not-allowed",
                  style: { backgroundColor: SAFFRON },
                  children: verifyPayment.isPending ? "Verifying…" : "✓ Verify Payment"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handlePayLater,
                  "data-ocid": "subscription-skip-btn",
                  className: "w-full h-10 rounded-xl font-medium text-xs text-muted-foreground border border-border bg-transparent hover:bg-muted/40 transition-colors",
                  children: "Pay Later — store will be hidden from customers"
                }
              )
            ] })
          ] }) }) })
        ]
      }
    ),
    alertBooking && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "dialog",
      {
        open: true,
        className: "fixed inset-0 z-[9999] flex items-center justify-center p-4 w-full h-full max-w-none m-0 bg-transparent",
        "aria-label": "New Order Alert",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/80 backdrop-blur-sm" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 w-full max-w-sm mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card rounded-2xl p-6 shadow-2xl border-4 animate-pulse",
              style: { borderColor: "#FF4444" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-3", children: "🚨" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h2",
                    {
                      className: "text-2xl font-bold font-display",
                      style: { color: "#FF4444" },
                      children: "NEW ORDER!"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "A new booking just came in" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 rounded-xl p-4 mb-6 space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Customer" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground truncate ml-4", children: [
                      alertBooking.userId.slice(0, 8),
                      "…"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Item" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground truncate ml-4", children: alertBooking.itemRef })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Amount" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-foreground", children: [
                      "₹",
                      alertBooking.amountInr.toString()
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "UPI Ref" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground truncate ml-4", children: alertBooking.upiRef || "N/A" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    AppButton,
                    {
                      variant: "danger",
                      size: "lg",
                      fullWidth: true,
                      "data-ocid": "alert-decline",
                      onClick: () => handleAlertAction(alertBooking, false),
                      children: "✕ Decline"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "alert-accept",
                      onClick: () => handleAlertAction(alertBooking, true),
                      className: "flex-1 h-12 px-6 text-base rounded-xl font-bold text-white transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98] shadow-sm",
                      style: { backgroundColor: "#22C55E" },
                      children: "✓ Accept"
                    }
                  )
                ] })
              ]
            }
          ) })
        ]
      }
    )
  ] });
}
export {
  OwnerApp as default
};
