import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductModal from "./ProductModal";
import "./ProductCard.css";

import { addToCart } from "../../features/cart/cartSlice";
import { toggleWishlist } from "../../features/wishlist/wishlistSlice";

export default function ProductCard({ product }) {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  // read wishlist items from the Redux store
  const wishlistItems = useSelector((state) => state.wishlist.items);
  // check if THIS product is already in the wishlist
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  const handleWishlist = (e) => {
    e.stopPropagation();
    dispatch(toggleWishlist(product));
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(
      addToCart({
        ...product,
        size: product?.sizes?.[0] || "M",
      })
    );
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
          className={`pcard-heart ${isWishlisted ? "active" : ""}`}
          onClick={handleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isWishlisted ? "♥" : "♡"}
        </button>

        {/* BODY */}
        <div className="pcard-body">
          <h3 className="pcard-name">{product?.name}</h3>

          {product?.color && <p className="pcard-color">{product.color}</p>}

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
        <ProductModal product={product} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}