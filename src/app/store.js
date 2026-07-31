import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/themeSlice";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import searchReducer from "../features/search/searchSlice";
import orderReducer from "../features/order/orderSlice";
import uiReducer from "../features/ui/uiSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    search: searchReducer,
    order: orderReducer,
    ui: uiReducer,
  },
});

export default store;
