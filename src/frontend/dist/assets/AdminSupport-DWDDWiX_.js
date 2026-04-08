import { r as reactExports, j as jsxRuntimeExports, g as getSession } from "./index-CnBlQnJS.js";
import { S as StatusBadge } from "./AppBadge-DvzDMqlu.js";
import { A as AppButton } from "./AppButton-LApTkm6l.js";
import { A as AppCard } from "./AppCard-CqGSFxNm.js";
import { Q as useAllTickets, k as useAddTicketMessage, R as useResolveTicket } from "./useQueries--SjqMtRM.js";
import { T as TicketStatus } from "./backend.d-6mUFcwwM.js";
import { C as CircleCheckBig } from "./circle-check-big-Bl1GeW6b.js";
import { X } from "./x-BiXYAiTq.js";
import { S as Send } from "./send-CbowFqkc.js";
import "./createLucideIcon-DNEqdOjx.js";
function formatDate(ts) {
  return new Date(Number(ts / 1000000n)).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function TicketThread({
  ticket,
  onClose
}) {
  const addMessage = useAddTicketMessage();
  const resolveTicket = useResolveTicket();
  const session = getSession();
  const [text, setText] = reactExports.useState("");
  const bottomRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    var _a;
    (_a = bottomRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  }, [ticket.messages]);
  async function handleSend() {
    if (!text.trim()) return;
    const sender = (session == null ? void 0 : session.name) ?? "Admin";
    await addMessage.mutateAsync({
      ticketId: ticket.id,
      sender,
      text: text.trim()
    });
    setText("");
  }
  async function handleResolve() {
    await resolveTicket.mutateAsync(ticket.id);
  }
  const isResolved = ticket.status === TicketStatus.resolved;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 p-4 border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground", children: [
            "#",
            ticket.id.slice(0, 8)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: isResolved ? "resolved" : "open" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full", children: ticket.category })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 line-clamp-2", children: ticket.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
          "Raised by: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: ticket.raisedBy }),
          " ·",
          " ",
          formatDate(ticket.createdAt)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
        !isResolved && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          AppButton,
          {
            size: "sm",
            variant: "secondary",
            onClick: handleResolve,
            disabled: resolveTicket.isPending,
            "data-ocid": `resolve-ticket-${ticket.id}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5 mr-1 text-green-600" }),
              "Resolve"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: "p-1.5 rounded-lg hover:bg-muted transition-colors",
            "aria-label": "Close thread",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 text-muted-foreground" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-3 min-h-[240px] max-h-[400px]", children: [
      ticket.messages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-sm text-muted-foreground py-8", children: "No messages yet" }) : ticket.messages.map((msg, i) => {
        const isAdmin = msg.sender.toLowerCase().includes("admin") || msg.sender === ((session == null ? void 0 : session.name) ?? "Admin");
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `flex ${isAdmin ? "justify-end" : "justify-start"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `max-w-[80%] rounded-2xl px-4 py-2.5 ${isAdmin ? "rounded-br-sm text-white" : "rounded-bl-sm bg-muted text-foreground"}`,
                style: isAdmin ? { backgroundColor: "#FF6B35" } : {},
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: `text-xs font-semibold mb-0.5 ${isAdmin ? "text-white/80" : "text-muted-foreground"}`,
                      children: msg.sender
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: msg.text }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: `text-[10px] mt-1 ${isAdmin ? "text-white/60" : "text-muted-foreground"}`,
                      children: formatDate(msg.timestamp)
                    }
                  )
                ]
              }
            )
          },
          `${msg.timestamp}-${i}`
        );
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: bottomRef })
    ] }),
    !isResolved && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: text,
          onChange: (e) => setText(e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          },
          placeholder: "Type a reply…",
          "data-ocid": "ticket-reply-input",
          className: "flex-1 h-10 px-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AppButton,
        {
          size: "sm",
          onClick: handleSend,
          disabled: addMessage.isPending || !text.trim(),
          "data-ocid": "ticket-reply-send",
          "aria-label": "Send reply",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" })
        }
      )
    ] }) })
  ] });
}
function AdminSupport() {
  const { data: tickets = [], isLoading } = useAllTickets();
  const [filter, setFilter] = reactExports.useState("all");
  const [activeTicket, setActiveTicket] = reactExports.useState(null);
  const filtered = tickets.filter((t) => {
    if (filter === "open") return t.status === TicketStatus.open;
    if (filter === "resolved") return t.status === TicketStatus.resolved;
    return true;
  });
  const counts = {
    all: tickets.length,
    open: tickets.filter((t) => t.status === TicketStatus.open).length,
    resolved: tickets.filter((t) => t.status === TicketStatus.resolved).length
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h1",
        {
          className: "text-2xl font-bold font-display",
          style: { color: "#1A1A2E" },
          children: "Support Inbox 🎫"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Manage and respond to support tickets from users and owners" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 mb-6 bg-muted/40 p-1 rounded-xl w-fit", children: ["all", "open", "resolved"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        "data-ocid": `support-filter-${f}`,
        onClick: () => setFilter(f),
        className: "px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize",
        style: {
          backgroundColor: filter === f ? "#FF6B35" : "transparent",
          color: filter === f ? "#fff" : "#64748b"
        },
        children: [
          f.charAt(0).toUpperCase() + f.slice(1),
          " (",
          counts[f],
          ")"
        ]
      },
      f
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-5 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: activeTicket ? "lg:col-span-2" : "lg:col-span-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AppCard, { padded: false, children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-8 text-center text-muted-foreground", children: "Loading tickets…" }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl mb-2", children: "🎫" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "No tickets found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: filter === "open" ? "All tickets are resolved!" : "No support tickets yet." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: filtered.map((ticket) => {
        const isResolved = ticket.status === TicketStatus.resolved;
        const isActive = (activeTicket == null ? void 0 : activeTicket.id) === ticket.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `ticket-row-${ticket.id}`,
            className: `w-full text-left p-4 cursor-pointer transition-colors hover:bg-muted/20 ${isActive ? "bg-muted/30 border-l-2" : ""} ${isResolved ? "opacity-60" : ""}`,
            style: isActive ? { borderLeftColor: "#FF6B35" } : {},
            onClick: () => setActiveTicket(ticket),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
                    "#",
                    ticket.id.slice(0, 8)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    StatusBadge,
                    {
                      status: isResolved ? "resolved" : "open"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-muted px-1.5 py-0.5 rounded-full text-muted-foreground", children: ticket.category })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground font-medium mt-1 truncate", children: ticket.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                  ticket.raisedBy,
                  " · ",
                  formatDate(ticket.createdAt)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex-shrink-0", children: [
                ticket.messages.length,
                " msg",
                ticket.messages.length !== 1 ? "s" : ""
              ] })
            ] })
          },
          ticket.id
        );
      }) }) }) }),
      activeTicket && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AppCard, { padded: false, className: "h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        TicketThread,
        {
          ticket: activeTicket,
          onClose: () => setActiveTicket(null)
        }
      ) }) })
    ] })
  ] });
}
export {
  AdminSupport as default
};
