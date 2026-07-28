import ProductCard from "../components/ui/ProductCard.jsx";

export default function CategoryPage({
  products = [],
  onAddToCart,
  onWishlist,
  wishlist = [],
  onNavigate,
  category,
  gender,
  cart = [],
  onRemoveFromCart,
}) {
  const formatCategoryTitle = (cat) => {
    if (!cat) return "";
    if (cat === "tees") return "Classic Tees";
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.gender.toLowerCase() === gender.toLowerCase() &&
      product.type.toLowerCase() === category.toLowerCase()
  );

  return (
    <>
      <section className="products-heading">
        <p className="products-tag">
          {gender === "women" ? "WOMEN'S" : "MEN'S"} · OG STREETWEAR
        </p>
        <h2>{formatCategoryTitle(category)}</h2>
        <p className="products-subtitle">
          Browse our premium {formatCategoryTitle(category).toLowerCase()} collection crafted for style and comfort.
        </p>
        <button
          className="btn outline category-back-btn"
          onClick={() =>
            onNavigate(
              gender === "women"
                ? "collections-women"
                : "collections-men"
            )
          }
        >
          ← Back to Categories
        </button>
      </section>

      <section className="route-section">
        {filteredProducts.length === 0 ? (
          <div className="empty-state">
            <h3>No products found in this category.</h3>
            <p>New pieces are dropping very soon.</p>
            <button
              onClick={() =>
                onNavigate(
                  gender === "women"
                    ? "collections-women"
                    : "collections-men"
                )
              }
            >
              Browse Other Categories
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
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
        )}
      </section>
    </>
  );
}
