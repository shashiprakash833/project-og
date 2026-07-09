import { useState } from "react";
import "./ProductModal.css";

import {
  FaTimes,
  FaStar,
  FaStarHalfAlt,
  FaRegHeart,
  FaHeart,
} from "react-icons/fa";

export default function ProductModal({ product, onClose, onAddToCart }) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const color = product.colors?.[selectedColorIndex];

  const discount =
    product.mrp && product.price
      ? Math.round((1 - product.price / product.mrp) * 100)
      : null;

  function handleAddToCart() {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }

    if (onAddToCart) {
      onAddToCart(product, {
        size: selectedSize,
        color: color?.name,
      });
    }

    setAdded(true);

    setTimeout(() => {
      onClose && onClose();
    }, 300);
  }

  function renderStars() {
    const rating = product.rating || 0;
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;

    return (
      <span className="modal-stars">
        {Array.from({ length: full }).map((_, i) => (
          <FaStar key={i} />
        ))}
        {half && <FaStarHalfAlt />}
      </span>
    );
  }

  return (
    <div className="og-modal-overlay" onClick={onClose}>
      <div className="og-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button
          className="og-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          <FaTimes />
        </button>

        {/* LEFT: Image */}
        <div className="og-modal-image-col">
          <div className="og-modal-main-image">
            <img
              src={color?.image || product.image}
              alt={`${product.name} - ${color?.name || ""}`}
            />
          </div>

          {product.colors?.length > 0 && (
            <div className="og-modal-color-row">
              {product.colors.map((c, i) => (
                <button
                  key={c.name}
                  className={`color-thumb ${
                    i === selectedColorIndex
                      ? "color-thumb-active"
                      : ""
                  }`}
                  style={{ background: c.hex }}
                  aria-label={c.name}
                  onClick={() => setSelectedColorIndex(i)}
                />
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Details */}
        <div className="og-modal-details-col">
          <div className="og-modal-brand">OG</div>

          <h2>{product.name}</h2>

          {/* Rating */}
          <div className="og-modal-rating">
            {renderStars()}
            <span className="rating-count">
              {product.rating || 0} ({product.reviewCount || 0} ratings)
            </span>
          </div>

          {/* Price */}
          <div className="og-modal-price-row">
            <span className="price">
              ₹{product.price?.toLocaleString("en-IN")}
            </span>

            {product.mrp && (
              <span className="mrp">
                ₹{product.mrp.toLocaleString("en-IN")}
              </span>
            )}

            {discount !== null && (
              <span className="discount">{discount}% off</span>
            )}
          </div>

          {/* Color */}
          {color && (
            <div className="og-modal-label">
              COLOR: <span className="value">{color.name}</span>
            </div>
          )}

          {/* Size */}
          <div className="og-modal-label" style={{ marginTop: "14px" }}>
            SELECT SIZE
          </div>

          <div className="og-modal-size-row">
            {(product.sizes || ["One size"]).map((size) => (
              <button
                key={size}
                className={`size-btn ${
                  selectedSize === size ? "size-btn-active" : ""
                }`}
                onClick={() => {
                  setSelectedSize(size);
                  setSizeError(false);
                }}
              >
                {size}
              </button>
            ))}
          </div>

          {sizeError && (
            <div className="og-modal-error">
              Pick a size to continue.
            </div>
          )}

          {/* Actions */}
          <div className="og-modal-actions">
            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>

            <button
              className={`wishlist-btn ${
                wished ? "wishlist-btn-active" : ""
              }`}
              onClick={() => setWished((w) => !w)}
              aria-label="Toggle wishlist"
            >
              {wished ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>

          {added && (
            <div className="og-modal-added-msg">
              Added to cart.
            </div>
          )}

          {/* Description */}
          {product.description && (
            <div className="og-modal-description">
              {product.description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}