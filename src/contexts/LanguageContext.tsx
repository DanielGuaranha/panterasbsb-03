import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  // Atualizado para retornar any, permitindo arrays e objetos, não apenas strings
  t: (path: string, fallback?: any) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('pt');

  useEffect(() => {
    const savedLang = localStorage.getItem('panteras_lang') as Language;
    if (savedLang && (savedLang === 'pt' || savedLang === 'en')) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('panteras_lang', lang);
  };

  // Função robusta que navega pelo objeto de traduções (ex: "home.hero.title")
  const t = (path: string, fallback?: any): any => {
    const keys = path.split('.');
    let current: any = translations[language];

    for (const key of keys) {
      if (current === undefined || current[key] === undefined) {
        // Warn in dev mode to help debug missing keys
        if (process.env.NODE_ENV === 'development') {
            console.warn(`Missing translation for key: ${path} in language: ${language}`);
        }
        return fallback !== undefined ? fallback : path;
      }
      current = current[key];
    }

    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};