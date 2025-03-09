"use client"
import { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function ProductSorting({ sortBy, onSortChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'newest', label: 'Newest Arrivals' },
    { value: 'price-low-to-high', label: 'Price: Low to High' },
    { value: 'price-high-to-low', label: 'Price: High to Low' },
    { value: 'rating', label: 'Top Rated' }
  ];
  
  const handleSortChange = (value) => {
    onSortChange(value);
    setIsOpen(false);
    
    // Update URL with sort parameter
    const params = new URLSearchParams(searchParams);
    if (value === 'popular') {
      params.delete('sort');
    } else {
      params.set('sort', value);
    }
    
    const newUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;
    
    router.push(newUrl);
  };
  
  const currentSort = sortOptions.find(option => option.value === sortBy) || sortOptions[0];
  
  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center justify-between w-full md:w-60 border border-primary/20 bg-background-secondary rounded-lg px-4 py-2 text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Sort by: {currentSort.label}</span>
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 w-full md:w-60 bg-background-secondary border border-primary/20 rounded-lg shadow-lg">
          <ul className="py-1">
            {sortOptions.map(option => (
              <li key={option.value}>
                <button
                  type="button"
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    sortBy === option.value 
                      ? 'bg-primary/10 text-primary' 
                      : 'hover:bg-primary/5 text-textColor-secondary'
                  }`}
                  onClick={() => handleSortChange(option.value)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 