import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatPanelCompanion from '../components/ChatPanelCompanion';
import SEO from '../components/SEO';
import { useLanguage } from '../contexts/LanguageContext';

const CompanionDashboard: React.FC = () => {
  const { companionId } = useParams<{ companionId: string }>();
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-midnight pt-6 pb-20 px-4">
      
      <SEO 
        title={t('seo.dashboard.title')}
        description={t('seo.dashboard.desc')}
        noIndex={true}
      />

      <div className="max-w-6xl mx-auto">
        
        {/* Header Dashboard Demo */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="font-serif text-3xl text-gold-500">{t('dashboard.title')}</h1>
              <span className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-[0.6rem] text-slate-400 uppercase tracking-widest font-bold">
                {t('dashboard.simulation')}
              </span>
            </div>
            <p className="text-slate-400 text-sm font-light max-w-2xl">
              {t('dashboard.subtitle')}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          
          {/* Main Chat Panel (Demo Mode) */}
          <div className="lg:col-span-3">
            <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl shadow-2xl overflow-hidden h-[80vh]">
              <ChatPanelCompanion companionId={companionId || 'demo'} />
            </div>
          </div>

          {/* Safety & Tips Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/50 border border-dashed border-slate-700 p-4 rounded-xl">
              <h4 className="text-gold-500/70 text-[0.65rem] uppercase tracking-widest font-bold mb-4 text-center border-b border-slate-800 pb-2">
                {t('dashboard.tips_title')}
              </h4>
              
              <div className="space-y-4 opacity-75 hover:opacity-100 transition-opacity">
                {/* Card 1 */}
                <div className="bg-slate-900 border border-gold-900/30 p-4 rounded-lg">
                  <h3 className="text-gold-400 font-bold text-xs mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    {t('dashboard.tips.whatsapp.title')}
                  </h3>
                  <p className="text-[0.65rem] text-slate-400 leading-relaxed">
                    {t('dashboard.tips.whatsapp.desc')}
                  </p>
                </div>

                {/* Card 2 */}
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
                  <h3 className="text-slate-200 font-bold text-xs mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                    {t('dashboard.tips.spam.title')}
                  </h3>
                  <p className="text-[0.65rem] text-slate-400 leading-relaxed">
                    {t('dashboard.tips.spam.desc')}
                  </p>
                </div>

                {/* Card 3 */}
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
                  <h3 className="text-slate-200 font-bold text-xs mb-2">{t('dashboard.tips.safety.title')}</h3>
                  <p className="text-[0.65rem] text-slate-400 leading-relaxed">
                    {t('dashboard.tips.safety.desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanionDashboard;