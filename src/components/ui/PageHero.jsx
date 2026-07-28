import "./PageHero.css";

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
       <p className="eyebrow-hero">
                {eyebrow.split(" ").map((word, wordIndex) => (
                  <span className="word" key={wordIndex}>
                    {word.split("").map((char, charIndex) => (
                      <span
                        key={charIndex}
                        className="letter"
                        style={{
                          animationDelay: `${(wordIndex * 1 + charIndex) * 0.2}s`,
                        }}
                      >
                        {char}
                      </span>
                    ))}
                    <span>&nbsp;</span>
                  </span>
                ))}
              </p>
        <h1>{title}</h1>
        <span>{copy}</span>
        {actionLabel && <button onClick={onAction}>{actionLabel}</button>}
      </div>
    </section>
  );
}