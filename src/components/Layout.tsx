import React from 'react';
import { Link } from 'react-router-dom';
import CookieConsent from './CookieConsent';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-midnight font-sans selection:bg-gold-500 selection:text-black">
      {/* Header Global Sticky */}
      <header className="sticky top-0 w-full z-[60] bg-midnight/95 backdrop-blur-md border-b border-gold-900/30 h-14 md:h-16 shadow-lg shadow-black/20">
        <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex flex-col items-center group relative">
            <span className="font-serif text-xl md:text-2xl text-gold-500 font-bold tracking-widest group-hover:text-gold-300 transition-colors drop-shadow-sm">
              PANTERAS
            </span>
            <span className="text-[0.5rem] md:text-[0.55rem] text-gold-200/80 uppercase tracking-[0.3em] absolute -bottom-2 md:-bottom-2.5">
              Brasília
            </span>
          </Link>

          {/* Navigation Actions */}
          <nav className="flex items-center gap-3 md:gap-5">
            
            <LanguageSwitcher />

            <div className="h-4 w-[1px] bg-slate-700 hidden md:block"></div>

            <Link 
              to="/login" 
              className="text-xs font-medium text-slate-400 hover:text-white uppercase tracking-widest transition-colors hidden md:block"
            >
              {t('nav.enter')}
            </Link>

            <Link 
              to="/anunciar" 
              className="
                px-4 py-1.5 md:px-5 md:py-2 rounded-full 
                border border-gold-500/40 
                text-gold-400 text-[0.6rem] md:text-xs font-bold uppercase tracking-widest
                hover:bg-gold-500 hover:text-black hover:border-gold-500 
                hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]
                transition-all duration-300 ease-out
              "
            >
              {t('nav.advertise')}
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#050505] border-t border-gold-900/20 pt-16 pb-24 md:pb-16 mt-auto relative z-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10 md:gap-8 mb-10 text-center md:text-left">
            
            {/* Brand */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="font-serif text-gold-600/80 mb-4 text-lg">Panteras BSB</h3>
              <p className="text-slate-500 text-xs leading-relaxed max-w-xs mx-auto md:mx-0 font-light">
                {t('footer.brand_desc')}
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-gold-500/60 text-xs font-bold uppercase tracking-widest mb-4">{t('footer.institutional')}</h4>
              <ul className="space-y-2 text-xs text-slate-400 font-light">
                <li><Link to="/sobre" className="hover:text-gold-400 transition-colors">{t('footer.about')}</Link></li>
                <li><Link to="/termos" className="hover:text-gold-400 transition-colors">{t('footer.terms')}</Link></li>
                <li><Link to="/privacidade" className="hover:text-gold-400 transition-colors">{t('footer.privacy')}</Link></li>
              </ul>
            </div>

            {/* Compliance */}
            <div>
              <h4 className="text-gold-500/60 text-xs font-bold uppercase tracking-widest mb-4">{t('footer.compliance')}</h4>
              <ul className="space-y-2 text-xs text-slate-400 font-light">
                <li className="flex items-center justify-center md:justify-start gap-2 text-red-400/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> {t('footer.legal_age')}
                </li>
                <li>{t('footer.not_agency')}</li>
                <li>{t('footer.lgpd')}</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-600 text-[0.65rem]">
              &copy; {new Date().getFullYear()} Panteras BSB. {t('footer.rights')}
            </p>
            
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Social Icons (Keeping static for now as icons don't need translation) */}
              <div className="flex items-center gap-5">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-gold-500 transition-colors" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.153 1.772c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468.99c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                </a>
                {/* Other icons omitted for brevity, logic remains same */}
              </div>
              
              <div className="hidden md:block w-[1px] h-3 bg-slate-800"></div>

              {/* Link discreto para Demo do Painel */}
              <div className="flex items-center gap-3">
                <Link to="/painel/1" className="text-[0.65rem] text-slate-700 hover:text-slate-500 uppercase tracking-widest">
                  {t('nav.demo')}
                </Link>
                <Link to="/login" className="text-[0.65rem] text-slate-700 hover:text-slate-500 uppercase tracking-widest flex items-center gap-1">
                   <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                   {t('nav.admin')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <CookieConsent />
    </div>
  );
};

export default Layout;