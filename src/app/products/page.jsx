"use client"
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { fetchProducts } from '@/utils/productService';

// This is a client-only component that handles search params
function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: categoryParam || 'all',
    priceRange: 'all',
    sortBy: 'featured'
  });
  
  // Common scent categories found in the products
  const scentCategories = [
    'Floral', 'Woody', 'Fresh', 'Spicy', 'Sweet', 'Citrus', 'Fruity', 'Aromatic'
  ];

  // Price ranges
  const priceRanges = {
    'all': { min: 0, max: Infinity },
    'under-500': { min: 0, max: 500 },
    '500-1000': { min: 500, max: 1000 },
    '1000-plus': { min: 1000, max: Infinity }
  };

  // Fetch products on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Apply filters when products or filters change
  useEffect(() => {
    if (products.length === 0) return;

    // Filter products based on current filters
    let result = [...products];
    
    // Filter by category
    if (filters.category !== 'all') {
      // Try to match by category or by product description containing category term
      result = result.filter(product => 
        product.category.toLowerCase().includes(filters.category.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.category.toLowerCase())
      );
    }
    
    // Filter by price range
    const { min, max } = priceRanges[filters.priceRange];
    result = result.filter(product => {
      const price = product.discountPrice || product.price;
      return price >= min && price <= max;
    });

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case 'price-high':
        result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      case 'newest':
        // Assuming product IDs are somewhat chronological (newest have higher IDs)
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
      default: // 'featured' and default
        // No specific sort, keep default
        break;
    }

    setFilteredProducts(result);
  }, [products, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="container mx-auto px-4">
      <div className="py-8">
        <h1 className="text-2xl md:text-3xl font-light text-center text-primary mb-8">
          Our Collection
        </h1>
        
        {/* Product Filtering and Sorting Controls */}
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="w-full md:w-1/4">
            <div className="sticky top-24">
              <h3 className="text-xl font-light text-primary mb-6">Filters</h3>
              
              {/* Categories */}
              <div className="mb-8">
                <h4 className="font-medium mb-4">Categories</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="category-all"
                      name="category"
                      className="mr-2"
                      checked={filters.category === 'all'}
                      onChange={() => handleFilterChange('category', 'all')}
                    />
                    <label htmlFor="category-all">All Perfumes</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="category-men"
                      name="category"
                      className="mr-2"
                      checked={filters.category === 'men'}
                      onChange={() => handleFilterChange('category', 'men')}
                    />
                    <label htmlFor="category-men">Men</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="category-women"
                      name="category"
                      className="mr-2"
                      checked={filters.category === 'women'}
                      onChange={() => handleFilterChange('category', 'women')}
                    />
                    <label htmlFor="category-women">Women</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="category-unisex"
                      name="category"
                      className="mr-2"
                      checked={filters.category === 'unisex'}
                      onChange={() => handleFilterChange('category', 'unisex')}
                    />
                    <label htmlFor="category-unisex">Unisex</label>
                  </div>
                </div>
              </div>
              
              {/* Price Range */}
              <div className="mb-8">
                <h4 className="font-medium mb-4">Price Range</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="price-all"
                      name="price"
                      className="mr-2"
                      checked={filters.priceRange === 'all'}
                      onChange={() => handleFilterChange('priceRange', 'all')}
                    />
                    <label htmlFor="price-all">All Prices</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="price-under-500"
                      name="price"
                      className="mr-2"
                      checked={filters.priceRange === 'under-500'}
                      onChange={() => handleFilterChange('priceRange', 'under-500')}
                    />
                    <label htmlFor="price-under-500">Under ₹500</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="price-500-1000"
                      name="price"
                      className="mr-2"
                      checked={filters.priceRange === '500-1000'}
                      onChange={() => handleFilterChange('priceRange', '500-1000')}
                    />
                    <label htmlFor="price-500-1000">₹500 - ₹1000</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="price-1000-plus"
                      name="price"
                      className="mr-2"
                      checked={filters.priceRange === '1000-plus'}
                      onChange={() => handleFilterChange('priceRange', '1000-plus')}
                    />
                    <label htmlFor="price-1000-plus">Over ₹1000</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
              <p className="mb-4 sm:mb-0">
                Showing {filteredProducts.length} products
              </p>
              <div className="flex items-center">
                <label htmlFor="sort" className="mr-2">Sort by:</label>
                <select
                  id="sort"
                  className="bg-transparent border border-primary/30 py-1 px-2 text-sm"
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
            
            {/* Products */}
            {loading ? (
              <div className="h-96 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-background-secondary rounded-lg p-8 text-center">
                <svg className="w-16 h-16 text-primary/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-textColor-muted mb-4">
                  We couldn't find any products matching your current filters.
                </p>
                <button 
                  onClick={() => setFilters({
                    category: '',
                    priceRange: 'all',
                    sortBy: 'featured'
                  })}
                  className="btn-outline-primary py-2 px-4"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Products page component
export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-10 md:py-16">
        <Suspense fallback={
          <div className="container mx-auto px-4">
            <div className="h-96 flex items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
            </div>
          </div>
        }>
          <ProductsContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
} 