"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function FeaturedProducts({ products }) {
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading data
  useEffect(() => {
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
      image: product.image,
    }, 1, '50ml');
  };

  return (
    <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-4 gap-4 p-4">
      {isLoading ? (
        // Loading skeletons
        Array(4).fill().map((_, i) => (
          <div key={i} className="animate-pulse bg-background-secondary rounded-xl p-4 space-y-4">
            <div className="bg-gray-200/20 aspect-square rounded-xl"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200/20 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200/20 rounded w-1/2"></div>
              <div className="h-8 bg-gray-200/20 rounded mt-4"></div>
            </div>
          </div>
        ))
      ) : (
        // Actual products
        products.map((product, index) => (
          <div
            key={product.id}
            className="group bg-background border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
          >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden">
              <Link
                href={`/products/${product._id}`}
                className="block w-full h-full"
              >
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 300px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={index < 4} // Prioritize above-the-fold images
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="bg-primary text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
                      New Arrival
                    </span>
                  )}
                  {product.isBestseller && (
                    <span className="bg-green-500/90 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
                      Bestseller
                    </span>
                  )}
                </div>
              </Link>

              {/* Quick Add Button */}
              <button
                onClick={() => handleAddToCart(product)}
                className="absolute bottom-3 right-3 bg-white/90 hover:bg-primary text-gray-700 hover:text-white p-2.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110 backdrop-blur-sm"
                aria-label={`Add ${product.name} to cart`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </button>
            </div>

            {/* Product Info */}
            <div className="p-4 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-1">
                  <svg
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm text-gray-600">
                    {product.rating} <span className="text-xs">({product.reviews})</span>
                  </span>
                </div>
                <span className="text-lg font-bold text-primary">₹{product.price}</span>
              </div>

              <Link
                href={`/products/${product.id}`}
                className="group block flex-grow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-3 mb-4">
                  {product.description}
                </p>
              </Link>

              <button
                onClick={() => handleAddToCart(product)}
                className="mt-auto w-full bg-primary hover:bg-primary-dark text-white py-3 px-4 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}