import Common "../types/common";
import PlatformTypes "../types/platform";
import NotificationsLib "../lib/notifications";
import List "mo:core/List";

mixin (
  notifications : List.List<PlatformTypes.Notification>,
  notificationCounter : { var count : Nat },
) {
  public func createNotification(
    target : Text,
    title : Text,
    body : Text,
    soundType : Common.SoundType,
  ) : async Common.Result<PlatformTypes.Notification, Text> {
    notificationCounter.count += 1;
    NotificationsLib.createNotification(notifications, notificationCounter.count, target, title, body, soundType)
  };

  public func markNotificationRead(id : Text) : async Common.Result<(), Text> {
    NotificationsLib.markRead(notifications, id)
  };

  public query func getNotificationsByTarget(target : Text) : async [PlatformTypes.Notification] {
    NotificationsLib.getByTarget(notifications, target)
  };

  public query func getAllNotifications() : async [PlatformTypes.Notification] {
    NotificationsLib.getAll(notifications)
  };
};
