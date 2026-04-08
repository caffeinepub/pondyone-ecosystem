import UserTypes "types/users";
import ListingTypes "types/listings";
import BookingTypes "types/bookings";
import List "mo:core/List";

module {
  // ── Old types (as deployed before this upgrade) ─────────────────────────

  type OldOwnerRecord = {
    id : Text;
    name : Text;
    phone : Text;
    passwordHash : Text;
    role : { #user; #owner; #admin };
    gpsLat : Float;
    gpsLng : Float;
    locationText : Text;
    isBanned : Bool;
    createdAt : Int;
    activityLog : [{ action : Text; timestamp : Int }];
    businessName : Text;
    category : { #food; #stay; #play; #retail };
    upiId : Text;
    isVerified : Bool;
    isActive : Bool;
    // subscriptionStatus / subscriptionExpiryDate / lastSubscriptionPaymentDate / lastSubscriptionTxId absent
  };

  type OldStayRoom = {
    id : Text;
    ownerId : Text;
    roomName : Text;
    amenities : [Text];
    pricePerNight : Nat;
    isAvailable : Bool;
    bookedDates : [Text];
    // checkInDate / checkOutDate absent in old version
  };

  type OldPlaySlot = {
    id : Text;
    ownerId : Text;
    slotTime : Text;
    surfaceType : Text;
    hourlyRate : Nat;
    description : Text;
    isBooked : Bool;
    bookedByUserId : ?Text;
    // slotDate / startTime / endTime absent in old version
  };

  type OldRetailItem = {
    id : Text;
    ownerId : Text;
    itemName : Text;
    priceInr : Nat;
    category : Text;
    inStock : Bool;
    quantity : Nat;
    // deliveryFeePerKm absent in old version
  };

  type OldBooking = {
    id : Text;
    userId : Text;
    ownerId : Text;
    category : { #food; #stay; #play; #retail };
    itemRef : Text;
    amountInr : Nat;
    status : { #pending; #accepted; #declined; #completed };
    upiRef : Text;
    createdAt : Int;
    // checkInDate / checkOutDate / slotDate / deliveryFee absent in old version
  };

  // ── Old actor state ──────────────────────────────────────────────────────

  public type OldActor = {
    owners : List.List<OldOwnerRecord>;
    stayRooms : List.List<OldStayRoom>;
    playSlots : List.List<OldPlaySlot>;
    retailItems : List.List<OldRetailItem>;
    bookings : List.List<OldBooking>;
  };

  // ── New actor state ──────────────────────────────────────────────────────

  public type NewActor = {
    owners : List.List<UserTypes.OwnerRecord>;
    stayRooms : List.List<ListingTypes.StayRoom>;
    playSlots : List.List<ListingTypes.PlaySlot>;
    retailItems : List.List<ListingTypes.RetailItem>;
    bookings : List.List<BookingTypes.Booking>;
  };

  // ── Migration function ───────────────────────────────────────────────────

  public func run(old : OldActor) : NewActor {
    let owners = old.owners.map<OldOwnerRecord, UserTypes.OwnerRecord>(func(o) {
      {
        id = o.id;
        name = o.name;
        phone = o.phone;
        passwordHash = o.passwordHash;
        role = o.role;
        gpsLat = o.gpsLat;
        gpsLng = o.gpsLng;
        locationText = o.locationText;
        isBanned = o.isBanned;
        createdAt = o.createdAt;
        activityLog = o.activityLog;
        businessName = o.businessName;
        category = o.category;
        upiId = o.upiId;
        isVerified = o.isVerified;
        isActive = o.isActive;
        subscriptionStatus = #inactive;
        subscriptionExpiryDate = 0;
        lastSubscriptionPaymentDate = 0;
        lastSubscriptionTxId = "";
      }
    });

    let stayRooms = old.stayRooms.map<OldStayRoom, ListingTypes.StayRoom>(func(r) {
      {
        id = r.id;
        ownerId = r.ownerId;
        roomName = r.roomName;
        amenities = r.amenities;
        pricePerNight = r.pricePerNight;
        isAvailable = r.isAvailable;
        bookedDates = r.bookedDates;
        checkInDate = "";
        checkOutDate = "";
      }
    });

    let playSlots = old.playSlots.map<OldPlaySlot, ListingTypes.PlaySlot>(func(s) {
      {
        id = s.id;
        ownerId = s.ownerId;
        slotTime = s.slotTime;
        slotDate = "";
        startTime = s.slotTime;
        endTime = s.slotTime;
        surfaceType = s.surfaceType;
        hourlyRate = s.hourlyRate;
        description = s.description;
        isBooked = s.isBooked;
        bookedByUserId = s.bookedByUserId;
      }
    });

    let retailItems = old.retailItems.map<OldRetailItem, ListingTypes.RetailItem>(func(i) {
      {
        id = i.id;
        ownerId = i.ownerId;
        itemName = i.itemName;
        priceInr = i.priceInr;
        category = i.category;
        inStock = i.inStock;
        quantity = i.quantity;
        deliveryFeePerKm = 10;
      }
    });

    let bookings = old.bookings.map<OldBooking, BookingTypes.Booking>(func(b) {
      {
        id = b.id;
        userId = b.userId;
        ownerId = b.ownerId;
        category = b.category;
        itemRef = b.itemRef;
        amountInr = b.amountInr;
        status = b.status;
        upiRef = b.upiRef;
        createdAt = b.createdAt;
        checkInDate = "";
        checkOutDate = "";
        slotDate = "";
        deliveryFee = 0;
      }
    });

    { owners; stayRooms; playSlots; retailItems; bookings };
  };
};
