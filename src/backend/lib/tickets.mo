import Common "../types/common";
import Types "../types/support";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  func generateId(counter : Nat) : Text {
    let padded = if (counter < 10) { "00" # counter.toText() }
                 else if (counter < 100) { "0" # counter.toText() }
                 else { counter.toText() };
    "ticket_" # padded
  };

  public func createTicket(
    tickets : List.List<Types.Ticket>,
    counter : Nat,
    raisedBy : Text,
    ownerId : ?Text,
    category : Text,
    description : Text,
    imageUrl : ?Text,
  ) : Common.Result<Types.Ticket, Text> {
    let id = generateId(counter);
    let ticket : Types.Ticket = {
      id;
      raisedBy;
      ownerId;
      category;
      description;
      imageUrl;
      status = #open;
      messages = [];
      createdAt = Time.now();
    };
    tickets.add(ticket);
    #ok(ticket)
  };

  public func addMessage(
    tickets : List.List<Types.Ticket>,
    ticketId : Text,
    sender : Text,
    text : Text,
  ) : Common.Result<(), Text> {
    var found = false;
    let msg : Common.TicketMessage = { sender; text; timestamp = Time.now() };
    tickets.mapInPlace(func(t) {
      if (t.id == ticketId) {
        found := true;
        { t with messages = t.messages.concat([msg]) }
      } else { t }
    });
    if (found) { #ok(()) } else { #err("Ticket not found") }
  };

  public func resolveTicket(
    tickets : List.List<Types.Ticket>,
    id : Text,
  ) : Common.Result<(), Text> {
    var found = false;
    tickets.mapInPlace(func(t) {
      if (t.id == id) {
        found := true;
        { t with status = #resolved }
      } else { t }
    });
    if (found) { #ok(()) } else { #err("Ticket not found") }
  };

  public func getByUser(
    tickets : List.List<Types.Ticket>,
    userId : Text,
  ) : [Types.Ticket] {
    tickets.filter(func(t) { t.raisedBy == userId }).toArray()
  };

  public func getByOwner(
    tickets : List.List<Types.Ticket>,
    ownerId : Text,
  ) : [Types.Ticket] {
    tickets.filter(func(t) {
      switch (t.ownerId) {
        case (?id) { id == ownerId };
        case null { false };
      }
    }).toArray()
  };

  public func getAll(tickets : List.List<Types.Ticket>) : [Types.Ticket] {
    tickets.toArray()
  };
};
