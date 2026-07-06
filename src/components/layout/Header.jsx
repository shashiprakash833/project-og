import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { navItems } from "../../data/storeData.js";

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
      <button className="brand" onClick={() => handleNavigate("home")} aria-label="Go home">
        <img className="brand-logo" src="/images/brand/og-logo.png" alt="The OG" />
      </button>

      <button
        className="mobile-menu-btn"
        onClick={() => setMenuOpen((current) => !current)}
        aria-label="Toggle navigation menu"
      >
        {menuOpen ? "Close" : "Menu"}
      </button>

      <nav className={menuOpen ? "nav open" : "nav"}>
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

      <div className="header-actions">
        <button className="nav-action" onClick={handleSearchToggle}>
          Search
        </button>
        <button
          className={`nav-action icon-action ${animateWishlist ? "animate-wishlist" : ""}`}
          onClick={handleWishlistClick}
          aria-label={`View wishlist (${wishlistCount} items)`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-1.383-.598 19.466 19.466 0 01-3.42-1.98 23.445 23.445 0 01-4.13-3.289c-1.121-1.282-2.15-2.884-2.798-4.682A7.5 7.5 0 015.25 6.135a7.5 7.5 0 0111.37-1.415.5.5 0 00.33.123.5.5 0 00.33-.123A7.5 7.5 0 0121 8.635a7.5 7.5 0 01-2.25 5.482c-.648 1.798-1.677 3.4-2.798 4.682a23.445 23.445 0 01-4.13 3.289 19.466 19.466 0 01-3.42 1.98 15.247 15.247 0 01-1.383.598l-.022.012-.007.004-.004.002z" />
          </svg>
          {wishlistCount > 0 && <span className="icon-count">{wishlistCount}</span>}
        </button>
        <button
          className={`nav-action icon-action ${animateCart ? "animate-cart" : ""}`}
          onClick={() => handleNavigate("cart")}
          aria-label={`View cart (${cartCount} items)`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.814 0-1.538.4-1.965 1.115l-2.25 3.375c-.22.33-.335.72-.335 1.11v4.5c0 .828.672 1.5 1.5 1.5h15c.828 0 1.5-.672 1.5-1.5v-4.5c0-.39-.115-.78-.335-1.11l-2.25-3.375A2.25 2.25 0 0018.487 6.75H16.5V6a4.5 4.5 0 10-9 0zM12 4.5a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 9a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm1.5-1.5a.75.75 0 00-.75.75A.75.75 0 0012 13.5a.75.75 0 00.75-.75A.75.75 0 0012 12h-1.5z" clipRule="evenodd" />
          </svg>
          {cartCount > 0 && <span className="icon-count">{cartCount}</span>}
        </button>
        <div className="profile-container" ref={profileRef}>
          <button className="profile-icon-btn" onClick={() => setProfileOpen(p => !p)} aria-label="Toggle profile menu">
            <svg className="profile-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className={`profile-dropdown ${profileOpen ? "open" : ""}`}>
            {user ? (
              <>
                <div className="profile-user-info">
                  <strong title={user.email}>{displayName}</strong>
                  <small>{user.email}</small>
                </div>
                <div className="profile-actions-group">
                  <button className="auth-button" type="button" onClick={onThemeToggle}>
                    {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                  </button>
                </div>
                <button className="auth-button" type="button" onClick={onLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <p className="profile-dropdown-header">Welcome to OG</p>
                <div className="profile-actions-group">
                  <button className="auth-button" type="button" onClick={onThemeToggle}>
                    {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                  </button>
                </div>
                <button className="auth-button" type="button" onClick={() => onAuthOpen("login")}>
                  Login
                </button>
                <button className="auth-button" type="button" onClick={() => onAuthOpen("signup")}>
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={searchOpen ? "search-drop open" : "search-drop"}>
        <div className="search-bar">
          <input
            type="search"
            placeholder="Search OG products..."
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
          <button onClick={() => setSearchValue("")}>Clear</button>
        </div>
      </div>
    </header>
  );
}
