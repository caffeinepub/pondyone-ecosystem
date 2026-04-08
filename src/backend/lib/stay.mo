import Common "../types/common";
import Types "../types/listings";
import List "mo:core/List";

module {
  func generateId(counter : Nat) : Text {
    let padded = if (counter < 10) { "00" # counter.toText() }
                 else if (counter < 100) { "0" # counter.toText() }
                 else { counter.toText() };
    "stay_" # padded
  };

  public func addRoom(
    rooms : List.List<Types.StayRoom>,
    counter : Nat,
    ownerId : Text,
    roomName : Text,
    amenities : [Text],
    pricePerNight : Nat,
  ) : Common.Result<Types.StayRoom, Text> {
    let id = generateId(counter);
    let room : Types.StayRoom = {
      id;
      ownerId;
      roomName;
      amenities;
      pricePerNight;
      isAvailable = true;
      bookedDates = [];
    };
    rooms.add(room);
    #ok(room)
  };

  public func updateRoom(
    rooms : List.List<Types.StayRoom>,
    id : Text,
    roomName : Text,
    amenities : [Text],
    pricePerNight : Nat,
    isAvailable : Bool,
  ) : Common.Result<(), Text> {
    var found = false;
    rooms.mapInPlace(func(r) {
      if (r.id == id) {
        found := true;
        { r with roomName; amenities; pricePerNight; isAvailable }
      } else { r }
    });
    if (found) { #ok(()) } else { #err("Room not found") }
  };

  public func getByOwner(
    rooms : List.List<Types.StayRoom>,
    ownerId : Text,
  ) : [Types.StayRoom] {
    rooms.filter(func(r) { r.ownerId == ownerId }).toArray()
  };

  public func getAll(rooms : List.List<Types.StayRoom>) : [Types.StayRoom] {
    rooms.toArray()
  };

  public func addBookedDate(
    rooms : List.List<Types.StayRoom>,
    roomId : Text,
    date : Text,
  ) : Common.Result<(), Text> {
    var found = false;
    rooms.mapInPlace(func(r) {
      if (r.id == roomId) {
        found := true;
        { r with bookedDates = r.bookedDates.concat([date]) }
      } else { r }
    });
    if (found) { #ok(()) } else { #err("Room not found") }
  };
};
