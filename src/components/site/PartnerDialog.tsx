import { useRef, useState, type ReactNode } from "react";
import { Loader2, CheckCircle2, Camera, Sparkles, Trash2, Upload } from "lucide-react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
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

const propertyTypes = [
  "Hotel",
  "Guest House",
  "Homestay",
  "Boutique Hotel",
  "Service Apartment",
  "Resort",
];

const amenityOptions = [
  "High-Speed Free Wi-Fi",
  "24/7 Hot Water Geyser",
  "Air Conditioning (AC)",
  "Fresh Clean Bed Linen",
  "Elevator / Lift",
  "Dedicated Car Parking",
  "100% Power Backup",
  "Daily Housekeeping",
  "House499 Pure Veg Thali",
  "CCTV & 24/7 Security",
  "24/7 Front Desk",
  "Flat Screen TV",
  "Couple Friendly",
  "Electric Kettle & Tea Kit",
];

type Photo = { path: string; preview: string; name: string };

type Form = {
  owner_name: string;
  phone: string;
  email: string;
  property_name: string;
  property_type: string;
  city: string;
  address: string;
  rooms_count: string;
  message: string;
};

const empty: Form = {
  owner_name: "",
  phone: "",
  email: "",
  property_name: "",
  property_type: "Hotel",
  city: "",
  address: "",
  rooms_count: "",
  message: "",
};

export function PartnerDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Form>(empty);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [uploading, setUploading] = useState(false);
  const [amenities, setAmenities] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  function set<K extends keyof Form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleAmenity(name: string) {
    setAmenities((list) =>
      list.includes(name) ? list.filter((a) => a !== name) : [...list, name],
    );
  }

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError("");
    setUploading(true);
    const uploaded: Photo[] = [];
    for (const file of Array.from(files).slice(0, 10)) {
      if (!file.type.startsWith("image/")) continue;
      if (file.size > 10 * 1024 * 1024) {
        setError(`${file.name} is larger than 10MB.`);
        continue;
      }
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await db.storage
        .from("partner-photos")
        .upload(path, file, { contentType: file.type });
      if (uploadError) {
        setError("Photo upload failed. Please try again.");
        continue;
      }
      uploaded.push({ path, preview: URL.createObjectURL(file), name: file.name });
    }
    setPhotos((p) => [...p, ...uploaded]);
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function removePhoto(path: string) {
    setPhotos((p) => p.filter((x) => x.path !== path));
  }


  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!/^[0-9+\-\s]{8,15}$/.test(form.phone.trim())) {
      setError("Please enter a valid phone number.");
      return;
    }
    setSaving(true);
    const { error: insertError } = await db.from("partner_leads").insert({
      owner_name: form.owner_name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || null,
      property_name: form.property_name.trim(),
      property_type: form.property_type,
      city: form.city.trim(),
      address: form.address.trim() || null,
      rooms_count: Number(form.rooms_count || 0),
      message: form.message.trim() || null,
      photos: photos.map((p) => p.path),
      amenities,
    });
    setSaving(false);
    if (insertError) {
      setError("Could not submit right now. Please try again.");
      return;
    }
    setDone(true);
    setForm(empty);
    setPhotos([]);
    setAmenities([]);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) {
          setDone(false);
          setError("");
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="uppercase">Become a Partner</DialogTitle>
          <DialogDescription>
            Share your property details — our partnership team will contact you shortly.
          </DialogDescription>
        </DialogHeader>

        {done ? (
          <div className="py-8 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
            <h3 className="mt-3 text-lg uppercase">Request Received</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Thank you! Our team will get in touch within 24 hours.
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-5 rounded-md bg-navy px-6 py-3 text-xs font-extrabold uppercase text-navy-foreground"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
            <label className="text-xs font-bold uppercase">
              Owner name*
              <input
                required
                className={inputCls}
                value={form.owner_name}
                onChange={(e) => set("owner_name", e.target.value)}
              />
            </label>
            <label className="text-xs font-bold uppercase">
              Phone*
              <input
                required
                type="tel"
                className={inputCls}
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
              />
            </label>
            <label className="text-xs font-bold uppercase sm:col-span-2">
              Email
              <input
                type="email"
                className={inputCls}
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
              />
            </label>
            <label className="text-xs font-bold uppercase">
              Property name*
              <input
                required
                className={inputCls}
                value={form.property_name}
                onChange={(e) => set("property_name", e.target.value)}
              />
            </label>
            <label className="text-xs font-bold uppercase">
              Property type
              <select
                className={inputCls}
                value={form.property_type}
                onChange={(e) => set("property_type", e.target.value)}
              >
                {propertyTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <label className="text-xs font-bold uppercase">
              City*
              <input
                required
                className={inputCls}
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
              />
            </label>
            <label className="text-xs font-bold uppercase">
              Number of rooms
              <input
                type="number"
                min={0}
                className={inputCls}
                value={form.rooms_count}
                onChange={(e) => set("rooms_count", e.target.value)}
              />
            </label>
            <label className="text-xs font-bold uppercase sm:col-span-2">
              Property address
              <input
                className={inputCls}
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
              />
            </label>
            <label className="text-xs font-bold uppercase sm:col-span-2">
              Message
              <textarea
                rows={3}
                className={inputCls}
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
              />
            </label>

            {error && (
              <p role="alert" className="text-xs font-semibold text-destructive sm:col-span-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="mt-1 flex items-center justify-center gap-2 rounded-md bg-gold px-6 py-3 text-xs font-extrabold uppercase text-gold-foreground disabled:opacity-60 sm:col-span-2"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              Submit Partner Request
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
