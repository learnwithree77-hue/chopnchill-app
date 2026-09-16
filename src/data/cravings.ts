import type { MenuItem } from "@/data/restaurantData";

export type CravingId = "loaded" | "crispy" | "cheesy" | "cold" | "budget";

export const cravings: { id: CravingId; label: string; emoji: string }[] = [
  { id: "loaded", label: "Loaded / Fries", emoji: "🍟" },
  { id: "crispy", label: "Crispy / Chicken", emoji: "🍗" },
  { id: "cheesy", label: "Cheesy", emoji: "🧀" },
  { id: "cold", label: "Something cold", emoji: "🥤" },
  { id: "budget", label: "Under ₹100", emoji: "💸" },
];

/** Classifies existing menu items — no new items, names or prices are introduced. */
export function matchesCraving(item: MenuItem, craving: CravingId): boolean {
  const text = `${item.name} ${item.description}`.toLowerCase();
  switch (craving) {
    case "loaded":
      return item.category === "loaded-fries" || item.category === "fries";
    case "crispy":
      return (
        item.category === "fried-chicken" ||
        text.includes("crisp") ||
        text.includes("fried") ||
        text.includes("broasted")
      );
    case "cheesy":
      return text.includes("cheese") || text.includes("cheesy");
    case "cold":
      return item.category === "shakes" || item.category === "drinks";
    case "budget":
      return item.price < 100;
    default:
      return true;
  }
}
