import React, { useRef, useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

type CategoryFilter = 'all' | 'vip' | 'destaque' | 'novata';

interface FilterBarProps {
  categoryFilter: CategoryFilter;
  setCategoryFilter: (filter: CategoryFilter) => void;
  selectedState: string;
  setSelectedState: (state: string) => void;
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

const STATES = [
  { value: 'DF', label: 'DF - Distrito Federal' },
  { value: 'GO', label: 'GO - Goias' },
];

const FilterBar: React.FC<FilterBarProps> = ({
  categoryFilter,
  setCategoryFilter,
  selectedState,
  setSelectedState,
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

  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const el = activeRef.current;
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [categoryFilter]);

  const categories: { key: CategoryFilter; label: string }[] = [
    { key: 'all', label: t('home.filters.all') },
    { key: 'vip', label: 'VIP' },
    { key: 'destaque', label: t('home.filters.featured') },
    { key: 'novata', label: t('home.filters.new') },
  ];

  const stateLabel = STATES.find(s => s.value === selectedState)?.value || '';
  const locationSummary = [
    stateLabel,
    selectedCity,
    selectedNeighborhood,
  ].filter(Boolean).join(' / ');

  return (
    <nav
      aria-label="Filtros de busca"
      className="sticky top-14 md:top-16 z-40 bg-[#0a0a0a]/95 backdrop-blur-lg border-b border-[#d4af37]/10"
    >
      <div className="max-w-6xl mx-auto">

        {/* Row 1: Category pills + location toggle */}
        <div className="flex items-center gap-2 px-3 py-2">

          {/* Category pills - horizontal scroll */}
          <div
            ref={scrollRef}
            className="flex gap-1.5 overflow-x-auto flex-1 py-0.5"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {categories.map((cat) => {
              const isActive = categoryFilter === cat.key;
              return (
                <button
                  key={cat.key}
                  ref={isActive ? activeRef : null}
                  onClick={() => setCategoryFilter(cat.key)}
                  className={`
                    whitespace-nowrap px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-150 shrink-0
                    ${isActive
                      ? 'bg-[#d4af37] text-[#0a0a0a] shadow-md shadow-[#d4af37]/20'
                      : 'bg-[#1a1a1a] text-[#8a8a8a] border border-[#2a2a2a] active:bg-[#222]'
                    }
                  `}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Location button */}
          <button
            onClick={() => setShowLocationPanel(!showLocationPanel)}
            className={`
              flex items-center gap-1.5 shrink-0 px-2.5 py-1.5 rounded-full text-[11px] font-semibold transition-all
              ${showLocationPanel || selectedCity
                ? 'bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30'
                : 'bg-[#1a1a1a] text-[#8a8a8a] border border-[#2a2a2a]'
              }
            `}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="hidden sm:inline">{locationSummary || 'Local'}</span>
            {selectedCity && (
              <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full sm:hidden" />
            )}
          </button>

          {/* Clear filters */}
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="shrink-0 p-1.5 rounded-full text-[#666] hover:text-[#d4af37] transition-colors"
              aria-label="Limpar filtros"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Active location tag - visible when panel closed and location selected */}
        {locationSummary && !showLocationPanel && (
          <div className="flex items-center gap-2 px-3 pb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#d4af37]/10 border border-[#d4af37]/15 rounded-full text-[10px] font-medium text-[#d4af37]/80">
              <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              {locationSummary}
              <button
                onClick={() => { setSelectedState('DF'); setSelectedCity(''); setSelectedNeighborhood(''); }}
                className="ml-0.5 hover:text-white transition-colors"
              >
                <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
            <span className="text-[10px] text-[#555]">{resultCount} {t('home.filters.showing').toLowerCase()}</span>
          </div>
        )}

        {/* Location panel */}
        {showLocationPanel && (
          <div className="border-t border-[#1a1a1a] px-3 py-3 space-y-3">

            {/* State chips */}
            <div>
              <span className="block text-[9px] uppercase tracking-[0.15em] text-[#555] font-bold mb-1.5">Estado</span>
              <div className="flex gap-2">
                {STATES.map((st) => (
                  <button
                    key={st.value}
                    onClick={() => setSelectedState(st.value)}
                    className={`
                      flex-1 py-2 rounded-lg text-xs font-bold text-center transition-all
                      ${selectedState === st.value
                        ? 'bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/40'
                        : 'bg-[#141414] text-[#666] border border-[#222] active:bg-[#1a1a1a]'
                      }
                    `}
                  >
                    {st.value}
                  </button>
                ))}
              </div>
            </div>

            {/* City + Neighborhood */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="block text-[9px] uppercase tracking-[0.15em] text-[#555] font-bold mb-1.5">Cidade</span>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-[#141414] text-[#ccc] text-xs border border-[#222] rounded-lg px-3 py-2.5 appearance-none focus:outline-none focus:border-[#d4af37]/50"
                >
                  <option value="">{t('home.filters.all_cities')}</option>
                  {uniqueCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-[0.15em] text-[#555] font-bold mb-1.5">Bairro</span>
                <select
                  value={selectedNeighborhood}
                  onChange={(e) => setSelectedNeighborhood(e.target.value)}
                  disabled={uniqueNeighborhoods.length === 0}
                  className="w-full bg-[#141414] text-[#ccc] text-xs border border-[#222] rounded-lg px-3 py-2.5 appearance-none focus:outline-none focus:border-[#d4af37]/50 disabled:opacity-30"
                >
                  <option value="">{t('home.filters.all_neighborhoods')}</option>
                  {uniqueNeighborhoods.map(hood => (
                    <option key={hood} value={hood}>{hood}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action button */}
            <button
              onClick={() => setShowLocationPanel(false)}
              className="w-full py-2.5 bg-[#d4af37] text-[#0a0a0a] text-xs font-bold uppercase tracking-widest rounded-lg active:scale-[0.98] transition-transform shadow-lg shadow-[#d4af37]/10"
            >
              Ver {resultCount} resultado{resultCount !== 1 ? 's' : ''}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default FilterBar;
