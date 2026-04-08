import Common "../types/common";
import Types "../types/listings";
import List "mo:core/List";

module {
  func generateId(counter : Nat) : Text {
    let padded = if (counter < 10) { "00" # counter.toText() }
                 else if (counter < 100) { "0" # counter.toText() }
                 else { counter.toText() };
    "play_" # padded
  };

  public func addSlot(
    slots : List.List<Types.PlaySlot>,
    counter : Nat,
    ownerId : Text,
    slotTime : Text,
    surfaceType : Text,
    hourlyRate : Nat,
    description : Text,
  ) : Common.Result<Types.PlaySlot, Text> {
    let id = generateId(counter);
    let slot : Types.PlaySlot = {
      id;
      ownerId;
      slotTime;
      surfaceType;
      hourlyRate;
      description;
      isBooked = false;
      bookedByUserId = null;
    };
    slots.add(slot);
    #ok(slot)
  };

  public func updateSlot(
    slots : List.List<Types.PlaySlot>,
    id : Text,
    slotTime : Text,
    surfaceType : Text,
    hourlyRate : Nat,
    description : Text,
  ) : Common.Result<(), Text> {
    var found = false;
    slots.mapInPlace(func(s) {
      if (s.id == id) {
        found := true;
        { s with slotTime; surfaceType; hourlyRate; description }
      } else { s }
    });
    if (found) { #ok(()) } else { #err("Slot not found") }
  };

  public func toggleBooking(
    slots : List.List<Types.PlaySlot>,
    id : Text,
    isBooked : Bool,
    bookedByUserId : ?Text,
  ) : Common.Result<(), Text> {
    var found = false;
    slots.mapInPlace(func(s) {
      if (s.id == id) {
        found := true;
        { s with isBooked; bookedByUserId }
      } else { s }
    });
    if (found) { #ok(()) } else { #err("Slot not found") }
  };

  public func getByOwner(
    slots : List.List<Types.PlaySlot>,
    ownerId : Text,
  ) : [Types.PlaySlot] {
    slots.filter(func(s) { s.ownerId == ownerId }).toArray()
  };

  public func getAll(slots : List.List<Types.PlaySlot>) : [Types.PlaySlot] {
    slots.toArray()
  };
};
