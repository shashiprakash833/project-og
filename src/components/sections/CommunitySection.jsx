
import React from "react";
import "./CommunitySection.css";

const galleryData = [
  { title: "Backprint", image: "/images/1st.jpg" },
  { title: "Concrete", image: "/images/2nd.jpg" },
  { title: "Cap Drop", image: "/images/3rd.jpg" },
  { title: "Alley Fit", image: "/images/4th.jpg" },
  { title: "Poster Wall", image: "/images/5th.jpg" },
];

export default function CommunitySection({ onToast }) {
  const goToBanner = () => {
    const bannerSection = document.getElementById("image-banner-section");

    if (bannerSection) {
      bannerSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="og-community">
      <div className="og-left">
        <p className="og-tag">OG COMMUNITY</p>

        <h2 className="og-title">#BEOG</h2>

        <span className="og-text">
          Real people. Real fits. Real OGs.
        </span>

        <button
          className="og-btn"
          onClick={() => onToast?.("Community gallery opened.")}
        >
          Join The Movement
        </button>
      </div>

      <div className="og-gallery">
        {galleryData.map((item) => (
          <div
            key={item.title}
            className="og-card og-card--clickable"
            onClick={goToBanner}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                goToBanner();
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`Open banner from ${item.title}`}
          >
            <img src={item.image} alt={item.title} />

            <div className="og-overlay">
              <small>{item.title}</small>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}