export default function PageHero({ eyebrow, title, copy, image, actionLabel, onAction }) {
  return (
    <section className={`page-hero${image ? " has-image" : ""}`}>
      {image && (
        <>
          <div className="page-hero-bg" style={{ backgroundImage: `url(${image})` }} aria-hidden="true" />
          <div className="page-hero-overlay" aria-hidden="true" />
        </>
      )}
      <div className="page-hero-content">
        <p>{eyebrow}</p>
        <h1>{title}</h1>
        <span>{copy}</span>
        {actionLabel && <button onClick={onAction}>{actionLabel}</button>}
      </div>
    </section>
  );
}