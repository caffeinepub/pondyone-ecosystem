import { createActorWithConfig } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  AdminStats,
  Booking,
  CategoryEntry,
  FoodItem,
  Notification,
  OwnerRecord,
  OwnerRevenue,
  PlaySlot,
  RetailItem,
  StayRoom,
  Ticket,
  UserRecord,
} from "../backend.d";
import {
  BookingStatus,
  Category,
  SoundType,
  TicketStatus,
  UserRole,
} from "../backend.d";

export type {
  UserRecord,
  OwnerRecord,
  FoodItem,
  StayRoom,
  PlaySlot,
  RetailItem,
  Booking,
  Ticket,
  CategoryEntry,
  Notification,
  AdminStats,
  OwnerRevenue,
};
export { BookingStatus, Category, SoundType, UserRole, TicketStatus };

// ─── Actor hook (anonymous — no Internet Identity required) ────────────────
function useBackend() {
  const actorQuery = useQuery({
    queryKey: ["actor-anon"],
    queryFn: () => createActorWithConfig(createActor),
    staleTime: Number.POSITIVE_INFINITY,
  });
  return {
    actor: actorQuery.data ?? null,
    isFetching: actorQuery.isFetching && !actorQuery.data,
  };
}

// ─── Auth ───────────────────────────────────────────────────────────────────
export function useSignin() {
  const { actor, isFetching } = useBackend();
  return {
    ...useMutation({
      mutationFn: ({
        phone,
        password,
      }: { phone: string; password: string }) => {
        if (!actor) throw new Error("Backend not ready");
        return actor.signinUser(phone, password);
      },
    }),
    isBackendReady: !!actor && !isFetching,
  };
}

export function useSignup() {
  const { actor, isFetching } = useBackend();
  return {
    ...useMutation({
      mutationFn: ({
        name,
        phone,
        password,
        role,
        gpsLat,
        gpsLng,
        locationText,
      }: {
        name: string;
        phone: string;
        password: string;
        role: UserRole;
        gpsLat: number;
        gpsLng: number;
        locationText: string;
      }) => {
        if (!actor) throw new Error("Backend not ready");
        return actor.signupUser(
          name,
          phone,
          password,
          role,
          gpsLat,
          gpsLng,
          locationText,
        );
      },
    }),
    isBackendReady: !!actor && !isFetching,
  };
}

// ─── Users ──────────────────────────────────────────────────────────────────
export function useGetUserById(id: string) {
  const { actor, isFetching } = useBackend();
  return useQuery<UserRecord | null>({
    queryKey: ["user", id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getUserById(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useAllUsers() {
  const { actor, isFetching } = useBackend();
  return useQuery<UserRecord[]>({
    queryKey: ["users"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllUsers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBanUser() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isBanned }: { id: string; isBanned: boolean }) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.banUser(id, isBanned);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
}

// ─── Owners ─────────────────────────────────────────────────────────────────
export function useGetOwnerById(id: string) {
  const { actor, isFetching } = useBackend();
  return useQuery<OwnerRecord | null>({
    queryKey: ["owner", id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getOwnerById(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useAllOwners() {
  const { actor, isFetching } = useBackend();
  return useQuery<OwnerRecord[]>({
    queryKey: ["owners"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllOwners();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useOwnersByCategory(category: Category) {
  const { actor, isFetching } = useBackend();
  return useQuery<OwnerRecord[]>({
    queryKey: ["owners", "category", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getOwnersByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCompleteOwnerOnboarding() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      businessName,
      category,
      upiId,
    }: {
      userId: string;
      businessName: string;
      category: Category;
      upiId: string;
    }) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.completeOwnerOnboarding(
        userId,
        businessName,
        category,
        upiId,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["owners"] }),
  });
}

export function useVerifyOwner() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.verifyOwner(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["owners"] }),
  });
}

// ─── Food ────────────────────────────────────────────────────────────────────
export function useFoodItemsByOwner(ownerId: string) {
  const { actor, isFetching } = useBackend();
  return useQuery<FoodItem[]>({
    queryKey: ["food", ownerId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFoodItemsByOwner(ownerId);
    },
    enabled: !!actor && !isFetching && !!ownerId,
  });
}

export function useAllFoodItems() {
  const { actor, isFetching } = useBackend();
  return useQuery<FoodItem[]>({
    queryKey: ["food", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllFoodItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddFoodItem() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: {
      ownerId: string;
      itemName: string;
      priceInr: bigint;
      isVeg: boolean;
      description: string;
    }) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.addFoodItem(
        args.ownerId,
        args.itemName,
        args.priceInr,
        args.isVeg,
        args.description,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["food"] }),
  });
}

export function useUpdateFoodItem() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: {
      id: string;
      itemName: string;
      priceInr: bigint;
      isVeg: boolean;
      description: string;
      isAvailable: boolean;
    }) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.updateFoodItem(
        args.id,
        args.itemName,
        args.priceInr,
        args.isVeg,
        args.description,
        args.isAvailable,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["food"] }),
  });
}

export function useDeleteFoodItem() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.deleteFoodItem(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["food"] }),
  });
}

// ─── Stay ────────────────────────────────────────────────────────────────────
export function useStayRoomsByOwner(ownerId: string) {
  const { actor, isFetching } = useBackend();
  return useQuery<StayRoom[]>({
    queryKey: ["stay", ownerId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getStayRoomsByOwner(ownerId);
    },
    enabled: !!actor && !isFetching && !!ownerId,
  });
}

export function useAllStayRooms() {
  const { actor, isFetching } = useBackend();
  return useQuery<StayRoom[]>({
    queryKey: ["stay", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllStayRooms();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddStayRoom() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: {
      ownerId: string;
      roomName: string;
      amenities: string[];
      pricePerNight: bigint;
    }) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.addStayRoom(
        args.ownerId,
        args.roomName,
        args.amenities,
        args.pricePerNight,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["stay"] }),
  });
}

export function useUpdateStayRoom() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: {
      id: string;
      roomName: string;
      amenities: string[];
      pricePerNight: bigint;
      isAvailable: boolean;
    }) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.updateStayRoom(
        args.id,
        args.roomName,
        args.amenities,
        args.pricePerNight,
        args.isAvailable,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["stay"] }),
  });
}

// ─── Play ────────────────────────────────────────────────────────────────────
export function usePlaySlotsByOwner(ownerId: string) {
  const { actor, isFetching } = useBackend();
  return useQuery<PlaySlot[]>({
    queryKey: ["play", ownerId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPlaySlotsByOwner(ownerId);
    },
    enabled: !!actor && !isFetching && !!ownerId,
  });
}

export function useAllPlaySlots() {
  const { actor, isFetching } = useBackend();
  return useQuery<PlaySlot[]>({
    queryKey: ["play", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPlaySlots();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddPlaySlot() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: {
      ownerId: string;
      slotTime: string;
      surfaceType: string;
      hourlyRate: bigint;
      description: string;
    }) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.addPlaySlot(
        args.ownerId,
        args.slotTime,
        args.surfaceType,
        args.hourlyRate,
        args.description,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["play"] }),
  });
}

export function useUpdatePlaySlot() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: {
      id: string;
      slotTime: string;
      surfaceType: string;
      hourlyRate: bigint;
      description: string;
    }) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.updatePlaySlot(
        args.id,
        args.slotTime,
        args.surfaceType,
        args.hourlyRate,
        args.description,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["play"] }),
  });
}

export function useToggleSlotBooking() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: {
      id: string;
      isBooked: boolean;
      bookedByUserId: string | null;
    }) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.toggleSlotBooking(
        args.id,
        args.isBooked,
        args.bookedByUserId,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["play"] }),
  });
}

// ─── Retail ──────────────────────────────────────────────────────────────────
export function useRetailItemsByOwner(ownerId: string) {
  const { actor, isFetching } = useBackend();
  return useQuery<RetailItem[]>({
    queryKey: ["retail", ownerId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRetailItemsByOwner(ownerId);
    },
    enabled: !!actor && !isFetching && !!ownerId,
  });
}

export function useAllRetailItems() {
  const { actor, isFetching } = useBackend();
  return useQuery<RetailItem[]>({
    queryKey: ["retail", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRetailItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddRetailItem() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: {
      ownerId: string;
      itemName: string;
      priceInr: bigint;
      category: string;
      quantity: bigint;
    }) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.addRetailItem(
        args.ownerId,
        args.itemName,
        args.priceInr,
        args.category,
        args.quantity,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["retail"] }),
  });
}

export function useUpdateRetailItem() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: {
      id: string;
      itemName: string;
      priceInr: bigint;
      category: string;
      inStock: boolean;
      quantity: bigint;
    }) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.updateRetailItem(
        args.id,
        args.itemName,
        args.priceInr,
        args.category,
        args.inStock,
        args.quantity,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["retail"] }),
  });
}

// ─── Bookings ────────────────────────────────────────────────────────────────
export function useBookingsByUser(userId: string) {
  const { actor, isFetching } = useBackend();
  return useQuery<Booking[]>({
    queryKey: ["bookings", "user", userId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBookingsByUser(userId);
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

export function useBookingsByOwner(ownerId: string) {
  const { actor, isFetching } = useBackend();
  return useQuery<Booking[]>({
    queryKey: ["bookings", "owner", ownerId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBookingsByOwner(ownerId);
    },
    enabled: !!actor && !isFetching && !!ownerId,
    refetchInterval: 5000,
  });
}

export function useAllBookings() {
  const { actor, isFetching } = useBackend();
  return useQuery<Booking[]>({
    queryKey: ["bookings", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBookings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateBooking() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: {
      userId: string;
      ownerId: string;
      category: Category;
      itemRef: string;
      amountInr: bigint;
      upiRef: string;
    }) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.createBooking(
        args.userId,
        args.ownerId,
        args.category,
        args.itemRef,
        args.amountInr,
        args.upiRef,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bookings"] }),
  });
}

export function useUpdateBookingStatus() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: BookingStatus }) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.updateBookingStatus(id, status);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bookings"] }),
  });
}

// ─── Tickets ─────────────────────────────────────────────────────────────────
export function useTicketsByUser(userId: string) {
  const { actor, isFetching } = useBackend();
  return useQuery<Ticket[]>({
    queryKey: ["tickets", "user", userId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTicketsByUser(userId);
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

export function useTicketsByOwner(ownerId: string) {
  const { actor, isFetching } = useBackend();
  return useQuery<Ticket[]>({
    queryKey: ["tickets", "owner", ownerId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTicketsByOwner(ownerId);
    },
    enabled: !!actor && !isFetching && !!ownerId,
  });
}

export function useAllTickets() {
  const { actor, isFetching } = useBackend();
  return useQuery<Ticket[]>({
    queryKey: ["tickets", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTickets();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateTicket() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: {
      raisedBy: string;
      ownerId: string | null;
      category: string;
      description: string;
      imageUrl: string | null;
    }) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.createTicket(
        args.raisedBy,
        args.ownerId,
        args.category,
        args.description,
        args.imageUrl,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tickets"] }),
  });
}

export function useAddTicketMessage() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      ticketId,
      sender,
      text,
    }: { ticketId: string; sender: string; text: string }) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.addTicketMessage(ticketId, sender, text);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tickets"] }),
  });
}

export function useResolveTicket() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.resolveTicket(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tickets"] }),
  });
}

// ─── Categories ──────────────────────────────────────────────────────────────
export function useActiveCategories() {
  const { actor, isFetching } = useBackend();
  return useQuery<CategoryEntry[]>({
    queryKey: ["categories", "active"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getActiveCategories();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllCategories() {
  const { actor, isFetching } = useBackend();
  return useQuery<CategoryEntry[]>({
    queryKey: ["categories", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCategories();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddCategory() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: {
      name: string;
      iconEmoji: string;
      tableType: Category;
      searchKeywords: string[];
    }) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.addCategory(
        args.name,
        args.iconEmoji,
        args.tableType,
        args.searchKeywords,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] }),
  });
}

export function useUpdateCategory() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: {
      id: string;
      name: string;
      iconEmoji: string;
      isActive: boolean;
      searchKeywords: string[];
    }) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.updateCategory(
        args.id,
        args.name,
        args.iconEmoji,
        args.isActive,
        args.searchKeywords,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] }),
  });
}

export function useDeleteCategory() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.deleteCategory(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] }),
  });
}

// ─── Notifications ───────────────────────────────────────────────────────────
export function useNotificationsByTarget(target: string) {
  const { actor, isFetching } = useBackend();
  return useQuery<Notification[]>({
    queryKey: ["notifications", target],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNotificationsByTarget(target);
    },
    enabled: !!actor && !isFetching && !!target,
    refetchInterval: 10000,
  });
}

export function useAllNotifications() {
  const { actor, isFetching } = useBackend();
  return useQuery<Notification[]>({
    queryKey: ["notifications", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllNotifications();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateNotification() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: {
      target: string;
      title: string;
      body: string;
      soundType: SoundType;
    }) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.createNotification(
        args.target,
        args.title,
        args.body,
        args.soundType,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });
}

export function useMarkNotificationRead() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.markNotificationRead(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });
}

// ─── Admin ───────────────────────────────────────────────────────────────────
export function useAdminStats() {
  const { actor, isFetching } = useBackend();
  return useQuery<AdminStats>({
    queryKey: ["admin", "stats"],
    queryFn: async () => {
      if (!actor)
        return {
          todayBookings: 0n,
          platformRevenue: 0n,
          totalUsers: 0n,
          totalOwners: 0n,
        };
      return actor.getAdminStats();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRevenueByOwner() {
  const { actor, isFetching } = useBackend();
  return useQuery<OwnerRevenue[]>({
    queryKey: ["admin", "revenue"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRevenueByOwner();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useLogActivity() {
  const { actor } = useBackend();
  return useMutation({
    mutationFn: ({ userId, action }: { userId: string; action: string }) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.logActivity(userId, action);
    },
  });
}

export function useUpdateUserProfile() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: {
      id: string;
      name: string;
      locationText: string;
      gpsLat: number;
      gpsLng: number;
    }) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.updateUserProfile(
        args.id,
        args.name,
        args.locationText,
        args.gpsLat,
        args.gpsLng,
      );
    },
    onSuccess: (_, vars) =>
      qc.invalidateQueries({ queryKey: ["user", vars.id] }),
  });
}

export function useUpdateOwnerProfile() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: {
      id: string;
      businessName: string;
      upiId: string;
      isActive: boolean;
    }) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.updateOwnerProfile(
        args.id,
        args.businessName,
        args.upiId,
        args.isActive,
      );
    },
    onSuccess: (_, vars) =>
      qc.invalidateQueries({ queryKey: ["owner", vars.id] }),
  });
}

export function useAddBookedDate() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ roomId, date }: { roomId: string; date: string }) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.addBookedDate(roomId, date);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["stay"] }),
  });
}
