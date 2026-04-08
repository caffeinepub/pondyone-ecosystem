import Common "../types/common";
import UserTypes "../types/users";
import BookingTypes "../types/bookings";
import AdminLib "../lib/admin";
import List "mo:core/List";

mixin (
  users : List.List<UserTypes.UserRecord>,
  owners : List.List<UserTypes.OwnerRecord>,
  bookings : List.List<BookingTypes.Booking>,
) {
  public func banUser(id : Text, isBanned : Bool) : async Common.Result<(), Text> {
    AdminLib.banUser(users, owners, id, isBanned)
  };

  public func deleteUser(id : Text) : async Common.Result<(), Text> {
    AdminLib.deleteUser(users, id)
  };

  public func deleteOwner(id : Text) : async Common.Result<(), Text> {
    AdminLib.deleteOwner(owners, id)
  };

  public query func getAllUsers() : async [UserTypes.UserRecord] {
    AdminLib.getAllUsers(users)
  };

  public query func getAllOwnersAdmin() : async [UserTypes.OwnerRecord] {
    AdminLib.getAllOwners(owners)
  };

  public query func getAdminStats() : async UserTypes.AdminStats {
    AdminLib.getAdminStats(users, owners, bookings)
  };

  public query func getRevenueByOwner() : async [UserTypes.OwnerRevenue] {
    AdminLib.getRevenueByOwner(owners, bookings)
  };
};
