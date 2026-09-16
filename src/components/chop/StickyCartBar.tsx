import { ShoppingBag } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { useStore } from "@/lib/store";

export function StickyCartBar({ onOpenCart }: { onOpenCart: () => void }) {
  const { count, subtotal } = useStore();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-foreground bg-card/95 p-3 backdrop-blur md:hidden">
      {count > 0 ? (
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCart}
            className="flex min-h-14 flex-1 items-center justify-between rounded-full bg-primary px-5 font-display uppercase text-primary-foreground"
          >
            <span className="flex items-center gap-2">
              <ShoppingBag className="size-5" /> {count} item{count === 1 ? "" : "s"}
            </span>
            <span>₹{subtotal}</span>
          </button>
          <Link to="/checkout" className="shrink-0">
            <button className="min-h-14 rounded-full bg-accent px-5 font-display uppercase text-accent-foreground">
              Checkout
            </button>
          </Link>
        </div>
      ) : (
        <a href="#menu" className="block">
          <button className="min-h-14 w-full rounded-full bg-primary font-display uppercase text-primary-foreground">
            Order Now 🍟
          </button>
        </a>
      )}
    </div>
  );
}
