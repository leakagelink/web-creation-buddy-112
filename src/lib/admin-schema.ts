import type { Collection } from "@/lib/content";

export type FieldType = "text" | "textarea" | "number" | "list" | "boolean";

export type Field = {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  help?: string;
  default?: string | number | boolean | string[];
};

export type CollectionConfig = {
  table: Collection;
  label: string;
  titleKey: string;
  subtitleKeys: string[];
  hasVisible: boolean;
  hasSort: boolean;
  fields: Field[];
};

const visibility: Field[] = [
  { key: "sort_order", label: "Display order", type: "number", default: 0 },
  { key: "visible", label: "Show on website", type: "boolean", default: true },
];

export const collections: CollectionConfig[] = [
  {
    table: "rooms",
    label: "Rooms",
    titleKey: "name",
    subtitleKeys: ["subtitle", "price"],
    hasVisible: true,
    hasSort: true,
    fields: [
      { key: "name", label: "Room name", type: "text", required: true, placeholder: "Deluxe Room" },
      { key: "slug", label: "Room ID (url)", type: "text", required: true, placeholder: "deluxe", help: "Lowercase letters, numbers and dashes only." },
      { key: "price", label: "Price per night (₹)", type: "number", required: true, default: 499 },
      { key: "subtitle", label: "Short line", type: "text", placeholder: "Attached Bathroom" },
      { key: "badge", label: "Badge (optional)", type: "text", placeholder: "Best Value" },
      { key: "size", label: "Room size", type: "text", placeholder: "160 sq.ft" },
      { key: "occupancy", label: "Occupancy", type: "text", placeholder: "2 Guests" },
      { key: "tags", label: "Tags", type: "list", help: "One per line, e.g. 2 Guests / Free Wi-Fi" },
      { key: "image_url", label: "Image URL (optional)", type: "text", placeholder: "https://…" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "highlights", label: "Highlights", type: "list", help: "One per line" },
      ...visibility,
    ],
  },
  {
    table: "thalis",
    label: "Thali Menu",
    titleKey: "name",
    subtitleKeys: ["price"],
    hasVisible: true,
    hasSort: true,
    fields: [
      { key: "name", label: "Thali name", type: "text", required: true },
      { key: "slug", label: "Thali ID", type: "text", required: true, placeholder: "special" },
      { key: "price", label: "Price (₹)", type: "number", required: true, default: 100 },
      { key: "badge", label: "Badge (optional)", type: "text", placeholder: "Best Seller" },
      { key: "items", label: "Items included", type: "list", help: "One per line" },
      ...visibility,
    ],
  },
  {
    table: "reviews",
    label: "Reviews",
    titleKey: "name",
    subtitleKeys: ["city", "rating"],
    hasVisible: true,
    hasSort: true,
    fields: [
      { key: "name", label: "Guest name", type: "text", required: true },
      { key: "city", label: "City", type: "text" },
      { key: "rating", label: "Rating (1-5)", type: "number", default: 5 },
      { key: "stay", label: "Stay details", type: "text", placeholder: "Comfort Room · 2 Nights" },
      { key: "text", label: "Review", type: "textarea", required: true },
      ...visibility,
    ],
  },
  {
    table: "faqs",
    label: "FAQs",
    titleKey: "question",
    subtitleKeys: [],
    hasVisible: true,
    hasSort: true,
    fields: [
      { key: "question", label: "Question", type: "text", required: true },
      { key: "answer", label: "Answer", type: "textarea", required: true },
      ...visibility,
    ],
  },
  {
    table: "amenities",
    label: "Amenities",
    titleKey: "title",
    subtitleKeys: ["sub"],
    hasVisible: true,
    hasSort: true,
    fields: [
      { key: "title", label: "Amenity", type: "text", required: true },
      { key: "sub", label: "Short line", type: "text" },
      ...visibility,
    ],
  },
  {
    table: "attractions",
    label: "Nearby Places",
    titleKey: "name",
    subtitleKeys: ["distance"],
    hasVisible: true,
    hasSort: true,
    fields: [
      { key: "name", label: "Place name", type: "text", required: true },
      { key: "distance", label: "Distance", type: "text", placeholder: "4 km" },
      { key: "note", label: "Note", type: "textarea" },
      ...visibility,
    ],
  },
  {
    table: "coupons",
    label: "Coupons",
    titleKey: "code",
    subtitleKeys: ["discount_percent"],
    hasVisible: false,
    hasSort: false,
    fields: [
      { key: "code", label: "Coupon code", type: "text", required: true, placeholder: "WELCOME10", help: "Guests type this at checkout." },
      { key: "discount_percent", label: "Discount %", type: "number", required: true, default: 10 },
      { key: "active", label: "Active", type: "boolean", default: true },
    ],
  },
];
