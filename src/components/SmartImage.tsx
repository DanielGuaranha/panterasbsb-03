import React, { useState } from 'react';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
}

const SmartImage: React.FC<Props> = ({ src, alt, className, containerClassName, priority = false, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-slate-900 ${containerClassName || ''}`}>
      {/* 1. Premium Skeleton (Visible while loading) 
          Design System: Subtle breathing gradient instead of harsh pulse or icons
      */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 bg-[length:200%_200%] animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] z-0 ${
          isLoaded ? 'opacity-0 transition-opacity duration-700 ease-out' : 'opacity-100'
        }`}
        aria-hidden="true"
      />

      {/* 2. Error State - Elegant Fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900 z-10">
          <span className="text-gold-500/30 text-[0.6rem] uppercase tracking-[0.2em] font-serif">Panteras BSB</span>
        </div>
      )}

      {/* 3. Main Image with Hardware Accelerated Fade-In & LCP Optimization */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        loading={priority ? "eager" : "lazy"}
        // @ts-ignore - React type definitions might lag behind standard HTML attributes
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        className={`relative z-10 transition-all duration-700 ease-out will-change-transform ${className} ${
          isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-lg'
        }`}
        {...props}
      />
    </div>
  );
};

export default SmartImage;