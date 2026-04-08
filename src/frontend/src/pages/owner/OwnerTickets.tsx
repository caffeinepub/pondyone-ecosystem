import { StatusBadge } from "@/components/ui/AppBadge";
import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppModal } from "@/components/ui/AppModal";
import {
  type Ticket,
  useAddTicketMessage,
  useCreateTicket,
  useTicketsByOwner,
} from "@/hooks/useQueries";
import { getSession } from "@/lib/auth";
import { SAFFRON } from "@/lib/constants";
import { useState } from "react";
import type { TicketMessage } from "../../backend.d";

function formatTs(ts: bigint): string {
  try {
    const ms = Number(ts / 1_000_000n);
    return new Date(ms).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

function TicketThread({
  ticket,
  onBack,
}: { ticket: Ticket; onBack: () => void }) {
  const session = getSession();
  const addMessage = useAddTicketMessage();
  const [reply, setReply] = useState("");

  async function handleSend() {
    if (!reply.trim()) return;
    await addMessage.mutateAsync({
      ticketId: ticket.id,
      sender: session?.name ?? "Owner",
      text: reply.trim(),
    });
    setReply("");
  }

  return (
    <div className="flex flex-col h-full">
      {/* Back header */}
      <div className="bg-card border-b border-border px-4 pt-10 pb-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-muted-foreground mb-2 focus-visible:outline-none"
        >
          ← Back to tickets
        </button>
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-base font-bold font-display text-foreground">
              {ticket.category}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {ticket.description}
            </p>
          </div>
          <StatusBadge status={ticket.status as "open" | "resolved"} />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-muted/20">
        {ticket.messages.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No messages yet
          </p>
        ) : (
          ticket.messages.map((msg: TicketMessage, idx: number) => {
            const isOwn =
              msg.sender === session?.name || msg.sender === "Owner";
            return (
              <div
                key={`${msg.timestamp}-${idx}`}
                className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-[75%] rounded-2xl px-4 py-2.5 text-sm"
                  style={{
                    backgroundColor: isOwn ? SAFFRON : "#fff",
                    color: isOwn ? "#fff" : "#1A1A2E",
                    border: isOwn ? "none" : "1px solid #e5e7eb",
                  }}
                >
                  <p className="text-[10px] font-semibold mb-0.5 opacity-70">
                    {msg.sender}
                  </p>
                  <p>{msg.text}</p>
                  <p className="text-[10px] mt-1 opacity-60 text-right">
                    {formatTs(msg.timestamp)}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Reply bar */}
      {ticket.status === "open" && (
        <div className="bg-card border-t border-border px-4 py-3 flex gap-2">
          <input
            type="text"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            placeholder="Type your reply…"
            data-ocid="ticket-reply-input"
            className="flex-1 h-10 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
          />
          <AppButton
            size="sm"
            onClick={handleSend}
            disabled={!reply.trim()}
            data-ocid="ticket-reply-send"
          >
            Send
          </AppButton>
        </div>
      )}
    </div>
  );
}

export default function OwnerTickets() {
  const session = getSession();
  const ownerId = session?.userId ?? "";
  const { data: tickets = [], isLoading } = useTicketsByOwner(ownerId);
  const createTicket = useCreateTicket();

  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Technical");
  const [imageUrl, setImageUrl] = useState("");

  async function handleCreate() {
    if (!description.trim()) return;
    await createTicket.mutateAsync({
      raisedBy: ownerId,
      ownerId,
      category,
      description: description.trim(),
      imageUrl: imageUrl.trim() || null,
    });
    setDescription("");
    setImageUrl("");
    setCategory("Technical");
    setShowNewModal(false);
  }

  if (selectedTicket) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <TicketThread
          ticket={selectedTicket}
          onBack={() => setSelectedTicket(null)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 pt-10 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold font-display text-foreground">
              🎫 Support
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {tickets.length} ticket{tickets.length !== 1 ? "s" : ""}
            </p>
          </div>
          <AppButton
            size="sm"
            onClick={() => setShowNewModal(true)}
            data-ocid="new-ticket-btn"
          >
            + Raise Ticket
          </AppButton>
        </div>
      </div>

      {/* Ticket list */}
      <div className="px-4 py-5 max-w-lg mx-auto space-y-3">
        {isLoading ? (
          [1, 2, 3].map((n) => (
            <div key={n} className="h-24 rounded-2xl bg-muted animate-pulse" />
          ))
        ) : tickets.length === 0 ? (
          <AppCard>
            <div className="text-center py-10">
              <p className="text-3xl mb-3">🎫</p>
              <p className="text-sm font-semibold text-foreground">
                No tickets raised
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Need help? Raise a support ticket
              </p>
              <AppButton
                size="sm"
                className="mt-4"
                onClick={() => setShowNewModal(true)}
                data-ocid="empty-new-ticket"
              >
                Raise Ticket
              </AppButton>
            </div>
          </AppCard>
        ) : (
          tickets.map((ticket) => (
            <AppCard
              key={ticket.id}
              onClick={() => setSelectedTicket(ticket)}
              data-ocid={`ticket-${ticket.id}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-muted-foreground">
                      {ticket.category}
                    </span>
                    <StatusBadge
                      status={ticket.status as "open" | "resolved"}
                    />
                  </div>
                  <p className="text-sm text-foreground line-clamp-2">
                    {ticket.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {ticket.messages.length} message
                    {ticket.messages.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <span className="text-muted-foreground text-sm flex-shrink-0">
                  ›
                </span>
              </div>
            </AppCard>
          ))
        )}
      </div>

      {/* New ticket modal */}
      <AppModal
        isOpen={showNewModal}
        onClose={() => setShowNewModal(false)}
        title="Raise Support Ticket"
      >
        <div className="space-y-3">
          <div>
            <label
              htmlFor="ticket-cat"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Category
            </label>
            <select
              id="ticket-cat"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>Technical</option>
              <option>Payment</option>
              <option>Listing</option>
              <option>Account</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="ticket-desc"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Describe your issue
            </label>
            <textarea
              id="ticket-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Explain your issue in detail…"
              data-ocid="ticket-description"
              className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none placeholder:text-muted-foreground"
            />
          </div>
          <div>
            <label
              htmlFor="ticket-img"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Image URL (optional)
            </label>
            <input
              id="ticket-img"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
            />
          </div>
          <AppButton
            fullWidth
            onClick={handleCreate}
            disabled={!description.trim() || createTicket.isPending}
            data-ocid="ticket-submit"
          >
            {createTicket.isPending ? "Raising…" : "Raise Ticket"}
          </AppButton>
        </div>
      </AppModal>
    </div>
  );
}
