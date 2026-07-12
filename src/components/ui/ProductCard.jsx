import { useState } from "react";
import ProductModal from "./ProductModal";
import "./ProductCard.css";

export default function ProductCard({
  product,
  isWishlisted,
  onAddToCart,
  onWishlist,
}) {
  const [showModal, setShowModal] = useState(false);
  const [wishlist, setWishlist] = useState(!!isWishlisted);

  const handleWishlist = () => {
    setWishlist((prev) => !prev);
    onWishlist && onWishlist(product);
  };

  return (
    <>
      <div className="pcard">
        <button
          className="pcard-image-btn"
          onClick={() => setShowModal(true)}
          aria-label={`View ${product?.name}`}
        >
          <img
            className="pcard-image"
            src={product?.image}
            alt={product?.name}
          />
        </button>

        <button
          className={`pcard-heart ${wishlist ? "active" : ""}`}
          onClick={handleWishlist}
          aria-label={wishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          {wishlist ? "♥" : "♡"}
        </button>

        <div className="pcard-body">
          <h3 className="pcard-name">{product?.name}</h3>
          {product?.color && (
            <p className="pcard-color">{product.color}</p>
          )}

          <div className="pcard-bottom-row">
            <p className="pcard-price">₹{product?.price}</p>
            <button
              className="pcard-cart-btn"
              onClick={() =>
                onAddToCart &&
                onAddToCart({ ...product, size: product?.sizes?.[0] || "M" })
              }
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <ProductModal
          product={product}
          onClose={() => setShowModal(false)}
          onAddToCart={onAddToCart}
        />
      )}
    </>
  );
}