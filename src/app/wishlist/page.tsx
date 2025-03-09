'use client';

import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/products/ProductCard';

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-light mb-8">My Wishlist</h1>
      
      {wishlist.length === 0 ? (
        <p className="text-textColor-muted">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
} 