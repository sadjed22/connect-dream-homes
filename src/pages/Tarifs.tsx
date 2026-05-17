import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Pricing from "@/components/Pricing";

const Tarifs = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-24">
      <Pricing />
    </main>
    <Footer />
  </div>
);

export default Tarifs;
