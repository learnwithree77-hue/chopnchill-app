/**
 * Central config for Chop n Chill.
 * Owners: edit prices, items, hours and contact details here — nothing else needs to change.
 */

import loadedFries from "@/assets/loaded-fries.jpg";
import broastedChicken from "@/assets/broasted-chicken.jpg";
import smashBurger from "@/assets/smash-burger.jpg";
import thickShake from "@/assets/thick-shake.jpg";

export const images = { loadedFries, broastedChicken, smashBurger, thickShake };

export const restaurant = {
  name: "Chop n Chill",
  tagline: "Loaded fries. Crispy chicken. Insane shakes. Big flavour without the big bill.",
  phone: "+919567000000",
  whatsapp: "919567000000", // country code + number, no +
  email: "hello@chopnchill.in",
  priceRange: "₹1–200 per person",
  address: {
    street: "Kinassery, Thottummaram",
    city: "Kozhikode",
    state: "Kerala",
    postalCode: "673007",
    country: "IN",
  },
  get fullAddress() {
    return `${this.address.street}, ${this.address.city}, ${this.address.state} ${this.address.postalCode}`;
  },
  coordinates: { lat: 11.3416, lng: 75.8893 },
  mapsQuery: "Chop n Chill, Kinassery, Thottummaram, Kozhikode, Kerala 673007",
  rating: { value: 4.3, count: 19, source: "Google" },
  hours: [
    { days: "Monday – Thursday", time: "11:00 AM – 1:00 AM" },
    { days: "Friday – Saturday", time: "11:00 AM – 1:00 AM" },
    { days: "Sunday", time: "12:00 PM – 1:00 AM" },
  ],
  services: ["Dine-in", "Takeaway", "Delivery"],
} as const;

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  restaurant.mapsQuery,
)}`;

export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  restaurant.mapsQuery,
)}&output=embed`;

export const badges = [
  { label: `${restaurant.rating.value}★ Google Rating`, sub: `${restaurant.rating.count} reviews` },
  { label: "₹1–200", sub: "per person" },
  { label: "Open Until 1 AM", sub: "late night" },
  { label: "Big Flavour", sub: "no compromise" },
];

export const marqueeWords = [
  "CHOP",
  "CHILL",
  "CRUNCH",
  "REPEAT",
  "LOADED FRIES",
  "BROASTED CHICKEN",
  "COLD SHAKES",
];

export type Category = { id: string; label: string; emoji: string };

export const categories: Category[] = [
  { id: "loaded-fries", label: "Loaded Fries", emoji: "🔥" },
  { id: "fried-chicken", label: "Fried Chicken", emoji: "🍗" },
  { id: "burgers", label: "Burgers", emoji: "🍔" },
  { id: "sandwiches", label: "Sandwiches", emoji: "🥪" },
  { id: "fries", label: "Fries", emoji: "🍟" },
  { id: "shakes", label: "Shakes", emoji: "🥤" },
  { id: "drinks", label: "Drinks", emoji: "🧋" },
];

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  tag?: string;
};

export const menu: MenuItem[] = [
  {
    id: "lf-1",
    name: "Classic Loaded Fries",
    description: "Crispy fries drowned in cheese sauce, herbs and house spice mix.",
    price: 120,
    category: "loaded-fries",
    image: loadedFries,
    tag: "BESTSELLER",
  },
  {
    id: "lf-2",
    name: "Peri Peri Chicken Fries",
    description: "Shredded peri peri chicken, molten cheese, jalapeños, chilli flakes.",
    price: 160,
    category: "loaded-fries",
    image: loadedFries,
  },
  {
    id: "lf-3",
    name: "Cheesy Corn Loaded Fries",
    description: "Sweet corn, double cheese, crushed pepper. Comfort in a box.",
    price: 140,
    category: "loaded-fries",
    image: loadedFries,
  },
  {
    id: "fc-1",
    name: "Broasted Chicken (2 pc)",
    description: "Pressure-fried, juicy inside, shattering crust outside.",
    price: 130,
    category: "fried-chicken",
    image: broastedChicken,
    tag: "SIGNATURE",
  },
  {
    id: "fc-2",
    name: "Broasted Chicken (4 pc)",
    description: "The full loud experience. Share it, or don't.",
    price: 200,
    category: "fried-chicken",
    image: broastedChicken,
  },
  {
    id: "fc-3",
    name: "Crispy Chicken Strips",
    description: "Five golden strips with dip of your choice.",
    price: 110,
    category: "fried-chicken",
    image: broastedChicken,
  },
  {
    id: "bg-1",
    name: "Chop Smash Burger",
    description: "Double smashed patty, melted cheese, house smash sauce.",
    price: 150,
    category: "burgers",
    image: smashBurger,
    tag: "NEW",
  },
  {
    id: "bg-2",
    name: "Crispy Chicken Burger",
    description: "Fried chicken fillet, slaw, spicy mayo, toasted bun.",
    price: 120,
    category: "burgers",
    image: smashBurger,
  },
  {
    id: "bg-3",
    name: "Veg Cheese Burger",
    description: "Crunchy veg patty, cheese slice, tangy sauce.",
    price: 80,
    category: "burgers",
    image: smashBurger,
  },
  {
    id: "sw-1",
    name: "Grilled Chicken Sandwich",
    description: "Grilled chicken, cheese, lettuce, pressed hot.",
    price: 100,
    category: "sandwiches",
    image: smashBurger,
  },
  {
    id: "sw-2",
    name: "Club Sandwich",
    description: "Triple decker, loaded layers, served with fries.",
    price: 130,
    category: "sandwiches",
    image: smashBurger,
  },
  {
    id: "fr-1",
    name: "Salted Fries",
    description: "Hot, crisp, salted. The honest classic.",
    price: 60,
    category: "fries",
    image: loadedFries,
  },
  {
    id: "fr-2",
    name: "Peri Peri Fries",
    description: "Tossed in fiery peri peri dust.",
    price: 70,
    category: "fries",
    image: loadedFries,
  },
  {
    id: "fr-3",
    name: "Cheese Dip",
    description: "Add-on tub of molten cheese sauce.",
    price: 30,
    category: "fries",
    image: loadedFries,
  },
  {
    id: "sh-1",
    name: "Death by Chocolate Shake",
    description: "Thick chocolate shake, whipped cream, chocolate shards.",
    price: 120,
    category: "shakes",
    image: thickShake,
    tag: "FAN FAVE",
  },
  {
    id: "sh-2",
    name: "Oreo Thick Shake",
    description: "Crushed cookies blended thick. Straw optional.",
    price: 110,
    category: "shakes",
    image: thickShake,
  },
  {
    id: "sh-3",
    name: "Strawberry Shake",
    description: "Cold, creamy, pink and loud.",
    price: 100,
    category: "shakes",
    image: thickShake,
  },
  {
    id: "dr-1",
    name: "Fresh Lime Soda",
    description: "Sweet or salted. Instant cool down.",
    price: 40,
    category: "drinks",
    image: thickShake,
  },
  {
    id: "dr-2",
    name: "Iced Tea",
    description: "Lemon iced tea over crushed ice.",
    price: 50,
    category: "drinks",
    image: thickShake,
  },
  {
    id: "dr-3",
    name: "Bottled Water",
    description: "Because sometimes you just need water.",
    price: 20,
    category: "drinks",
    image: thickShake,
  },
];

export const whyUs = [
  { no: "01", title: "BIG PORTIONS", text: "More food. Less damage to your wallet." },
  { no: "02", title: "AFFORDABLE PRICES", text: "₹1–200 range with zero compromise on taste." },
  { no: "03", title: "FAST SERVICE", text: "Hot and fresh without the endless waiting." },
  { no: "04", title: "LATE-NIGHT CRAVINGS", text: "Open until 1 AM for when hunger hits after hours." },
];

export const reviews = [
  {
    name: "Arjun P.",
    rating: 5,
    text: "The loaded fries here are unreal. Cheese everywhere, portion was way bigger than I expected.",
  },
  {
    name: "Fathima K.",
    rating: 4,
    text: "Broasted chicken was hot and crispy, and the bill barely touched ₹200 for two of us.",
  },
  {
    name: "Nihal S.",
    rating: 5,
    text: "Ordered at midnight and food came out fast. Perfect late-night spot in Kozhikode.",
  },
  {
    name: "Meera R.",
    rating: 4,
    text: "Thick shakes are seriously thick. Friendly staff, quick service, good value.",
  },
];

export const showcase = [
  { word: "LOADED.", title: "Loaded Fries", image: loadedFries, note: "Cheese pull guaranteed." },
  { word: "CRISPY.", title: "Broasted Chicken", image: broastedChicken, note: "Pressure-fried, never dry." },
  { word: "CHEESY.", title: "Smash Burgers", image: smashBurger, note: "Smashed thin, stacked high." },
  { word: "NO BORING BITES.", title: "Thick Shakes", image: thickShake, note: "Cold, thick, loud." },
];
