import { createSlice } from "@reduxjs/toolkit";

const getInitialOrders = () => {
  try {
    const savedOrders = localStorage.getItem("og_orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  } catch {
    return [];
  }
};

const initialState = {
  orders: getInitialOrders(),
  activeOrder: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.unshift(action.payload);
      try {
        localStorage.setItem("og_orders", JSON.stringify(state.orders));
      } catch {
        // Ignore localStorage write errors
      }
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
      try {
        localStorage.setItem("og_orders", JSON.stringify(state.orders));
      } catch {
        // Ignore localStorage write errors
      }
    },
    setActiveOrder: (state, action) => {
      state.activeOrder = action.payload;
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find((o) => o.orderId === orderId);
      if (order) {
        order.status = status;
        try {
          localStorage.setItem("og_orders", JSON.stringify(state.orders));
        } catch {
          // Ignore localStorage write errors
        }
      }
    },
    clearOrders: (state) => {
      state.orders = [];
      state.activeOrder = null;
      try {
        localStorage.removeItem("og_orders");
      } catch {
        // Ignore localStorage write errors
      }
    },
  },
});

export const {
  addOrder,
  setOrders,
  setActiveOrder,
  updateOrderStatus,
  clearOrders,
} = orderSlice.actions;

// Selectors
export const selectOrders = (state) => state.order.orders;
export const selectActiveOrder = (state) => state.order.activeOrder;
export const selectOrderStatus = (state) => state.order.status;
export const selectOrderError = (state) => state.order.error;

export default orderSlice.reducer;
