import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: [], // each item: { ...product, qty }
  },

  reducers: {

    // ADD TO CART — merges by id, increases qty if already in cart
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...product, qty: 1 });
      }
    },

    // REMOVE FROM CART — deletes the item completely
    removeFromCart: (state, action) => {
      const idToRemove = action.payload;
      state.items = state.items.filter((item) => item.id !== idToRemove);
    },

    // INCREMENT QUANTITY (the "+" button)
    incrementQty: (state, action) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.qty += 1;
      }
    },

    // DECREMENT QUANTITY (the "-" button)
    // removes the item entirely if qty would drop to 0
    decrementQty: (state, action) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        if (item.qty > 1) {
          item.qty -= 1;
        } else {
          state.items = state.items.filter((item) => item.id !== id);
        }
      }
    },

    // SET QUANTITY DIRECTLY
    updateQty: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.qty = qty;
      }
    },

    // CLEAR CART
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQty,
  decrementQty,
  updateQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;