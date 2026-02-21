import React, { useRef, useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

type CategoryFilter = 'all' | 'vip' | 'destaque' | 'novata';

interface FilterBarProps {
  categoryFilter: CategoryFilter;
  setCategoryFilter: (filter: CategoryFilter) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedNeighborhood: string;
  setSelectedNeighborhood: (neighborhood: string) => void;
  uniqueCities: string[];
  uniqueNeighborhoods: string[];
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  resultCount: number;
}

const FilterBar: React.FC<FilterBarProps> = ({
  categoryFilter,
  setCategoryFilter,
  selectedCity,
  setSelectedCity,
  selectedNeighborhood,
  setSelectedNeighborhood,
  uniqueCities,
  uniqueNeighborhoods,
  hasActiveFilters,
  onClearFilters,
  resultCount,
}) => {
  const { t } = useLanguage();
  const [showLocationPanel, setShowLocationPanel] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  // Scroll active filter into view on mount/change
  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const el = activeRef.current;
      const containerRect = container.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      
      if (elRect.left < containerRect.left || elRect.right > containerRect.right) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [categoryFilter]);

  const categories: { key: CategoryFilter; label: string; icon?: string }[] = [
    { key: 'all', label: t('home.filters.all') },
    { key: 'vip', label: t('home.filters.vip'), icon: 'vip' },
    { key: 'destaque', label: t('home.filters.featured'), icon: 'star' },
    { key: 'novata', label: t('home.filters.new'), icon: 'new' },
  ];

  const locationLabel = selectedCity 
    ? selectedNeighborhood 
      ? `${selectedCity}, ${selectedNeighborhood}` 
      : selectedCity
    : null;

  return (
    <nav 
      aria-label="Filtros de busca" 
      className="sticky top-14 md:top-16 z-40 bg-midnight/98 backdrop-blur-xl border-b border-gold-700/20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Category Pills Row */}
        <div className="flex items-center gap-2 px-3 md:px-4 py-2.5">
          <div 
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth flex-1 py-0.5"
          >
            {categories.map((cat) => {
              const isActive = categoryFilter === cat.key;
              return (
                <button
                  key={cat.key}
                  ref={isActive ? activeRef : null}
                  onClick={() => setCategoryFilter(cat.key)}
                  role="tab"
                  aria-selected={isActive}
                  className={`
                    relative flex items-center gap-1.5 whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 shrink-0
                    active:scale-95 touch-manipulation
                    ${isActive 
                      ? 'bg-gold-500 text-midnight shadow-lg shadow-gold-500/25' 
                      : 'bg-obsidian text-slate-400 border border-slate-800 hover:border-gold-700/40 hover:text-gold-300'
                    }
                  `}
                >
                  {cat.icon === 'vip' && <DiamondIcon className={`w-3 h-3 ${isActive ? 'text-midnight' : 'text-gold-500'}`} />}
                  {cat.icon === 'star' && <StarIcon className={`w-3 h-3 ${isActive ? 'text-midnight' : 'text-gold-500'}`} />}
                  {cat.icon === 'new' && <SparkleIcon className={`w-3 h-3 ${isActive ? 'text-midnight' : 'text-emerald-400'}`} />}
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Location Toggle Button */}
          <button
            onClick={() => setShowLocationPanel(!showLocationPanel)}
            className={`
              relative flex items-center gap-1.5 shrink-0 px-3 py-2 rounded-full text-xs font-semibold transition-all duration-200
              active:scale-95 touch-manipulation
              ${showLocationPanel || locationLabel
                ? 'bg-gold-500/15 text-gold-400 border border-gold-500/40' 
                : 'bg-obsidian text-slate-400 border border-slate-800 hover:border-slate-600'
              }
            `}
            aria-label="Filtrar por local"
            aria-expanded={showLocationPanel}
          >
            <MapPinIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {locationLabel || 'Local'}
            </span>
            {locationLabel && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-gold-500 rounded-full" />
            )}
          </button>

          {/* Clear All */}
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="shrink-0 p-2 rounded-full text-slate-500 hover:text-gold-400 hover:bg-obsidian transition-all active:scale-95 touch-manipulation"
              aria-label="Limpar filtros"
            >
              <XIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Active Location Tag - shown inline when location is selected but panel is closed */}
        {locationLabel && !showLocationPanel && (
          <div className="flex items-center gap-2 px-3 md:px-4 pb-2 animate-fade-in">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-500/10 border border-gold-500/20 rounded-full text-[11px] font-medium text-gold-400">
              <MapPinIcon className="w-3 h-3" />
              {locationLabel}
              <button 
                onClick={() => { setSelectedCity(''); setSelectedNeighborhood(''); }}
                className="ml-0.5 hover:text-gold-200 transition-colors"
                aria-label="Remover filtro de local"
              >
                <XIcon className="w-3 h-3" />
              </button>
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              {resultCount} {t('home.filters.showing').toLowerCase()}
            </span>
          </div>
        )}

        {/* Location Dropdown Panel */}
        {showLocationPanel && (
          <div className="border-t border-slate-800/80 animate-fade-in">
            <div className="max-w-6xl mx-auto px-3 md:px-4 py-3 flex flex-col sm:flex-row gap-2.5">
              {/* City Select */}
              <div className="relative flex-1">
                <label className="block text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1.5 px-1">
                  Cidade
                </label>
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full appearance-none bg-obsidian text-slate-200 text-sm font-medium border border-slate-700/80 rounded-xl pl-9 pr-8 py-2.5 focus:outline-none focus:border-gold-500/60 focus:ring-1 focus:ring-gold-500/20 transition-all"
                  >
                    <option value="">{t('home.filters.all_cities')}</option>
                    {uniqueCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
                </div>
              </div>

              {/* Neighborhood Select */}
              <div className="relative flex-1">
                <label className="block text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1.5 px-1">
                  Bairro
                </label>
                <div className="relative">
                  <BuildingIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
                  <select
                    value={selectedNeighborhood}
                    onChange={(e) => setSelectedNeighborhood(e.target.value)}
                    disabled={uniqueNeighborhoods.length === 0}
                    className="w-full appearance-none bg-obsidian text-slate-200 text-sm font-medium border border-slate-700/80 rounded-xl pl-9 pr-8 py-2.5 focus:outline-none focus:border-gold-500/60 focus:ring-1 focus:ring-gold-500/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <option value="">{t('home.filters.all_neighborhoods')}</option>
                    {uniqueNeighborhoods.map(hood => (
                      <option key={hood} value={hood}>{hood}</option>
                    ))}
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
                </div>
              </div>

              {/* Result Count + Done */}
              <div className="flex items-end gap-2 sm:pb-0">
                <button
                  onClick={() => setShowLocationPanel(false)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-gold-500 text-midnight text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-gold-400 active:scale-95 transition-all touch-manipulation shadow-lg shadow-gold-500/20"
                >
                  Ver {resultCount} resultado{resultCount !== 1 ? 's' : ''}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// --- Inline SVG Icons (tiny, no dependency) ---

const DiamondIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.7 3h10.6l4.5 5.3L12 21 2.2 8.3 6.7 3zm-.9 1.5L3 8h3.5l1-3.5H5.8zm5.2 0H8.3l-1 3.5h3.7V4.5zm2 0v3.5h3.7l-1-3.5H13zm5.2 0h-.7l1 3.5H21l-2.8-3.5zM4.1 9.5L12 19l7.9-9.5H4.1z"/>
  </svg>
);

const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const SparkleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L14.09 8.26L20 9.27L15.5 13.97L16.82 20L12 17.27L7.18 20L8.5 13.97L4 9.27L9.91 8.26L12 2z"/>
    <circle cx="19" cy="4" r="1.5"/>
    <circle cx="5" cy="18" r="1"/>
  </svg>
);

const MapPinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const BuildingIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

export default FilterBar;
