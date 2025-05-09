
import CartPage from "@/components/CartPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CartView = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <CartPage />
      </main>
      <Footer />
    </div>
  );
};

export default CartView;
