import { createSlice } from "@reduxjs/toolkit";

const getInitialCart = () => {
  try {
    const savedCart = localStorage.getItem("og_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
};

const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
};

const initialState = {
  items: getInitialCart(),
  totalAmount: calculateTotal(getInitialCart()),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id && item.size === action.payload.size
      );
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + (action.payload.quantity || 1);
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }
      state.totalAmount = calculateTotal(state.items);
      try {
        localStorage.setItem("og_cart", JSON.stringify(state.items));
      } catch {
        // Ignore localStorage write errors
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => !(item.id === action.payload.id && item.size === action.payload.size)
      );
      state.totalAmount = calculateTotal(state.items);
      try {
        localStorage.setItem("og_cart", JSON.stringify(state.items));
      } catch {
        // Ignore localStorage write errors
      }
    },
    updateQuantity: (state, action) => {
      const { id, size, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id && i.size === size);
      if (item) {
        if (quantity > 0) {
          item.quantity = quantity;
        } else {
          state.items = state.items.filter((i) => !(i.id === id && i.size === size));
        }
      }
      state.totalAmount = calculateTotal(state.items);
      try {
        localStorage.setItem("og_cart", JSON.stringify(state.items));
      } catch {
        // Ignore localStorage write errors
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      try {
        localStorage.removeItem("og_cart");
      } catch {
        // Ignore localStorage write errors
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalCount = (state) =>
  state.cart.items.reduce((total, item) => total + (item.quantity || 1), 0);
export const selectCartTotalAmount = (state) => state.cart.totalAmount;

export default cartSlice.reducer;
