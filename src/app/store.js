import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/themeSlice";
import searchReducer from "../features/search/searchSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    search: searchReducer,
  },
});