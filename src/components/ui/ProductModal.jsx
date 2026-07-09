import { useState } from "react";
import "./ProductModal.css";

export default function ProductModal({
  product,
  onClose,
  onAddToCart,
}) {
  const [size, setSize] = useState("");
  const [wishlist, setWishlist] = useState(false);
  const [error, setError] = useState("");

  const handleAddToCart = () => {
    if (!size) {
      setError("⚠ Please select a size");
      return;
    }

    setError("");

    onAddToCart &&
      onAddToCart({
        ...product,
        size,
      });

    onClose && onClose();
  };

  return (
    <div
      className="og-modal-overlay"
      onClick={onClose}
    >
      <div
        className="og-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button
          className="og-modal-close"
          onClick={onClose}
        >
          ✕
        </button>

        {/* LEFT IMAGE */}
        <div className="modal-left">
          <img
            src={product?.image}
            alt={product?.name}
          />
        </div>

        {/* RIGHT */}
        <div className="modal-right">

          <small className="brand">THE OG</small>

          <h2>{product?.name}</h2>

          <h3 className="price">
            ₹{product?.price}
          </h3>

          <p className="color-text">
            <strong>Color:</strong> Black
          </p>

          {/* SIZE */}
          <h4>Select Size</h4>

          <div className="sizes">
            {["S", "M", "L", "XL"].map((item) => (
              <button
                key={item}
                className={size === item ? "active" : ""}
                onClick={() => {
                  setSize(item);
                  setError("");
                }}
              >
                {item}
              </button>
            ))}
          </div>

          {/* ERROR */}
          {error && (
            <p className="size-error">{error}</p>
          )}

          {/* BUTTONS */}
          <div className="modal-buttons">
            
            {/* WISHLIST */}
            <button
              className={`wishlist-btn-modal ${
                wishlist ? "active" : ""
              }`}
              onClick={() =>
                setWishlist((prev) => !prev)
              }
            >
              {wishlist
                ? "❤️ Wishlisted"
                : "🤍 Wishlist"}
            </button>

            {/* ADD TO CART */}
            <button
              className="cart-btn"
              onClick={handleAddToCart}
            >
              🛒 Add To Cart
            </button>

          </div>

          {/* DESCRIPTION */}
          <p className="description">
            Premium oversized streetwear made
            with heavyweight cotton fabric.
            Designed for everyday comfort with
            a relaxed oversized fit and premium quality.
          </p>

        </div>
      </div>
    </div>
  );
}