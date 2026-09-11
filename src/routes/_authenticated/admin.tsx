import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { queryOptions, useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { BedDouble, CalendarDays, CalendarX2, LogOut, ShieldCheck, UtensilsCrossed, Users, Wallet } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getBookings, updateBookingStatus } from "@/lib/bookings.functions";
import { Logo } from "@/components/site/Logo";
import { rooms } from "@/lib/site-data";

export const Route = createFileRoute("/_authenticated/admin")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(
      queryOptions({ queryKey: ["admin-bookings"], queryFn: getBookings }),
    ),
  head: () => ({
    meta: [
      { title: "Admin — Bookings | House499" },
      { name: "robots", content: "noindex" },
    ],
  }),
  errorComponent: () => (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <ShieldCheck className="mx-auto h-12 w-12 text-gold" />
      <h1 className="mt-4 text-2xl uppercase">Access Restricted</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        This area is only for House499 admins. Please sign in with an admin account.
      </p>
      <Link
        to="/auth"
        search={{ redirect: "/admin" }}
        className="mt-6 inline-block rounded-md bg-navy px-6 py-3 text-xs font-bold uppercase text-navy-foreground"
      >
        Go to Sign In
      </Link>
    </div>
  ),
  component: AdminPage,
});

type Booking = {
  id: string;
  booking_code: string;
  room_id: string;
  guest_name: string;
  guest_phone: string;
  guest_email: string;
  guests: number;
  check_in: string;
  check_out: string;
  nights: number;
  thali_qty: number;
  special_requests: string | null;
  coupon_code: string | null;
  discount_amount: number;
  total_amount: number;
  status: string;
  created_at: string;
};

function AdminPage() {
  const { data: bookings } = useSuspenseQuery(
    queryOptions({ queryKey: ["admin-bookings"], queryFn: getBookings }),
  );
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "cancelled">("all");

  const statusMutation = useMutation({
    mutationFn: (input: { id: string; status: string }) => updateBookingStatus({ data: input }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-bookings"] }),
  });

  const list = bookings.filter((b: Booking) => filter === "all" || b.status === filter);
  const pending = bookings.filter((b: Booking) => b.status === "pending").length;
  const confirmed = bookings.filter((b: Booking) => b.status === "confirmed");
  const revenue = confirmed.reduce((sum: number, b: Booking) => sum + Number(b.total_amount), 0);

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", search: { redirect: undefined }, replace: true });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16">
      <div className="flex flex-wrap items-center justify-between gap-3 py-5">
        <Logo compact />
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-accent px-3 py-1 text-[11px] font-extrabold uppercase text-gold-foreground">
            Admin Panel
          </span>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-[11px] font-bold uppercase"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign Out
          </button>
        </div>
      </div>

      <div className="mb-5 flex gap-2 border-b border-border">
        {(["bookings", "properties"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`-mb-px border-b-2 px-4 py-2 text-[11px] font-extrabold uppercase tracking-wide ${
              tab === t ? "border-gold text-navy" : "border-transparent text-muted-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "properties" && (
        <>
          <h1 className="section-title">Properties</h1>
          <AdminProperties />
        </>
      )}

      {tab === "bookings" && (
        <>
      <h1 className="section-title">Bookings</h1>
      <p className="mt-1 text-sm text-muted-foreground">All guest bookings, newest first.</p>

      <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat Icon={CalendarDays} label="Total Bookings" value={String(bookings.length)} />
        <Stat Icon={CalendarClockIcon} label="Pending" value={String(pending)} />
        <Stat Icon={Users} label="Confirmed" value={String(confirmed.length)} />
        <Stat Icon={Wallet} label="Confirmed Revenue" value={`₹${revenue.toLocaleString("en-IN")}`} />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {(["all", "pending", "confirmed", "cancelled"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-wide ${
              filter === f ? "bg-navy text-navy-foreground" : "border border-border text-muted-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        {list.length === 0 && (
          <div className="rounded-lg border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            No {filter === "all" ? "" : filter} bookings yet.
          </div>
        )}
        {list.map((b: Booking) => (
          <BookingRow
            key={b.id}
            booking={b}
            onStatus={(s) => statusMutation.mutate({ id: b.id, status: s })}
            busy={statusMutation.isPending}
          />
        ))}
      </div>
        </>
      )}
    </div>
  );
}

function CalendarClockIcon({ className }: { className?: string }) {
  return <CalendarDays className={`${className ?? ""} opacity-60`} />;
}

function Stat({
  Icon,
  label,
  value,
}: {
  Icon: (p: { className?: string }) => React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <Icon className="h-5 w-5 text-gold" />
      <div className="mt-2 font-display text-2xl font-extrabold">{value}</div>
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  );
}

function BookingRow({
  booking: b,
  onStatus,
  busy,
}: {
  booking: Booking;
  onStatus: (status: string) => void;
  busy: boolean;
}) {
  const room = rooms.find((r) => r.id === b.room_id);
  const statusColor =
    b.status === "confirmed"
      ? "bg-success-soft text-success"
      : b.status === "cancelled"
        ? "bg-destructive/10 text-destructive"
        : "bg-accent text-gold-foreground";

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display text-sm font-extrabold">{b.booking_code}</span>
            <span className={`rounded px-2 py-0.5 text-[10px] font-extrabold uppercase ${statusColor}`}>
              {b.status}
            </span>
          </div>
          <div className="mt-1 text-sm font-bold">
            {b.guest_name} · +91 {b.guest_phone}
          </div>
          <div className="text-xs text-muted-foreground">{b.guest_email}</div>
        </div>
        <div className="text-right">
          <div className="font-display text-xl font-extrabold text-navy">
            ₹{Number(b.total_amount).toLocaleString("en-IN")}
          </div>
          <div className="text-[11px] text-muted-foreground">
            {new Date(b.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
          </div>
        </div>
      </div>

      <dl className="mt-3 grid gap-2 text-xs sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center gap-1.5">
          <BedDouble className="h-3.5 w-3.5 text-gold" />
          {room?.name ?? b.room_id} · {b.guests} guest{b.guests > 1 ? "s" : ""}
        </div>
        <div className="flex items-center gap-1.5">
          <CalendarDays className="h-3.5 w-3.5 text-gold" />
          {b.check_in} → {b.check_out} ({b.nights}N)
        </div>
        <div className="flex items-center gap-1.5">
          <UtensilsCrossed className="h-3.5 w-3.5 text-gold" />
          Thali × {b.thali_qty || 0}
        </div>
        <div className="flex items-center gap-1.5">
          <CalendarX2 className="h-3.5 w-3.5 text-gold" />
          {b.coupon_code ? `Coupon ${b.coupon_code} (−₹${Number(b.discount_amount)})` : "No coupon"}
        </div>
      </dl>
      {b.special_requests && (
        <p className="mt-2 rounded bg-accent px-3 py-2 text-xs text-muted-foreground">
          “{b.special_requests}”
        </p>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-bold uppercase text-muted-foreground">Update status:</span>
        {["pending", "confirmed", "cancelled"].map((s) => (
          <button
            key={s}
            disabled={busy || b.status === s}
            onClick={() => onStatus(s)}
            className={`rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide disabled:opacity-40 ${
              b.status === s ? "bg-navy text-navy-foreground" : "border border-border"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
