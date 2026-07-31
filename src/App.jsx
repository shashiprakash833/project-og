import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { toggleTheme } from "./features/theme/themeSlice";
import {
  setUser,
  logout as logoutAction,
  openAuthModal,
  closeAuthModal,
  setAuthError,
  clearAuthError,
} from "./features/auth/authSlice";
import { addToCart, removeFromCart, clearCart } from "./features/cart/cartSlice.js";
import { toggleWishlist } from "./features/wishlist/wishlistSlice.js";
import { addOrder, selectOrders } from "./features/order/orderSlice.js";
import {
  navigate as navigateAction,
  setToast as setToastAction,
  clearToast,
  setShowSplash,
  setShowIntroVideo,
  selectPage,
  selectRouteParams,
  selectCurrentGender,
  selectToast,
  selectShowSplash,
  selectShowIntroVideo,
} from "./features/ui/uiSlice.js";
import { setSearchQuery, selectSearchQuery } from "./features/search/searchSlice.js";

import SplashScreen from "./components/ui/SplashScreen.jsx";
import IntroVideo from "./components/ui/IntroVideo.jsx";
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import RoutePage from "./pages/RoutePage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import AuthModal from "./components/ui/AuthModal.jsx";
import { ChatProvider } from "./context/ChatContext.jsx";
import ChatBot from "./components/AIChat/ChatBot.jsx";
import { products } from "./data/storeData.js";

const INTRO_TIME = 3200;

export default function App() {
  const dispatch = useDispatch();

  // Redux Selectors
  const theme = useSelector((state) => state.theme.theme);
  const user = useSelector((state) => state.auth.user);
  const authModal = useSelector((state) => state.auth.authModal) || { open: false, mode: "login" };
  const authError = useSelector((state) => state.auth.error);
  const cart = useSelector((state) => state.cart.items) || [];
  const wishlist = useSelector((state) => state.wishlist.items) || [];

  // Redux Slices: order, ui, search
  const orders = useSelector(selectOrders) || [];
  const page = useSelector(selectPage);
  const routeParams = useSelector(selectRouteParams);
  const currentGender = useSelector(selectCurrentGender);
  const toast = useSelector(selectToast);
  const showSplash = useSelector(selectShowSplash);
  const showIntroVideo = useSelector(selectShowIntroVideo);
  const searchQuery = useSelector(selectSearchQuery);

  useEffect(() => {
    const savedUser = localStorage.getItem("og_user");
    if (savedUser) {
      try {
        dispatch(setUser(JSON.parse(savedUser)));
      } catch {
        localStorage.removeItem("og_user");
      }
    }
  }, [dispatch]);

  const handleOpenAuthModal = (mode = "login") => {
    dispatch(clearAuthError());
    dispatch(openAuthModal(mode));
  };

  const handleCloseAuthModal = () => {
    dispatch(closeAuthModal());
  };

  const setToast = (msg) => {
    dispatch(setToastAction(msg));
  };

  const login = async ({ email }) => {
    if (!email) {
      dispatch(setAuthError("Please enter an email address."));
      return;
    }
    const mockUser = {
      id: Date.now(),
      email: email,
      name: email.split("@")[0] || "User",
    };

    dispatch(setUser(mockUser));
    localStorage.setItem("og_user", JSON.stringify(mockUser));
    handleCloseAuthModal();
    dispatch(setShowIntroVideo(true));
    dispatch(setToastAction(`Welcome back, ${mockUser.name}`));
  };

  const register = async ({ name, email }) => {
    if (!email) {
      dispatch(setAuthError("Please enter an email address."));
      return;
    }
    const mockUser = {
      id: Date.now(),
      email: email,
      name: name || email.split("@")[0] || "User",
    };

    dispatch(setUser(mockUser));
    localStorage.setItem("og_user", JSON.stringify(mockUser));
    handleCloseAuthModal();
    dispatch(setShowIntroVideo(true));
    dispatch(setToastAction(`Welcome, ${mockUser.name}`));
  };

  const logout = () => {
    localStorage.removeItem("og_user");
    dispatch(logoutAction());
    dispatch(setToastAction("Logged out successfully."));
  };

  const handleNavigate = (nextPage) => {
    if (nextPage !== "search") {
      dispatch(setSearchQuery(""));
    }
    dispatch(navigateAction(nextPage));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (query) => {
    dispatch(setSearchQuery(query));
  };

  const submitOrder = async ({ items, totalAmount, shippingAddress, paymentMethod, shippingPhone }) => {
    const orderId = Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      orderId,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
      shippingPhone,
      status: "Processing",
      date: new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      userEmail: user ? user.email : "guest",
    };

    dispatch(addOrder(newOrder));
    dispatch(clearCart());
    return { success: true, orderId };
  };

  const renderPage = () => {
    if (page === "home") {
      return (
        <HomePage
          theme={theme}
          products={products}
          wishlist={wishlist}
          onNavigate={handleNavigate}
          onAddToCart={(product) => dispatch(addToCart(product))}
          onWishlist={(product) => dispatch(toggleWishlist(product))}
          onToast={setToast}
        />
      );
    }

    if (["oversized", "bottoms", "tees", "tank tops", "accessories"].includes(page)) {
      return (
        <CategoryPage
          products={products}
          cart={cart}
          wishlist={wishlist}
          onNavigate={handleNavigate}
          onAddToCart={(product) => dispatch(addToCart(product))}
          onRemoveFromCart={(product) => dispatch(removeFromCart(product))}
          onWishlist={(product) => dispatch(toggleWishlist(product))}
          category={page}
          gender={currentGender}
        />
      );
    }

    return (
      <RoutePage
        theme={theme}
        page={page}
        routeParams={routeParams}
        products={products}
        cart={cart}
        wishlist={wishlist}
        onNavigate={handleNavigate}
        onAddToCart={(product) => dispatch(addToCart(product))}
        onRemoveFromCart={(product) => dispatch(removeFromCart(product))}
        onWishlist={(product) => dispatch(toggleWishlist(product))}
        onToast={setToast}
        user={user}
        onAuthOpen={handleOpenAuthModal}
        onSubmitOrder={submitOrder}
        orders={orders}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
    );
  };

  return (
    <ChatProvider>
      <main className={`app ${theme}`}>
        {showSplash && (
          <SplashScreen
            duration={INTRO_TIME}
            onFinish={() => dispatch(setShowSplash(false))}
          />
        )}
        {showIntroVideo && (
          <IntroVideo onFinish={() => dispatch(setShowIntroVideo(false))} />
        )}

        {!showSplash && (
          <>
            <Header
              page={page}
              cartCount={cart.length}
              wishlistCount={wishlist.length}
              theme={theme}
              user={user}
              onAuthOpen={handleOpenAuthModal}
              onLogout={logout}
              onNavigate={handleNavigate}
              onThemeToggle={() => dispatch(toggleTheme())}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
            />

            {renderPage()}

            <Footer onNavigate={handleNavigate} onToast={setToast} />
          </>
        )}

        <AuthModal
          open={authModal.open}
          mode={authModal.mode}
          onClose={handleCloseAuthModal}
          onLogin={login}
          onRegister={register}
          onSwitchMode={() => handleOpenAuthModal(authModal.mode === "login" ? "signup" : "login")}
          error={authError}
        />

        {toast && (
          <div className="toast">
            <span>{toast}</span>
            <button onClick={() => dispatch(clearToast())}>Close</button>
          </div>
        )}

        {!showSplash && !showIntroVideo && <ChatBot />}
      </main>
    </ChatProvider>
  );
}
