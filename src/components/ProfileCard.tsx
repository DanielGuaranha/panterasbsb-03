
import React from 'react';
import { Link } from 'react-router-dom';
import { Companion } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import SmartImage from './SmartImage';

interface Props {
  data: Companion;
  image?: string;
  priority?: boolean;
}

const optimizeImageUrl = (url: string, width: number) => {
  if (!url) return '';
  if (url.includes('images.unsplash.com')) {
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?auto=format&fit=crop&w=${width}&q=80`;
  }
  return url;
};

const ProfileCard: React.FC<Props> = ({ data, image, priority = false }) => {
  const { t: _t } = useLanguage();

  const fallbackImage = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80";
  const sourceImage = image || data.image_url || fallbackImage;

  return (
    <Link to={`/perfil/${data.slug}`} className="block group relative active:scale-95 transition-transform duration-200">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-slate-900 border border-white/5 shadow-lg">
        
        {/* VIP Badge - Discreto no canto superior */}
        {data.is_vip && (
          <div className="absolute top-2 left-2 z-20">
            <div className="bg-gold-500 text-black text-[7px] font-black px-1.5 py-0.5 rounded-sm uppercase tracking-tighter shadow-lg shadow-gold-500/20 border border-gold-400/50">
              VIP
            </div>
          </div>
        )}

        <SmartImage
          src={optimizeImageUrl(sourceImage, 600)}
          alt={data.display_name}
          containerClassName="w-full h-full"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          srcSet={`${optimizeImageUrl(sourceImage, 300)} 300w, ${optimizeImageUrl(sourceImage, 600)} 600w`}
          sizes="(max-width: 640px) 33vw, 25vw"
          priority={priority}
        />

        {/* Gradiente Scrim - Suave para não esconder a foto */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
        
        {/* Info Footer Minimalista - Apenas Nome e Localização */}
        <div className="absolute bottom-0 left-0 right-0 p-2 z-10">
          <div className="text-left">
            <h3 className="font-serif text-white text-[10px] md:text-sm uppercase tracking-wider leading-tight drop-shadow-md">
              {data.display_name}
            </h3>
            <p className="text-slate-400 text-[8px] md:text-[10px] font-light truncate tracking-wide mt-0.5">
              {data.neighborhood ? `${data.neighborhood}, ${data.city}` : data.city}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProfileCard;
