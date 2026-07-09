import { useMemo, useState } from "react";
import ProductCard from "../ui/ProductCard.jsx";
import ProductModal from "../ui/ProductModal";
import "./ProductsSection.css";

const filters = ["all", "tees", "bottoms", "accessories"];

export default function ProductsSection({
  products = [],
  wishlist = [],
  onAddToCart,
  onWishlist,
  onNavigate,
}) {
  const [filter, setFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    if (filter === "all") return products;
    return products.filter((product) => product.type === filter);
  }, [filter, products]);

  return (
    <section className="products-section" id="shop">
      <div className="section-title compact">
        <p>Featured</p>
        <h2>Drops.</h2>
        <span>Handpicked heat. Limited quantity. Infinite style.</span>
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
            isWishlisted={wishlist.some(
              (item) => item.id === product.id
            )}
            onAddToCart={onAddToCart}
            onWishlist={onWishlist}
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      <button
        className="text-link"
        onClick={() => onNavigate && onNavigate("shop")}
      >
        View All Products
      </button>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </section>
  );
}