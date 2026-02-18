
import React, { useEffect, useState, useMemo } from 'react';
import ProfileCard from '../components/ProfileCard';
import { Companion } from '../types';
import { getCompanions } from '../services/supabaseClient';
import SEO from '../components/SEO';
import { useLanguage } from '../contexts/LanguageContext';

// Algoritmo de Shuffle persistente por sessão
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const Home: React.FC = () => {
  const { t } = useLanguage();
  const [companions, setCompanions] = useState<Companion[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'vip' | 'destaque' | 'novata'>('all');
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getCompanions();
      
      const SESSION_KEY = 'panteras_sort_order';
      const storedOrder = sessionStorage.getItem(SESSION_KEY);
      
      if (storedOrder) {
        try {
          const ids = JSON.parse(storedOrder);
          const dataMap = new Map(data.map(c => [c.id, c]));
          const sorted = ids.map((id: string) => dataMap.get(id)).filter(Boolean);
          const extras = data.filter(c => !ids.includes(c.id));
          setCompanions([...sorted, ...extras]);
        } catch {
          const shuffled = shuffleArray(data);
          setCompanions(shuffled);
          sessionStorage.setItem(SESSION_KEY, JSON.stringify(shuffled.map(c => c.id)));
        }
      } else {
        const shuffled = shuffleArray(data);
        setCompanions(shuffled);
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(shuffled.map(c => c.id)));
      }
      setLoading(false);
    };
    
    fetchData();
  }, []);

  const filteredList = useMemo(() => {
    const now = new Date();
    return companions.filter(c => {
      if (categoryFilter === 'vip') return c.is_vip;
      if (categoryFilter === 'novata') return (now.getTime() - new Date(c.created_at).getTime()) < (7 * 24 * 60 * 60 * 1000);
      if (categoryFilter === 'destaque') return c.featured_until && new Date(c.featured_until) > now;
      return true;
    });
  }, [companions, categoryFilter]);

  return (
    <div className="pb-20">
      <SEO title={t('seo.home.title')} description={t('seo.home.desc')} />
      
      {/* Filtros Premium */}
      <nav className="sticky top-14 md:top-16 z-40 bg-midnight/90 backdrop-blur-xl border-b border-gold-900/30 shadow-2xl">
        <div className="max-w-6xl mx-auto px-4 py-3 flex gap-3 overflow-x-auto no-scrollbar">
          <FilterButton label={t('home.filters.all')} active={categoryFilter === 'all'} onClick={() => setCategoryFilter('all')} />
          <FilterButton label={`💎 ${t('home.filters.vip')}`} active={categoryFilter === 'vip'} onClick={() => setCategoryFilter('vip')} />
          <FilterButton label={`✨ ${t('home.filters.featured')}`} active={categoryFilter === 'destaque'} onClick={() => setCategoryFilter('destaque')} />
          <FilterButton label={`🆕 ${t('home.filters.new')}`} active={categoryFilter === 'novata'} onClick={() => setCategoryFilter('novata')} />
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-2 md:px-4 mt-8">
        <div className="flex items-center justify-between mb-6 border-l-4 border-gold-500 pl-4">
           <h2 className="font-serif text-xl md:text-2xl text-white">
             {t(`home.filters.${categoryFilter === 'all' ? 'all' : categoryFilter}`)}
             <span className="ml-3 text-[0.6rem] text-gold-500 font-sans tracking-widest uppercase opacity-70">
               {loading ? '...' : `${filteredList.length} Perfis`}
             </span>
           </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1.5 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="aspect-[3/4] bg-slate-900 animate-pulse rounded-lg border border-white/5" />)}
          </div>
        ) : (
          <section className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1.5 md:gap-6 lg:gap-8 animate-fade-in">
            {filteredList.map(companion => (
              <ProfileCard key={companion.id} data={companion} image={companion.image_url} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

const FilterButton: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`whitespace-nowrap px-6 py-2 rounded-full text-[0.65rem] font-bold uppercase tracking-widest transition-all duration-500 border ${
      active ? 'bg-gold-500 text-black border-gold-500 shadow-lg shadow-gold-500/20' : 'bg-slate-900/50 text-slate-400 border-white/10 hover:border-gold-500/50 hover:text-white'
    }`}
  >
    {label}
  </button>
);

export default Home;
