import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProductModal.css";

import { addToCart } from "../../features/cart/cartSlice";
import { toggleWishlist } from "../../features/wishlist/wishlistSlice";

const CATEGORY_COPY = {
  tee: "Crafted from soft, breathable cotton with a relaxed drop-shoulder fit. An everyday staple that pairs with anything in your rotation.",
  oversized: "Premium oversized streetwear made with heavyweight cotton fabric. Designed for everyday comfort with a relaxed oversized fit and premium quality.",
  hoodie: "Heavyweight fleece hoodie built for layering. Brushed interior for warmth, boxy fit for that off-duty street look.",
  bottoms: "Tapered fit with a heavyweight twill build. Made to move with you, from studio sessions to street corners.",
  jacket: "Structured outerwear with a durable shell and clean lines. Built to be the piece people ask about.",
  accessories: "Finish the fit with a detail that carries the whole OG identity — small piece, big statement.",
};

function getDescription(product) {
  if (product?.description) return product.description;
  const key = (product?.type || product?.category || "").toLowerCase();
  return CATEGORY_COPY[key] || CATEGORY_COPY.oversized;
}

export default function ProductModal({ product, onClose }) {
  const [size, setSize] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  // read wishlist state from Redux instead of local useState
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.some((item) => item.id === product?.id);

  const handleAddToCart = () => {
    if (!size) {
      setError("⚠ Please select a size");
      return;
    }

    setError("");

    dispatch(
      addToCart({
        ...product,
        size,
      })
    );

    onClose && onClose();
  };

  const handleWishlist = () => {
    dispatch(toggleWishlist(product));
  };

  return (
    <div className="og-modal-overlay" onClick={onClose}>
      <div className="og-modal" onClick={(e) => e.stopPropagation()}>
        {/* CLOSE */}
        <button className="og-modal-close" onClick={onClose}>
          ✕
        </button>

        {/* LEFT IMAGE */}
        <div className="modal-left">
          <img src={product?.image} alt={product?.name} />
        </div>

        {/* RIGHT */}
        <div className="modal-right">
          <small className="brand">THE OG</small>

          <h2>{product?.name}</h2>

          <h3 className="price">₹{product?.price}</h3>

          <p className="color-text">
            <strong>Color:</strong> {product?.color || "Black"}
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
          {error && <p className="size-error">{error}</p>}

          {/* BUTTONS */}
          <div className="modal-buttons">
            {/* WISHLIST */}
            <button
              className={`wishlist-btn-modal ${isWishlisted ? "active" : ""}`}
              onClick={handleWishlist}
            >
              {isWishlisted ? "❤️ Wishlisted" : "🤍 Wishlist"}
            </button>

            {/* ADD TO CART */}
            <button className="cart-btn" onClick={handleAddToCart}>
              🛒 Add To Cart
            </button>
          </div>

          {/* DESCRIPTION */}
          <p className="description">{getDescription(product)}</p>
        </div>
      </div>
    </div>
  );
}