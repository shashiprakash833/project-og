import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  try {
    const savedTheme = localStorage.getItem("og_theme");
    if (savedTheme) return savedTheme;
  } catch {
    // Fallback to light theme if localStorage fails
  }
  return "light";
};

const initialState = {
  theme: getInitialTheme(),
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      try {
        localStorage.setItem("og_theme", state.theme);
      } catch {
        // Ignore localStorage write errors
      }
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      try {
        localStorage.setItem("og_theme", state.theme);
      } catch {
        // Ignore localStorage write errors
      }
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

// Selectors
export const selectTheme = (state) => state.theme.theme;

export default themeSlice.reducer;
