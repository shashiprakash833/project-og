import "./ProductCard.css";
import { Heart } from "lucide-react";

export default function ProductCard({
  product,
  quantity,
  onAddToCart,
  onRemoveFromCart,
  onWishlist,
  isWishlisted,
}) {
  return (
    <article className="product-card">
      <div className="product-art">
        {/* Wishlist Button */}
        <button
          className="wishlist-btn"
          onClick={() => onWishlist(product)}
          aria-label={`Wishlist ${product.name}`}
        >
          <Heart
            size={22}
            strokeWidth={2}
            color={isWishlisted ? "red" : "white"}
            fill={isWishlisted ? "red" : "none"}
          />
        </button>

        {product.image ? (
          <>
            <div
              className="product-art-bg"
              style={{ backgroundImage: `url(${product.image})` }}
              aria-hidden="true"
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

      <div className="product-info">
        <div>
          <h3>{product.name}</h3>
          <p>Rs {product.price.toLocaleString("en-IN")}</p>
        </div>

        <div className="qty-control">
          <button className="qty-btn" onClick={() => onRemoveFromCart(product)}>
            −
          </button>

          <span className="qty">{quantity}</span>

          <button className="qty-btn" onClick={() => onAddToCart(product)}>
            +
          </button>
        </div>
      </div>
    </article>
  );
}
