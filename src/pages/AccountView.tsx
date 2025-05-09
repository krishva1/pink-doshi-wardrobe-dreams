
import AccountPage from "@/components/AccountPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AccountView = () => {
  return (
    <div className="min-h-screen flex flex-col bg-pink-50/30">
      <Header />
      <main className="flex-grow">
        <div className="py-2 bg-gradient-to-r from-pink-500 to-pink-400 text-white text-center text-sm">
          Free shipping on all orders over $100
        </div>
        <AccountPage />
      </main>
      <Footer />
    </div>
  );
};

export default AccountView;
