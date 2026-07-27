import { createSlice } from "@reduxjs/toolkit";

const savedTheme = localStorage.getItem("theme") || "light";

const themeSlice = createSlice({
  name: "theme",
  initialState: { value: savedTheme },
  reducers: {
    toggleTheme: (state) => {
    //   state.value = state.value === "light" ? "dark" : "light";
    if (state.value === "light") {
        state.value = "dark";
    } else {
        state.value = "light";
    }
      localStorage.setItem("theme", state.value);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;