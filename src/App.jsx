import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage, toggleTheme } from "./features/ui/uiSlice";
import { submitOrder as submitOrderThunk } from "./features/order/orderSlice";

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
  // FROM REDUX - uiSlice + orderSlice
  const { page, theme, routeParams } = useSelector((s) => s.ui);
  const { orders } = useSelector((s) => s.orders);

  const [showSplash, setShowSplash] = useState(true);
  const [showIntroVideo, setShowIntroVideo] = useState(false);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState("");
  const [user, setUser] = useState(null);
  const [authModal, setAuthModal] = useState({ open: false, mode: "login" });
  const [authError, setAuthError] = useState("");
  const [currentGender, setCurrentGender] = useState("men");

  const navigate = (nextPage) => {
    let params = {};
    let pageName = nextPage;
    if (typeof nextPage === "string" && nextPage.includes("?")) {
      const [p, query] = nextPage.split("?");
      pageName = p;
      query.split("&").forEach((pair) => {
        const [k, v] = pair.split("=");
        params[k] = v? decodeURIComponent(v) : "";
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

    if (pageName!== "search") setSearchQuery("");

    // REDUX DISPATCH INSTEAD OF setPage
    if (typeof nextPage === "object") {
      dispatch(setPage(nextPage));
    } else if (Object.keys(params).length > 0) {
      dispatch(setPage({ page: pageName, params }));
    } else {
      dispatch(setPage(pageName));
    }

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
      setToast(exists? `${product.name} removed from wishlist.` : `${product.name} saved to wishlist.`);
      return exists? current.filter((item) => item.id!== product.id) : [...current, product];
    });
  };

  const clearCart = () => setCart([]);

  const handleSubmitOrder = async ({ items, totalAmount, shippingAddress, paymentMethod, shippingPhone }) => {
    const result = await dispatch(submitOrderThunk({
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
      shippingPhone,
      status: "Processing",
      date: new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" }),
      userEmail: user? user.email : "guest"
    })).unwrap();
    clearCart();
    return result;
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("og_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("og_user");
      }
    }
  }, []);

  const openAuthModal = (mode = "login") => {
    setAuthError("");
    setAuthModal({ open: true, mode });
  };

  const closeAuthModal = () => setAuthModal((current) => ({...current, open: false }));

  const login = async ({ email, password }) => {
    if (!email) {
      setAuthError("Please enter an email address.");
      return;
    }
    const mockUser = { id: Date.now(), email: email, name: email.split("@")[0] || "User" };
    setUser(mockUser);
    localStorage.setItem("og_user", JSON.stringify(mockUser));
    closeAuthModal();
    setShowIntroVideo(true);
    setToast(`Welcome back, ${mockUser.name}`);
  };

  const register = async ({ name, email, password }) => {
    if (!email) {
      setAuthError("Please enter an email address.");
      return;
    }
    const mockUser = { id: Date.now(), email: email, name: name || email.split("@")[0] || "User" };
    setUser(mockUser);
    localStorage.setItem("og_user", JSON.stringify(mockUser));
    closeAuthModal();
    setShowIntroVideo(true);
    setToast(`Welcome, ${mockUser.name}`);
  };

  const logout = () => {
    localStorage.removeItem("og_user");
    setUser(null);
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
        products={products}
        cart={cart}
        wishlist={wishlist}
        onAddToCart={protectedAddToCart}
        onRemoveFromCart={protectedRemoveFromCart}
        onWishlist={protectedToggleWishlist}
        onToast={setToast}
        user={user}
        onAuthOpen={openAuthModal}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
    );
  };

  return (
    <ChatProvider>
      <main className={`app ${theme}`}>
        {showSplash && <SplashScreen duration={INTRO_TIME} onFinish={() => setShowSplash(false)} />}
        {showIntroVideo && <IntroVideo onFinish={() => setShowIntroVideo(false)} />}

        {!showSplash && (
          <>
            <Header
              page={page}
              cartCount={cart.length}
              wishlistCount={wishlist.length}
              theme={theme}
              user={user}
              onAuthOpen={openAuthModal}
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
          onClose={closeAuthModal}
          onLogin={login}
          onRegister={register}
          onSwitchMode={() => openAuthModal(authModal.mode === "login"? "signup" : "login")}
          error={authError}
        />

        {toast && (
          <div className="toast">
            <span>{toast}</span>
            <button onClick={() => setToast("")}>Close</button>
          </div>
        )}

        {!showSplash &&!showIntroVideo && <ChatBot />}
      </main>
    </ChatProvider>
  );
}