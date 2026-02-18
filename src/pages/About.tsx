import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = t('about.title') + " | Panteras BSB";
    window.scrollTo(0, 0);
  }, [t]);

  return (
    <div className="pb-24 bg-midnight min-h-screen">
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-slate-900 to-midnight border-b border-gold-500/20">
        <div className="max-w-5xl mx-auto px-4 py-16 md:py-24 text-center">
          <div className="inline-block mb-4 px-4 py-1 bg-gold-500/10 border border-gold-500/30 rounded-full">
            <span className="text-gold-400 text-xs font-bold uppercase tracking-widest">{t('about.title')}</span>
          </div>
          
          <h1 className="font-serif text-4xl md:text-6xl text-white mb-6 drop-shadow-lg leading-tight">
            {t('about.hero_title')} <span className="text-gold-500">Panteras BSB</span>
          </h1>
          
          <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light">
            {t('about.hero_desc')}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">

        {/* Manifesto */}
        <section className="py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl text-gold-500 mb-6">{t('about.mission_title')}</h2>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  {t('about.mission_text')}
                </p>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-gold-500/20 rounded-2xl p-8 shadow-2xl">
              <div className="grid grid-cols-2 gap-6">
                <StatCard number="200+" label={t('about.stats.profiles')} />
                <StatCard number="50k+" label={t('about.stats.visitors')} />
                <StatCard number="100%" label={t('about.stats.compliance')} />
                <StatCard number="24/7" label="Support" />
              </div>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-16 border-t border-slate-800">
          <h2 className="font-serif text-3xl text-gold-500 mb-12 text-center">{t('about.values.title')}</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <ValueCard 
              icon="🔒"
              title={t('about.values.discretion')}
              description=""
            />
            <ValueCard 
              icon="✨"
              title={t('about.values.curation')}
              description=""
            />
            <ValueCard 
              icon="⚡"
              title={t('about.values.tech')}
              description=""
            />
          </div>
        </section>

        {/* Contato */}
        <section className="py-16 border-t border-slate-800">
          <div className="text-center">
            <h3 className="font-serif text-2xl text-gold-500 mb-4">{t('about.contact')}</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="mailto:contato@panterasbsb.com"
                className="text-gold-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <span>📧</span> contato@panterasbsb.com
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

// Componentes Auxiliares
const StatCard: React.FC<{ number: string; label: string }> = ({ number, label }) => (
  <div className="text-center">
    <div className="text-3xl font-bold text-gold-400 mb-1">{number}</div>
    <div className="text-xs text-slate-400 uppercase tracking-wider">{label}</div>
  </div>
);

const ValueCard: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-slate-900/50 border border-slate-800 hover:border-gold-500/30 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/10">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-gold-400 font-serif text-xl mb-3">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
  </div>
);

export default About;