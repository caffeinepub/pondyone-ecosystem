import Common "common";

module {
  public type Booking = {
    id : Text;
    userId : Text;
    ownerId : Text;
    category : Common.Category;
    itemRef : Text;
    amountInr : Nat;
    status : Common.BookingStatus;
    upiRef : Text;
    createdAt : Common.Timestamp;
    checkInDate : Text;
    checkOutDate : Text;
    slotDate : Text;
    deliveryFee : Nat;
  };
};
