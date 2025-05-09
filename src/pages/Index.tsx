
import Hero from "@/components/Hero";
import FeaturedCategories from "@/components/FeaturedCategories";
import FeaturedProducts from "@/components/FeaturedProducts";
import NewsletterSection from "@/components/NewsletterSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <FeaturedCategories />
        <FeaturedProducts />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
