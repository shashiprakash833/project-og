import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    page: "home",
    routeParams: {},
    currentGender: "men",
    toast: "",
    showSplash: true,
    showIntroVideo: false,
    menuOpen: false,
    searchOpen: false,
};

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setRouteParams: (state, action) => {
            state.routeParams = action.payload;
        },
        setCurrentGender: (state, action) => {
            state.currentGender = action.payload;
        },
        navigate: (state, action) => {
            const nextPage = action.payload;
            let params = {};
            let pageName = nextPage;

            if (typeof nextPage === "string" && nextPage.includes("?")) {
                const [p, query] = nextPage.split("?");
                pageName = p;
                query.split("&").forEach((pair) => {
                    const [k, v] = pair.split("=");
                    params[k] = v ? decodeURIComponent(v) : "";
                });
            } else if (typeof nextPage === "object" && nextPage !== null) {
                pageName = nextPage.page || pageName;
                params = nextPage.params || {};
            }

            if (pageName === "gender-men") {
                state.currentGender = "men";
                pageName = "categories";
            } else if (pageName === "gender-women") {
                state.currentGender = "women";
                pageName = "categories";
            }

            state.page = pageName;
            state.routeParams = params;
            state.menuOpen = false;
            state.searchOpen = false;
        },
        setToast: (state, action) => {
            state.toast = action.payload;
        },
        clearToast: (state) => {
            state.toast = "";
        },
        setShowSplash: (state, action) => {
            state.showSplash = action.payload;
        },
        setShowIntroVideo: (state, action) => {
            state.showIntroVideo = action.payload;
        },
        setMenuOpen: (state, action) => {
            state.menuOpen = action.payload;
        },
        toggleMenu: (state) => {
            state.menuOpen = !state.menuOpen;
        },
        setSearchOpen: (state, action) => {
            state.searchOpen = action.payload;
        },
        toggleSearch: (state) => {
            state.searchOpen = !state.searchOpen;
        },
    },
});

export const {
    setPage,
    setRouteParams,
    setCurrentGender,
    navigate,
    setToast,
    clearToast,
    setShowSplash,
    setShowIntroVideo,
    setMenuOpen,
    toggleMenu,
    setSearchOpen,
    toggleSearch,
} = uiSlice.actions;

// Selectors
export const selectPage = (state) => state.ui.page;
export const selectRouteParams = (state) => state.ui.routeParams;
export const selectCurrentGender = (state) => state.ui.currentGender;
export const selectToast = (state) => state.ui.toast;
export const selectShowSplash = (state) => state.ui.showSplash;
export const selectShowIntroVideo = (state) => state.ui.showIntroVideo;
export const selectMenuOpen = (state) => state.ui.menuOpen;
export const selectSearchOpen = (state) => state.ui.searchOpen;

export default uiSlice.reducer;
