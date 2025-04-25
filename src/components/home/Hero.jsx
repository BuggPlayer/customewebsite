import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const heroImages = [
  '/assets/frontend_assets/collections/making.jpg',
  '/assets/frontend_assets/collections/bottle.jpg',
  '/assets/frontend_assets/collections/men.jpg',
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000); // Change every 6 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt={`Hero background ${index + 1}`}
            fill
            priority={index === 0}
            className={`object-cover transition-opacity duration-1000 ease-in-out transform ${
              index === currentImageIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
          />
        ))}
        {/* Stronger dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80 z-10" />
      </div>

      {/* Decorative Blurs */}
      <div className="absolute w-96 h-96 -top-48 -left-48 bg-[#d2a34b]/20 rounded-full blur-3xl z-10"></div>
      <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-[#d2a34b]/20 rounded-full blur-3xl z-10"></div>

      {/* Main Content */}
      <div className="relative container mx-auto px-4 h-screen flex flex-col lg:flex-row justify-center items-center text-center lg:text-left z-20">
        <div className="max-w-2xl">
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#d2a34b] to-transparent mx-auto lg:mx-0 mb-8 animate-pulse"></div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-wide text-white mb-6 leading-tight animate-fade-in drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
            DISCOVER YOUR
            <span className="block mt-2 bg-gradient-to-r from-[#d2a34b] to-[#e3b55b] bg-clip-text text-transparent font-medium">
              SIGNATURE SCENT
            </span>
          </h1>

          <p className="text-lg text-white/80 mb-10 leading-relaxed drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
            Luxury fragrances crafted to express your individuality and elevate your essence.
          </p>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              href="/products"
              className="group relative overflow-hidden bg-[#d2a34b] text-black px-8 py-4 uppercase tracking-wider font-light transition-transform duration-300 hover:scale-105 rounded-md"
            >
              <span className="relative z-10">Shop Now</span>
              <div className="absolute inset-0 bg-[#c69544] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 z-0"></div>
            </Link>

            <Link
              href="/collections"
              className="group relative overflow-hidden border border-[#d2a34b] text-[#d2a34b] px-8 py-4 uppercase tracking-wider font-light transition-transform duration-300 hover:scale-105 rounded-md"
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">Explore Collections</span>
              <div className="absolute inset-0 bg-[#d2a34b] scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-300 z-0"></div>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 flex flex-col items-center z-20">
        <span className="text-xs uppercase tracking-widest mb-2 animate-pulse">Scroll</span>
        <div className="w-6 h-12 border-2 border-white/30 rounded-full p-1">
          <div className="w-1.5 h-1.5 bg-white/70 rounded-full mx-auto animate-bounce-slow"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
