"use client"
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    title: "Discover Your Signature Scent",
    subtitle: "Elegantly crafted fragrances that speak to your unique essence",
    description: "Explore our collection of premium perfumes created with the finest ingredients from around the world.",
    image: "/assets/frontend_assets/backgrounds/hero1.jpg",
    ctaText: "Shop Now",
    ctaLink: "/products",
    alignment: "left" // text alignment (left, center, right)
  },
  {
    id: 2,
    title: "The Art of Perfumery",
    subtitle: "Where science meets artistic expression",
    description: "Each fragrance tells a story - a carefully composed symphony of notes that evolves throughout the day.",
    image: "/assets/frontend_assets/backgrounds/hero1.jpg",
    ctaText: "Explore Collection",
    ctaLink: "/products",
    alignment: "center"
  },
  {
    id: 3,
    title: "Luxury in Every Bottle",
    subtitle: "Handcrafted with passion and precision",
    description: "Our perfumes are created by master perfumers using the highest quality ingredients and sustainable practices.",
    image: "/assets/frontend_assets/backgrounds/hero2.jpg",
    ctaText: "Learn More",
    ctaLink: "/about",
    alignment: "right"
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const goToSlide = useCallback((index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500); // Match this with transition duration
  }, [isAnimating]);
  
  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, goToSlide]);
  
  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, goToSlide]);
  
  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000); // Change slide every 6 seconds
    
    return () => clearInterval(interval);
  }, [nextSlide]);
  
  // Touch event handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe left
      nextSlide();
    }
    
    if (touchStart - touchEnd < -100) {
      // Swipe right
      prevSlide();
    }
  };
  
  // Get alignment classes based on slide configuration
  const getAlignmentClasses = (alignment) => {
    switch (alignment) {
      case 'left':
        return 'text-left items-start';
      case 'right':
        return 'text-right items-end';
      case 'center':
      default:
        return 'text-center items-center';
    }
  };
  
  return (
    <div 
      className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          {/* Content */}
          {/* <div className="relative z-10 h-full container mx-auto px-4 py-16 flex flex-col justify-center">
            <div className={`max-w-xl ${getAlignmentClasses(slide.alignment)} mx-auto md:mx-0`}>
              <div 
                className={`transform transition-transform duration-[1200ms] delay-300 ${
                  index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                <h3 className="text-sm md:text-base text-primary font-light tracking-wider mb-2 transition-opacity delay-[400ms]">
                  {slide.subtitle}
                </h3>
                <h2 className="text-3xl md:text-5xl lg:text-6xl text-white font-extralight mb-4 transition-opacity delay-[600ms]">
                  {slide.title}
                </h2>
                <p className="text-sm md:text-base text-white/80 mb-8 max-w-md transition-opacity delay-[800ms]">
                  {slide.description}
                </p>
                <Link
                  href={slide.ctaLink}
                  className="inline-block btn-primary px-8 py-3 transition-opacity delay-[1000ms]"
                >
                  {slide.ctaText}
                </Link>
              </div>
            </div>
          </div> */}
        </div>
      ))}
      
      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/20 text-white/80 hover:bg-black/40 hover:text-white transition-colors focus:outline-none"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/20 text-white/80 hover:bg-black/40 hover:text-white transition-colors focus:outline-none"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-primary w-8' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 