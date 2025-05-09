
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
}

const WishlistPage = () => {
  const { toast } = useToast();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: 1,
      name: "Silk Evening Gown",
      price: 329.99,
      image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1704&q=80",
      inStock: true
    },
    {
      id: 4,
      name: "Tailored Wool Trousers",
      price: 159.99,
      image: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1704&q=80",
      inStock: true
    }
  ]);

  const removeItem = (id: number) => {
    const itemName = wishlistItems.find(item => item.id === id)?.name;
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
    
    toast({
      title: "Item removed",
      description: `${itemName} has been removed from your wishlist.`
    });
  };

  const addToCart = (id: number) => {
    const item = wishlistItems.find(item => item.id === id);
    
    if (item) {
      toast({
        title: "Added to cart",
        description: `${item.name} has been added to your cart.`
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-playfair text-3xl font-bold mb-8">My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-medium mb-4">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">Discover something you'll love from our curated collections.</p>
          <Button asChild>
            <Link to="/">Explore Products</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="border p-4 group relative">
              {/* Product Image */}
              <Link to={`/product/${item.id}`} className="block aspect-[3/4] overflow-hidden bg-gray-100">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
              
              {/* Remove Button */}
              <button 
                onClick={() => removeItem(item.id)}
                className="absolute top-6 right-6 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label={`Remove ${item.name} from wishlist`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Product Info */}
              <div className="mt-4">
                <Link to={`/product/${item.id}`} className="block font-medium hover:text-pink-600">
                  {item.name}
                </Link>
                <p className="mt-1 font-semibold">${item.price.toFixed(2)}</p>
                <p className={`text-sm mt-1 ${item.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {item.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
                
                <Button 
                  onClick={() => addToCart(item.id)}
                  disabled={!item.inStock}
                  className="w-full mt-4 bg-black hover:bg-gray-800 flex items-center justify-center space-x-2"
                >
                  <ShoppingCart size={16} />
                  <span>Add to Cart</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
