import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Companion } from '../types';
import { getCompanions } from '../services/supabaseClient';

// Fisher-Yates Shuffle Algorithm
function fisherYatesShuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

type CategoryFilter = 'all' | 'vip' | 'destaque' | 'novata';

interface FilterContextType {
  companions: Companion[];
  shuffledCompanions: Companion[];
  filteredList: Companion[];
  categoryFilter: CategoryFilter;
  selectedCity: string;
  selectedNeighborhood: string;
  uniqueCities: string[];
  uniqueNeighborhoods: string[];
  loading: boolean;
  setCategoryFilter: (category: CategoryFilter) => void;
  setSelectedCity: (city: string) => void;
  setSelectedNeighborhood: (neighborhood: string) => void;
  handleClearFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [companions, setCompanions] = useState<Companion[]>([]);
  const [shuffledCompanions, setShuffledCompanions] = useState<Companion[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCompanions().then((data) => {
      setCompanions(data);
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
          const newItems = Array.from(dataMap.values());
          const shuffledNewItems = fisherYatesShuffle(newItems);
          
          finalOrder = [...finalOrder, ...shuffledNewItems];
          
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
      setLoading(false);
    });
  }, []);

  // Reset logic
  useEffect(() => {
    setSelectedNeighborhood('');
  }, [selectedCity]);

  // Memoized Data
  const uniqueCities = useMemo(() => {
    const cities = shuffledCompanions.map(c => c.city).filter(Boolean);
    return Array.from(new Set(cities)).sort();
  }, [shuffledCompanions]);

  const uniqueNeighborhoods = useMemo(() => {
    let filtered = shuffledCompanions;
    if (selectedCity) {
      filtered = filtered.filter(c => c.city === selectedCity);
    }
    const hoods = filtered.map(c => c.neighborhood).filter(Boolean);
    return Array.from(new Set(hoods)).sort();
  }, [shuffledCompanions, selectedCity]);

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

    if (selectedCity) {
      list = list.filter(c => c.city === selectedCity);
    }

    if (selectedNeighborhood) {
      list = list.filter(c => c.neighborhood === selectedNeighborhood);
    }
    return list;
  }, [shuffledCompanions, categoryFilter, selectedCity, selectedNeighborhood]);

  const handleClearFilters = () => {
    setCategoryFilter('all');
    setSelectedCity('');
    setSelectedNeighborhood('');
  };

  return (
    <FilterContext.Provider value={{
      companions,
      shuffledCompanions,
      filteredList,
      categoryFilter,
      selectedCity,
      selectedNeighborhood,
      uniqueCities,
      uniqueNeighborhoods,
      loading,
      setCategoryFilter,
      setSelectedCity,
      setSelectedNeighborhood,
      handleClearFilters
    }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};
