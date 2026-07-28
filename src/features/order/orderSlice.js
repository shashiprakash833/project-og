import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const submitOrder = createAsyncThunk("orders/submit", async (orderData) => {
  const orderId = Math.floor(100000 + Math.random() * 900000);
  return { orderId, ...orderData }; // MUST be orderId not id
});

const orderSlice = createSlice({
  name: "order",
  initialState: { orders: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(submitOrder.fulfilled, (state, action) => {
      state.orders.unshift(action.payload);
    });
  },
});

export default orderSlice.reducer;