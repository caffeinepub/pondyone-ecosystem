import { g as getSession, r as reactExports, j as jsxRuntimeExports, u as updateSession, c as clearSession, a as useNavigate } from "./index-CnBlQnJS.js";
import { a as playAlarm, s as stopAlarm, B as BottomNav } from "./audio-XR3Brrek.js";
import { A as AppButton } from "./AppButton-LApTkm6l.js";
import { h as useGetOwnerById, l as useUpdateOwnerProfile, m as useFoodItemsByOwner, n as useBookingsByOwner, o as useUpdateFoodItem, p as useAddFoodItem, q as usePlaySlotsByOwner, r as useAddPlaySlot, s as useUpdatePlaySlot, t as useToggleSlotBooking, v as useStayRoomsByOwner, w as useAddStayRoom, x as useUpdateStayRoom, y as useRetailItemsByOwner, z as useAddRetailItem, A as useUpdateRetailItem, B as useCompleteOwnerOnboarding, C as useUpdateBookingStatus, D as useTicketsByOwner, j as useCreateTicket, k as useAddTicketMessage } from "./useQueries--SjqMtRM.js";
import { C as CategoryBadge, S as StatusBadge } from "./AppBadge-DvzDMqlu.js";
import { A as AppCard } from "./AppCard-CqGSFxNm.js";
import { S as SAFFRON, C as CATEGORY_COLORS, D as DEFAULT_LOCATION } from "./createLucideIcon-DNEqdOjx.js";
import { A as AppModal } from "./AppModal-CkVXozos.js";
import { u as ue } from "./index-lMFli-zp.js";
import { C as Category, B as BookingStatus } from "./backend.d-6mUFcwwM.js";
import "./x-BiXYAiTq.js";
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
function FoodDashboard({ ownerId }) {
  const { data: items = [], isLoading } = useFoodItemsByOwner(ownerId);
  const { data: bookings = [] } = useBookingsByOwner(ownerId);
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
  }
  async function handleEdit() {
    if (!editItem) return;
    await updateFood.mutateAsync({ ...editItem, priceInr: editItem.priceInr });
    setEditItem(null);
  }
  async function toggleAvailability(item) {
    await updateFood.mutateAsync({ ...item, isAvailable: !item.isAvailable });
  }
  const recentOrders = bookings.filter(
    (b) => b.status === BookingStatus.pending || b.status === BookingStatus.accepted
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
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
      ] }) }, item.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold font-display text-foreground mb-3", children: "📦 Recent Orders" }),
      recentOrders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(AppCard, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-4", children: "No active orders right now" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: recentOrders.map((order) => /* @__PURE__ */ jsxRuntimeExports.jsx(AppCard, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: order.itemRef }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "₹",
            order.amountInr.toString()
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatusBadge,
          {
            status: order.status
          }
        )
      ] }) }, order.id)) })
    ] }),
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
                htmlFor: "modal-food-name",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Item Name"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "modal-food-name",
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
                htmlFor: "modal-food-price",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Price (₹)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "modal-food-price",
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
                htmlFor: "modal-food-desc",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Description"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                id: "modal-food-desc",
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
                htmlFor: "edit-food-name",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Item Name"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "edit-food-name",
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
                htmlFor: "edit-food-price",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Price (₹)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "edit-food-price",
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "edit-food-desc",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Description"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                id: "edit-food-desc",
                value: editItem.description,
                onChange: (e) => setEditItem({ ...editItem, description: e.target.value }),
                rows: 2,
                className: "w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AppButton, { fullWidth: true, onClick: handleEdit, children: "Update Item" })
        ] })
      }
    )
  ] });
}
function TurfDashboard({ ownerId }) {
  const { data: slots = [], isLoading } = usePlaySlotsByOwner(ownerId);
  const addSlot = useAddPlaySlot();
  const updateSlot = useUpdatePlaySlot();
  const toggleBooking = useToggleSlotBooking();
  const [showAddModal, setShowAddModal] = reactExports.useState(false);
  const [editSlot, setEditSlot] = reactExports.useState(null);
  const [slotTime, setSlotTime] = reactExports.useState("6:00 AM");
  const [surfaceType, setSurfaceType] = reactExports.useState("Natural Grass");
  const [hourlyRate, setHourlyRate] = reactExports.useState("500");
  const [slotDesc, setSlotDesc] = reactExports.useState("");
  async function handleAddSlot() {
    await addSlot.mutateAsync({
      ownerId,
      slotTime,
      surfaceType,
      hourlyRate: BigInt(hourlyRate || "0"),
      description: slotDesc
    });
    setSlotDesc("");
    setShowAddModal(false);
  }
  async function handleEditSlot() {
    if (!editSlot) return;
    await updateSlot.mutateAsync({
      id: editSlot.id,
      slotTime: editSlot.slotTime,
      surfaceType: editSlot.surfaceType,
      hourlyRate: editSlot.hourlyRate,
      description: editSlot.description
    });
    ue.success("Slot updated successfully");
    setEditSlot(null);
  }
  async function handleToggle(slot) {
    if (slot.isBooked) {
      const confirmed = window.confirm(`Unbook slot ${slot.slotTime}?`);
      if (!confirmed) return;
      await toggleBooking.mutateAsync({
        id: slot.id,
        isBooked: false,
        bookedByUserId: null
      });
    } else {
      await toggleBooking.mutateAsync({
        id: slot.id,
        isBooked: true,
        bookedByUserId: ownerId
      });
    }
  }
  const HOUR_LABELS = Array.from({ length: 18 }, (_, i) => {
    const h = i + 6;
    const suf = h < 12 ? "AM" : "PM";
    const h12 = h > 12 ? h - 12 : h;
    return `${h12}:00 ${suf}`;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
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
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: Array.from({ length: 9 }, (_, i) => i).map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-14 rounded-xl bg-muted animate-pulse"
      },
      `skel-${i}`
    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: HOUR_LABELS.map((label) => {
      const slot = slots.find((s) => s.slotTime === label);
      if (!slot) {
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl bg-muted/30 border border-dashed border-border p-2 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/60", children: "—" })
            ]
          },
          `empty-${label}`
        );
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl p-2 text-center border-2 relative",
          style: {
            backgroundColor: slot.isBooked ? "#FEE2E2" : "#DCFCE7",
            borderColor: slot.isBooked ? "#EF4444" : "#22C55E"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => handleToggle(slot),
                "data-ocid": `slot-${slot.id}`,
                className: "w-full focus-visible:outline-none",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs font-semibold",
                      style: { color: slot.isBooked ? "#EF4444" : "#16A34A" },
                      children: label
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-[10px]",
                      style: { color: slot.isBooked ? "#EF4444" : "#16A34A" },
                      children: slot.isBooked ? "Booked" : "Free"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setEditSlot({ ...slot }),
                "aria-label": "Edit slot",
                className: "absolute top-1 right-1 text-[10px] leading-none p-0.5 rounded hover:bg-black/10 transition-colors opacity-60 hover:opacity-100",
                children: "✏️"
              }
            )
          ]
        },
        slot.id
      );
    }) }),
    slots.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(AppCard, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "w-3 h-3 rounded-full",
            style: { backgroundColor: "#22C55E" }
          }
        ),
        "Available"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "w-3 h-3 rounded-full",
            style: { backgroundColor: "#EF4444" }
          }
        ),
        "Booked"
      ] })
    ] }) }),
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
                htmlFor: "slot-time-sel",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Slot Time"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                id: "slot-time-sel",
                value: slotTime,
                onChange: (e) => setSlotTime(e.target.value),
                className: "w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary",
                children: HOUR_LABELS.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: l }, l))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "surface-sel",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Surface Type"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "surface-sel",
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
                htmlFor: "hourly-rate-inp",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Hourly Rate (₹)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "hourly-rate-inp",
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
                htmlFor: "slot-desc-inp",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Description"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                id: "slot-desc-inp",
                value: slotDesc,
                onChange: (e) => setSlotDesc(e.target.value),
                rows: 2,
                placeholder: "e.g. Best turf for cricket in Pondicherry",
                className: "w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AppButton, { fullWidth: true, onClick: handleAddSlot, children: "Add Slot" })
        ] })
      }
    ),
    editSlot && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AppModal,
      {
        isOpen: !!editSlot,
        onClose: () => setEditSlot(null),
        title: "Edit Slot",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "edit-slot-time",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Slot Time"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                id: "edit-slot-time",
                value: editSlot.slotTime,
                onChange: (e) => setEditSlot({ ...editSlot, slotTime: e.target.value }),
                className: "w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary",
                children: HOUR_LABELS.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: l }, l))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "edit-slot-surface",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Surface Type"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "edit-slot-surface",
                value: editSlot.surfaceType,
                onChange: (e) => setEditSlot({ ...editSlot, surfaceType: e.target.value }),
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
                htmlFor: "edit-slot-rate",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Hourly Rate (₹)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "edit-slot-rate",
                type: "number",
                value: editSlot.hourlyRate.toString(),
                onChange: (e) => setEditSlot({
                  ...editSlot,
                  hourlyRate: BigInt(e.target.value || "0")
                }),
                className: "w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "edit-slot-desc",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Description"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                id: "edit-slot-desc",
                value: editSlot.description,
                onChange: (e) => setEditSlot({ ...editSlot, description: e.target.value }),
                rows: 2,
                className: "w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AppButton,
            {
              fullWidth: true,
              onClick: handleEditSlot,
              disabled: updateSlot.isPending,
              children: updateSlot.isPending ? "Saving…" : "Update Slot"
            }
          )
        ] })
      }
    )
  ] });
}
function StayDashboard({ ownerId }) {
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
    ue.success("Room updated successfully");
    setEditRoom(null);
  }
  async function toggleAvailable(room) {
    await updateRoom.mutateAsync({ ...room, isAvailable: !room.isAvailable });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
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
            "data-ocid": `edit-room-${room.id}`,
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
        room.amenities.slice(0, 2).map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground",
            children: a
          },
          a
        )),
        room.amenities.length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground", children: [
          "+",
          room.amenities.length - 2
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => toggleAvailable(room),
          "data-ocid": `room-toggle-${room.id}`,
          className: "w-full text-xs font-semibold py-1.5 rounded-lg transition-colors",
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
                htmlFor: "add-room-name",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Room Name"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "add-room-name",
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
                htmlFor: "add-room-amenities",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Amenities"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "add-room-amenities",
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
                htmlFor: "add-room-price",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Price/Night (₹)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "add-room-price",
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
                htmlFor: "edit-room-name",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Room Name"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "edit-room-name",
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
                htmlFor: "edit-room-amenities",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Amenities (comma-separated)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "edit-room-amenities",
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
                htmlFor: "edit-room-price",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Price/Night (₹)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "edit-room-price",
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
function RetailDashboard({ ownerId }) {
  const { data: items = [], isLoading } = useRetailItemsByOwner(ownerId);
  const addItem = useAddRetailItem();
  const updateItem = useUpdateRetailItem();
  const [showAddModal, setShowAddModal] = reactExports.useState(false);
  const [editItem, setEditItem] = reactExports.useState(null);
  const [rname, setRname] = reactExports.useState("");
  const [rprice, setRprice] = reactExports.useState("");
  const [rcat, setRcat] = reactExports.useState("Groceries");
  const [rqty, setRqty] = reactExports.useState("50");
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
    ue.success("Item updated successfully");
    setEditItem(null);
  }
  async function toggleStock(item) {
    await updateItem.mutateAsync({ ...item, inStock: !item.inStock });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
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
              "data-ocid": `edit-retail-${item.id}`,
              className: "text-sm text-muted-foreground hover:text-foreground px-1.5 py-1 rounded-lg hover:bg-muted transition-colors",
              children: "✏️"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => toggleStock(item),
              "data-ocid": `retail-toggle-${item.id}`,
              className: "text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors",
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
        isOpen: showAddModal,
        onClose: () => setShowAddModal(false),
        title: "Add Inventory Item",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "add-retail-name",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Item Name"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "add-retail-name",
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
                  htmlFor: "add-retail-price",
                  className: "block text-sm font-medium text-foreground mb-1",
                  children: "Price (₹)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "add-retail-price",
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
                  htmlFor: "add-retail-qty",
                  className: "block text-sm font-medium text-foreground mb-1",
                  children: "Quantity"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "add-retail-qty",
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
                htmlFor: "add-retail-cat",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Category"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "add-retail-cat",
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
                htmlFor: "edit-retail-name",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Item Name"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "edit-retail-name",
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
                  htmlFor: "edit-retail-price",
                  className: "block text-sm font-medium text-foreground mb-1",
                  children: "Price (₹)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "edit-retail-price",
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
                  htmlFor: "edit-retail-qty",
                  className: "block text-sm font-medium text-foreground mb-1",
                  children: "Quantity"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "edit-retail-qty",
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "edit-retail-cat",
                className: "block text-sm font-medium text-foreground mb-1",
                children: "Category"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "edit-retail-cat",
                value: editItem.category,
                onChange: (e) => setEditItem({ ...editItem, category: e.target.value }),
                className: "w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Groceries" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Meds" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Toys" })
                ]
              }
            )
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
function OwnerDashboard() {
  const session = getSession();
  const ownerId = (session == null ? void 0 : session.userId) ?? "";
  const { data: owner, isLoading } = useGetOwnerById(ownerId);
  const category = (owner == null ? void 0 : owner.category) ?? Category.food;
  const businessName = (owner == null ? void 0 : owner.businessName) || (session == null ? void 0 : session.name) || "My Business";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-4 pt-10 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between max-w-lg mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold",
            style: { backgroundColor: SAFFRON },
            children: "🏪"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-base font-bold font-display text-foreground truncate", children: businessName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 mt-0.5", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-16 bg-muted rounded animate-pulse" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CategoryBadge,
              {
                category
              }
            ),
            (owner == null ? void 0 : owner.isVerified) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold", children: "✓ Verified" })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold", style: { color: SAFFRON }, children: (owner == null ? void 0 : owner.isActive) ? "● Active" : "○ Inactive" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-5 max-w-lg mx-auto", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-20 rounded-2xl bg-muted animate-pulse"
      },
      n
    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      category === Category.food && /* @__PURE__ */ jsxRuntimeExports.jsx(FoodDashboard, { ownerId }),
      category === Category.play && /* @__PURE__ */ jsxRuntimeExports.jsx(TurfDashboard, { ownerId }),
      category === Category.stay && /* @__PURE__ */ jsxRuntimeExports.jsx(StayDashboard, { ownerId }),
      category === Category.retail && /* @__PURE__ */ jsxRuntimeExports.jsx(RetailDashboard, { ownerId })
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
            slotTime: slot,
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
  reactExports.useEffect(() => {
    const s = getSession();
    if (!s || s.role !== "owner") {
      topNavigate({ to: "/" });
    }
  }, [topNavigate]);
  const { data: bookings } = useBookingsByOwner(ownerId);
  const updateStatus = useUpdateBookingStatus();
  const isAuthPage = AUTH_PAGES.includes(page);
  reactExports.useEffect(() => {
    if (!bookings || isAuthPage) return;
    const seen = getSeenSet();
    const newPending = bookings.filter(
      (b) => b.status === BookingStatus.pending && !seen.has(b.id)
    );
    if (newPending.length > 0 && !alarmActiveRef.current) {
      alarmActiveRef.current = true;
      playAlarm();
      setAlertBooking(newPending[0]);
    }
  }, [bookings, isAuthPage]);
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
