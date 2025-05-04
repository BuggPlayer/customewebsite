'use client'
import { useEffect } from "react";
import FeaturedProducts from '@/components/home/FeaturedProducts';
import BrandStory from '@/components/home/BrandStory';
import Testimonials from '@/components/home/Testimonials';
import NewsletterSignup from '@/components/home/NewsletterSignup';
import Image from 'next/image';
import Link from 'next/link';
import Hero from '@/components/home/Hero';
import { get_banners, get_products } from "../redux/features/homeSlice";
import { useDispatch, useSelector } from "react-redux";
import WhyNozePerfumes from "../components/home/WhyNozePerfumes";

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
  const dispatch = useDispatch();
  const { products, banners, latest_product, topRated_product, discount_product, loading, error } = useSelector(state => state.home);
  useEffect(() => {
    dispatch(get_banners());
    dispatch(get_products());
  }, [dispatch]);


  
// console.log("prrrr",products, banners, latest_product, topRated_product, discount_product, loading, error )
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
              {/* Our Signature Collection */}
              <WhyNozePerfumes />
            </h2>
            <FeaturedProducts products={products} />
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
                src="/assets/frontend_assets/collections/woman.jpg"
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
                src="/assets/frontend_assets/collections/men.jpg" 
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
                src="/assets/frontend_assets/collections/unisex.jpg" 
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
        {/* Values Section */}
        <section className="bg-background-secondary py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-light text-primary text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🌿",
                title: "Sustainability",
                description: "We are committed to sustainable practices in our production and packaging, ensuring our impact on the environment is minimal."
              },
              {
                icon: "✨",
                title: "Quality",
                description: "We source the finest ingredients and maintain the highest standards in our perfume creation process."
              },
              {
                icon: "🤝",
                title: "Integrity",
                description: "Transparency and honesty are at the core of everything we do, from sourcing to customer service."
              }
            ].map((value, index) => (
              <div key={index} className="bg-background p-8 rounded-lg shadow-sm border border-primary/10">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-medium mb-3">{value.title}</h3>
                <p className="text-textColor-secondary">{value.description}</p>
              </div>
            ))}
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