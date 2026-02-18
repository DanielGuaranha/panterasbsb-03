
'use client';

import Link from 'next/link';
import Image from 'next/image';

interface ModelCardProps {
  id: string;
  slug: string;
  name: string;
  image: string | null;
  location: string;
  isVip: boolean;
}

export default function ModelCard({ slug, name, image, location, isVip }: ModelCardProps) {
  return (
    <Link href={`/perfil/${slug}`} className="group block relative w-full active:scale-95 transition-all">
      <div className="aspect-[3/4] relative overflow-hidden rounded-lg bg-slate-900 border border-white/5 group-hover:border-gold-500/30 transition-colors duration-500">
        
        {image ? (
          <Image 
            src={image} 
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 33vw, 20vw"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-800 bg-slate-800">
            <span className="text-[10px] uppercase tracking-widest opacity-20 font-serif">Panteras</span>
          </div>
        )}
        
        {/* Overlay Minimalista */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />

        {/* VIP Minimal Badge */}
        {isVip && (
          <div className="absolute top-1.5 left-1.5 z-10">
            <span className="bg-gold-500 text-black text-[7px] font-bold px-1 py-0.5 rounded-sm shadow-xl uppercase tracking-tighter border border-gold-400/50">
              VIP
            </span>
          </div>
        )}

        {/* Informações: Apenas Nome e Localização */}
        <div className="absolute bottom-0 left-0 right-0 p-2">
          <h3 className="text-white font-serif text-[10px] md:text-sm uppercase tracking-wide truncate">
            {name}
          </h3>
          <p className="text-slate-400 text-[8px] md:text-[10px] font-light tracking-widest truncate uppercase mt-0.5">
            {location}
          </p>
        </div>
      </div>
    </Link>
  );
}
