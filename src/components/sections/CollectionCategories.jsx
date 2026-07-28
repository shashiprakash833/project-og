import { menCategories, womenCategories } from "../../data/storeData.js";
import ProductCard from "../ui/ProductCard";
import { products } from "../../data/storeData";
import "./CollectionCategories.css";

export default function CollectionCategories({ gender, onNavigate }) {
  const categories = gender === "women" ? womenCategories : menCategories;
  const genderLabel = gender === "women" ? "Women's" : "Men's";
  const randomProducts = products
    .filter((product) => product.gender === gender)
    .sort(() => Math.random() - 0.5)
    .slice(0, 12);

  return (
    <>
      <section className="route-section category-section">
        <h2 className="category-title">Shop by Category</h2>

        <div className="category-grid">
          {categories.map((cat) => (
            <button
              key={cat.key}
              className="category-card category-card-visual"
              onClick={() =>
                onNavigate({
                  page: "category-products",
                  params: { gender, key: cat.key, title: cat.title },
                })
              }
            >
              <div
                className="category-card-bg"
                style={{ backgroundImage: `url(${cat.image})` }}
                aria-hidden="true"
              />
              <img
                className="category-card-focus"
                src={cat.image}
                alt={cat.title}
              />
              <span className="category-card-label">{cat.title}</span>
            </button>
          ))}
        </div>

        <section className="featured-products">
          <p className="featured-tag">TRENDING NOW</p>

          <h2>
            {gender === "men"
              ? "Featured Men's Picks"
              : "Featured Women's Picks"}
          </h2>

          <div className="product-grid">
            {randomProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </section>

    </>
  );
}