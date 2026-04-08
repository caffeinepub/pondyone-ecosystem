import Common "../types/common";
import Types "../types/bookings";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  func generateId(counter : Nat) : Text {
    let padded = if (counter < 10) { "00" # counter.toText() }
                 else if (counter < 100) { "0" # counter.toText() }
                 else { counter.toText() };
    "booking_" # padded
  };

  public func createBooking(
    bookings : List.List<Types.Booking>,
    counter : Nat,
    userId : Text,
    ownerId : Text,
    category : Common.Category,
    itemRef : Text,
    amountInr : Nat,
    upiRef : Text,
  ) : Common.Result<Types.Booking, Text> {
    let id = generateId(counter);
    let booking : Types.Booking = {
      id;
      userId;
      ownerId;
      category;
      itemRef;
      amountInr;
      status = #pending;
      upiRef;
      createdAt = Time.now();
    };
    bookings.add(booking);
    #ok(booking)
  };

  public func updateStatus(
    bookings : List.List<Types.Booking>,
    id : Text,
    status : Common.BookingStatus,
  ) : Common.Result<(), Text> {
    var found = false;
    bookings.mapInPlace(func(b) {
      if (b.id == id) {
        found := true;
        { b with status }
      } else { b }
    });
    if (found) { #ok(()) } else { #err("Booking not found") }
  };

  public func getByUser(
    bookings : List.List<Types.Booking>,
    userId : Text,
  ) : [Types.Booking] {
    bookings.filter(func(b) { b.userId == userId }).toArray()
  };

  public func getByOwner(
    bookings : List.List<Types.Booking>,
    ownerId : Text,
  ) : [Types.Booking] {
    bookings.filter(func(b) { b.ownerId == ownerId }).toArray()
  };

  public func getAll(bookings : List.List<Types.Booking>) : [Types.Booking] {
    bookings.toArray()
  };
};
