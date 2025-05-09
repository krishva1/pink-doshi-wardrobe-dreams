
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative h-[80vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-black">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
          alt="Pink fashion" 
          className="w-full h-full object-cover opacity-80"
        />
      </div>
      
      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-lg">
            <h2 className="text-5xl md:text-6xl font-playfair font-bold text-white mb-4">Luxury Redefined</h2>
            <p className="text-lg text-white/90 mb-8">
              Discover the new Summer 2025 collection by Krishva Doshi. 
              Elegance meets innovation in every piece.
            </p>
            <div className="flex space-x-4">
              <Button asChild className="bg-white text-black hover:bg-gray-100 px-8 py-6 rounded-none">
                <Link to="/new-arrivals">Explore Collection</Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 rounded-none">
                <Link to="/category/women">Shop Women</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
