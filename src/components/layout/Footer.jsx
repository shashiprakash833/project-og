import { navItems } from "../../data/storeData.js";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import footer_logo from "../../images/footer_logo.png";
import "./Footer.css";

export default function Footer({ onNavigate, onToast }) {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Logo */}
        <div className="footer-box">
          
          <img src={footer_logo} alt="OG Logo" className="footer-logo" />

          <p className="logo-title">STREET WEAR</p>

          <p className="footer-text">
            Rooted in the streets.
            <br />
            Built for the real ones.
            <br />
            Not for everyone.
          </p>

          <div className="socials">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Shop */}
        <div className="footer-box">
          <h4>SHOP</h4>

          <ul>
            <li><a href="/">New Arrivals</a></li>
            <li><a href="/">T-Shirts</a></li>
            <li><a href="/">Hoodies</a></li>
            <li><a href="/">Bottoms</a></li>
            <li><a href="/">Accessories</a></li>
          </ul>
        </div>

        {/* Collections */}
        <div className="footer-box">
          <h4>COLLECTIONS</h4>

          <ul>
            <li><a href="/">OG Classics</a></li>
            <li><a href="/">Signature</a></li>
            <li><a href="/">Essentials</a></li>
            <li><a href="/">Graphics</a></li>
            <li><a href="/">Limited Drops</a></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div className="footer-box">
          <h4>CUSTOMER CARE</h4>

          <ul>
            <li><a href="/">Help Center</a></li>
            <li><a href="/">Shipping</a></li>
            <li><a href="/">Returns</a></li>
            <li><a href="/">Size Guide</a></li>
            <li><a href="/">Contact Us</a></li>
          </ul>
        </div>

        {/* About */}
        <div className="footer-box">
          <h4>ABOUT OG</h4>

          <ul>
            <li><a href="/">Our Story</a></li>
            <li><a href="/">Lookbook</a></li>
            <li><a href="/">Careers</a></li>
            <li><a href="/">Press</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="newsletter">

          <h3>STAY IN THE CULTURE</h3>

          <p>
            Join the OG family for exclusive drops,
            offers and early access.
          </p>

          <form>
            <input
              type="email"
              placeholder="Enter your email"
            />

            <button type="submit">
              SUBSCRIBE
            </button>
          </form>

        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 OG Street Wear. All rights reserved.</p>

        <div>
          <a href="/">Privacy Policy</a>
          <a href="/">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
}
