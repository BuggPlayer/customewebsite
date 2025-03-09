"use client"
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { assets } from '@/utils/assetHelper';

// Mock related products - in a real app this would come from an API
const allProducts = [
  {
    id: "1",
    name: "Midnight Bloom",
    price: 129.99,
    image: assets.products.perfume1.main,
    category: "Floral"
  },
  {
    id: "2",
    name: "Ethereal Essence",
    price: 89.99,
    image: assets.products.perfume2.main,
    category: "Fresh"
  },
  {
    id: "3",
    name: "Ocean Dreams",
    price: 74.99,
    image: assets.products.perfume3.main,
    category: "Aquatic"
  },
  {
    id: "4",
    name: "Amber Nights",
    price: 119.99,
    image: assets.products.perfume4.main,
    category: "Oriental"
  }
];

const RelatedProducts = ({ currentProductId }) => {
  // Filter out the current product and show up to 4 related products
  const relatedProducts = allProducts
    .filter(product => product.id !== currentProductId)
    .slice(0, 3);
    
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {relatedProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default RelatedProducts; 