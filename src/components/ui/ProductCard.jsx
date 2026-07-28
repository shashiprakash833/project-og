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

  const handleWishlist = (e) => {
    e.stopPropagation();
    setWishlist((prev) =>!prev);
    onWishlist && onWishlist(product);
  };

  return (
    <>
      <div className="pcard">
        {/* IMAGE */}
        <button
          className="pcard-image-btn"
          onClick={() => setShowModal(true)}
          aria-label={`View ${product?.name}`}
        >
          <img
            className="pcard-image"
            src={product?.image}
            alt={product?.name}
            loading="lazy"
          />
        </button>

        {/* WISHLIST - BIG HEART BEFORE AND AFTER */}
        <button
          className={`pcard-heart ${wishlist? "active" : ""}`}
          onClick={handleWishlist}
          aria-label={wishlist? "Remove from wishlist" : "Add to wishlist"}
          style={{ fontSize: "32px", width: "44px", height: "44px" }}
        >
          {wishlist? "♥" : "♡"}
        </button>

        {/* BODY */}
        <div className="pcard-body">
          <h3 className="pcard-name">{product?.name}</h3>

          {product?.color && (
            <p className="pcard-color">{product.color}</p>
          )}

          <div className="pcard-bottom-row">
            <p className="pcard-price">₹{product?.price}</p>

            <button
              className="pcard-cart-btn"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart &&
                  onAddToCart({
                   ...product,
                    size: product?.sizes?.[0] || "M",
                  });
              }}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
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