import Common "../types/common";
import Types "../types/listings";
import List "mo:core/List";

module {
  func generateId(counter : Nat) : Text {
    let padded = if (counter < 10) { "00" # counter.toText() }
                 else if (counter < 100) { "0" # counter.toText() }
                 else { counter.toText() };
    "food_" # padded
  };

  public func addItem(
    items : List.List<Types.FoodItem>,
    counter : Nat,
    ownerId : Text,
    itemName : Text,
    priceInr : Nat,
    isVeg : Bool,
    description : Text,
  ) : Common.Result<Types.FoodItem, Text> {
    let id = generateId(counter);
    let item : Types.FoodItem = {
      id;
      ownerId;
      itemName;
      priceInr;
      isVeg;
      description;
      isAvailable = true;
    };
    items.add(item);
    #ok(item)
  };

  public func updateItem(
    items : List.List<Types.FoodItem>,
    id : Text,
    itemName : Text,
    priceInr : Nat,
    isVeg : Bool,
    description : Text,
    isAvailable : Bool,
  ) : Common.Result<(), Text> {
    var found = false;
    items.mapInPlace(func(item) {
      if (item.id == id) {
        found := true;
        { item with itemName; priceInr; isVeg; description; isAvailable }
      } else { item }
    });
    if (found) { #ok(()) } else { #err("Item not found") }
  };

  public func deleteItem(
    items : List.List<Types.FoodItem>,
    id : Text,
  ) : Common.Result<(), Text> {
    let before = items.size();
    let filtered = items.filter(func(i) { i.id != id });
    items.clear();
    items.append(filtered);
    if (items.size() < before) { #ok(()) } else { #err("Item not found") }
  };

  public func getByOwner(
    items : List.List<Types.FoodItem>,
    ownerId : Text,
  ) : [Types.FoodItem] {
    items.filter(func(i) { i.ownerId == ownerId }).toArray()
  };

  public func getAll(items : List.List<Types.FoodItem>) : [Types.FoodItem] {
    items.toArray()
  };
};
