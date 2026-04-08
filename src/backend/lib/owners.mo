import Common "../types/common";
import Types "../types/users";
import UserLib "../lib/users";
import List "mo:core/List";
import Time "mo:core/Time";

module {

  public func completeOnboarding(
    users : List.List<Types.UserRecord>,
    owners : List.List<Types.OwnerRecord>,
    userId : Text,
    businessName : Text,
    category : Common.Category,
    upiId : Text,
  ) : Common.Result<Types.OwnerRecord, Text> {
    // Check existing owner
    switch (owners.find(func(o) { o.id == userId })) {
      case (?existing) { return #ok(existing) };
      case null {};
    };
    // Find user record
    switch (users.find(func(u) { u.id == userId })) {
      case (?u) {
        let ownerRecord : Types.OwnerRecord = {
          id = u.id;
          name = u.name;
          phone = u.phone;
          passwordHash = u.passwordHash;
          role = #owner;
          gpsLat = u.gpsLat;
          gpsLng = u.gpsLng;
          locationText = u.locationText;
          isBanned = u.isBanned;
          createdAt = u.createdAt;
          activityLog = u.activityLog;
          businessName;
          category;
          upiId;
          isVerified = false;
          isActive = true;
          subscriptionStatus = #inactive;
          subscriptionExpiryDate = 0;
          lastSubscriptionPaymentDate = 0;
          lastSubscriptionTxId = "";
        };
        owners.add(ownerRecord);
        // Update user role in users list
        users.mapInPlace(func(rec) {
          if (rec.id == userId) { { rec with role = #owner } } else { rec }
        });
        #ok(ownerRecord)
      };
      case null { #err("User not found") };
    }
  };

  public func getOwnerById(
    owners : List.List<Types.OwnerRecord>,
    id : Text,
  ) : ?Types.OwnerRecord {
    owners.find(func(o) { o.id == id })
  };

  public func updateOwnerProfile(
    owners : List.List<Types.OwnerRecord>,
    id : Text,
    businessName : Text,
    upiId : Text,
    isActive : Bool,
  ) : Common.Result<(), Text> {
    var found = false;
    owners.mapInPlace(func(o) {
      if (o.id == id) {
        found := true;
        { o with businessName; upiId; isActive }
      } else { o }
    });
    if (found) { #ok(()) } else { #err("Owner not found") }
  };

  public func getOwnersByCategory(
    owners : List.List<Types.OwnerRecord>,
    category : Common.Category,
  ) : [Types.OwnerRecord] {
    owners.filter(func(o) { o.category == category and o.subscriptionStatus == #active }).toArray()
  };

  public func getAllOwners(owners : List.List<Types.OwnerRecord>) : [Types.OwnerRecord] {
    owners.toArray()
  };

  public func getActiveOwners(owners : List.List<Types.OwnerRecord>) : [Types.OwnerRecord] {
    owners.filter(func(o) { o.subscriptionStatus == #active }).toArray()
  };

  public func verifyOwner(
    owners : List.List<Types.OwnerRecord>,
    id : Text,
  ) : Common.Result<(), Text> {
    var found = false;
    owners.mapInPlace(func(o) {
      if (o.id == id) {
        found := true;
        { o with isVerified = true }
      } else { o }
    });
    if (found) { #ok(()) } else { #err("Owner not found") }
  };

  public func updateSubscriptionStatus(
    owners : List.List<Types.OwnerRecord>,
    ownerId : Text,
    subscriptionStatus : Types.SubscriptionStatus,
    expiryDate : Common.Timestamp,
    txId : Text,
  ) : Common.Result<(), Text> {
    var found = false;
    owners.mapInPlace(func(o) {
      if (o.id == ownerId) {
        found := true;
        { o with subscriptionStatus; subscriptionExpiryDate = expiryDate; lastSubscriptionTxId = txId }
      } else { o }
    });
    if (found) { #ok(()) } else { #err("Owner not found") }
  };

  public func verifySubscriptionPayment(
    owners : List.List<Types.OwnerRecord>,
    ownerId : Text,
    txId : Text,
  ) : Common.Result<(), Text> {
    var found = false;
    let thirtyDaysNs : Int = 30 * 24 * 60 * 60 * 1_000_000_000;
    let now = Time.now();
    let expiryDate = now + thirtyDaysNs;
    owners.mapInPlace(func(o) {
      if (o.id == ownerId) {
        found := true;
        {
          o with
          subscriptionStatus = #active;
          subscriptionExpiryDate = expiryDate;
          lastSubscriptionTxId = txId;
          lastSubscriptionPaymentDate = now;
          isVerified = true;
        }
      } else { o }
    });
    if (found) { #ok(()) } else { #err("Owner not found") }
  };
};
