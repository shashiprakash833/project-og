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

<<<<<<< HEAD
// IMAGE ONLY CARD
=======
// Top row - IMAGE ONLY
>>>>>>> 79f246da11b4f8546aa2337f0ae1e57805705185
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
  theme,
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

<<<<<<< HEAD
=======
  const normalize = (val) => (val ?? "").toString().trim().toLowerCase();

>>>>>>> 79f246da11b4f8546aa2337f0ae1e57805705185
  const filteredProducts = useMemo(() => {
    if (filter === "all") {
      const men = uniqueProducts
        .filter((p) => normalize(p.gender) === "men")
        .slice(0, 5);
<<<<<<< HEAD

      const women = uniqueProducts
        .filter((p) => normalize(p.gender) === "women")
        .slice(0, 5);

=======
      const women = uniqueProducts
        .filter((p) => normalize(p.gender) === "women")
        .slice(0, 5);
>>>>>>> 79f246da11b4f8546aa2337f0ae1e57805705185
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
<<<<<<< HEAD
    <section className="products-section" id="shop">

      {/* TITLE */}
=======
      <section
  className={`products-section ${theme === "dark" ? "dark" : ""}`}
  id="shop"
>
>>>>>>> 79f246da11b4f8546aa2337f0ae1e57805705185
      <div className="section-title premium">
        <span className="eyebrow">THE OG</span>
        <h2 className="drops-title">SIGNATURE</h2>
        <p className="subtitle">
<<<<<<< HEAD
          Handpicked heat • Limited quantity • Infinite style
=======
           Handpicked heat<span> | </span>Limited quantity<span> | </span>
          MANY    style
>>>>>>> 79f246da11b4f8546aa2337f0ae1e57805705185
        </p>
        <div className="title-line"></div>
      </div>

      {/* FILTERS */}
      <div className="filters">
        {filters.map((item) => (
          <button
            key={item}
<<<<<<< HEAD
=======
            type="button"
>>>>>>> 79f246da11b4f8546aa2337f0ae1e57805705185
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

<<<<<<< HEAD
      {/* PRODUCTS */}
      {filteredProducts.length > 0 ? (
        <div className="carousel-wrap">
          <button onClick={() => scrollByAmount(scrollRef, -320)}>‹</button>
=======
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
>>>>>>> 79f246da11b4f8546aa2337f0ae1e57805705185

          <div className="product-row-scroll" ref={scrollRef}>
            {filteredProducts.map((product) => (
              <div
<<<<<<< HEAD
=======
                className={`product-cell ${
                  selectedProduct?.id === product.id ? "is-selected" : ""
                }`}
>>>>>>> 79f246da11b4f8546aa2337f0ae1e57805705185
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

<<<<<<< HEAD
      {/* ACTION */}
      <button onClick={() => onNavigate?.("shop")}>
        View All Products
      </button>

      {/* CAROUSEL */}
      <FeaturedDropsCarousel
        images={carouselImages}
        onNavigate={onNavigate}
      />
=======
      <div className="products-actions">
        <button
          type="button"
          className="text-link big-action-btn"
          onClick={() => onNavigate && onNavigate("shop")}
        >
          View All Products ➜
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
          onClick={() => onNavigate("collections")}
        >
          <span>Explore Collection</span>
        </button> 
      </div>
      {/* <div className="section-title compact">
        <p>Featured</p>
        <h2>Drops.</h2>
        <span>Handpicked heat. Limited quantity. Infinite style.</span>
      </div> */}

      <FeaturedDropsCarousel
        images={carouselImages}
        title=""
        onNavigate={onNavigate}
        shopPage="shop"
      />

      <button className="text-link" onClick={() => onNavigate("shop")}>
        View All Products ➜
      </button>
>>>>>>> 79f246da11b4f8546aa2337f0ae1e57805705185
    </section>
  );
}