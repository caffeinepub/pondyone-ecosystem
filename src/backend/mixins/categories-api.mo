import Common "../types/common";
import PlatformTypes "../types/platform";
import CategoriesLib "../lib/categories";
import List "mo:core/List";

mixin (
  categories : List.List<PlatformTypes.CategoryEntry>,
  categoryCounter : { var count : Nat },
) {
  public func addCategory(
    name : Text,
    iconEmoji : Text,
    tableType : Common.Category,
    searchKeywords : [Text],
  ) : async Common.Result<PlatformTypes.CategoryEntry, Text> {
    categoryCounter.count += 1;
    CategoriesLib.addCategory(categories, categoryCounter.count, name, iconEmoji, tableType, searchKeywords)
  };

  public func updateCategory(
    id : Text,
    name : Text,
    iconEmoji : Text,
    isActive : Bool,
    searchKeywords : [Text],
  ) : async Common.Result<(), Text> {
    CategoriesLib.updateCategory(categories, id, name, iconEmoji, isActive, searchKeywords)
  };

  public func deleteCategory(id : Text) : async Common.Result<(), Text> {
    CategoriesLib.deleteCategory(categories, id)
  };

  public query func getActiveCategories() : async [PlatformTypes.CategoryEntry] {
    CategoriesLib.getActive(categories)
  };

  public query func getAllCategories() : async [PlatformTypes.CategoryEntry] {
    CategoriesLib.getAll(categories)
  };
};
