import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Companion } from '../types';

interface Props {
  data: Companion;
  image?: string;
}

// Helper para otimizar URLs do Unsplash (comum no mock)
// Em produção com Supabase Storage, isso poderia usar Supabase Image Transformations
const optimizeImageUrl = (url: string, width: number) => {
  if (!url) return '';
  if (url.includes('images.unsplash.com')) {
    // Remove parâmetros existentes de largura para não duplicar
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?auto=format&fit=crop&w=${width}&q=80`;
  }
  return url;
};

const ProfileCard: React.FC<Props> = ({ data, image }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const isNovata = (new Date().getTime() - new Date(data.created_at).getTime()) < (4 * 24 * 60 * 60 * 1000);
  const isDestaque = data.featured_until && new Date(data.featured_until) > new Date();

  // Imagem de fallback de alta qualidade (Moda/Retrato)
  const fallbackImage = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80";
  const sourceImage = image || fallbackImage;

  return (
    <Link to={`/perfil/${data.slug}`} className="block group relative">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-slate-900 border border-gold-900/30 shadow-lg transition-transform duration-300 group-hover:-translate-y-1">
        
        {/* Skeleton / Placeholder (Visible while loading) */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-slate-800 animate-pulse z-0 flex items-center justify-center">
            <svg className="w-8 h-8 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Main Image with WPO (SrcSet + Async Decoding) */}
        <img 
          src={optimizeImageUrl(sourceImage, 600)} 
          srcSet={`
            ${optimizeImageUrl(sourceImage, 400)} 400w,
            ${optimizeImageUrl(sourceImage, 600)} 600w,
            ${optimizeImageUrl(sourceImage, 800)} 800w
          `}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          alt={data.display_name}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          className={`
            w-full h-full object-cover transition-all duration-700 ease-out
            ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
            group-hover:opacity-100 group-hover:scale-105
          `}
        />

        {/* Overlays / Watermarks */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-70" />
        
        {/* Diagonal Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 pointer-events-none opacity-20 whitespace-nowrap">
          <span className="text-3xl font-bold text-white tracking-widest">PANTERAS BSB</span>
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 items-start z-10">
          {data.is_vip && (
            <span className="px-2 py-0.5 bg-gold-500 text-black text-[0.6rem] font-bold uppercase tracking-wider rounded-sm shadow-md shadow-gold-500/20">
              VIP
            </span>
          )}
          {isNovata && (
            <span className="px-2 py-0.5 bg-rose-600 text-white text-[0.6rem] font-bold uppercase tracking-wider rounded-sm animate-pulse">
              Novidade
            </span>
          )}
          {isDestaque && (
             <span className="px-2 py-0.5 bg-indigo-600 text-white text-[0.6rem] font-bold uppercase tracking-wider rounded-sm">
             Destaque
           </span>
          )}
        </div>

        {/* Content Info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
          <div className="mb-1">
            <h3 className="font-serif text-xl text-white font-medium drop-shadow-md">
              {data.display_name}
            </h3>
            
            {/* Short Bio Preview */}
            {data.short_bio && (
              <div className="mb-2 mt-1 relative">
                <p className="text-xs text-slate-300 line-clamp-2 font-light leading-snug drop-shadow-sm pr-4">
                  {data.short_bio}
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-start items-center text-xs border-t border-white/10 pt-2">
            <div className="flex items-center text-gold-200/80">
              <span className="uppercase tracking-wide text-[0.65rem] border border-gold-500/30 px-1.5 py-0.5 rounded bg-black/40 backdrop-blur-sm">
                {data.city} • {data.neighborhood}
              </span>
            </div>
          </div>
        </div>

        {/* Small Logo Bottom Right */}
        <div className="absolute bottom-1 right-1 opacity-50">
           <span className="text-[0.4rem] text-gold-200 tracking-tighter">PANTERASBSB.COM</span>
        </div>
      </div>
    </Link>
  );
};

export default ProfileCard;