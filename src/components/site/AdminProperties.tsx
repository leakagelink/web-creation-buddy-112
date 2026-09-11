import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Eye, EyeOff, Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import {
  createProperty,
  deleteProperty,
  getAdminProperties,
  updateProperty,
  type PropertyRow,
} from "@/lib/properties.functions";

const inputCls =
  "mt-1 w-full rounded-md border border-input bg-card px-3 py-2 text-sm outline-none focus:border-gold";

type FormState = {
  id?: string;
  slug: string;
  name: string;
  location: string;
  address: string;
  rating: string;
  reviews: string;
  from_price: string;
  image_url: string;
  coming_soon: boolean;
  visible: boolean;
  sort_order: string;
};

const emptyForm: FormState = {
  slug: "",
  name: "",
  location: "",
  address: "",
  rating: "4.5",
  reviews: "0",
  from_price: "499",
  image_url: "",
  coming_soon: false,
  visible: true,
  sort_order: "0",
};

function toForm(p: PropertyRow): FormState {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    location: p.location,
    address: p.address ?? "",
    rating: String(p.rating),
    reviews: String(p.reviews),
    from_price: String(p.from_price),
    image_url: p.image_url ?? "",
    coming_soon: p.coming_soon,
    visible: p.visible,
    sort_order: String(p.sort_order),
  };
}

export function AdminProperties() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<FormState | null>(null);
  const [error, setError] = useState("");

  const { data: list = [], isLoading } = useQuery({
    queryKey: ["admin-properties"],
    queryFn: () => getAdminProperties(),
  });

  function refresh() {
    queryClient.invalidateQueries({ queryKey: ["admin-properties"] });
    queryClient.invalidateQueries({ queryKey: ["public-properties"] });
  }

  const saveMutation = useMutation({
    mutationFn: async (f: FormState) => {
      const payload = {
        slug: f.slug.trim().toLowerCase(),
        name: f.name.trim(),
        location: f.location.trim(),
        address: f.address.trim(),
        rating: Number(f.rating) || 0,
        reviews: parseInt(f.reviews || "0", 10),
        from_price: parseInt(f.from_price || "0", 10),
        image_url: f.image_url.trim(),
        coming_soon: f.coming_soon,
        visible: f.visible,
        sort_order: parseInt(f.sort_order || "0", 10),
      };
      return f.id
        ? updateProperty({ data: { ...payload, id: f.id } })
        : createProperty({ data: payload });
    },
    onSuccess: () => {
      setForm(null);
      setError("");
      refresh();
    },
    onError: (e: Error) => setError(e.message || "Could not save property"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProperty({ data: { id } }),
    onSuccess: refresh,
  });

  const toggleVisible = useMutation({
    mutationFn: (p: PropertyRow) =>
      updateProperty({
        data: {
          id: p.id,
          slug: p.slug,
          name: p.name,
          location: p.location,
          address: p.address ?? "",
          rating: Number(p.rating),
          reviews: p.reviews,
          from_price: p.from_price,
          image_url: p.image_url ?? "",
          coming_soon: p.coming_soon,
          visible: !p.visible,
          sort_order: p.sort_order,
        },
      }),
    onSuccess: refresh,
  });

  return (
    <div className="mt-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Properties shown on the home page and Properties page.
        </p>
        <button
          onClick={() => {
            setError("");
            setForm({ ...emptyForm, sort_order: String(list.length + 1) });
          }}
          className="flex items-center gap-1.5 rounded-md bg-navy px-4 py-2 text-[11px] font-extrabold uppercase text-navy-foreground"
        >
          <Plus className="h-3.5 w-3.5" /> Add Property
        </button>
      </div>

      {form && (
        <div className="mt-4 rounded-lg border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold uppercase">
              {form.id ? "Edit Property" : "New Property"}
            </h3>
            <button onClick={() => setForm(null)} aria-label="Close form">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <label className="text-xs font-bold uppercase text-muted-foreground">
              Name
              <input
                className={inputCls}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>
            <label className="text-xs font-bold uppercase text-muted-foreground">
              Slug (id)
              <input
                className={inputCls}
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="varanasi"
              />
            </label>
            <label className="text-xs font-bold uppercase text-muted-foreground">
              Location
              <input
                className={inputCls}
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </label>
            <label className="text-xs font-bold uppercase text-muted-foreground sm:col-span-2">
              Address (optional)
              <input
                className={inputCls}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </label>
            <label className="text-xs font-bold uppercase text-muted-foreground">
              Image URL (optional)
              <input
                className={inputCls}
                value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                placeholder="https://..."
              />
            </label>
            <label className="text-xs font-bold uppercase text-muted-foreground">
              Rating
              <input
                className={inputCls}
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: e.target.value })}
                inputMode="decimal"
              />
            </label>
            <label className="text-xs font-bold uppercase text-muted-foreground">
              Reviews
              <input
                className={inputCls}
                value={form.reviews}
                onChange={(e) => setForm({ ...form, reviews: e.target.value })}
                inputMode="numeric"
              />
            </label>
            <label className="text-xs font-bold uppercase text-muted-foreground">
              From Price (₹)
              <input
                className={inputCls}
                value={form.from_price}
                onChange={(e) => setForm({ ...form, from_price: e.target.value })}
                inputMode="numeric"
              />
            </label>
            <label className="text-xs font-bold uppercase text-muted-foreground">
              Sort Order
              <input
                className={inputCls}
                value={form.sort_order}
                onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
                inputMode="numeric"
              />
            </label>
          </div>

          <div className="mt-3 flex flex-wrap gap-5">
            <label className="flex items-center gap-2 text-xs font-bold uppercase">
              <input
                type="checkbox"
                checked={form.coming_soon}
                onChange={(e) => setForm({ ...form, coming_soon: e.target.checked })}
              />
              Coming Soon
            </label>
            <label className="flex items-center gap-2 text-xs font-bold uppercase">
              <input
                type="checkbox"
                checked={form.visible}
                onChange={(e) => setForm({ ...form, visible: e.target.checked })}
              />
              Show on website
            </label>
          </div>

          {error && <p className="mt-3 text-xs font-semibold text-destructive">{error}</p>}

          <div className="mt-4 flex gap-2">
            <button
              disabled={saveMutation.isPending}
              onClick={() => saveMutation.mutate(form)}
              className="flex items-center gap-2 rounded-md bg-gold px-5 py-2.5 text-[11px] font-extrabold uppercase text-gold-foreground disabled:opacity-50"
            >
              {saveMutation.isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              Save Property
            </button>
            <button
              onClick={() => setForm(null)}
              className="rounded-md border border-border px-5 py-2.5 text-[11px] font-extrabold uppercase"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="mt-4 space-y-3">
        {isLoading && <p className="text-sm text-muted-foreground">Loading properties…</p>}
        {!isLoading && list.length === 0 && (
          <div className="rounded-lg border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            No properties yet. Add your first one.
          </div>
        )}
        {list.map((p) => (
          <div
            key={p.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card p-4"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-extrabold uppercase">{p.name}</span>
                <span
                  className={`rounded px-2 py-0.5 text-[10px] font-extrabold uppercase ${
                    p.coming_soon ? "bg-accent text-gold-foreground" : "bg-success-soft text-success"
                  }`}
                >
                  {p.coming_soon ? "Coming Soon" : "Now Open"}
                </span>
                {!p.visible && (
                  <span className="rounded bg-destructive/10 px-2 py-0.5 text-[10px] font-extrabold uppercase text-destructive">
                    Hidden
                  </span>
                )}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {p.location} · ₹{p.from_price} · ★ {p.rating} ({p.reviews}) · #{p.sort_order}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleVisible.mutate(p)}
                className="flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-[11px] font-bold uppercase"
              >
                {p.visible ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                {p.visible ? "Hide" : "Show"}
              </button>
              <button
                onClick={() => {
                  setError("");
                  setForm(toForm(p));
                }}
                className="flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-[11px] font-bold uppercase"
              >
                <Pencil className="h-3.5 w-3.5" /> Edit
              </button>
              <button
                onClick={() => {
                  if (confirm(`Delete ${p.name}?`)) deleteMutation.mutate(p.id);
                }}
                className="flex items-center gap-1.5 rounded-md border border-destructive/40 px-3 py-2 text-[11px] font-bold uppercase text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
