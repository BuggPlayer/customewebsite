"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

// Placeholder featured products
const featuredProducts = [
  {
    id: 1,
    name: "Eros Eau de Parfum",
    description: "A powerful and sensual fragrance for men with notes of mint, apple and vanilla.",
    price: 1499,
    image: "/assets/frontend_assets/products/placeholdr.svg",
    rating: 4.8,
    reviews: 128,
    isNew: true,
    isBestseller: true
  },
  {
    id: 2,
    name: "Neroli Sunset",
    description: "Bright and luminous with notes of neroli, orange blossom and amber.",
    price: 999,
    image: "/assets/frontend_assets/products/placeholdr.svg",
    rating: 4.6,
    reviews: 95,
    isNew: false,
    isBestseller: true
  },
  {
    id: 3,
    name: "Amber Oud Perfume",
    description: "Rich and mysterious with notes of amber, oud and spices.",
    price: 1899,
    image: "/assets/frontend_assets/products/placeholdr.svg",
    rating: 4.9,
    reviews: 67,
    isNew: true,
    isBestseller: false
  },
  {
    id: 4,
    name: "Sandalwood Dreams",
    description: "Warm and comforting with notes of sandalwood, cedar and vanilla.",
    price: 1299,
    image: "/assets/frontend_assets/products/placeholdr.svg",
    rating: 4.7,
    reviews: 54,
    isNew: false,
    isBestseller: false
  }
];

export default function FeaturedProducts() {
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    }, 1, '50ml');
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {isLoading ? (
        // Loading skeletons
        Array(4).fill().map((_, i) => (
          <div key={i} className="animate-pulse bg-background-secondary rounded-lg p-4">
            <div className="bg-textColor-muted/20 w-full h-64 rounded-lg mb-4"></div>
            <div className="bg-textColor-muted/20 h-6 w-3/4 rounded mb-2"></div>
            <div className="bg-textColor-muted/20 h-4 w-1/2 rounded mb-4"></div>
            <div className="bg-textColor-muted/20 h-10 w-full rounded"></div>
          </div>
        ))
      ) : (
        // Actual products
        featuredProducts.map(product => (
          <div 
            key={product.id} 
            className="group bg-background border border-primary/5 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative">
              <Link href={`/products/${product.id}`} className="block relative h-64 overflow-hidden">
                <Image 
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="bg-primary text-white text-xs px-2 py-1 rounded">New</span>
                  )}
                  {product.isBestseller && (
                    <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded">Bestseller</span>
                  )}
                </div>
              </Link>
              
              {/* Quick add button */}
              <button 
                onClick={() => handleAddToCart(product)}
                className="absolute bottom-4 right-4 bg-white/90 hover:bg-primary text-primary hover:text-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label={`Quick add ${product.name} to cart`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </button>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-primary mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <span className="text-sm text-textColor-muted">{product.rating} <span className="text-xs">({product.reviews})</span></span>
                </div>
                <span className="text-primary font-medium">₹{product.price}</span>
              </div>
              
              <Link href={`/products/${product.id}`} className="block">
                <h3 className="text-lg font-medium hover:text-primary transition-colors">{product.name}</h3>
                <p className="text-sm text-textColor-muted line-clamp-2 mt-1">{product.description}</p>
              </Link>
              
              <button 
                onClick={() => handleAddToCart(product)}
                className="w-full btn-primary py-2 mt-4 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
} 