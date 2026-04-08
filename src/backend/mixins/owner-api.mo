import Common "../types/common";
import UserTypes "../types/users";
import OwnerLib "../lib/owners";
import List "mo:core/List";

mixin (
  users : List.List<UserTypes.UserRecord>,
  owners : List.List<UserTypes.OwnerRecord>,
) {
  public func completeOwnerOnboarding(
    userId : Text,
    businessName : Text,
    category : Common.Category,
    upiId : Text,
  ) : async Common.Result<UserTypes.OwnerRecord, Text> {
    OwnerLib.completeOnboarding(users, owners, userId, businessName, category, upiId)
  };

  public query func getOwnerById(id : Text) : async ?UserTypes.OwnerRecord {
    OwnerLib.getOwnerById(owners, id)
  };

  public func updateOwnerProfile(
    id : Text,
    businessName : Text,
    upiId : Text,
    isActive : Bool,
  ) : async Common.Result<(), Text> {
    OwnerLib.updateOwnerProfile(owners, id, businessName, upiId, isActive)
  };

  public query func getOwnersByCategory(category : Common.Category) : async [UserTypes.OwnerRecord] {
    OwnerLib.getOwnersByCategory(owners, category)
  };

  public query func getAllOwners() : async [UserTypes.OwnerRecord] {
    OwnerLib.getAllOwners(owners)
  };

  public func verifyOwner(id : Text) : async Common.Result<(), Text> {
    OwnerLib.verifyOwner(owners, id)
  };
};
