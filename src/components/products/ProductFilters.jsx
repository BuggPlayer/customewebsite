"use client"
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function ProductFilters({ filters, onFilterChange }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  const handleCategoryChange = (category) => {
    onFilterChange({ category });
    updateUrlParams({ category });
  };
  
  const handleGenderChange = (gender) => {
    onFilterChange({ gender });
    updateUrlParams({ gender });
  };
  
  const handleScentChange = (scent) => {
    onFilterChange({ scent });
    updateUrlParams({ scent });
  };
  
  const handlePriceRangeChange = (event, index) => {
    const value = parseInt(event.target.value);
    const newPriceRange = [...filters.priceRange];
    newPriceRange[index] = value;
    onFilterChange({ priceRange: newPriceRange });
  };
  
  const clearAllFilters = () => {
    onFilterChange({
      category: '',
      gender: '',
      scent: '',
      priceRange: [0, 5000]
    });
    router.push(pathname);
  };
  
  const updateUrlParams = (params) => {
    // Create URLSearchParams object with current params
    const searchParams = new URLSearchParams();
    
    // Add current filters to URL params
    if (filters.category || params.category) {
      const category = params.category !== undefined ? params.category : filters.category;
      if (category) searchParams.set('category', category);
    }
    
    if (filters.gender || params.gender) {
      const gender = params.gender !== undefined ? params.gender : filters.gender;
      if (gender) searchParams.set('gender', gender);
    }
    
    if (filters.scent || params.scent) {
      const scent = params.scent !== undefined ? params.scent : filters.scent;
      if (scent) searchParams.set('scent', scent);
    }
    
    if (filters.sortBy) {
      searchParams.set('sort', filters.sortBy);
    }
    
    // Update URL without refreshing the page
    const newUrl = searchParams.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname;
    
    router.push(newUrl);
  };
  
  const hasActiveFilters = 
    filters.category || 
    filters.gender || 
    filters.scent || 
    filters.priceRange[0] > 0 || 
    filters.priceRange[1] < 5000;
  
  return (
    <div className="w-full md:w-72">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Filters</h2>
        <button 
          className="md:hidden text-textColor-secondary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          )}
        </button>
        
        {hasActiveFilters && (
          <button 
            onClick={clearAllFilters}
            className="hidden md:block text-sm text-primary hover:text-primary/80"
          >
            Clear All
          </button>
        )}
      </div>
      
      <div className={`space-y-6 ${isOpen ? 'block' : 'hidden md:block'}`}>
        {/* Category Filter */}
        <div>
          <h3 className="text-sm font-medium mb-2">Category</h3>
          <div className="space-y-2">
            {['men', 'women', 'unisex'].map((category) => (
              <div key={category} className="flex items-center">
                <input
                  id={`category-${category}`}
                  name="category"
                  type="radio"
                  checked={filters.category === category}
                  onChange={() => handleCategoryChange(category)}
                  className="h-4 w-4 text-primary focus:ring-primary"
                />
                <label htmlFor={`category-${category}`} className="ml-2 text-sm text-textColor-secondary capitalize">
                  {category}
                </label>
              </div>
            ))}
            {filters.category && (
              <button 
                onClick={() => handleCategoryChange('')}
                className="text-xs text-primary hover:text-primary/80"
              >
                Clear Category
              </button>
            )}
          </div>
        </div>
        
        {/* Gender Filter */}
        <div>
          <h3 className="text-sm font-medium mb-2">Gender</h3>
          <div className="space-y-2">
            {['men', 'women', 'unisex'].map((gender) => (
              <div key={gender} className="flex items-center">
                <input
                  id={`gender-${gender}`}
                  name="gender"
                  type="radio"
                  checked={filters.gender === gender}
                  onChange={() => handleGenderChange(gender)}
                  className="h-4 w-4 text-primary focus:ring-primary"
                />
                <label htmlFor={`gender-${gender}`} className="ml-2 text-sm text-textColor-secondary capitalize">
                  {gender}
                </label>
              </div>
            ))}
            {filters.gender && (
              <button 
                onClick={() => handleGenderChange('')}
                className="text-xs text-primary hover:text-primary/80"
              >
                Clear Gender
              </button>
            )}
          </div>
        </div>
        
        {/* Scent Profile */}
        <div>
          <h3 className="text-sm font-medium mb-2">Scent Profile</h3>
          <div className="space-y-2">
            {['woody', 'floral', 'oriental', 'fresh', 'citrus', 'spicy'].map((scent) => (
              <div key={scent} className="flex items-center">
                <input
                  id={`scent-${scent}`}
                  name="scent"
                  type="radio"
                  checked={filters.scent === scent}
                  onChange={() => handleScentChange(scent)}
                  className="h-4 w-4 text-primary focus:ring-primary"
                />
                <label htmlFor={`scent-${scent}`} className="ml-2 text-sm text-textColor-secondary capitalize">
                  {scent}
                </label>
              </div>
            ))}
            {filters.scent && (
              <button 
                onClick={() => handleScentChange('')}
                className="text-xs text-primary hover:text-primary/80"
              >
                Clear Scent
              </button>
            )}
          </div>
        </div>
        
        {/* Price Range */}
        <div>
          <h3 className="text-sm font-medium mb-2">Price Range</h3>
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-textColor-muted">
              <span>₹{filters.priceRange[0]}</span>
              <span>₹{filters.priceRange[1]}</span>
            </div>
            <div className="relative">
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceRangeChange(e, 0)}
                className="range-slider absolute z-10 w-full"
              />
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceRangeChange(e, 1)}
                className="range-slider absolute z-20 w-full"
              />
            </div>
          </div>
        </div>
        
        {hasActiveFilters && (
          <button 
            onClick={clearAllFilters}
            className="md:hidden block w-full text-center text-sm btn-outline-primary py-2"
          >
            Clear All Filters
          </button>
        )}
      </div>
    </div>
  );
} 