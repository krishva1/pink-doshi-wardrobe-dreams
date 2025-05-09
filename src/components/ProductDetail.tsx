
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, ShoppingCart, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/components/ui/use-toast';

type Size = 'XS' | 'S' | 'M' | 'L' | 'XL';

interface ProductDetailProps {
  id: number;
  name: string;
  price: number;
  description: string;
  details: string;
  colors: {name: string; value: string}[];
  sizes: Size[];
  images: string[];
  reviews: {
    id: number;
    user: string;
    rating: number;
    date: string;
    comment: string;
  }[];
}

// Mock product data
const productData: ProductDetailProps = {
  id: 1,
  name: "Silk Evening Gown",
  price: 329.99,
  description: "A stunning silk evening gown crafted with attention to detail. Perfect for formal events and special occasions. The flowing silhouette creates an elegant drape that moves gracefully with every step.",
  details: "Made from 100% pure silk\nHand-stitched embellishments\nConcealed zip fastening\nFully lined\nDry clean only\nImported",
  colors: [
    { name: "Black", value: "#000" },
    { name: "Rose Pink", value: "#DB7093" },
    { name: "White", value: "#FFF" }
  ],
  sizes: ["XS", "S", "M", "L", "XL"],
  images: [
    "https://images.unsplash.com/photo-1566174053879-31528523f8ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1704&q=80",
    "https://images.unsplash.com/photo-1603217040830-34473db521a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80",
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=783&q=80",
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80"
  ],
  reviews: [
    {
      id: 1,
      user: "Sophia Miller",
      rating: 5,
      date: "2025-04-15",
      comment: "The gown is absolutely stunning. The fabric quality is exceptional, and it fits perfectly. I received so many compliments at my event. Worth every penny!"
    },
    {
      id: 2,
      user: "Emma Johnson",
      rating: 4,
      date: "2025-03-28",
      comment: "Beautiful dress but runs slightly small. I'd recommend going up a size. The color is exactly as shown in the photos."
    }
  ]
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const product = productData; // In a real app, we would fetch based on ID

  const [selectedColor, setSelectedColor] = useState(product.colors[0].value);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "You must select a size before adding to cart.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: isWishlisted ? `${product.name} has been removed from your wishlist.` : `${product.name} has been added to your wishlist.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 overflow-hidden">
            <img 
              src={mainImage} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Image thumbnails */}
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button 
                key={index}
                onClick={() => setMainImage(image)}
                className={`aspect-square border-2 ${
                  image === mainImage ? 'border-pink-600' : 'border-transparent'
                } overflow-hidden`}
              >
                <img src={image} alt={`${product.name} view ${index+1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="font-playfair text-3xl md:text-4xl font-bold">{product.name}</h1>
          
          <div className="mt-4 flex items-center">
            <DollarSign size={20} className="text-gray-700" />
            <span className="text-2xl font-semibold">{product.price.toFixed(2)}</span>
          </div>
          
          <div className="mt-6">
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          {/* Color Selection */}
          <div className="mt-8">
            <h3 className="font-medium mb-2">Color: {product.colors.find(c => c.value === selectedColor)?.name}</h3>
            <div className="flex space-x-3">
              {product.colors.map((color) => (
                <button 
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className={`color-swatch w-8 h-8 ${
                    selectedColor === color.value ? 'ring-2 ring-offset-2 ring-pink-600' : ''
                  }`}
                  style={{ backgroundColor: color.value }}
                  aria-label={`Select ${color.name} color`}
                />
              ))}
            </div>
          </div>
          
          {/* Size Selection */}
          <div className="mt-8">
            <h3 className="font-medium mb-2">Size</h3>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                >
                  {size}
                </button>
              ))}
            </div>
            <a href="#" className="text-sm text-pink-600 hover:text-pink-700 mt-2 inline-block">Size Guide</a>
          </div>
          
          {/* Quantity */}
          <div className="mt-8">
            <h3 className="font-medium mb-2">Quantity</h3>
            <div className="flex border border-gray-300 w-32">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-10 flex items-center justify-center border-r border-gray-300"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                className="w-16 h-10 text-center focus:outline-none"
              />
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-10 flex items-center justify-center border-l border-gray-300"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Add to Cart / Wishlist */}
          <div className="mt-8 flex space-x-4">
            <Button 
              onClick={handleAddToCart}
              className="flex-grow bg-black hover:bg-gray-800 h-12 flex items-center justify-center space-x-2"
            >
              <ShoppingCart size={18} />
              <span>Add to Cart</span>
            </Button>
            
            <Button 
              onClick={handleWishlist} 
              variant="outline"
              className={`w-12 h-12 p-0 flex items-center justify-center 
                ${isWishlisted ? 'text-pink-600 border-pink-600' : 'border-gray-300'}`}
            >
              <Heart fill={isWishlisted ? "#FF0065" : "none"} />
            </Button>
          </div>
          
          {/* Product Information Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="details">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="mt-4">
                <div className="whitespace-pre-line">
                  {product.details}
                </div>
              </TabsContent>
              
              <TabsContent value="shipping" className="mt-4">
                <p>Free standard shipping on orders over $100.</p>
                <p className="mt-2">Estimated delivery time: 3-5 business days.</p>
                <p className="mt-2">Express shipping available at checkout.</p>
                <p className="mt-2">International shipping available to select countries.</p>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-4">
                <div className="space-y-6">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{review.user}</h4>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="currentColor"
                          >
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                          </svg>
                        ))}
                      </div>
                      <p className="mt-2 text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
