import Link from 'next/link';

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-[#d2a34b]/10 rounded-full blur-3xl"></div>
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-[#d2a34b]/10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4 h-screen flex flex-col justify-center items-center text-center">
        <div className="max-w-3xl">
          {/* Animated Line */}
          <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-[#d2a34b] to-transparent mx-auto mb-8 animate-pulse"></div>
          
          {/* Main Content */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-wider text-white mb-6 animate-fade-in">
            DISCOVER YOUR
            <span className="block mt-2 bg-gradient-to-r from-[#d2a34b] to-[#e3b55b] bg-clip-text text-transparent">
              SIGNATURE SCENT
            </span>
          </h1>
          
          <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto leading-relaxed">
            Luxury fragrances that elevate your presence and leave a lasting impression.
          </p>
          
          {/* Buttons with enhanced hover effects */}
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              href="/products" 
              className="group relative overflow-hidden bg-[#d2a34b] text-black px-8 py-4 uppercase tracking-wider font-light transition-transform duration-300 hover:scale-105"
            >
              <span className="relative z-10">Shop Now</span>
              <div className="absolute inset-0 bg-[#c69544] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </Link>
            
            <Link 
              href="/collections" 
              className="group relative overflow-hidden border border-[#d2a34b] text-[#d2a34b] px-8 py-4 uppercase tracking-wider font-light transition-transform duration-300 hover:scale-105"
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">Explore Collections</span>
              <div className="absolute inset-0 bg-[#d2a34b] transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 flex flex-col items-center">
        <span className="text-xs uppercase tracking-widest mb-2 animate-pulse">Scroll</span>
        <div className="w-6 h-12 border-2 border-white/30 rounded-full p-1">
          <div className="w-1.5 h-1.5 bg-white/70 rounded-full mx-auto animate-bounce-slow"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 