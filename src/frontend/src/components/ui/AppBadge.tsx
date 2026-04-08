import { CATEGORY_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type CategoryKey = "food" | "stay" | "play" | "retail";
type StatusKey =
  | "pending"
  | "accepted"
  | "declined"
  | "completed"
  | "open"
  | "resolved";

interface CategoryBadgeProps {
  category: CategoryKey;
  label?: string;
  emoji?: string;
}

interface StatusBadgeProps {
  status: StatusKey;
  label?: string;
}

const STATUS_STYLES: Record<StatusKey, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  accepted: "bg-green-100 text-green-800",
  declined: "bg-red-100 text-red-800",
  completed: "bg-gray-100 text-gray-600",
  open: "bg-blue-100 text-blue-800",
  resolved: "bg-green-100 text-green-800",
};

const STATUS_LABELS: Record<StatusKey, string> = {
  pending: "Pending",
  accepted: "Accepted",
  declined: "Declined",
  completed: "Completed",
  open: "Open",
  resolved: "Resolved",
};

export function CategoryBadge({ category, label, emoji }: CategoryBadgeProps) {
  const color = CATEGORY_COLORS[category];
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold text-white"
      style={{ backgroundColor: color }}
    >
      {emoji && <span>{emoji}</span>}
      {label ?? category.charAt(0).toUpperCase() + category.slice(1)}
    </span>
  );
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold",
        STATUS_STYLES[status],
      )}
    >
      {label ?? STATUS_LABELS[status]}
    </span>
  );
}
