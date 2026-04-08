import { useState } from "react";
import { CategoryBadge } from "../../components/ui/AppBadge";
import { AppButton } from "../../components/ui/AppButton";
import { AppCard } from "../../components/ui/AppCard";
import {
  useAllFoodItems,
  useAllPlaySlots,
  useAllRetailItems,
  useAllStayRooms,
} from "../../hooks/useQueries";
import type {
  FoodItem,
  PlaySlot,
  RetailItem,
  StayRoom,
} from "../../hooks/useQueries";
import { getSession } from "../../lib/auth";
import {
  CATEGORY_COLORS,
  CATEGORY_EMOJIS,
  SAFFRON,
  detectIntent,
} from "../../lib/constants";
import type { UserRoute } from "./UserApp";

interface Props {
  navigate: (r: UserRoute) => void;
}

type FeaturedItem =
  | { type: "food"; data: FoodItem }
  | { type: "stay"; data: StayRoom }
  | { type: "play"; data: PlaySlot }
  | { type: "retail"; data: RetailItem };

const CATEGORY_GRADIENTS: Record<string, string> = {
  food: "linear-gradient(135deg, #FF8C42, #FF6B35)",
  stay: "linear-gradient(135deg, #4A90E2, #2563EB)",
  play: "linear-gradient(135deg, #7ED321, #16A34A)",
  retail: "linear-gradient(135deg, #9B59B6, #7C3AED)",
};

const CATEGORIES = [
  {
    key: "food",
    label: "Food",
    emoji: CATEGORY_EMOJIS.food,
    color: CATEGORY_COLORS.food,
  },
  {
    key: "stay",
    label: "Stay",
    emoji: CATEGORY_EMOJIS.stay,
    color: CATEGORY_COLORS.stay,
  },
  {
    key: "play",
    label: "Play",
    emoji: CATEGORY_EMOJIS.play,
    color: CATEGORY_COLORS.play,
  },
  {
    key: "retail",
    label: "Retail",
    emoji: CATEGORY_EMOJIS.retail,
    color: CATEGORY_COLORS.retail,
  },
];

export default function UserHome({ navigate }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const session = getSession();

  const { data: foodItems = [], isLoading: loadingFood } = useAllFoodItems();
  const { data: stayRooms = [], isLoading: loadingStay } = useAllStayRooms();
  const { data: playSlots = [], isLoading: loadingPlay } = useAllPlaySlots();
  const { data: retailItems = [], isLoading: loadingRetail } =
    useAllRetailItems();

  const isLoading = loadingFood || loadingStay || loadingPlay || loadingRetail;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const intent = detectIntent(searchQuery.trim());
    navigate({
      page: "search",
      q: searchQuery.trim(),
      category: intent ?? undefined,
    });
  };

  const handleCategoryClick = (key: string) => {
    navigate({ page: "search", category: key });
  };

  const handleItemClick = (item: FeaturedItem) => {
    if (item.type === "food") {
      navigate({
        page: "item",
        id: item.data.id,
        category: "food",
        ownerId: item.data.ownerId,
      });
    } else if (item.type === "stay") {
      navigate({
        page: "item",
        id: item.data.id,
        category: "stay",
        ownerId: item.data.ownerId,
      });
    } else if (item.type === "play") {
      navigate({
        page: "item",
        id: item.data.id,
        category: "play",
        ownerId: item.data.ownerId,
      });
    } else {
      navigate({
        page: "item",
        id: item.data.id,
        category: "retail",
        ownerId: item.data.ownerId,
      });
    }
  };

  // Build featured list interleaving categories
  const featured: FeaturedItem[] = [];
  for (
    let i = 0;
    i <
    Math.max(
      foodItems.length,
      stayRooms.length,
      playSlots.length,
      retailItems.length,
    );
    i++
  ) {
    if (foodItems[i]) featured.push({ type: "food", data: foodItems[i] });
    if (stayRooms[i]) featured.push({ type: "stay", data: stayRooms[i] });
    if (playSlots[i]) featured.push({ type: "play", data: playSlots[i] });
    if (retailItems[i]) featured.push({ type: "retail", data: retailItems[i] });
  }
  const displayItems = featured.slice(0, 8);

  const getItemName = (item: FeaturedItem) => {
    if (item.type === "food") return item.data.itemName;
    if (item.type === "stay") return item.data.roomName;
    if (item.type === "play")
      return `${item.data.surfaceType} — ${item.data.slotTime}`;
    return item.data.itemName;
  };

  const getItemPrice = (item: FeaturedItem): string => {
    if (item.type === "food") return `₹${item.data.priceInr}`;
    if (item.type === "stay") return `₹${item.data.pricePerNight}/night`;
    if (item.type === "play") return `₹${item.data.hourlyRate}/hr`;
    return `₹${item.data.priceInr}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-30 shadow-subtle">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1
              className="text-xl font-bold font-display"
              style={{ color: "#1A1A2E" }}
            >
              Pondy<span style={{ color: SAFFRON }}>One</span>
            </h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              📍{" "}
              {session?.name
                ? `Hi, ${session.name.split(" ")[0]}`
                : "Puducherry"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate({ page: "account" })}
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold text-white shadow-sm"
            style={{ backgroundColor: SAFFRON }}
            aria-label="Account"
          >
            {session?.name?.[0]?.toUpperCase() ?? "U"}
          </button>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4">
        {/* Hero search */}
        <div
          className="rounded-2xl mt-4 mb-4 px-4 py-5"
          style={{
            background: `linear-gradient(135deg, ${SAFFRON}18, ${SAFFRON}08)`,
          }}
        >
          <p
            className="text-sm font-semibold mb-3"
            style={{ color: "#1A1A2E" }}
          >
            What are you looking for today?
          </p>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="search"
              placeholder="Search for Biryani, Cricket turf, Rooms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-ocid="home-search-input"
              className="flex-1 h-12 px-4 rounded-xl border-2 border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
            />
            <button
              type="submit"
              className="h-12 w-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm transition-smooth hover:opacity-90 active:scale-95"
              style={{ backgroundColor: SAFFRON }}
              aria-label="Search"
              data-ocid="home-search-submit"
            >
              🔍
            </button>
          </form>
        </div>

        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => handleCategoryClick(cat.key)}
              data-ocid={`category-chip-${cat.key}`}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-smooth hover:opacity-90 active:scale-95 shadow-sm"
              style={{ backgroundColor: cat.color }}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Featured listings */}
        <section className="mt-5 mb-4">
          <h2 className="text-base font-bold font-display text-foreground mb-3">
            Featured Listings
          </h2>

          {isLoading ? (
            <div className="grid grid-cols-2 gap-3">
              {(["sk1", "sk2", "sk3", "sk4"] as const).map((id) => (
                <div
                  key={id}
                  className="rounded-2xl bg-muted animate-pulse h-48"
                />
              ))}
            </div>
          ) : displayItems.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-3xl mb-2">🏪</p>
              <p className="text-sm">No listings yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {displayItems.map((item) => (
                <AppCard
                  key={`${item.type}-${item.data.id}`}
                  padded={false}
                  onClick={() => handleItemClick(item)}
                >
                  {/* Gradient hero */}
                  <div
                    className="h-28 rounded-t-2xl flex items-center justify-center text-4xl"
                    style={{ background: CATEGORY_GRADIENTS[item.type] }}
                  >
                    {CATEGORY_EMOJIS[item.type]}
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-semibold text-foreground truncate leading-tight mb-1">
                      {getItemName(item)}
                    </p>
                    <div className="flex items-center justify-between gap-1">
                      <CategoryBadge category={item.type} />
                      <span
                        className="text-xs font-bold"
                        style={{ color: SAFFRON }}
                      >
                        {getItemPrice(item)}
                      </span>
                    </div>
                    <AppButton
                      fullWidth
                      size="sm"
                      className="mt-2 text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleItemClick(item);
                      }}
                      data-ocid={`featured-book-${item.type}-${item.data.id}`}
                    >
                      Book Now
                    </AppButton>
                  </div>
                </AppCard>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
