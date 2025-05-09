
import AccountPage from "@/components/AccountPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AccountView = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <AccountPage />
      </main>
      <Footer />
    </div>
  );
};

export default AccountView;
