import { useEffect, useState } from "react";
import {
  setUser, logout as logoutAction, openAuthModal, closeAuthModal, setAuthError, clearAuthError,
} from "./features/auth/authSlice";
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
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "./features/theme/themeSlice.js";
import { selectSearchQuery, clearSearchQuery, setSearchQuery } from "./features/search/searchSlice"


const INTRO_TIME = 3200;

export default function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const user = useSelector((state) => state.auth.user);

  const authModal = useSelector((state) => state.auth.authModal);

  const authError = useSelector((state) => state.auth.authError);
  const [showSplash, setShowSplash] = useState(true);
  const [showIntroVideo, setShowIntroVideo] = useState(false);
  const [page, setPage] = useState("home");
  const [routeParams, setRouteParams] = useState({});
  const [cart, setCart] = useState([]);
  const searchQuery = useSelector(selectSearchQuery);
  const setSearchQueryValue = useSelector(setSearchQuery);
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState("");
  const [currentGender, setCurrentGender] = useState("men");

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


    if (pageName !== "search") dispatch(clearSearchQuery());
    setPage(pageName);
    setRouteParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToCart = (product) => {
    setCart((current) => [...current, product]);
    setToast(`${product.name} added to cart.`);
  };

  const removeFromCart = (product) => {
    setCart((current) => {
      const index = current.findIndex((item) => item.id === product.id);
      if (index === -1) return current;
      const updated = [...current];
      updated.splice(index, 1);
      return updated;
    });
    setToast(`${product.name} removed from cart.`);
  };

  const toggleWishlist = (product) => {
    setWishlist((current) => {
      const exists = current.some((item) => item.id === product.id);
      setToast(exists ? `${product.name} removed from wishlist.` : `${product.name} saved to wishlist.`);
      return exists ? current.filter((item) => item.id !== product.id) : [...current, product];
    });
  };

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

  const clearCart = () => setCart([]);
  const API_BASE = import.meta.env.VITE_API_BASE || "";

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
        day: "numeric"
      }),
      userEmail: user ? user.email : "guest"
    };

    setOrders((current) => [newOrder, ...current]);
    clearCart();
    return { success: true, orderId };
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("og_user");
    if (savedUser) {
      try {
        dispatch(setUser(JSON.parse(savedUser)));
      } catch {
        localStorage.removeItem("og_user");
      }
    }
  }, []);

  const handleOpenAuthModal = (mode = "login") => {
    dispatch(clearAuthError());
    dispatch(openAuthModal(mode));
  };

  const handleCloseAuthModal = () => {
    dispatch(closeAuthModal());
  };
  const parseApiError = async (response, fallback) => {
    try {
      const data = await response.json();
      return data?.error || fallback;
    } catch {
      return `${fallback} (${response.status} ${response.statusText})`;
    }
  };

  const login = async ({ email, password }) => {
    if (!email) {
      dispatch(setAuthError("Please enter an email address."));
      return;
    }
    const mockUser = {
      id: Date.now(),
      email: email,
      name: email.split("@")[0] || "User"
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
      name: name || email.split("@")[0] || "User"
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

  const protectedAddToCart = addToCart;
  const protectedRemoveFromCart = removeFromCart;
  const protectedToggleWishlist = toggleWishlist;

  const renderPage = () => {
    if (page === "home") {
      return (
        <HomePage
          theme={theme}
          products={products}
          wishlist={wishlist}
          onNavigate={navigate}
          onAddToCart={protectedAddToCart}
          onWishlist={protectedToggleWishlist}
          onToast={setToast}
        />
      );
    }

    // Handle all category types: oversized, bottoms, tees, tank tops, accessories
    if (["oversized", "bottoms", "tees", "tank tops", "accessories"].includes(page)) {
      return (
        <CategoryPage
          products={products}
          onAddToCart={protectedAddToCart}
          onRemoveFromCart={protectedRemoveFromCart}
          onWishlist={protectedToggleWishlist}
          wishlist={wishlist}
          onNavigate={navigate}
          category={page}
          gender={currentGender}
          cart={cart}
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
        onAddToCart={protectedAddToCart}
        onRemoveFromCart={protectedRemoveFromCart}
        onWishlist={protectedToggleWishlist}
        onToast={setToast}
        user={user}
        onAuthOpen={handleOpenAuthModal}
        onSubmitOrder={submitOrder}
        orders={orders}
        searchQuery={searchQuery}
      />
    );
  };

  return (
    <ChatProvider>
      <main className={`app ${theme}`}>
        {showSplash && <SplashScreen duration={INTRO_TIME} onFinish={() => setShowSplash(false)} />}
        {showIntroVideo && (
          <IntroVideo
            onFinish={() => setShowIntroVideo(false)}
          />
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
              onSearchChange={(query) => dispatch(setSearchQuery(query))}
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