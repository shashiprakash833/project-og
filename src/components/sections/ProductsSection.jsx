import { useMemo, useState } from "react";
import ProductCard from "../ui/ProductCard.jsx";
import "./ProductsSection.css";

const filters = [
  "all",
  "oversized",
  "tanks",
  "tees",
  "bottoms",
  "accessories",
];

export default function ProductsSection({ products, wishlist, onAddToCart, onWishlist, onNavigate }) {
  const [filter, setFilter] = useState("all");
  const filteredProducts = useMemo(
    () => (filter === "all" ? products : products.filter((product) => product.type === filter)),
    [filter, products]
  );

  return (
    <section className="products-section" id="shop">
      <div className="section-title premium">
  <span className="section-tag">FEATURED DROP</span>

  <h2 className="section-heading">
    <span>DROPS</span>.
  </h2>

  <p className="section-copy">
    Handpicked essentials crafted for those who never follow trends.
    Every piece is produced in limited quantities to keep your style exclusive.
  </p>

  <div className="heading-line"></div>
</div>
      <div className="products-top">
  <button
    className="view-all-btn"
    onClick={() => onNavigate("shop")}
  >
    View All Products →
  </button>
</div>

<div className="filters">
  {filters.map((item) => (
    <button
      key={item}
      className={filter === item ? "active" : ""}
      onClick={() => setFilter(item)}
    >
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

    </section>
  );
}
