"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function FeaturedProducts({ products }) {
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [isHovered, setIsHovered] = useState(null);

  useEffect(() => {
    setIsLoading(!products || products.length === 0);
  }, [products]);

  const handleAddToCart = (product) => {
    addToCart(
      {
        productId: product._id,
        name: product.name,
        price: product.price,
        images: product.images,
        sellerId: product.sellerId,
        quantity: product.qty,
      },
      1,
      '50ml'
    );
  };

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 8);
  };

  const displayedProducts = products?.slice(0, visibleCount) || [];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16 relative">
        <h2 className="text-3xl md:text-5xl font-light tracking-wider text-primary mb-4 inline-block relative">
          Featured Products
          <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-24 h-[1px] bg-primary opacity-50"></span>
        </h2>
        <p className="text-textColor-muted max-w-2xl mx-auto mt-6 text-sm md:text-base">
          Discover our exclusive collection of premium products
        </p>
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {(isLoading ? Array(8).fill({}) : displayedProducts).map((product, index) => (
          <div
            key={product?._id || index}
            className="group bg-secondary-bg-color rounded-lg overflow-hidden transition-all duration-300 shadow-sm hover:shadow-lg border border-border-color-faded hover:border-primary flex flex-col h-full"
            onMouseEnter={() => setIsHovered(index)}
            onMouseLeave={() => setIsHovered(null)}
          >
            <div className="relative aspect-square overflow-hidden">
              {isLoading ? (
                <div className="animate-pulse bg-gray-200/10 h-full w-full" />
              ) : (
                <>
                  <Link href={`/products/${product._id}`} className="block h-full w-full">
                    <Image
                      src={product.images?.[0] || '/assets/frontend_assets/products/placeholdr.svg'}
                      alt={product.name}
                      fill
                      priority={index < 4}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </Link>

                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="bg-primary text-black text-xs font-medium px-3 py-1 rounded-full">
                        New
                      </span>
                    )}
                    {product.isBestseller && (
                      <span className="bg-green-600/90 text-white text-xs font-medium px-3 py-1 rounded-full">
                        Bestseller
                      </span>
                    )}
                  </div>

                  {/* <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product);
                    }}
                    className={`absolute bottom-3 right-3 bg-white text-black p-2.5 rounded-full shadow-lg transition-all duration-300 ${
                      isHovered === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    } hover:bg-primary hover:text-black`}
                    aria-label="Add to Cart"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </button> */}
                </>
              )}
            </div>

            <div className="p-5 flex flex-col flex-grow">
              {isLoading ? (
                <>
                  <div className="h-5 bg-gray-200/20 rounded w-3/4 mb-3 animate-pulse" />
                  <div className="h-4 bg-gray-200/20 rounded w-1/2 mb-4 animate-pulse" />
                  <div className="h-6 bg-gray-200/20 rounded w-1/3 animate-pulse mt-auto" />
                </>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-600'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-xs text-textColor-muted ml-1">({product.reviews || 0})</span>
                    </div>
                    <span className="text-lg font-semibold text-primary">₹{product.price}</span>
                  </div>

                  <Link href={`/products/${product._id}`} className="flex-grow">
                    <h3 className="text-lg font-medium text-textColor-secondary mb-2 line-clamp-2 hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-textColor-muted line-clamp-2 mb-4">
                      {product.description}
                    </p>
                  </Link>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product);
                    }}
                    className="mt-auto w-full py-2.5 px-4 bg-primary text-black font-medium rounded-md hover:bg-primary-dark transition-colors duration-300 text-sm"
                  >
                    Add to Cart
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {!isLoading && visibleCount < products.length && (
        <div className="text-center mt-16">
          <button
            onClick={handleShowMore}
            className="btn-outline px-8 py-3 border border-primary text-primary font-light uppercase tracking-wider hover:bg-primary hover:text-black transition-all duration-300"
          >
            Show More
          </button>
        </div>
      )}
    </section>
  );
}