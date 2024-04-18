import { create } from "zustand";

const useTempStore = create((set) => ({
  cart: [],
  updateCart: (itemId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      ),
    })),
}));

export default useTempStore;
