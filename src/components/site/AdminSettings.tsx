import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const inputCls =
  "mt-1 w-full rounded-md border border-input bg-card px-3 py-2 text-sm outline-none focus:border-gold";

type Settings = {
  phone: string;
  alt_phone: string;
  email: string;
  address: string;
  whatsapp_message: string;
};

const empty: Settings = { phone: "", alt_phone: "", email: "", address: "", whatsapp_message: "" };

export function AdminSettings() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<Settings>(empty);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["admin-settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
      if (error) throw new Error(error.message);
      return data;
    },
  });

  useEffect(() => {
    if (data)
      setForm({
        phone: data.phone ?? "",
        alt_phone: data.alt_phone ?? "",
        email: data.email ?? "",
        address: data.address ?? "",
        whatsapp_message: data.whatsapp_message ?? "",
      });
  }, [data]);

  const save = useMutation({
    mutationFn: async (values: Settings) => {
      const { error } = await supabase.from("site_settings").upsert({ id: 1, ...values });
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      setSaved(true);
      setError("");
      queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      setTimeout(() => setSaved(false), 2500);
    },
    onError: (e: Error) => setError(e.message),
  });

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading…</p>;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save.mutate(form);
      }}
      className="max-w-2xl space-y-3 rounded-lg border border-border bg-card p-4"
    >
      <Text label="Phone number" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
      <Text label="Alternate phone" value={form.alt_phone} onChange={(v) => setForm({ ...form, alt_phone: v })} />
      <Text label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
      <Text label="Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
      <Text
        label="WhatsApp message"
        value={form.whatsapp_message}
        onChange={(v) => setForm({ ...form, whatsapp_message: v })}
      />
      {error && <p className="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">{error}</p>}
      {saved && <p className="rounded-md bg-success-soft px-3 py-2 text-xs text-success">Saved!</p>}
      <button
        type="submit"
        disabled={save.isPending}
        className="flex items-center gap-2 rounded-md bg-gold px-5 py-2.5 text-[11px] font-extrabold uppercase text-gold-foreground disabled:opacity-60"
      >
        {save.isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />} Save settings
      </button>
    </form>
  );
}

function Text({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} className={inputCls} />
    </label>
  );
}
