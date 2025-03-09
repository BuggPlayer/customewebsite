"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import ProductCard from '@/components/products/ProductCard';
import { getFeaturedProducts } from '@/utils/productService';

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
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch featured products when component mounts
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await getFeaturedProducts();
        setFeaturedProducts(products);
      } catch (error) {
        console.error('Error loading featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background text-textColor-secondary font-primary">
      <Navbar />
      <Hero />
      
      {/* Featured Products Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <div className="w-20 h-[1px] bg-primary mb-8"></div>
            <h2 className="text-2xl md:text-4xl font-light tracking-wider text-primary mb-4">BESTSELLERS</h2>
            <p className="text-textColor-muted text-center max-w-2xl">
              Discover our most sought-after fragrances that have captivated perfume enthusiasts worldwide.
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          <div className="flex justify-center mt-12">
            <Link href="/products" className="border border-primary text-primary px-8 py-3 uppercase tracking-wider font-light hover:bg-primary hover:text-black transition-all duration-300">
              View All Products
            </Link>
          </div>
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
                src="/assets/frontend_assets/collections/women.jpg" 
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
      
      {/* Newsletter Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-light tracking-wider text-primary mb-6">JOIN OUR WORLD</h2>
            <p className="text-textColor-muted mb-8">
              Subscribe to receive exclusive offers, early access to new releases, and fragrance tips from our perfumers.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="input-primary flex-1"
              />
              <button
                type="submit"
                className="btn-primary"
              >
                Subscribe
              </button>
            </form>
            <p className="text-textColor-secondary/50 text-xs mt-6">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}