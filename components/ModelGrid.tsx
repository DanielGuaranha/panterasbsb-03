
import React from 'react';

interface Model {
  id: string;
  name: string;
  location: string;
  image: string;
  is_vip: boolean;
  slug: string;
}

interface ModelCardProps {
  model: Model;
}

const ModelCard: React.FC<ModelCardProps> = ({ model }) => {
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-slate-900 group cursor-pointer active:scale-95 transition-all duration-200 shadow-lg border border-white/5">
      {/* Background Image */}
      <img
        src={model.image}
        alt={model.name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />

      {/* Luxury Scrim Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent opacity-90" />

      {/* VIP Badge - Minimalista */}
      {model.is_vip && (
        <div className="absolute left-1.5 top-1.5 z-10">
          <div className="bg-amber-500 shadow-lg px-1.5 py-0.5 rounded-sm border border-amber-400/50">
            <p className="text-[7px] font-black uppercase tracking-tighter text-black leading-none">VIP</p>
          </div>
        </div>
      )}

      {/* Info Footer Clean */}
      <div className="absolute bottom-0 left-0 right-0 p-1.5 md:p-3 flex flex-col justify-end">
        <h3 className="font-serif text-white leading-tight tracking-wide text-[10px] sm:text-sm uppercase truncate drop-shadow-md">
          {model.name}
        </h3>
        <p className="text-slate-400 font-sans text-[8px] sm:text-[10px] font-light leading-none truncate tracking-widest uppercase mt-0.5">
          {model.location}
        </p>
      </div>
      
      {/* Subtle border overlay */}
      <div className="absolute inset-0 border border-white/5 rounded-lg pointer-events-none" />
    </div>
  );
};

export const ModelGrid: React.FC<{ models: Model[] }> = ({ models }) => {
  return (
    <div className="w-full bg-midnight py-2">
      <div className="mx-auto max-w-[1400px] px-1.5 sm:px-4">
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1.5 sm:gap-4">
          {models.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelGrid;
