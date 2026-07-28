import React from 'react';
import "./ImageBanner.css";

export default function ImageBanner({ onNavigate }) {
  return (
    <section className="route-section">
      <div className="image-banner-container">
        <img src="/images/brand/og-banner.png" alt="OG Street Wear Banner" />
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