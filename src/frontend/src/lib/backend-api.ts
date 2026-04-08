// Re-export types from backend.d.ts for convenience
export type {
  UserRecord,
  OwnerRecord,
  FoodItem,
  StayRoom,
  PlaySlot,
  RetailItem,
  Booking,
  Ticket,
  TicketMessage,
  CategoryEntry,
  Notification,
  AdminStats,
  OwnerRevenue,
  ActivityEntry,
  backendInterface,
} from "../backend.d";

export {
  BookingStatus,
  Category,
  SoundType,
  TicketStatus,
  UserRole,
} from "../backend.d";

// Re-export createActor for use with useActor hook from @caffeineai/core-infrastructure
export { createActor } from "../backend";
