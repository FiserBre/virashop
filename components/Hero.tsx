import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToProducts = () => {
    const element = document.getElementById('products-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full h-[600px] md:h-[700px] bg-slate-900 overflow-hidden mb-12">
      {/* Background Image */}
      <img 
        src="/images/Montblanchike.jpg" 
        alt="Fashion Hero" 
        className="absolute inset-0 w-full h-full object-cover opacity-80 animate-scale-in duration-[2000ms]"
      />
      
      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

      {/* Content */}
      <div className="relative z-10 h-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-20 md:pb-32">
        <div className="max-w-2xl animate-fade-in-up">
          <span className="inline-block px-3 py-1 bg-white text-black text-xs font-bold tracking-widest uppercase mb-4">
            New
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-none mb-6 drop-shadow-lg">
            VIRA<br/>SHOP.
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg leading-relaxed">
            popis
          </p>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/50 animate-bounce-subtle hidden md:block">
        <ArrowRight size={24} className="rotate-90" />
      </div>
    </div>
  );
};

export default Hero;