import { createSlice } from "@reduxjs/toolkit";

const getInitialUser = () => {
  try {
    const savedUser = localStorage.getItem("og_user");
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    return null;
  }
};

const initialState = {
  user: getInitialUser(),
  isAuthenticated: !!getInitialUser(),
  authModal: {
    open: false,
    mode: "login", // "login" | "signup"
  },
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    openAuthModal: (state, action) => {
      state.authModal.open = true;
      state.authModal.mode = action.payload || "login";
      state.error = null;
    },
    closeAuthModal: (state) => {
      state.authModal.open = false;
      state.error = null;
    },
    setAuthError: (state, action) => {
      state.error = action.payload;
    },
    clearAuthError: (state) => {
      state.error = null;
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

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthModal = (state) => state.auth.authModal;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
