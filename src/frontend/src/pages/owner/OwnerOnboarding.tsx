import { AppButton } from "@/components/ui/AppButton";
import {
  Category,
  useAddFoodItem,
  useAddPlaySlot,
  useAddRetailItem,
  useAddStayRoom,
  useCompleteOwnerOnboarding,
} from "@/hooks/useQueries";
import { getSession, updateSession } from "@/lib/auth";
import { CATEGORY_COLORS, DEFAULT_LOCATION, SAFFRON } from "@/lib/constants";
import { useState } from "react";
import type { OwnerPage } from "./OwnerApp";

const CATEGORY_OPTIONS = [
  {
    key: Category.food,
    label: "Restaurant",
    emoji: "🍔",
    color: CATEGORY_COLORS.food,
  },
  {
    key: Category.play,
    label: "Turf / Sport",
    emoji: "⚽",
    color: CATEGORY_COLORS.play,
  },
  {
    key: Category.stay,
    label: "Stay / Hotel",
    emoji: "🏨",
    color: CATEGORY_COLORS.stay,
  },
  {
    key: Category.retail,
    label: "Retail Shop",
    emoji: "🛒",
    color: CATEGORY_COLORS.retail,
  },
];

const SLOT_TIMES = Array.from({ length: 18 }, (_, i) => {
  const hour = i + 6;
  const suffix = hour < 12 ? "AM" : "PM";
  const h12 = hour > 12 ? hour - 12 : hour;
  return `${h12}:00 ${suffix}`;
});

function InputField({
  id,
  label,
  ...props
}: {
  id: string;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-foreground mb-1.5"
      >
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
      />
    </div>
  );
}

function SelectField({
  id,
  label,
  children,
  ...props
}: {
  id: string;
  label: string;
  children: React.ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-foreground mb-1.5"
      >
        {label}
      </label>
      <select
        id={id}
        {...props}
        className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      >
        {children}
      </select>
    </div>
  );
}

export default function OwnerOnboarding({
  navigate,
}: {
  navigate: (page: OwnerPage) => void;
}) {
  const session = getSession();
  const completeOnboarding = useCompleteOwnerOnboarding();
  const addFood = useAddFoodItem();
  const addStay = useAddStayRoom();
  const addPlay = useAddPlaySlot();
  const addRetail = useAddRetailItem();

  const [step, setStep] = useState(1);

  // Step 1
  const [businessName, setBusinessName] = useState("");
  const [locationText, setLocationText] = useState<string>(
    DEFAULT_LOCATION.text,
  );

  // Step 2
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  // Step 3
  const [upiId, setUpiId] = useState("");

  // Step 4 — Food
  const [foodName, setFoodName] = useState("Chicken Biryani");
  const [foodPrice, setFoodPrice] = useState("199");
  const [isVeg, setIsVeg] = useState(false);
  const [foodDesc, setFoodDesc] = useState(
    "Fragrant basmati rice with tender chicken",
  );

  // Step 4 — Stay
  const [roomName, setRoomName] = useState("Deluxe Room");
  const [amenities, setAmenities] = useState("AC, WiFi, TV, Hot Water");
  const [pricePerNight, setPricePerNight] = useState("1500");

  // Step 4 — Play
  const [selectedSlots, setSelectedSlots] = useState<string[]>([
    "6:00 AM",
    "7:00 AM",
  ]);
  const [surfaceType, setSurfaceType] = useState("Natural Grass");
  const [hourlyRate, setHourlyRate] = useState("500");

  // Step 4 — Retail
  const [retailName, setRetailName] = useState("Fresh Vegetables");
  const [retailPrice, setRetailPrice] = useState("50");
  const [retailCategory, setRetailCategory] = useState("Groceries");
  const [retailQty, setRetailQty] = useState("100");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function toggleSlot(slot: string) {
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot],
    );
  }

  async function handleComplete() {
    if (!session || !selectedCategory) return;
    setLoading(true);
    setError("");
    try {
      const onboardResult = await completeOnboarding.mutateAsync({
        userId: session.userId,
        businessName,
        category: selectedCategory,
        upiId,
      });
      if (onboardResult.__kind__ === "err") {
        setError(onboardResult.err);
        setLoading(false);
        return;
      }

      const ownerId = session.userId;
      if (selectedCategory === Category.food) {
        await addFood.mutateAsync({
          ownerId,
          itemName: foodName,
          priceInr: BigInt(foodPrice || "0"),
          isVeg,
          description: foodDesc,
        });
      } else if (selectedCategory === Category.stay) {
        await addStay.mutateAsync({
          ownerId,
          roomName,
          amenities: amenities
            .split(",")
            .map((a) => a.trim())
            .filter(Boolean),
          pricePerNight: BigInt(pricePerNight || "0"),
        });
      } else if (selectedCategory === Category.play) {
        for (const slot of selectedSlots) {
          await addPlay.mutateAsync({
            ownerId,
            slotDate: new Date().toISOString().split("T")[0],
            startTime: slot,
            endTime: slot,
            surfaceType,
            hourlyRate: BigInt(hourlyRate || "0"),
            description: "",
          });
        }
      } else if (selectedCategory === Category.retail) {
        await addRetail.mutateAsync({
          ownerId,
          itemName: retailName,
          priceInr: BigInt(retailPrice || "0"),
          category: retailCategory,
          quantity: BigInt(retailQty || "0"),
        });
      }

      updateSession({ onboardingDone: true });
      navigate("dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  }

  const progressPercent = (step / 4) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 pt-10 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: SAFFRON }}
          >
            <span className="text-white font-bold">P</span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">
              PondyOne Business
            </p>
            <h1 className="text-lg font-bold font-display text-foreground">
              Setup Wizard
            </h1>
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Step {step} of 4</span>
            <span>
              {step === 1 && "Business Details"}
              {step === 2 && "Select Category"}
              {step === 3 && "Payment Setup"}
              {step === 4 && "First Listing"}
            </span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%`, backgroundColor: SAFFRON }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 max-w-sm mx-auto w-full">
        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-xl font-bold font-display text-foreground">
              Tell us about your business 🏪
            </h2>
            <InputField
              id="biz-name"
              label="Business Name"
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="e.g. Aasife Biryani"
              data-ocid="onboard-business-name"
            />
            <InputField
              id="biz-loc"
              label="Location"
              type="text"
              value={locationText}
              onChange={(e) => setLocationText(e.target.value)}
              placeholder="e.g. Nehru Street, Puducherry"
              data-ocid="onboard-location"
            />
            <div className="grid grid-cols-2 gap-3">
              <InputField
                id="gps-lat"
                label="GPS Latitude"
                type="text"
                defaultValue={DEFAULT_LOCATION.lat}
                readOnly
              />
              <InputField
                id="gps-lng"
                label="GPS Longitude"
                type="text"
                defaultValue={DEFAULT_LOCATION.lng}
                readOnly
              />
            </div>
            <AppButton
              fullWidth
              size="lg"
              disabled={!businessName.trim()}
              onClick={() => setStep(2)}
              data-ocid="onboard-step1-next"
            >
              Next →
            </AppButton>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-xl font-bold font-display text-foreground">
              What type of business? 🎯
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {CATEGORY_OPTIONS.map((opt) => {
                const isSelected = selectedCategory === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    data-ocid={`onboard-cat-${opt.key}`}
                    onClick={() => setSelectedCategory(opt.key)}
                    className="rounded-2xl p-4 text-center transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-2"
                    style={{
                      backgroundColor: isSelected
                        ? opt.color
                        : `${opt.color}18`,
                      borderColor: isSelected ? opt.color : "transparent",
                    }}
                  >
                    <div className="text-4xl mb-2">{opt.emoji}</div>
                    <p
                      className="text-sm font-semibold font-display"
                      style={{ color: isSelected ? "#fff" : opt.color }}
                    >
                      {opt.label}
                    </p>
                  </button>
                );
              })}
            </div>
            <div className="flex gap-3">
              <AppButton variant="outline" fullWidth onClick={() => setStep(1)}>
                ← Back
              </AppButton>
              <AppButton
                fullWidth
                size="lg"
                disabled={!selectedCategory}
                onClick={() => setStep(3)}
                data-ocid="onboard-step2-next"
              >
                Next →
              </AppButton>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="space-y-5">
            <h2 className="text-xl font-bold font-display text-foreground">
              Set up payments 💳
            </h2>
            <div
              className="rounded-xl p-4 border"
              style={{ borderColor: SAFFRON, backgroundColor: `${SAFFRON}10` }}
            >
              <p className="text-sm text-foreground font-medium">
                💡 UPI payments are instant and free
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Customers will pay directly to your UPI ID
              </p>
            </div>
            <InputField
              id="upi-id"
              label="Your UPI ID"
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="e.g. business@paytm or phone@upi"
              data-ocid="onboard-upi-id"
            />
            <div className="flex gap-3">
              <AppButton variant="outline" fullWidth onClick={() => setStep(2)}>
                ← Back
              </AppButton>
              <AppButton
                fullWidth
                size="lg"
                disabled={!upiId.trim()}
                onClick={() => setStep(4)}
                data-ocid="onboard-step3-next"
              >
                Next →
              </AppButton>
            </div>
          </div>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <div className="space-y-5">
            <h2 className="text-xl font-bold font-display text-foreground">
              Add your first listing ✨
            </h2>

            {/* Food */}
            {selectedCategory === Category.food && (
              <div className="space-y-4">
                <InputField
                  id="food-name"
                  label="Item Name"
                  type="text"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                />
                <InputField
                  id="food-price"
                  label="Price (₹)"
                  type="number"
                  value={foodPrice}
                  onChange={(e) => setFoodPrice(e.target.value)}
                  min="1"
                />
                <div>
                  <label
                    htmlFor="food-desc"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Description
                  </label>
                  <textarea
                    id="food-desc"
                    value={foodDesc}
                    onChange={(e) => setFoodDesc(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Vegetarian?
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Toggle if this is a veg item
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsVeg((v) => !v)}
                    className="w-12 h-6 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    style={{ backgroundColor: isVeg ? "#22C55E" : "#d1d5db" }}
                    aria-label="Toggle vegetarian"
                  >
                    <span
                      className="block w-5 h-5 rounded-full bg-white shadow transition-transform mx-0.5"
                      style={{
                        transform: isVeg ? "translateX(24px)" : "translateX(0)",
                      }}
                    />
                  </button>
                </div>
              </div>
            )}

            {/* Stay */}
            {selectedCategory === Category.stay && (
              <div className="space-y-4">
                <InputField
                  id="room-name"
                  label="Room Name"
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                />
                <InputField
                  id="amenities"
                  label="Amenities (comma-separated)"
                  type="text"
                  value={amenities}
                  onChange={(e) => setAmenities(e.target.value)}
                  placeholder="AC, WiFi, TV, Hot Water"
                />
                <InputField
                  id="price-night"
                  label="Price per Night (₹)"
                  type="number"
                  value={pricePerNight}
                  onChange={(e) => setPricePerNight(e.target.value)}
                  min="1"
                />
              </div>
            )}

            {/* Play */}
            {selectedCategory === Category.play && (
              <div className="space-y-4">
                <SelectField
                  id="surface-type"
                  label="Surface Type"
                  value={surfaceType}
                  onChange={(e) => setSurfaceType(e.target.value)}
                >
                  <option>Natural Grass</option>
                  <option>Artificial Turf</option>
                  <option>Concrete</option>
                  <option>Wooden Court</option>
                </SelectField>
                <InputField
                  id="hourly-rate"
                  label="Hourly Rate (₹)"
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  min="1"
                />
                <div>
                  <p className="block text-sm font-medium text-foreground mb-2">
                    Available Time Slots
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {SLOT_TIMES.map((slot) => {
                      const isSelected = selectedSlots.includes(slot);
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => toggleSlot(slot)}
                          className="text-xs py-2 px-1 rounded-lg border transition-colors font-medium focus-visible:outline-none"
                          style={{
                            backgroundColor: isSelected
                              ? CATEGORY_COLORS.play
                              : undefined,
                            borderColor: isSelected
                              ? CATEGORY_COLORS.play
                              : undefined,
                            color: isSelected ? "#fff" : undefined,
                          }}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Retail */}
            {selectedCategory === Category.retail && (
              <div className="space-y-4">
                <InputField
                  id="retail-name"
                  label="Item Name"
                  type="text"
                  value={retailName}
                  onChange={(e) => setRetailName(e.target.value)}
                />
                <div className="grid grid-cols-2 gap-3">
                  <InputField
                    id="retail-price"
                    label="Price (₹)"
                    type="number"
                    value={retailPrice}
                    onChange={(e) => setRetailPrice(e.target.value)}
                    min="1"
                  />
                  <InputField
                    id="retail-qty"
                    label="Quantity"
                    type="number"
                    value={retailQty}
                    onChange={(e) => setRetailQty(e.target.value)}
                    min="0"
                  />
                </div>
                <SelectField
                  id="retail-cat"
                  label="Category"
                  value={retailCategory}
                  onChange={(e) => setRetailCategory(e.target.value)}
                >
                  <option>Groceries</option>
                  <option>Meds</option>
                  <option>Toys</option>
                </SelectField>
              </div>
            )}

            {error && (
              <div className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <div className="flex gap-3">
                <AppButton
                  variant="outline"
                  fullWidth
                  onClick={() => setStep(3)}
                >
                  ← Back
                </AppButton>
                <AppButton
                  fullWidth
                  size="lg"
                  disabled={loading}
                  onClick={handleComplete}
                  data-ocid="onboard-complete"
                >
                  {loading ? "Setting up…" : "Complete Setup ✓"}
                </AppButton>
              </div>
              <button
                type="button"
                onClick={() => {
                  updateSession({ onboardingDone: true });
                  navigate("dashboard");
                }}
                className="w-full text-sm text-muted-foreground underline focus-visible:outline-none"
              >
                Skip for now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
