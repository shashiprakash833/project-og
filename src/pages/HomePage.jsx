import HeroSection from "../components/sections/HeroSection.jsx";
import PromiseStrip from "../components/sections/PromiseStrip.jsx";
import ProductsSection from "../components/sections/ProductsSection.jsx";
import LookbookSection from "../components/sections/LookbookSection.jsx";
import CommunitySection from "../components/sections/CommunitySection.jsx";
import NewsletterSection from "../components/sections/NewsletterSection.jsx";
import ImageBanner from "../components/layout/ImageBanner.jsx";

export default function HomePage({ theme, products, onNavigate, onToast }) {
  return (
    <>
      <HeroSection onNavigate={onNavigate} />
      <PromiseStrip />
      <ImageBanner onNavigate={onNavigate} />
      <ProductsSection
        theme={theme}
        products={products}
        onNavigate={onNavigate}
      />
      <LookbookSection products={products} onNavigate={onNavigate} />
      <CommunitySection onToast={onToast} />
      <NewsletterSection onToast={onToast} />
    </>
  );
}