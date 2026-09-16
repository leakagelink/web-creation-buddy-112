import { useMemo, useState, type ReactNode } from "react";
import { CheckCircle2, Loader2, MessageCircle, Minus, Plus, ReceiptText, UtensilsCrossed } from "lucide-react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { usePropertyList } from "@/lib/properties-client";
import { useSettings, useThalis } from "@/lib/content";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const db = supabase as unknown as SupabaseClient;

const inputCls =
  "mt-1 w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-gold";

export function ThaliOrderDialog({
  children,
  defaultThaliId,
}: {
  children: ReactNode;
  defaultThaliId?: string;
}) {
  const [open, setOpen] = useState(false);
  const thalis = useThalis();
  const properties = usePropertyList();
  const settings = useSettings();

  const [property, setProperty] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [guestName, setGuestName] = useState("");
  const [mobile, setMobile] = useState("");
  const [qty, setQty] = useState<Record<string, number>>({});
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  function reset() {
    setProperty("");
    setRoomNumber("");
    setGuestName("");
    setMobile("");
    setQty(defaultThaliId ? { [defaultThaliId]: 1 } : {});
    setError("");
    setDone(false);
  }

  const items = useMemo(
    () =>
      thalis
        .map((t) => ({ thali: t, count: qty[t.id] || 0 }))
        .filter((x) => x.count > 0),
    [thalis, qty],
  );
  const total = items.reduce((sum, x) => sum + x.count * x.thali.price, 0);

  function changeQty(id: string, delta: number) {
    setQty((q) => {
      const next = Math.max(0, Math.min(20, (q[id] || 0) + delta));
      return { ...q, [id]: next };
    });
  }

  const whatsappText = useMemo(() => {
    const lines = [
      "House499 Thali Order",
      `Property: ${property || "-"}`,
      `Room/Booking: ${roomNumber || "-"}`,
      `Guest: ${guestName || "-"}`,
      `Mobile: ${mobile || "-"}`,
      "",
      ...items.map((x) => `${x.thali.name} x ${x.count} = ₹${x.count * x.thali.price}`),
      "",
      `Total: ₹${total}`,
    ];
    return lines.join("\n");
  }, [property, roomNumber, guestName, mobile, items, total]);

  const whatsappUrl = `https://wa.me/91${settings.phone}?text=${encodeURIComponent(whatsappText)}`;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!property) {
      setError("Please select a property.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(mobile.trim())) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (items.length === 0) {
      setError("Please select at least one thali.");
      return;
    }
    setSaving(true);
    const { error: insertError } = await db.from("thali_orders").insert({
      property_name: property,
      room_number: roomNumber.trim(),
      guest_name: guestName.trim(),
      mobile_number: mobile.trim(),
      items: items.map((x) => `${x.thali.name} x ${x.count}`).join(", "),
      total_amount: total,
    });
    setSaving(false);
    if (insertError) {
      setError("Could not place the order right now. Please try again.");
      return;
    }
    setDone(true);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (o) reset();
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-gold">
              <UtensilsCrossed className="h-5 w-5 text-gold-foreground" />
            </span>
            <div>
              <DialogTitle className="uppercase">Order In-Room Thali Directly</DialogTitle>
              <DialogDescription>
                Already staying at a House499 property or want to pre-book a meal?
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {done ? (
          <div className="py-8 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
            <h3 className="mt-3 text-lg uppercase">Order Placed</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Your thali order has been received. Pay cash / UPI at your room upon delivery.
            </p>
            <p className="mt-1 font-display text-2xl font-extrabold text-gold">₹{total}</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-5 rounded-md bg-navy px-6 py-3 text-xs font-extrabold uppercase text-navy-foreground"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-xs font-bold uppercase">
                Select House499 Property *
                <select
                  required
                  className={inputCls}
                  value={property}
                  onChange={(e) => setProperty(e.target.value)}
                >
                  <option value="">Select property</option>
                  {properties.map((p) => (
                    <option key={p.id} value={`${p.name} (${p.location})`}>
                      {p.name} ({p.location})
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-xs font-bold uppercase">
                Room Number / Booking ID *
                <input
                  required
                  className={inputCls}
                  placeholder="204"
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                />
              </label>
              <label className="text-xs font-bold uppercase">
                Guest Name *
                <input
                  required
                  className={inputCls}
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                />
              </label>
              <label className="text-xs font-bold uppercase">
                Mobile Number *
                <input
                  required
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="9876543210"
                  className={inputCls}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                />
              </label>
            </div>

            {/* Items */}
            <div className="rounded-lg border border-border p-3">
              <p className="text-xs font-bold uppercase">Select Thalis</p>
              <div className="mt-2 space-y-2">
                {thalis.map((t) => {
                  const count = qty[t.id] || 0;
                  return (
                    <div
                      key={t.id}
                      className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2"
                    >
                      <div>
                        <p className="text-sm font-bold uppercase">{t.name}</p>
                        <p className="text-xs text-muted-foreground">₹{t.price} / thali</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          aria-label={`Remove one ${t.name}`}
                          onClick={() => changeQty(t.id, -1)}
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-border disabled:opacity-40"
                          disabled={count === 0}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-6 text-center text-sm font-extrabold">{count}</span>
                        <button
                          type="button"
                          aria-label={`Add one ${t.name}`}
                          onClick={() => changeQty(t.id, 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-border"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Invoice summary */}
            <div className="rounded-lg bg-muted/50 p-3">
              <div className="flex items-center justify-between text-xs font-bold uppercase text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <ReceiptText className="h-3.5 w-3.5" /> Selected Items: {items.reduce((s, x) => s + x.count, 0)}
                </span>
                <span className="font-display text-xl font-extrabold text-foreground">₹{total}</span>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Pay Cash / UPI at room upon delivery
              </p>
            </div>

            {error && (
              <p role="alert" className="text-xs font-semibold text-destructive">
                {error}
              </p>
            )}

            <div className="grid gap-2 sm:grid-cols-2">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center justify-center gap-2 rounded-md bg-navy px-4 py-3 text-xs font-extrabold uppercase text-navy-foreground disabled:opacity-60"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <UtensilsCrossed className="h-4 w-4" />
                )}
                Place In-Room Thali Order
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-md bg-whatsapp px-4 py-3 text-xs font-extrabold uppercase text-navy-foreground"
              >
                <MessageCircle className="h-4 w-4" /> Order on WhatsApp
              </a>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
