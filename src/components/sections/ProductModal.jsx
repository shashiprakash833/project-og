import { useState } from "react";

export default function ProductModal({ product, onClose, onAddToCart }) {
  const [size, setSize] = useState("");

  if (!product) return null;

  const handleAdd = () => {
    if (!size) {
      alert("Please select size");
      return;
    }

    if (onAddToCart) {
      onAddToCart({ ...product, size });
    }

    onClose();
  };

  return (
    <div className="product-modal-overlay" onClick={onClose}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-content">
          <div className="modal-image">
            <img src={product.image || ""} alt={product.name} />
          </div>

          <div className="modal-details">
            <h2>{product.name}</h2>
            <p className="price">₹{product.price}</p>
            <p className="desc">{product.description || "No description"}</p>

            <div className="sizes">
              <p>Select Size</p>
              {["S", "M", "L", "XL"].map((s) => (
                <button
                  key={s}
                  className={`size-btn ${size === s ? "active" : ""}`}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>

            <button className="btn primary" onClick={handleAdd}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}