import "./HeroSection.css";

export default function HeroSection({ onNavigate }) {
  return (
    <section className="hero-section">
      <div className="hero-video-wrap" aria-hidden="true">
        <video autoPlay muted loop playsInline preload="auto">
          <source src="og2.MP4" type="video/mp4" />
          <source src="/og2.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
      </div>

      <div className="hero-content">
        <p className="scribble">This is OG.</p>
        <h1>
          Wear The <span>Culture.</span>
        </h1>
        <p>Rooted in the streets. Built for the real ones. Not for everyone.</p>
      </div>

      <aside className="drop-timer">
        <span>Limited Drop</span>
        <strong>02</strong>
        <small>Days</small>
        <strong>18</strong>
        <small>Hrs</small>
        <button onClick={() => onNavigate("drops")}>View Drop</button>
      </aside>
    </section>
  );
}
