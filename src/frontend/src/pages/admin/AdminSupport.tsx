import type { TicketMessage } from "@/backend.d";
import { StatusBadge } from "@/components/ui/AppBadge";
import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import {
  useAddTicketMessage,
  useAllTickets,
  useResolveTicket,
} from "@/hooks/useQueries";
import type { Ticket } from "@/hooks/useQueries";
import { TicketStatus } from "@/hooks/useQueries";
import { getSession } from "@/lib/auth";
import { CheckCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type FilterTab = "all" | "open" | "resolved";

function formatDate(ts: bigint): string {
  return new Date(Number(ts / 1_000_000n)).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function TicketThread({
  ticket,
  onClose,
}: {
  ticket: Ticket;
  onClose: () => void;
}) {
  const addMessage = useAddTicketMessage();
  const resolveTicket = useResolveTicket();
  const session = getSession();
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional scroll trigger
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [ticket.messages]);

  async function handleSend() {
    if (!text.trim()) return;
    const sender = session?.name ?? "Admin";
    await addMessage.mutateAsync({
      ticketId: ticket.id,
      sender,
      text: text.trim(),
    });
    setText("");
  }

  async function handleResolve() {
    await resolveTicket.mutateAsync(ticket.id);
  }

  const isResolved = ticket.status === TicketStatus.resolved;

  return (
    <div className="flex flex-col h-full">
      {/* Thread header */}
      <div className="flex items-start justify-between gap-3 p-4 border-b border-border">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-foreground">
              #{ticket.id.slice(0, 8)}
            </p>
            <StatusBadge status={isResolved ? "resolved" : "open"} />
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              {ticket.category}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {ticket.description}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Raised by: <strong>{ticket.raisedBy}</strong> ·{" "}
            {formatDate(ticket.createdAt)}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {!isResolved && (
            <AppButton
              size="sm"
              variant="secondary"
              onClick={handleResolve}
              disabled={resolveTicket.isPending}
              data-ocid={`resolve-ticket-${ticket.id}`}
            >
              <CheckCircle className="w-3.5 h-3.5 mr-1 text-green-600" />
              Resolve
            </AppButton>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
            aria-label="Close thread"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[240px] max-h-[400px]">
        {ticket.messages.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-8">
            No messages yet
          </p>
        ) : (
          ticket.messages.map((msg: TicketMessage, i: number) => {
            const isAdmin =
              msg.sender.toLowerCase().includes("admin") ||
              msg.sender === (session?.name ?? "Admin");
            return (
              <div
                key={`${msg.timestamp}-${i}`}
                className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                    isAdmin
                      ? "rounded-br-sm text-white"
                      : "rounded-bl-sm bg-muted text-foreground"
                  }`}
                  style={isAdmin ? { backgroundColor: "#FF6B35" } : {}}
                >
                  <p
                    className={`text-xs font-semibold mb-0.5 ${isAdmin ? "text-white/80" : "text-muted-foreground"}`}
                  >
                    {msg.sender}
                  </p>
                  <p className="text-sm">{msg.text}</p>
                  <p
                    className={`text-[10px] mt-1 ${isAdmin ? "text-white/60" : "text-muted-foreground"}`}
                  >
                    {formatDate(msg.timestamp)}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Reply input */}
      {!isResolved && (
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Type a reply…"
              data-ocid="ticket-reply-input"
              className="flex-1 h-10 px-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <AppButton
              size="sm"
              onClick={handleSend}
              disabled={addMessage.isPending || !text.trim()}
              data-ocid="ticket-reply-send"
              aria-label="Send reply"
            >
              <Send className="w-4 h-4" />
            </AppButton>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminSupport() {
  const { data: tickets = [], isLoading } = useAllTickets();
  const [filter, setFilter] = useState<FilterTab>("all");
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);

  const filtered = tickets.filter((t) => {
    if (filter === "open") return t.status === TicketStatus.open;
    if (filter === "resolved") return t.status === TicketStatus.resolved;
    return true;
  });

  const counts = {
    all: tickets.length,
    open: tickets.filter((t) => t.status === TicketStatus.open).length,
    resolved: tickets.filter((t) => t.status === TicketStatus.resolved).length,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1
          className="text-2xl font-bold font-display"
          style={{ color: "#1A1A2E" }}
        >
          Support Inbox 🎫
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage and respond to support tickets from users and owners
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-6 bg-muted/40 p-1 rounded-xl w-fit">
        {(["all", "open", "resolved"] as FilterTab[]).map((f) => (
          <button
            key={f}
            type="button"
            data-ocid={`support-filter-${f}`}
            onClick={() => setFilter(f)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize"
            style={{
              backgroundColor: filter === f ? "#FF6B35" : "transparent",
              color: filter === f ? "#fff" : "#64748b",
            }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)} ({counts[f]})
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-4">
        {/* Ticket list */}
        <div className={activeTicket ? "lg:col-span-2" : "lg:col-span-5"}>
          <AppCard padded={false}>
            {isLoading ? (
              <div className="px-5 py-8 text-center text-muted-foreground">
                Loading tickets…
              </div>
            ) : filtered.length === 0 ? (
              <div className="px-5 py-12 text-center">
                <p className="text-3xl mb-2">🎫</p>
                <p className="font-semibold text-foreground">
                  No tickets found
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {filter === "open"
                    ? "All tickets are resolved!"
                    : "No support tickets yet."}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filtered.map((ticket) => {
                  const isResolved = ticket.status === TicketStatus.resolved;
                  const isActive = activeTicket?.id === ticket.id;
                  return (
                    <button
                      key={ticket.id}
                      type="button"
                      data-ocid={`ticket-row-${ticket.id}`}
                      className={`w-full text-left p-4 cursor-pointer transition-colors hover:bg-muted/20 ${isActive ? "bg-muted/30 border-l-2" : ""} ${isResolved ? "opacity-60" : ""}`}
                      style={isActive ? { borderLeftColor: "#FF6B35" } : {}}
                      onClick={() => setActiveTicket(ticket)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-xs text-muted-foreground">
                              #{ticket.id.slice(0, 8)}
                            </span>
                            <StatusBadge
                              status={isResolved ? "resolved" : "open"}
                            />
                            <span className="text-xs bg-muted px-1.5 py-0.5 rounded-full text-muted-foreground">
                              {ticket.category}
                            </span>
                          </div>
                          <p className="text-sm text-foreground font-medium mt-1 truncate">
                            {ticket.description}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {ticket.raisedBy} · {formatDate(ticket.createdAt)}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground flex-shrink-0">
                          {ticket.messages.length} msg
                          {ticket.messages.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </AppCard>
        </div>

        {/* Thread panel */}
        {activeTicket && (
          <div className="lg:col-span-3">
            <AppCard padded={false} className="h-full">
              <TicketThread
                ticket={activeTicket}
                onClose={() => setActiveTicket(null)}
              />
            </AppCard>
          </div>
        )}
      </div>
    </div>
  );
}
