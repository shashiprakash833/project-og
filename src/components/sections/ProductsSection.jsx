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
       <div className="section-title premium">

    <span className="eyebrow">THE   OG </span>

    <h2 className="drops-title">
      <span>S</span>
      <span>I</span>
      <span>G</span>
      <span>N</span>
      <span>A</span>
      <span>T</span>
      <span>U</span>
      <span>R</span>
      <span>E</span>
    </h2>

    <p className="subtitle">
      Handpicked heat.
      <span></span>
      Limited quantity.
      <span></span>
      Infinite style.
    </p>

    <div className="title-line"></div>

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

      <div className="collection-header">
  <span className="collection-label">DISCOVER</span>

  <h2 className="collection-title">
    VIEW COLLECTION
  </h2>

  <p className="collection-text">
    Crafted for those who take risks, not shortcuts.
  </p>

  <button
    className="collection-btn"
    onClick={() => onNavigate("shop")}
  >
    Explore →
  </button>
</div>

    </section>
  );
}