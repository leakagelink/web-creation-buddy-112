import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { contact } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact House499 — Varanasi Hotel Support" },
      {
        name: "description",
        content: "Call, WhatsApp or email House499 for bookings and support. We reply 24x7.",
      },
      { property: "og:title", content: "Contact House499" },
      { property: "og:description", content: "Reach our 24x7 guest support team for bookings and help." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="card-surface p-7">
        <h1 className="section-title">Get In Touch</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Send us a message and our team will get back to you shortly.
        </p>
        <form
          className="mt-6 grid gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <Input label="Full Name" placeholder="Enter your full name" />
          <Input label="Mobile Number" placeholder="Enter mobile number" />
          <div className="sm:col-span-2">
            <Input label="Email Address" placeholder="you@example.com" type="email" />
          </div>
          <label className="block sm:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-wide">Message</span>
            <textarea
              rows={4}
              placeholder="How can we help?"
              className="mt-1 w-full rounded-md border border-input bg-card px-3 py-2 text-sm outline-none focus:border-gold"
            />
          </label>
          <button className="rounded-md bg-gold px-6 py-3 text-xs font-extrabold uppercase tracking-wide text-gold-foreground sm:col-span-2">
            Send Message
          </button>
          {sent && (
            <p className="rounded-md bg-success-soft px-4 py-3 text-sm text-success sm:col-span-2">
              Thanks! Your message has been received. We'll contact you soon.
            </p>
          )}
        </form>
      </div>

      <div className="space-y-4">
        {[
          { Icon: Phone, title: "Call Us", value: `${contact.phone} / ${contact.altPhone}` },
          { Icon: MessageCircle, title: "WhatsApp", value: contact.phone },
          { Icon: Mail, title: "Email", value: contact.email },
          { Icon: MapPin, title: "Address", value: contact.address },
        ].map(({ Icon, title, value }) => (
          <div key={title} className="card-surface flex items-start gap-3 p-5">
            <Icon className="mt-0.5 h-6 w-6 shrink-0 text-gold" />
            <div>
              <div className="text-sm font-bold uppercase">{title}</div>
              <div className="text-sm text-muted-foreground">{value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide">{label}</span>
      <input
        {...props}
        className="mt-1 w-full rounded-md border border-input bg-card px-3 py-2 text-sm outline-none focus:border-gold"
      />
    </label>
  );
}
