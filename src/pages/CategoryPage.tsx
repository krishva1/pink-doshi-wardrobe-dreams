
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  colors: string[];
  isNew?: boolean;
}

interface CategoryMap {
  [key: string]: {
    title: string;
    subtitle: string;
    products: Product[];
  }
}

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { toast } = useToast();
  const [isWishlisted, setIsWishlisted] = useState<{[key: number]: boolean}>({});

  // Category data mapping
  const categoryData: CategoryMap = {
    'women': {
      title: "Women's Collection",
      subtitle: "Elegance and sophistication for the modern woman",
      products: [
        {
          id: 1,
          name: "Silk Evening Gown",
          price: 329.99,
          image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1704&q=80",
          colors: ["#000", "#DB7093", "#FFF"],
          isNew: true
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
          id: 5,
          name: "Designer Handbag",
          price: 459.99,
          image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80",
          colors: ["#000", "#8B4513", "#F5F5DC"]
        },
        {
          id: 7,
          name: "Leather Ankle Boots",
          price: 249.99,
          image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
          colors: ["#000", "#8B4513"]
        },
        {
          id: 9,
          name: "Silk Blouse",
          price: 149.99,
          image: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
          colors: ["#FFF", "#FFB6C1", "#000", "#D3D3D3"]
        },
        {
          id: 11,
          name: "Designer Sunglasses",
          price: 199.99,
          image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
          colors: ["#000", "#8B4513"]
        }
      ]
    },
    'men': {
      title: "Men's Collection",
      subtitle: "Sophistication meets modern design for the discerning gentleman",
      products: [
        {
          id: 2,
          name: "Classic Wool Blazer",
          price: 259.99,
          image: "https://images.unsplash.com/photo-1611485988300-b7ef6b1766fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
          colors: ["#000", "#444", "#8B4513"]
        },
        {
          id: 4,
          name: "Tailored Wool Trousers",
          price: 159.99,
          image: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1704&q=80",
          colors: ["#000", "#333", "#778899"]
        },
        {
          id: 6,
          name: "Leather Oxford Shoes",
          price: 279.99,
          image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          colors: ["#000", "#8B4513"],
          isNew: true
        },
        {
          id: 8,
          name: "Premium Cotton Shirt",
          price: 119.99,
          image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80",
          colors: ["#FFF", "#87CEEB", "#F5F5DC", "#000"],
          isNew: true
        },
        {
          id: 10,
          name: "Designer Belt",
          price: 89.99,
          image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          colors: ["#000", "#8B4513"]
        },
        {
          id: 12,
          name: "Cashmere Scarf",
          price: 129.99,
          image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
          colors: ["#000", "#708090", "#8B4513", "#F5F5DC"]
        }
      ]
    },
    'children': {
      title: "Children's Collection",
      subtitle: "Comfortable and stylish clothing for the little ones",
      products: [
        {
          id: 13,
          name: "Cotton Dress",
          price: 79.99,
          image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=772&q=80",
          colors: ["#FFB6C1", "#87CEEB", "#FFF"],
          isNew: true
        },
        {
          id: 14,
          name: "Denim Overalls",
          price: 89.99,
          image: "https://images.unsplash.com/photo-1519238360766-fdd7f3a71b67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
          colors: ["#000080"]
        },
        {
          id: 15,
          name: "Knit Sweater",
          price: 69.99,
          image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
          colors: ["#87CEEB", "#FFB6C1", "#FFFFFF"]
        },
        {
          id: 16,
          name: "Canvas Sneakers",
          price: 59.99,
          image: "https://images.unsplash.com/photo-1581101767113-7b6939e73591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
          colors: ["#FFF", "#87CEEB", "#FFB6C1"],
          isNew: true
        }
      ]
    },
    'elders': {
      title: "Elders' Collection",
      subtitle: "Elegant and comfortable designs for distinguished tastes",
      products: [
        {
          id: 17,
          name: "Cashmere Cardigan",
          price: 159.99,
          image: "https://images.unsplash.com/photo-1581042232414-7ad336cae9a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
          colors: ["#000", "#8B4513", "#F5F5DC", "#708090"]
        },
        {
          id: 18,
          name: "Merino Wool Scarf",
          price: 89.99,
          image: "https://images.unsplash.com/photo-1549575810-b9b7abc51d9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
          colors: ["#708090", "#F5F5DC", "#000"]
        },
        {
          id: 19,
          name: "Classic Leather Loafers",
          price: 199.99,
          image: "https://images.unsplash.com/photo-1609010697446-11f2155278f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
          colors: ["#000", "#8B4513"],
          isNew: true
        },
        {
          id: 20,
          name: "Silk Tie",
          price: 79.99,
          image: "https://images.unsplash.com/photo-1598879445610-bebc4a232062?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
          colors: ["#000080", "#800000", "#2F4F4F"]
        }
      ]
    }
  };

  // Get current category data or fallback to women
  const currentCategory = categoryData[categoryId || ''] || categoryData.women;
  
  const toggleWishlist = (id: number) => {
    const newWishlist = { ...isWishlisted };
    newWishlist[id] = !newWishlist[id];
    setIsWishlisted(newWishlist);
    
    toast({
      title: newWishlist[id] ? "Added to wishlist" : "Removed from wishlist",
      description: `Product has been ${newWishlist[id] ? "added to" : "removed from"} your wishlist.`
    });
  };
  
  const addToCart = (id: number, name: string) => {
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`
    });
  };
  
  // Ensure URL changes reflect in the UI
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="font-playfair text-4xl font-bold mb-2">{currentCategory.title}</h1>
            <p className="text-lg text-gray-600">{currentCategory.subtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentCategory.products.map((product) => (
              <div key={product.id} className="group relative">
                <Link to={`/product/${product.id}`} className="block">
                  <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    />
                  </div>
                  
                  {product.isNew && (
                    <div className="absolute top-2 left-2 bg-pink-600 text-white text-xs font-semibold px-2 py-1">
                      NEW
                    </div>
                  )}
                  
                  <div className="mt-4 space-y-2">
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="font-semibold">${product.price.toFixed(2)}</p>
                    <div className="flex space-x-2">
                      {product.colors.map((color) => (
                        <div key={color} className="color-swatch" style={{ backgroundColor: color }}></div>
                      ))}
                    </div>
                  </div>
                </Link>
                
                {/* Quick Actions */}
                <div className="absolute bottom-[72px] left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex justify-between bg-white bg-opacity-95 p-3">
                    <button 
                      onClick={() => toggleWishlist(product.id)}
                      className="p-2 hover:text-pink-600 transition-colors"
                      aria-label="Add to wishlist"
                    >
                      <Heart fill={isWishlisted[product.id] ? "#FF0065" : "none"} color={isWishlisted[product.id] ? "#FF0065" : "currentColor"} size={20} />
                    </button>
                    
                    <button 
                      onClick={() => addToCart(product.id, product.name)}
                      className="flex-1 mx-2 bg-black hover:bg-gray-800 text-white text-sm py-2 px-4 flex items-center justify-center space-x-2 transition-colors"
                    >
                      <ShoppingCart size={16} />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
