import React, { useState, useEffect, useCallback } from 'react';
import { GalleryItem } from '../types';

// Added companionName and companionId to Props to match usage in ProfileDetail.tsx
interface Props {
  items: GalleryItem[];
  companionName?: string;
  companionId?: string;
}

// Destructured companionName and companionId to fix type error in ProfileDetail.tsx
const Gallery: React.FC<Props> = ({ items, companionName, companionId }) => {
  const [unlocked, setUnlocked] = useState(false);
  const [loadingUnlock, setLoadingUnlock] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleUnlock = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening lightbox
    setLoadingUnlock(true);
    setTimeout(() => {
      setLoadingUnlock(false);
      setUnlocked(true);
    }, 1000);
  };

  const openLightbox = (index: number, item: GalleryItem) => {
    // Only open if it's not premium OR if it is premium but already unlocked
    if (!item.is_premium || unlocked) {
      setLightboxIndex(index);
    }
  };

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const nextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev !== null ? (prev + 1) % items.length : null));
    }
  }, [lightboxIndex, items.length]);

  const prevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev !== null ? (prev - 1 + items.length) % items.length : null));
    }
  }, [lightboxIndex, items.length]);

  // Keyboard navigation & Scroll Locking
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextImage();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevImage();
      }
    };

    if (lightboxIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Lock scroll
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset'; // Unlock scroll
    };
  }, [lightboxIndex, nextImage, prevImage, closeLightbox]);

  return (
    <>
      {/* Grid View */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((item, index) => (
          <div 
            key={item.id} 
            onClick={() => openLightbox(index, item)}
            className={`relative aspect-[3/4] group overflow-hidden rounded-lg bg-slate-900 border border-slate-800 cursor-pointer ${
               item.is_premium && !unlocked ? 'cursor-default' : 'hover:border-gold-500/50'
            }`}
          >
            <img
              src={item.url}
              alt="Gallery item"
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                item.is_premium && !unlocked ? 'blur-xl brightness-50 scale-110' : ''
              }`}
              loading="lazy"
            />
            
            {/* Overlay for Premium Locked */}
            {item.is_premium && !unlocked && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 text-center bg-black/20 backdrop-blur-[2px]">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center mb-3 shadow-lg shadow-gold-500/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gold-200 font-bold mb-3 drop-shadow-md">
                  Privado
                </p>
                <button 
                  onClick={handleUnlock}
                  disabled={loadingUnlock}
                  className="bg-black/60 hover:bg-gold-500 hover:text-black border border-gold-500/50 text-gold-400 text-xs px-4 py-1.5 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-wait"
                >
                  {loadingUnlock ? 'Liberando...' : 'Ver Foto'}
                </button>
              </div>
            )}

            {/* Icons/Badges (Only if not locked) */}
            {(!item.is_premium || unlocked) && (
               <div className="absolute bottom-2 right-2 flex gap-1 pointer-events-none">
                 {/* Fixed: Property 'media_type' does not exist on type 'GalleryItem'. Replaced with 'type'. */}
                 {item.type === 'video' && (
                   <span className="bg-black/70 backdrop-blur-sm text-white text-[0.6rem] px-1.5 py-0.5 rounded flex items-center gap-1 border border-white/10">
                     <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                     VIDEO
                   </span>
                 )}
               </div>
            )}
            
            {/* Hover Hint */}
            {(!item.is_premium || unlocked) && (
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <svg className="w-8 h-8 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center animate-fade-in">
          
          {/* Close Button */}
          <button 
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-slate-400 hover:text-gold-500 z-50 p-2"
            aria-label="Fechar galeria (Esc)"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev Button */}
          <button 
            onClick={prevImage}
            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-gold-500 z-50 p-4 rounded-full hover:bg-white/10 transition-all"
            aria-label="Imagem anterior (Seta Esquerda)"
          >
            <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Button */}
          <button 
            onClick={nextImage}
            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-gold-500 z-50 p-4 rounded-full hover:bg-white/10 transition-all"
            aria-label="Próxima imagem (Seta Direita)"
          >
            <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Main Content */}
          <div className="w-full h-full p-4 md:p-10 flex items-center justify-center relative" onClick={closeLightbox}>
             {/* Stop propagation on content click so it doesn't close modal */}
             <div 
               className="relative max-w-full max-h-full" 
               onClick={(e) => e.stopPropagation()}
             >
                {/* Fixed: Property 'media_type' does not exist on type 'GalleryItem'. Replaced with 'type'. */}
                {items[lightboxIndex].type === 'video' ? (
                  <video 
                    controls 
                    autoPlay 
                    className="max-w-full max-h-[85vh] rounded shadow-2xl border border-slate-800"
                    src={items[lightboxIndex].url}
                  />
                ) : (
                  <img 
                    src={items[lightboxIndex].url} 
                    alt="Full screen view" 
                    className="max-w-full max-h-[85vh] rounded shadow-2xl border border-slate-800 object-contain"
                  />
                )}
                
                {/* Image Counter */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-slate-400 text-sm font-light tracking-widest bg-black/50 px-4 py-1 rounded-full border border-white/10">
                  {lightboxIndex + 1} / {items.length}
                </div>

                {/* Premium Badge inside lightbox (if applicable) */}
                {items[lightboxIndex].is_premium && (
                   <div className="absolute top-4 left-4 bg-gold-500 text-black text-[0.6rem] font-bold uppercase px-2 py-0.5 rounded shadow-lg">
                     Premium
                   </div>
                )}
             </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;