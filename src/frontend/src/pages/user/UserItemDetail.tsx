import { CategoryBadge, StatusBadge } from "../../components/ui/AppBadge";
import { AppButton } from "../../components/ui/AppButton";
import {
  useAllFoodItems,
  useAllPlaySlots,
  useAllRetailItems,
  useAllStayRooms,
  useGetOwnerById,
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

export default function UserItemDetail({
  navigate,
  id,
  category,
  ownerId,
}: Props) {
  const { data: foodItems = [] } = useAllFoodItems();
  const { data: stayRooms = [] } = useAllStayRooms();
  const { data: playSlots = [] } = useAllPlaySlots();
  const { data: retailItems = [] } = useAllRetailItems();
  const { data: owner } = useGetOwnerById(ownerId);

  type AnyItem = FoodItem | StayRoom | PlaySlot | RetailItem;

  let item: AnyItem | undefined;
  if (category === "food") item = foodItems.find((f) => f.id === id);
  else if (category === "stay") item = stayRooms.find((r) => r.id === id);
  else if (category === "play") item = playSlots.find((p) => p.id === id);
  else if (category === "retail") item = retailItems.find((r) => r.id === id);

  const getItemName = () => {
    if (!item) return "Item";
    if (category === "food") return (item as FoodItem).itemName;
    if (category === "stay") return (item as StayRoom).roomName;
    if (category === "play")
      return `${(item as PlaySlot).surfaceType} · ${(item as PlaySlot).slotTime}`;
    return (item as RetailItem).itemName;
  };

  const getItemPrice = (): bigint => {
    if (!item) return 0n;
    if (category === "food") return (item as FoodItem).priceInr;
    if (category === "stay") return (item as StayRoom).pricePerNight;
    if (category === "play") return (item as PlaySlot).hourlyRate;
    return (item as RetailItem).priceInr;
  };

  const getDescription = (): string => {
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
    if (category === "play") {
      const p = item as PlaySlot;
      return `${p.surfaceType} surface. Time slot: ${p.slotTime}. Book your sports experience now.`;
    }
    const ri = item as RetailItem;
    return `Category: ${ri.category}. Qty available: ${ri.quantity}.`;
  };

  const getAvailability = (): boolean => {
    if (!item) return false;
    if (category === "food") return (item as FoodItem).isAvailable;
    if (category === "stay") return (item as StayRoom).isAvailable;
    if (category === "play") return !(item as PlaySlot).isBooked;
    return (item as RetailItem).inStock;
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
      category,
    });
  };

  if (!item) {
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
          <StatusBadge
            status={available ? "accepted" : "declined"}
            label={available ? "Available" : "Unavailable"}
          />
        </div>

        {/* Category & price */}
        <div className="flex items-center gap-3 mb-4">
          <CategoryBadge
            category={category as "food" | "stay" | "play" | "retail"}
          />
          <span className="text-lg font-bold" style={{ color: SAFFRON }}>
            ₹{getItemPrice().toString()}
            {category === "stay" && (
              <span className="text-sm font-normal">/night</span>
            )}
            {category === "play" && (
              <span className="text-sm font-normal">/hr</span>
            )}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          {getDescription()}
        </p>

        {/* Food extras */}
        {category === "food" && (
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
          disabled={!available || !owner}
          onClick={handleBookNow}
          data-ocid="item-book-now"
        >
          {available ? "Book Now" : "Currently Unavailable"}
        </AppButton>

        {!available && (
          <p className="text-xs text-muted-foreground text-center mt-2">
            This item is currently not available. Check back later.
          </p>
        )}
      </div>
    </div>
  );
}
