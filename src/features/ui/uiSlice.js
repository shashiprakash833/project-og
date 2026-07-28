import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: "home",
  theme: "light",
  routeParams: {},
  searchOpen: false,
  mobileMenuOpen: false,
  profileOpen: false,
  scrolled: false,
  toast: "",
  toastOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setPage: (state, action) => {
      if (typeof action.payload === "string") {
        state.page = action.payload;
        state.routeParams = {};
      } else {
        state.page = action.payload.page;
        state.routeParams = action.payload.params || {};
      }
      state.mobileMenuOpen = false;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setSearchOpen: (state, action) => {
      state.searchOpen = action.payload;
    },
    setMobileMenu: (state, action) => {
      state.mobileMenuOpen = action.payload;
    },
    setMobileMenuOpen: (state, action) => {
      state.mobileMenuOpen = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setProfileOpen: (state, action) => {
      state.profileOpen = action.payload;
    },
    setScrolled: (state, action) => {
      state.scrolled = action.payload;
    },
    showToast: (state, action) => {
      state.toast = action.payload;
      state.toastOpen = true;
    },
    hideToast: (state) => {
      state.toast = "";
      state.toastOpen = false;
    },
    setToast: (state, action) => {
      state.toast = action.payload;
    },
    setRouteParams: (state, action) => {
      state.routeParams = action.payload;
    },
  },
});

export const {
  setPage,
  toggleTheme,
  setTheme,
  setSearchOpen,
  setMobileMenu,
  setMobileMenuOpen,
  toggleMobileMenu,
  setProfileOpen,
  setScrolled,
  showToast,
  hideToast,
  setToast,
  setRouteParams,
} = uiSlice.actions;

export default uiSlice.reducer;