
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  colors: string[];
  isNew?: boolean;
}

const ProductCard = ({ id, name, price, image, colors, isNew }: ProductCardProps) => {
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: isWishlisted ? `${name} has been removed from your wishlist.` : `${name} has been added to your wishlist.`,
    });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
    });
  };

  return (
    <Link 
      to={`/product/${id}`}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[3/4] overflow-hidden bg-gray-100">
        <img 
          src={image} 
          alt={name} 
          className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
        
        {/* Quick Action Buttons */}
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-white bg-opacity-95 p-3 flex justify-between items-center 
          transition-transform duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}
        >
          <button 
            onClick={handleWishlist}
            className="p-2 hover:text-pink-600 transition-colors"
          >
            <Heart fill={isWishlisted ? "#FF0065" : "none"} color={isWishlisted ? "#FF0065" : "currentColor"} size={20} />
          </button>
          
          <button 
            onClick={handleAddToCart}
            className="flex-1 mx-2 bg-black hover:bg-gray-800 text-white text-sm py-2 px-4 flex items-center justify-center space-x-2 transition-colors"
          >
            <ShoppingCart size={16} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
      
      {isNew && (
        <div className="absolute top-3 left-3 bg-pink-600 text-white text-xs font-semibold px-2 py-1">
          NEW
        </div>
      )}
      
      <div className="mt-4 space-y-2">
        <h3 className="font-medium">{name}</h3>
        <p className="font-semibold">${price.toFixed(2)}</p>
        <div className="flex space-x-2">
          {colors.map((color) => (
            <div key={color} className="color-swatch" style={{ backgroundColor: color }}></div>
          ))}
        </div>
      </div>
    </Link>
  );
};

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Silk Evening Gown",
      price: 329.99,
      image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1704&q=80",
      colors: ["#000", "#DB7093", "#FFF"],
      isNew: true
    },
    {
      id: 2,
      name: "Classic Wool Blazer",
      price: 259.99,
      image: "https://images.unsplash.com/photo-1611485988300-b7ef6b1766fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      colors: ["#000", "#444", "#8B4513"]
    },
    {
      id: 3,
      name: "Cashmere Sweater",
      price: 189.99,
      image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      colors: ["#FFF", "#FFB6C1", "#ADD8E6", "#000"],
      isNew: true
    },
    {
      id: 4,
      name: "Tailored Wool Trousers",
      price: 159.99,
      image: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1704&q=80",
      colors: ["#000", "#333", "#778899"]
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold">Featured Products</h2>
          <Link to="/new-arrivals" className="text-pink-600 hover:text-pink-700 font-medium flex items-center">
            <span>View All</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              colors={product.colors}
              isNew={product.isNew}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
