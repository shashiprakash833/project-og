import React from "react";
import "./GenderCollections.css";
import FeaturedDropsCarousel from "./FeaturedDropsCarousel.jsx";


export default function GenderCollections({ onNavigate, onToast }) {
  const tiles = [
    {
      key: "men",
      title: "Men",
      image: "/images/collections/mens/men-section.png",
      copy: "Signature fits and bold outerwear.",
    },
    {
      key: "women",
      title: "Women",
      image: "/images/collections/womens/women-section.png",
      copy: "Everyday essentials with attitude.",
    },
  ];

  const handleNavigate = (tile) => {
    if (onToast) {
      onToast(`${tile.title} collection opened.`);
    }

    if (onNavigate) {
      onNavigate(`collections-${tile.key}`);
    }
  };


  const carouselImages = [
  { src: "/images/Carousel/couple_combo_banner.webp", alt: "Drop 1", caption: "New Arrivals" },
  { src: "/images/Carousel/mega_fashion_sale_banner.webp", alt: "Drop 2", caption: "Limited Run" },
  { src: "/images/Carousel/mega_sale_banner.webp", alt: "Drop 3", caption: "Street Essentials" },
];

  return (
    <>
      <section className="gender-collections">
        {tiles.map((tile) => (
          <button
            key={tile.key}
            type="button"
            className="gender-card highlight-cloth"
            onClick={() => handleNavigate(tile)}
          >
            <div
              className="gender-card-bg"
              style={{
                backgroundImage: `url(${tile.image})`,
              }}
              aria-hidden="true"
            />

            <img
              className="gender-card-focus"
              src={tile.image}
              alt={`${tile.title} Collection`}
              loading="lazy"
            />

            <div className="gender-copy">
              <span className="btn outline">Explore</span>
            </div>
          </button>
        ))}
      </section>

      <FeaturedDropsCarousel
        images={carouselImages}
        title="Featured Drops"
        onNavigate={onNavigate}
        shopPage="shop"
      />
      <section className="collection-banner-section">
        <div className="collection-banner-grid">
          <div className="collection-banner-card">
            <img
              src="/images/collections/mens/pageBannermen.png"
              alt="The OG Banner 1"
            />
          </div>

          <div className="collection-banner-card">
            <img
              src="/images/collections/womens/pageBannerwomen.png"
              alt="The OG Banner 2"
            />
          </div>
        </div>
      </section>
    </>
  );
}
