// stores/cart.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "react-hot-toast";

type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

type CartState = {
  items: CartItem[];
  add: (item: CartItem) => void;
  updateQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      add: (item) => {
        const exists = get().items.find((i) => i.id === item.id);

        if (exists) {
          set({
            items: get().items.map((i) =>
              i.id === item.id ? { ...i, qty: item.qty } : i
            ),
          });
          toast.success("Cart updated");
        } else {
          set({ items: [...get().items, item] });
          toast.success("Added to cart");
        }
      },

      updateQty: (id, qty) => {
        if (qty <= 0) {
          set({ items: get().items.filter((i) => i.id !== id) });
          toast.success("Item removed from cart");
          return;
        }
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, qty: Math.max(1, qty) } : i
          ),
        });
        toast.success("Quantity updated");
      },

      remove: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
        toast.success("Item removed from cart");
      },

      clear: () => {
        set({ items: [] });
        toast.success("Cart cleared");
      },
    }),
    { name: "audiophile-cart" }
  )
);
