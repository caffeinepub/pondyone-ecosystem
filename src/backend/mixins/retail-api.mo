import Common "../types/common";
import ListingTypes "../types/listings";
import RetailLib "../lib/retail";
import List "mo:core/List";

mixin (
  retailItems : List.List<ListingTypes.RetailItem>,
  retailCounter : { var count : Nat },
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

  public query func getRetailItemsByOwner(ownerId : Text) : async [ListingTypes.RetailItem] {
    RetailLib.getByOwner(retailItems, ownerId)
  };

  public query func getAllRetailItems() : async [ListingTypes.RetailItem] {
    RetailLib.getAll(retailItems)
  };
};
