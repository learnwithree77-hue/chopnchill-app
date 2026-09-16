import { useEffect, useState } from "react";
import { Minus, Plus, X } from "lucide-react";

import type { MenuItem } from "@/data/restaurantData";
import { useStore } from "@/lib/store";

type Props = {
  item: MenuItem | null;
  onClose: () => void;
};

export function ItemSheet({ item, onClose }: Props) {
  const { addToCart, isAvailable } = useStore();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setQty(1);
  }, [item?.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!item) return null;
  const available = isAvailable(item.id);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        aria-label="Close item details"
        onClick={onClose}
        className="absolute inset-0 bg-background/85 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-label={item.name}
        className="animate-chop-rise relative w-full max-w-lg overflow-hidden rounded-t-[2rem] border-2 border-primary bg-card sm:rounded-[2rem]"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 rounded-full bg-background/80 p-2 text-foreground backdrop-blur hover:text-accent"
        >
          <X className="size-5" />
        </button>
        <img
          src={item.image}
          alt={item.name}
          width={1200}
          height={800}
          className="h-52 w-full object-cover sm:h-60"
        />
        <div className="space-y-4 p-6">
          <div className="flex items-start justify-between gap-4">
            <h2 className="font-display text-3xl uppercase text-foreground">{item.name}</h2>
            <span className="font-display text-3xl text-primary">₹{item.price}</span>
          </div>
          <p className="text-muted-foreground">{item.description}</p>

          {!available ? (
            <p className="rounded-2xl border border-border bg-secondary p-4 text-sm text-muted-foreground">
              Currently marked unavailable by the kitchen.
            </p>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-full border-2 border-border p-1">
                <button
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="rounded-full p-3 text-foreground hover:text-accent"
                >
                  <Minus className="size-4" />
                </button>
                <span className="w-6 text-center font-display text-xl text-foreground">{qty}</span>
                <button
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => Math.min(20, q + 1))}
                  className="rounded-full p-3 text-foreground hover:text-accent"
                >
                  <Plus className="size-4" />
                </button>
              </div>
              <button
                onClick={() => {
                  addToCart(item.id, qty);
                  onClose();
                }}
                className="min-h-14 flex-1 rounded-full bg-primary font-display text-lg uppercase text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Add · ₹{item.price * qty}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
