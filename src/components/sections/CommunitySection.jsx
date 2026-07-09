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
  return (
    <section className="og-community">
      {/* LEFT SIDE */}
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

      {/* RIGHT SIDE */}
      <div className="og-gallery">
        {galleryData.map((item) => (
          <div
            key={item.title}
            className="og-card"
            onClick={() =>
              onToast?.(`${item.title} saved to moodboard.`)
            }
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