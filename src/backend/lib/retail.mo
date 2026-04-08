import Common "../types/common";
import Types "../types/listings";
import UserTypes "../types/users";
import List "mo:core/List";
import Float "mo:core/Float";

module {
  func generateId(counter : Nat) : Text {
    let padded = if (counter < 10) { "00" # counter.toText() }
                 else if (counter < 100) { "0" # counter.toText() }
                 else { counter.toText() };
    "retail_" # padded
  };

  public func addItem(
    items : List.List<Types.RetailItem>,
    counter : Nat,
    ownerId : Text,
    itemName : Text,
    priceInr : Nat,
    category : Text,
    quantity : Nat,
  ) : Common.Result<Types.RetailItem, Text> {
    let id = generateId(counter);
    let item : Types.RetailItem = {
      id;
      ownerId;
      itemName;
      priceInr;
      category;
      inStock = quantity > 0;
      quantity;
      deliveryFeePerKm = 10; // default ₹10/km
    };
    items.add(item);
    #ok(item)
  };

  public func updateItem(
    items : List.List<Types.RetailItem>,
    id : Text,
    itemName : Text,
    priceInr : Nat,
    category : Text,
    inStock : Bool,
    quantity : Nat,
  ) : Common.Result<(), Text> {
    var found = false;
    items.mapInPlace(func(item) {
      if (item.id == id) {
        found := true;
        { item with itemName; priceInr; category; inStock; quantity }
      } else { item }
    });
    if (found) { #ok(()) } else { #err("Item not found") }
  };

  public func setDeliveryFeeOnItems(
    items : List.List<Types.RetailItem>,
    ownerId : Text,
    rate : Nat,
  ) : Common.Result<(), Text> {
    var found = false;
    items.mapInPlace(func(item) {
      if (item.ownerId == ownerId) {
        found := true;
        { item with deliveryFeePerKm = rate }
      } else { item }
    });
    if (found) { #ok(()) } else { #err("No items found for owner") }
  };

  public func getByOwner(
    items : List.List<Types.RetailItem>,
    ownerId : Text,
  ) : [Types.RetailItem] {
    items.filter(func(i) { i.ownerId == ownerId }).toArray()
  };

  public func getAll(items : List.List<Types.RetailItem>) : [Types.RetailItem] {
    items.toArray()
  };

  // Haversine distance in km
  public func haversineKm(lat1 : Float, lng1 : Float, lat2 : Float, lng2 : Float) : Float {
    let r : Float = 6371.0;
    let dLat = (lat2 - lat1) * Float.pi / 180.0;
    let dLng = (lng2 - lng1) * Float.pi / 180.0;
    let a = Float.sin(dLat / 2.0) * Float.sin(dLat / 2.0)
          + Float.cos(lat1 * Float.pi / 180.0) * Float.cos(lat2 * Float.pi / 180.0)
          * Float.sin(dLng / 2.0) * Float.sin(dLng / 2.0);
    let c = 2.0 * Float.arctan2(Float.sqrt(a), Float.sqrt(1.0 - a));
    r * c
  };

  // Compute delivery fee for a customer location vs owner location
  public func computeDeliveryFee(
    items : List.List<Types.RetailItem>,
    owners : List.List<UserTypes.OwnerRecord>,
    ownerId : Text,
    customerLat : Float,
    customerLng : Float,
  ) : Nat {
    switch (owners.find(func(o) { o.id == ownerId })) {
      case null { 0 };
      case (?owner) {
        let distKm = haversineKm(customerLat, customerLng, owner.gpsLat, owner.gpsLng);
        // Get deliveryFeePerKm from owner's items (first item, or default 10)
        let ratePerKm : Nat = switch (items.find(func(i) { i.ownerId == ownerId })) {
          case null { 10 };
          case (?item) { item.deliveryFeePerKm };
        };
        let fee = distKm * ratePerKm.toFloat();
        let feeInt = fee.toInt();
        if (feeInt < 0) { 0 } else { feeInt.toNat() }
      };
    }
  };
};
