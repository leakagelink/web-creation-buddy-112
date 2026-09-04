import smart from "@/assets/room-smart.jpg";
import comfort from "@/assets/room-comfort.jpg";
import premium from "@/assets/room-premium.jpg";
import signature from "@/assets/room-signature.jpg";

export type Room = {
  id: string;
  name: string;
  price: number;
  subtitle: string;
  tags: string[];
  badge?: string;
  image: string;
};

export const rooms: Room[] = [
  {
    id: "smart",
    name: "Smart Room",
    price: 499,
    subtitle: "Shared Bathroom",
    tags: ["1 Guest", "Free Wi-Fi"],
    badge: "Best Value",
    image: smart,
  },
  {
    id: "comfort",
    name: "Comfort Room",
    price: 699,
    subtitle: "Attached Bathroom",
    tags: ["2 Guests", "Free Wi-Fi"],
    image: comfort,
  },
  {
    id: "premium",
    name: "Premium Room",
    price: 999,
    subtitle: "Attached Bathroom + Extra Amenities",
    tags: ["2 Guests", "AC Room", "Free Wi-Fi"],
    badge: "Most Popular",
    image: premium,
  },
  {
    id: "signature",
    name: "Signature Room",
    price: 1499,
    subtitle: "Larger Room + Extra Amenities",
    tags: ["2 Guests", "AC Room", "Free Wi-Fi"],
    image: signature,
  },
];

export type Thali = {
  id: string;
  name: string;
  price: number;
  items: string[];
  badge?: string;
};

export const thalis: Thali[] = [
  { id: "mini", name: "Mini Thali", price: 80, items: ["2 Roti", "Dal", "Seasonal Sabzi", "Rice", "Salad / Achar"] },
  {
    id: "normal",
    name: "Normal Thali",
    price: 120,
    badge: "Best Seller",
    items: ["4 Roti", "Dal Tadka", "1 Seasonal Sabzi", "Rice", "Salad", "Achar"],
  },
  {
    id: "special",
    name: "Special Thali",
    price: 180,
    items: ["4 Roti / 1 Paratha", "Dal Tadka", "2 Seasonal Sabzi", "Rice", "Salad", "Achar", "Sweet"],
  },
];

export const amenities = [
  { title: "Free Wi-Fi", sub: "High Speed Internet" },
  { title: "24x7 Support", sub: "Always Here for You" },
  { title: "Power Backup", sub: "Uninterrupted Comfort" },
  { title: "Daily Housekeeping", sub: "Clean & Hygienic Rooms" },
  { title: "CCTV Security", sub: "Your Safety, Our Priority" },
  { title: "Easy Check-in", sub: "Hassle Free Process" },
];

export const contact = {
  phone: "9454865382",
  altPhone: "9511173635",
  email: "bookinghouse499@gmail.com",
  address: "Varanasi, Uttar Pradesh, India",
};
