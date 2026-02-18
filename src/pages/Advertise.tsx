import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Advertise: React.FC = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = t('advertise.title_2') + " | Panteras BSB";
  }, [t]);

  const whatsappCandidacyLink = `https://wa.me/5561999999999`;

  return (
    <div className="min-h-screen bg-midnight text-slate-200 pb-20">
      
      {/* Hero Section */}
      <div className="relative pt-16 pb-20 px-4 text-center overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-gold-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-[0.65rem] font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-sm">
            💎 {t('advertise.badge')}
          </span>
          
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight drop-shadow-2xl">
            {t('advertise.title_1')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300">
              {t('advertise.title_2')}
            </span>
          </h1>

          <div className="max-w-2xl mx-auto mb-10 text-slate-300 font-light leading-relaxed text-sm md:text-lg space-y-4">
            <p className="text-lg md:text-xl text-gold-100">
              <strong>{t('advertise.pain_point')}</strong>
            </p>
            <p dangerouslySetInnerHTML={{ __html: t('advertise.solution') }} />
            <p className="text-slate-400 text-sm md:text-base">
              🚫 <strong>{t('advertise.not_agency')}</strong>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href={whatsappCandidacyLink}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-500 text-black font-bold uppercase tracking-widest rounded shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:brightness-110 transition-all transform hover:-translate-y-1 text-center flex justify-center items-center gap-2"
            >
              {t('advertise.cta_whatsapp')}
            </a>
            <a 
              href="#planos"
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 border border-slate-700 text-slate-300 font-bold uppercase tracking-widest rounded hover:bg-slate-800 hover:text-white hover:border-gold-500/30 transition-all text-center block"
            >
              {t('advertise.cta_plans')}
            </a>
          </div>
        </div>
      </div>

      {/* Section: Benefícios */}
      <div className="bg-[#080808] border-y border-gold-900/10">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="font-serif text-2xl md:text-3xl text-gold-500 mb-3">{t('advertise.benefits_title')}</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <BenefitCard icon="💎" title={t('advertise.benefits.design.title')} desc={t('advertise.benefits.design.desc')} />
            <BenefitCard icon="🛡️" title={t('advertise.benefits.chat.title')} desc={t('advertise.benefits.chat.desc')} />
            <BenefitCard icon="🎯" title={t('advertise.benefits.seo.title')} desc={t('advertise.benefits.seo.desc')} />
            <BenefitCard icon="📊" title={t('advertise.benefits.dash.title')} desc={t('advertise.benefits.dash.desc')} />
            <BenefitCard icon="🇧🇷" title={t('advertise.benefits.legal.title')} desc={t('advertise.benefits.legal.desc')} />
            <BenefitCard icon="💬" title={t('advertise.benefits.support.title')} desc={t('advertise.benefits.support.desc')} />
          </div>
        </div>
      </div>

      {/* Section: Pricing Table */}
      <div className="py-20 px-4" id="planos">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-gold-500 mb-4">{t('advertise.plans_title')}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            <PricingCard 
              name={t('advertise.plan_basic')}
              price="Free"
              period=""
              features={["✅ Perfil Vitrine", "✅ 5 Fotos", "❌ Sem Destaque"]}
              cta="WhatsApp"
              ctaLink={whatsappCandidacyLink}
              highlight={false}
            />

            <PricingCard 
              name={t('advertise.plan_featured')}
              price="R$ 149"
              period="/mês"
              features={["✅ 15 Fotos HD", "✅ Badge Verificada", "✅ Chat Seguro"]}
              cta="WhatsApp"
              ctaLink={whatsappCandidacyLink}
              highlight={false}
            />

            <PricingCard 
              name={t('advertise.plan_vip')}
              price="R$ 299"
              period="/mês"
              features={["✅ Fotos Ilimitadas", "✅ Topo da Home", "✅ Badge Ouro VIP"]}
              cta={t('advertise.cta_vip')}
              ctaLink={whatsappCandidacyLink}
              highlight={true}
              badge={t('advertise.most_popular')}
            />
          </div>
        </div>
      </div>

      {/* Section: FAQ */}
      <div className="py-16 bg-[#080808] border-y border-gold-900/10">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-center font-serif text-3xl text-gold-500 mb-12">{t('advertise.faq_title')}</h2>
          {/* FAQ Content simplified for brevity in this task */}
          <div className="text-center text-slate-500">...</div>
        </div>
      </div>

    </div>
  );
};

const BenefitCard: React.FC<{icon: string, title: string, desc: string}> = ({ icon, title, desc }) => (
  <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-800 hover:border-gold-500/30 transition-all duration-300 group">
    <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
    <h3 className="font-serif text-xl text-gold-400 mb-3">{title}</h3>
    <p className="text-sm text-slate-400 leading-relaxed font-light">{desc}</p>
  </div>
);

const PricingCard: React.FC<{
  name: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  ctaLink: string;
  highlight: boolean;
  badge?: string;
}> = ({ name, price, period, features, cta, ctaLink, highlight, badge }) => (
  <div className={`relative rounded-2xl p-8 transition-all duration-300 ${
    highlight 
      ? 'bg-gradient-to-br from-gold-900/30 to-gold-800/20 border-2 border-gold-500 shadow-2xl shadow-gold-500/20 scale-105' 
      : 'bg-slate-900/50 border border-slate-800 hover:border-gold-500/30'
  }`}>
    {badge && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold-500 text-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg">
        {badge}
      </div>
    )}
    
    <h3 className="text-2xl font-serif text-gold-400 mb-2">{name}</h3>
    <div className="mb-6">
      <span className="text-4xl font-bold text-white">{price}</span>
      <span className="text-slate-400">{period}</span>
    </div>
    
    <ul className="space-y-3 mb-8 text-sm">
      {features.map((feature, idx) => (
        <li key={idx} className={feature.startsWith('✅') ? 'text-slate-300' : 'text-slate-500'}>
          {feature}
        </li>
      ))}
    </ul>
    
    <a 
      href={ctaLink}
      target="_blank"
      rel="noreferrer"
      className={`block w-full py-3 rounded-lg font-bold text-center transition-all ${
        highlight
          ? 'bg-gold-500 text-black hover:bg-gold-400 shadow-lg'
          : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700'
      }`}
    >
      {cta}
    </a>
  </div>
);

export default Advertise;