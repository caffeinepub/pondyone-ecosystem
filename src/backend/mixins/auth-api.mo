import Common "../types/common";
import UserTypes "../types/users";
import UserLib "../lib/users";
import OwnerLib "../lib/owners";
import List "mo:core/List";

mixin (
  users : List.List<UserTypes.UserRecord>,
  owners : List.List<UserTypes.OwnerRecord>,
  userCounter : { var count : Nat },
) {
  public func signupUser(
    name : Text,
    phone : Text,
    password : Text,
    role : Common.UserRole,
    gpsLat : Float,
    gpsLng : Float,
    locationText : Text,
  ) : async Common.Result<UserTypes.UserRecord, Text> {
    userCounter.count += 1;
    UserLib.signup(users, owners, name, phone, password, role, gpsLat, gpsLng, locationText)
  };

  public func signinUser(
    phone : Text,
    password : Text,
  ) : async Common.Result<UserTypes.UserRecord, Text> {
    UserLib.signin(users, owners, phone, password)
  };

  public query func getUserById(id : Text) : async ?UserTypes.UserRecord {
    UserLib.getUserById(users, owners, id)
  };

  public func updateUserProfile(
    id : Text,
    name : Text,
    locationText : Text,
    gpsLat : Float,
    gpsLng : Float,
  ) : async Common.Result<(), Text> {
    UserLib.updateProfile(users, owners, id, name, locationText, gpsLat, gpsLng)
  };

  public func logActivity(userId : Text, action : Text) : async () {
    UserLib.logActivity(users, owners, userId, action)
  };
};
