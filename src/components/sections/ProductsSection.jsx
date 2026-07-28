import { useMemo, useState } from "react";
import ProductCard from "../ui/ProductCard.jsx";
import "./ProductsSection.css";

const filters = ["all", "hoodies", "tees", "caps", "bottoms", "jackets"];

export default function ProductsSection({ products = [], wishlist = [], onAddToCart, onWishlist, onNavigate }) {
  const [filter, setFilter] = useState("all");
  const filteredProducts = useMemo(
    () => (filter === "all" ? products : products.filter((product) => product.type === filter)),
    [filter, products]
  );


  return (
    <section className="products-section" id="shop">
      <div className="section-title compact">
        <p>Featured</p>
        <h2>Drops.</h2>
        <span>Handpicked heat. Limited quantity. Infinite style.</span>
      </div>

      <div className="filters">
        {filters.map((item) => (
          <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>
            {item}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isWishlisted={wishlist.some((item) => item.id === product.id)}
            onAddToCart={onAddToCart}
            onWishlist={onWishlist}
          />
        ))}
      </div>

      <button className="text-link" onClick={() => onNavigate("shop")}>View All Products</button>
    </section>
  );
}
