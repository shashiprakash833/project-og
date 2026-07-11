
import { useMemo, useRef, useState } from "react";
import ProductCard from "../ui/ProductCard.jsx";
import "./ProductsSection.css";

const filters = ["all", "oversized", "tees", "bottoms", "accessories"];

export default function ProductsSection({
  products = [],
  wishlist = [],
  onAddToCart,
  onWishlist,
  onNavigate,
}) {
  const [filter, setFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const scrollRef = useRef(null);

  const uniqueProducts = useMemo(() => {
    const seen = new Map();
    for (const p of products) {
      if (p && p.id != null && !seen.has(p.id)) {
        seen.set(p.id, p);
      }
    }
    return Array.from(seen.values());
  }, [products]);

  const normalize = (val) => (val ?? "").toString().trim().toLowerCase();

  const filteredProducts = useMemo(() => {
    if (filter === "all") {
      const men = uniqueProducts
        .filter((p) => normalize(p.gender) === "men")
        .slice(0, 5);

      const women = uniqueProducts
        .filter((p) => normalize(p.gender) === "women")
        .slice(0, 5);

      return [...men, ...women];
    }

    return uniqueProducts.filter(
      (p) => normalize(p.type) === normalize(filter)
    );
  }, [filter, uniqueProducts]);

  const relatedProducts = useMemo(() => {
    if (!selectedProduct) return [];

    return uniqueProducts.filter(
      (p) =>
        p.id !== selectedProduct.id &&
        normalize(p.type) === normalize(selectedProduct.type)
    );
  }, [selectedProduct, uniqueProducts]);

  const handleCardClick = (product) => {
    setSelectedProduct(product);

    requestAnimationFrame(() => {
      document.getElementById("related-products")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const handleRelatedProductClick = (product) => {
    setSelectedProduct(product);

    requestAnimationFrame(() => {
      document.getElementById("image-banner-section")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const scrollByAmount = (ref, amount) => {
    ref.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="products-section" id="shop">
      <div className="section-title premium">
        <span className="eyebrow">THE OG</span>

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
          Handpicked heat.<span> • </span>Limited quantity.<span> • </span>
          Infinite style.
        </p>

        <div className="title-line"></div>
      </div>

      <div className="filters">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            className={filter === item ? "active" : ""}
            onClick={() => {
              setFilter(item);
              setSelectedProduct(null);
            }}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="carousel-wrap" key={filter}>
          <button
            type="button"
            className="carousel-arrow carousel-arrow--left"
            onClick={() => scrollByAmount(scrollRef, -320)}
            aria-label="Scroll left"
          >
            ‹
          </button>

          <div className="product-row-scroll" ref={scrollRef}>
            {filteredProducts.map((product) => (
              <div
                className={`product-cell ${
                  selectedProduct?.id === product.id ? "is-selected" : ""
                }`}
                key={product.id}
                onClick={() => handleCardClick(product)}
              >
                <ProductCard
                  product={product}
                  isWishlisted={wishlist.some((item) => item.id === product.id)}
                  onAddToCart={onAddToCart}
                  onWishlist={onWishlist}
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            className="carousel-arrow carousel-arrow--right"
            onClick={() => scrollByAmount(scrollRef, 320)}
            aria-label="Scroll right"
          >
            ›
          </button>
        </div>
      ) : (
        <p className="no-products" key={filter}>
          No products found in this category.
        </p>
      )}

      {selectedProduct && (
        <div className="related-section" id="related-products">
          <div className="related-header">
            <div>
              <span className="related-eyebrow">You clicked</span>
              <h3 className="related-title">{selectedProduct.name}</h3>
              <p className="related-subtext">
                Similar {selectedProduct.type} you may also like
              </p>
            </div>

            <button
              type="button"
              className="related-close"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close related products"
            >
              ✕
            </button>
          </div>

          <div className="related-grid">
            <div className="related-grid-item featured-product">
              <ProductCard
                product={selectedProduct}
                isWishlisted={wishlist.some(
                  (item) => item.id === selectedProduct.id
                )}
                onAddToCart={onAddToCart}
                onWishlist={onWishlist}
              />
            </div>

            {relatedProducts.length > 0 ? (
              relatedProducts.map((product) => (
                <div
                  className="related-grid-item"
                  key={product.id}
                  onClick={() => handleRelatedProductClick(product)}
                >
                  <ProductCard
                    product={product}
                    isWishlisted={wishlist.some(
                      (item) => item.id === product.id
                    )}
                    onAddToCart={onAddToCart}
                    onWishlist={onWishlist}
                  />
                </div>
              ))
            ) : (
              <p className="no-products">No related products found.</p>
            )}
          </div>
        </div>
      )}

      <div className="products-actions">
        <button
          type="button"
          className="text-link big-action-btn"
          onClick={() => onNavigate && onNavigate("shop")}
        >
          -View All Products
        </button>
      </div>

      <div className="collection-header">
        <span className="collection-label">DISCOVER</span>
        <h2 className="collection-title">VIEW COLLECTION</h2>
        <p className="collection-text">
          Crafted for those who take risks, not shortcuts.
        </p>

        <button
          type="button"
          className="collection-btn image-bg-btn"
          onClick={() => onNavigate && onNavigate("collections")}
        >
          Explore Collection
        </button>
      </div>
    </section>
  );
}