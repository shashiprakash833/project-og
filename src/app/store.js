import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../features/ui/uiSlice";
import orderReducer from "../features/order/orderSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    orders: orderReducer,
  },
});