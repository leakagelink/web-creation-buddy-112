import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Trash2 } from "lucide-react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

const db = supabase as unknown as SupabaseClient;

type Lead = {
  id: string;
  owner_name: string;
  phone: string;
  email: string | null;
  property_name: string;
  property_type: string;
  city: string;
  address: string | null;
  rooms_count: number;
  message: string | null;
  status: string;
  created_at: string;
};

const statuses = ["new", "contacted", "onboarded", "rejected"];

export function AdminPartnerLeads() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-partner-leads"],
    queryFn: async (): Promise<Lead[]> => {
      const { data: rows, error } = await db
        .from("partner_leads")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw new Error(error.message);
      return (rows ?? []) as Lead[];
    },
  });

  const refresh = () => queryClient.invalidateQueries({ queryKey: ["admin-partner-leads"] });

  const setStatus = useMutation({
    mutationFn: async (input: { id: string; status: string }) => {
      const { error } = await db
        .from("partner_leads")
        .update({ status: input.status })
        .eq("id", input.id);
      if (error) throw new Error(error.message);
    },
    onSuccess: refresh,
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await db.from("partner_leads").delete().eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: refresh,
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 py-10 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading partner requests…
      </div>
    );
  }

  const leads = data ?? [];
  if (leads.length === 0) {
    return <p className="py-10 text-sm text-muted-foreground">No partner requests yet.</p>;
  }

  return (
    <div className="mt-4 grid gap-4">
      {leads.map((lead) => (
        <div key={lead.id} className="card-surface p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-base uppercase">{lead.property_name}</h3>
              <p className="text-xs text-muted-foreground">
                {lead.property_type} · {lead.city} · {lead.rooms_count} rooms
              </p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={lead.status}
                onChange={(e) => setStatus.mutate({ id: lead.id, status: e.target.value })}
                className="rounded-md border border-input bg-card px-2 py-1.5 text-xs font-bold uppercase"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <button
                onClick={() => remove.mutate(lead.id)}
                className="rounded-md border border-border p-2 text-destructive"
                aria-label="Delete request"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-[11px] font-bold uppercase text-muted-foreground">Owner</dt>
              <dd>{lead.owner_name}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-bold uppercase text-muted-foreground">Phone</dt>
              <dd>
                <a href={`tel:${lead.phone}`}>{lead.phone}</a>
              </dd>
            </div>
            {lead.email && (
              <div>
                <dt className="text-[11px] font-bold uppercase text-muted-foreground">Email</dt>
                <dd>
                  <a href={`mailto:${lead.email}`}>{lead.email}</a>
                </dd>
              </div>
            )}
            {lead.address && (
              <div>
                <dt className="text-[11px] font-bold uppercase text-muted-foreground">Address</dt>
                <dd>{lead.address}</dd>
              </div>
            )}
            {lead.message && (
              <div className="sm:col-span-2">
                <dt className="text-[11px] font-bold uppercase text-muted-foreground">Message</dt>
                <dd>{lead.message}</dd>
              </div>
            )}
          </dl>

          <p className="mt-3 text-[11px] text-muted-foreground">
            Received {new Date(lead.created_at).toLocaleString("en-IN")}
          </p>
        </div>
      ))}
    </div>
  );
}
