import { useState } from "react";
import { StatusBadge } from "../../components/ui/AppBadge";
import { AppButton } from "../../components/ui/AppButton";
import { AppModal } from "../../components/ui/AppModal";
import {
  useAddTicketMessage,
  useCreateTicket,
  useTicketsByUser,
} from "../../hooks/useQueries";
import type { Ticket } from "../../hooks/useQueries";
import { getSession } from "../../lib/auth";
import { SAFFRON } from "../../lib/constants";
import type { UserRoute } from "./UserApp";

interface Props {
  navigate: (r: UserRoute) => void;
}

const TICKET_CATEGORIES = ["Food", "Stay", "Play", "Retail", "Other"];

export default function UserTickets({ navigate: _navigate }: Props) {
  const session = getSession();
  const { data: tickets = [], isLoading } = useTicketsByUser(
    session?.userId ?? "",
  );
  const createTicket = useCreateTicket();
  const addMessage = useAddTicketMessage();

  const [showNewForm, setShowNewForm] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [newMsg, setNewMsg] = useState("");

  // New ticket form state
  const [description, setDescription] = useState("");
  const [ticketCategory, setTicketCategory] = useState("Other");
  const [imageUrl, setImageUrl] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      setFormError("Please describe your issue.");
      return;
    }
    if (!session) return;
    setFormError("");
    try {
      const result = await createTicket.mutateAsync({
        raisedBy: session.userId,
        ownerId: null,
        category: ticketCategory,
        description: description.trim(),
        imageUrl: imageUrl.trim() || null,
      });
      if (result.__kind__ === "ok") {
        setShowNewForm(false);
        setDescription("");
        setImageUrl("");
        setTicketCategory("Other");
      } else {
        setFormError(result.err ?? "Failed to create ticket.");
      }
    } catch {
      setFormError("Failed to create ticket. Please try again.");
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim() || !selectedTicket || !session) return;
    await addMessage.mutateAsync({
      ticketId: selectedTicket.id,
      sender: session.name,
      text: newMsg.trim(),
    });
    setNewMsg("");
  };

  const sortedTickets = [...tickets].sort((a, b) =>
    Number(b.createdAt - a.createdAt),
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-30 shadow-subtle">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-base font-bold font-display text-foreground">
            Support
          </h1>
          <AppButton
            size="sm"
            onClick={() => setShowNewForm(true)}
            data-ocid="new-ticket-btn"
          >
            + New Ticket
          </AppButton>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-4">
        {isLoading ? (
          <div className="flex flex-col gap-3">
            {(["tsk1", "tsk2"] as const).map((id) => (
              <div
                key={id}
                className="h-20 bg-muted rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : sortedTickets.length === 0 ? (
          <div className="text-center py-16" data-ocid="tickets-empty-state">
            <p className="text-4xl mb-3">🎫</p>
            <p className="font-semibold text-foreground mb-1">
              No support tickets
            </p>
            <p className="text-sm text-muted-foreground mb-5">
              Need help? Raise a ticket and we'll assist you.
            </p>
            <AppButton onClick={() => setShowNewForm(true)}>
              Raise a Ticket
            </AppButton>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {sortedTickets.map((ticket) => (
              <button
                key={ticket.id}
                type="button"
                className="bg-card rounded-2xl shadow-card border border-border p-4 text-left w-full transition-smooth hover:shadow-elevated active:scale-[0.99]"
                onClick={() => setSelectedTicket(ticket)}
                data-ocid={`ticket-item-${ticket.id.slice(0, 6)}`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="font-semibold text-sm text-foreground truncate flex-1">
                    {ticket.description.slice(0, 60)}
                    {ticket.description.length > 60 ? "…" : ""}
                  </p>
                  <StatusBadge status={ticket.status as "open" | "resolved"} />
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="px-2 py-0.5 rounded-full bg-muted font-medium">
                    {ticket.category}
                  </span>
                  <span>
                    {ticket.messages.length} message
                    {ticket.messages.length !== 1 ? "s" : ""}
                  </span>
                  <span className="ml-auto">
                    {new Date(
                      Number(ticket.createdAt / 1_000_000n),
                    ).toLocaleDateString("en-IN")}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* New ticket modal */}
      <AppModal
        isOpen={showNewForm}
        onClose={() => setShowNewForm(false)}
        title="Raise a Support Ticket"
      >
        <form onSubmit={handleSubmitTicket} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="ticket-category"
            >
              Category
            </label>
            <select
              id="ticket-category"
              value={ticketCategory}
              onChange={(e) => setTicketCategory(e.target.value)}
              data-ocid="ticket-category-select"
              className="h-11 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {TICKET_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="ticket-desc"
            >
              Describe your issue *
            </label>
            <textarea
              id="ticket-desc"
              rows={4}
              placeholder="Tell us what happened…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              data-ocid="ticket-description"
              className="px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="ticket-image"
            >
              Image URL (optional)
            </label>
            <input
              id="ticket-image"
              type="url"
              placeholder="https://…"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {formError && <p className="text-xs text-destructive">{formError}</p>}

          <AppButton
            type="submit"
            fullWidth
            disabled={createTicket.isPending}
            data-ocid="ticket-submit"
          >
            {createTicket.isPending ? "Submitting…" : "Submit Ticket"}
          </AppButton>
        </form>
      </AppModal>

      {/* Ticket thread modal */}
      {selectedTicket && (
        <AppModal
          isOpen={!!selectedTicket}
          onClose={() => setSelectedTicket(null)}
          title={`Ticket #${selectedTicket.id.slice(0, 8)}`}
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full bg-muted text-xs font-medium">
                {selectedTicket.category}
              </span>
              <StatusBadge
                status={selectedTicket.status as "open" | "resolved"}
              />
            </div>

            <p className="text-sm text-foreground bg-muted/40 rounded-xl p-3">
              {selectedTicket.description}
            </p>

            {/* Messages */}
            <div className="flex flex-col gap-2 max-h-52 overflow-y-auto">
              {selectedTicket.messages.map((msg) => {
                const isUser = msg.sender === session?.name;
                return (
                  <div
                    key={`${msg.timestamp}-${msg.sender}`}
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className="max-w-[80%] rounded-2xl px-3 py-2 text-sm"
                      style={
                        isUser
                          ? { backgroundColor: SAFFRON, color: "#fff" }
                          : { backgroundColor: "#f3f4f6", color: "#1A1A2E" }
                      }
                    >
                      <p>{msg.text}</p>
                      <p className="text-[10px] mt-0.5 opacity-70">
                        {msg.sender} ·{" "}
                        {new Date(
                          Number(msg.timestamp / 1_000_000n),
                        ).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Reply input */}
            {selectedTicket.status === "open" && (
              <form onSubmit={handleSendMessage} className="flex gap-2 mt-1">
                <input
                  type="text"
                  placeholder="Type a message…"
                  value={newMsg}
                  onChange={(e) => setNewMsg(e.target.value)}
                  data-ocid="ticket-reply-input"
                  className="flex-1 h-10 px-3 rounded-xl border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="h-10 w-10 rounded-xl flex items-center justify-center text-white shrink-0"
                  style={{ backgroundColor: SAFFRON }}
                  aria-label="Send"
                  disabled={addMessage.isPending}
                >
                  ➤
                </button>
              </form>
            )}
          </div>
        </AppModal>
      )}
    </div>
  );
}
