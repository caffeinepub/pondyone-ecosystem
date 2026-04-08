import Common "../types/common";
import Types "../types/platform";
import List "mo:core/List";

module {
  func generateId(counter : Nat) : Text {
    let padded = if (counter < 10) { "00" # counter.toText() }
                 else if (counter < 100) { "0" # counter.toText() }
                 else { counter.toText() };
    "cat_" # padded
  };

  public func addCategory(
    categories : List.List<Types.CategoryEntry>,
    counter : Nat,
    name : Text,
    iconEmoji : Text,
    tableType : Common.Category,
    searchKeywords : [Text],
  ) : Common.Result<Types.CategoryEntry, Text> {
    let id = generateId(counter);
    let entry : Types.CategoryEntry = {
      id;
      name;
      iconEmoji;
      tableType;
      isActive = true;
      searchKeywords;
    };
    categories.add(entry);
    #ok(entry)
  };

  public func updateCategory(
    categories : List.List<Types.CategoryEntry>,
    id : Text,
    name : Text,
    iconEmoji : Text,
    isActive : Bool,
    searchKeywords : [Text],
  ) : Common.Result<(), Text> {
    var found = false;
    categories.mapInPlace(func(c) {
      if (c.id == id) {
        found := true;
        { c with name; iconEmoji; isActive; searchKeywords }
      } else { c }
    });
    if (found) { #ok(()) } else { #err("Category not found") }
  };

  public func deleteCategory(
    categories : List.List<Types.CategoryEntry>,
    id : Text,
  ) : Common.Result<(), Text> {
    let before = categories.size();
    let filtered = categories.filter(func(c) { c.id != id });
    categories.clear();
    categories.append(filtered);
    if (categories.size() < before) { #ok(()) } else { #err("Category not found") }
  };

  public func getActive(categories : List.List<Types.CategoryEntry>) : [Types.CategoryEntry] {
    categories.filter(func(c) { c.isActive }).toArray()
  };

  public func getAll(categories : List.List<Types.CategoryEntry>) : [Types.CategoryEntry] {
    categories.toArray()
  };
};
