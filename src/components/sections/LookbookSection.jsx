import { useEffect, useRef, useState } from "react";
import "./LookbookSection.css";

const slides = [
  {
    src: "/images/collections/mens/men-1.jpeg",
    label: "OG Signature",
    alt: "Bold streetwear for men",
    price: 1999,
  },
  {
    src: "/images/collections/womens/women-1.png",
    label: "OG Femme",
    alt: "Bold streetwear for women",
    price: 1799,
  },
  {
    src: "/images/collections/mens/men-3.jpeg",
    label: "Urban Motion",
    alt: "High-impact urban outfit",
    price: 1899,
  },
  {
    src: "/images/collections/mens/men-4.jpg",
    label: "Street Command",
    alt: "Masked streetwear icon",
    price: 2099,
  },
  {
    src: "/images/collections/womens/women-2.png",
    label: "Red Rebel",
    alt: "Red statement street style",
    price: 1699,
  },
  {
    src: "/images/collections/mens/hoodies.jpeg",
    label: "Hoodie Hype",
    alt: "OG hoodie outfit",
    price: 2299,
  },
];

export default function LookbookSection({ onNavigate }) {
  const [index, setIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
    <>
      <section ref={sectionRef} className="lookbook-section">

        {/* VIDEO */}
        <div className="lookbook-video">
          <video ref={videoRef} muted loop playsInline preload="auto">
            <source src="/videos/lookbook-duo.mp4" type="video/mp4" />
          </video>
          <div className="video-label">Bold Walk</div>
        </div>

        {/* TEXT */}
        <div className="lookbook-copy">
          <p>Lookbook 24</p>
          <h2>Made To Break <span>Rules.</span></h2>
          <span>This is not just fashion. It is rebellion, identity, and OG.</span>
          <button onClick={() => onNavigate("archive")}>
            Explore Lookbook
          </button>
        </div>

        {/* SLIDER */}
        <div className="slider-card">
          <div
            className="slider-image"
            onClick={() => setSelectedProduct(slide)}
          >
            <img src={slide.src} alt={slide.alt} />
          </div>

          <h3>{slide.label}</h3>

          <button
            className="slider-prev"
            onClick={() =>
              setIndex((index - 1 + slides.length) % slides.length)
            }
          >
            ‹
          </button>

          <button
            className="slider-next"
            onClick={() =>
              setIndex((index + 1) % slides.length)
            }
          >
            ›
          </button>
        </div>
      </section>

      {/* MODAL */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}