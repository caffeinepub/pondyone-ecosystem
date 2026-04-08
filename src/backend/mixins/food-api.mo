import Common "../types/common";
import ListingTypes "../types/listings";
import FoodLib "../lib/food";
import List "mo:core/List";

mixin (
  foodItems : List.List<ListingTypes.FoodItem>,
  foodCounter : { var count : Nat },
) {
  public func addFoodItem(
    ownerId : Text,
    itemName : Text,
    priceInr : Nat,
    isVeg : Bool,
    description : Text,
  ) : async Common.Result<ListingTypes.FoodItem, Text> {
    foodCounter.count += 1;
    FoodLib.addItem(foodItems, foodCounter.count, ownerId, itemName, priceInr, isVeg, description)
  };

  public func updateFoodItem(
    id : Text,
    itemName : Text,
    priceInr : Nat,
    isVeg : Bool,
    description : Text,
    isAvailable : Bool,
  ) : async Common.Result<(), Text> {
    FoodLib.updateItem(foodItems, id, itemName, priceInr, isVeg, description, isAvailable)
  };

  public func deleteFoodItem(id : Text) : async Common.Result<(), Text> {
    FoodLib.deleteItem(foodItems, id)
  };

  public query func getFoodItemsByOwner(ownerId : Text) : async [ListingTypes.FoodItem] {
    FoodLib.getByOwner(foodItems, ownerId)
  };

  public query func getAllFoodItems() : async [ListingTypes.FoodItem] {
    FoodLib.getAll(foodItems)
  };
};
