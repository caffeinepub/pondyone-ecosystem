import Common "../types/common";
import Types "../types/listings";
import List "mo:core/List";

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

  public func getByOwner(
    items : List.List<Types.RetailItem>,
    ownerId : Text,
  ) : [Types.RetailItem] {
    items.filter(func(i) { i.ownerId == ownerId }).toArray()
  };

  public func getAll(items : List.List<Types.RetailItem>) : [Types.RetailItem] {
    items.toArray()
  };
};
