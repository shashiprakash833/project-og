import HeroSection from "../components/sections/HeroSection.jsx";
import PromiseStrip from "../components/sections/PromiseStrip.jsx";
import GenderCollections from "../components/sections/GenderCollections.jsx";
import ProductsSection from "../components/sections/ProductsSection.jsx";
import LookbookSection from "../components/sections/LookbookSection.jsx";
import CommunitySection from "../components/sections/CommunitySection.jsx";
import ImageBanner from "../components/layout/ImageBanner.jsx";
import NewsletterSection from "../components/sections/NewsletterSection.jsx";


export default function HomePage({ products, wishlist, onNavigate, onAddToCart, onWishlist, onToast }) {
  return (
    <>
      <HeroSection onNavigate={onNavigate} />
      <PromiseStrip />
      <ImageBanner onNavigate={onNavigate} />
      <ProductsSection
        products={products}
        wishlist={wishlist}
        onAddToCart={onAddToCart}
        onWishlist={onWishlist}
        onNavigate={onNavigate}
      />
      <LookbookSection products={products} onNavigate={onNavigate} />
      <CommunitySection onToast={onToast} />
      <NewsletterSection onToast={onToast} />
    </>
  );
}


