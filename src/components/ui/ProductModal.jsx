import { useState } from "react";
import "./ProductModal.css";

export default function ProductModal({ product, onClose }) {
  const [size, setSize] = useState("");

  const handleAddToCart = () => {
    if (!size) {
      alert("Select size");
      return;
    }
    alert(`${product.label} added to cart (${size})`);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <button className="close-btn" onClick={onClose}>✕</button>

        <div className="modal-content">
          
          {/* IMAGE */}
          <div className="modal-image">
            <img src={product.src} alt={product.alt} />
          </div>

          {/* DETAILS */}
          <div className="modal-details">
            <h2>{product.label}</h2>
            <p>₹{product.price}</p>

            <h4>Select Size</h4>
            <div className="sizes">
              {["S", "M", "L", "XL"].map((s) => (
                <button
                  key={s}
                  className={size === s ? "active" : ""}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>

            <button className="add-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}