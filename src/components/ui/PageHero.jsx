import "./PageHero.css";

export default function PageHero({
  eyebrow,
  title,
  copy,
  image,
  actionLabel,
  onAction,
}) {
  return (
    <section className={`page-hero${image ? " has-image" : ""}`}>
      {image && (
        <>
          <div
            className="page-hero-bg"
            style={{ backgroundImage: `url(${image})` }}
            aria-hidden="true"
          />
          <div className="page-hero-overlay" aria-hidden="true" />
        </>
      )}

      <div className="page-hero-content">
        <p className="hero-eyebrow">{eyebrow}</p>

        <h1 className="hero-title">{title}</h1>

        <p className="hero-description">{copy}</p>

        {actionLabel && (
          <button
            className="hero-button"
            onClick={onAction}
          >
            {actionLabel}
          </button>
        )}
      </div>
    </section>
  );
}