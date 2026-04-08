import { j as jsxRuntimeExports } from "./index-CnBlQnJS.js";
import { C as CATEGORY_COLORS } from "./createLucideIcon-DNEqdOjx.js";
import { c as cn } from "./AppCard-CqGSFxNm.js";
const STATUS_STYLES = {
  pending: "bg-yellow-100 text-yellow-800",
  accepted: "bg-green-100 text-green-800",
  declined: "bg-red-100 text-red-800",
  completed: "bg-gray-100 text-gray-600",
  open: "bg-blue-100 text-blue-800",
  resolved: "bg-green-100 text-green-800"
};
const STATUS_LABELS = {
  pending: "Pending",
  accepted: "Accepted",
  declined: "Declined",
  completed: "Completed",
  open: "Open",
  resolved: "Resolved"
};
function CategoryBadge({ category, label, emoji }) {
  const color = CATEGORY_COLORS[category];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold text-white",
      style: { backgroundColor: color },
      children: [
        emoji && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: emoji }),
        label ?? category.charAt(0).toUpperCase() + category.slice(1)
      ]
    }
  );
}
function StatusBadge({ status, label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold",
        STATUS_STYLES[status]
      ),
      children: label ?? STATUS_LABELS[status]
    }
  );
}
export {
  CategoryBadge as C,
  StatusBadge as S
};
