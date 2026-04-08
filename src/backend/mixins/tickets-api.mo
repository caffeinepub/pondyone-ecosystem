import Common "../types/common";
import SupportTypes "../types/support";
import TicketsLib "../lib/tickets";
import List "mo:core/List";

mixin (
  tickets : List.List<SupportTypes.Ticket>,
  ticketCounter : { var count : Nat },
) {
  public func createTicket(
    raisedBy : Text,
    ownerId : ?Text,
    category : Text,
    description : Text,
    imageUrl : ?Text,
  ) : async Common.Result<SupportTypes.Ticket, Text> {
    ticketCounter.count += 1;
    TicketsLib.createTicket(tickets, ticketCounter.count, raisedBy, ownerId, category, description, imageUrl)
  };

  public func addTicketMessage(
    ticketId : Text,
    sender : Text,
    text : Text,
  ) : async Common.Result<(), Text> {
    TicketsLib.addMessage(tickets, ticketId, sender, text)
  };

  public func resolveTicket(id : Text) : async Common.Result<(), Text> {
    TicketsLib.resolveTicket(tickets, id)
  };

  public query func getTicketsByUser(userId : Text) : async [SupportTypes.Ticket] {
    TicketsLib.getByUser(tickets, userId)
  };

  public query func getTicketsByOwner(ownerId : Text) : async [SupportTypes.Ticket] {
    TicketsLib.getByOwner(tickets, ownerId)
  };

  public query func getAllTickets() : async [SupportTypes.Ticket] {
    TicketsLib.getAll(tickets)
  };
};
