import { menCategories, womenCategories } from "../../data/storeData.js";
import ProductCard from "../ui/ProductCard";
import { products } from "../../data/storeData";
import "./CollectionCategories.css";

export default function CollectionCategories({
  gender,
  onNavigate,
  cart,
  wishlist,
  onAddToCart,
  onRemoveFromCart,
  onWishlist,
}) {
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
              <ProductCard
                key={product.id}
                product={product}
                quantity={cart.filter((item) => item.id === product.id).length}
                isWishlisted={wishlist.some((item) => item.id === product.id)}
                onAddToCart={onAddToCart}
                onRemoveFromCart={onRemoveFromCart}
                onWishlist={onWishlist}
              />
            ))}
          </div>
        </section>
      </section>

      {/* <section className="products-heading">
        <p className="products-tag">OG STREETWEAR</p>
        <h2>{genderLabel} Collection</h2>
        <p className="products-subtitle">
          Shop by category and find your next favorite piece.
        </p>
      </section> */}
    </>
  );
}
