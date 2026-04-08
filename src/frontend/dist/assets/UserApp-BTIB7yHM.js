import { g as getSession, r as reactExports, j as jsxRuntimeExports, u as updateSession, c as clearSession, a as useNavigate } from "./index-CnBlQnJS.js";
import { p as playPing, B as BottomNav } from "./audio-XR3Brrek.js";
import { A as AppButton } from "./AppButton-LApTkm6l.js";
import { u as useGetUserById, a as useUpdateUserProfile, b as useBookingsByUser, c as useCreateBooking, d as useAllFoodItems, e as useAllStayRooms, f as useAllPlaySlots, g as useAllRetailItems, h as useGetOwnerById, i as useTicketsByUser, j as useCreateTicket, k as useAddTicketMessage } from "./useQueries--SjqMtRM.js";
import { D as DEFAULT_LOCATION, S as SAFFRON, C as CATEGORY_COLORS, a as CATEGORY_EMOJIS, d as detectIntent } from "./createLucideIcon-DNEqdOjx.js";
import { C as CategoryBadge, S as StatusBadge } from "./AppBadge-DvzDMqlu.js";
import { B as BookingStatus, C as Category } from "./backend.d-6mUFcwwM.js";
import { A as AppCard } from "./AppCard-CqGSFxNm.js";
import { A as AppModal } from "./AppModal-CkVXozos.js";
import "./x-BiXYAiTq.js";
function UserAccount({ navigate, onLogout }) {
  var _a;
  const session = getSession();
  const { data: user, isLoading } = useGetUserById((session == null ? void 0 : session.userId) ?? "");
  const updateProfile = useUpdateUserProfile();
  const [editing, setEditing] = reactExports.useState(false);
  const [editName, setEditName] = reactExports.useState("");
  const [editLocation, setEditLocation] = reactExports.useState("");
  const [saveError, setSaveError] = reactExports.useState("");
  const [saveSuccess, setSaveSuccess] = reactExports.useState(false);
  const handleStartEdit = () => {
    setEditName((user == null ? void 0 : user.name) ?? (session == null ? void 0 : session.name) ?? "");
    setEditLocation(
      (user == null ? void 0 : user.locationText) ?? (session == null ? void 0 : session.name) ?? DEFAULT_LOCATION.text
    );
    setSaveError("");
    setSaveSuccess(false);
    setEditing(true);
  };
  const handleSave = async (e) => {
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
        gpsLng: DEFAULT_LOCATION.lng
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
  const displayName = (user == null ? void 0 : user.name) ?? (session == null ? void 0 : session.name) ?? "User";
  const displayPhone = (user == null ? void 0 : user.phone) ?? (session == null ? void 0 : session.phone) ?? "";
  const displayLocation = (user == null ? void 0 : user.locationText) ?? DEFAULT_LOCATION.text;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "bg-card border-b border-border sticky top-0 z-30 shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-lg mx-auto px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-base font-bold font-display text-foreground", children: "My Account" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto px-4 py-5 flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white mb-3 shadow-elevated",
            style: { backgroundColor: SAFFRON },
            children: ((_a = displayName[0]) == null ? void 0 : _a.toUpperCase()) ?? "U"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold font-display text-foreground", children: displayName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: displayPhone })
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-32 bg-muted rounded-2xl animate-pulse" }) : editing ? (
        /* Edit form */
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl shadow-card border border-border p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4", children: "Edit Profile" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "flex flex-col gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  className: "text-sm font-medium text-foreground",
                  htmlFor: "acc-name",
                  children: "Full Name"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "acc-name",
                  type: "text",
                  value: editName,
                  onChange: (e) => setEditName(e.target.value),
                  "data-ocid": "account-edit-name",
                  className: "h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  className: "text-sm font-medium text-foreground",
                  htmlFor: "acc-location",
                  children: "Location"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "acc-location",
                  type: "text",
                  value: editLocation,
                  onChange: (e) => setEditLocation(e.target.value),
                  "data-ocid": "account-edit-location",
                  className: "h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                }
              )
            ] }),
            saveError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: saveError }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                AppButton,
                {
                  type: "submit",
                  fullWidth: true,
                  disabled: updateProfile.isPending,
                  "data-ocid": "account-save",
                  children: updateProfile.isPending ? "Saving…" : "Save Changes"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                AppButton,
                {
                  type: "button",
                  variant: "outline",
                  fullWidth: true,
                  onClick: () => setEditing(false),
                  children: "Cancel"
                }
              )
            ] })
          ] })
        ] })
      ) : (
        /* Profile view */
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl shadow-card border border-border p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Profile" }),
          saveSuccess && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-green-700 bg-green-50 rounded-lg px-3 py-2 mb-3", children: "✅ Profile updated successfully!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: displayName })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Phone" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: displayPhone })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Location" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-foreground", children: [
                "📍 ",
                displayLocation
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AppButton,
            {
              fullWidth: true,
              variant: "outline",
              className: "mt-4",
              onClick: handleStartEdit,
              "data-ocid": "account-edit-btn",
              children: "Edit Profile"
            }
          )
        ] })
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl shadow-card border border-border p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Quick Actions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => navigate({ page: "bookings" }),
              className: "flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-muted transition-colors text-left",
              "data-ocid": "account-nav-bookings",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "📋" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "My Bookings" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-muted-foreground text-sm", children: "›" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => navigate({ page: "tickets" }),
              className: "flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-muted transition-colors text-left",
              "data-ocid": "account-nav-support",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "🎫" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "Support Tickets" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-muted-foreground text-sm", children: "›" })
              ]
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
          "data-ocid": "account-logout",
          children: "Sign Out"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-center text-muted-foreground pb-2", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " PondyOne. Serving Puducherry & Chennai 📍"
      ] })
    ] })
  ] });
}
const STATUS_ORDER = [
  BookingStatus.pending,
  BookingStatus.accepted,
  BookingStatus.completed,
  BookingStatus.declined
];
function sortBookings(bookings) {
  return [...bookings].sort((a, b) => {
    const ai = STATUS_ORDER.indexOf(a.status);
    const bi = STATUS_ORDER.indexOf(b.status);
    if (ai !== bi) return ai - bi;
    return Number(b.createdAt - a.createdAt);
  });
}
function UserBookings({ navigate }) {
  const session = getSession();
  const { data: bookings = [], isLoading } = useBookingsByUser(
    (session == null ? void 0 : session.userId) ?? ""
  );
  const sorted = sortBookings(bookings);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "bg-card border-b border-border sticky top-0 z-30 shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-lg mx-auto px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-base font-bold font-display text-foreground", children: "My Bookings" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-lg mx-auto px-4 py-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: ["bsk1", "bsk2", "bsk3"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-24 bg-muted rounded-2xl animate-pulse"
      },
      id
    )) }) : sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-16 text-center",
        "data-ocid": "bookings-empty-state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-5xl mb-4", children: "📋" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-lg mb-1", children: "No bookings yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Discover food, stays, turfs and more." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AppButton,
            {
              onClick: () => navigate({ page: "home" }),
              "data-ocid": "bookings-browse-cta",
              children: "Browse Listings"
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: sorted.map((booking, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card rounded-2xl shadow-card border border-border p-4",
        "data-ocid": `booking-item-${idx}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate", children: booking.itemRef }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono mt-0.5 truncate", children: [
                "#",
                booking.id.slice(0, 12),
                "…"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold shrink-0", style: { color: SAFFRON }, children: [
              "₹",
              booking.amountInr.toString()
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CategoryBadge,
              {
                category: booking.category
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatusBadge,
              {
                status: booking.status
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-auto", children: new Date(
              Number(booking.createdAt / 1000000n)
            ).toLocaleDateString("en-IN") })
          ] })
        ]
      },
      booking.id
    )) }) })
  ] });
}
function UserCheckout({
  navigate,
  itemId,
  itemName,
  ownerId,
  upiId,
  amount,
  category
}) {
  const [upiRef, setUpiRef] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const session = getSession();
  const createBooking = useCreateBooking();
  const categoryMap = {
    food: Category.food,
    stay: Category.stay,
    play: Category.play,
    retail: Category.retail
  };
  const handleConfirm = async () => {
    if (!upiRef.trim()) {
      setError("Please enter your UPI transaction reference.");
      return;
    }
    if (!session) {
      navigate({ page: "home" });
      return;
    }
    setError("");
    try {
      const result = await createBooking.mutateAsync({
        userId: session.userId,
        ownerId,
        category: categoryMap[category] ?? Category.food,
        itemRef: itemId,
        amountInr: amount,
        upiRef: upiRef.trim()
      });
      if (result.__kind__ === "ok") {
        playPing();
        navigate({ page: "confirmation", orderId: result.ok.id });
      } else {
        setError(result.err ?? "Booking failed. Please try again.");
      }
    } catch {
      setError("Booking failed. Please check your connection and try again.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "bg-card border-b border-border shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto px-4 py-3 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => navigate({ page: "search" }),
          className: "p-2 rounded-xl hover:bg-muted transition-colors",
          "aria-label": "Back",
          children: "←"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-base font-bold font-display text-foreground", children: "Checkout" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto px-4 py-5 flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl shadow-card border border-border p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Order Summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: itemName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-lg", style: { color: SAFFRON }, children: [
            "₹",
            amount.toString()
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl shadow-card border border-border p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Pay via UPI" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-3 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Send payment to" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-bold text-foreground text-sm select-all", children: upiId || "owner@upi" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-3 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-xl", style: { color: SAFFRON }, children: [
            "₹",
            amount.toString()
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl p-3 mb-4 text-xs leading-relaxed",
            style: { backgroundColor: `${SAFFRON}15`, color: "#1A1A2E" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold mb-1", children: "📱 How to pay:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "list-decimal list-inside space-y-1 text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Open any UPI app (PhonePe, GPay, Paytm)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                  "Send ₹",
                  amount.toString(),
                  " to the UPI ID above"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Copy the transaction reference number" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Paste it below and confirm your booking" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              className: "text-sm font-medium text-foreground",
              htmlFor: "upi-ref",
              children: "UPI Transaction Reference *"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "upi-ref",
              type: "text",
              placeholder: "e.g. 4056789123456",
              value: upiRef,
              onChange: (e) => setUpiRef(e.target.value),
              "data-ocid": "checkout-upi-ref",
              className: "h-12 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
            }
          ),
          error && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-destructive", children: error })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AppButton,
        {
          fullWidth: true,
          size: "lg",
          onClick: handleConfirm,
          disabled: createBooking.isPending,
          "data-ocid": "checkout-confirm",
          children: createBooking.isPending ? "Confirming…" : "✅ Confirm Booking"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "By confirming, you agree that payment has been made outside the app. The owner will verify and accept your booking." })
    ] })
  ] });
}
function UserConfirmation({ navigate, orderId }) {
  const [animate, setAnimate] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(t);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "transition-all duration-700 ease-out",
        style: {
          transform: animate ? "scale(1)" : "scale(0.5)",
          opacity: animate ? 1 : 0
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-24 h-24 rounded-full flex items-center justify-center text-5xl mb-6 mx-auto shadow-elevated",
            style: {
              backgroundColor: `${SAFFRON}20`,
              border: `3px solid ${SAFFRON}`
            },
            children: "✅"
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "h1",
      {
        className: "text-2xl font-bold font-display mb-2 transition-all duration-700 delay-200",
        style: {
          color: SAFFRON,
          opacity: animate ? 1 : 0,
          transform: animate ? "translateY(0)" : "translateY(10px)"
        },
        children: "Booking Confirmed!"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "text-muted-foreground text-sm mb-6 transition-all duration-700 delay-300",
        style: {
          opacity: animate ? 1 : 0,
          transform: animate ? "translateY(0)" : "translateY(10px)"
        },
        children: "Your booking has been submitted successfully."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card rounded-2xl border border-border shadow-card p-4 w-full max-w-xs mb-4 transition-all duration-700 delay-300",
        style: { opacity: animate ? 1 : 0 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Order ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-bold text-foreground text-sm break-all", children: orderId })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "mb-8 transition-all duration-700 delay-400",
        style: { opacity: animate ? 1 : 0 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: "pending", label: "Pending Approval" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "The owner will review and accept your booking shortly." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col gap-3 w-full max-w-xs transition-all duration-700 delay-500",
        style: { opacity: animate ? 1 : 0 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AppButton,
            {
              fullWidth: true,
              size: "lg",
              onClick: () => navigate({ page: "bookings" }),
              "data-ocid": "confirmation-view-bookings",
              children: "View All Bookings"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AppButton,
            {
              fullWidth: true,
              variant: "outline",
              size: "lg",
              onClick: () => navigate({ page: "home" }),
              "data-ocid": "confirmation-back-home",
              children: "Back to Home"
            }
          )
        ]
      }
    )
  ] });
}
const CATEGORY_GRADIENTS$2 = {
  food: "linear-gradient(135deg, #FF8C42, #FF6B35)",
  stay: "linear-gradient(135deg, #4A90E2, #2563EB)",
  play: "linear-gradient(135deg, #7ED321, #16A34A)",
  retail: "linear-gradient(135deg, #9B59B6, #7C3AED)"
};
const CATEGORIES = [
  {
    key: "food",
    label: "Food",
    emoji: CATEGORY_EMOJIS.food,
    color: CATEGORY_COLORS.food
  },
  {
    key: "stay",
    label: "Stay",
    emoji: CATEGORY_EMOJIS.stay,
    color: CATEGORY_COLORS.stay
  },
  {
    key: "play",
    label: "Play",
    emoji: CATEGORY_EMOJIS.play,
    color: CATEGORY_COLORS.play
  },
  {
    key: "retail",
    label: "Retail",
    emoji: CATEGORY_EMOJIS.retail,
    color: CATEGORY_COLORS.retail
  }
];
function UserHome({ navigate }) {
  var _a, _b;
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const session = getSession();
  const { data: foodItems = [], isLoading: loadingFood } = useAllFoodItems();
  const { data: stayRooms = [], isLoading: loadingStay } = useAllStayRooms();
  const { data: playSlots = [], isLoading: loadingPlay } = useAllPlaySlots();
  const { data: retailItems = [], isLoading: loadingRetail } = useAllRetailItems();
  const isLoading = loadingFood || loadingStay || loadingPlay || loadingRetail;
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const intent = detectIntent(searchQuery.trim());
    navigate({
      page: "search",
      q: searchQuery.trim(),
      category: intent ?? void 0
    });
  };
  const handleCategoryClick = (key) => {
    navigate({ page: "search", category: key });
  };
  const handleItemClick = (item) => {
    if (item.type === "food") {
      navigate({
        page: "item",
        id: item.data.id,
        category: "food",
        ownerId: item.data.ownerId
      });
    } else if (item.type === "stay") {
      navigate({
        page: "item",
        id: item.data.id,
        category: "stay",
        ownerId: item.data.ownerId
      });
    } else if (item.type === "play") {
      navigate({
        page: "item",
        id: item.data.id,
        category: "play",
        ownerId: item.data.ownerId
      });
    } else {
      navigate({
        page: "item",
        id: item.data.id,
        category: "retail",
        ownerId: item.data.ownerId
      });
    }
  };
  const featured = [];
  for (let i = 0; i < Math.max(
    foodItems.length,
    stayRooms.length,
    playSlots.length,
    retailItems.length
  ); i++) {
    if (foodItems[i]) featured.push({ type: "food", data: foodItems[i] });
    if (stayRooms[i]) featured.push({ type: "stay", data: stayRooms[i] });
    if (playSlots[i]) featured.push({ type: "play", data: playSlots[i] });
    if (retailItems[i]) featured.push({ type: "retail", data: retailItems[i] });
  }
  const displayItems = featured.slice(0, 8);
  const getItemName = (item) => {
    if (item.type === "food") return item.data.itemName;
    if (item.type === "stay") return item.data.roomName;
    if (item.type === "play")
      return `${item.data.surfaceType} — ${item.data.slotTime}`;
    return item.data.itemName;
  };
  const getItemPrice = (item) => {
    if (item.type === "food") return `₹${item.data.priceInr}`;
    if (item.type === "stay") return `₹${item.data.pricePerNight}/night`;
    if (item.type === "play") return `₹${item.data.hourlyRate}/hr`;
    return `₹${item.data.priceInr}`;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "bg-card border-b border-border sticky top-0 z-30 shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto px-4 py-3 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "h1",
          {
            className: "text-xl font-bold font-display",
            style: { color: "#1A1A2E" },
            children: [
              "Pondy",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: SAFFRON }, children: "One" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
          "📍",
          " ",
          (session == null ? void 0 : session.name) ? `Hi, ${session.name.split(" ")[0]}` : "Puducherry"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => navigate({ page: "account" }),
          className: "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold text-white shadow-sm",
          style: { backgroundColor: SAFFRON },
          "aria-label": "Account",
          children: ((_b = (_a = session == null ? void 0 : session.name) == null ? void 0 : _a[0]) == null ? void 0 : _b.toUpperCase()) ?? "U"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-2xl mt-4 mb-4 px-4 py-5",
          style: {
            background: `linear-gradient(135deg, ${SAFFRON}18, ${SAFFRON}08)`
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm font-semibold mb-3",
                style: { color: "#1A1A2E" },
                children: "What are you looking for today?"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSearch, className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "search",
                  placeholder: "Search for Biryani, Cricket turf, Rooms...",
                  value: searchQuery,
                  onChange: (e) => setSearchQuery(e.target.value),
                  "data-ocid": "home-search-input",
                  className: "flex-1 h-12 px-4 rounded-xl border-2 border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "submit",
                  className: "h-12 w-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm transition-smooth hover:opacity-90 active:scale-95",
                  style: { backgroundColor: SAFFRON },
                  "aria-label": "Search",
                  "data-ocid": "home-search-submit",
                  children: "🔍"
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => handleCategoryClick(cat.key),
          "data-ocid": `category-chip-${cat.key}`,
          className: "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-smooth hover:opacity-90 active:scale-95 shadow-sm",
          style: { backgroundColor: cat.color },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cat.emoji }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cat.label })
          ]
        },
        cat.key
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-5 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold font-display text-foreground mb-3", children: "Featured Listings" }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: ["sk1", "sk2", "sk3", "sk4"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "rounded-2xl bg-muted animate-pulse h-48"
          },
          id
        )) }) : displayItems.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl mb-2", children: "🏪" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No listings yet. Check back soon!" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: displayItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          AppCard,
          {
            padded: false,
            onClick: () => handleItemClick(item),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-28 rounded-t-2xl flex items-center justify-center text-4xl",
                  style: { background: CATEGORY_GRADIENTS$2[item.type] },
                  children: CATEGORY_EMOJIS[item.type]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground truncate leading-tight mb-1", children: getItemName(item) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryBadge, { category: item.type }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs font-bold",
                      style: { color: SAFFRON },
                      children: getItemPrice(item)
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AppButton,
                  {
                    fullWidth: true,
                    size: "sm",
                    className: "mt-2 text-xs",
                    onClick: (e) => {
                      e.stopPropagation();
                      handleItemClick(item);
                    },
                    "data-ocid": `featured-book-${item.type}-${item.data.id}`,
                    children: "Book Now"
                  }
                )
              ] })
            ]
          },
          `${item.type}-${item.data.id}`
        )) })
      ] })
    ] })
  ] });
}
const CATEGORY_GRADIENTS$1 = {
  food: "linear-gradient(135deg, #FF8C42, #FF6B35)",
  stay: "linear-gradient(135deg, #4A90E2, #2563EB)",
  play: "linear-gradient(135deg, #7ED321, #16A34A)",
  retail: "linear-gradient(135deg, #9B59B6, #7C3AED)"
};
function UserItemDetail({
  navigate,
  id,
  category,
  ownerId
}) {
  const { data: foodItems = [] } = useAllFoodItems();
  const { data: stayRooms = [] } = useAllStayRooms();
  const { data: playSlots = [] } = useAllPlaySlots();
  const { data: retailItems = [] } = useAllRetailItems();
  const { data: owner } = useGetOwnerById(ownerId);
  let item;
  if (category === "food") item = foodItems.find((f) => f.id === id);
  else if (category === "stay") item = stayRooms.find((r) => r.id === id);
  else if (category === "play") item = playSlots.find((p) => p.id === id);
  else if (category === "retail") item = retailItems.find((r) => r.id === id);
  const getItemName = () => {
    if (!item) return "Item";
    if (category === "food") return item.itemName;
    if (category === "stay") return item.roomName;
    if (category === "play")
      return `${item.surfaceType} · ${item.slotTime}`;
    return item.itemName;
  };
  const getItemPrice = () => {
    if (!item) return 0n;
    if (category === "food") return item.priceInr;
    if (category === "stay") return item.pricePerNight;
    if (category === "play") return item.hourlyRate;
    return item.priceInr;
  };
  const getDescription = () => {
    if (!item) return "";
    if (category === "food")
      return item.description || "Freshly prepared with quality ingredients.";
    if (category === "stay") {
      const r = item;
      return `Amenities: ${r.amenities.join(", ") || "Standard amenities"}. Comfortable stay in the heart of Puducherry.`;
    }
    if (category === "play") {
      const p = item;
      return `${p.surfaceType} surface. Time slot: ${p.slotTime}. Book your sports experience now.`;
    }
    const ri = item;
    return `Category: ${ri.category}. Qty available: ${ri.quantity}.`;
  };
  const getAvailability = () => {
    if (!item) return false;
    if (category === "food") return item.isAvailable;
    if (category === "stay") return item.isAvailable;
    if (category === "play") return !item.isBooked;
    return item.inStock;
  };
  const handleBookNow = () => {
    if (!item || !owner) return;
    navigate({
      page: "checkout",
      itemId: id,
      itemName: getItemName(),
      ownerId,
      upiId: owner.upiId,
      amount: getItemPrice(),
      category
    });
  };
  if (!item) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl", children: "😕" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Item not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AppButton,
        {
          variant: "outline",
          onClick: () => navigate({ page: "search" }),
          children: "Browse Listings"
        }
      )
    ] });
  }
  const available = getAvailability();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative h-52 flex items-center justify-center text-7xl",
        style: { background: CATEGORY_GRADIENTS$1[category] },
        children: [
          CATEGORY_EMOJIS[category] ?? "📦",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => navigate({ page: "search" }),
              className: "absolute top-4 left-4 w-9 h-9 rounded-full bg-white/80 flex items-center justify-center text-sm shadow transition-colors hover:bg-white",
              "aria-label": "Back",
              children: "←"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto px-4 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold font-display text-foreground leading-tight flex-1 min-w-0", children: getItemName() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatusBadge,
          {
            status: available ? "accepted" : "declined",
            label: available ? "Available" : "Unavailable"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CategoryBadge,
          {
            category
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-bold", style: { color: SAFFRON }, children: [
          "₹",
          getItemPrice().toString(),
          category === "stay" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-normal", children: "/night" }),
          category === "play" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-normal", children: "/hr" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5 leading-relaxed", children: getDescription() }),
      category === "food" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium",
          style: item.isVeg ? { backgroundColor: "#dcfce7", color: "#16a34a" } : { backgroundColor: "#fee2e2", color: "#dc2626" },
          children: item.isVeg ? "🟢 Veg" : "🔴 Non-Veg"
        }
      ) }),
      owner && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-3 mb-5 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0",
            style: { backgroundColor: SAFFRON },
            children: owner.businessName[0] ?? "B"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate", children: owner.businessName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
            "📍 ",
            owner.locationText
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AppButton,
        {
          fullWidth: true,
          size: "lg",
          disabled: !available || !owner,
          onClick: handleBookNow,
          "data-ocid": "item-book-now",
          children: available ? "Book Now" : "Currently Unavailable"
        }
      ),
      !available && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center mt-2", children: "This item is currently not available. Check back later." })
    ] })
  ] });
}
const CATEGORY_GRADIENTS = {
  food: "linear-gradient(135deg, #FF8C42, #FF6B35)",
  stay: "linear-gradient(135deg, #4A90E2, #2563EB)",
  play: "linear-gradient(135deg, #7ED321, #16A34A)",
  retail: "linear-gradient(135deg, #9B59B6, #7C3AED)"
};
const FILTER_TABS = [
  { key: "all", label: "All" },
  { key: "food", label: "🍔 Food" },
  { key: "stay", label: "🏨 Stay" },
  { key: "play", label: "⚽ Play" },
  { key: "retail", label: "🛒 Retail" }
];
function UserSearch({ navigate, q, category }) {
  const [searchInput, setSearchInput] = reactExports.useState(q ?? "");
  const [activeCategory, setActiveCategory] = reactExports.useState(
    category ?? "all"
  );
  const { data: foodItems = [] } = useAllFoodItems();
  const { data: stayRooms = [] } = useAllStayRooms();
  const { data: playSlots = [] } = useAllPlaySlots();
  const { data: retailItems = [] } = useAllRetailItems();
  const handleSearch = (e) => {
    e.preventDefault();
    const intent = detectIntent(searchInput.trim());
    if (intent) setActiveCategory(intent);
    else setActiveCategory("all");
  };
  const allItems = reactExports.useMemo(() => {
    const items = [];
    for (const d of foodItems) items.push({ type: "food", data: d });
    for (const d of stayRooms) items.push({ type: "stay", data: d });
    for (const d of playSlots) items.push({ type: "play", data: d });
    for (const d of retailItems) items.push({ type: "retail", data: d });
    return items;
  }, [foodItems, stayRooms, playSlots, retailItems]);
  const filtered = reactExports.useMemo(() => {
    let result = allItems;
    if (activeCategory !== "all") {
      result = result.filter((i) => i.type === activeCategory);
    }
    if (searchInput.trim()) {
      const q2 = searchInput.toLowerCase();
      result = result.filter((item) => {
        const name = getItemName(item).toLowerCase();
        return name.includes(q2);
      });
    }
    return result;
  }, [allItems, activeCategory, searchInput]);
  function getItemName(item) {
    if (item.type === "food") return item.data.itemName;
    if (item.type === "stay") return item.data.roomName;
    if (item.type === "play")
      return `${item.data.surfaceType} · ${item.data.slotTime}`;
    return item.data.itemName;
  }
  function getItemPrice(item) {
    if (item.type === "food") return `₹${item.data.priceInr}`;
    if (item.type === "stay") return `₹${item.data.pricePerNight}/night`;
    if (item.type === "play") return `₹${item.data.hourlyRate}/hr`;
    return `₹${item.data.priceInr}`;
  }
  function handleBookNow(item) {
    navigate({
      page: "item",
      id: item.data.id,
      category: item.type,
      ownerId: item.data.ownerId
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "bg-card border-b border-border sticky top-0 z-30 shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-lg mx-auto px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => navigate({ page: "home" }),
          className: "p-2 rounded-xl hover:bg-muted transition-colors text-lg",
          "aria-label": "Back",
          children: "←"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSearch, className: "flex-1 flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "search",
            placeholder: "Search listings…",
            value: searchInput,
            onChange: (e) => setSearchInput(e.target.value),
            "data-ocid": "search-input",
            className: "flex-1 h-10 px-3 rounded-xl border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            className: "h-10 w-10 rounded-xl flex items-center justify-center text-white text-sm",
            style: { backgroundColor: SAFFRON },
            "aria-label": "Search",
            children: "🔍"
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto py-3 scrollbar-hide -mx-4 px-4", children: FILTER_TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setActiveCategory(tab.key),
          "data-ocid": `search-filter-${tab.key}`,
          className: "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap shrink-0 transition-smooth border",
          style: activeCategory === tab.key ? {
            backgroundColor: SAFFRON,
            color: "#fff",
            borderColor: SAFFRON
          } : {
            backgroundColor: "transparent",
            borderColor: "#e5e7eb",
            color: "#6b7280"
          },
          children: tab.label
        },
        tab.key
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-3", children: [
        filtered.length,
        " result",
        filtered.length !== 1 ? "s" : "",
        activeCategory !== "all" ? ` in ${activeCategory}` : ""
      ] }),
      filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl mb-3", children: "🔍" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "No results found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Try a different search or browse a category above." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3 pb-4", children: filtered.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card rounded-2xl shadow-card border border-border overflow-hidden",
          "data-ocid": `search-result-${idx}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-32 flex items-center justify-center text-5xl",
                style: { background: CATEGORY_GRADIENTS[item.type] },
                children: CATEGORY_EMOJIS[item.type]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground truncate", children: getItemName(item) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "📍 ~2 km away" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-bold text-sm",
                    style: { color: SAFFRON },
                    children: getItemPrice(item)
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryBadge, { category: item.type }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AppButton,
                  {
                    size: "sm",
                    onClick: () => handleBookNow(item),
                    "data-ocid": `search-book-${idx}`,
                    children: "Book Now"
                  }
                )
              ] })
            ] })
          ]
        },
        item.data.id
      )) })
    ] })
  ] });
}
const TICKET_CATEGORIES = ["Food", "Stay", "Play", "Retail", "Other"];
function UserTickets({ navigate: _navigate }) {
  const session = getSession();
  const { data: tickets = [], isLoading } = useTicketsByUser(
    (session == null ? void 0 : session.userId) ?? ""
  );
  const createTicket = useCreateTicket();
  const addMessage = useAddTicketMessage();
  const [showNewForm, setShowNewForm] = reactExports.useState(false);
  const [selectedTicket, setSelectedTicket] = reactExports.useState(null);
  const [newMsg, setNewMsg] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [ticketCategory, setTicketCategory] = reactExports.useState("Other");
  const [imageUrl, setImageUrl] = reactExports.useState("");
  const [formError, setFormError] = reactExports.useState("");
  const handleSubmitTicket = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
      setFormError("Please describe your issue.");
      return;
    }
    if (!session) return;
    setFormError("");
    try {
      const result = await createTicket.mutateAsync({
        raisedBy: session.userId,
        ownerId: null,
        category: ticketCategory,
        description: description.trim(),
        imageUrl: imageUrl.trim() || null
      });
      if (result.__kind__ === "ok") {
        setShowNewForm(false);
        setDescription("");
        setImageUrl("");
        setTicketCategory("Other");
      } else {
        setFormError(result.err ?? "Failed to create ticket.");
      }
    } catch {
      setFormError("Failed to create ticket. Please try again.");
    }
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMsg.trim() || !selectedTicket || !session) return;
    await addMessage.mutateAsync({
      ticketId: selectedTicket.id,
      sender: session.name,
      text: newMsg.trim()
    });
    setNewMsg("");
  };
  const sortedTickets = [...tickets].sort(
    (a, b) => Number(b.createdAt - a.createdAt)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "bg-card border-b border-border sticky top-0 z-30 shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto px-4 py-3 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-base font-bold font-display text-foreground", children: "Support" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AppButton,
        {
          size: "sm",
          onClick: () => setShowNewForm(true),
          "data-ocid": "new-ticket-btn",
          children: "+ New Ticket"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-lg mx-auto px-4 py-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: ["tsk1", "tsk2"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-20 bg-muted rounded-2xl animate-pulse"
      },
      id
    )) }) : sortedTickets.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", "data-ocid": "tickets-empty-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl mb-3", children: "🎫" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: "No support tickets" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5", children: "Need help? Raise a ticket and we'll assist you." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AppButton, { onClick: () => setShowNewForm(true), children: "Raise a Ticket" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: sortedTickets.map((ticket) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: "bg-card rounded-2xl shadow-card border border-border p-4 text-left w-full transition-smooth hover:shadow-elevated active:scale-[0.99]",
        onClick: () => setSelectedTicket(ticket),
        "data-ocid": `ticket-item-${ticket.id.slice(0, 6)}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-sm text-foreground truncate flex-1", children: [
              ticket.description.slice(0, 60),
              ticket.description.length > 60 ? "…" : ""
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: ticket.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full bg-muted font-medium", children: ticket.category }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              ticket.messages.length,
              " message",
              ticket.messages.length !== 1 ? "s" : ""
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto", children: new Date(
              Number(ticket.createdAt / 1000000n)
            ).toLocaleDateString("en-IN") })
          ] })
        ]
      },
      ticket.id
    )) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AppModal,
      {
        isOpen: showNewForm,
        onClose: () => setShowNewForm(false),
        title: "Raise a Support Ticket",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmitTicket, className: "flex flex-col gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                className: "text-sm font-medium text-foreground",
                htmlFor: "ticket-category",
                children: "Category"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                id: "ticket-category",
                value: ticketCategory,
                onChange: (e) => setTicketCategory(e.target.value),
                "data-ocid": "ticket-category-select",
                className: "h-11 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary",
                children: TICKET_CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                className: "text-sm font-medium text-foreground",
                htmlFor: "ticket-desc",
                children: "Describe your issue *"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                id: "ticket-desc",
                rows: 4,
                placeholder: "Tell us what happened…",
                value: description,
                onChange: (e) => setDescription(e.target.value),
                "data-ocid": "ticket-description",
                className: "px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                className: "text-sm font-medium text-foreground",
                htmlFor: "ticket-image",
                children: "Image URL (optional)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "ticket-image",
                type: "url",
                placeholder: "https://…",
                value: imageUrl,
                onChange: (e) => setImageUrl(e.target.value),
                className: "h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              }
            )
          ] }),
          formError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: formError }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AppButton,
            {
              type: "submit",
              fullWidth: true,
              disabled: createTicket.isPending,
              "data-ocid": "ticket-submit",
              children: createTicket.isPending ? "Submitting…" : "Submit Ticket"
            }
          )
        ] })
      }
    ),
    selectedTicket && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AppModal,
      {
        isOpen: !!selectedTicket,
        onClose: () => setSelectedTicket(null),
        title: `Ticket #${selectedTicket.id.slice(0, 8)}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full bg-muted text-xs font-medium", children: selectedTicket.category }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatusBadge,
              {
                status: selectedTicket.status
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground bg-muted/40 rounded-xl p-3", children: selectedTicket.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2 max-h-52 overflow-y-auto", children: selectedTicket.messages.map((msg) => {
            const isUser = msg.sender === (session == null ? void 0 : session.name);
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `flex ${isUser ? "justify-end" : "justify-start"}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "max-w-[80%] rounded-2xl px-3 py-2 text-sm",
                    style: isUser ? { backgroundColor: SAFFRON, color: "#fff" } : { backgroundColor: "#f3f4f6", color: "#1A1A2E" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: msg.text }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] mt-0.5 opacity-70", children: [
                        msg.sender,
                        " ·",
                        " ",
                        new Date(
                          Number(msg.timestamp / 1000000n)
                        ).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit"
                        })
                      ] })
                    ]
                  }
                )
              },
              `${msg.timestamp}-${msg.sender}`
            );
          }) }),
          selectedTicket.status === "open" && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSendMessage, className: "flex gap-2 mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                placeholder: "Type a message…",
                value: newMsg,
                onChange: (e) => setNewMsg(e.target.value),
                "data-ocid": "ticket-reply-input",
                className: "flex-1 h-10 px-3 rounded-xl border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "submit",
                className: "h-10 w-10 rounded-xl flex items-center justify-center text-white shrink-0",
                style: { backgroundColor: SAFFRON },
                "aria-label": "Send",
                disabled: addMessage.isPending,
                children: "➤"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
const NAV_ITEMS = [
  { icon: "🏠", label: "Home", path: "home" },
  { icon: "🔍", label: "Search", path: "search" },
  { icon: "📋", label: "Bookings", path: "bookings" },
  { icon: "🎫", label: "Support", path: "tickets" },
  { icon: "👤", label: "Account", path: "account" }
];
const BOTTOM_NAV_PAGES = ["home", "search", "bookings", "tickets", "account"];
function UserApp() {
  const topNavigate = useNavigate();
  const [route, setRoute] = reactExports.useState({ page: "home" });
  reactExports.useEffect(() => {
    const session = getSession();
    if (!session || session.role !== "user") {
      topNavigate({ to: "/" });
    }
  }, [topNavigate]);
  const navigate = (r) => setRoute(r);
  function handleLogout() {
    clearSession();
    topNavigate({ to: "/" });
  }
  const showNav = BOTTOM_NAV_PAGES.includes(route.page);
  const handleNavNavigate = (path) => {
    if (path === "search") navigate({ page: "search" });
    else if (path === "bookings") navigate({ page: "bookings" });
    else if (path === "tickets") navigate({ page: "tickets" });
    else if (path === "account") navigate({ page: "account" });
    else navigate({ page: "home" });
  };
  const renderPage = () => {
    switch (route.page) {
      case "home":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(UserHome, { navigate });
      case "search":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          UserSearch,
          {
            navigate,
            q: route.q,
            category: route.category
          }
        );
      case "item":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          UserItemDetail,
          {
            navigate,
            id: route.id,
            category: route.category,
            ownerId: route.ownerId
          }
        );
      case "checkout":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          UserCheckout,
          {
            navigate,
            itemId: route.itemId,
            itemName: route.itemName,
            ownerId: route.ownerId,
            upiId: route.upiId,
            amount: route.amount,
            category: route.category
          }
        );
      case "confirmation":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(UserConfirmation, { navigate, orderId: route.orderId });
      case "bookings":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(UserBookings, { navigate });
      case "tickets":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(UserTickets, { navigate });
      case "account":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(UserAccount, { navigate, onLogout: handleLogout });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(UserHome, { navigate });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: showNav ? "pb-16" : "", children: renderPage() }),
    showNav && /* @__PURE__ */ jsxRuntimeExports.jsx(
      BottomNav,
      {
        items: NAV_ITEMS.map((n) => ({ ...n, path: n.path })),
        currentPath: route.page,
        onNavigate: handleNavNavigate
      }
    )
  ] });
}
export {
  UserApp as default
};
