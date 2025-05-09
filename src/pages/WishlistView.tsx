
import WishlistPage from "@/components/WishlistPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const WishlistView = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <WishlistPage />
      </main>
      <Footer />
    </div>
  );
};

export default WishlistView;
