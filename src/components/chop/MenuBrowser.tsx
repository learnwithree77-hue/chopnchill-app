import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { categories, type MenuItem } from "@/data/restaurantData";
import { cravings, matchesCraving, type CravingId } from "@/data/cravings";
import { useStore } from "@/lib/store";
import { ItemSheet } from "./ItemSheet";

export function MenuBrowser() {
  const { resolvedMenu, isAvailable, addToCart, cart } = useStore();
  const [category, setCategory] = useState<string>("all");
  const [craving, setCraving] = useState<CravingId | null>(null);
  const [budget, setBudget] = useState(false);
  const [detail, setDetail] = useState<MenuItem | null>(null);

  const filtered = useMemo(() => {
    return resolvedMenu.filter((m) => {
      if (category !== "all" && m.category !== category) return false;
      if (craving && !matchesCraving(m, craving)) return false;
      if (budget && m.price >= 100) return false;
      return true;
    });
  }, [resolvedMenu, category, craving, budget]);

  return (
    <section id="menu" className="border-y-4 border-foreground bg-secondary px-5 py-20 md:px-10">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-display text-5xl uppercase text-foreground md:text-7xl">The Menu</h2>
        <p className="mt-3 text-muted-foreground">Tap any item for details, sizes up your order as you go.</p>

        {/* CRAVING DISCOVERY */}
        <div className="mt-10 rounded-[1.75rem] border-2 border-primary bg-card p-6">
          <h3 className="font-display text-3xl uppercase text-foreground">
            What are you <span className="text-primary">craving?</span>
          </h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {cravings.map((c) => {
              const on = c.id === "budget" ? budget : craving === c.id;
              return (
                <button
                  key={c.id}
                  aria-pressed={on}
                  onClick={() => {
                    if (c.id === "budget") {
                      setBudget((b) => !b);
                      return;
                    }
                    setCraving((prev) => (prev === c.id ? null : c.id));
                    setCategory("all");
                  }}
                  className={`min-h-12 rounded-full border-2 px-5 font-display uppercase tracking-wide transition-colors ${
                    on
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border text-muted-foreground hover:border-accent hover:text-accent"
                  }`}
                >
                  {c.emoji} {c.label}
                </button>
              );
            })}
          </div>
          {(craving || budget) && (
            <button
              onClick={() => {
                setCraving(null);
                setBudget(false);
              }}
              className="mt-4 text-sm text-muted-foreground underline hover:text-accent"
            >
              Clear picks
            </button>
          )}
        </div>

        {/* UNDER ₹100 BANNER */}
        <button
          onClick={() => {
            setBudget(true);
            setCategory("all");
          }}
          className="mt-6 flex w-full items-center justify-between gap-4 rounded-[1.5rem] border-2 border-accent bg-accent px-6 py-5 text-left text-accent-foreground transition-transform hover:-translate-y-0.5"
        >
          <span>
            <span className="block font-display text-3xl uppercase leading-none md:text-4xl">
              Under ₹100 mode
            </span>
            <span className="text-sm opacity-80">Real hunger, small budget. Show me everything below ₹100.</span>
          </span>
          <span className="shrink-0 rounded-full bg-accent-foreground px-4 py-2 font-display uppercase text-accent">
            {budget ? "On" : "Go"}
          </span>
        </button>

        {/* CATEGORY FILTER */}
        <div className="no-scrollbar -mx-5 mt-8 flex gap-3 overflow-x-auto px-5 pb-2">
          {[{ id: "all", label: "All", emoji: "✦" }, ...categories].map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`min-h-12 shrink-0 rounded-full border-2 px-5 py-3 font-display uppercase tracking-wide transition-colors ${
                category === c.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-accent hover:text-accent"
              }`}
            >
              {c.emoji} {c.label}
            </button>
          ))}
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          {filtered.length} item{filtered.length === 1 ? "" : "s"}
          {budget ? " under ₹100" : ""}
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => {
            const available = isAvailable(item.id);
            const inCart = cart[item.id] ?? 0;
            return (
              <article
                key={item.id}
                className={`group overflow-hidden rounded-[1.75rem] border border-border bg-card transition-transform duration-300 hover:-translate-y-1.5 ${
                  available ? "" : "opacity-60"
                }`}
              >
                <button
                  onClick={() => setDetail(item)}
                  className="block w-full text-left"
                  aria-label={`View ${item.name}`}
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      width={1200}
                      height={900}
                      className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {item.tag && available && (
                      <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 font-display text-sm uppercase text-accent-foreground">
                        {item.tag}
                      </span>
                    )}
                    {item.price < 100 && (
                      <span className="absolute right-4 top-4 rounded-full border-2 border-accent bg-background/80 px-3 py-1 font-display text-sm uppercase text-accent backdrop-blur">
                        Under ₹100
                      </span>
                    )}
                    {!available && (
                      <span className="absolute bottom-4 left-4 rounded-full bg-background/90 px-3 py-1 font-display text-sm uppercase text-foreground">
                        Sold out
                      </span>
                    )}
                  </div>
                </button>
                <div className="space-y-2 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-2xl uppercase text-foreground">{item.name}</h3>
                    <span className="font-display text-2xl text-primary">₹{item.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  <button
                    disabled={!available}
                    onClick={() => addToCart(item.id, 1)}
                    className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary font-display uppercase text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Plus className="size-5" /> {available ? "Add" : "Unavailable"}
                    {inCart > 0 && available ? ` (${inCart})` : ""}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 rounded-[1.5rem] border border-border bg-card p-10 text-center text-muted-foreground">
            Nothing matches that combo. Try clearing a filter.
          </p>
        )}
      </div>

      <ItemSheet item={detail} onClose={() => setDetail(null)} />
    </section>
  );
}
