import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const STORAGE_KEY = 'panteras_cookie_consent';
const CONSENT_DURATION_DAYS = 365;

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const checkConsent = () => {
      const storedItem = localStorage.getItem(STORAGE_KEY);

      if (!storedItem) {
        return false;
      }

      try {
        const item = JSON.parse(storedItem);
        const now = new Date().getTime();

        // Verifica se o consentimento expirou
        if (now > item.expiry) {
          localStorage.removeItem(STORAGE_KEY);
          return false;
        }

        return true; // Consentimento válido
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
        return false;
      }
    };

    if (!checkConsent()) {
      // Delay para não competir com o LCP da página
      const timer = setTimeout(() => setIsVisible(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setIsVisible(false);
    
    const now = new Date();
    const item = {
      value: 'accepted',
      expiry: now.getTime() + (CONSENT_DURATION_DAYS * 24 * 60 * 60 * 1000),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(item));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 animate-fade-in-up">
      <div className="max-w-6xl mx-auto bg-slate-900/95 backdrop-blur-xl border border-gold-500/20 rounded-xl shadow-2xl p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="text-xs md:text-sm text-slate-300 text-center md:text-left flex-1">
          <p className="leading-relaxed">
            <strong className="text-gold-400 font-serif tracking-wide block mb-1">Privacidade & Transparência</strong>
            {t('cookie.text')}
          </p>
          <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-4">
            <Link to="/termos" className="text-xs text-slate-500 hover:text-gold-300 underline transition-colors">{t('cookie.read_terms')}</Link>
            <Link to="/privacidade" className="text-xs text-slate-500 hover:text-gold-300 underline transition-colors">{t('cookie.privacy_policy')}</Link>
          </div>
        </div>
        <div className="flex gap-3 shrink-0">
          <button 
            onClick={handleAccept} 
            className="bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-black font-bold text-xs px-8 py-3 rounded-lg transition-all shadow-lg shadow-gold-900/20 hover:shadow-gold-500/30 whitespace-nowrap active:scale-95 transform uppercase tracking-widest"
          >
            {t('cookie.accept')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;