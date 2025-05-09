
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
}

const CartPage = () => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Silk Evening Gown",
      price: 329.99,
      image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1704&q=80",
      color: "Rose Pink",
      size: "M",
      quantity: 1
    },
    {
      id: 2,
      name: "Classic Wool Blazer",
      price: 259.99,
      image: "https://images.unsplash.com/photo-1611485988300-b7ef6b1766fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      color: "Black",
      size: "L",
      quantity: 1
    },
    {
      id: 3,
      name: "Cashmere Sweater",
      price: 189.99,
      image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      color: "White",
      size: "S",
      quantity: 1
    }
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(
      cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    const itemName = cartItems.find(item => item.id === id)?.name;
    setCartItems(cartItems.filter(item => item.id !== id));
    
    toast({
      title: "Item removed",
      description: `${itemName} has been removed from your cart.`
    });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = subtotal > 100 ? 0 : 10;
  const total = subtotal + shippingCost;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-playfair text-3xl font-bold mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
          <Button asChild>
            <Link to="/">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {/* Cart Header - Desktop */}
            <div className="hidden md:grid grid-cols-12 gap-4 pb-2 border-b text-sm text-gray-500">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Subtotal</div>
            </div>

            {/* Cart Items */}
            <div className="space-y-6 mt-6">
              {cartItems.map((item) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 py-4 border-b">
                  {/* Product Image & Info */}
                  <div className="md:col-span-6 flex space-x-4">
                    <Link to={`/product/${item.id}`} className="w-20 h-24 bg-gray-100 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </Link>
                    <div>
                      <Link to={`/product/${item.id}`} className="font-medium hover:text-pink-600">
                        {item.name}
                      </Link>
                      <div className="text-sm text-gray-500 mt-1">Color: {item.color}</div>
                      <div className="text-sm text-gray-500">Size: {item.size}</div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-sm text-pink-600 hover:text-pink-700 mt-2 inline-flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Price - Mobile hidden, Desktop shown */}
                  <div className="hidden md:flex md:col-span-2 items-center justify-center">
                    ${item.price.toFixed(2)}
                  </div>

                  {/* Quantity */}
                  <div className="md:col-span-2 flex items-center md:justify-center">
                    <div className="flex border border-gray-300">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center border-r border-gray-300"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        min="1"
                        className="w-12 h-8 text-center focus:outline-none"
                      />
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center border-l border-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                    <span className="md:hidden">Price:</span>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6">
              <h2 className="font-playfair text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <Button className="w-full bg-black hover:bg-gray-800 h-12">
                Proceed to Checkout
              </Button>
              
              <div className="mt-4 text-center">
                <Link to="/" className="text-pink-600 hover:text-pink-700 inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
