import "./ProductCard.css";
import { Heart } from "lucide-react";

export default function ProductCard({
  product,
  quantity = 0,
  onAddToCart,
  onRemoveFromCart,
  onWishlist,
  isWishlisted,
  onClick,
}) {
  return (
    <article className="product-card">
      
      {/* IMAGE CLICK → OPEN MODAL */}
      <div
        className="product-art"
        onClick={() => onClick && onClick(product)}
      >
        
        {/* ❤️ WISHLIST */}
        <button
          className="wishlist-btn"
          onClick={(e) => {
            e.stopPropagation(); // 🚀 VERY IMPORTANT
            onWishlist && onWishlist(product);
          }}
        >
          <Heart
            size={22}
            strokeWidth={2}
            color={isWishlisted ? "red" : "white"}
            fill={isWishlisted ? "red" : "none"}
          />
        </button>

        {/* IMAGE */}
        {product.image ? (
          <>
            <div
              className="product-art-bg"
              style={{ backgroundImage: `url(${product.image})` }}
            />

            <img
              className="product-art-focus"
              src={product.image}
              alt={product.name}
              loading="lazy"
            />
          </>
        ) : (
          <span>{product.tag}</span>
        )}
      </div>

      {/* INFO */}
      <div className="product-info">
        <div>
          <h3>{product.name}</h3>
          <p>₹{product.price?.toLocaleString("en-IN")}</p>
        </div>

        {/* QUANTITY CONTROLS */}
        <div className="qty-control">
          <button
            className="qty-btn"
            onClick={(e) => {
              e.stopPropagation(); // 🚀 prevent modal open
              onRemoveFromCart && onRemoveFromCart(product);
            }}
          >
            −
          </button>

          <span className="qty">{quantity}</span>

          <button
            className="qty-btn"
            onClick={(e) => {
              e.stopPropagation(); // 🚀 prevent modal open
              onAddToCart && onAddToCart(product);
            }}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}