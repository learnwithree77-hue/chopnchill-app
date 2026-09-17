import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { useStore, type OrderMode } from "@/lib/store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Chop n Chill Kozhikode" },
      {
        name: "description",
        content:
          "Review your loaded fries, broasted chicken and shakes order from Chop n Chill, Kozhikode. Demo checkout for pickup or delivery.",
      },
      { property: "og:title", content: "Checkout — Chop n Chill Kozhikode" },
      {
        property: "og:description",
        content: "Review your Chop n Chill order and choose pickup or delivery.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { lines, subtotal, placeOrder } = useStore();
  const navigate = useNavigate();
  const [mode, setMode] = useState<OrderMode>("Pickup");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [placed, setPlaced] = useState<string | null>(null);

  if (placed) {
    return (
      <main className="mx-auto max-w-lg px-5 py-20 text-center">
        <h1 className="font-display text-4xl uppercase text-foreground">Order placed</h1>
        <p className="mt-3 text-muted-foreground">
          Demo order <span className="text-accent">{placed}</span> — no payment was taken and the
          kitchen has not received it. Real ordering needs the restaurant's own system.
        </p>
        <Link to="/" className="mt-8 inline-block">
          <button className="min-h-12 rounded-full bg-primary px-8 font-display uppercase text-primary-foreground">
            Back home
          </button>
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-lg px-5 py-12">
      <h1 className="font-display text-4xl uppercase text-foreground">Checkout</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Demo checkout — no payment is taken and no order reaches the kitchen.
      </p>

      {lines.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-border bg-card p-8 text-center">
          <p className="font-display text-2xl uppercase text-foreground">Cart's empty</p>
          <Link to="/" className="mt-6 inline-block">
            <button className="min-h-12 rounded-full border-2 border-accent px-6 font-display uppercase text-accent">
              Browse menu
            </button>
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          <section className="space-y-2 rounded-2xl border border-border bg-card p-5">
            {lines.map((l) => (
              <div key={l.item.id} className="flex justify-between text-foreground">
                <span>
                  {l.qty} × {l.item.name}
                </span>
                <span className="text-accent">₹{l.item.price * l.qty}</span>
              </div>
            ))}
            <div className="flex justify-between border-t border-border pt-3 font-display text-2xl uppercase text-foreground">
              <span>Total</span>
              <span className="text-accent">₹{subtotal}</span>
            </div>
          </section>

          <div className="flex gap-3">
            {(["Pickup", "Delivery"] as OrderMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`min-h-12 flex-1 rounded-full border-2 font-display uppercase ${
                  mode === m
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border text-foreground"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          {mode === "Delivery" && (
            <p className="rounded-xl border border-border bg-secondary p-3 text-xs text-muted-foreground">
              Delivery availability, areas and charges need confirmation from the restaurant — not
              shown here.
            </p>
          )}

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="min-h-12 w-full rounded-xl border border-border bg-secondary px-4 text-foreground"
          />
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Notes for the kitchen (optional)"
            className="min-h-24 w-full rounded-xl border border-border bg-secondary p-4 text-foreground"
          />

          <button
            disabled={!name.trim()}
            onClick={() => {
              const order = placeOrder({ mode, name: name.trim(), note });
              setPlaced(order.id);
              void navigate;
            }}
            className="min-h-14 w-full rounded-full bg-primary font-display text-lg uppercase text-primary-foreground disabled:opacity-50"
          >
            Place demo order
          </button>
        </div>
      )}
    </main>
  );
}
