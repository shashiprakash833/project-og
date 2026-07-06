import React from "react";

export default function GenderCollections({ onNavigate, onToast }) {
  const tiles = [
    {
      key: "men",
      title: "Men",
      image: "/images/collections/mens/men-hero@2x.jpg",
      copy: "Signature fits and bold outerwear.",
    },
    {
      key: "women",
      title: "Women",
      image: "/images/collections/womens/women-hero@2x.jpg",
      copy: "Everyday essentials with attitude.",
    },
  ];

  return (
    <section className="gender-collections">
      {tiles.map((t) => (
        <button
          key={t.key}
          className="gender-card highlight-cloth"
          onClick={() => {
            onToast(`${t.title} collection opened.`);
            onNavigate(`collections-${t.key}`);
          }}
        >
          <div className="gender-card-bg" style={{ backgroundImage: `url(${t.image})` }} aria-hidden="true" />
          <img className="gender-card-focus" src={t.image} alt={`${t.title} collection`} loading="lazy" />
          <div className="gender-copy">
            <h3>{t.title}</h3>
            <p>{t.copy}</p>
            <span className="btn outline">Explore</span>
          </div>
        </button>
      ))}
    </section>
  );
}
