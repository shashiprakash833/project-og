import { collections } from "../../data/storeData.js";
import "./CollectionsSection.css";

export default function CollectionsSection({ onNavigate, onToast }) {
  return (
    <section className="section-grid" id="collections">
      <div className="section-title">
        <p>Explore</p>
        <h2>Collections.</h2>
        <span>Discover pieces that speak louder than words.</span>
        <button onClick={() => onNavigate("collections")}>View All Collections</button>
      </div>

      <div className="collection-grid">
        {collections.map((item) => (
          <button
            key={item.id}
            className="collection-card"
            onClick={() => {
              onToast(`${item.title} collection selected.`);
              onNavigate("collections");
            }}
          >
            <img src={item.image} alt={item.title} />
            <span>0{item.id}</span>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
