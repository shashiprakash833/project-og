import "./ProductCard.css";

export default function ProductCard({ product, quantity = 0, isWishlisted, onAddToCart, onRemoveFromCart, onWishlist }) {
  return (
    <div className="product-card">
      <div className="product-img-wrap">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-img"
          loading="lazy" 
        />
        <button
          type="button"
          className={`wishlist-btn ${isWishlisted? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onWishlist(product);
          }}
          aria-label={isWishlisted? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted? "#fff" : "none"} stroke="currentColor">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 0 0 0 0-7.78z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        {product.color && <p className="product-color">{product.color}</p>}
        
        <div className="product-bottom">
          <span className="product-price">₹{product.price.toLocaleString("en-IN")}</span>
          <button
            type="button"
            className="add-cart-btn"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}