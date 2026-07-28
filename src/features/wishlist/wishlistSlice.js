import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
  },
  reducers: {
    // 1. ADD TO WISHLIST
    addToWishlist: (state, action) => {
      const newProduct = action.payload;
      const alreadySaved = state.items.find(
        (item) => item.id === newProduct.id,
      );

      if (!alreadySaved) {
        state.items.push(newProduct);
      }
    },

    // 2. REMOVE FROM WISHLIST
    removeFromWishlist: (state, action) => {
      const idToRemove = action.payload; 
      state.items = state.items.filter((item) => item.id !== idToRemove);
    },
    toggleWishlist: (state, action) => {
      const product = action.payload;

      const alreadySaved = state.items.find((item) => item.id === product.id);

      if (alreadySaved) {
        state.items = state.items.filter((item) => item.id !== product.id);
      } else {
        state.items.push(product);
      }
    },

    // 4. CLEAR WISHLIST
    clearWishlist: (state) => {
      state.items = []; 
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
