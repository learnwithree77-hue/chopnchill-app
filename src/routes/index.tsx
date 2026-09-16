import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Star, MapPin, Clock, Phone, Plus, ShoppingBag, Moon } from "lucide-react";

import { Marquee } from "@/components/chop/Marquee";
import { MagneticButton } from "@/components/chop/MagneticButton";
import { OrderDrawer, type CartLine } from "@/components/chop/OrderDrawer";
import {
  badges,
  categories,
  directionsUrl,
  mapEmbedUrl,
  menu,
  restaurant,
  reviews,
  showcase,
  whyUs,
  images,
} from "@/data/restaurantData";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chop n Chill — Loaded Fries & Broasted Chicken in Kozhikode" },
      {
        name: "description",
        content:
          "Chop n Chill in Kinassery, Thottummaram, Kozhikode. Loaded fries, broasted chicken, smash burgers and thick shakes from ₹1–200. Open until 1 AM.",
      },
      { property: "og:title", content: "Chop n Chill — Chop. Chill. Crave." },
      {
        property: "og:description",
        content:
          "Loaded fries. Crispy chicken. Insane shakes. Big flavour without the big bill. Kozhikode, open until 1 AM.",
      },
      { property: "og:type", content: "restaurant" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: restaurant.name,
  servesCuisine: ["Street Food", "Fast Food", "Kerala"],
  priceRange: "₹1–200",
  telephone: restaurant.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: restaurant.address.street,
    addressLocality: restaurant.address.city,
    addressRegion: restaurant.address.state,
    postalCode: restaurant.address.postalCode,
    addressCountry: restaurant.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: restaurant.coordinates.lat,
    longitude: restaurant.coordinates.lng,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: restaurant.rating.value,
    reviewCount: restaurant.rating.count,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "11:00",
      closes: "01:00",
    },
  ],
};

function Index() {
  const [active, setActive] = useState(categories[0]!.id);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [open, setOpen] = useState(false);

  const lines: CartLine[] = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => ({ item: menu.find((m) => m.id === id)!, qty }))
        .filter((l) => l.item && l.qty > 0),
    [cart],
  );
  const count = lines.reduce((s, l) => s + l.qty, 0);

  const changeQty = (id: string, delta: number) =>
    setCart((c) => {
      const next = Math.max(0, (c[id] ?? 0) + delta);
      const copy = { ...c };
      if (next === 0) delete copy[id];
      else copy[id] = next;
      return copy;
    });

  const filtered = menu.filter((m) => m.category === active);

  return (
    <div className="grain min-h-screen overflow-x-hidden bg-background pb-24 md:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* NAV */}
      <nav className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/85 px-5 py-4 backdrop-blur md:px-10">
        <span className="font-display text-2xl uppercase tracking-wide text-foreground">
          Chop <span className="text-primary">n</span> Chill
        </span>
        <div className="hidden gap-8 font-medium text-muted-foreground md:flex">
          <a href="#menu" className="hover:text-accent">Menu</a>
          <a href="#why" className="hover:text-accent">Why Us</a>
          <a href="#reviews" className="hover:text-accent">Reviews</a>
          <a href="#visit" className="hover:text-accent">Visit</a>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="relative rounded-full bg-primary px-5 py-3 font-display uppercase text-primary-foreground"
        >
          <ShoppingBag className="inline size-5" />
          {count > 0 && (
            <span className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-accent text-sm text-accent-foreground">
              {count}
            </span>
          )}
        </button>
      </nav>

      {/* HERO */}
      <header className="relative px-5 pt-12 md:px-10 md:pt-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-5 inline-block rounded-full border border-primary px-4 py-1.5 text-sm uppercase tracking-[0.25em] text-primary">
              Kozhikode • Street Food
            </p>
            <h1 className="font-display text-[3.4rem] leading-[0.85] uppercase text-foreground sm:text-8xl xl:text-[9rem]">
              Chop.
              <br />
              <span className="text-primary">Chill.</span>
              <br />
              <span className="text-accent">Crave.</span>
            </h1>
            <p className="mt-7 max-w-md text-lg text-muted-foreground">{restaurant.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <MagneticButton onClick={() => setOpen(true)}>Order Now 🍟</MagneticButton>
              <MagneticButton variant="outline" onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}>
                Explore Menu
              </MagneticButton>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-full bg-primary/25 blur-3xl" />
            <img
              src={images.loadedFries}
              alt="Loaded fries piled with cheese sauce and chicken at Chop n Chill"
              width={1200}
              height={1408}
              className="relative -mt-6 w-full scale-105 rounded-[2rem] object-cover md:-mr-10 md:scale-110"
            />
            <div className="animate-chop-float absolute -left-3 top-8 rounded-2xl border-2 border-accent bg-card px-4 py-3 shadow-xl">
              <p className="font-display text-xl text-accent">{restaurant.rating.value}★ Google</p>
              <p className="text-xs text-muted-foreground">{restaurant.rating.count} reviews</p>
            </div>
            <div className="animate-chop-float absolute -right-2 bottom-16 rounded-2xl border-2 border-primary bg-card px-4 py-3 shadow-xl [animation-delay:1s]">
              <p className="font-display text-xl text-primary">₹1–200</p>
              <p className="text-xs text-muted-foreground">per person</p>
            </div>
            <div className="animate-chop-float absolute bottom-0 left-6 rounded-2xl border-2 border-border bg-card px-4 py-3 shadow-xl [animation-delay:2s]">
              <p className="font-display text-xl text-foreground">Open Until 1 AM</p>
              <p className="text-xs text-muted-foreground">Big Flavour</p>
            </div>
          </div>
        </div>
      </header>

      <div className="mt-14">
        <Marquee />
      </div>

      {/* EDITORIAL SHOWCASE */}
      <section className="px-5 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-5xl uppercase text-foreground md:text-8xl">
            Crispy. Loud.
            <br />
            <span className="text-primary">Unapologetic.</span>
          </h2>
          <div className="mt-14 grid gap-6 md:grid-cols-12">
            {showcase.map((s, i) => (
              <article
                key={s.title}
                className={`group relative overflow-hidden rounded-[2rem] border border-border bg-card ${
                  i === 0
                    ? "md:col-span-7 md:row-span-2"
                    : i === 1
                      ? "md:col-span-5"
                      : i === 2
                        ? "md:col-span-5"
                        : "md:col-span-12"
                }`}
              >
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  width={1200}
                  height={1200}
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                    i === 0 ? "h-[26rem] md:h-[40rem]" : "h-64 md:h-72"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="font-display text-4xl uppercase text-accent md:text-6xl">{s.word}</p>
                  <p className="mt-1 font-display text-2xl uppercase text-foreground">{s.title}</p>
                  <p className="text-sm text-muted-foreground">{s.note}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="border-y-4 border-foreground bg-secondary px-5 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-5xl uppercase text-foreground md:text-7xl">The Menu</h2>
          <p className="mt-3 text-muted-foreground">Everything between ₹20 and ₹200. No boring bites.</p>

          <div className="no-scrollbar -mx-5 mt-8 flex gap-3 overflow-x-auto px-5 pb-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`shrink-0 rounded-full border-2 px-5 py-3 font-display uppercase tracking-wide min-h-12 transition-colors ${
                  active === c.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-accent hover:text-accent"
                }`}
              >
                {c.emoji} {c.label}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <article
                key={item.id}
                className="group overflow-hidden rounded-[1.75rem] border border-border bg-card transition-transform duration-300 hover:-translate-y-1.5"
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
                  {item.tag && (
                    <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 font-display text-sm uppercase text-accent-foreground">
                      {item.tag}
                    </span>
                  )}
                </div>
                <div className="space-y-2 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-2xl uppercase text-foreground">{item.name}</h3>
                    <span className="font-display text-2xl text-primary">₹{item.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  <button
                    onClick={() => changeQty(item.id, 1)}
                    className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary font-display uppercase text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <Plus className="size-5" /> Add {cart[item.id] ? `(${cart[item.id]})` : ""}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section id="why" className="px-5 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-5xl uppercase text-foreground md:text-7xl">
            Why Chop <span className="text-primary">n</span> Chill
          </h2>
          <div className="mt-12 grid gap-0 border-2 border-foreground sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((w) => (
              <div
                key={w.no}
                className="border-b-2 border-r-2 border-foreground p-8 transition-colors last:border-r-0 hover:bg-primary hover:text-primary-foreground"
              >
                <p className="font-display text-6xl text-accent">{w.no}</p>
                <h3 className="mt-4 font-display text-2xl uppercase">{w.title}</h3>
                <p className="mt-2 text-sm opacity-80">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LATE NIGHT */}
      <section className="relative overflow-hidden border-y-4 border-foreground bg-card px-5 py-24 text-center md:px-10">
        <div className="absolute left-1/2 top-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl">
          <Moon className="mx-auto size-10 text-accent" />
          <h2 className="mt-6 font-display text-5xl uppercase leading-[0.9] text-foreground md:text-8xl">
            The craving
            <br />
            doesn't sleep.
          </h2>
          <p className="animate-chop-pulse-glow mt-8 font-display text-3xl uppercase tracking-[0.2em] text-accent md:text-5xl">
            Open Until 1 AM
          </p>
          <p className="mt-4 text-muted-foreground">
            Night shifts, late study sessions, post-movie hunger — the fryer is still on.
          </p>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="px-5 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-5xl uppercase text-foreground md:text-7xl">Word on the street</h2>
            <div className="rounded-2xl border-2 border-accent bg-card px-6 py-4">
              <p className="font-display text-4xl text-accent">{restaurant.rating.value}★</p>
              <p className="text-sm text-muted-foreground">Based on {restaurant.rating.count} Google reviews</p>
            </div>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {reviews.map((r) => (
              <blockquote key={r.name} className="rounded-[1.5rem] border border-border bg-card p-6">
                <div className="flex gap-1 text-accent">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-foreground">"{r.text}"</p>
                <footer className="mt-4 font-display uppercase text-muted-foreground">— {r.name}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* VISIT */}
      <section id="visit" className="border-t-4 border-foreground bg-secondary px-5 py-20 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-5xl uppercase text-foreground md:text-7xl">Find us</h2>
            <div className="mt-8 space-y-6">
              <div className="flex gap-4">
                <MapPin className="mt-1 size-6 shrink-0 text-primary" />
                <p className="text-lg text-foreground">{restaurant.fullAddress}</p>
              </div>
              <div className="flex gap-4">
                <Clock className="mt-1 size-6 shrink-0 text-primary" />
                <ul className="space-y-1 text-foreground">
                  {restaurant.hours.map((h) => (
                    <li key={h.days}>
                      <span className="text-muted-foreground">{h.days}:</span> {h.time}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-4">
                <Phone className="mt-1 size-6 shrink-0 text-primary" />
                <a href={`tel:${restaurant.phone}`} className="text-lg text-foreground hover:text-accent">
                  {restaurant.phone}
                </a>
              </div>
              <div className="flex flex-wrap gap-3">
                {restaurant.services.map((s) => (
                  <span key={s} className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground">
                    {s}
                  </span>
                ))}
              </div>
              <a href={directionsUrl} target="_blank" rel="noreferrer" className="inline-block">
                <MagneticButton>Get Directions</MagneticButton>
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-[2rem] border-2 border-foreground">
            <iframe
              title={`Map to ${restaurant.name}`}
              src={mapEmbedUrl}
              loading="lazy"
              className="h-[26rem] w-full"
            />
          </div>
        </div>
      </section>

      <footer className="px-5 py-12 text-center md:px-10">
        <p className="font-display text-3xl uppercase text-foreground">
          Chop <span className="text-primary">n</span> Chill
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {restaurant.fullAddress} • {restaurant.priceRange}
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {badges.map((b) => (
            <span key={b.label} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
              {b.label}
            </span>
          ))}
        </div>
      </footer>

      {/* MOBILE STICKY BAR */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-foreground bg-card/95 p-3 backdrop-blur md:hidden">
        <div className="flex items-center gap-3">
          <div className="no-scrollbar flex flex-1 gap-2 overflow-x-auto">
            {categories.slice(0, 4).map((c) => (
              <a
                key={c.id}
                href="#menu"
                onClick={() => setActive(c.id)}
                className="shrink-0 rounded-full border border-border px-3 py-2 text-sm text-muted-foreground"
              >
                {c.emoji}
              </a>
            ))}
          </div>
          <button
            onClick={() => setOpen(true)}
            className="min-h-12 shrink-0 rounded-full bg-primary px-5 font-display uppercase text-primary-foreground"
          >
            Order Now 🍟 {count > 0 && `(${count})`}
          </button>
        </div>
      </div>

      <OrderDrawer open={open} onClose={() => setOpen(false)} lines={lines} onChangeQty={changeQty} />
    </div>
  );
}
