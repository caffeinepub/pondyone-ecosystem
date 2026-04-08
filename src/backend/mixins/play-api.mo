import Common "../types/common";
import ListingTypes "../types/listings";
import PlayLib "../lib/play";
import List "mo:core/List";

mixin (
  playSlots : List.List<ListingTypes.PlaySlot>,
  playCounter : { var count : Nat },
) {
  public func addPlaySlot(
    ownerId : Text,
    slotTime : Text,
    surfaceType : Text,
    hourlyRate : Nat,
    description : Text,
  ) : async Common.Result<ListingTypes.PlaySlot, Text> {
    playCounter.count += 1;
    PlayLib.addSlot(playSlots, playCounter.count, ownerId, slotTime, surfaceType, hourlyRate, description)
  };

  public func updatePlaySlot(
    id : Text,
    slotTime : Text,
    surfaceType : Text,
    hourlyRate : Nat,
    description : Text,
  ) : async Common.Result<(), Text> {
    PlayLib.updateSlot(playSlots, id, slotTime, surfaceType, hourlyRate, description)
  };

  public func toggleSlotBooking(
    id : Text,
    isBooked : Bool,
    bookedByUserId : ?Text,
  ) : async Common.Result<(), Text> {
    PlayLib.toggleBooking(playSlots, id, isBooked, bookedByUserId)
  };

  public query func getPlaySlotsByOwner(ownerId : Text) : async [ListingTypes.PlaySlot] {
    PlayLib.getByOwner(playSlots, ownerId)
  };

  public query func getAllPlaySlots() : async [ListingTypes.PlaySlot] {
    PlayLib.getAll(playSlots)
  };
};
