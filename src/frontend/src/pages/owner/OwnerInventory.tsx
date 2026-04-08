import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppModal } from "@/components/ui/AppModal";
import {
  Category,
  type FoodItem,
  type PlaySlot,
  type RetailItem,
  type StayRoom,
  useAddFoodItem,
  useAddPlaySlot,
  useAddRetailItem,
  useAddStayRoom,
  useFoodItemsByOwner,
  useGetOwnerById,
  usePlaySlotsByOwner,
  useRetailItemsByOwner,
  useSlotsByDate,
  useStayRoomsByOwner,
  useToggleSlotBooking,
  useUpdateDeliveryFeePerKm,
  useUpdateFoodItem,
  useUpdateRetailItem,
  useUpdateStayRoom,
} from "@/hooks/useQueries";
import { getSession } from "@/lib/auth";
import { CATEGORY_COLORS, SAFFRON } from "@/lib/constants";
import { useState } from "react";
import { toast } from "sonner";

// ─── Food Inventory ───────────────────────────────────────────────────────────
function FoodInventory({ ownerId }: { ownerId: string }) {
  const { data: items = [], isLoading } = useFoodItemsByOwner(ownerId);
  const updateFood = useUpdateFoodItem();
  const addFood = useAddFoodItem();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editItem, setEditItem] = useState<FoodItem | null>(null);
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
    toast.success("Item added!");
  }

  async function handleEdit() {
    if (!editItem) return;
    await updateFood.mutateAsync({ ...editItem, priceInr: editItem.priceInr });
    setEditItem(null);
    toast.success("Item updated!");
  }

  async function toggleAvailability(item: FoodItem) {
    await updateFood.mutateAsync({ ...item, isAvailable: !item.isAvailable });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
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
                      backgroundColor: item.isAvailable ? "#22C55E" : "#d1d5db",
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

      <AppModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Menu Item"
      >
        <div className="space-y-3">
          <div>
            <label
              htmlFor="inv-food-name"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Item Name
            </label>
            <input
              id="inv-food-name"
              type="text"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              placeholder="e.g. Chicken Biryani"
              className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label
              htmlFor="inv-food-price"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Price (₹)
            </label>
            <input
              id="inv-food-price"
              type="number"
              value={fprice}
              onChange={(e) => setFprice(e.target.value)}
              min="1"
              className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label
              htmlFor="inv-food-desc"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Description
            </label>
            <textarea
              id="inv-food-desc"
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

      {editItem && (
        <AppModal
          isOpen={!!editItem}
          onClose={() => setEditItem(null)}
          title="Edit Item"
        >
          <div className="space-y-3">
            <div>
              <label
                htmlFor="inv-edit-food-name"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Item Name
              </label>
              <input
                id="inv-edit-food-name"
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
                htmlFor="inv-edit-food-price"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Price (₹)
              </label>
              <input
                id="inv-edit-food-price"
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
            <AppButton fullWidth onClick={handleEdit}>
              Update Item
            </AppButton>
          </div>
        </AppModal>
      )}
    </div>
  );
}

// ─── Turf Inventory ───────────────────────────────────────────────────────────
function getTodayStr() {
  return new Date().toISOString().split("T")[0];
}

function TurfInventory({ ownerId }: { ownerId: string }) {
  const today = getTodayStr();
  const [selectedDate, setSelectedDate] = useState(today);
  const { data: allSlots = [], isLoading } = usePlaySlotsByOwner(ownerId);
  const { data: dateSlots = [] } = useSlotsByDate(ownerId, selectedDate);
  const addSlot = useAddPlaySlot();
  const toggleBooking = useToggleSlotBooking();
  const [showAddModal, setShowAddModal] = useState(false);

  const [slotDate, setSlotDate] = useState(today);
  const [startTime, setStartTime] = useState("06:00");
  const [endTime, setEndTime] = useState("07:00");
  const [hourlyRate, setHourlyRate] = useState("500");
  const [surfaceType, setSurfaceType] = useState("Natural Grass");
  const [slotDesc, setSlotDesc] = useState("");

  const slotsByDate = allSlots.reduce<Record<string, PlaySlot[]>>((acc, s) => {
    const d = s.slotDate || today;
    if (!acc[d]) acc[d] = [];
    acc[d].push(s);
    return acc;
  }, {});

  const displaySlots =
    selectedDate in slotsByDate ? slotsByDate[selectedDate] : dateSlots;
  const uniqueDates = Array.from(
    new Set(allSlots.map((s) => s.slotDate || today)),
  ).sort();

  async function handleAddSlot() {
    if (!slotDate || !startTime || !endTime || !hourlyRate) return;
    try {
      await addSlot.mutateAsync({
        ownerId,
        slotDate,
        startTime,
        endTime,
        surfaceType,
        hourlyRate: BigInt(hourlyRate),
        description: slotDesc,
      });
      toast.success("Slot added!");
      setSlotDesc("");
      setShowAddModal(false);
      setSelectedDate(slotDate);
    } catch {
      toast.error("Failed to add slot");
    }
  }

  async function handleToggle(slot: PlaySlot) {
    if (slot.isBooked) {
      const confirmed = window.confirm(
        `Unbook ${slot.startTime}–${slot.endTime}?`,
      );
      if (!confirmed) return;
      await toggleBooking.mutateAsync({
        id: slot.id,
        isBooked: false,
        bookedByUserId: null,
      });
      toast.success("Slot unbooked");
    }
  }

  return (
    <div className="space-y-5">
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

      <div>
        <label
          htmlFor="inv-slot-date"
          className="block text-xs font-medium text-muted-foreground mb-1.5"
        >
          View date
        </label>
        <input
          id="inv-slot-date"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {uniqueDates.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {uniqueDates.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setSelectedDate(d)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
              style={{
                backgroundColor: selectedDate === d ? SAFFRON : undefined,
                color: selectedDate === d ? "#fff" : undefined,
              }}
            >
              {d === today ? "Today" : d}
            </button>
          ))}
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-2 gap-2">
          {["s1", "s2", "s3", "s4"].map((k) => (
            <div key={k} className="h-20 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : displaySlots.length === 0 ? (
        <AppCard>
          <p className="text-sm text-muted-foreground text-center py-4">
            No slots for {selectedDate === today ? "today" : selectedDate}. Tap
            "+ Add Slot".
          </p>
        </AppCard>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {displaySlots.map((slot) => (
            <div
              key={slot.id}
              className="rounded-xl p-3 border-2"
              style={{
                backgroundColor: slot.isBooked ? "#FEF2F2" : "#F0FDF4",
                borderColor: slot.isBooked ? "#FCA5A5" : "#86EFAC",
              }}
            >
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                style={{
                  backgroundColor: slot.isBooked ? "#EF4444" : "#22C55E",
                  color: "#fff",
                }}
              >
                {slot.isBooked ? "BOOKED" : "AVAILABLE"}
              </span>
              <p className="text-sm font-bold text-foreground mt-1">
                {slot.startTime} – {slot.endTime}
              </p>
              <p className="text-xs text-muted-foreground">
                ₹{slot.hourlyRate.toString()}/hr
              </p>
              {slot.isBooked && (
                <button
                  type="button"
                  onClick={() => handleToggle(slot)}
                  className="mt-2 w-full text-[11px] font-semibold py-1 rounded-lg"
                  style={{ backgroundColor: "#FEE2E2", color: "#EF4444" }}
                >
                  Unbook
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <AppModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Time Slot"
      >
        <div className="space-y-3">
          <div>
            <label
              htmlFor="inv-slot-add-date"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Date
            </label>
            <input
              id="inv-slot-add-date"
              type="date"
              value={slotDate}
              onChange={(e) => setSlotDate(e.target.value)}
              min={today}
              className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="inv-slot-start"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Start Time
              </label>
              <input
                id="inv-slot-start"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label
                htmlFor="inv-slot-end"
                className="block text-sm font-medium text-foreground mb-1"
              >
                End Time
              </label>
              <input
                id="inv-slot-end"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="inv-slot-rate"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Hourly Rate (₹)
            </label>
            <input
              id="inv-slot-rate"
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              min="1"
              className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label
              htmlFor="inv-slot-surface"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Surface Type
            </label>
            <select
              id="inv-slot-surface"
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
              htmlFor="inv-slot-desc"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Description (optional)
            </label>
            <textarea
              id="inv-slot-desc"
              value={slotDesc}
              onChange={(e) => setSlotDesc(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
          <AppButton
            fullWidth
            onClick={handleAddSlot}
            disabled={addSlot.isPending || !slotDate || !startTime || !endTime}
          >
            {addSlot.isPending ? "Adding…" : "Add Slot"}
          </AppButton>
        </div>
      </AppModal>
    </div>
  );
}

// ─── Stay Inventory ───────────────────────────────────────────────────────────
function StayInventory({ ownerId }: { ownerId: string }) {
  const { data: rooms = [], isLoading } = useStayRoomsByOwner(ownerId);
  const addRoom = useAddStayRoom();
  const updateRoom = useUpdateStayRoom();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editRoom, setEditRoom] = useState<StayRoom | null>(null);
  const [roomName, setRoomName] = useState("");
  const [amenities, setAmenities] = useState("AC, WiFi, TV");
  const [pricePerNight, setPricePerNight] = useState("1500");
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
    toast.success("Room added!");
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
    toast.success("Room updated!");
    setEditRoom(null);
  }

  async function toggleAvailable(room: StayRoom) {
    await updateRoom.mutateAsync({ ...room, isAvailable: !room.isAvailable });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
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
                <button
                  type="button"
                  onClick={() => toggleAvailable(room)}
                  className="w-full text-xs font-semibold py-1.5 rounded-lg"
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

      <AppModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Room"
      >
        <div className="space-y-3">
          <div>
            <label
              htmlFor="inv-room-name"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Room Name
            </label>
            <input
              id="inv-room-name"
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="e.g. Deluxe Suite"
              className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label
              htmlFor="inv-room-amenities"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Amenities
            </label>
            <input
              id="inv-room-amenities"
              type="text"
              value={amenities}
              onChange={(e) => setAmenities(e.target.value)}
              placeholder="AC, WiFi, TV"
              className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label
              htmlFor="inv-room-price"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Price/Night (₹)
            </label>
            <input
              id="inv-room-price"
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

      {editRoom && (
        <AppModal
          isOpen={!!editRoom}
          onClose={() => setEditRoom(null)}
          title="Edit Room"
        >
          <div className="space-y-3">
            <div>
              <label
                htmlFor="inv-edit-room-name"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Room Name
              </label>
              <input
                id="inv-edit-room-name"
                type="text"
                value={editRoomName}
                onChange={(e) => setEditRoomName(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label
                htmlFor="inv-edit-room-amenities"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Amenities
              </label>
              <input
                id="inv-edit-room-amenities"
                type="text"
                value={editAmenities}
                onChange={(e) => setEditAmenities(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label
                htmlFor="inv-edit-room-price"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Price/Night (₹)
              </label>
              <input
                id="inv-edit-room-price"
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

// ─── Retail Inventory ─────────────────────────────────────────────────────────
function RetailInventory({ ownerId }: { ownerId: string }) {
  const { data: items = [], isLoading } = useRetailItemsByOwner(ownerId);
  const addItem = useAddRetailItem();
  const updateItem = useUpdateRetailItem();
  const updateDeliveryFee = useUpdateDeliveryFeePerKm();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [editItem, setEditItem] = useState<RetailItem | null>(null);
  const [rname, setRname] = useState("");
  const [rprice, setRprice] = useState("");
  const [rcat, setRcat] = useState("Groceries");
  const [rqty, setRqty] = useState("50");

  const currentFeePerKm = items[0]?.deliveryFeePerKm ?? 0n;
  const [deliveryRate, setDeliveryRate] = useState(currentFeePerKm.toString());

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
    toast.success("Item added!");
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
    toast.success("Item updated!");
    setEditItem(null);
  }

  async function toggleStock(item: RetailItem) {
    await updateItem.mutateAsync({ ...item, inStock: !item.inStock });
  }

  async function handleSaveDeliveryFee() {
    try {
      await updateDeliveryFee.mutateAsync({
        ownerId,
        rate: BigInt(deliveryRate || "0"),
      });
      toast.success("Delivery fee updated!");
      setShowDeliveryModal(false);
    } catch {
      toast.error("Failed to update delivery fee");
    }
  }

  return (
    <div className="space-y-4">
      {/* Delivery Settings banner */}
      <AppCard padded={false}>
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🚚</span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Delivery Fee
              </p>
              <p className="text-xs text-muted-foreground">
                {currentFeePerKm > 0n
                  ? `₹${currentFeePerKm.toString()}/km`
                  : "Not configured"}
              </p>
            </div>
          </div>
          <AppButton
            size="sm"
            onClick={() => {
              setDeliveryRate(currentFeePerKm.toString());
              setShowDeliveryModal(true);
            }}
            data-ocid="delivery-settings"
          >
            Configure
          </AppButton>
        </div>
      </AppCard>

      <div className="flex items-center justify-between">
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
                      className="text-sm text-muted-foreground hover:text-foreground px-1.5 py-1 rounded-lg hover:bg-muted transition-colors"
                    >
                      ✏️
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleStock(item)}
                      className="text-xs font-semibold px-2.5 py-1.5 rounded-lg"
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

      <AppModal
        isOpen={showDeliveryModal}
        onClose={() => setShowDeliveryModal(false)}
        title="🚚 Delivery Settings"
      >
        <div className="space-y-4">
          <div
            className="rounded-xl p-3"
            style={{ backgroundColor: `${SAFFRON}15` }}
          >
            <p className="text-xs text-muted-foreground">
              Flat rate per km. E.g. ₹10/km means a 5 km delivery costs ₹50.
            </p>
          </div>
          <div>
            <label
              htmlFor="inv-delivery-rate"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Rate per km (₹)
            </label>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-muted-foreground">₹</span>
              <input
                id="inv-delivery-rate"
                type="number"
                value={deliveryRate}
                onChange={(e) => setDeliveryRate(e.target.value)}
                min="0"
                step="1"
                placeholder="e.g. 10"
                className="flex-1 h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                data-ocid="delivery-rate-input"
              />
              <span className="text-sm text-muted-foreground">/km</span>
            </div>
          </div>
          {deliveryRate && Number(deliveryRate) > 0 && (
            <div className="rounded-xl p-3 bg-muted/50">
              <p className="text-xs text-muted-foreground mb-2">Preview:</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[2, 5, 10].map((km) => (
                  <div key={km} className="bg-card rounded-lg p-2">
                    <p className="text-xs text-muted-foreground">{km} km</p>
                    <p className="text-sm font-bold text-foreground">
                      ₹{(km * Number(deliveryRate)).toFixed(0)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <AppButton
            fullWidth
            onClick={handleSaveDeliveryFee}
            disabled={updateDeliveryFee.isPending}
          >
            {updateDeliveryFee.isPending ? "Saving…" : "Save Delivery Rate"}
          </AppButton>
        </div>
      </AppModal>

      <AppModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Inventory Item"
      >
        <div className="space-y-3">
          <div>
            <label
              htmlFor="inv-retail-name"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Item Name
            </label>
            <input
              id="inv-retail-name"
              type="text"
              value={rname}
              onChange={(e) => setRname(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="inv-retail-price"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Price (₹)
              </label>
              <input
                id="inv-retail-price"
                type="number"
                value={rprice}
                onChange={(e) => setRprice(e.target.value)}
                min="1"
                className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label
                htmlFor="inv-retail-qty"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Quantity
              </label>
              <input
                id="inv-retail-qty"
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
              htmlFor="inv-retail-cat"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Category
            </label>
            <select
              id="inv-retail-cat"
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

      {editItem && (
        <AppModal
          isOpen={!!editItem}
          onClose={() => setEditItem(null)}
          title="Edit Item"
        >
          <div className="space-y-3">
            <div>
              <label
                htmlFor="inv-edit-retail-name"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Item Name
              </label>
              <input
                id="inv-edit-retail-name"
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
                  htmlFor="inv-edit-retail-price"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Price (₹)
                </label>
                <input
                  id="inv-edit-retail-price"
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
                  htmlFor="inv-edit-retail-qty"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Quantity
                </label>
                <input
                  id="inv-edit-retail-qty"
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

// ─── Main Inventory Page ───────────────────────────────────────────────────────
export default function OwnerInventory() {
  const session = getSession();
  const ownerId = session?.userId ?? "";
  const { data: owner, isLoading } = useGetOwnerById(ownerId);
  const category = owner?.category ?? Category.food;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 pt-10 pb-4">
        <div className="max-w-lg mx-auto">
          <h1 className="text-xl font-bold font-display text-foreground">
            Inventory
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage your listings and stock
          </p>
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
            {category === Category.food && <FoodInventory ownerId={ownerId} />}
            {category === Category.play && <TurfInventory ownerId={ownerId} />}
            {category === Category.stay && <StayInventory ownerId={ownerId} />}
            {category === Category.retail && (
              <RetailInventory ownerId={ownerId} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
