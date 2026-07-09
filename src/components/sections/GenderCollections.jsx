import React from "react";
import "./GenderCollections.css";

export default function GenderCollections({ onNavigate, onToast }) {
  const tiles = [
    {
      key: "men",
      title: "Men",
      image: "/images/menhero1.png",
      copy: "Signature fits and bold outerwear.",
    },
    {
      key: "women",
      title: "Women",
      image: "/images/women-hero1.png",
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

  return (
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
            <h3>{tile.title}</h3>
            <p>{tile.copy}</p>

            <span className="btn outline">Explore</span>
          </div>
        </button>
      ))}
    </section>
  );
}