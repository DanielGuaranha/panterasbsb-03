import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GalleryItem } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import UnlockModal from './UnlockModal';

interface Props {
  items: GalleryItem[];
  companionName: string;
  companionId?: string; // ID Necessário para persistência única por modelo
}

const Gallery: React.FC<Props> = ({ items, companionName, companionId }) => {
  const { t } = useLanguage();
  
  // State
  const [unlocked, setUnlocked] = useState(false);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  // Touch Physics State
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Verificação de Persistência Real ao carregar
  useEffect(() => {
    if (companionId) {
      const storageKey = `panteras_gallery_unlocked_${companionId}`;
      const isUnlocked = localStorage.getItem(storageKey) === 'true';
      if (isUnlocked) {
        setUnlocked(true);
      }
    }
  }, [companionId]);

  // 2. Handler que abre o PROCESSO de pagamento (Modal)
  const handleUnlockRequest = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowUnlockModal(true);
  };

  // 3. Callback chamado APENAS quando o modal confirma o sucesso do pagamento
  const handlePaymentSuccess = () => {
    setUnlocked(true);
    if (companionId) {
      localStorage.setItem(`panteras_gallery_unlocked_${companionId}`, 'true');
    }
  };

  const openLightbox = (index: number, item: GalleryItem) => {
    // Se for premium e NÃO estiver desbloqueado, abre o modal de pagamento em vez da foto
    if (item.is_premium && !unlocked) {
      setShowUnlockModal(true);
      return;
    }
    
    setLightboxIndex(index);
    setDragOffset(0);
    window.history.pushState({ lightboxOpen: true }, '');
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    setDragOffset(0);
    if (window.history.state?.lightboxOpen) {
      window.history.back();
    }
  }, []);

  const closeLightboxInternal = useCallback(() => {
    setLightboxIndex(null);
    setDragOffset(0);
  }, []);

  const nextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setDragOffset(0);
      setLightboxIndex((prev) => (prev !== null ? (prev + 1) % items.length : null));
    }
  }, [lightboxIndex, items.length]);

  const prevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setDragOffset(0);
      setLightboxIndex((prev) => (prev !== null ? (prev - 1 + items.length) % items.length : null));
    }
  }, [lightboxIndex, items.length]);

  // Touch Handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsDragging(true);
    setDragOffset(0);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartX.current;
    setDragOffset(diff);
  };

  const onTouchEnd = () => {
    setIsDragging(false);
    touchStartX.current = null;
    
    const threshold = 100;

    if (dragOffset > threshold) {
      prevImage();
    } else if (dragOffset < -threshold) {
      nextImage();
    } else {
      setDragOffset(0);
    }
  };

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
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

    const handlePopState = (e: PopStateEvent) => {
      closeLightboxInternal();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('popstate', handlePopState);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handlePopState);
      document.body.style.overflow = 'unset';
    };
  }, [lightboxIndex, nextImage, prevImage, closeLightbox, closeLightboxInternal]);

  // Preço mockado para MVP (no futuro viria de items[0].unlock_price ou companion.gallery_price)
  const galleryPrice = 29.90;

  return (
    <>
      {/* Grid View */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((item, index) => (
          <div 
            key={item.id} 
            onClick={() => openLightbox(index, item)}
            className={`relative aspect-[3/4] group overflow-hidden rounded-lg bg-slate-900 border border-slate-800 cursor-pointer ${
               item.is_premium && !unlocked ? 'cursor-pointer hover:border-gold-500' : 'hover:border-gold-500/50'
            }`}
          >
            <img
              src={item.url}
              alt={`${companionName} gallery item`}
              className={`w-full h-full object-cover transition-transform duration-700 ease-out transform-gpu md:group-hover:scale-105 active:scale-100 ${
                item.is_premium && !unlocked ? 'blur-xl brightness-50 scale-110' : ''
              }`}
              loading="lazy"
            />
            
            {/* Watermark for Grid Items */}
            {(!item.is_premium || unlocked) && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <span className="text-white/30 font-bold text-xs -rotate-45 tracking-widest border border-white/20 px-2 py-1 select-none">
                  PANTERAS
                </span>
              </div>
            )}
            
            {/* Locked Overlay - Trigger Payment */}
            {item.is_premium && !unlocked && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 text-center bg-black/40 backdrop-blur-[4px]">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center mb-4 shadow-lg shadow-gold-500/30 animate-pulse">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-[0.6rem] uppercase tracking-[0.2em] text-gold-200 font-bold mb-4 drop-shadow-md">
                  {t('gallery.private')}
                </p>
                <button 
                  onClick={handleUnlockRequest}
                  className="bg-black/80 hover:bg-gold-500 hover:text-black border border-gold-500/50 text-gold-400 text-xs px-5 py-2 rounded-full transition-all duration-300 active:scale-95 flex items-center gap-2 font-bold uppercase tracking-wide"
                >
                  <span>🔓</span>
                  {t('gallery.view_photo')}
                </button>
              </div>
            )}

            {/* Video Badge */}
            {(!item.is_premium || unlocked) && (
               <div className="absolute bottom-2 right-2 flex gap-1 pointer-events-none z-20">
                 {item.media_type === 'video' && (
                   <span className="bg-black/70 backdrop-blur-sm text-white text-[0.6rem] px-1.5 py-0.5 rounded flex items-center gap-1 border border-white/10">
                     <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                     {t('gallery.video')}
                   </span>
                 )}
               </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center animate-fade-in touch-none"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          
          <button 
            onClick={closeLightbox}
            className="absolute top-0 right-0 text-slate-400 hover:text-gold-500 z-[110] p-6 active:scale-90 transition-transform"
            aria-label="Fechar galeria"
          >
            <div className="bg-black/50 rounded-full p-2 backdrop-blur-sm">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
          </button>

          {/* Nav Buttons */}
          <button 
            onClick={prevImage}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 text-white/50 hover:text-gold-500 z-[110] p-6 h-full items-center justify-start group outline-none"
          >
            <div className="bg-black/30 group-hover:bg-black/70 p-3 rounded-full backdrop-blur-sm transition-all group-active:scale-95">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </div>
          </button>

          <button 
            onClick={nextImage}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 text-white/50 hover:text-gold-500 z-[110] p-6 h-full items-center justify-end group outline-none"
          >
            <div className="bg-black/30 group-hover:bg-black/70 p-3 rounded-full backdrop-blur-sm transition-all group-active:scale-95">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
          </button>

          {/* Main Content */}
          <div className="w-full h-full p-2 md:p-10 flex items-center justify-center relative overflow-hidden" onClick={closeLightbox}>
             <div 
               ref={containerRef}
               className="relative max-w-full max-h-full flex justify-center items-center" 
               onClick={(e) => e.stopPropagation()}
               style={{ 
                 transform: `translateX(${dragOffset}px)`, 
                 transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                 cursor: isDragging ? 'grabbing' : 'grab'
               }}
             >
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                   <div className="text-white/10 font-bold text-4xl md:text-6xl -rotate-45 tracking-[0.2em] border-4 border-white/10 px-8 py-4 select-none whitespace-nowrap">
                      PANTERAS BSB
                   </div>
                </div>

                {items[lightboxIndex].media_type === 'video' ? (
                  <video 
                    controls 
                    autoPlay 
                    className="max-w-full max-h-[85vh] rounded shadow-2xl border border-slate-800 relative z-10"
                    src={items[lightboxIndex].url}
                  />
                ) : (
                  <img 
                    src={items[lightboxIndex].url} 
                    alt={`${companionName} detail view`}
                    className="max-w-full max-h-[85vh] rounded shadow-2xl border border-slate-800 object-contain select-none transition-transform duration-700 ease-in-out hover:scale-[1.02] relative z-10"
                    draggable={false}
                  />
                )}
                
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none rounded-b z-30">
                   <div className="flex justify-between items-end">
                      <div>
                         <p className="text-gold-500 font-serif text-sm italic">{companionName}</p>
                         <div className="w-8 h-[1px] bg-gold-500/50 mt-1"></div>
                      </div>
                      <div className="text-slate-300 text-xs font-mono tracking-widest bg-black/40 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
                        {lightboxIndex + 1} <span className="text-slate-600">/</span> {items.length}
                      </div>
                   </div>
                </div>

                {items[lightboxIndex].is_premium && (
                   <div className="absolute top-4 left-4 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-400 text-black text-[0.6rem] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-sm shadow-[0_0_15px_rgba(212,175,55,0.5)] border border-gold-200/50 backdrop-blur-sm pointer-events-none z-30">
                     {t('gallery.premium')}
                   </div>
                )}
             </div>
          </div>
        </div>
      )}

      {/* Payment Gateway Modal */}
      <UnlockModal 
        isOpen={showUnlockModal} 
        onClose={() => setShowUnlockModal(false)}
        onConfirm={handlePaymentSuccess}
        price={galleryPrice}
        companionName={companionName}
      />
    </>
  );
};

export default Gallery;