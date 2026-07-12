import { useEffect, useRef, useState } from "react";
import "./FeaturedDropsCarousel.css";

const AUTO_ROTATE_MS = 3000;

export default function FeaturedDropsCarousel({
  images,
  title = "Featured Drops",
  onNavigate,
  shopPage = "shop",
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isPaused || images.length <= 1) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(timerRef.current);
  }, [isPaused, images.length]);

  const goPrev = () =>
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  const goNext = () =>
    setActiveIndex((current) => (current + 1) % images.length);

  const handleShopNow = () => {
    if (onNavigate) onNavigate(shopPage);
  };

  if (!images || images.length === 0) return null;

  const current = images[activeIndex];

  return (
    <section
      className="featured-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="featured-carousel-header">
        <h2>{title}</h2>
        <div className="featured-carousel-controls">
          <button aria-label="Previous" onClick={goPrev}>‹</button>
          <button aria-label="Next" onClick={goNext}>›</button>
        </div>
      </div>

      <div className="featured-carousel-stage">
        <img
          key={activeIndex}
          className="featured-carousel-image"
          src={current.src}
          alt={current.alt || title}
        />

        {current.caption && (
          <div className="featured-carousel-caption">{current.caption}</div>
        )}

        <button className="featured-carousel-shop-btn" onClick={handleShopNow}>
          Shop Now
        </button>
      </div>

      <div className="featured-carousel-dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}