import { useState } from "react";
import "./LookbookSection.css";
import ProductModal from "./ProductModal.jsx";

const slides = [
  {
    src: "/images/collections/mens/over1.jpeg",
    label: "OG Signature",
    alt: "Bold streetwear for men",
    price: 1999,
  },
  {
    src: "/images/collections/womens/Female_model_in_sweatshirt_2K_202607021331.jpeg",
    label: "OG Femme",
    alt: "Bold streetwear for women",
    price: 1799,
  },
  {
    src: "/images/collections/womens/Model_in_oversized_streetwear_tee_202607021331.jpeg",
    label: "Urban Motion",
    alt: "High-impact urban outfit",
    price: 1899,
  },
  {
    src: "/public/images/products/hoo1.jpg",
    label: "Street Command",
    alt: "Streetwear icon",
    price: 2099,
  },
  {
    src: "/images/collections/mens/bottoms.jpeg",
    label: "Red Rebel",
    alt: "Red statement street style",
    price: 1699,
  },
  {
    src: "/images/collections/mens/hoodies.jpeg",
    label: "Hoodie Hype",
    alt: "OG hoodie outfit",
    price: 2299,
  },
];

export default function LookbookSection({ onNavigate }) {
  const [index, setIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const slide = slides[index];

  return (
    <>
      <section className="lookbook-section">

        {/* UPCOMING OG EVENT REVEALS */}
        <div className="og-event-card">
          <div className="event-badge">COMING SOON</div>
          <div className="event-image-overlay">
            <img src="/images/story.jpeg" alt="Upcoming Surprise Collection Drop" />
            <div className="event-gradient"></div>
          </div>
          <div className="event-content">
            <span className="event-eyebrow">OG REVEALS &amp; EVENTS</span>
            <h3 className="event-title">SURPRISE<br/>COLLECTION</h3>
            <p className="event-desc">
              A top-secret, high-concept capsule collection is dropping soon. Enter the realm of raw expression.
            </p>
            <div className="reveal-status">
              <span className="status-dot"></span>
              <span className="status-text">PREPARING LAUNCH · PHASE 1</span>
            </div>
          </div>
        </div>

        {/* TEXT */}
        <div className="lookbook-copy">
          <span className="lookbook-eyebrow">Lookbook 24</span>
          <h2 className="lookbook-heading">Made To Break <span>Rules.</span></h2>
          <p className="lookbook-description">This is not just fashion. It is rebellion, identity, and OG.</p>
          <button className="lookbook-btn" onClick={() => onNavigate("archive")}>
            Explore Lookbook
          </button>
        </div>

        {/* SLIDER */}
        <div className="slider-card">
          <div
            className="slider-image"
            onClick={() => setSelectedProduct(slide)}
            style={{ cursor: "pointer" }}
          >
            <img src={slide.src} alt={slide.alt} />
          </div>

          <div className="slider-meta">
            <h3>{slide.label}</h3>
            <span>₹{slide.price.toLocaleString("en-IN")}</span>
          </div>

          <button
            className="slider-prev"
            onClick={() =>
              setIndex((index - 1 + slides.length) % slides.length)
            }
          >
            ‹
          </button>

          <button
            className="slider-next"
            onClick={() =>
              setIndex((index + 1) % slides.length)
            }
          >
            ›
          </button>
        </div>
      </section>

      {/* MODAL */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}