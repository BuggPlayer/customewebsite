'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAddToCartMutation } from '@/redux/features/cartSlice';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    discountPrice?: number;
    discount?: number;
    images: string[];
    category: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { id, name, price, discountPrice, discount, images, category } = product;
  const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await addToCart({
        productId: id,
        quantity: 1,
        size: '50ml'
      }).unwrap();
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist(product);
    }
  };
  
  return (
    <div 
      className="group relative flex flex-col overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${id}`} className="block aspect-[3/4] relative w-full overflow-hidden">
        <div className="relative w-full h-full transform transition-transform duration-300 group-hover:scale-105">
          <Image 
            src={'/assets/frontend_assets/products/placeholdr.svg'}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center"
          />
          
          {/* Wishlist Button */}
          <button
            onClick={handleWishlistClick}
            className="absolute top-4 left-4 z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
          >
            <svg
              className={`w-5 h-5 ${isInWishlist(id) ? 'text-primary' : 'text-white'}`}
              fill={isInWishlist(id) ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
          
          {discount > 0 && (
            <div className="absolute top-4 right-4 bg-primary text-black px-2 py-1 text-xs font-medium">
              {discount}% OFF
            </div>
          )}
        </div>
      </Link>
      
      <div className="pt-4 flex-grow">
        <div className="text-xs uppercase text-textColor-muted mb-1">{category}</div>
        <Link href={`/products/${id}`} className="block">
          <h3 className="text-lg font-light text-textColor-secondary truncate hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>
        
        <div className="mt-2 flex items-center">
          {discount > 0 ? (
            <>
              <span className="text-primary font-medium">${discountPrice?.toFixed(2)}</span>
              <span className="ml-2 text-textColor-muted line-through text-sm">${price.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-primary font-medium">${price.toFixed(2)}</span>
          )}
        </div>
      </div>
      
      <button
        onClick={handleAddToCart}
        disabled={isAddingToCart}
        className="mt-3 w-full py-2 flex justify-center items-center bg-black/80 text-primary hover:bg-primary hover:text-black transition-colors"
      >
        {isAddingToCart ? (
          <svg className="w-5 h-5 text-current animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
          </svg>
        )}
      </button>
    </div>
  );
} 