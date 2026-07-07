export default function ProductCard({ product, isWishlisted, onAddToCart, onWishlist }) {
  return (
    <article className="product-card">
      <button className="wishlist-btn" onClick={() => onWishlist(product)} aria-label={`Wishlist ${product.name}`}>
        {isWishlisted ? "★" : "☆"}
      </button>

      <div className={`product-art ${product.color}`}>
        {product.image ? (
          <> 
            <div className="product-art-bg" style={{ backgroundImage: `url(${product.image})` }} aria-hidden="true" />
            <img className="product-art-focus" src={product.image} alt={product.name} loading="lazy" />
          </>
        ) : (
          <span>{product.tag}</span>
        )}
        {!product.image && <span>{product.tag}</span>}
      </div>

      <div className="product-hover">
        <p className="product-tag">{product.tag}</p>
        <h3>{product.name}</h3>
        <p className="product-meta">{product.type} · {product.color}</p>
        <p className="product-price">Rs {product.price.toLocaleString("en-IN")}</p>
        <div className="product-actions">
          <button className="hover-wishlist" onClick={() => onWishlist(product)}>
            {isWishlisted ? "★ Wishlist" : "☆ Wishlist"}
          </button>
          <button onClick={() => onAddToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>

      <div className="product-info">
        <div>
          <h3>{product.name}</h3>
          <p>Rs {product.price.toLocaleString("en-IN")}</p>
        </div>
        <button onClick={() => onAddToCart(product)} aria-label={`Add ${product.name} to cart`}>
          +
        </button>
      </div>
    </article>
  );
}
