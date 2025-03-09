"use client"
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    avatar: "/assets/frontend_assets/testimonials/avatar-1.jpg",
    text: "I've tried many perfumes over the years, but NOZE fragrances are truly special. The Amber Oud has become my signature scent – I receive compliments everywhere I go!",
    rating: 5
  },
  {
    id: 2,
    name: "Arjun Mehta",
    location: "Delhi",
    avatar: "/assets/frontend_assets/testimonials/avatar-2.jpg",
    text: "The quality and longevity of these fragrances is unmatched. I purchased Eros as a gift for my husband, and he loves how it evolves throughout the day. Worth every rupee.",
    rating: 5
  },
  {
    id: 3,
    name: "Aisha Khan",
    location: "Bangalore",
    avatar: "/assets/frontend_assets/testimonials/avatar-3.jpg",
    text: "Neroli Sunset is the perfect everyday scent – fresh, elegant and not overpowering. The packaging is also beautiful and makes it a perfect gift.",
    rating: 4
  },
  {
    id: 4,
    name: "Vikram Singh",
    location: "Jaipur",
    avatar: "/assets/frontend_assets/testimonials/avatar-4.jpg",
    text: "The customer service is exceptional. When my order was delayed, the team went above and beyond to resolve the issue and included a complimentary sample set with my purchase.",
    rating: 5
  },
  {
    id: 5,
    name: "Meera Patel",
    location: "Chennai",
    avatar: "/assets/frontend_assets/testimonials/avatar-5.jpg",
    text: "Sandalwood Dreams is absolutely divine – warm, comforting and long-lasting. I appreciate that NOZE uses ethically sourced ingredients and sustainable packaging.",
    rating: 5
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef(null);
  
  useEffect(() => {
    // Auto-advance testimonials
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe left
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }
    
    if (touchStart - touchEnd < -100) {
      // Swipe right
      setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };
  
  const goToTestimonial = (index) => {
    setActiveIndex(index);
  };
  
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <svg 
        key={i} 
        className={`w-5 h-5 ${i < rating ? 'text-primary' : 'text-gray-300'}`} 
        fill="currentColor" 
        viewBox="0 0 20 20" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
    ));
  };
  
  return (
    <div 
      ref={containerRef}
      className="relative max-w-4xl mx-auto"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Quote mark */}
      <div className="absolute top-0 left-0 text-primary opacity-10 transform -translate-x-1/4 -translate-y-1/4">
        <svg className="w-24 h-24 md:w-32 md:h-32" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
      
      <div className="relative overflow-hidden">
        <div 
          className="transition-transform duration-500 ease-in-out flex"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="w-full flex-shrink-0 px-4 py-8 md:py-12"
            >
              <div className="text-center">
                <div className="mb-6 flex justify-center">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
                    <Image 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                
                <div className="flex justify-center mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                
                <blockquote>
                  <p className="text-lg md:text-xl italic text-textColor-secondary mb-4">
                    "{testimonial.text}"
                  </p>
                </blockquote>
                
                <div className="mt-4">
                  <p className="font-medium text-primary">{testimonial.name}</p>
                  <p className="text-sm text-textColor-muted">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToTestimonial(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'bg-primary w-6' : 'bg-primary/30 hover:bg-primary/50'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Navigation arrows */}
      <div className="hidden md:block">
        <button 
          onClick={() => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
          className="absolute top-1/2 -left-12 transform -translate-y-1/2 p-2 rounded-full bg-background-primary text-primary hover:bg-primary/10 transition-colors"
          aria-label="Previous testimonial"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        
        <button 
          onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.length)}
          className="absolute top-1/2 -right-12 transform -translate-y-1/2 p-2 rounded-full bg-background-primary text-primary hover:bg-primary/10 transition-colors"
          aria-label="Next testimonial"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
} 