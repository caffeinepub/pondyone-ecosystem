import { CategoryBadge, StatusBadge } from "@/components/ui/AppBadge";
import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppModal } from "@/components/ui/AppModal";
import {
  BookingStatus,
  Category,
  type FoodItem,
  type PlaySlot,
  type RetailItem,
  type StayRoom,
  useAddFoodItem,
  useAddPlaySlot,
  useAddRetailItem,
  useAddStayRoom,
  useBookingsByOwner,
  useFoodItemsByOwner,
  useGetOwnerById,
  usePlaySlotsByOwner,
  useRetailItemsByOwner,
  useStayRoomsByOwner,
  useToggleSlotBooking,
  useUpdateFoodItem,
  useUpdatePlaySlot,
  useUpdateRetailItem,
  useUpdateStayRoom,
} from "@/hooks/useQueries";
import { getSession } from "@/lib/auth";
import { CATEGORY_COLORS, SAFFRON } from "@/lib/constants";
import { useState } from "react";
import { toast } from "sonner";

// ─── Food Dashboard ───────────────────────────────────────────────────────────

function FoodDashboard({ ownerId }: { ownerId: string }) {
  const { data: items = [], isLoading } = useFoodItemsByOwner(ownerId);
  const { data: bookings = [] } = useBookingsByOwner(ownerId);
  const updateFood = useUpdateFoodItem();
  const addFood = useAddFoodItem();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editItem, setEditItem] = useState<FoodItem | null>(null);

  // Add form state
  const [fname, setFname] = useState("");
  const [fprice, setFprice] = useState("");
  const [fveg, setFveg] = useState(false);
  const [fdesc, setFdesc] = useState("");

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
      description: fdesc,
    });
    resetForm();
    setShowAddModal(false);
  }

  async function handleEdit() {
    if (!editItem) return;
    await updateFood.mutateAsync({ ...editItem, priceInr: editItem.priceInr });
    setEditItem(null);
  }

  async function toggleAvailability(item: FoodItem) {
    await updateFood.mutateAsync({ ...item, isAvailable: !item.isAvailable });
  }

  const recentOrders = bookings.filter(
    (b) =>
      b.status === BookingStatus.pending || b.status === BookingStatus.accepted,
  );

  return (
    <div className="space-y-6">
      {/* Menu items */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold font-display text-foreground">
            🍽️ Menu Items
          </h2>
          <AppButton
            size="sm"
            onClick={() => setShowAddModal(true)}
            data-ocid="add-food-item"
          >
            + Add Item
          </AppButton>
        </div>
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-16 rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <AppCard>
            <p className="text-sm text-muted-foreground text-center py-4">
              No menu items yet. Add your first dish!
            </p>
          </AppCard>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <AppCard key={item.id} padded={false}>
                <div className="flex items-center gap-3 p-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{
                      backgroundColor: `${CATEGORY_COLORS.food}20`,
                      color: CATEGORY_COLORS.food,
                    }}
                  >
                    {item.isVeg ? "🌿" : "🍗"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {item.itemName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ₹{item.priceInr.toString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => setEditItem({ ...item })}
                      className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded-lg hover:bg-muted transition-colors"
                      aria-label="Edit item"
                    >
                      ✏️
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleAvailability(item)}
                      className="w-10 h-5 rounded-full transition-colors focus-visible:outline-none"
                      style={{
                        backgroundColor: item.isAvailable
                          ? "#22C55E"
                          : "#d1d5db",
                      }}
                      aria-label={
                        item.isAvailable ? "Mark unavailable" : "Mark available"
                      }
                    >
                      <span
                        className="block w-4 h-4 rounded-full bg-white shadow transition-transform mx-0.5"
                        style={{
                          transform: item.isAvailable
                            ? "translateX(20px)"
                            : "translateX(0)",
                        }}
                      />
                    </button>
                  </div>
                </div>
              </AppCard>
            ))}
          </div>
        )}
      </div>

      {/* Recent orders */}
      <div>
        <h2 className="text-base font-bold font-display text-foreground mb-3">
          📦 Recent Orders
        </h2>
        {recentOrders.length === 0 ? (
          <AppCard>
            <p className="text-sm text-muted-foreground text-center py-4">
              No active orders right now
            </p>
          </AppCard>
        ) : (
          <div className="space-y-2">
            {recentOrders.map((order) => (
              <AppCard key={order.id}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {order.itemRef}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ₹{order.amountInr.toString()}
                    </p>
                  </div>
                  <StatusBadge
                    status={order.status as "pending" | "accepted"}
                  />
                </div>
              </AppCard>
            ))}
          </div>
        )}
      </div>

      {/* Add modal */}
      <AppModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Menu Item"
      >
        <div className="space-y-3">
          <div>
            <label
              htmlFor="modal-food-name"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Item Name
            </label>
            <input
              id="modal-food-name"
              type="text"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              placeholder="e.g. Chicken Biryani"
              className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label
              htmlFor="modal-food-price"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Price (₹)
            </label>
            <input
              id="modal-food-price"
              type="number"
              value={fprice}
              onChange={(e) => setFprice(e.target.value)}
              min="1"
              className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label
              htmlFor="modal-food-desc"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Description
            </label>
            <textarea
              id="modal-food-desc"
              value={fdesc}
              onChange={(e) => setFdesc(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-sm text-foreground">Vegetarian</span>
            <button
              type="button"
              onClick={() => setFveg((v) => !v)}
              className="w-10 h-5 rounded-full transition-colors"
              style={{ backgroundColor: fveg ? "#22C55E" : "#d1d5db" }}
              aria-label="Toggle vegetarian"
            >
              <span
                className="block w-4 h-4 rounded-full bg-white shadow mx-0.5 transition-transform"
                style={{
                  transform: fveg ? "translateX(20px)" : "translateX(0)",
                }}
              />
            </button>
          </div>
          <AppButton fullWidth onClick={handleAdd} disabled={!fname || !fprice}>
            Save Item
          </AppButton>
        </div>
      </AppModal>

      {/* Edit modal */}
      {editItem && (
        <AppModal
          isOpen={!!editItem}
          onClose={() => setEditItem(null)}
          title="Edit Item"
        >
          <div className="space-y-3">
            <div>
              <label
                htmlFor="edit-food-name"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Item Name
              </label>
              <input
                id="edit-food-name"
                type="text"
                value={editItem.itemName}
                onChange={(e) =>
                  setEditItem({ ...editItem, itemName: e.target.value })
                }
                className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label
                htmlFor="edit-food-price"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Price (₹)
              </label>
              <input
                id="edit-food-price"
                type="number"
                value={editItem.priceInr.toString()}
                onChange={(e) =>
                  setEditItem({
                    ...editItem,
                    priceInr: BigInt(e.target.value || "0"),
                  })
                }
                className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label
                htmlFor="edit-food-desc"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Description
              </label>
              <textarea
                id="edit-food-desc"
                value={editItem.description}
                onChange={(e) =>
                  setEditItem({ ...editItem, description: e.target.value })
                }
                rows={2}
                className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
            <AppButton fullWidth onClick={handleEdit}>
              Update Item
            </AppButton>
          </div>
        </AppModal>
      )}
    </div>
  );
}

// ─── Turf Dashboard ───────────────────────────────────────────────────────────

function TurfDashboard({ ownerId }: { ownerId: string }) {
  const { data: slots = [], isLoading } = usePlaySlotsByOwner(ownerId);
  const addSlot = useAddPlaySlot();
  const updateSlot = useUpdatePlaySlot();
  const toggleBooking = useToggleSlotBooking();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editSlot, setEditSlot] = useState<PlaySlot | null>(null);
  const [slotTime, setSlotTime] = useState("6:00 AM");
  const [surfaceType, setSurfaceType] = useState("Natural Grass");
  const [hourlyRate, setHourlyRate] = useState("500");
  const [slotDesc, setSlotDesc] = useState("");

  async function handleAddSlot() {
    await addSlot.mutateAsync({
      ownerId,
      slotTime,
      surfaceType,
      hourlyRate: BigInt(hourlyRate || "0"),
      description: slotDesc,
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
      description: editSlot.description,
    });
    toast.success("Slot updated successfully");
    setEditSlot(null);
  }

  async function handleToggle(slot: PlaySlot) {
    if (slot.isBooked) {
      const confirmed = window.confirm(`Unbook slot ${slot.slotTime}?`);
      if (!confirmed) return;
      await toggleBooking.mutateAsync({
        id: slot.id,
        isBooked: false,
        bookedByUserId: null,
      });
    } else {
      await toggleBooking.mutateAsync({
        id: slot.id,
        isBooked: true,
        bookedByUserId: ownerId,
      });
    }
  }

  const HOUR_LABELS = Array.from({ length: 18 }, (_, i) => {
    const h = i + 6;
    const suf = h < 12 ? "AM" : "PM";
    const h12 = h > 12 ? h - 12 : h;
    return `${h12}:00 ${suf}`;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold font-display text-foreground">
          ⚽ Time Slots
        </h2>
        <AppButton
          size="sm"
          onClick={() => setShowAddModal(true)}
          data-ocid="add-play-slot"
        >
          + Add Slot
        </AppButton>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 9 }, (_, i) => i).map((i) => (
            <div
              key={`skel-${i}`}
              className="h-14 rounded-xl bg-muted animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {HOUR_LABELS.map((label) => {
            const slot = slots.find((s) => s.slotTime === label);
            if (!slot) {
              return (
                <div
                  key={`empty-${label}`}
                  className="rounded-xl bg-muted/30 border border-dashed border-border p-2 text-center"
                >
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-[10px] text-muted-foreground/60">—</p>
                </div>
              );
            }
            return (
              <div
                key={slot.id}
                className="rounded-xl p-2 text-center border-2 relative"
                style={{
                  backgroundColor: slot.isBooked ? "#FEE2E2" : "#DCFCE7",
                  borderColor: slot.isBooked ? "#EF4444" : "#22C55E",
                }}
              >
                <button
                  type="button"
                  onClick={() => handleToggle(slot)}
                  data-ocid={`slot-${slot.id}`}
                  className="w-full focus-visible:outline-none"
                >
                  <p
                    className="text-xs font-semibold"
                    style={{ color: slot.isBooked ? "#EF4444" : "#16A34A" }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-[10px]"
                    style={{ color: slot.isBooked ? "#EF4444" : "#16A34A" }}
                  >
                    {slot.isBooked ? "Booked" : "Free"}
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => setEditSlot({ ...slot })}
                  aria-label="Edit slot"
                  className="absolute top-1 right-1 text-[10px] leading-none p-0.5 rounded hover:bg-black/10 transition-colors opacity-60 hover:opacity-100"
                >
                  ✏️
                </button>
              </div>
            );
          })}
        </div>
      )}

      {slots.length > 0 && (
        <AppCard>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "#22C55E" }}
              />
              Available
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "#EF4444" }}
              />
              Booked
            </span>
          </div>
        </AppCard>
      )}

      {/* Add Slot Modal */}
      <AppModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Time Slot"
      >
        <div className="space-y-3">
          <div>
            <label
              htmlFor="slot-time-sel"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Slot Time
            </label>
            <select
              id="slot-time-sel"
              value={slotTime}
              onChange={(e) => setSlotTime(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {HOUR_LABELS.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="surface-sel"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Surface Type
            </label>
            <select
              id="surface-sel"
              value={surfaceType}
              onChange={(e) => setSurfaceType(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>Natural Grass</option>
              <option>Artificial Turf</option>
              <option>Concrete</option>
              <option>Wooden Court</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="hourly-rate-inp"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Hourly Rate (₹)
            </label>
            <input
              id="hourly-rate-inp"
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              min="1"
              className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label
              htmlFor="slot-desc-inp"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Description
            </label>
            <textarea
              id="slot-desc-inp"
              value={slotDesc}
              onChange={(e) => setSlotDesc(e.target.value)}
              rows={2}
              placeholder="e.g. Best turf for cricket in Pondicherry"
              className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
          <AppButton fullWidth onClick={handleAddSlot}>
            Add Slot
          </AppButton>
        </div>
      </AppModal>

      {/* Edit Slot Modal */}
      {editSlot && (
        <AppModal
          isOpen={!!editSlot}
          onClose={() => setEditSlot(null)}
          title="Edit Slot"
        >
          <div className="space-y-3">
            <div>
              <label
                htmlFor="edit-slot-time"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Slot Time
              </label>
              <select
                id="edit-slot-time"
                value={editSlot.slotTime}
                onChange={(e) =>
                  setEditSlot({ ...editSlot, slotTime: e.target.value })
                }
                className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {HOUR_LABELS.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="edit-slot-surface"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Surface Type
              </label>
              <select
                id="edit-slot-surface"
                value={editSlot.surfaceType}
                onChange={(e) =>
                  setEditSlot({ ...editSlot, surfaceType: e.target.value })
                }
                className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Natural Grass</option>
                <option>Artificial Turf</option>
                <option>Concrete</option>
                <option>Wooden Court</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="edit-slot-rate"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Hourly Rate (₹)
              </label>
              <input
                id="edit-slot-rate"
                type="number"
                value={editSlot.hourlyRate.toString()}
                onChange={(e) =>
                  setEditSlot({
                    ...editSlot,
                    hourlyRate: BigInt(e.target.value || "0"),
                  })
                }
                className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label
                htmlFor="edit-slot-desc"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Description
              </label>
              <textarea
                id="edit-slot-desc"
                value={editSlot.description}
                onChange={(e) =>
                  setEditSlot({ ...editSlot, description: e.target.value })
                }
                rows={2}
                className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
            <AppButton
              fullWidth
              onClick={handleEditSlot}
              disabled={updateSlot.isPending}
            >
              {updateSlot.isPending ? "Saving…" : "Update Slot"}
            </AppButton>
          </div>
        </AppModal>
      )}
    </div>
  );
}

// ─── Stay Dashboard ───────────────────────────────────────────────────────────

function StayDashboard({ ownerId }: { ownerId: string }) {
  const { data: rooms = [], isLoading } = useStayRoomsByOwner(ownerId);
  const addRoom = useAddStayRoom();
  const updateRoom = useUpdateStayRoom();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editRoom, setEditRoom] = useState<StayRoom | null>(null);
  const [roomName, setRoomName] = useState("");
  const [amenities, setAmenities] = useState("AC, WiFi, TV");
  const [pricePerNight, setPricePerNight] = useState("1500");

  // Edit form state (derived from editRoom)
  const [editRoomName, setEditRoomName] = useState("");
  const [editAmenities, setEditAmenities] = useState("");
  const [editPrice, setEditPrice] = useState("");

  function openEdit(room: StayRoom) {
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
      amenities: amenities
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean),
      pricePerNight: BigInt(pricePerNight || "0"),
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
      amenities: editAmenities
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean),
      pricePerNight: BigInt(editPrice || "0"),
      isAvailable: editRoom.isAvailable,
    });
    toast.success("Room updated successfully");
    setEditRoom(null);
  }

  async function toggleAvailable(room: StayRoom) {
    await updateRoom.mutateAsync({ ...room, isAvailable: !room.isAvailable });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-base font-bold font-display text-foreground">
          🏨 Rooms
        </h2>
        <AppButton
          size="sm"
          onClick={() => setShowAddModal(true)}
          data-ocid="add-stay-room"
        >
          + Add Room
        </AppButton>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-3">
          {[1, 2].map((n) => (
            <div key={n} className="h-36 rounded-2xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : rooms.length === 0 ? (
        <AppCard>
          <p className="text-sm text-muted-foreground text-center py-4">
            No rooms added yet
          </p>
        </AppCard>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {rooms.map((room) => (
            <AppCard key={room.id} padded={false}>
              <div className="p-3 space-y-2">
                <div className="flex items-start justify-between">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${CATEGORY_COLORS.stay}20` }}
                  >
                    <span className="text-lg">🏨</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => openEdit(room)}
                    aria-label="Edit room"
                    data-ocid={`edit-room-${room.id}`}
                    className="text-sm text-muted-foreground hover:text-foreground px-1.5 py-1 rounded-lg hover:bg-muted transition-colors"
                  >
                    ✏️
                  </button>
                </div>
                <p className="text-sm font-semibold text-foreground truncate">
                  {room.roomName}
                </p>
                <p className="text-xs text-muted-foreground">
                  ₹{room.pricePerNight.toString()}/night
                </p>
                <div className="flex flex-wrap gap-1">
                  {room.amenities.slice(0, 2).map((a) => (
                    <span
                      key={a}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
                    >
                      {a}
                    </span>
                  ))}
                  {room.amenities.length > 2 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                      +{room.amenities.length - 2}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => toggleAvailable(room)}
                  data-ocid={`room-toggle-${room.id}`}
                  className="w-full text-xs font-semibold py-1.5 rounded-lg transition-colors"
                  style={{
                    backgroundColor: room.isAvailable ? "#DCFCE7" : "#FEE2E2",
                    color: room.isAvailable ? "#16A34A" : "#EF4444",
                  }}
                >
                  {room.isAvailable ? "✓ Available" : "✕ Occupied"}
                </button>
              </div>
            </AppCard>
          ))}
        </div>
      )}

      {/* Add Room Modal */}
      <AppModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Room"
      >
        <div className="space-y-3">
          <div>
            <label
              htmlFor="add-room-name"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Room Name
            </label>
            <input
              id="add-room-name"
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="e.g. Deluxe Suite"
              className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label
              htmlFor="add-room-amenities"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Amenities
            </label>
            <input
              id="add-room-amenities"
              type="text"
              value={amenities}
              onChange={(e) => setAmenities(e.target.value)}
              placeholder="AC, WiFi, TV"
              className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label
              htmlFor="add-room-price"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Price/Night (₹)
            </label>
            <input
              id="add-room-price"
              type="number"
              value={pricePerNight}
              onChange={(e) => setPricePerNight(e.target.value)}
              min="1"
              className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <AppButton fullWidth onClick={handleAddRoom} disabled={!roomName}>
            Add Room
          </AppButton>
        </div>
      </AppModal>

      {/* Edit Room Modal */}
      {editRoom && (
        <AppModal
          isOpen={!!editRoom}
          onClose={() => setEditRoom(null)}
          title="Edit Room"
        >
          <div className="space-y-3">
            <div>
              <label
                htmlFor="edit-room-name"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Room Name
              </label>
              <input
                id="edit-room-name"
                type="text"
                value={editRoomName}
                onChange={(e) => setEditRoomName(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label
                htmlFor="edit-room-amenities"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Amenities (comma-separated)
              </label>
              <input
                id="edit-room-amenities"
                type="text"
                value={editAmenities}
                onChange={(e) => setEditAmenities(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label
                htmlFor="edit-room-price"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Price/Night (₹)
              </label>
              <input
                id="edit-room-price"
                type="number"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
                min="1"
                className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <AppButton
              fullWidth
              onClick={handleEditRoom}
              disabled={updateRoom.isPending || !editRoomName}
            >
              {updateRoom.isPending ? "Saving…" : "Update Room"}
            </AppButton>
          </div>
        </AppModal>
      )}
    </div>
  );
}

// ─── Retail Dashboard ─────────────────────────────────────────────────────────

function RetailDashboard({ ownerId }: { ownerId: string }) {
  const { data: items = [], isLoading } = useRetailItemsByOwner(ownerId);
  const addItem = useAddRetailItem();
  const updateItem = useUpdateRetailItem();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editItem, setEditItem] = useState<RetailItem | null>(null);
  const [rname, setRname] = useState("");
  const [rprice, setRprice] = useState("");
  const [rcat, setRcat] = useState("Groceries");
  const [rqty, setRqty] = useState("50");

  async function handleAdd() {
    if (!rname || !rprice) return;
    await addItem.mutateAsync({
      ownerId,
      itemName: rname,
      priceInr: BigInt(rprice),
      category: rcat,
      quantity: BigInt(rqty || "0"),
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
      quantity: editItem.quantity,
    });
    toast.success("Item updated successfully");
    setEditItem(null);
  }

  async function toggleStock(item: RetailItem) {
    await updateItem.mutateAsync({ ...item, inStock: !item.inStock });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-base font-bold font-display text-foreground">
          🛒 Inventory
        </h2>
        <AppButton
          size="sm"
          onClick={() => setShowAddModal(true)}
          data-ocid="add-retail-item"
        >
          + Add Item
        </AppButton>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-16 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <AppCard>
          <p className="text-sm text-muted-foreground text-center py-4">
            No inventory added yet
          </p>
        </AppCard>
      ) : (
        <div className="space-y-2">
          {items.map((item) => {
            const lowStock = item.quantity < 5n;
            return (
              <AppCard key={item.id} padded={false}>
                <div className="flex items-center gap-3 p-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                    style={{ backgroundColor: `${CATEGORY_COLORS.retail}20` }}
                  >
                    🛒
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {item.itemName}
                      </p>
                      {lowStock && (
                        <span
                          className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold flex-shrink-0"
                          style={{
                            backgroundColor: "#FFF3E0",
                            color: "#E65100",
                          }}
                        >
                          Low
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      ₹{item.priceInr.toString()} · {item.category} · Qty:{" "}
                      {item.quantity.toString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => setEditItem({ ...item })}
                      aria-label="Edit item"
                      data-ocid={`edit-retail-${item.id}`}
                      className="text-sm text-muted-foreground hover:text-foreground px-1.5 py-1 rounded-lg hover:bg-muted transition-colors"
                    >
                      ✏️
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleStock(item)}
                      data-ocid={`retail-toggle-${item.id}`}
                      className="text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors"
                      style={{
                        backgroundColor: item.inStock ? "#DCFCE7" : "#FEE2E2",
                        color: item.inStock ? "#16A34A" : "#EF4444",
                      }}
                    >
                      {item.inStock ? "In Stock" : "Out"}
                    </button>
                  </div>
                </div>
              </AppCard>
            );
          })}
        </div>
      )}

      {/* Add Item Modal */}
      <AppModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Inventory Item"
      >
        <div className="space-y-3">
          <div>
            <label
              htmlFor="add-retail-name"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Item Name
            </label>
            <input
              id="add-retail-name"
              type="text"
              value={rname}
              onChange={(e) => setRname(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="add-retail-price"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Price (₹)
              </label>
              <input
                id="add-retail-price"
                type="number"
                value={rprice}
                onChange={(e) => setRprice(e.target.value)}
                min="1"
                className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label
                htmlFor="add-retail-qty"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Quantity
              </label>
              <input
                id="add-retail-qty"
                type="number"
                value={rqty}
                onChange={(e) => setRqty(e.target.value)}
                min="0"
                className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="add-retail-cat"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Category
            </label>
            <select
              id="add-retail-cat"
              value={rcat}
              onChange={(e) => setRcat(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>Groceries</option>
              <option>Meds</option>
              <option>Toys</option>
            </select>
          </div>
          <AppButton fullWidth onClick={handleAdd} disabled={!rname || !rprice}>
            Add Item
          </AppButton>
        </div>
      </AppModal>

      {/* Edit Item Modal */}
      {editItem && (
        <AppModal
          isOpen={!!editItem}
          onClose={() => setEditItem(null)}
          title="Edit Item"
        >
          <div className="space-y-3">
            <div>
              <label
                htmlFor="edit-retail-name"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Item Name
              </label>
              <input
                id="edit-retail-name"
                type="text"
                value={editItem.itemName}
                onChange={(e) =>
                  setEditItem({ ...editItem, itemName: e.target.value })
                }
                className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="edit-retail-price"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Price (₹)
                </label>
                <input
                  id="edit-retail-price"
                  type="number"
                  value={editItem.priceInr.toString()}
                  onChange={(e) =>
                    setEditItem({
                      ...editItem,
                      priceInr: BigInt(e.target.value || "0"),
                    })
                  }
                  min="1"
                  className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="edit-retail-qty"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Quantity
                </label>
                <input
                  id="edit-retail-qty"
                  type="number"
                  value={editItem.quantity.toString()}
                  onChange={(e) =>
                    setEditItem({
                      ...editItem,
                      quantity: BigInt(e.target.value || "0"),
                    })
                  }
                  min="0"
                  className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="edit-retail-cat"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Category
              </label>
              <select
                id="edit-retail-cat"
                value={editItem.category}
                onChange={(e) =>
                  setEditItem({ ...editItem, category: e.target.value })
                }
                className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Groceries</option>
                <option>Meds</option>
                <option>Toys</option>
              </select>
            </div>
            <AppButton
              fullWidth
              onClick={handleEdit}
              disabled={updateItem.isPending || !editItem.itemName}
            >
              {updateItem.isPending ? "Saving…" : "Update Item"}
            </AppButton>
          </div>
        </AppModal>
      )}
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function OwnerDashboard() {
  const session = getSession();
  const ownerId = session?.userId ?? "";
  const { data: owner, isLoading } = useGetOwnerById(ownerId);

  const category = owner?.category ?? Category.food;
  const businessName = owner?.businessName || session?.name || "My Business";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 pt-10 pb-4">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold"
              style={{ backgroundColor: SAFFRON }}
            >
              🏪
            </div>
            <div className="min-w-0">
              <h1 className="text-base font-bold font-display text-foreground truncate">
                {businessName}
              </h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                {isLoading ? (
                  <div className="h-4 w-16 bg-muted rounded animate-pulse" />
                ) : (
                  <>
                    <CategoryBadge
                      category={category as "food" | "stay" | "play" | "retail"}
                    />
                    {owner?.isVerified && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold">
                        ✓ Verified
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Dashboard</p>
            <p className="text-xs font-semibold" style={{ color: SAFFRON }}>
              {owner?.isActive ? "● Active" : "○ Inactive"}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-5 max-w-lg mx-auto">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-20 rounded-2xl bg-muted animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            {category === Category.food && <FoodDashboard ownerId={ownerId} />}
            {category === Category.play && <TurfDashboard ownerId={ownerId} />}
            {category === Category.stay && <StayDashboard ownerId={ownerId} />}
            {category === Category.retail && (
              <RetailDashboard ownerId={ownerId} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
