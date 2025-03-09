"use client"
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { fetchProducts } from '@/utils/productService';

const ProductCard = ({ product }) => {
  const { id, name, price, discountPrice, discount, images, category } = product;
  const { addToCart } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    setIsAddingToCart(true);
    
    // Add a default size for the quick add
    addToCart({
      ...product,
      size: '50ml',
      quantity: 1
    });
    
    // Reset button state after a short delay
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };
  
  return (
    <div 
      className="group relative flex flex-col overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${id}`} className="block aspect-square overflow-hidden">
        <div className="relative w-full h-full transform transition-transform duration-500 group-hover:scale-105">
          <Image 
            src={images[0] || '/assets/frontend_assets/products/placeholder.jpg'} 
            alt={name}
            fill
            unoptimized={images[0]?.startsWith('http')}
            className="object-cover"
          />
          
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
              <span className="text-primary font-medium">${discountPrice.toFixed(2)}</span>
              <span className="ml-2 text-textColor-muted line-through text-sm">${price.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-primary font-medium">${price.toFixed(2)}</span>
          )}
        </div>
      </div>
      
      <button
        onClick={handleAddToCart}
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
      <div className="h-[1px] w-0 bg-primary absolute bottom-0 left-1/2 -translate-x-1/2 group-hover:w-full transition-all duration-500"></div>
    </div>
  );
};

export default ProductCard; 