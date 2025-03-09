"use client"
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { fetchProducts } from '@/utils/productService';

export default function ProductsPage() {
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
    <div className="min-h-screen bg-background text-textColor-secondary font-primary">
      <Navbar />
      
      {/* Page Header */}
      <div className="relative py-16 md:py-24 bg-background-secondary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-light text-primary mb-4">Our Collections</h1>
          <p className="text-textColor-muted max-w-2xl mx-auto">
            Discover our exclusive range of luxury perfumes designed to elevate your presence and create lasting impressions.
          </p>
        </div>
      </div>
      
      {/* Products Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-1/4">
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
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19.071 19.071c3.904-3.905 3.904-10.237 0-14.142-3.905-3.904-10.237-3.904-14.142 0-3.904 3.905-3.904 10.237 0 14.142 3.905 3.904 10.237 3.904 14.142 0zM8 15l4-4m0 0l4-4m-4 4l-4-4m4 4l4 4" />
                </svg>
                <h3 className="mt-4 text-xl text-textColor-muted">No products found</h3>
                <p className="mt-2 text-textColor-muted/70">Try adjusting your filters</p>
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
      
      <Footer />
    </div>
  );
} 