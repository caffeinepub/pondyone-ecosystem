import Common "../types/common";
import ListingTypes "../types/listings";
import UserTypes "../types/users";
import RetailLib "../lib/retail";
import List "mo:core/List";

mixin (
  retailItems : List.List<ListingTypes.RetailItem>,
  retailCounter : { var count : Nat },
  owners : List.List<UserTypes.OwnerRecord>,
) {
  public func addRetailItem(
    ownerId : Text,
    itemName : Text,
    priceInr : Nat,
    category : Text,
    quantity : Nat,
  ) : async Common.Result<ListingTypes.RetailItem, Text> {
    retailCounter.count += 1;
    RetailLib.addItem(retailItems, retailCounter.count, ownerId, itemName, priceInr, category, quantity)
  };

  public func updateRetailItem(
    id : Text,
    itemName : Text,
    priceInr : Nat,
    category : Text,
    inStock : Bool,
    quantity : Nat,
  ) : async Common.Result<(), Text> {
    RetailLib.updateItem(retailItems, id, itemName, priceInr, category, inStock, quantity)
  };

  // Owner configures delivery fee rate (₹ per km) — applies to all their items
  public func updateDeliveryFeePerKm(ownerId : Text, rate : Nat) : async Common.Result<(), Text> {
    RetailLib.setDeliveryFeeOnItems(retailItems, ownerId, rate)
  };

  // Compute delivery fee for customer at given coordinates ordering from this owner
  public query func getDeliveryFee(
    ownerId : Text,
    customerLat : Float,
    customerLng : Float,
  ) : async Nat {
    RetailLib.computeDeliveryFee(retailItems, owners, ownerId, customerLat, customerLng)
  };

  public query func getRetailItemsByOwner(ownerId : Text) : async [ListingTypes.RetailItem] {
    RetailLib.getByOwner(retailItems, ownerId)
  };

  // Customer-facing: only items belonging to active (subscribed) owners
  public query func getAllRetailItems() : async [ListingTypes.RetailItem] {
    let activeOwnerIds = owners.filter(func(o) { o.subscriptionStatus == #active })
      .map(func(o : UserTypes.OwnerRecord) : Text { o.id });
    retailItems.filter(func(i) {
      activeOwnerIds.find(func(id) { id == i.ownerId }) != null
    }).toArray()
  };
};
