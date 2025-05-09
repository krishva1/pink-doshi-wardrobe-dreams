
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  title: string;
  image: string;
  link: string;
}

const CategoryCard = ({ title, image, link }: CategoryCardProps) => (
  <Link to={link} className="group relative overflow-hidden">
    <div className="aspect-[3/4] overflow-hidden bg-gray-100">
      <img 
        src={image} 
        alt={title} 
        className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
      />
    </div>
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 transition-opacity group-hover:bg-opacity-30">
      <span className="bg-white px-6 py-3 font-playfair text-xl font-semibold">{title}</span>
    </div>
  </Link>
);

const FeaturedCategories = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-center font-playfair text-3xl md:text-4xl font-bold mb-12">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <CategoryCard 
            title="Women" 
            image="https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
            link="/category/women"
          />
          <CategoryCard 
            title="Men" 
            image="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
            link="/category/men"
          />
          <CategoryCard 
            title="Children" 
            image="https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=772&q=80" 
            link="/category/children"
          />
          <CategoryCard 
            title="Elders" 
            image="https://images.unsplash.com/photo-1581042232414-7ad336cae9a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
            link="/category/elders"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
