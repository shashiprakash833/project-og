import React from "react";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { image } = product;

  return (
    <div className="product-card">
      <img src={image} alt="product" className="product-card__image" />
    </div>
  );
}