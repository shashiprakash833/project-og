import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import themeReducer from "../features/theme/themeSlice";
import searchReducer from "../features/search/searchSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    search: searchReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
  },
});