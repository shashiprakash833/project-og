import { useEffect, useRef, useState } from "react";

const slides = [
  {
    src: "/images/collections/mens/men-1.jpeg",
    label: "OG Signature",
    alt: "Bold streetwear for men",
  },
  {
    src: "/images/collections/womens/women-1.png",
    label: "OG Femme",
    alt: "Bold streetwear for women",
  },
  {
    src: "/images/collections/mens/men-3.jpeg",
    label: "Urban Motion",
    alt: "High-impact urban outfit",
  },
  {
    src: "/images/collections/mens/men-4.jpg",
    label: "Street Command",
    alt: "Masked streetwear icon",
  },
  {
    src: "/images/collections/womens/women-2.png",
    label: "Red Rebel",
    alt: "Red statement street style",
  },
  {
    src: "/images/collections/mens/hoodies.jpeg",
    label: "Hoodie Hype",
    alt: "OG hoodie outfit",
  },
];

export default function LookbookSection({ onNavigate }) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.45 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="lookbook-section">
      <div className="lookbook-video">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="auto"
          poster={slides[0].src}
        >
          <source src="/videos/lookbook-duo.mp4" type="video/mp4" />
        </video>
        <div className="video-label">Bold Walk</div>
      </div>

      <div className="lookbook-copy">
        <p>Lookbook 24</p>
        <h2>
          Made To Break <span>Rules.</span>
        </h2>
        <span>This is not just fashion. It is rebellion, identity, and OG.</span>
        <button onClick={() => onNavigate("archive")}>Explore Lookbook</button>
      </div>

      <div className="slider-card">
        <div className="slider-image">
          <img src={slide.src} alt={slide.alt} />
        </div>
        <div className="slider-meta">
          <span>{slide.label}</span>
        </div>
        <h3>{slide.label}</h3>
        <button
          className="slider-prev"
          type="button"
          onClick={() => setIndex((index - 1 + slides.length) % slides.length)}
        >
          ‹
        </button>
        <button
          className="slider-next"
          type="button"
          onClick={() => setIndex((index + 1) % slides.length)}
        >
          ›
        </button>
      </div>
    </section>
  );
}
