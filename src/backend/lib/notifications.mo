import Common "../types/common";
import Types "../types/platform";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  func generateId(counter : Nat) : Text {
    let padded = if (counter < 10) { "00" # counter.toText() }
                 else if (counter < 100) { "0" # counter.toText() }
                 else { counter.toText() };
    "notif_" # padded
  };

  public func createNotification(
    notifications : List.List<Types.Notification>,
    counter : Nat,
    target : Text,
    title : Text,
    body : Text,
    soundType : Common.SoundType,
  ) : Common.Result<Types.Notification, Text> {
    let id = generateId(counter);
    let notif : Types.Notification = {
      id;
      target;
      title;
      body;
      soundType;
      isRead = false;
      createdAt = Time.now();
    };
    notifications.add(notif);
    #ok(notif)
  };

  public func markRead(
    notifications : List.List<Types.Notification>,
    id : Text,
  ) : Common.Result<(), Text> {
    var found = false;
    notifications.mapInPlace(func(n) {
      if (n.id == id) {
        found := true;
        { n with isRead = true }
      } else { n }
    });
    if (found) { #ok(()) } else { #err("Notification not found") }
  };

  public func getByTarget(
    notifications : List.List<Types.Notification>,
    target : Text,
  ) : [Types.Notification] {
    notifications.filter(func(n) {
      n.target == target or n.target == "all_users" or n.target == "all_owners"
    }).toArray()
  };

  public func getAll(notifications : List.List<Types.Notification>) : [Types.Notification] {
    notifications.toArray()
  };
};
