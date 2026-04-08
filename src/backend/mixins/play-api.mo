import Common "../types/common";
import ListingTypes "../types/listings";
import UserTypes "../types/users";
import PlayLib "../lib/play";
import List "mo:core/List";

mixin (
  playSlots : List.List<ListingTypes.PlaySlot>,
  playCounter : { var count : Nat },
  owners : List.List<UserTypes.OwnerRecord>,
) {
  // Owner adds a slot with specific date and time range
  public func addPlaySlot(
    ownerId : Text,
    slotDate : Text,
    startTime : Text,
    endTime : Text,
    surfaceType : Text,
    hourlyRate : Nat,
    description : Text,
  ) : async Common.Result<ListingTypes.PlaySlot, Text> {
    playCounter.count += 1;
    PlayLib.addSlot(playSlots, playCounter.count, ownerId, slotDate, startTime, endTime, surfaceType, hourlyRate, description)
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

  // Get slots for a specific owner and date (for grid view)
  public query func getSlotsByDate(ownerId : Text, date : Text) : async [ListingTypes.PlaySlot] {
    PlayLib.getByOwnerAndDate(playSlots, ownerId, date)
  };

  // Customer-facing: only slots belonging to active (subscribed) owners
  public query func getAllPlaySlots() : async [ListingTypes.PlaySlot] {
    let activeOwnerIds = owners.filter(func(o) { o.subscriptionStatus == #active })
      .map(func(o : UserTypes.OwnerRecord) : Text { o.id });
    playSlots.filter(func(s) {
      activeOwnerIds.find(func(id) { id == s.ownerId }) != null
    }).toArray()
  };
};
