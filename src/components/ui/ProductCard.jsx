import { useState } from "react";
import ProductModal from "./ProductModal";
import "./ProductCard.css";

import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

export default function ProductCard({
  product,
  isWishlisted,
  onWishlist,
}) {
  const [showModal, setShowModal] = useState(false);
  const [wishlist, setWishlist] = useState(!!isWishlisted);

  const dispatch = useDispatch(); // 👈 1. get access to Redux dispatch

  const handleWishlist = (e) => {
    e.stopPropagation();
    setWishlist((prev) => !prev);
    onWishlist && onWishlist(product);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(
      addToCart({
        ...product,
        size: product?.sizes?.[0] || "M",
      })
    ); // 👈 2. dispatch the Redux action instead of calling a prop
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

        {/* WISHLIST */}
        <button
          className={`pcard-heart ${wishlist ? "active" : ""}`}
          onClick={handleWishlist}
          aria-label={wishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          {wishlist ? "♥" : "♡"}
        </button>

        {/* BODY */}
        <div className="pcard-body">
          <h3 className="pcard-name">{product?.name}</h3>

          {product?.color && (
            <p className="pcard-color">{product.color}</p>
          )}

          <div className="pcard-bottom-row">
            <p className="pcard-price">₹{product?.price}</p>

            <button className="pcard-cart-btn" onClick={handleAddToCart}>
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
        />
      )}
    </>
  );
}