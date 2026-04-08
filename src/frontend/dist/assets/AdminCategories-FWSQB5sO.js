import { r as reactExports, j as jsxRuntimeExports } from "./index-DcI09W8W.js";
import { A as AppButton } from "./AppButton-DpTDxkZU.js";
import { A as AppCard } from "./AppCard-T1oYP_Vp.js";
import { A as AppModal } from "./AppModal-DZh7RKm5.js";
import { K as useAllCategories, S as useUpdateCategory, T as useDeleteCategory, U as useAddCategory } from "./useQueries-CSZps6Zw.js";
import { c as createLucideIcon } from "./createLucideIcon-BoNvu6Kr.js";
import { T as Trash2 } from "./trash-2-DDcM7T_a.js";
import { C as Category } from "./backend.d-DzWmo78T.js";
import "./x-DiEn2gaL.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "9", cy: "12", r: "3", key: "u3jwor" }],
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "7", key: "g7kal2" }]
];
const ToggleLeft = createLucideIcon("toggle-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "15", cy: "12", r: "3", key: "1afu0r" }],
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "7", key: "g7kal2" }]
];
const ToggleRight = createLucideIcon("toggle-right", __iconNode);
const COMMON_EMOJIS = [
  "🍔",
  "🏨",
  "⚽",
  "🛒",
  "🌿",
  "🎯",
  "🏋️",
  "🍕",
  "☕",
  "🎮",
  "📚",
  "💊",
  "🎵",
  "🚗",
  "✂️",
  "🐾"
];
const TABLE_TYPES = [
  { value: Category.food, label: "Food" },
  { value: Category.stay, label: "Stay" },
  { value: Category.play, label: "Play" },
  { value: Category.retail, label: "Retail" }
];
const TABLE_TYPE_COLORS = {
  food: "#FF8C42",
  stay: "#4A90E2",
  play: "#7ED321",
  retail: "#9B59B6"
};
function CategoryFormModal({
  existing,
  onClose
}) {
  const addCategory = useAddCategory();
  const updateCategory = useUpdateCategory();
  const [form, setForm] = reactExports.useState({
    name: (existing == null ? void 0 : existing.name) ?? "",
    iconEmoji: (existing == null ? void 0 : existing.iconEmoji) ?? "🍔",
    tableType: (existing == null ? void 0 : existing.tableType) ?? Category.food,
    keywords: (existing == null ? void 0 : existing.searchKeywords.join(", ")) ?? ""
  });
  const [showEmojiPicker, setShowEmojiPicker] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  async function handleSave() {
    if (!form.name.trim()) {
      setError("Name is required");
      return;
    }
    const keywords = form.keywords.split(",").map((k) => k.trim()).filter(Boolean);
    try {
      if (existing) {
        const res = await updateCategory.mutateAsync({
          id: existing.id,
          name: form.name,
          iconEmoji: form.iconEmoji,
          isActive: existing.isActive,
          searchKeywords: keywords
        });
        if (res.__kind__ === "err") {
          setError(res.err);
          return;
        }
      } else {
        const res = await addCategory.mutateAsync({
          name: form.name,
          iconEmoji: form.iconEmoji,
          tableType: form.tableType,
          searchKeywords: keywords
        });
        if (res.__kind__ === "err") {
          setError(res.err);
          return;
        }
      }
      onClose();
    } catch {
      setError("Operation failed. Please try again.");
    }
  }
  const isPending = addCategory.isPending || updateCategory.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AppModal,
    {
      isOpen: true,
      onClose,
      title: existing ? "Edit Category" : "Add New Category",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "cat-icon",
              className: "block text-xs font-medium text-muted-foreground mb-1",
              children: "Icon Emoji"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                id: "cat-icon",
                type: "button",
                onClick: () => setShowEmojiPicker((v) => !v),
                className: "w-12 h-12 rounded-xl border border-input bg-muted flex items-center justify-center text-2xl hover:bg-muted/80 transition-colors",
                "aria-label": "Select emoji",
                children: form.iconEmoji
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Click to pick an emoji" })
          ] }),
          showEmojiPicker && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 p-3 bg-muted/40 rounded-xl border border-border", children: COMMON_EMOJIS.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                setForm((f) => ({ ...f, iconEmoji: e }));
                setShowEmojiPicker(false);
              },
              className: "w-9 h-9 rounded-lg flex items-center justify-center text-xl hover:bg-card transition-colors",
              "aria-label": `Select ${e}`,
              children: e
            },
            e
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "cat-name",
              className: "block text-xs font-medium text-muted-foreground mb-1",
              children: "Category Name *"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "cat-name",
              value: form.name,
              onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
              placeholder: "e.g. Bakeries, Gyms, Pharmacies",
              className: "w-full h-10 px-3 rounded-xl border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            }
          )
        ] }),
        !existing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "cat-table-type",
              className: "block text-xs font-medium text-muted-foreground mb-1",
              children: "Table Type"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              id: "cat-table-type",
              value: form.tableType,
              onChange: (e) => setForm((f) => ({
                ...f,
                tableType: e.target.value
              })),
              className: "w-full h-10 px-3 rounded-xl border border-input bg-background text-sm text-foreground focus:outline-none",
              children: TABLE_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: t.value, children: t.label }, t.value))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "cat-keywords",
              className: "block text-xs font-medium text-muted-foreground mb-1",
              children: "Search Keywords (comma-separated)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "cat-keywords",
              value: form.keywords,
              onChange: (e) => setForm((f) => ({ ...f, keywords: e.target.value })),
              placeholder: "biryani, curry, thali, south indian",
              className: "w-full h-10 px-3 rounded-xl border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            }
          ),
          form.keywords && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mt-2", children: form.keywords.split(",").map((k) => k.trim()).filter(Boolean).map((kw) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "px-2 py-0.5 rounded-full text-xs font-medium border",
              style: {
                backgroundColor: "rgba(255,107,53,0.08)",
                borderColor: "rgba(255,107,53,0.25)",
                color: "#c05a28"
              },
              children: kw
            },
            kw
          )) })
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "rounded-xl px-4 py-3 text-sm",
            style: { backgroundColor: "rgba(239,68,68,0.1)", color: "#ef4444" },
            children: error
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AppButton, { variant: "outline", onClick: onClose, className: "flex-1", children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AppButton,
            {
              onClick: handleSave,
              disabled: isPending,
              className: "flex-1",
              children: isPending ? "Saving…" : "Save Category"
            }
          )
        ] })
      ] })
    }
  );
}
function AdminCategories() {
  const { data: categories = [], isLoading } = useAllCategories();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();
  const [showForm, setShowForm] = reactExports.useState(false);
  const [editTarget, setEditTarget] = reactExports.useState();
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  async function toggleActive(cat) {
    await updateCategory.mutateAsync({
      id: cat.id,
      name: cat.name,
      iconEmoji: cat.iconEmoji,
      isActive: !cat.isActive,
      searchKeywords: cat.searchKeywords
    });
  }
  async function confirmDelete() {
    if (deleteTarget) {
      await deleteCategory.mutateAsync(deleteTarget.id);
      setDeleteTarget(null);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h1",
          {
            className: "text-2xl font-bold font-display",
            style: { color: "#1A1A2E" },
            children: "Category Architect 🏗️"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Manage what categories appear in the User App — no code required" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        AppButton,
        {
          onClick: () => {
            setEditTarget(void 0);
            setShowForm(true);
          },
          "data-ocid": "add-category-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
            "Add Category"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid gap-3", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-muted-foreground", children: "Loading categories…" }) : categories.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(AppCard, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl mb-3", children: "🏗️" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "No categories yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 mb-4", children: "Add your first category to get started" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AppButton, { onClick: () => setShowForm(true), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
        " Add Category"
      ] })
    ] }) }) : categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AppCard, { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0",
          style: {
            backgroundColor: `${TABLE_TYPE_COLORS[cat.tableType] ?? "#FF6B35"}20`
          },
          children: cat.iconEmoji
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: cat.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "px-2 py-0.5 rounded-full text-xs font-semibold text-white",
              style: {
                backgroundColor: TABLE_TYPE_COLORS[cat.tableType] ?? "#FF6B35"
              },
              children: cat.tableType.charAt(0).toUpperCase() + cat.tableType.slice(1)
            }
          ),
          cat.isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "px-2 py-0.5 rounded-full text-xs font-semibold",
              style: { backgroundColor: "#E8F5E9", color: "#2E7D32" },
              children: "Active"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full text-xs font-semibold text-muted-foreground bg-muted", children: "Inactive" })
        ] }),
        cat.searchKeywords.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mt-2", children: cat.searchKeywords.map((kw) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "px-2 py-0.5 rounded-full text-xs font-medium border",
            style: { borderColor: "#e2e8f0", color: "#64748b" },
            children: kw
          },
          kw
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => toggleActive(cat),
            className: "p-1.5 rounded-lg hover:bg-muted transition-colors",
            "aria-label": cat.isActive ? "Deactivate category" : "Activate category",
            "data-ocid": `toggle-category-${cat.id}`,
            title: cat.isActive ? "Deactivate" : "Activate",
            children: cat.isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              ToggleRight,
              {
                className: "w-6 h-6",
                style: { color: "#7ED321" }
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleLeft, { className: "w-6 h-6 text-muted-foreground" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AppButton,
          {
            size: "sm",
            variant: "ghost",
            onClick: () => {
              setEditTarget(cat);
              setShowForm(true);
            },
            "data-ocid": `edit-category-${cat.id}`,
            "aria-label": "Edit category",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AppButton,
          {
            size: "sm",
            variant: "ghost",
            onClick: () => setDeleteTarget(cat),
            "data-ocid": `delete-category-${cat.id}`,
            "aria-label": "Delete category",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4 text-destructive" })
          }
        )
      ] })
    ] }, cat.id)) }),
    showForm && /* @__PURE__ */ jsxRuntimeExports.jsx(
      CategoryFormModal,
      {
        existing: editTarget,
        onClose: () => {
          setShowForm(false);
          setEditTarget(void 0);
        }
      }
    ),
    deleteTarget && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      AppModal,
      {
        isOpen: true,
        onClose: () => setDeleteTarget(null),
        title: "Delete Category",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-4", children: [
            "Are you sure you want to delete",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: deleteTarget.name }),
            "? This action cannot be undone."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AppButton,
              {
                variant: "outline",
                onClick: () => setDeleteTarget(null),
                className: "flex-1",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AppButton,
              {
                variant: "danger",
                onClick: confirmDelete,
                disabled: deleteCategory.isPending,
                className: "flex-1",
                children: deleteCategory.isPending ? "Deleting…" : "Delete"
              }
            )
          ] })
        ]
      }
    )
  ] });
}
export {
  AdminCategories as default
};
