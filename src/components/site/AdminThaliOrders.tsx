import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Trash2, UtensilsCrossed } from "lucide-react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

const db = supabase as unknown as SupabaseClient;

type ThaliOrder = {
  id: string;
  property_name: string;
  room_number: string;
  guest_name: string;
  mobile_number: string;
  items: string;
  total_amount: number;
  status: string;
  created_at: string;
};

const statuses = ["new", "preparing", "delivered", "cancelled"];

const statusColors: Record<string, string> = {
  new: "bg-gold/20 text-gold",
  preparing: "bg-blue-500/15 text-blue-600",
  delivered: "bg-green-600/15 text-green-700",
  cancelled: "bg-destructive/15 text-destructive",
};

export function AdminThaliOrders() {
  const qc = useQueryClient();
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["admin-thali-orders"],
    queryFn: async () => {
      const { data, error } = await db
        .from("thali_orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []) as ThaliOrder[];
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await db.from("thali_orders").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-thali-orders"] }),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await db.from("thali_orders").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-thali-orders"] }),
  });

  return (
    <div>
      <h2 className="text-lg uppercase">Thali Orders</h2>
      <p className="mt-1 text-xs text-muted-foreground">
        In-room thali orders placed from the website — update status or delete.
      </p>

      {isLoading ? (
        <div className="mt-10 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-gold" />
        </div>
      ) : orders.length === 0 ? (
        <div className="card-surface mt-6 p-10 text-center text-sm text-muted-foreground">
          <UtensilsCrossed className="mx-auto mb-3 h-8 w-8 text-gold" />
          No thali orders yet.
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {orders.map((o) => (
            <div key={o.id} className="card-surface p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-extrabold uppercase">{o.guest_name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {o.property_name} · Room/Booking: {o.room_number} · {o.mobile_number}
                  </p>
                  <p className="mt-1.5 text-xs">
                    <span className="font-bold">{o.items}</span>
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(o.created_at).toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-lg font-extrabold text-gold">
                    ₹{o.total_amount}
                  </span>
                  <select
                    aria-label="Order status"
                    value={o.status}
                    onChange={(e) => updateStatus.mutate({ id: o.id, status: e.target.value })}
                    className={`rounded-md px-2 py-1.5 text-[11px] font-bold uppercase outline-none ${statusColors[o.status] || "bg-muted"}`}
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <button
                    aria-label="Delete order"
                    onClick={() => remove.mutate(o.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-destructive/40 text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
