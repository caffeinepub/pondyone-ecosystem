import { useMemo, useState } from "react";
import { CategoryBadge } from "../../components/ui/AppBadge";
import { AppButton } from "../../components/ui/AppButton";
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
import { CATEGORY_EMOJIS, SAFFRON, detectIntent } from "../../lib/constants";
import type { UserRoute } from "./UserApp";

interface Props {
  navigate: (r: UserRoute) => void;
  q?: string;
  category?: string;
}

type ResultItem =
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

const FILTER_TABS = [
  { key: "all", label: "All" },
  { key: "food", label: "🍔 Food" },
  { key: "stay", label: "🏨 Stay" },
  { key: "play", label: "⚽ Play" },
  { key: "retail", label: "🛒 Retail" },
];

export default function UserSearch({ navigate, q, category }: Props) {
  const [searchInput, setSearchInput] = useState(q ?? "");
  const [activeCategory, setActiveCategory] = useState<string>(
    category ?? "all",
  );

  const { data: foodItems = [] } = useAllFoodItems();
  const { data: stayRooms = [] } = useAllStayRooms();
  const { data: playSlots = [] } = useAllPlaySlots();
  const { data: retailItems = [] } = useAllRetailItems();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const intent = detectIntent(searchInput.trim());
    if (intent) setActiveCategory(intent);
    else setActiveCategory("all");
  };

  const allItems: ResultItem[] = useMemo(() => {
    const items: ResultItem[] = [];
    for (const d of foodItems) items.push({ type: "food", data: d });
    for (const d of stayRooms) items.push({ type: "stay", data: d });
    for (const d of playSlots) items.push({ type: "play", data: d });
    for (const d of retailItems) items.push({ type: "retail", data: d });
    return items;
  }, [foodItems, stayRooms, playSlots, retailItems]);

  const filtered = useMemo(() => {
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

  function getItemName(item: ResultItem): string {
    if (item.type === "food") return item.data.itemName;
    if (item.type === "stay") return item.data.roomName;
    if (item.type === "play")
      return `${item.data.surfaceType} · ${item.data.slotTime}`;
    return item.data.itemName;
  }

  function getItemPrice(item: ResultItem): string {
    if (item.type === "food") return `₹${item.data.priceInr}`;
    if (item.type === "stay") return `₹${item.data.pricePerNight}/night`;
    if (item.type === "play") return `₹${item.data.hourlyRate}/hr`;
    return `₹${item.data.priceInr}`;
  }

  function handleBookNow(item: ResultItem) {
    navigate({
      page: "item",
      id: item.data.id,
      category: item.type,
      ownerId: item.data.ownerId,
    });
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-30 shadow-subtle">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate({ page: "home" })}
              className="p-2 rounded-xl hover:bg-muted transition-colors text-lg"
              aria-label="Back"
            >
              ←
            </button>
            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
              <input
                type="search"
                placeholder="Search listings…"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                data-ocid="search-input"
                className="flex-1 h-10 px-3 rounded-xl border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
              />
              <button
                type="submit"
                className="h-10 w-10 rounded-xl flex items-center justify-center text-white text-sm"
                style={{ backgroundColor: SAFFRON }}
                aria-label="Search"
              >
                🔍
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4">
        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide -mx-4 px-4">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveCategory(tab.key)}
              data-ocid={`search-filter-${tab.key}`}
              className="px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap shrink-0 transition-smooth border"
              style={
                activeCategory === tab.key
                  ? {
                      backgroundColor: SAFFRON,
                      color: "#fff",
                      borderColor: SAFFRON,
                    }
                  : {
                      backgroundColor: "transparent",
                      borderColor: "#e5e7eb",
                      color: "#6b7280",
                    }
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-xs text-muted-foreground mb-3">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          {activeCategory !== "all" ? ` in ${activeCategory}` : ""}
        </p>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-semibold text-foreground">No results found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Try a different search or browse a category above.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 pb-4">
            {filtered.map((item, idx) => (
              <div
                key={item.data.id}
                className="bg-card rounded-2xl shadow-card border border-border overflow-hidden"
                data-ocid={`search-result-${idx}`}
              >
                {/* Gradient hero */}
                <div
                  className="h-32 flex items-center justify-center text-5xl"
                  style={{ background: CATEGORY_GRADIENTS[item.type] }}
                >
                  {CATEGORY_EMOJIS[item.type]}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-foreground truncate">
                        {getItemName(item)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        📍 ~2 km away
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p
                        className="font-bold text-sm"
                        style={{ color: SAFFRON }}
                      >
                        {getItemPrice(item)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <CategoryBadge category={item.type} />
                    <AppButton
                      size="sm"
                      onClick={() => handleBookNow(item)}
                      data-ocid={`search-book-${idx}`}
                    >
                      Book Now
                    </AppButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
