import Common "../types/common";
import ListingTypes "../types/listings";
import StayLib "../lib/stay";
import List "mo:core/List";

mixin (
  stayRooms : List.List<ListingTypes.StayRoom>,
  stayCounter : { var count : Nat },
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

  public query func getAllStayRooms() : async [ListingTypes.StayRoom] {
    StayLib.getAll(stayRooms)
  };

  public func addBookedDate(roomId : Text, date : Text) : async Common.Result<(), Text> {
    StayLib.addBookedDate(stayRooms, roomId, date)
  };
};
