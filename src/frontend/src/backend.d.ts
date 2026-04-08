import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface OwnerRecord {
    id: UserId;
    subscriptionExpiryDate: Timestamp;
    lastSubscriptionTxId: string;
    name: string;
    createdAt: Timestamp;
    role: UserRole;
    businessName: string;
    isActive: boolean;
    lastSubscriptionPaymentDate: Timestamp;
    activityLog: Array<ActivityEntry>;
    subscriptionStatus: SubscriptionStatus;
    isVerified: boolean;
    upiId: string;
    isBanned: boolean;
    category: Category;
    passwordHash: string;
    phone: string;
    locationText: string;
    gpsLat: number;
    gpsLng: number;
}
export interface CategoryEntry {
    id: string;
    name: string;
    isActive: boolean;
    iconEmoji: string;
    searchKeywords: Array<string>;
    tableType: Category;
}
export type Timestamp = bigint;
export type Result_2 = {
    __kind__: "ok";
    ok: Ticket;
} | {
    __kind__: "err";
    err: string;
};
export interface PlaySlot {
    id: string;
    startTime: string;
    endTime: string;
    ownerId: string;
    surfaceType: string;
    bookedByUserId?: string;
    hourlyRate: bigint;
    description: string;
    slotDate: string;
    slotTime: string;
    isBooked: boolean;
}
export type Result_5 = {
    __kind__: "ok";
    ok: OwnerRecord;
} | {
    __kind__: "err";
    err: string;
};
export type Result_1 = {
    __kind__: "ok";
    ok: UserRecord;
} | {
    __kind__: "err";
    err: string;
};
export interface UserRecord {
    id: UserId;
    name: string;
    createdAt: Timestamp;
    role: UserRole;
    activityLog: Array<ActivityEntry>;
    isBanned: boolean;
    passwordHash: string;
    phone: string;
    locationText: string;
    gpsLat: number;
    gpsLng: number;
}
export type Result_4 = {
    __kind__: "ok";
    ok: Booking;
} | {
    __kind__: "err";
    err: string;
};
export interface StayRoom {
    id: string;
    ownerId: string;
    pricePerNight: bigint;
    isAvailable: boolean;
    checkInDate: string;
    amenities: Array<string>;
    checkOutDate: string;
    roomName: string;
    bookedDates: Array<string>;
}
export interface OwnerRevenue {
    ownerId: string;
    businessName: string;
    todayRevenue: bigint;
    totalRevenue: bigint;
}
export interface FoodItem {
    id: string;
    ownerId: string;
    isAvailable: boolean;
    description: string;
    itemName: string;
    isVeg: boolean;
    priceInr: bigint;
}
export type Result_7 = {
    __kind__: "ok";
    ok: RetailItem;
} | {
    __kind__: "err";
    err: string;
};
export interface Booking {
    id: string;
    status: BookingStatus;
    deliveryFee: bigint;
    ownerId: string;
    userId: string;
    createdAt: Timestamp;
    checkInDate: string;
    upiRef: string;
    slotDate: string;
    category: Category;
    checkOutDate: string;
    amountInr: bigint;
    itemRef: string;
}
export type Result_6 = {
    __kind__: "ok";
    ok: StayRoom;
} | {
    __kind__: "err";
    err: string;
};
export type Result_9 = {
    __kind__: "ok";
    ok: FoodItem;
} | {
    __kind__: "err";
    err: string;
};
export type UserId = string;
export type Result = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: string;
};
export type Result_3 = {
    __kind__: "ok";
    ok: Notification;
} | {
    __kind__: "err";
    err: string;
};
export type Result_10 = {
    __kind__: "ok";
    ok: CategoryEntry;
} | {
    __kind__: "err";
    err: string;
};
export interface Notification {
    id: string;
    title: string;
    body: string;
    createdAt: Timestamp;
    soundType: SoundType;
    isRead: boolean;
    target: string;
}
export type Result_8 = {
    __kind__: "ok";
    ok: PlaySlot;
} | {
    __kind__: "err";
    err: string;
};
export interface AdminStats {
    todayBookings: bigint;
    platformRevenue: bigint;
    totalUsers: bigint;
    totalOwners: bigint;
}
export interface RetailItem {
    id: string;
    inStock: boolean;
    ownerId: string;
    deliveryFeePerKm: bigint;
    itemName: string;
    quantity: bigint;
    category: string;
    priceInr: bigint;
}
export interface Ticket {
    id: string;
    status: TicketStatus;
    messages: Array<TicketMessage>;
    ownerId?: string;
    createdAt: Timestamp;
    description: string;
    imageUrl?: string;
    category: string;
    raisedBy: string;
}
export interface ActivityEntry {
    action: string;
    timestamp: Timestamp;
}
export interface TicketMessage {
    text: string;
    sender: string;
    timestamp: Timestamp;
}
export enum BookingStatus {
    pending = "pending",
    completed = "completed",
    accepted = "accepted",
    declined = "declined"
}
export enum Category {
    retail = "retail",
    food = "food",
    play = "play",
    stay = "stay"
}
export enum SoundType {
    alarm = "alarm",
    ping = "ping",
    silent = "silent"
}
export enum SubscriptionStatus {
    active = "active",
    expired = "expired",
    inactive = "inactive"
}
export enum TicketStatus {
    resolved = "resolved",
    open = "open"
}
export enum UserRole {
    admin = "admin",
    owner = "owner",
    user = "user"
}
export interface backendInterface {
    addBookedDate(roomId: string, date: string): Promise<Result>;
    addCategory(name: string, iconEmoji: string, tableType: Category, searchKeywords: Array<string>): Promise<Result_10>;
    addFoodItem(ownerId: string, itemName: string, priceInr: bigint, isVeg: boolean, description: string): Promise<Result_9>;
    addPlaySlot(ownerId: string, slotDate: string, startTime: string, endTime: string, surfaceType: string, hourlyRate: bigint, description: string): Promise<Result_8>;
    addRetailItem(ownerId: string, itemName: string, priceInr: bigint, category: string, quantity: bigint): Promise<Result_7>;
    addStayRoom(ownerId: string, roomName: string, amenities: Array<string>, pricePerNight: bigint): Promise<Result_6>;
    addTicketMessage(ticketId: string, sender: string, text: string): Promise<Result>;
    banUser(id: string, isBanned: boolean): Promise<Result>;
    completeOwnerOnboarding(userId: string, businessName: string, category: Category, upiId: string): Promise<Result_5>;
    createBooking(userId: string, ownerId: string, category: Category, itemRef: string, amountInr: bigint, upiRef: string, checkInDate: string, checkOutDate: string, slotDate: string, deliveryFee: bigint): Promise<Result_4>;
    createNotification(target: string, title: string, body: string, soundType: SoundType): Promise<Result_3>;
    createStayBooking(roomId: string, checkInDate: string, checkOutDate: string): Promise<Result>;
    createTicket(raisedBy: string, ownerId: string | null, category: string, description: string, imageUrl: string | null): Promise<Result_2>;
    deleteCategory(id: string): Promise<Result>;
    deleteFoodItem(id: string): Promise<Result>;
    deleteOwner(id: string): Promise<Result>;
    deleteUser(id: string): Promise<Result>;
    getActiveCategories(): Promise<Array<CategoryEntry>>;
    getActiveOwners(): Promise<Array<OwnerRecord>>;
    getAdminStats(): Promise<AdminStats>;
    getAllBookings(): Promise<Array<Booking>>;
    getAllCategories(): Promise<Array<CategoryEntry>>;
    getAllFoodItems(): Promise<Array<FoodItem>>;
    getAllNotifications(): Promise<Array<Notification>>;
    getAllOwners(): Promise<Array<OwnerRecord>>;
    getAllOwnersAdmin(): Promise<Array<OwnerRecord>>;
    getAllPlaySlots(): Promise<Array<PlaySlot>>;
    getAllRetailItems(): Promise<Array<RetailItem>>;
    getAllStayRooms(): Promise<Array<StayRoom>>;
    getAllTickets(): Promise<Array<Ticket>>;
    getAllUsers(): Promise<Array<UserRecord>>;
    getBookingsByOwner(ownerId: string): Promise<Array<Booking>>;
    getBookingsByUser(userId: string): Promise<Array<Booking>>;
    getDeliveryFee(ownerId: string, customerLat: number, customerLng: number): Promise<bigint>;
    getFoodItemsByOwner(ownerId: string): Promise<Array<FoodItem>>;
    getNotificationsByTarget(target: string): Promise<Array<Notification>>;
    getOwnerById(id: string): Promise<OwnerRecord | null>;
    getOwnersByCategory(category: Category): Promise<Array<OwnerRecord>>;
    getPlaySlotsByOwner(ownerId: string): Promise<Array<PlaySlot>>;
    getRetailItemsByOwner(ownerId: string): Promise<Array<RetailItem>>;
    getRevenueByOwner(): Promise<Array<OwnerRevenue>>;
    getSlotsByDate(ownerId: string, date: string): Promise<Array<PlaySlot>>;
    getStayAvailability(roomId: string, checkInDate: string, checkOutDate: string): Promise<boolean>;
    getStayRoomsByOwner(ownerId: string): Promise<Array<StayRoom>>;
    getTicketsByOwner(ownerId: string): Promise<Array<Ticket>>;
    getTicketsByUser(userId: string): Promise<Array<Ticket>>;
    getUserById(id: string): Promise<UserRecord | null>;
    logActivity(userId: string, action: string): Promise<void>;
    markNotificationRead(id: string): Promise<Result>;
    resolveTicket(id: string): Promise<Result>;
    signinUser(phone: string, password: string): Promise<Result_1>;
    signupUser(name: string, phone: string, password: string, role: UserRole, gpsLat: number, gpsLng: number, locationText: string): Promise<Result_1>;
    toggleSlotBooking(id: string, isBooked: boolean, bookedByUserId: string | null): Promise<Result>;
    updateBookingStatus(id: string, status: BookingStatus): Promise<Result>;
    updateCategory(id: string, name: string, iconEmoji: string, isActive: boolean, searchKeywords: Array<string>): Promise<Result>;
    updateDeliveryFeePerKm(ownerId: string, rate: bigint): Promise<Result>;
    updateFoodItem(id: string, itemName: string, priceInr: bigint, isVeg: boolean, description: string, isAvailable: boolean): Promise<Result>;
    updateOwnerProfile(id: string, businessName: string, upiId: string, isActive: boolean): Promise<Result>;
    updatePlaySlot(id: string, slotTime: string, surfaceType: string, hourlyRate: bigint, description: string): Promise<Result>;
    updateRetailItem(id: string, itemName: string, priceInr: bigint, category: string, inStock: boolean, quantity: bigint): Promise<Result>;
    updateStayRoom(id: string, roomName: string, amenities: Array<string>, pricePerNight: bigint, isAvailable: boolean): Promise<Result>;
    updateSubscriptionStatus(ownerId: string, subscriptionStatus: SubscriptionStatus, expiryDate: Timestamp, txId: string): Promise<Result>;
    updateUserProfile(id: string, name: string, locationText: string, gpsLat: number, gpsLng: number): Promise<Result>;
    verifyOwner(id: string): Promise<Result>;
    verifySubscriptionPayment(ownerId: string, txId: string): Promise<Result>;
}
