
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate email
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    // Success case
    toast({
      title: "Thanks for subscribing!",
      description: "You've been added to our newsletter list.",
    });
    setEmail('');
  };

  return (
    <section className="relative py-20 px-4">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" 
          alt="Fashion background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto relative z-10">
        <div className="max-w-xl mx-auto text-center text-white">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="mb-8">
            Subscribe to receive updates on new arrivals, special offers, and fashion insights
            directly to your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 flex-grow text-black focus:outline-none"
              required
            />
            <button 
              type="submit" 
              className="bg-pink-600 hover:bg-pink-700 transition-colors text-white px-6 py-3 font-medium"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-4 text-sm text-white/70">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
