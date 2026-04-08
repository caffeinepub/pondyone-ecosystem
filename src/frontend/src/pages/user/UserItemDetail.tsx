import { useState } from "react";
import { CategoryBadge, StatusBadge } from "../../components/ui/AppBadge";
import { AppButton } from "../../components/ui/AppButton";
import {
  useAllFoodItems,
  useAllRetailItems,
  useAllStayRooms,
  useGetOwnerById,
  useSlotsByDate,
} from "../../hooks/useQueries";
import type {
  FoodItem,
  PlaySlot,
  RetailItem,
  StayRoom,
} from "../../hooks/useQueries";
import { CATEGORY_EMOJIS, SAFFRON } from "../../lib/constants";
import type { UserRoute } from "./UserApp";

interface Props {
  navigate: (r: UserRoute) => void;
  id: string;
  category: string;
  ownerId: string;
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  food: "linear-gradient(135deg, #FF8C42, #FF6B35)",
  stay: "linear-gradient(135deg, #4A90E2, #2563EB)",
  play: "linear-gradient(135deg, #7ED321, #16A34A)",
  retail: "linear-gradient(135deg, #9B59B6, #7C3AED)",
};

function toDateStr(d: Date) {
  return d.toISOString().split("T")[0];
}

function TurfSlotGrid({
  ownerId,
  selectedDate,
  selectedSlotId,
  onSelectSlot,
}: {
  ownerId: string;
  selectedDate: string;
  selectedSlotId: string | null;
  onSelectSlot: (slot: PlaySlot) => void;
}) {
  const { data: slots = [], isLoading } = useSlotsByDate(ownerId, selectedDate);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-2">
        {["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => (
          <div key={k} className="h-16 rounded-xl bg-muted/60 animate-pulse" />
        ))}
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground text-sm">
        No slots available for this date
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2" data-ocid="turf-slot-grid">
      {slots.map((slot) => {
        const isSelected = selectedSlotId === slot.id;
        return (
          <button
            key={slot.id}
            type="button"
            disabled={slot.isBooked}
            onClick={() => !slot.isBooked && onSelectSlot(slot)}
            data-ocid="turf-slot-btn"
            className={[
              "rounded-xl p-3 flex flex-col items-center gap-1 border-2 transition-all",
              slot.isBooked
                ? "bg-muted/40 border-border opacity-50 cursor-not-allowed"
                : isSelected
                  ? "border-[#16A34A] bg-[#dcfce7]"
                  : "bg-card border-border hover:border-[#16A34A] hover:bg-[#f0fdf4] cursor-pointer",
            ].join(" ")}
          >
            <span className="text-xs font-semibold text-foreground">
              {slot.startTime}–{slot.endTime}
            </span>
            <span
              className="text-sm font-bold"
              style={{ color: slot.isBooked ? undefined : SAFFRON }}
            >
              {slot.isBooked ? "Booked" : `₹${slot.hourlyRate.toString()}`}
            </span>
            {isSelected && (
              <span className="text-xs font-semibold text-[#16A34A]">
                ✓ Selected
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default function UserItemDetail({
  navigate,
  id,
  category,
  ownerId,
}: Props) {
  const today = toDateStr(new Date());

  // Stay state
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  // Play state
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedSlot, setSelectedSlot] = useState<PlaySlot | null>(null);

  const { data: foodItems = [] } = useAllFoodItems();
  const { data: stayRooms = [] } = useAllStayRooms();
  const { data: retailItems = [] } = useAllRetailItems();
  const { data: owner } = useGetOwnerById(ownerId);

  type NonPlayItem = FoodItem | StayRoom | RetailItem;
  let item: NonPlayItem | undefined;
  if (category === "food") item = foodItems.find((f) => f.id === id);
  else if (category === "stay") item = stayRooms.find((r) => r.id === id);
  else if (category === "retail") item = retailItems.find((r) => r.id === id);

  const getItemName = (): string => {
    if (category === "play") {
      return selectedSlot
        ? `${selectedSlot.surfaceType} · ${selectedSlot.startTime}–${selectedSlot.endTime}`
        : "Turf Booking";
    }
    if (!item) return "Item";
    if (category === "food") return (item as FoodItem).itemName;
    if (category === "stay") return (item as StayRoom).roomName;
    return (item as RetailItem).itemName;
  };

  const getItemPrice = (): bigint => {
    if (category === "play") return selectedSlot ? selectedSlot.hourlyRate : 0n;
    if (!item) return 0n;
    if (category === "food") return (item as FoodItem).priceInr;
    if (category === "stay") return (item as StayRoom).pricePerNight;
    return (item as RetailItem).priceInr;
  };

  const getDescription = (): string => {
    if (category === "play")
      return "Book your turf slot. Select a date and an available time block below to proceed.";
    if (!item) return "";
    if (category === "food")
      return (
        (item as FoodItem).description ||
        "Freshly prepared with quality ingredients."
      );
    if (category === "stay") {
      const r = item as StayRoom;
      return `Amenities: ${r.amenities.join(", ") || "Standard amenities"}. Comfortable stay in the heart of Puducherry.`;
    }
    const ri = item as RetailItem;
    return `Category: ${ri.category}. Qty available: ${ri.quantity}.`;
  };

  // ── Stay date calculation ──────────────────────────────────────
  const nights =
    checkIn && checkOut && checkOut > checkIn
      ? Math.round(
          (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
            86400000,
        )
      : 0;
  const pricePerNight = category === "stay" ? getItemPrice() : 0n;
  const calculatedTotal = nights > 0 ? pricePerNight * BigInt(nights) : 0n;
  const stayDatesValid =
    category !== "stay" ||
    (checkIn !== "" && checkOut !== "" && checkOut > checkIn);

  const getAvailability = (): boolean => {
    if (category === "play") return selectedSlot !== null;
    if (!item) return false;
    if (category === "food") return (item as FoodItem).isAvailable;
    if (category === "stay") return (item as StayRoom).isAvailable;
    return (item as RetailItem).inStock;
  };

  const handleBookNow = () => {
    if (!owner) return;
    if (category === "play") {
      if (!selectedSlot) return;
      navigate({
        page: "checkout",
        itemId: selectedSlot.id,
        itemName: `${selectedSlot.surfaceType} · ${selectedSlot.startTime}–${selectedSlot.endTime}`,
        ownerId,
        upiId: owner.upiId,
        amount: selectedSlot.hourlyRate,
        category,
        slotDate: selectedSlot.slotDate || selectedDate,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
      });
    } else {
      if (!item) return;
      navigate({
        page: "checkout",
        itemId: id,
        itemName: getItemName(),
        ownerId,
        upiId: owner.upiId,
        amount: category === "stay" ? calculatedTotal : getItemPrice(),
        category,
        ...(category === "stay" && {
          checkInDate: checkIn,
          checkOutDate: checkOut,
        }),
      });
    }
  };

  // For non-play categories, show "not found" if item missing
  if (category !== "play" && !item) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-6">
        <p className="text-4xl">😕</p>
        <p className="font-semibold text-foreground">Item not found</p>
        <AppButton
          variant="outline"
          onClick={() => navigate({ page: "search" })}
        >
          Browse Listings
        </AppButton>
      </div>
    );
  }

  const available = getAvailability();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div
        className="relative h-52 flex items-center justify-center text-7xl"
        style={{ background: CATEGORY_GRADIENTS[category] }}
      >
        {CATEGORY_EMOJIS[category as keyof typeof CATEGORY_EMOJIS] ?? "📦"}
        <button
          type="button"
          onClick={() => navigate({ page: "search" })}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/80 flex items-center justify-center text-sm shadow transition-colors hover:bg-white"
          aria-label="Back"
        >
          ←
        </button>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-4 py-4">
        {/* Name & availability */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h1 className="text-xl font-bold font-display text-foreground leading-tight flex-1 min-w-0">
            {getItemName()}
          </h1>
          {category !== "play" && (
            <StatusBadge
              status={available ? "accepted" : "declined"}
              label={available ? "Available" : "Unavailable"}
            />
          )}
        </div>

        {/* Category & price */}
        <div className="flex items-center gap-3 mb-1">
          <CategoryBadge
            category={category as "food" | "stay" | "play" | "retail"}
          />
          {category === "play" ? (
            selectedSlot ? (
              <span className="text-lg font-bold" style={{ color: SAFFRON }}>
                ₹{selectedSlot.hourlyRate.toString()}
                <span className="text-sm font-normal text-muted-foreground">
                  /hr
                </span>
              </span>
            ) : (
              <span className="text-sm text-muted-foreground">
                Select a slot to see price
              </span>
            )
          ) : (
            <span className="text-lg font-bold" style={{ color: SAFFRON }}>
              ₹{getItemPrice().toString()}
              {category === "stay" && (
                <span className="text-sm font-normal text-muted-foreground">
                  /night
                </span>
              )}
            </span>
          )}
        </div>

        {/* Retail delivery note */}
        {category === "retail" && (
          <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
            <span>🚚</span>
            <span>
              Delivery fee calculated at checkout based on your location
            </span>
          </p>
        )}

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed mt-2">
          {getDescription()}
        </p>

        {/* Food extras */}
        {category === "food" && item && (
          <div className="mb-4 flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium"
              style={
                (item as FoodItem).isVeg
                  ? { backgroundColor: "#dcfce7", color: "#16a34a" }
                  : { backgroundColor: "#fee2e2", color: "#dc2626" }
              }
            >
              {(item as FoodItem).isVeg ? "🟢 Veg" : "🔴 Non-Veg"}
            </span>
          </div>
        )}

        {/* ── Stay Date Picker ──────────────────────────────────────── */}
        {category === "stay" && (
          <div className="bg-card border border-border rounded-2xl p-4 mb-5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              🗓 Select Your Stay Dates
            </p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="stay-checkin"
                  className="text-xs font-medium text-foreground"
                >
                  Check-in
                </label>
                <input
                  id="stay-checkin"
                  type="date"
                  min={today}
                  value={checkIn}
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                    if (checkOut && checkOut <= e.target.value) setCheckOut("");
                  }}
                  data-ocid="stay-checkin-date"
                  className="h-11 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="stay-checkout"
                  className="text-xs font-medium text-foreground"
                >
                  Check-out
                </label>
                <input
                  id="stay-checkout"
                  type="date"
                  min={checkIn || today}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  data-ocid="stay-checkout-date"
                  className="h-11 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                />
              </div>
            </div>
            <div
              className="rounded-xl p-3 flex items-center justify-between"
              style={{ backgroundColor: `${SAFFRON}15` }}
            >
              {nights > 0 ? (
                <>
                  <span className="text-sm text-muted-foreground">
                    {nights} night{nights > 1 ? "s" : ""} × ₹
                    {pricePerNight.toString()}
                  </span>
                  <span
                    className="text-lg font-bold"
                    style={{ color: SAFFRON }}
                  >
                    ₹{calculatedTotal.toString()}
                  </span>
                </>
              ) : (
                <span className="text-sm text-muted-foreground italic w-full text-center">
                  Select dates to see total price
                </span>
              )}
            </div>
          </div>
        )}

        {/* ── Play/Turf Slot Picker ─────────────────────────────────── */}
        {category === "play" && (
          <div className="mb-5">
            <label
              htmlFor="turf-date"
              className="block text-sm font-semibold text-foreground mb-2"
            >
              📅 Select Date
            </label>
            <input
              id="turf-date"
              type="date"
              value={selectedDate}
              min={today}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSelectedSlot(null);
              }}
              data-ocid="turf-date-picker"
              className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-colors mb-4"
            />
            <p className="text-sm font-semibold text-foreground mb-3">
              🏟️ Available Time Slots
            </p>
            <TurfSlotGrid
              ownerId={ownerId}
              selectedDate={selectedDate}
              selectedSlotId={selectedSlot?.id ?? null}
              onSelectSlot={setSelectedSlot}
            />
          </div>
        )}

        {/* Owner info */}
        {owner && (
          <div className="bg-muted/40 rounded-xl p-3 mb-5 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0"
              style={{ backgroundColor: SAFFRON }}
            >
              {owner.businessName[0] ?? "B"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-sm text-foreground truncate">
                {owner.businessName}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                📍 {owner.locationText}
              </p>
            </div>
          </div>
        )}

        {/* Book button */}
        <AppButton
          fullWidth
          size="lg"
          disabled={
            category === "play"
              ? !selectedSlot || !owner
              : !available || !owner || !stayDatesValid
          }
          onClick={handleBookNow}
          data-ocid="item-book-now"
        >
          {category === "play"
            ? selectedSlot
              ? "Book This Slot"
              : "Select a Slot to Book"
            : !available
              ? "Currently Unavailable"
              : category === "stay" && !stayDatesValid
                ? "Select Dates to Continue"
                : "Book Now"}
        </AppButton>

        {category !== "play" && !available && (
          <p className="text-xs text-muted-foreground text-center mt-2">
            This item is currently not available. Check back later.
          </p>
        )}
        {category === "stay" && available && !stayDatesValid && (
          <p className="text-xs text-muted-foreground text-center mt-2">
            Please select valid check-in and check-out dates to continue.
          </p>
        )}
      </div>
    </div>
  );
}
