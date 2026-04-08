import Common "../types/common";
import UserTypes "../types/users";
import BookingTypes "../types/bookings";
import List "mo:core/List";
import Time "mo:core/Time";
import Int "mo:core/Int";

module {
  public func banUser(
    users : List.List<UserTypes.UserRecord>,
    owners : List.List<UserTypes.OwnerRecord>,
    id : Text,
    isBanned : Bool,
  ) : Common.Result<(), Text> {
    var found = false;
    users.mapInPlace(func(u) {
      if (u.id == id) {
        found := true;
        { u with isBanned }
      } else { u }
    });
    if (found) { return #ok(()) };
    owners.mapInPlace(func(o) {
      if (o.id == id) {
        found := true;
        { o with isBanned }
      } else { o }
    });
    if (found) { #ok(()) } else { #err("User not found") }
  };

  public func getAllUsers(users : List.List<UserTypes.UserRecord>) : [UserTypes.UserRecord] {
    users.toArray()
  };

  public func getAdminStats(
    users : List.List<UserTypes.UserRecord>,
    owners : List.List<UserTypes.OwnerRecord>,
    bookings : List.List<BookingTypes.Booking>,
  ) : UserTypes.AdminStats {
    let now = Time.now();
    // nanoseconds per day
    let dayNs : Int = 86_400_000_000_000;
    let dayStart = now - (now % dayNs);
    let todayBookings = bookings.filter(func(b) {
      b.createdAt >= dayStart
    }).size();
    let platformRevenue = bookings.filter(func(b) {
      b.status == #completed
    }).foldLeft(0, func(acc : Nat, b : BookingTypes.Booking) : Nat {
      acc + b.amountInr
    });
    {
      totalUsers = users.size();
      totalOwners = owners.size();
      todayBookings;
      platformRevenue;
    }
  };

  public func getRevenueByOwner(
    owners : List.List<UserTypes.OwnerRecord>,
    bookings : List.List<BookingTypes.Booking>,
  ) : [UserTypes.OwnerRevenue] {
    owners.map<UserTypes.OwnerRecord, UserTypes.OwnerRevenue>(func(o) {
      let ownerBookings = bookings.filter(func(b) {
        b.ownerId == o.id and b.status == #completed
      });
      let totalRevenue = ownerBookings.foldLeft(0, func(acc : Nat, b : BookingTypes.Booking) : Nat {
        acc + b.amountInr
      });
      {
        ownerId = o.id;
        businessName = o.businessName;
        totalRevenue;
        todayRevenue = 0; // simplified
      }
    }).toArray()
  };
};
