import Common "common";

module {
  public type Ticket = {
    id : Text;
    raisedBy : Text;
    ownerId : ?Text;
    category : Text;
    description : Text;
    imageUrl : ?Text;
    status : Common.TicketStatus;
    messages : [Common.TicketMessage];
    createdAt : Common.Timestamp;
  };
};
