import React, { useEffect, useState, useMemo } from 'react';
import ProfileCard from '../components/ProfileCard';
import FilterBar from '../components/FilterBar';
import { Companion } from '../types';
import { getCompanions } from '../services/supabaseClient';
import SEO from '../components/SEO';
import { useLanguage } from '../contexts/LanguageContext';

// Fisher-Yates Shuffle Algorithm
function fisherYatesShuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const Home: React.FC = () => {
  const { t } = useLanguage();
  const [shuffledCompanions, setShuffledCompanions] = useState<Companion[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'vip' | 'destaque' | 'novata'>('all');
  const [selectedState, setSelectedState] = useState<string>('DF');
  const [selectedCity, setSelectedCity] = useState<string>('Brasilia');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('');

  useEffect(() => {
    getCompanions().then((data) => {
      const SESSION_KEY = 'panteras_sort_order';
      const storedOrderJson = sessionStorage.getItem(SESSION_KEY);
      let finalOrder: Companion[] = [];

      if (storedOrderJson) {
        try {
          const storedIds = JSON.parse(storedOrderJson) as string[];
          const dataMap = new Map(data.map(c => [c.id, c]));
          
          // 1. Recupera a ordem salva
          storedIds.forEach(id => {
            if (dataMap.has(id)) {
              finalOrder.push(dataMap.get(id)!);
              dataMap.delete(id);
            }
          });
          
          // 2. Pega os itens restantes (novos) e embaralha antes de adicionar ao final
          // Isso evita que novas modelos fiquem sempre fixas no fim da lista
          const newItems = Array.from(dataMap.values());
          const shuffledNewItems = fisherYatesShuffle(newItems);
          
          finalOrder = [...finalOrder, ...shuffledNewItems];
          
          // Atualiza o storage com a nova lista completa
          sessionStorage.setItem(SESSION_KEY, JSON.stringify(finalOrder.map(c => c.id)));
        } catch (e) {
          finalOrder = fisherYatesShuffle(data);
          sessionStorage.setItem(SESSION_KEY, JSON.stringify(finalOrder.map(c => c.id)));
        }
      } else {
        finalOrder = fisherYatesShuffle(data);
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(finalOrder.map(c => c.id)));
      }
      setShuffledCompanions(finalOrder);
    });
  }, []);

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

  // Reset logic
  useEffect(() => {
    setSelectedCity('');
    setSelectedNeighborhood('');
  }, [selectedState]);

  useEffect(() => {
    setSelectedNeighborhood('');
  }, [selectedCity]);

  // Memoized Data
  const uniqueCities = useMemo(() => {
    let filtered = shuffledCompanions;
    if (selectedState) {
      filtered = filtered.filter(c => c.state === selectedState);
    }
    const cities = filtered.map(c => c.city).filter(Boolean);
    return Array.from(new Set(cities)).sort();
  }, [shuffledCompanions, selectedState]);

  const uniqueNeighborhoods = useMemo(() => {
    let filtered = shuffledCompanions;
    if (selectedState) {
      filtered = filtered.filter(c => c.state === selectedState);
    }
    if (selectedCity) {
      filtered = filtered.filter(c => c.city === selectedCity);
    }
    const hoods = filtered.map(c => c.neighborhood).filter(Boolean);
    return Array.from(new Set(hoods)).sort();
  }, [shuffledCompanions, selectedState, selectedCity]);

  // Filter Logic
  const filteredList = useMemo(() => {
    let list = shuffledCompanions;
    const now = new Date();

    if (categoryFilter === 'vip') {
      list = list.filter(c => c.is_vip);
    } else if (categoryFilter === 'destaque') {
      list = list.filter(c => c.featured_until && new Date(c.featured_until) > now);
    } else if (categoryFilter === 'novata') {
      list = list.filter(c => (now.getTime() - new Date(c.created_at).getTime()) < (4 * 24 * 60 * 60 * 1000));
    }

    if (selectedState) {
      list = list.filter(c => c.state === selectedState);
    }

    if (selectedCity) {
      list = list.filter(c => c.city === selectedCity);
    }

    if (selectedNeighborhood) {
      list = list.filter(c => c.neighborhood === selectedNeighborhood);
    }
    return list;
  }, [shuffledCompanions, categoryFilter, selectedState, selectedCity, selectedNeighborhood]);

  const hasActiveFilters = categoryFilter !== 'all' || selectedState !== 'DF' || selectedCity !== 'Brasilia' || selectedNeighborhood !== '';

  const handleClearFilters = () => {
    setCategoryFilter('all');
    setSelectedState('DF');
    setSelectedCity('Brasilia');
    setSelectedNeighborhood('');
  };

  return (
    <div className="pb-20">
      <SEO 
        title={t('seo.home.title')}
        description={t('seo.home.desc')}
        schema={schemaData}
      />
      
      <FilterBar
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        selectedState={selectedState}
        setSelectedState={setSelectedState}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        selectedNeighborhood={selectedNeighborhood}
        setSelectedNeighborhood={setSelectedNeighborhood}
        uniqueCities={uniqueCities}
        uniqueNeighborhoods={uniqueNeighborhoods}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={handleClearFilters}
        resultCount={filteredList.length}
      />

      <main className="max-w-6xl mx-auto px-2 md:px-4 mt-4">
        <div className="flex items-baseline justify-between mb-4 px-1">
           <h2 className="font-serif text-lg md:text-2xl text-white">
             {categoryFilter === 'all' ? t('home.filters.all') : 
              categoryFilter === 'vip' ? t('home.filters.vip') : 
              categoryFilter === 'destaque' ? t('home.filters.featured') : t('home.filters.new')}
             <span className="ml-2 text-xs text-gold-500 font-sans font-normal tracking-wide">{filteredList.length} {t('home.filters.showing')}</span>
           </h2>
        </div>

        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {filteredList.map((companion, index) => (
            <ProfileCard 
              key={companion.id} 
              data={companion} 
              image={companion.image_url} // FIX: Passa a imagem do banco explicitamente
              priority={index < 4}
            />
          ))}

          {filteredList.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <div className="text-4xl mb-4 grayscale opacity-30">🐆</div>
              <h3 className="text-gold-500 font-serif text-xl mb-2">{t('home.empty_state.title')}</h3>
              <p className="text-slate-500 text-sm mb-6">{t('home.empty_state.desc')}</p>
              <button 
                onClick={handleClearFilters}
                className="px-6 py-2 bg-gold-600 text-black text-xs font-bold uppercase tracking-widest rounded hover:bg-gold-500 transition-colors shadow-lg shadow-gold-900/20"
              >
                {t('home.empty_state.button')}
              </button>
            </div>
          )}
        </section>
      </main>

      <section className="max-w-6xl mx-auto px-4 py-12 mt-12 border-t border-gray-800/50 bg-slate-900/20 rounded-xl mb-4">
        <h1 className="font-serif text-xl text-gold-500 mb-3 drop-shadow-lg">
          {t('home.hero.title')}
        </h1>
        <article className="prose prose-invert prose-sm max-w-none text-slate-400">
          <p dangerouslySetInnerHTML={{ __html: t('home.hero.desc_1') }}></p>
          <p dangerouslySetInnerHTML={{ __html: t('home.hero.desc_2') }}></p>
        </article>
      </section>
    </div>
  );
};

export default Home;
