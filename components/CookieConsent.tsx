import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check local storage to see if consent was already given
    const consent = localStorage.getItem('panteras_cookie_consent');
    
    // Only show if consent is not explicitly 'accepted'
    if (consent !== 'accepted') {
      // Small delay to prevent layout thrashing on immediate load
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('panteras_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 animate-fade-in-up">
      <div className="max-w-6xl mx-auto bg-slate-900/95 backdrop-blur-md border border-gold-500/20 rounded-lg shadow-2xl p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-xs md:text-sm text-slate-300 text-center md:text-left">
          <p>
            <strong className="text-gold-400">Privacidade em primeiro lugar.</strong> Utilizamos cookies mínimos essenciais para garantir o funcionamento seguro e rápido do site, conforme a LGPD. Não vendemos seus dados.
          </p>
          <div className="mt-1">
            <Link to="/termos" className="text-slate-500 hover:text-gold-300 underline mr-4 transition-colors">Ler Termos</Link>
            <Link to="/privacidade" className="text-slate-500 hover:text-gold-300 underline transition-colors">Política de Dados</Link>
          </div>
        </div>
        
        <div className="flex gap-3 shrink-0">
          <button 
            onClick={handleAccept}
            className="bg-gold-600 hover:bg-gold-500 text-black font-bold text-xs px-6 py-2.5 rounded transition-colors shadow-lg shadow-gold-900/20 whitespace-nowrap"
          >
            Concordar e Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;