import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { useStore } from "@/lib/store";

type Props = { open: boolean; onClose: () => void };

export function CartSheet({ open, onClose }: Props) {
  const { lines, subtotal, changeQty, clearCart, count } = useStore();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        aria-label="Close cart"
        onClick={onClose}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
      />
      <aside className="animate-chop-slide-in relative flex h-full w-full max-w-md flex-col border-l-4 border-primary bg-card">
        <header className="flex items-center justify-between border-b border-border p-5">
          <h2 className="font-display text-3xl uppercase text-foreground">
            Your Cart {count > 0 && <span className="text-accent">({count})</span>}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full border border-border p-2 text-foreground hover:border-accent hover:text-accent"
          >
            <X className="size-5" />
          </button>
        </header>

        <div className="flex-1 space-y-3 overflow-y-auto p-5">
          {lines.length === 0 && (
            <div className="py-20 text-center">
              <ShoppingBag className="mx-auto size-10 text-muted-foreground" />
              <p className="mt-4 font-display text-2xl uppercase text-foreground">Cart's empty</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Go load up on fries — the fryer is on.
              </p>
              <button
                onClick={onClose}
                className="mt-6 min-h-12 rounded-full border-2 border-accent px-6 font-display uppercase text-accent"
              >
                Browse menu
              </button>
            </div>
          )}

          {lines.map((l) => (
            <div
              key={l.item.id}
              className="flex items-center gap-3 rounded-2xl border border-border bg-secondary p-3"
            >
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
              <div className="flex items-center gap-1.5">
                <button
                  aria-label={`Remove one ${l.item.name}`}
                  onClick={() => changeQty(l.item.id, -1)}
                  className="rounded-full border border-border p-2 text-foreground hover:text-accent"
                >
                  {l.qty === 1 ? <Trash2 className="size-4" /> : <Minus className="size-4" />}
                </button>
                <span className="w-5 text-center font-display text-lg text-foreground">{l.qty}</span>
                <button
                  aria-label={`Add one ${l.item.name}`}
                  onClick={() => changeQty(l.item.id, 1)}
                  className="rounded-full border border-border p-2 text-foreground hover:text-accent"
                >
                  <Plus className="size-4" />
                </button>
              </div>
            </div>
          ))}

          {lines.length > 0 && (
            <button
              onClick={clearCart}
              className="mx-auto block pt-2 text-sm text-muted-foreground underline hover:text-accent"
            >
              Clear cart
            </button>
          )}
        </div>

        {lines.length > 0 && (
          <footer className="space-y-4 border-t border-border p-5">
            <div className="flex items-center justify-between font-display text-2xl uppercase text-foreground">
              <span>Subtotal</span>
              <span className="text-accent">₹{subtotal}</span>
            </div>
            <Link to="/checkout" onClick={onClose}>
              <button className="min-h-14 w-full rounded-full bg-accent font-display text-lg uppercase text-accent-foreground transition-transform active:scale-95">
                Checkout
              </button>
            </Link>
            <p className="text-center text-xs text-muted-foreground">
              Demo checkout — no payment is taken and no order reaches the kitchen yet.
            </p>
          </footer>
        )}
      </aside>
    </div>
  );
}
