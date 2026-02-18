'use client';

import { useState } from 'react';
import Image from 'next/image';

interface GalleryItem {
  id: string;
  url: string;
  type: string;
  is_premium: boolean;
}

export default function Gallery({ items }: { items: GalleryItem[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Se não houver itens, mostra placeholder
  if (!items || items.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
        {items.map((item, idx) => (
          <div 
            key={item.id}
            onClick={() => !item.is_premium && setSelectedImage(item.url)}
            className={`
              relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer group bg-slate-900
              ${item.is_premium ? 'cursor-lock' : ''}
            `}
          >
            <Image
              src={item.url}
              alt="Galeria"
              fill
              className={`
                object-cover transition-transform duration-500 group-hover:scale-105
                ${item.is_premium ? 'blur-xl brightness-50' : ''}
              `}
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            
            {item.is_premium && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <span className="text-2xl">🔒</span>
                <span className="text-[0.6rem] uppercase tracking-widest font-bold text-gold-500 mt-2">Premium</span>
              </div>
            )}

            {!item.is_premium && (
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-4 right-4 text-white p-2">✕</button>
          <div className="relative w-full max-w-3xl h-[80vh]">
            <Image 
              src={selectedImage} 
              alt="Zoom" 
              fill 
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
