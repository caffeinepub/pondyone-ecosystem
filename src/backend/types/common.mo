module {
  public type UserId = Text;
  public type Timestamp = Int;

  public type UserRole = { #user; #owner; #admin };
  public type Category = { #food; #stay; #play; #retail };
  public type BookingStatus = { #pending; #accepted; #declined; #completed };
  public type TicketStatus = { #open; #resolved };
  public type SoundType = { #ping; #alarm; #silent };

  public type ActivityEntry = {
    action : Text;
    timestamp : Timestamp;
  };

  public type TicketMessage = {
    sender : Text;
    text : Text;
    timestamp : Timestamp;
  };

  public type Result<T, E> = { #ok : T; #err : E };
};
