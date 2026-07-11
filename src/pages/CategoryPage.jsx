import { useMemo } from "react";
import ProductCard from "../components/ui/ProductCard.jsx";

export default function CategoryPage({ products = [], onAddToCart, onWishlist, wishlist, onNavigate, category, gender = "men" }) {
  const filteredProducts = useMemo(() => {
    return products.filter(
      (p) => 
        p.type?.toLowerCase().trim() === category.toLowerCase().trim() && 
        p.gender?.toLowerCase().trim() === gender.toLowerCase()
    );
  }, [products, category, gender]);

  const genderTitle = gender === "men"? "MEN'S" : "WOMEN'S";
  const categoryTitle = category.toUpperCase();
  const bannerImg = filteredProducts[0]?.image || "https://picsum.photos/1200/600";

  const styles = {
    page: { background: "#000", color: "#fff", minHeight: "100vh", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
    hero: { width: "100%", height: "50vh", minHeight: "400px", background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${bannerImg}) center/cover`, display: "flex", alignItems: "center", padding: "0 60px" },
    heroEyebrow: { color: "#ff3c00", fontSize: "0.9rem", fontWeight: "700", letterSpacing: "0.15em" },
    heroTitle: { fontSize: "4rem", fontWeight: "900", margin: "12px 0", letterSpacing: "0.05em" },
    heroSubtitle: { fontSize: "1.1rem", color: "#ccc", margin: "0 0 24px" },
    backHomeBtn: { background: "#fff", color: "#000", border: "none", padding: "12px 28px", borderRadius: "30px", fontSize: "0.85rem", fontWeight: "700", letterSpacing: "0.05em", cursor: "pointer" },
    section: { padding: "60px 0", background: "#f5f5f5", color: "#000" },
    header: { textAlign: "center", marginBottom: "48px", padding: "0 40px" },
    eyebrow: { color: "#ff3c00", fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.15em" },
    title: { fontSize: "2.5rem", fontWeight: "900", margin: "12px 0", color: "#000" },
    subtitle: { color: "#666", fontSize: "1rem", margin: "0 0 24px" },
    backCatBtn: { background: "none", border: "none", color: "#000", fontSize: "0.85rem", fontWeight: "700", letterSpacing: "0.05em", cursor: "pointer" },
    grid: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gridAutoRows: "1fr", gap: "24px", padding: "0 60px" },
    noProducts: { textAlign: "center", color: "#666", padding: "60px 20px", fontSize: "1rem", gridColumn: "1 / -1" }
  };

  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <div>
          <span style={styles.heroEyebrow}>The OG</span>
          <h1 style={styles.heroTitle}>{categoryTitle}.</h1>
          <p style={styles.heroSubtitle}>Handpicked {category} for the {genderTitle.toLowerCase()} collection.</p>
          <button type="button" style={styles.backHomeBtn} onClick={() => onNavigate("home")}>
            BACK HOME
          </button>
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.header}>
          <span style={styles.eyebrow}>{genderTitle} • OG STREETWEAR</span>
          <h2 style={styles.title}>{categoryTitle}</h2>
          <p style={styles.subtitle}>Browse {category} picked for the {genderTitle.toLowerCase()} collection.</p>
          <button type="button" style={styles.backCatBtn} onClick={() => onNavigate("categories")}>
            ← BACK TO CATEGORIES
          </button>
        </div>

        <div style={styles.grid}>
          {filteredProducts.length > 0? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.some((item) => item.id === product.id)}
                onAddToCart={onAddToCart}
                onWishlist={onWishlist}
              />
            ))
          ) : (
            <p style={styles.noProducts}>No {category} products found for {genderTitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}