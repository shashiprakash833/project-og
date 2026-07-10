import FeaturedDropsCarousel from "./FeaturedDropsCarousel.jsx";
import "./ProductsSection.css";

const carouselImages = [
  { src: "/images/Carousel/trendy_accessories_banner.webp", alt: "Drop 1", caption: "New Arrivals" },
  { src: "/images/Carousel/mega_sale_banner.webp", alt: "Drop 2", caption: "Limited Run" },
  { src: "/images/Carousel/mens_streetwear_banner.webp", alt: "Drop 3", caption: "Street Essentials" },
];

export default function ProductsSection({ onNavigate }) {
  return (
    <section className="products-section" id="shop">
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
        View All Products
      </button>
    </section>
  );
}