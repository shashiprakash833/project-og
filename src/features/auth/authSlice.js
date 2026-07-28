import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  authModal: {
    open: false,
    mode: "login",
  },
  authError: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.user = null;
    },

    openAuthModal: (state, action) => {
      state.authModal.open = true;
      state.authModal.mode = action.payload || "login";
      state.authError = "";
    },

    closeAuthModal: (state) => {
      state.authModal.open = false;
    },

    setAuthError: (state, action) => {
      state.authError = action.payload;
    },

    clearAuthError: (state) => {
      state.authError = "";
    },
  },
});

export const {
  setUser,
  logout,
  openAuthModal,
  closeAuthModal,
  setAuthError,
  clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;