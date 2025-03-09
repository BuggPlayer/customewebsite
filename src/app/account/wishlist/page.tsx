'use client';

import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/products/ProductCard';
import Link from 'next/link';

export default function AccountWishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="container py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="section-title">My Wishlist</h1>
        
        {wishlist.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-textColor-muted mb-4">Your wishlist is empty.</p>
            <Link href="/products" className="btn-primary">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 