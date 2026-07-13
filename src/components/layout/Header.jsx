import { FaBars } from "react-icons/fa";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { navItems } from "../../data/storeData.js";
import "./Header.css";

export default function Header({
  page,
  cartCount,
  wishlistCount,
  theme,
  user,
  onAuthOpen,
  onLogout,
  onNavigate,
  onThemeToggle
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef(null);
  const [animateWishlist, setAnimateWishlist] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    if (profileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileOpen]);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [menuOpen]);

  // Effect for animations
  useLayoutEffect(() => {
    if (wishlistCount > 0) {
      setAnimateWishlist(true);
      const timer = setTimeout(() => setAnimateWishlist(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [wishlistCount]);

  useLayoutEffect(() => {
    if (cartCount > 0) {
      setAnimateCart(true);
      const timer = setTimeout(() => setAnimateCart(false), 500);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  const handleWishlistClick = () => {
    if (user) {
      handleNavigate("wishlist");
    } else {
      onAuthOpen("login");
    }
  };

  const handleNavigate = (nextPage) => {
    onNavigate(nextPage);
    setMenuOpen(false);
    setSearchOpen(false);
    setProfileOpen(false);
  };

  const handleSearchToggle = () => {
    setSearchOpen((current) => !current);
    setMenuOpen(false);
    setProfileOpen(false);
  };

  const displayName = user?.name || user?.email?.split("@")[0] || "Profile";


  return (
  <header className={`header ${scrolled ? "scrolled" : ""}`}>

    {menuOpen && (
      <div
        className="nav-overlay"
        onClick={() => setMenuOpen(false)}
      />
    )}

    {menuOpen && window.innerWidth <= 992 && (
  <button
    className="menu-close-btn"
    onClick={() => setMenuOpen(false)}
    aria-label="Close Menu"
  >
    ✕
  </button>
)}

    {/* ================= DESKTOP ================= */}

    {/* ================= DESKTOP ================= */}

<div className="desktop-header">

  {/* Left */}
  <div className="desktop-left">
    <button
      className="brand"
      onClick={() => handleNavigate("home")}
      aria-label="Go Home"
    >
      <img
        className="brand-logo"
        src="/images/brand/og-logo.png"
        alt="OG"
      />
    </button>
  </div>

  {/* Center */}
  <nav className="desktop-nav">
    {navItems.map((item) => (
      <button
        key={item.page}
        className={`nav-link ${page === item.page ? "active" : ""}`}
        onClick={() => handleNavigate(item.page)}
      >
        {item.label}
      </button>
    ))}
  </nav>

  {/* Right */}
  <div className="desktop-right">

    {/* Theme */}
   <button
  className="nav-action theme-toggle-btn"
  onClick={onThemeToggle}
  aria-label="Toggle Theme"
>
  {theme === "light" ? (
    <svg
  xmlns="http://www.w3.org/2000/svg"
  width="22"
  height="22"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="1.8"
>
  <circle cx="12" cy="12" r="5"/>
  <path d="M12 1v2"/>
  <path d="M12 21v2"/>
  <path d="M4.22 4.22l1.42 1.42"/>
  <path d="M18.36 18.36l1.42 1.42"/>
  <path d="M1 12h2"/>
  <path d="M21 12h2"/>
  <path d="M4.22 19.78l1.42-1.42"/>
  <path d="M18.36 5.64l1.42-1.42"/>
</svg>
  ) : (
    <svg
  xmlns="http://www.w3.org/2000/svg"
  width="22"
  height="22"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="1.8"
>
  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
</svg>
  )}
</button>

    {/* Search */}
    <button
      className="nav-action icon-action desktop-search-btn"
      onClick={handleSearchToggle}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="10.5" cy="10.5" r="6.5"/>
        <line x1="15.5" y1="15.5" x2="21" y2="21"/>
      </svg>
    </button>

    {/* Wishlist */}
    <button
      className={`nav-action icon-action ${
        animateWishlist ? "animate-wishlist" : ""
      }`}
      onClick={handleWishlistClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0112 4a5.5 5.5 0 019.5 8C19 16.5 12 21 12 21z"/>
      </svg>

      {wishlistCount > 0 && (
        <span className="icon-count">{wishlistCount}</span>
      )}
    </button>

    {/* Cart */}
    <button
      className={`nav-action icon-action ${
        animateCart ? "animate-cart" : ""
      }`}
      onClick={() => handleNavigate("cart")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M3 3h2l2.2 10h10.8l2-7H8"/>
        <circle cx="10" cy="20" r="1.5"/>
        <circle cx="18" cy="20" r="1.5"/>
      </svg>

      {cartCount > 0 && (
        <span className="icon-count">{cartCount}</span>
      )}
    </button>

    {/* Profile */}
    <div className="profile-container" ref={profileRef}>

      <button
        className="profile-icon-btn"
        onClick={() => setProfileOpen(!profileOpen)}
      >
        <svg
          className="profile-icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 19.125a8.25 8.25 0 0115 0"
          />
        </svg>
      </button>

      <div className={`profile-dropdown ${profileOpen ? "open" : ""}`}>
        {user ? (
          <>
            <div className="profile-user-info">
              <strong>{displayName}</strong>
              <small>{user.email}</small>
            </div>

            <button
              className="auth-button"
              onClick={onLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <p className="profile-dropdown-header">
              Welcome to OG
            </p>

            <button
              className="auth-button"
              onClick={() => onAuthOpen("login")}
            >
              Login
            </button>

            <button
              className="auth-button"
              onClick={() => onAuthOpen("signup")}
            >
              Register
            </button>
          </>
        )}
      </div>

    </div>

  </div>

</div>
    


<div className="mobile-header">

  <div className="mobile-left">

    <button
      className="mobile-menu-btn"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      <FaBars />
    </button>

    <button
      className="mobile-search-btn"
      onClick={handleSearchToggle}
    >
       <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="10.5" cy="10.5" r="6.5"/>
        <line x1="15.5" y1="15.5" x2="21" y2="21"/>
      </svg>
    </button>

  </div>

  <button
    className="brand mobile-brand"
    onClick={() => handleNavigate("home")}
  >
    <img
      className="brand-logo"
      src="/images/brand/og-logo.png"
      alt="OG"
    />
  </button>

  <div className="mobile-right">
   
    <button
  className="nav-action theme-toggle-btn"
  onClick={onThemeToggle}
  aria-label="Toggle Theme"
>
  {theme === "light" ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2"></path>
      <path d="M12 20v2"></path>
      <path d="M4.93 4.93l1.41 1.41"></path>
      <path d="M17.66 17.66l1.41 1.41"></path>
      <path d="M2 12h2"></path>
      <path d="M20 12h2"></path>
      <path d="M4.93 19.07l1.41-1.41"></path>
      <path d="M17.66 6.34l1.41-1.41"></path>
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/>
    </svg>
  )}
</button>

    <button
      className="nav-action"
      onClick={handleWishlistClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0112 4a5.5 5.5 0 019.5 8C19 16.5 12 21 12 21z"/>
      </svg>
    </button>

    <button
      className="nav-action"
      onClick={() => handleNavigate("cart")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M3 3h2l2.2 10h10.8l2-7H8"/>
        <circle cx="10" cy="20" r="1.5"/>
        <circle cx="18" cy="20" r="1.5"/>
      </svg>
    </button>
<button
  className="profile-icon-btn"
  onClick={() => {
    if (user) {
      setProfileOpen((prev) => !prev);
    } else {
      onAuthOpen("login");
      setMenuOpen(false);
    }
  }}
>
        <svg
          className="profile-icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 19.125a8.25 8.25 0 0115 0"
          />
        </svg>
      </button>


  </div>

</div>

<nav className={menuOpen ? "mobile-nav open" : "mobile-nav"}>

  {navItems.map((item) => (
    <button
      key={item.page}
      className={`nav-link ${page === item.page ? "active" : ""}`}
      onClick={() => handleNavigate(item.page)}
    >
      {item.label}
    </button>
  ))}

 
</nav>


  

    <div className={searchOpen ? "search-drop open" : "search-drop"}>
      <div className="search-bar">
        <input
          type="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search OG products..."
        />
        <button onClick={() => setSearchValue("")}>
          Clear
        </button>
      </div>
    </div>

  </header>
);

}