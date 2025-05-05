"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function FeaturedProducts({ products }) {
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8); // initially show 8

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
    setVisibleCount(products.length);
  };

  const displayedProducts = products?.slice(0, visibleCount) || [];

  return (
    <section className="py-10 px-4 md:px-6 lg:px-12 max-w-screen-xl mx-auto">
      <h2 className="text-2xl md:text-4xl font-light tracking-wider text-primary mb-10 text-center">
        Featured Products
      </h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {(isLoading ? Array(8).fill({}) : displayedProducts).map((product, index) => (
          <div
            key={product?._id || index}
            className="group bg-secondary-bg-color border border-border-color-faded hover:border-primary rounded-xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col"
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
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </Link>

                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="bg-primary text-black text-xs px-2.5 py-1 rounded-full shadow">
                        New
                      </span>
                    )}
                    {product.isBestseller && (
                      <span className="bg-green-600/90 text-white text-xs px-2.5 py-1 rounded-full">
                        Bestseller
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="absolute bottom-3 right-3 bg-white hover:bg-primary text-black hover:text-white p-2.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
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
                  </button>
                </>
              )}
            </div>

            <div className="p-4 flex flex-col flex-grow space-y-2">
              {isLoading ? (
                <>
                  <div className="h-4 bg-gray-200/20 rounded w-3/4 animate-pulse" />
                  <div className="h-3 bg-gray-200/20 rounded w-1/2 animate-pulse" />
                  <div className="h-8 bg-gray-200/20 rounded mt-4 animate-pulse" />
                </>
              ) : (
                <>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-1 text-sm text-yellow-400">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>
                        {product.rating}
                        {/* <span className="text-xs text-textColor-muted">({product.reviews|| "best in low price"})</span> */}
                      </span>
                    </div>
                    <span className="text-lg font-semibold text-primary">₹{product.price}</span>
                  </div>

                  <Link href={`/products/${product._id}`}>
                    <h3 className="text-base md:text-lg font-medium text-textColor line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-textColor-muted line-clamp-3">
                      {product.description}
                    </p>
                  </Link>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {!isLoading && visibleCount < products.length && (
        <div className="text-center mt-10">
          <button
            onClick={handleShowMore}
            className="btn-outline px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-black transition-all"
          >
            Show More
          </button>
        </div>
      )}
    </section>
  );
}
