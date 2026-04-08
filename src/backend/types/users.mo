import Common "common";

module {
  public type UserRecord = {
    id : Common.UserId;
    name : Text;
    phone : Text;
    passwordHash : Text;
    role : Common.UserRole;
    gpsLat : Float;
    gpsLng : Float;
    locationText : Text;
    isBanned : Bool;
    createdAt : Common.Timestamp;
    activityLog : [Common.ActivityEntry];
  };

  public type OwnerRecord = {
    id : Common.UserId;
    name : Text;
    phone : Text;
    passwordHash : Text;
    role : Common.UserRole;
    gpsLat : Float;
    gpsLng : Float;
    locationText : Text;
    isBanned : Bool;
    createdAt : Common.Timestamp;
    activityLog : [Common.ActivityEntry];
    businessName : Text;
    category : Common.Category;
    upiId : Text;
    isVerified : Bool;
    isActive : Bool;
  };

  public type AdminStats = {
    totalUsers : Nat;
    totalOwners : Nat;
    todayBookings : Nat;
    platformRevenue : Nat;
  };

  public type OwnerRevenue = {
    ownerId : Text;
    businessName : Text;
    totalRevenue : Nat;
    todayRevenue : Nat;
  };
};
