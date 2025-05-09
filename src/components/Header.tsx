
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-3xl font-playfair font-bold tracking-tight text-pink-600">PINK</h1>
            <p className="text-xs tracking-widest text-gray-500 -mt-1">BY KRISHVA DOSHI</p>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/category/women" className="text-gray-800 hover:text-pink-600 transition-colors">Women</Link>
              <Link to="/category/men" className="text-gray-800 hover:text-pink-600 transition-colors">Men</Link>
              <Link to="/category/children" className="text-gray-800 hover:text-pink-600 transition-colors">Children</Link>
              <Link to="/category/elders" className="text-gray-800 hover:text-pink-600 transition-colors">Elders</Link>
              <Link to="/new-arrivals" className="text-gray-800 hover:text-pink-600 transition-colors">New Arrivals</Link>
            </nav>
          )}

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Link to="/wishlist" className="relative p-2">
              <Heart size={20} className="text-gray-700 hover:text-pink-600 transition-colors" />
              <span className="absolute -top-1 -right-1 bg-pink-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">2</span>
            </Link>
            
            <Link to="/cart" className="relative p-2">
              <ShoppingCart size={20} className="text-gray-700 hover:text-pink-600 transition-colors" />
              <span className="absolute -top-1 -right-1 bg-pink-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">3</span>
            </Link>
            
            <Link to="/account" className="p-2">
              <User size={20} className="text-gray-700 hover:text-pink-600 transition-colors" />
            </Link>

            {/* Mobile Menu Toggle */}
            {isMobile && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleMobileMenu}
                className="md:hidden"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"} />
                </svg>
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-fade-in">
            <nav className="flex flex-col space-y-3">
              <Link to="/category/women" className="text-gray-800 hover:text-pink-600 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Women</Link>
              <Link to="/category/men" className="text-gray-800 hover:text-pink-600 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Men</Link>
              <Link to="/category/children" className="text-gray-800 hover:text-pink-600 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Children</Link>
              <Link to="/category/elders" className="text-gray-800 hover:text-pink-600 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Elders</Link>
              <Link to="/new-arrivals" className="text-gray-800 hover:text-pink-600 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>New Arrivals</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
