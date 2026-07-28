import ProductCard from "../ui/ProductCard";

{
  page === "collections-men" && (
    <>
      <section className="route-section category-section">
        <h2 className="category-title">Shop by Category</h2>

        <div className="category-grid">
          {menCategories.map((cat) => (
            <div
              key={cat.key}
              className="category-card category-card-visual"
              onClick={() =>
                onNavigate({
                  page: "category-products",
                  params: { gender: "men", key: cat.key, title: cat.title },
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
            </div>
          ))}
        </div>
      </section>
      <section className="products-heading">
        <p className="products-tag">OG STREETWEAR</p>
        <h2>Men's Collection</h2>
        <p className="products-subtitle">
          Explore premium fits designed for everyday confidence and street
          culture.
        </p>
      </section>

      <section className="route-section">
        <div className="collection-grid">
          {menCollections.map((item) => {
            const cartProduct = {
              id: ` men-${item.id}`,
              name: item.title,
              price: item.price || 1499,
              image: item.image,
              type: item.type || "men",
              color: item.color || "multi",
              gender: "men",
              tag: "OG",
            };
            const isWishlisted = wishlist.some((w) => w.id === cartProduct.id);

            return (
              <div key={item.id} className="collection-card highlight-cloth ">
                <div
                  className="collection-card-bg"
                  style={{ backgroundImage: `url(${item.image})` }}
                  aria-hidden="true"
                />
                <img
                  className="collection-card-focus"
                  src={item.image}
                  alt={item.title}
                />

                <div className="collection-card-hover">
                  <div className="product-details">
                    <p>
                      <strong>Price:</strong> ₹{cartProduct.price}
                    </p>
                    <p>
                      <strong>Color:</strong> {cartProduct.color}
                    </p>
                    <div className="product-actions">
                      <button
                        className="hover-wishlist"
                        onClick={() => onWishlist(cartProduct)}
                      >
                        {isWishlisted ? "★ Wishlisted" : "☆ Wishlist"}
                      </button>

                      <button onClick={() => onAddToCart(cartProduct)}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>

                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

{
  page === "collections-women" && (
    <>
      <section className="route-section category-section">
        <h2 className="category-title">Shop by Category</h2>

        <div className="category-grid">
          {womenCategories.map((cat) => (
            <button
              key={cat.key}
              className="category-card category-card-visual"
              onClick={() =>
                onNavigate({
                  page: "category-products",
                  params: {
                    gender: "women",
                    key: cat.key,
                    title: cat.title,
                  },
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
      </section>
      <section className="products-heading">
        <p className="products-tag">OG STREETWEAR</p>
        <h2>Women's Collection</h2>
        <p className="products-subtitle">
          Explore premium fits designed for everyday confidence and street
          culture.
        </p>
      </section>

      <section className="route-section collection-grid">
        {womenCollections.map((item) => {
          const cartProduct = {
            id: `women-${item.id}`,
            name: item.title,
            price: item.price || 1499,
            image: item.image,
            type: item.type || "women",
            color: item.color || "multi",
            gender: "women",
            tag: "OG",
          };
          const isWishlisted = wishlist.some((w) => w.id === cartProduct.id);

          return (
            <div key={item.id} className="collection-card highlight-cloth ">
              <div
                className="collection-card-bg"
                style={{ backgroundImage: `url(${item.image})` }}
                aria-hidden="true"
              />
              <img
                className="collection-card-focus"
                src={item.image}
                alt={item.title}
              />

              <div className="collection-card-hover">
                <div className="product-details">
                  <p>
                    <strong>Price:</strong> ₹{cartProduct.price}
                  </p>
                  <p>
                    <strong>Color:</strong> {cartProduct.color}
                  </p>
                  <div className="product-actions">
                    <button
                      className="hover-wishlist"
                      onClick={() => onWishlist(cartProduct)}
                    >
                      {isWishlisted ? "★ Wishlisted" : "☆ Wishlist"}
                    </button>

                    <button onClick={() => onAddToCart(cartProduct)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>

              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </div>
          );
        })}
      </section>
    </>
  );
}

{
  page === "category-products" && (
    <>
      <section className="products-heading">
        <p className="products-tag">
          {routeParams.gender === "women" ? "WOMEN'S" : "MEN'S"} · OG STREETWEAR
        </p>
        <h2>{routeParams.title || "Category"}</h2>
        <p className="products-subtitle">
          Browse {routeParams.title?.toLowerCase() || "this category"} picked
          for the {routeParams.gender === "women" ? "women's" : "men's"}{" "}
          collection.
        </p>
        <button
          className="btn outline category-back-btn"
          onClick={() =>
            onNavigate(
              routeParams.gender === "women"
                ? "collections-women"
                : "collections-men",
            )
          }
        >
          ← Back to Categories
        </button>
      </section>

      <section className="route-section">
        {(() => {
          console.log(products);
          console.log(routeParams);
          const categoryProducts = products.filter((product) => {
            return (
              product.gender.toLowerCase() ===
                routeParams.gender.toLowerCase() &&
              product.type.toLowerCase() === routeParams.key.toLowerCase()
            );
          });

          if (!categoryProducts.length) {
            return (
              <div className="empty-state">
                <h3>No {routeParams.title} products found.</h3>
                <p>New pieces for this category are dropping soon.</p>
                <button
                  onClick={() =>
                    onNavigate({
                      page: "shop",
                      params: { gender: routeParams.gender },
                    })
                  }
                >
                  Browse All{" "}
                  {routeParams.gender === "women" ? "Women's" : "Men's"}{" "}
                  Products
                </button>
              </div>
            );
          }

          return (
            <div className="product-grid">
              {categoryProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlist.some((item) => item.id === product.id)}
                  onAddToCart={onAddToCart}
                  onWishlist={onWishlist}
                />
              ))}
            </div>
          );
        })()}
      </section>
    </>
  );
}
