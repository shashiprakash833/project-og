import React from "react";
import "./ImageBanner.css";

export default function ImageBanner({ onNavigate }) {
  return (
    <section id="image-banner-section" className="route-section">
      <div className="image-banner-container">

        <img
          src="/images/brand/og-banner.png"
          alt="OG Banner"
          className="image-banner"
        />

        <div className="image-banner-overlay">
          <button
            className="explore-collection-btn"
            onClick={() => onNavigate("collections")}
          >
            Explore Collections
          </button>
        </div>

      </div>
    </section>
  );
}