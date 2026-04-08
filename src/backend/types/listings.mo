module {
  public type FoodItem = {
    id : Text;
    ownerId : Text;
    itemName : Text;
    priceInr : Nat;
    isVeg : Bool;
    description : Text;
    isAvailable : Bool;
  };

  public type StayRoom = {
    id : Text;
    ownerId : Text;
    roomName : Text;
    amenities : [Text];
    pricePerNight : Nat;
    isAvailable : Bool;
    bookedDates : [Text];
  };

  public type PlaySlot = {
    id : Text;
    ownerId : Text;
    slotTime : Text;
    surfaceType : Text;
    hourlyRate : Nat;
    description : Text;
    isBooked : Bool;
    bookedByUserId : ?Text;
  };

  public type RetailItem = {
    id : Text;
    ownerId : Text;
    itemName : Text;
    priceInr : Nat;
    category : Text;
    inStock : Bool;
    quantity : Nat;
  };
};
