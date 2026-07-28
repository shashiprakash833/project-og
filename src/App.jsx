import { useEffect, useState } from "react";
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

  // Local State
  const [showSplash, setShowSplash] = useState(true);
  const [showIntroVideo, setShowIntroVideo] = useState(false);
  const [page, setPage] = useState("home");
  const [routeParams, setRouteParams] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState("");
  const [currentGender, setCurrentGender] = useState("men");

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem("og_orders");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("og_orders", JSON.stringify(orders));
  }, [orders]);

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

  const login = async ({ email, password }) => {
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
    setShowIntroVideo(true);
    setToast(`Welcome back, ${mockUser.name}`);
  };

  const register = async ({ name, email, password }) => {
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
    setShowIntroVideo(true);
    setToast(`Welcome, ${mockUser.name}`);
  };

  const logout = () => {
    localStorage.removeItem("og_user");
    dispatch(logoutAction());
    setToast("Logged out successfully.");
  };

  const navigate = (nextPage) => {
    let params = {};
    let pageName = nextPage;
    if (typeof nextPage === "string" && nextPage.includes("?")) {
      const [p, query] = nextPage.split("?");
      pageName = p;
      query.split("&").forEach((pair) => {
        const [k, v] = pair.split("=");
        params[k] = v ? decodeURIComponent(v) : "";
      });
    } else if (typeof nextPage === "object") {
      pageName = nextPage.page || pageName;
      params = nextPage.params || {};
    }

    if (pageName === "gender-men") {
      setCurrentGender("men");
      pageName = "categories";
    }
    if (pageName === "gender-women") {
      setCurrentGender("women");
      pageName = "categories";
    }

    if (pageName !== "search") setSearchQuery("");
    setPage(pageName);
    setRouteParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

    setOrders((current) => [newOrder, ...current]);
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
          onNavigate={navigate}
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
          onNavigate={navigate}
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
        onNavigate={navigate}
        onAddToCart={(product) => dispatch(addToCart(product))}
        onRemoveFromCart={(product) => dispatch(removeFromCart(product))}
        onWishlist={(product) => dispatch(toggleWishlist(product))}
        onToast={setToast}
        user={user}
        onAuthOpen={handleOpenAuthModal}
        onSubmitOrder={submitOrder}
        orders={orders}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
    );
  };

  return (
    <ChatProvider>
      <main className={`app ${theme}`}>
        {showSplash && <SplashScreen duration={INTRO_TIME} onFinish={() => setShowSplash(false)} />}
        {showIntroVideo && (
          <IntroVideo onFinish={() => setShowIntroVideo(false)} />
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
              onNavigate={navigate}
              onThemeToggle={() => dispatch(toggleTheme())}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            {renderPage()}

            <Footer onNavigate={navigate} onToast={setToast} />
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
            <button onClick={() => setToast("")}>Close</button>
          </div>
        )}

        {!showSplash && !showIntroVideo && <ChatBot />}
      </main>
    </ChatProvider>
  );
}
