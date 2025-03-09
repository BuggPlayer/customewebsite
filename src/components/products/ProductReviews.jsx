'use client';

import { useState } from 'react';
import Image from 'next/image';

// Mock data - replace with API call
const getProductReviews = (productId) => {
  return [
    {
      id: 1,
      author: "Emma Johnson",
      avatar: "/avatars/user1.jpg",
      rating: 5,
      date: "August 12, 2023",
      title: "Absolutely love this scent!",
      content: "This perfume is everything I hoped it would be. The scent is sophisticated and lasts all day without being overwhelming. I've received so many compliments!"
    },
    {
      id: 2,
      author: "Michael Chen",
      avatar: "/avatars/user2.jpg",
      rating: 4,
      date: "July 29, 2023",
      title: "Great fragrance, smaller than expected",
      content: "The scent is amazing and very long-lasting. My only complaint is that the bottle is a bit smaller than I expected for the price, but the quality makes up for it."
    },
    {
      id: 3,
      author: "Sophia Patel",
      avatar: "/avatars/user3.jpg",
      rating: 5,
      date: "July 15, 2023",
      title: "My new signature scent",
      content: "I've been searching for a new signature scent for months, and I've finally found it! The complex notes develop beautifully throughout the day. Packaging is luxurious too."
    }
  ];
};

export default function ProductReviews({ productId }) {
  const [reviews] = useState(getProductReviews(productId));
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                className={`w-5 h-5 ${i < Math.floor(averageRating) ? "text-yellow-400" : "text-gray-300"}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
          </div>
          <span className="ml-2 text-gray-600">
            {averageRating.toFixed(1)} out of 5 ({reviews.length} reviews)
          </span>
        </div>
        
        <button 
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {showReviewForm ? 'Cancel' : 'Write a Review'}
        </button>
      </div>
      
      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Write a Review</h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="review-title" className="block text-sm font-medium text-gray-700">Review Title</label>
              <input
                type="text"
                id="review-title"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Summarize your thoughts"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <div className="flex items-center mt-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    className="text-gray-300 hover:text-yellow-400 focus:outline-none"
                  >
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="review-content" className="block text-sm font-medium text-gray-700">Review</label>
              <textarea
                id="review-content"
                rows="4"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Share your experience with this product"
              ></textarea>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Reviews List */}
      <div className="space-y-8">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <Image 
                    src={review.avatar} 
                    alt={review.author} 
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-medium text-gray-900">{review.title}</h4>
                <div className="flex items-center mt-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-4 h-4 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">{review.author} • {review.date}</span>
                </div>
                <div className="mt-3 text-gray-700">{review.content}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 