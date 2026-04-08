import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppModal } from "@/components/ui/AppModal";
import {
  useAddCategory,
  useAllCategories,
  useDeleteCategory,
  useUpdateCategory,
} from "@/hooks/useQueries";
import type { CategoryEntry } from "@/hooks/useQueries";
import { Category } from "@/hooks/useQueries";
import { Pencil, Plus, ToggleLeft, ToggleRight, Trash2 } from "lucide-react";
import { useState } from "react";

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
  "🐾",
];
const TABLE_TYPES: { value: Category; label: string }[] = [
  { value: Category.food, label: "Food" },
  { value: Category.stay, label: "Stay" },
  { value: Category.play, label: "Play" },
  { value: Category.retail, label: "Retail" },
];

const TABLE_TYPE_COLORS: Record<string, string> = {
  food: "#FF8C42",
  stay: "#4A90E2",
  play: "#7ED321",
  retail: "#9B59B6",
};

interface CategoryFormData {
  name: string;
  iconEmoji: string;
  tableType: Category;
  keywords: string;
}

function CategoryFormModal({
  existing,
  onClose,
}: {
  existing?: CategoryEntry;
  onClose: () => void;
}) {
  const addCategory = useAddCategory();
  const updateCategory = useUpdateCategory();
  const [form, setForm] = useState<CategoryFormData>({
    name: existing?.name ?? "",
    iconEmoji: existing?.iconEmoji ?? "🍔",
    tableType: existing?.tableType ?? Category.food,
    keywords: existing?.searchKeywords.join(", ") ?? "",
  });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [error, setError] = useState("");

  async function handleSave() {
    if (!form.name.trim()) {
      setError("Name is required");
      return;
    }
    const keywords = form.keywords
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);

    try {
      if (existing) {
        const res = await updateCategory.mutateAsync({
          id: existing.id,
          name: form.name,
          iconEmoji: form.iconEmoji,
          isActive: existing.isActive,
          searchKeywords: keywords,
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
          searchKeywords: keywords,
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

  return (
    <AppModal
      isOpen
      onClose={onClose}
      title={existing ? "Edit Category" : "Add New Category"}
    >
      <div className="space-y-4">
        {/* Emoji */}
        <div>
          <label
            htmlFor="cat-icon"
            className="block text-xs font-medium text-muted-foreground mb-1"
          >
            Icon Emoji
          </label>
          <div className="flex items-center gap-3 mb-2">
            <button
              id="cat-icon"
              type="button"
              onClick={() => setShowEmojiPicker((v) => !v)}
              className="w-12 h-12 rounded-xl border border-input bg-muted flex items-center justify-center text-2xl hover:bg-muted/80 transition-colors"
              aria-label="Select emoji"
            >
              {form.iconEmoji}
            </button>
            <span className="text-xs text-muted-foreground">
              Click to pick an emoji
            </span>
          </div>
          {showEmojiPicker && (
            <div className="flex flex-wrap gap-2 p-3 bg-muted/40 rounded-xl border border-border">
              {COMMON_EMOJIS.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => {
                    setForm((f) => ({ ...f, iconEmoji: e }));
                    setShowEmojiPicker(false);
                  }}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-xl hover:bg-card transition-colors"
                  aria-label={`Select ${e}`}
                >
                  {e}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Name */}
        <div>
          <label
            htmlFor="cat-name"
            className="block text-xs font-medium text-muted-foreground mb-1"
          >
            Category Name *
          </label>
          <input
            id="cat-name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="e.g. Bakeries, Gyms, Pharmacies"
            className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Table type */}
        {!existing && (
          <div>
            <label
              htmlFor="cat-table-type"
              className="block text-xs font-medium text-muted-foreground mb-1"
            >
              Table Type
            </label>
            <select
              id="cat-table-type"
              value={form.tableType}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  tableType: e.target.value as Category,
                }))
              }
              className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm text-foreground focus:outline-none"
            >
              {TABLE_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Keywords */}
        <div>
          <label
            htmlFor="cat-keywords"
            className="block text-xs font-medium text-muted-foreground mb-1"
          >
            Search Keywords (comma-separated)
          </label>
          <input
            id="cat-keywords"
            value={form.keywords}
            onChange={(e) =>
              setForm((f) => ({ ...f, keywords: e.target.value }))
            }
            placeholder="biryani, curry, thali, south indian"
            className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {form.keywords && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {form.keywords
                .split(",")
                .map((k) => k.trim())
                .filter(Boolean)
                .map((kw) => (
                  <span
                    key={kw}
                    className="px-2 py-0.5 rounded-full text-xs font-medium border"
                    style={{
                      backgroundColor: "rgba(255,107,53,0.08)",
                      borderColor: "rgba(255,107,53,0.25)",
                      color: "#c05a28",
                    }}
                  >
                    {kw}
                  </span>
                ))}
            </div>
          )}
        </div>

        {error && (
          <div
            className="rounded-xl px-4 py-3 text-sm"
            style={{ backgroundColor: "rgba(239,68,68,0.1)", color: "#ef4444" }}
          >
            {error}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <AppButton variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </AppButton>
          <AppButton
            onClick={handleSave}
            disabled={isPending}
            className="flex-1"
          >
            {isPending ? "Saving…" : "Save Category"}
          </AppButton>
        </div>
      </div>
    </AppModal>
  );
}

export default function AdminCategories() {
  const { data: categories = [], isLoading } = useAllCategories();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<CategoryEntry | undefined>();
  const [deleteTarget, setDeleteTarget] = useState<CategoryEntry | null>(null);

  async function toggleActive(cat: CategoryEntry) {
    await updateCategory.mutateAsync({
      id: cat.id,
      name: cat.name,
      iconEmoji: cat.iconEmoji,
      isActive: !cat.isActive,
      searchKeywords: cat.searchKeywords,
    });
  }

  async function confirmDelete() {
    if (deleteTarget) {
      await deleteCategory.mutateAsync(deleteTarget.id);
      setDeleteTarget(null);
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-start justify-between gap-4 mb-2">
        <div>
          <h1
            className="text-2xl font-bold font-display"
            style={{ color: "#1A1A2E" }}
          >
            Category Architect 🏗️
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage what categories appear in the User App — no code required
          </p>
        </div>
        <AppButton
          onClick={() => {
            setEditTarget(undefined);
            setShowForm(true);
          }}
          data-ocid="add-category-btn"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </AppButton>
      </div>

      <div className="mt-6 grid gap-3">
        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">
            Loading categories…
          </div>
        ) : categories.length === 0 ? (
          <AppCard>
            <div className="text-center py-8">
              <p className="text-4xl mb-3">🏗️</p>
              <p className="font-semibold text-foreground">No categories yet</p>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                Add your first category to get started
              </p>
              <AppButton onClick={() => setShowForm(true)}>
                <Plus className="w-4 h-4 mr-2" /> Add Category
              </AppButton>
            </div>
          </AppCard>
        ) : (
          categories.map((cat) => (
            <AppCard key={cat.id} className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{
                  backgroundColor: `${TABLE_TYPE_COLORS[cat.tableType] ?? "#FF6B35"}20`,
                }}
              >
                {cat.iconEmoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-foreground">{cat.name}</h3>
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-semibold text-white"
                    style={{
                      backgroundColor:
                        TABLE_TYPE_COLORS[cat.tableType] ?? "#FF6B35",
                    }}
                  >
                    {cat.tableType.charAt(0).toUpperCase() +
                      cat.tableType.slice(1)}
                  </span>
                  {cat.isActive ? (
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: "#E8F5E9", color: "#2E7D32" }}
                    >
                      Active
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold text-muted-foreground bg-muted">
                      Inactive
                    </span>
                  )}
                </div>
                {cat.searchKeywords.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {cat.searchKeywords.map((kw) => (
                      <span
                        key={kw}
                        className="px-2 py-0.5 rounded-full text-xs font-medium border"
                        style={{ borderColor: "#e2e8f0", color: "#64748b" }}
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => toggleActive(cat)}
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                  aria-label={
                    cat.isActive ? "Deactivate category" : "Activate category"
                  }
                  data-ocid={`toggle-category-${cat.id}`}
                  title={cat.isActive ? "Deactivate" : "Activate"}
                >
                  {cat.isActive ? (
                    <ToggleRight
                      className="w-6 h-6"
                      style={{ color: "#7ED321" }}
                    />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-muted-foreground" />
                  )}
                </button>
                <AppButton
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setEditTarget(cat);
                    setShowForm(true);
                  }}
                  data-ocid={`edit-category-${cat.id}`}
                  aria-label="Edit category"
                >
                  <Pencil className="w-4 h-4" />
                </AppButton>
                <AppButton
                  size="sm"
                  variant="ghost"
                  onClick={() => setDeleteTarget(cat)}
                  data-ocid={`delete-category-${cat.id}`}
                  aria-label="Delete category"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </AppButton>
              </div>
            </AppCard>
          ))
        )}
      </div>

      {showForm && (
        <CategoryFormModal
          existing={editTarget}
          onClose={() => {
            setShowForm(false);
            setEditTarget(undefined);
          }}
        />
      )}

      {deleteTarget && (
        <AppModal
          isOpen
          onClose={() => setDeleteTarget(null)}
          title="Delete Category"
        >
          <p className="text-sm text-muted-foreground mb-4">
            Are you sure you want to delete{" "}
            <strong className="text-foreground">{deleteTarget.name}</strong>?
            This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <AppButton
              variant="outline"
              onClick={() => setDeleteTarget(null)}
              className="flex-1"
            >
              Cancel
            </AppButton>
            <AppButton
              variant="danger"
              onClick={confirmDelete}
              disabled={deleteCategory.isPending}
              className="flex-1"
            >
              {deleteCategory.isPending ? "Deleting…" : "Delete"}
            </AppButton>
          </div>
        </AppModal>
      )}
    </div>
  );
}
