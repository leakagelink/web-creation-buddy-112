import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Eye, EyeOff, Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminRows } from "@/lib/content";
import type { CollectionConfig, Field } from "@/lib/admin-schema";

const inputCls =
  "mt-1 w-full rounded-md border border-input bg-card px-3 py-2 text-sm outline-none focus:border-gold";

type Row = Record<string, unknown>;
type FormValues = Record<string, string | boolean>;

function emptyForm(config: CollectionConfig): FormValues {
  const f: FormValues = {};
  for (const field of config.fields) {
    if (field.type === "boolean") f[field.key] = (field.default as boolean) ?? false;
    else if (field.type === "list") f[field.key] = "";
    else f[field.key] = field.default === undefined ? "" : String(field.default);
  }
  return f;
}

function toForm(config: CollectionConfig, row: Row): FormValues {
  const f: FormValues = {};
  for (const field of config.fields) {
    const v = row[field.key];
    if (field.type === "boolean") f[field.key] = Boolean(v);
    else if (field.type === "list") f[field.key] = ((v as string[] | null) ?? []).join("\n");
    else f[field.key] = v === null || v === undefined ? "" : String(v);
  }
  return f;
}

function toPayload(config: CollectionConfig, form: FormValues): Row {
  const payload: Row = {};
  for (const field of config.fields) {
    const v = form[field.key];
    if (field.type === "boolean") payload[field.key] = Boolean(v);
    else if (field.type === "number") payload[field.key] = Number(v || 0);
    else if (field.type === "list")
      payload[field.key] = String(v || "")
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
    else {
      let s = String(v ?? "").trim();
      if (field.key === "slug") s = s.toLowerCase();
      if (field.key === "code") s = s.toUpperCase();
      payload[field.key] = field.key === "badge" || field.key === "image_url" ? s || null : s;
    }
  }
  return payload;
}

export function AdminCollection({ config }: { config: CollectionConfig }) {
  const queryClient = useQueryClient();
  const { data: rows = [], isLoading } = useAdminRows(config.table);
  const [form, setForm] = useState<FormValues | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  function refresh() {
    queryClient.invalidateQueries({ queryKey: ["admin-content", config.table] });
    queryClient.invalidateQueries({ queryKey: ["public-content", config.table] });
  }

  const save = useMutation({
    mutationFn: async (values: FormValues) => {
      const payload = toPayload(config, values);
      for (const field of config.fields) {
        if (field.required && !String(values[field.key] ?? "").trim())
          throw new Error(`${field.label} is required`);
      }
      if (editingId) {
        const { error } = await supabase.from(config.table).update(payload).eq("id", editingId);
        if (error) throw new Error(error.message);
      } else {
        const { error } = await supabase.from(config.table).insert(payload);
        if (error) throw new Error(error.message);
      }
    },
    onSuccess: () => {
      setForm(null);
      setEditingId(null);
      setError("");
      refresh();
    },
    onError: (e: Error) => setError(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from(config.table).delete().eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: refresh,
    onError: (e: Error) => setError(e.message),
  });

  const toggleVisible = useMutation({
    mutationFn: async (row: Row) => {
      const { error } = await supabase
        .from(config.table)
        .update({ visible: !row["visible"] })
        .eq("id", String(row["id"]));
      if (error) throw new Error(error.message);
    },
    onSuccess: refresh,
    onError: (e: Error) => setError(e.message),
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {rows.length} {config.label.toLowerCase()} · add, edit, hide or delete
        </p>
        <button
          onClick={() => {
            setEditingId(null);
            setError("");
            setForm(emptyForm(config));
          }}
          className="flex items-center gap-1.5 rounded-md bg-navy px-4 py-2 text-[11px] font-extrabold uppercase text-navy-foreground"
        >
          <Plus className="h-3.5 w-3.5" /> Add new
        </button>
      </div>

      {error && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">{error}</p>
      )}

      {form && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            save.mutate(form);
          }}
          className="rounded-lg border border-gold/40 bg-card p-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-display text-sm font-extrabold uppercase">
              {editingId ? "Edit" : "New"} {config.label}
            </h3>
            <button type="button" onClick={() => setForm(null)} aria-label="Close">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {config.fields.map((field) => (
              <FieldInput
                key={field.key}
                field={field}
                value={form[field.key]!}
                onChange={(v) => setForm({ ...form, [field.key]: v })}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={save.isPending}
            className="mt-4 flex items-center gap-2 rounded-md bg-gold px-5 py-2.5 text-[11px] font-extrabold uppercase text-gold-foreground disabled:opacity-60"
          >
            {save.isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />} Save
          </button>
        </form>
      )}

      {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}

      <div className="space-y-2">
        {!isLoading && rows.length === 0 && (
          <div className="rounded-lg border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            Nothing here yet — click “Add new”.
          </div>
        )}
        {rows.map((row) => (
          <div
            key={String(row["id"])}
            className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card p-3"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-bold">{String(row[config.titleKey] ?? "—")}</span>
                {config.hasVisible && !row["visible"] && (
                  <span className="rounded bg-muted px-2 py-0.5 text-[10px] font-extrabold uppercase text-muted-foreground">
                    Hidden
                  </span>
                )}
                {config.table === "coupons" && (
                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-extrabold uppercase ${row["active"] ? "bg-success-soft text-success" : "bg-muted text-muted-foreground"}`}
                  >
                    {row["active"] ? "Active" : "Inactive"}
                  </span>
                )}
              </div>
              <div className="truncate text-xs text-muted-foreground">
                {config.subtitleKeys
                  .map((k) => (row[k] === null || row[k] === undefined ? "" : String(row[k])))
                  .filter(Boolean)
                  .join(" · ")}
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {config.hasVisible && (
                <button
                  onClick={() => toggleVisible.mutate(row)}
                  className="rounded-md border border-border p-2"
                  aria-label="Toggle visibility"
                >
                  {row["visible"] ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                </button>
              )}
              <button
                onClick={() => {
                  setEditingId(String(row["id"]));
                  setError("");
                  setForm(toForm(config, row));
                }}
                className="rounded-md border border-border p-2"
                aria-label="Edit"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => {
                  if (confirm(`Delete “${String(row[config.titleKey])}”? This cannot be undone.`))
                    remove.mutate(String(row["id"]));
                }}
                className="rounded-md border border-destructive/40 p-2 text-destructive"
                aria-label="Delete"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: string | boolean;
  onChange: (v: string | boolean) => void;
}) {
  const wide = field.type === "textarea" || field.type === "list";
  return (
    <label className={`block ${wide ? "sm:col-span-2" : ""}`}>
      <span className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
        {field.label}
      </span>
      {field.type === "boolean" ? (
        <div className="mt-1">
          <button
            type="button"
            onClick={() => onChange(!value)}
            className={`rounded-full px-4 py-1.5 text-[11px] font-extrabold uppercase ${
              value ? "bg-navy text-navy-foreground" : "border border-border text-muted-foreground"
            }`}
          >
            {value ? "Yes" : "No"}
          </button>
        </div>
      ) : field.type === "textarea" || field.type === "list" ? (
        <textarea
          rows={field.type === "list" ? 5 : 4}
          value={String(value)}
          placeholder={field.placeholder ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className={inputCls}
        />
      ) : (
        <input
          type={field.type === "number" ? "number" : "text"}
          value={String(value)}
          placeholder={field.placeholder ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className={inputCls}
        />
      )}
      {field.help && <span className="mt-1 block text-[11px] text-muted-foreground">{field.help}</span>}
    </label>
  );
}
