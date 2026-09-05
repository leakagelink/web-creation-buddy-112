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

export const whatsappLink = `https://wa.me/91${contact.phone}?text=${encodeURIComponent(
  "Hello House499! I want to book a room.",
)}`;

export type Review = {
  name: string;
  city: string;
  rating: number;
  text: string;
  stay: string;
};

export const reviews: Review[] = [
  {
    name: "Rahul Sharma",
    city: "Delhi",
    rating: 5,
    text: "Room bilkul clean thi aur staff bahut helpful. ₹499 me itni achhi facility expect nahi ki thi. Highly recommended!",
    stay: "Smart Room · 2 Nights",
  },
  {
    name: "Priya Verma",
    city: "Lucknow",
    rating: 5,
    text: "Best budget stay in Varanasi. Washroom spotless tha, Wi-Fi bhi fast. Ghat sirf 10 minute door hai.",
    stay: "Comfort Room · 3 Nights",
  },
  {
    name: "Amit Kumar",
    city: "Patna",
    rating: 4,
    text: "Thali ekdum ghar jaisi lagi. Fresh aur hygienic. Room chhota tha par bilkul clean aur comfortable.",
    stay: "Premium Room · 1 Night",
  },
  {
    name: "Sneha Iyer",
    city: "Mumbai",
    rating: 5,
    text: "Solo female traveller ke liye safe feel hua — CCTV aur 24x7 support ne confidence diya. Booking process easy tha.",
    stay: "Comfort Room · 2 Nights",
  },
  {
    name: "Vikram Singh",
    city: "Kanpur",
    rating: 5,
    text: "Value for money! Family ke saath gaya tha, AC room ne mast stay karaya. Check-in bina kisi jhanjhat hua.",
    stay: "Premium Room · 2 Nights",
  },
  {
    name: "Anjali Gupta",
    city: "Kolkata",
    rating: 4,
    text: "Location achhi hai, station paas hai. Special thali must try — sweet ke saath complete meal. Wapas aaungi!",
    stay: "Signature Room · 1 Night",
  },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Check-in aur check-out ka time kya hai?",
    a: "Check-in 12:00 PM se hai aur check-out 11:00 AM tak. Early check-in availability par subject hai — call karke confirm kar lein.",
  },
  {
    q: "Kaunsa ID proof chahiye?",
    a: "Check-in par valid government ID (Aadhaar, DL, Passport, Voter ID) zaroori hai. Har guest ka ID chahiye hota hai.",
  },
  {
    q: "Cancellation policy kya hai?",
    a: "Check-in se 24 ghante pehle tak cancellation free hai. Uske baad first night ka charge lag sakta hai.",
  },
  {
    q: "Kya thali room me deliver hoti hai?",
    a: "Ji haan! Fresh thali aapke room me deliver hoti hai. Order aap booking me add kar sakte hain ya stay ke dauran bhi.",
  },
  {
    q: "Parking available hai?",
    a: "Ji haan, free parking property ke paas available hai — two wheeler aur car dono ke liye.",
  },
  {
    q: "Kya couples/families allowed hain?",
    a: "Ji haan, married couples aur families welcome hain. Valid ID proof sabhi guests ka chahiye.",
  },
];

export type Attraction = { name: string; distance: string; note: string };

export const attractions: Attraction[] = [
  { name: "Kashi Vishwanath Temple", distance: "4 km", note: "One of the 12 Jyotirlingas — the heart of Varanasi." },
  { name: "Dashashwamedh Ghat", distance: "4.5 km", note: "Famous Ganga Aarti every evening at sunset." },
  { name: "Assi Ghat", distance: "5 km", note: "Peaceful morning aarti and yoga by the river." },
  { name: "Sarnath", distance: "10 km", note: "Where Buddha gave his first sermon — stupas & museum." },
  { name: "Varanasi Junction (Station)", distance: "3 km", note: "Main railway station, easy auto/tuk-tuk ride." },
  { name: "Lal Bahadur Shastri Airport", distance: "26 km", note: "Around 45–60 minutes by taxi." },
];

export const normalThali: Thali = thalis[1]!;

export function getRoom(id: string): Room {
  return rooms.find((r) => r.id === id) ?? rooms[2]!;
}
