"use client"
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function BrandStory() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.2,
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 relative overflow-hidden bg-background-secondary"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h2 className="text-2xl md:text-3xl font-light text-primary mb-6">Our Story</h2>
            <div className="prose prose-lg max-w-none">
              <p>At NOZE, we believe that fragrance is more than just a scent—it's an art form, a personal signature, and a powerful trigger for memories and emotions.</p>
              
              <p className="my-4">Founded in 2015 by master perfumer Elena Rossi, NOZE was born from a passion for creating fragrances that tell stories and evoke emotions. With over 20 years of experience in the industry, Elena set out to create a perfume house that prioritizes quality, sustainability, and artistic expression.</p>
              
              <p>Today, our team of skilled artisans handcraft each fragrance in our Mumbai atelier, blending traditional perfumery techniques with modern innovation. We source the finest ingredients from around the world, ensuring ethical practices and environmental responsibility.</p>
            </div>
            
            <Link href="/about" className="btn-primary inline-block mt-8 px-8 py-3">
              Learn More
            </Link>
          </div>
          
          {/* Right Column - Images */}
          <div className={`grid grid-cols-2 gap-4 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="space-y-4">
              <div className="relative h-48 md:h-64 rounded-lg overflow-hidden">
                <Image 
                  src="/assets/frontend_assets/products/placeholdr.svg" 
                  alt="NOZE perfume laboratory" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="relative h-48 md:h-40 rounded-lg overflow-hidden">
                <Image 
                  src="/assets/frontend_assets/products/placeholdr.svg" 
                  alt="NOZE perfume ingredients" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 mt-6">
              <div className="relative h-48 md:h-40 rounded-lg overflow-hidden">
                <Image 
                  src="/assets/frontend_assets/products/placeholdr.svg" 
                  alt="NOZE perfume bottles" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="relative h-48 md:h-64 rounded-lg overflow-hidden">
                <Image 
                  src="/assets/frontend_assets/products/placeholdr.svg" 
                  alt="NOZE perfumer at work" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 