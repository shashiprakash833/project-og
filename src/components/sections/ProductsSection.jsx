import { useMemo, useRef, useState } from "react";
import ProductCard from "../ui/ProductCard.jsx";
import FeaturedDropsCarousel from "./FeaturedDropsCarousel.jsx";
import "./ProductsSection.css";

const filters = ["all", "oversized", "tees", "bottoms", "accessories"];

const carouselImages = [
  { src: "/images/Carousel/trendy_accessories_banner.webp", alt: "Drop 1", caption: "New Arrivals" },
  { src: "/images/Carousel/mega_sale_banner.webp", alt: "Drop 2", caption: "Limited Run" },
  { src: "/images/Carousel/mens_streetwear_banner.webp", alt: "Drop 3", caption: "Street Essentials" },
];

// IMAGE ONLY CARD
function ImageOnlyCard({ product }) {
  return (
    <div className="image-only-card">
      <img src={product.image} alt={product.name} loading="lazy" />
    </div>
  );
}

// RELATED PRODUCT CARD
function RelatedProductCard({ product, onAddToCart }) {
  return (
    <div className="related-product-card">
      <div className="related-img-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>

      <div className="related-info">
        <h4 className="related-name">{product.name}</h4>

        {product.description && (
          <p className="related-desc">{product.description}</p>
        )}

        <div className="related-bottom">
          <span className="related-price">₹{product.price}</span>

          <button
            type="button"
            className="related-add-cart"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}

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

  const normalize = (val) => (val ?? "").toString().trim().toLowerCase();

  const uniqueProducts = useMemo(() => {
    const seen = new Map();
    for (const p of products) {
      if (p && p.id != null && !seen.has(p.id)) {
        seen.set(p.id, p);
      }
    }
    return Array.from(seen.values());
  }, [products]);

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
      });
    });
  };

  const handleRelatedProductClick = (product) => {
    setSelectedProduct(product);

    requestAnimationFrame(() => {
      document.getElementById("shop")?.scrollIntoView({
        behavior: "smooth",
      });
    });
  };

  const scrollByAmount = (ref, amount) => {
    ref.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="products-section" id="shop">

      {/* TITLE */}
      <div className="section-title premium">
        <span className="eyebrow">THE OG</span>
        <h2 className="drops-title">SIGNATURE</h2>
        <p className="subtitle">
          Handpicked heat • Limited quantity • Infinite style
        </p>
        <div className="title-line"></div>
      </div>

      {/* FILTERS */}
      <div className="filters">
        {filters.map((item) => (
          <button
            key={item}
            className={filter === item ? "active" : ""}
            onClick={() => {
              setFilter(item);
              setSelectedProduct(null);
            }}
          >
            {item}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      {filteredProducts.length > 0 ? (
        <div className="carousel-wrap">
          <button onClick={() => scrollByAmount(scrollRef, -320)}>‹</button>

          <div className="product-row-scroll" ref={scrollRef}>
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className={`product-cell ${
                  selectedProduct?.id === product.id ? "is-selected" : ""
                }`}
                onClick={() => handleCardClick(product)}
              >
                <ImageOnlyCard product={product} />
              </div>
            ))}
          </div>

          <button onClick={() => scrollByAmount(scrollRef, 320)}>›</button>
        </div>
      ) : (
        <p>No products found</p>
      )}

      {/* RELATED */}
      {selectedProduct && (
        <div id="related-products" className="related-section">
          <h3>{selectedProduct.name}</h3>

          <div className="related-grid">
            {relatedProducts.length > 0 ? (
              relatedProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleRelatedProductClick(product)}
                >
                  <RelatedProductCard
                    product={product}
                    onAddToCart={onAddToCart}
                  />
                </div>
              ))
            ) : (
              <p>No related products</p>
            )}
          </div>
        </div>
      )}

      {/* ACTION */}
      <button onClick={() => onNavigate?.("shop")}>
        View All Products
      </button>

      {/* CAROUSEL */}
      <FeaturedDropsCarousel
        images={carouselImages}
        onNavigate={onNavigate}
      />
    </section>
  );
}