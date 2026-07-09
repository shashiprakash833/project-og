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
     {/* Mobile Menu - Left */}
    {/* Mobile Left */}
   <div className="mobile-left">

  <button
    className={`mobile-menu-btn ${menuOpen ? "open" : ""}`}
    onClick={() => setMenuOpen((current) => !current)}
    aria-label="Toggle navigation menu"
  >
    <span className="hamburger-line"></span>
    <span className="hamburger-line"></span>
    <span className="hamburger-line"></span>
  </button>

  <button
    className="nav-action icon-action mobile-search-btn"
    onClick={handleSearchToggle}
    aria-label="Search"
  >
    <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="#ffffff"
  strokeWidth="1.8"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <circle cx="10.5" cy="10.5" r="6.5"/>
  <line x1="15.5" y1="15.5" x2="21" y2="21"/>
</svg>
  </button>

</div>
{/* Logo */}
<div className="brand-wrapper">
    <button className="brand"
    onClick={() => handleNavigate("home")}
   aria-label="Go home"
    >
    <img
    className="brand-logo"
    src="/images/brand/og-logo.png"
    alt="The OG"
  />
</button>
</div>



      {menuOpen && (
        <div className="nav-overlay" onClick={() => setMenuOpen(false)} />
      )}

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

{menuOpen && (
  <button
    className="menu-close-btn"
    onClick={() => setMenuOpen(false)}
    aria-label="Close Menu"
  >
    ✕
  </button>
)}

     <div className="header-actions">
        <button
  className="nav-action theme-toggle-btn"
  onClick={onThemeToggle}
  aria-label="Toggle Theme"
>
  {theme === "light" ? "🌙" : "☀️"}
</button>

       

<button
  className="nav-action icon-action desktop-search-btn"
  onClick={handleSearchToggle}
  aria-label="Search"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="10.5" cy="10.5" r="6.5" />
    <line x1="15.5" y1="15.5" x2="21" y2="21" />
  </svg>
</button>
        

        <button
          className={`nav-action icon-action ${animateWishlist ? "animate-wishlist" : ""}`}
          onClick={handleWishlistClick}
          aria-label={`View wishlist (${wishlistCount} items)`}
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
          {wishlistCount > 0 && <span className="icon-count">{wishlistCount}</span>}
        </button>
        <button
          className={`nav-action icon-action ${animateCart ? "animate-cart" : ""}`}
          onClick={() => handleNavigate("cart")}
          aria-label={`View cart (${cartCount} items)`}
        >
          <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <path d="M3 3h2l2.2 10h10.8l2-7H8" />
  <circle cx="10" cy="20" r="1.5" />
  <circle cx="18" cy="20" r="1.5" />
</svg>

          
          {cartCount > 0 && <span className="icon-count">{cartCount}</span>}
        </button>
        <div className="profile-container" ref={profileRef}>
          <button className="profile-icon-btn" onClick={() => setProfileOpen(p => !p)} aria-label="Toggle profile menu">
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
                  <strong title={user.email}>{displayName}</strong>
                  <small>{user.email}</small>
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
                  Register
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
