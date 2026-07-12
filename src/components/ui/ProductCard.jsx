import { useState } from "react";
import ProductModal from "./ProductModal";
import "./ProductCard.css";

<<<<<<< HEAD
export default function ProductCard({
  product,
  isWishlisted,
  onAddToCart,
  onWishlist,
}) {
  const [showModal, setShowModal] = useState(false);
  const [wishlist, setWishlist] = useState(!!isWishlisted);
=======
export default function ProductCard({ product, quantity = 0, isWishlisted, onAddToCart, onRemoveFromCart, onWishlist }) {
  return (
    <div className="product-card">
      <div className="product-img-wrap">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-img"
          loading="lazy" 
        />
        <button
          type="button"
          className={`wishlist-btn ${isWishlisted? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onWishlist(product);
          }}
          aria-label={isWishlisted? "Remove from wishlist" : "Add to wishlist"}
        >
<<<<<<< HEAD
          <svg width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted? "#fff" : "none"} stroke="currentColor">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 0 0 0 0-7.78z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
=======
          <Heart
           
            color={isWishlisted ? "red" : "white"}
            fill={isWishlisted ? "red" : "none"}
          />
>>>>>>> origin/sagarika
        </button>
      </div>
>>>>>>> 6de673ee63685316701f0836652b898b58e0240d

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