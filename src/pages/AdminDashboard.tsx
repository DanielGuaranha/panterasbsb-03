import React, { useEffect, useState } from 'react';
import { getCompanions } from '../services/supabaseClient';
import { Companion } from '../types';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const AdminDashboard: React.FC = () => {
  const { t } = useLanguage();
  const [companions, setCompanions] = useState<Companion[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'companions' | 'finance'>('overview');

  useEffect(() => {
    getCompanions().then(data => {
      setCompanions(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-gold-500 selection:text-black">
      <SEO title={`${t('admin.title')} | Panteras BSB`} noIndex={true} />

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 h-16 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-600 to-gold-400 flex items-center justify-center shadow-lg shadow-gold-500/20">
            <span className="font-serif font-bold text-black text-lg">P</span>
          </div>
          <span className="font-serif text-slate-200 text-lg tracking-wide">{t('admin.title')}</span>
          <span className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[0.6rem] text-slate-400 uppercase tracking-widest font-bold">
            {t('admin.version')}
          </span>
        </div>

        <div className="flex items-center gap-6">
          <button className="relative text-slate-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>
          
          <div className="flex items-center gap-3 pl-6 border-l border-white/10">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-white">Admin</p>
              <p className="text-[0.65rem] text-gold-500 uppercase tracking-widest">Super User</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-800 border border-gold-500/30 overflow-hidden">
              <img src="https://ui-avatars.com/api/?name=Admin&background=D4AF37&color=000" alt="Admin" />
            </div>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-[1600px] mx-auto">
        
        {/* Actions & Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-serif text-white mb-1">
              {activeTab === 'overview' ? t('admin.tabs.overview') : activeTab === 'companions' ? t('admin.tabs.models') : t('admin.tabs.finance')}
            </h1>
          </div>
          <div className="flex gap-2 bg-slate-900/50 p-1 rounded-lg border border-slate-800">
             {(['overview', 'companions', 'finance'] as const).map(tab => (
               <button
                 key={tab}
                 onClick={() => setActiveTab(tab)}
                 className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                   activeTab === tab 
                     ? 'bg-gold-500 text-black shadow-lg shadow-gold-500/20' 
                     : 'text-slate-400 hover:text-white hover:bg-white/5'
                 }`}
               >
                 {t(`admin.tabs.${tab === 'companions' ? 'models' : tab}`)}
               </button>
             ))}
          </div>
        </div>

        {/* --- VIEW: OVERVIEW --- */}
        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in">
              <KpiCard title={t('admin.kpi.revenue')} value="R$ 42.500" trend="+12.5%" isPositive={true} icon="💰" />
              <KpiCard title={t('admin.kpi.new_models')} value="18" trend="+4" isPositive={true} icon="users" />
              <KpiCard title={t('admin.kpi.traffic')} value="125.4k" trend="-2.1%" isPositive={false} icon="chart" />
              <KpiCard title={t('admin.kpi.conversion')} value="3.2%" trend="+0.8%" isPositive={true} icon="percent" />
            </div>

            <div className="grid lg:grid-cols-3 gap-6 animate-fade-in">
              <div className="lg:col-span-2 space-y-6">
                <CompanionsTable companions={companions.slice(0, 5)} loading={loading} isCompact t={t} />
              </div>

              <div className="space-y-6">
                 <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6">
                   <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-4">{t('admin.quick_actions')}</h3>
                   <div className="grid grid-cols-2 gap-3">
                     <button className="p-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 transition-colors text-left">📄 {t('footer.terms')}</button>
                     <button className="p-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 transition-colors text-left">📢 {t('nav.advertise')}</button>
                   </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* --- VIEW: COMPANIONS --- */}
        {activeTab === 'companions' && (
          <div className="animate-fade-in-up">
            <CompanionsTable companions={companions} loading={loading} t={t} />
          </div>
        )}

      </main>
    </div>
  );
};

const CompanionsTable: React.FC<{ companions: Companion[]; loading: boolean; isCompact?: boolean; t: any }> = ({ companions, loading, isCompact = false, t }) => (
  <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
    <div className="p-6 border-b border-white/5 flex justify-between items-center">
      <h3 className="text-slate-300 font-bold text-sm uppercase tracking-widest">{t('admin.tabs.models')}</h3>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-slate-400">
        <thead className="bg-slate-900/50 text-[0.65rem] uppercase font-bold text-slate-500 tracking-wider">
          <tr>
            <th className="px-6 py-4">{t('admin.table.model')}</th>
            <th className="px-6 py-4">{t('admin.table.status')}</th>
            <th className="px-6 py-4">{t('admin.table.plan')}</th>
            {!isCompact && <th className="px-6 py-4">{t('admin.table.price')}</th>}
            <th className="px-6 py-4">{t('admin.table.city')}</th>
            <th className="px-6 py-4 text-right">{t('admin.table.actions')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {loading ? (
            <tr><td colSpan={6} className="p-8 text-center text-gold-500 animate-pulse">...</td></tr>
          ) : companions.map((comp) => (
            <tr key={comp.id} className="hover:bg-white/[0.02] transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-800 overflow-hidden border border-slate-700 relative">
                      {comp.image_url ? (
                        <img src={comp.image_url} className="w-full h-full object-cover" alt="" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[0.6rem]">{comp.display_name.substring(0,2)}</div>
                      )}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{comp.display_name}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[0.6rem] font-bold uppercase tracking-wider ${comp.whatsapp_status === 'active' ? 'bg-green-900/20 border-green-900/30 text-green-400' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                   {comp.whatsapp_status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-6 py-4">
                {comp.is_vip ? <span className="text-gold-400 text-xs font-bold">VIP</span> : <span className="text-slate-500 text-xs">Standard</span>}
              </td>
              {!isCompact && (
                <td className="px-6 py-4 font-mono text-xs">
                   {comp.pricing_mode === 'fixed' ? `R$ ${comp.base_price}` : '---'}
                </td>
              )}
                <td className="px-6 py-4"><span className="text-slate-400 text-xs">{comp.city}</span></td>
              <td className="px-6 py-4 text-right">
                <Link to={`/admin/models/${comp.slug}`} className="text-slate-500 hover:text-gold-500 transition-colors font-bold text-xs uppercase tracking-wide">
                    Edit &rarr;
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const KpiCard: React.FC<{ title: string; value: string; trend: string; isPositive: boolean; icon: string }> = ({ title, value, trend, isPositive, icon }) => {
  return (
    <div className="bg-[#0f0f0f] border border-white/5 rounded-xl p-5 relative overflow-hidden group hover:border-gold-500/30 transition-all duration-300">
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
           <span>{icon === 'users' ? '👥' : icon === 'chart' ? '📈' : icon === 'percent' ? '%' : '💰'}</span>
        </div>
        <div className={`flex items-center text-xs font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? '↑' : '↓'} {trend}
        </div>
      </div>
      <div className="relative z-10">
        <h4 className="text-slate-400 text-xs font-bold uppercase tracking-wider">{title}</h4>
        <p className="text-2xl font-serif text-white font-bold mt-1">{value}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;