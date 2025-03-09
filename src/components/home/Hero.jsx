import Link from 'next/link';
import Image from 'next/image';
import { assets } from '@/utils/assetHelper';

const Hero = () => {
  return (
    <div className="relative h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={assets.backgrounds.hero}
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <div className="max-w-3xl">
          <div className="w-20 h-[1px] bg-[#d2a34b] mx-auto mb-8"></div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-wider text-white mb-6">DISCOVER YOUR SIGNATURE SCENT</h1>
          <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">
            Luxury fragrances that elevate your presence and leave a lasting impression.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/products" className="bg-[#d2a34b] text-black px-8 py-4 uppercase tracking-wider font-light hover:bg-[#c69544] transition-colors duration-300">
              Shop Now
            </Link>
            <Link href="/collections" className="border border-[#d2a34b] text-[#d2a34b] px-8 py-4 uppercase tracking-wider font-light hover:bg-[#d2a34b] hover:text-black transition-all duration-300">
              Explore Collections
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 flex flex-col items-center animate-pulse">
        <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero; 