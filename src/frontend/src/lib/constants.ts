export const CATEGORY_COLORS = {
  food: "#FF8C42",
  stay: "#4A90E2",
  play: "#7ED321",
  retail: "#9B59B6",
} as const;

export const CATEGORY_EMOJIS = {
  food: "🍔",
  stay: "🏨",
  play: "⚽",
  retail: "🛒",
} as const;

export const CATEGORY_LABELS = {
  food: "Food",
  stay: "Stay",
  play: "Play",
  retail: "Retail",
} as const;

export const CATEGORY_BG_CLASSES = {
  food: "bg-[#FF8C42]",
  stay: "bg-[#4A90E2]",
  play: "bg-[#7ED321]",
  retail: "bg-[#9B59B6]",
} as const;

export const DEFAULT_LOCATION = {
  lat: 11.9416,
  lng: 79.8083,
  text: "Puducherry",
} as const;

export const ADMIN_PHONE = "6381110664";

export const SAFFRON = "#FF6B35";

export const INTENT_KEYWORDS: Record<string, string> = {
  // Food
  biryani: "food",
  food: "food",
  restaurant: "food",
  eat: "food",
  lunch: "food",
  dinner: "food",
  breakfast: "food",
  snack: "food",
  thali: "food",
  dosa: "food",
  idli: "food",
  pizza: "food",
  burger: "food",
  // Play
  cricket: "play",
  turf: "play",
  football: "play",
  badminton: "play",
  sport: "play",
  play: "play",
  game: "play",
  ground: "play",
  court: "play",
  // Stay
  room: "stay",
  hotel: "stay",
  stay: "stay",
  lodge: "stay",
  accommodation: "stay",
  hostel: "stay",
  pg: "stay",
  resort: "stay",
  // Retail
  grocery: "retail",
  medicine: "retail",
  toy: "retail",
  shop: "retail",
  store: "retail",
  buy: "retail",
  purchase: "retail",
  meds: "retail",
  pharmacy: "retail",
  supermarket: "retail",
};

export function detectIntent(query: string): string | null {
  const lower = query.toLowerCase();
  for (const [keyword, category] of Object.entries(INTENT_KEYWORDS)) {
    if (lower.includes(keyword)) return category;
  }
  return null;
}
