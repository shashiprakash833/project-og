import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/themeSlice";
import searchReducer from "../features/search/searchSlice";
import authReducer from "../features/auth/authSlice";


export const store = configureStore({
  reducer: {
    theme: themeReducer,
    search: searchReducer,
    auth: authReducer,
  },
});