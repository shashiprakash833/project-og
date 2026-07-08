import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function ProductCard({ product, isWishlisted, onAddToCart, onWishlist }) {
  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => Math.max(1, q - 1));

  return (
    <article className="product-card-simple">
      <button
        className="wishlist-btn-simple"
        onClick={() => onWishlist(product)}
        aria-label={`Wishlist ${product.name}`}
      >
        {isWishlisted ? (
          <FaHeart size={20} color="#e11e1e" />
        ) : (
          <FaRegHeart size={20} color="#fff" />
        )}
      </button>

      <div className="product-image-wrap">
        {product.image ? (
          <img src={product.image} alt={product.name} loading="lazy" />
        ) : (
          <div className="no-image">{product.tag}</div>
        )}
      </div>

      <div className="product-body">
        <h3>{product.name}</h3>
        <p className="price-line">Rs {product.price.toLocaleString("en-IN")}</p>
        <p className="description-line">
          {product.description || "Premium OG streetwear crafted for everyday confidence."}
        </p>

        <div className="quantity-row">
          <button onClick={decreaseQty} aria-label="Decrease quantity">−</button>
          <span className="qty-value">{quantity}</span>
          <button onClick={increaseQty} aria-label="Increase quantity">+</button>
        </div>

        <button className="add-to-cart-simple" onClick={() => onAddToCart(product, quantity)}>
          Add to Cart
        </button>
      </div>
    </article>
  );
}