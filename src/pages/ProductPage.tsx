
import ProductDetail from "@/components/ProductDetail";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProductPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <ProductDetail />
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
