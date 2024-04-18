import { create } from "zustand";

const localStorageKey = "cart";

const useTempStore = create((set) => ({
  cart: [],
  setCart: (newCart) => set({ cart: newCart }),
  updateCart: (product, quantity) => {
    set((state) => {
      const existingProductIndex = state.cart.findIndex(
        (item) => item.id === product.id
      );
      if (existingProductIndex !== -1) {
        // If product already exists in the cart, update its quantity
        const updatedCart = [...state.cart];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: quantity,
        };
        const newCart = updatedCart;
        localStorage.setItem(localStorageKey, JSON.stringify(newCart));
        return { cart: newCart };
      } else {
        // If product doesn't exist in the cart, add it
        const newCart = [...state.cart, { ...product, quantity }];
        localStorage.setItem(localStorageKey, JSON.stringify(newCart));
        return { cart: newCart };
      }
    });
  },
  removeFromCart: (productId) => {
    set((state) => {
      const newCart = state.cart.filter((item) => item.id !== productId);
      localStorage.setItem(localStorageKey, JSON.stringify(newCart));
      return { cart: newCart };
    });
  },
}));

export default useTempStore;
