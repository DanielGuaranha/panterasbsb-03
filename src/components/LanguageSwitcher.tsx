import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-slate-900/50 border border-gold-500/20 rounded-full px-2 py-1 transition-all hover:border-gold-500/50">
      <button
        onClick={() => setLanguage('pt')}
        className={`
          text-[0.6rem] md:text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full transition-all duration-300
          ${language === 'pt' 
            ? 'text-black bg-gold-500 shadow-[0_0_10px_rgba(212,175,55,0.4)]' 
            : 'text-slate-500 hover:text-gold-200'
          }
        `}
      >
        PT
      </button>
      
      <div className="w-[1px] h-3 bg-slate-700/50" />
      
      <button
        onClick={() => setLanguage('en')}
        className={`
          text-[0.6rem] md:text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full transition-all duration-300
          ${language === 'en' 
            ? 'text-black bg-gold-500 shadow-[0_0_10px_rgba(212,175,55,0.4)]' 
            : 'text-slate-500 hover:text-gold-200'
          }
        `}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
