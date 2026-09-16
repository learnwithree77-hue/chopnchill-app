import { useMemo, useState } from "react";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { restaurant, type MenuItem } from "@/data/restaurantData";

export type CartLine = { item: MenuItem; qty: number };

type Props = {
  open: boolean;
  onClose: () => void;
  lines: CartLine[];
  onChangeQty: (id: string, delta: number) => void;
};

export function OrderDrawer({ open, onClose, lines, onChangeQty }: Props) {
  const [mode, setMode] = useState<"Delivery" | "Pickup">("Delivery");
  const total = useMemo(() => lines.reduce((s, l) => s + l.item.price * l.qty, 0), [lines]);

  const whatsappUrl = useMemo(() => {
    const body =
      `Hi ${restaurant.name}! I'd like to place a ${mode} order:\n\n` +
      lines.map((l) => `• ${l.qty} x ${l.item.name} — ₹${l.item.price * l.qty}`).join("\n") +
      `\n\nTotal: ₹${total}`;
    return `https://wa.me/${restaurant.whatsapp}?text=${encodeURIComponent(body)}`;
  }, [lines, mode, total]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        aria-label="Close order drawer"
        onClick={onClose}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
      />
      <aside className="relative flex h-full w-full max-w-md flex-col border-l-4 border-primary bg-card animate-chop-slide-in">
        <header className="flex items-center justify-between border-b border-border p-5">
          <h2 className="font-display text-3xl uppercase text-foreground">Your Order</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full border border-border p-2 text-foreground hover:border-accent hover:text-accent"
          >
            <X className="size-5" />
          </button>
        </header>

        <div className="flex gap-2 p-5 pb-0">
          {(["Delivery", "Pickup"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 rounded-full border-2 px-4 py-3 font-display uppercase tracking-wide min-h-12 transition-colors ${
                mode === m
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-accent hover:text-accent"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto p-5">
          {lines.length === 0 && (
            <p className="py-16 text-center text-muted-foreground">
              Nothing here yet. Go load up on fries.
            </p>
          )}
          {lines.map((l) => (
            <div key={l.item.id} className="flex items-center gap-3 rounded-2xl border border-border bg-secondary p-3">
              <img
                src={l.item.image}
                alt={l.item.name}
                loading="lazy"
                width={80}
                height={80}
                className="size-16 rounded-xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-foreground">{l.item.name}</p>
                <p className="text-sm text-accent">₹{l.item.price * l.qty}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  aria-label={`Remove one ${l.item.name}`}
                  onClick={() => onChangeQty(l.item.id, -1)}
                  className="rounded-full border border-border p-2 text-foreground"
                >
                  <Minus className="size-4" />
                </button>
                <span className="w-5 text-center font-display text-lg text-foreground">{l.qty}</span>
                <button
                  aria-label={`Add one ${l.item.name}`}
                  onClick={() => onChangeQty(l.item.id, 1)}
                  className="rounded-full border border-border p-2 text-foreground"
                >
                  <Plus className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <footer className="space-y-4 border-t border-border p-5">
          <div className="flex items-center justify-between font-display text-2xl uppercase text-foreground">
            <span>Total</span>
            <span className="text-accent">₹{total}</span>
          </div>
          <a
            href={lines.length ? whatsappUrl : undefined}
            target="_blank"
            rel="noreferrer"
            className={lines.length ? "" : "pointer-events-none opacity-40"}
          >
            <MagneticButton className="w-full" variant="accent">
              <ShoppingBag className="size-5" /> Send {mode} order on WhatsApp
            </MagneticButton>
          </a>
          <p className="text-center text-xs text-muted-foreground">
            {mode === "Delivery" ? "Delivery across Kozhikode town limits." : `Pickup at ${restaurant.address.street}.`}
          </p>
        </footer>
      </aside>
    </div>
  );
}
