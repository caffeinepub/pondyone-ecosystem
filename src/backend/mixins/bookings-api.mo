import Common "../types/common";
import BookingTypes "../types/bookings";
import BookingsLib "../lib/bookings";
import List "mo:core/List";

mixin (
  bookings : List.List<BookingTypes.Booking>,
  bookingCounter : { var count : Nat },
) {
  public func createBooking(
    userId : Text,
    ownerId : Text,
    category : Common.Category,
    itemRef : Text,
    amountInr : Nat,
    upiRef : Text,
    checkInDate : Text,
    checkOutDate : Text,
    slotDate : Text,
    deliveryFee : Nat,
  ) : async Common.Result<BookingTypes.Booking, Text> {
    bookingCounter.count += 1;
    BookingsLib.createBooking(
      bookings, bookingCounter.count,
      userId, ownerId, category, itemRef, amountInr, upiRef,
      checkInDate, checkOutDate, slotDate, deliveryFee
    )
  };

  public func updateBookingStatus(
    id : Text,
    status : Common.BookingStatus,
  ) : async Common.Result<(), Text> {
    BookingsLib.updateStatus(bookings, id, status)
  };

  public query func getBookingsByUser(userId : Text) : async [BookingTypes.Booking] {
    BookingsLib.getByUser(bookings, userId)
  };

  public query func getBookingsByOwner(ownerId : Text) : async [BookingTypes.Booking] {
    BookingsLib.getByOwner(bookings, ownerId)
  };

  public query func getAllBookings() : async [BookingTypes.Booking] {
    BookingsLib.getAll(bookings)
  };
};
