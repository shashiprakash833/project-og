import { createSlice } from "@reduxjs/toolkit";

const getInitialWishlist = () => {
  try {
    const savedWishlist = localStorage.getItem("og_wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  } catch {
    return [];
  }
};

const initialState = {
  items: getInitialWishlist(),
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        try {
          localStorage.setItem("og_wishlist", JSON.stringify(state.items));
        } catch {
          // Ignore localStorage write errors
        }
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      try {
        localStorage.setItem("og_wishlist", JSON.stringify(state.items));
      } catch {
        // Ignore localStorage write errors
      }
    },
    toggleWishlist: (state, action) => {
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
      try {
        localStorage.setItem("og_wishlist", JSON.stringify(state.items));
      } catch {
        // Ignore localStorage write errors
      }
    },
    clearWishlist: (state) => {
      state.items = [];
      try {
        localStorage.removeItem("og_wishlist");
      } catch {
        // Ignore localStorage write errors
      }
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
} = wishlistSlice.actions;

// Selectors
export const selectWishlistItems = (state) => state.wishlist.items;
export const selectWishlistCount = (state) => state.wishlist.items.length;

export default wishlistSlice.reducer;
