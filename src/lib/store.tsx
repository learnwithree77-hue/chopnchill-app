/**
 * Demo store for Chop n Chill.
 *
 * Everything here lives in the browser (localStorage) so the product flow can be
 * demonstrated end to end without a payment provider or POS integration.
 * Swapping this for a real backend means replacing the functions below only.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { menu, type MenuItem } from "@/data/restaurantData";

export type OrderMode = "Pickup" | "Delivery";

export const ORDER_STATUSES = [
  "Received",
  "Preparing",
  "Ready",
  "Completed",
] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export type OrderLine = { id: string; name: string; price: number; qty: number };

export type Order = {
  id: string;
  mode: OrderMode;
  lines: OrderLine[];
  total: number;
  status: OrderStatus;
  placedAt: number;
  name: string;
  note: string;
};

export type MenuOverride = { price?: number; available?: boolean };

type Persisted = {
  cart: Record<string, number>;
  orders: Order[];
  overrides: Record<string, MenuOverride>;
};

const STORAGE_KEY = "chopnchill.demo.v1";
const empty: Persisted = { cart: {}, orders: [], overrides: {} };

function load(): Persisted {
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty;
    return { ...empty, ...(JSON.parse(raw) as Partial<Persisted>) };
  } catch {
    return empty;
  }
}

export type CartLine = { item: MenuItem; qty: number };

type StoreValue = {
  hydrated: boolean;
  cart: Record<string, number>;
  lines: CartLine[];
  count: number;
  subtotal: number;
  addToCart: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  changeQty: (id: string, delta: number) => void;
  clearCart: () => void;
  orders: Order[];
  placeOrder: (input: { mode: OrderMode; name: string; note: string }) => Order;
  setOrderStatus: (id: string, status: OrderStatus) => void;
  overrides: Record<string, MenuOverride>;
  setPrice: (id: string, price: number) => void;
  toggleAvailable: (id: string) => void;
  resolvedMenu: MenuItem[];
  isAvailable: (id: string) => boolean;
};

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(empty);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(load());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage full or blocked — demo data is disposable */
    }
  }, [state, hydrated]);

  const resolvedMenu = useMemo(
    () =>
      menu.map((m) => {
        const o = state.overrides[m.id];
        return o?.price != null ? { ...m, price: o.price } : m;
      }),
    [state.overrides],
  );

  const isAvailable = useCallback(
    (id: string) => state.overrides[id]?.available !== false,
    [state.overrides],
  );

  const lines = useMemo(
    () =>
      Object.entries(state.cart)
        .map(([id, qty]) => ({ item: resolvedMenu.find((m) => m.id === id), qty }))
        .filter((l): l is CartLine => Boolean(l.item) && l.qty > 0),
    [state.cart, resolvedMenu],
  );

  const count = lines.reduce((s, l) => s + l.qty, 0);
  const subtotal = lines.reduce((s, l) => s + l.item.price * l.qty, 0);

  const setQty = useCallback((id: string, qty: number) => {
    setState((s) => {
      const cart = { ...s.cart };
      if (qty <= 0) delete cart[id];
      else cart[id] = qty;
      return { ...s, cart };
    });
  }, []);

  const value: StoreValue = {
    hydrated,
    cart: state.cart,
    lines,
    count,
    subtotal,
    addToCart: (id, qty = 1) =>
      setState((s) => ({ ...s, cart: { ...s.cart, [id]: (s.cart[id] ?? 0) + qty } })),
    setQty,
    changeQty: (id, delta) =>
      setState((s) => {
        const next = Math.max(0, (s.cart[id] ?? 0) + delta);
        const cart = { ...s.cart };
        if (next === 0) delete cart[id];
        else cart[id] = next;
        return { ...s, cart };
      }),
    clearCart: () => setState((s) => ({ ...s, cart: {} })),
    orders: state.orders,
    placeOrder: ({ mode, name, note }) => {
      const order: Order = {
        id: `CNC-${Math.floor(1000 + Math.random() * 9000)}`,
        mode,
        lines: lines.map((l) => ({
          id: l.item.id,
          name: l.item.name,
          price: l.item.price,
          qty: l.qty,
        })),
        total: subtotal,
        status: "Received",
        placedAt: Date.now(),
        name,
        note,
      };
      setState((s) => ({ ...s, cart: {}, orders: [order, ...s.orders] }));
      return order;
    },
    setOrderStatus: (id, status) =>
      setState((s) => ({
        ...s,
        orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)),
      })),
    overrides: state.overrides,
    setPrice: (id, price) =>
      setState((s) => ({
        ...s,
        overrides: { ...s.overrides, [id]: { ...s.overrides[id], price } },
      })),
    toggleAvailable: (id) =>
      setState((s) => ({
        ...s,
        overrides: {
          ...s.overrides,
          [id]: { ...s.overrides[id], available: s.overrides[id]?.available === false },
        },
      })),
    resolvedMenu,
    isAvailable,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
