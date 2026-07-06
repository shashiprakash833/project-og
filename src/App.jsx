import { useEffect, useState } from "react";
import SplashScreen from "./components/ui/SplashScreen.jsx";
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import RoutePage from "./pages/RoutePage.jsx";
import AuthModal from "./components/ui/AuthModal.jsx";
import { ChatProvider } from "./context/ChatContext.jsx"; // This should be the correct path
import ChatBot from "./components/AIChat/ChatBot.jsx"; // This is the correct path
import LoginVideo from "./components/ui/LoginVideo.jsx";
import { products } from "./data/storeData.js";

const INTRO_TIME = 3200;

export default function App() {
  const [theme, setTheme] = useState("light");
  const [showSplash, setShowSplash] = useState(true);
  const [page, setPage] = useState("home");
  const [routeParams, setRouteParams] = useState({});
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState("");
  const [user, setUser] = useState(null);
  const [authModal, setAuthModal] = useState({ open: false, mode: "login" });
  const [authError, setAuthError] = useState("");
  const [showLoginVideo, setShowLoginVideo] = useState(false);

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

    setPage(pageName);
    setRouteParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToCart = (product) => {
    setCart((current) => [...current, product]);
    setToast(`${product.name} added to cart.`);
  };

  const toggleWishlist = (product) => {
    setWishlist((current) => {
      const exists = current.some((item) => item.id === product.id);
      setToast(exists ? `${product.name} removed from wishlist.` : `${product.name} saved to wishlist.`);
      return exists ? current.filter((item) => item.id !== product.id) : [...current, product];
    });
  };

  const clearCart = () => setCart([]);

  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

  const submitOrder = async ({ items, totalAmount, shippingAddress, paymentMethod, shippingPhone }) => {
    if (!user) {
      return { success: false, requiresAuth: true, error: "Please sign in to place the order." };
    }

    try {
      const token = localStorage.getItem("og_auth_token");
      const response = await fetch(`${API_BASE}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items, totalAmount, shippingAddress, paymentMethod, shippingPhone }),
      });

      if (!response.ok) {
        const errorMessage = await parseApiError(response, "Order failed to submit");
        return { success: false, error: errorMessage };
      }

      const data = await response.json();
      clearCart();
      return { success: true, orderId: data.orderId };
    } catch (error) {
      return { success: false, error: error?.message || "Order failed to submit." };
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("og_auth_token");
    if (!token) return;

    fetch(`${API_BASE}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.user) setUser(data.user);
      })
      .catch(() => {
        localStorage.removeItem("og_auth_token");
      });
  }, []);

  const openAuthModal = (mode = "login") => {
    setAuthError("");
    setAuthModal({ open: true, mode });
  };

  const closeAuthModal = () => {
    setAuthModal((current) => ({ ...current, open: false }));
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
    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const errorMessage = await parseApiError(response, "Login failed");
        setAuthError(errorMessage);
        return;
      }
      const data = await response.json();
      localStorage.setItem("og_auth_token", data.token);
      setUser(data.user);
      closeAuthModal();
      setShowLoginVideo(true);
      setToast(`Welcome back, ${data.user.name || data.user.email}`);
    } catch (error) {
      setAuthError(error?.message || "Login failed. Please try again.");
    }
  };

  const register = async ({ name, email, password }) => {
    try {
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (!response.ok) {
        const errorMessage = await parseApiError(response, "Signup failed");
        setAuthError(errorMessage);
        return;
      }
      const data = await response.json();
      localStorage.setItem("og_auth_token", data.token);
      setUser(data.user);
      closeAuthModal();
      setToast(`Welcome, ${data.user.name || data.user.email}`);
    } catch (error) {
      setAuthError(error?.message || "Signup failed. Please try again.");
    }
  };

  const logout = () => {
    localStorage.removeItem("og_auth_token");
    setUser(null);
    setToast("Logged out successfully.");
  };

  const requireAuth = (action) => (payload) => {
    if (!user) {
      openAuthModal("login");
      return;
    }
    action(payload);
  };

  const protectedAddToCart = requireAuth(addToCart);
  const protectedToggleWishlist = requireAuth(toggleWishlist);

  return (
    <ChatProvider>
      <main className={`app ${theme}`}>
        {showSplash && <SplashScreen duration={INTRO_TIME} onFinish={() => setShowSplash(false)} />}

        {showLoginVideo && (
          <LoginVideo onFinish={() => setShowLoginVideo(false)} />
        )}

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
              onThemeToggle={() => setTheme(theme === "light" ? "dark" : "light")}
            />

            {page === "home" ? (
              <HomePage
                products={products}
                wishlist={wishlist}
                onNavigate={navigate}
                onAddToCart={protectedAddToCart}
                onWishlist={protectedToggleWishlist}
                onToast={setToast}
              />
            ) : (
              <RoutePage
                page={page}
                products={products}
                cart={cart}
                wishlist={wishlist}
                onNavigate={navigate}
                onAddToCart={protectedAddToCart}
                onWishlist={protectedToggleWishlist}
                onToast={setToast}
                user={user}
                onAuthOpen={openAuthModal}
                onSubmitOrder={submitOrder}
              />
            )}

            <Footer onNavigate={navigate} onToast={setToast} />
          </>
        )}

        <AuthModal
          open={authModal.open}
          mode={authModal.mode}
          onClose={closeAuthModal}
          onLogin={login}
          onRegister={register}
          onSwitchMode={() => openAuthModal(authModal.mode === "login" ? "signup" : "login")}
          error={authError}
        />

        {toast && (
          <div className="toast">
            <span>{toast}</span>
            <button onClick={() => setToast("")}>Close</button>
          </div>
        )}
        
        {!showSplash && <ChatBot />}
      </main>
    </ChatProvider>
  );
}
