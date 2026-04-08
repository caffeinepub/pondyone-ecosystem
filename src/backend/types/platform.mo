import Common "common";

module {
  public type CategoryEntry = {
    id : Text;
    name : Text;
    iconEmoji : Text;
    tableType : Common.Category;
    isActive : Bool;
    searchKeywords : [Text];
  };

  public type Notification = {
    id : Text;
    target : Text;
    title : Text;
    body : Text;
    soundType : Common.SoundType;
    isRead : Bool;
    createdAt : Common.Timestamp;
  };
};
