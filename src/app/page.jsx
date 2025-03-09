
import FeaturedProducts from '@/components/home/FeaturedProducts';
import BrandStory from '@/components/home/BrandStory';
import Testimonials from '@/components/home/Testimonials';
import NewsletterSignup from '@/components/home/NewsletterSignup';
import Image from 'next/image';
import Link from 'next/link';
import Hero from '@/components/home/Hero';
// Mock collections data
const collections = [
  {
    id: "women",
    name: "Women's Collection",
    image: "/assets/frontend_assets/collections/women.jpg",
    description: "Elegant, sophisticated fragrances crafted for the modern woman."
  },
  {
    id: "men",
    name: "Men's Collection",
    image: "/assets/frontend_assets/collections/men.jpg",
    description: "Bold, refined scents designed for the contemporary man."
  },
  {
    id: "unisex",
    name: "Unisex Fragrances",
    image: "/assets/frontend_assets/collections/unisex.jpg",
    description: "Versatile fragrances that transcend traditional boundaries."
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-textColor-secondary">
    
      
      <main>
        {/* Hero Slider */}
   
        {/* <HeroSlider /> */}
        <Hero />
        {/* Featured Products */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-light text-center text-primary mb-12">
              Our Signature Collection
            </h2>
            <FeaturedProducts />
          </div>
        </section>

          
      {/* Collect/ions Section */}
      <section className="py-16 md:py-24 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <div className="w-20 h-[1px] bg-primary mb-8"></div>
            <h2 className="text-2xl md:text-4xl font-light tracking-wider text-primary mb-4">COLLECTIONS</h2>
            <p className="text-textColor-muted text-center max-w-2xl">
              Explore our curated collections designed to match your personal style and occasions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="collection-card relative aspect-[3/4] group cursor-pointer overflow-hidden">
              <Image 
                src='/assets/frontend_assets/products/placeholdr.svg' 
                alt="Women's Collection"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-2xl font-light text-white mb-2">Women</h3>
                <div className="w-12 h-[1px] bg-primary mb-4"></div>
                <Link href="/products?category=women" className="text-white hover:text-primary transition-colors">
                  Shop Collection
                </Link>
              </div>
            </div>
            
            <div className="collection-card relative aspect-[3/4] group cursor-pointer overflow-hidden">
              <Image 
                src="/assets/frontend_assets/products/placeholdr.svg" 
                alt="Men's Collection"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-2xl font-light text-white mb-2">Men</h3>
                <div className="w-12 h-[1px] bg-primary mb-4"></div>
                <Link href="/products?category=men" className="text-white hover:text-primary transition-colors">
                  Shop Collection
                </Link>
              </div>
            </div>
            
            <div className="collection-card relative aspect-[3/4] group cursor-pointer overflow-hidden">
              <Image 
                src="/assets/frontend_assets/products/placeholdr.svg" 
                alt="Unisex Collection"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-2xl font-light text-white mb-2">Unisex</h3>
                <div className="w-12 h-[1px] bg-primary mb-4"></div>
                <Link href="/products?category=unisex" className="text-white hover:text-primary transition-colors">
                  Shop Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
        
        {/* Brand Story Section */}
        <BrandStory />
        
        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-background-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-light text-center text-primary mb-12">
              What Our Customers Say
            </h2>
            <Testimonials />
          </div>
        </section>
        
        {/* Newsletter Signup */}
        <NewsletterSignup />
      </main>
      
  
    </div>
  );
} 