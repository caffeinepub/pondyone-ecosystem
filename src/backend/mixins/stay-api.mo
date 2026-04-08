import Common "../types/common";
import ListingTypes "../types/listings";
import UserTypes "../types/users";
import StayLib "../lib/stay";
import List "mo:core/List";

mixin (
  stayRooms : List.List<ListingTypes.StayRoom>,
  stayCounter : { var count : Nat },
  owners : List.List<UserTypes.OwnerRecord>,
) {
  public func addStayRoom(
    ownerId : Text,
    roomName : Text,
    amenities : [Text],
    pricePerNight : Nat,
  ) : async Common.Result<ListingTypes.StayRoom, Text> {
    stayCounter.count += 1;
    StayLib.addRoom(stayRooms, stayCounter.count, ownerId, roomName, amenities, pricePerNight)
  };

  public func updateStayRoom(
    id : Text,
    roomName : Text,
    amenities : [Text],
    pricePerNight : Nat,
    isAvailable : Bool,
  ) : async Common.Result<(), Text> {
    StayLib.updateRoom(stayRooms, id, roomName, amenities, pricePerNight, isAvailable)
  };

  public query func getStayRoomsByOwner(ownerId : Text) : async [ListingTypes.StayRoom] {
    StayLib.getByOwner(stayRooms, ownerId)
  };

  // Customer-facing: only rooms belonging to active (subscribed) owners
  public query func getAllStayRooms() : async [ListingTypes.StayRoom] {
    let activeOwnerIds = owners.filter(func(o) { o.subscriptionStatus == #active })
      .map(func(o : UserTypes.OwnerRecord) : Text { o.id });
    stayRooms.filter(func(r) {
      activeOwnerIds.find(func(id) { id == r.ownerId }) != null
    }).toArray()
  };

  public func addBookedDate(roomId : Text, date : Text) : async Common.Result<(), Text> {
    StayLib.addBookedDate(stayRooms, roomId, date)
  };

  // Create a stay booking: records dates and marks room as booked for that range
  public func createStayBooking(
    roomId : Text,
    checkInDate : Text,
    checkOutDate : Text,
  ) : async Common.Result<(), Text> {
    StayLib.addStayBooking(stayRooms, roomId, checkInDate, checkOutDate)
  };

  // Check availability for a date range
  public query func getStayAvailability(
    roomId : Text,
    checkInDate : Text,
    checkOutDate : Text,
  ) : async Bool {
    StayLib.isRoomAvailable(stayRooms, roomId, checkInDate, checkOutDate)
  };
};
