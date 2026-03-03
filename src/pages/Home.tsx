import React, { useState, useRef, useEffect } from 'react';
import ProfileCard from '../components/ProfileCard';
import SEO from '../components/SEO';
import { useLanguage } from '../contexts/LanguageContext';
import { useFilters } from '../contexts/FilterContext';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const { 
    filteredList, 
    categoryFilter, 
    setCategoryFilter, 
    selectedCity, 
    setSelectedCity, 
    selectedNeighborhood, 
    setSelectedNeighborhood, 
    uniqueCities, 
    uniqueNeighborhoods,
    handleClearFilters,
    loading
  } = useFilters();

  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "name": t('seo.home.title'),
        "description": t('seo.home.desc'),
        "url": "https://panterasbsb.com",
        "inLanguage": "pt-BR",
        "isPartOf": {
          "@type": "WebSite",
          "name": "Panteras BSB",
          "url": "https://panterasbsb.com"
        }
      }
    ]
  };

  const hasActiveFilters = categoryFilter !== 'all' || selectedCity !== '' || selectedNeighborhood !== '';

  // Close filters when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node) && showFilters) {
        setShowFilters(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showFilters]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-midnight">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-gold-500/30 border-t-gold-500 rounded-full animate-spin mb-4"></div>
          <span className="text-gold-500 font-serif text-sm tracking-widest animate-pulse">CARREGANDO...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20 min-h-screen bg-midnight">
      <SEO 
        title={t('seo.home.title')}
        description={t('seo.home.desc')}
        schema={schemaData}
      />
      
      {/* Hero Section */}
      <section className="relative h-[45vh] md:h-[50vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden border-b border-white/5 bg-gradient-to-b from-midnight via-slate-900/50 to-midnight">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gold-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 animate-fade-in-up max-w-2xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-gold-400 text-[0.6rem] font-bold uppercase tracking-[0.2em] mb-4 backdrop-blur-sm shadow-lg shadow-black/20">
            Exclusive Directory
          </span>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-slate-400 mb-4 drop-shadow-xl tracking-tight">
            {t('home.hero.title')}
          </h1>
          <p className="text-slate-400 text-sm md:text-lg max-w-xl mx-auto font-light leading-relaxed px-4">
             <span dangerouslySetInnerHTML={{ __html: t('home.hero.desc_1') }} />
          </p>
        </div>
      </section>

      {/* Filter Bar - Redesigned for Mobile Usability */}
      <div className="sticky top-14 md:top-16 z-40 bg-midnight/80 backdrop-blur-xl border-b border-white/5 shadow-2xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          
          {/* Active Filter Summary (Mobile) */}
          <div className="md:hidden flex items-center gap-2 overflow-hidden">
             <span className="text-xs text-gold-500 font-bold uppercase tracking-wider whitespace-nowrap">
               {categoryFilter === 'all' ? t('home.filters.all') : 
                categoryFilter === 'vip' ? t('home.filters.vip') : 
                categoryFilter === 'destaque' ? t('home.filters.featured') : t('home.filters.new')}
             </span>
             {(selectedCity || selectedNeighborhood) && (
               <>
                 <span className="text-slate-600">•</span>
                 <span className="text-xs text-slate-300 truncate">
                   {selectedNeighborhood || selectedCity}
                 </span>
               </>
             )}
          </div>

          {/* Desktop Categories */}
          <div className="hidden md:flex items-center gap-2">
            <FilterButton label={t('home.filters.all')} active={categoryFilter === 'all'} onClick={() => setCategoryFilter('all')} />
            <FilterButton label={`💎 ${t('home.filters.vip')}`} active={categoryFilter === 'vip'} onClick={() => setCategoryFilter('vip')} />
            <FilterButton label={`✨ ${t('home.filters.featured')}`} active={categoryFilter === 'destaque'} onClick={() => setCategoryFilter('destaque')} />
            <FilterButton label={`🆕 ${t('home.filters.new')}`} active={categoryFilter === 'novata'} onClick={() => setCategoryFilter('novata')} />
          </div>

          {/* Filter Trigger Button */}
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all
              ${showFilters || hasActiveFilters 
                ? 'bg-gold-500 text-black border-gold-500 shadow-lg shadow-gold-500/20' 
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-gold-500/50'
              }
            `}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            <span>{t('home.filters.location')}</span>
            {hasActiveFilters && (
              <span className="flex h-2 w-2 rounded-full bg-black ml-1"></span>
            )}
          </button>
        </div>

        {/* Filter Modal/Dropdown */}
        {showFilters && (
          <div className="absolute top-full left-0 w-full bg-midnight/95 backdrop-blur-xl border-b border-white/10 shadow-2xl p-6 animate-fade-in origin-top z-50" ref={filterRef}>
            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
              
              {/* Mobile Categories (Visible only on mobile inside modal) */}
              <div className="md:hidden space-y-3">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Categorias</h3>
                <div className="grid grid-cols-2 gap-2">
                  <FilterButton label={t('home.filters.all')} active={categoryFilter === 'all'} onClick={() => setCategoryFilter('all')} fullWidth />
                  <FilterButton label={`💎 ${t('home.filters.vip')}`} active={categoryFilter === 'vip'} onClick={() => setCategoryFilter('vip')} fullWidth />
                  <FilterButton label={`✨ ${t('home.filters.featured')}`} active={categoryFilter === 'destaque'} onClick={() => setCategoryFilter('destaque')} fullWidth />
                  <FilterButton label={`🆕 ${t('home.filters.new')}`} active={categoryFilter === 'novata'} onClick={() => setCategoryFilter('novata')} fullWidth />
                </div>
              </div>

              {/* Location Filters */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{t('home.filters.all_cities')}</h3>
                <select 
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-slate-800 text-slate-200 text-sm border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/50 transition-all"
                >
                  <option value="">{t('home.filters.all_cities')}</option>
                  {uniqueCities.map(city => <option key={city} value={city}>{city}</option>)}
                </select>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{t('home.filters.all_neighborhoods')}</h3>
                <select 
                  value={selectedNeighborhood}
                  onChange={(e) => setSelectedNeighborhood(e.target.value)}
                  disabled={uniqueNeighborhoods.length === 0}
                  className="w-full bg-slate-800 text-slate-200 text-sm border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/50 disabled:opacity-50 transition-all"
                >
                  <option value="">{t('home.filters.all_neighborhoods')}</option>
                  {uniqueNeighborhoods.map(hood => <option key={hood} value={hood}>{hood}</option>)}
                </select>
              </div>

              {/* Actions */}
              <div className="flex items-end justify-end gap-3">
                <button 
                  onClick={handleClearFilters}
                  className="px-4 py-3 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 text-xs font-bold uppercase tracking-wider transition-all"
                >
                  {t('home.filters.clear')}
                </button>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="px-6 py-3 rounded-lg bg-gold-500 text-black hover:bg-gold-400 text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-gold-500/20 flex-1 md:flex-none"
                >
                  Aplicar Filtros
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <main className="max-w-7xl mx-auto px-2 md:px-6 mt-6 md:mt-8">
        <div className="flex items-baseline justify-between mb-6 px-1">
           <h2 className="font-serif text-xl md:text-3xl text-white flex items-center gap-3">
             {categoryFilter === 'all' ? t('home.filters.all') : 
              categoryFilter === 'vip' ? t('home.filters.vip') : 
              categoryFilter === 'destaque' ? t('home.filters.featured') : t('home.filters.new')}
             <span className="text-xs md:text-sm bg-slate-800 text-gold-500 px-2 py-0.5 rounded-full font-sans font-medium tracking-wide border border-white/5">
               {filteredList.length}
             </span>
           </h2>
        </div>

        {/* Grid Layout - Optimized for Mobile (2 cols) and Desktop (4-5 cols) */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6 lg:gap-8">
          {filteredList.map((companion, index) => (
            <ProfileCard 
              key={companion.id} 
              data={companion} 
              image={companion.image_url} 
              priority={index < 6} // Load first 6 images eagerly (LCP optimization)
            />
          ))}

          {filteredList.length === 0 && (
            <div className="col-span-full py-32 text-center bg-slate-900/30 border border-white/5 rounded-2xl backdrop-blur-sm">
              <div className="text-6xl mb-6 grayscale opacity-20 animate-pulse">🐆</div>
              <h3 className="text-gold-500 font-serif text-2xl mb-3">{t('home.empty_state.title')}</h3>
              <p className="text-slate-500 text-sm mb-8 max-w-md mx-auto leading-relaxed">{t('home.empty_state.desc')}</p>
              <button 
                onClick={handleClearFilters}
                className="px-8 py-3 bg-gold-600 text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-gold-500 transition-all shadow-lg shadow-gold-500/20 hover:shadow-gold-500/40 hover:-translate-y-0.5"
              >
                {t('home.empty_state.button')}
              </button>
            </div>
          )}
        </section>
      </main>

      {/* SEO Content */}
      <section className="max-w-4xl mx-auto px-6 py-16 mt-20 border-t border-white/5 text-center">
        <h2 className="font-serif text-lg text-gold-500/50 mb-4 uppercase tracking-widest text-[0.65rem]">
          Sobre o Panteras BSB
        </h2>
        <article className="prose prose-invert prose-sm max-w-none text-slate-500 font-light">
          <p dangerouslySetInnerHTML={{ __html: t('home.hero.desc_2') }}></p>
        </article>
      </section>
    </div>
  );
};

const FilterButton: React.FC<{ label: string; active: boolean; onClick: () => void; fullWidth?: boolean }> = ({ label, active, onClick, fullWidth }) => (
  <button
    onClick={onClick}
    role="tab"
    aria-selected={active}
    className={`
      whitespace-nowrap px-5 py-2 rounded-full text-[0.65rem] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 border select-none
      ${fullWidth ? 'w-full justify-center' : ''}
      ${active 
        ? 'bg-gold-500 text-black border-gold-500 shadow-[0_0_15px_rgba(212,175,55,0.3)] scale-105' 
        : 'bg-slate-900/50 text-slate-400 border-slate-700 hover:border-gold-500/30 hover:text-gold-200 hover:bg-slate-800'
      }
    `}
  >
    {label}
  </button>
);

export default Home;
