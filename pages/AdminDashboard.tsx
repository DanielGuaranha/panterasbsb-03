import React, { useEffect, useState } from 'react';
import { getCompanions } from '../services/supabaseClient';
import { Companion } from '../types';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const [companions, setCompanions] = useState<Companion[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'companions' | 'finance'>('overview');

  useEffect(() => {
    // Simular fetch ou usar real
    getCompanions().then(data => {
      setCompanions(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-gold-500 selection:text-black">
      <SEO title="Command Center | Panteras BSB" noIndex={true} />

      {/* Top Navigation Bar - Glass Effect */}
      <header className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 h-16 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-600 to-gold-400 flex items-center justify-center shadow-lg shadow-gold-500/20">
            <span className="font-serif font-bold text-black text-lg">P</span>
          </div>
          <span className="font-serif text-slate-200 text-lg tracking-wide">Command Center</span>
          <span className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[0.6rem] text-slate-400 uppercase tracking-widest font-bold">
            v1.2.0 Beta
          </span>
        </div>

        <div className="flex items-center gap-6">
          {/* Notifications */}
          <button className="relative text-slate-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>
          
          {/* User Profile */}
          <div className="flex items-center gap-3 pl-6 border-l border-white/10">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-white">Administrador</p>
              <p className="text-[0.65rem] text-gold-500 uppercase tracking-widest">Super User</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-800 border border-gold-500/30 overflow-hidden">
              <img src="https://ui-avatars.com/api/?name=Admin&background=D4AF37&color=000" alt="Admin" />
            </div>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-[1600px] mx-auto">
        
        {/* Date Filter & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-serif text-white mb-1">
              {activeTab === 'overview' ? 'Visão Geral' : activeTab === 'companions' ? 'Gestão de Modelos' : 'Fluxo Financeiro'}
            </h1>
            <p className="text-slate-500 text-sm">
              {activeTab === 'overview' ? 'Resumo da performance da plataforma nos últimos 30 dias.' : 
               activeTab === 'companions' ? 'Controle total de perfis, fotos e status.' : 
               'Relatórios de receita e pagamentos.'}
            </p>
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
                 {tab === 'overview' ? 'Dashboard' : tab === 'companions' ? 'Modelos' : 'Financeiro'}
               </button>
             ))}
          </div>
        </div>

        {/* --- VIEW: OVERVIEW --- */}
        {activeTab === 'overview' && (
          <>
            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in">
              <KpiCard title="Receita Total" value="R$ 42.500" trend="+12.5%" isPositive={true} data={[10, 25, 18, 30, 45, 38, 55]} icon="💰" />
              <KpiCard title="Novas Modelos" value="18" trend="+4" isPositive={true} data={[2, 3, 1, 4, 2, 5, 4]} icon="users" />
              <KpiCard title="Tráfego (Sessões)" value="125.4k" trend="-2.1%" isPositive={false} data={[40, 35, 45, 30, 35, 25, 30]} icon="chart" />
              <KpiCard title="Taxa de Conversão" value="3.2%" trend="+0.8%" isPositive={true} data={[2.1, 2.4, 2.2, 2.8, 3.0, 3.1, 3.2]} icon="percent" />
            </div>

            <div className="grid lg:grid-cols-3 gap-6 animate-fade-in">
              {/* Main Chart Area (2/3 width) */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Revenue Chart */}
                <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-xs text-gold-500 hover:underline">Ver Relatório Completo &rarr;</button>
                  </div>
                  <h3 className="text-slate-300 font-bold text-sm uppercase tracking-widest mb-6">Receita vs. Assinaturas</h3>
                  
                  {/* Custom SVG Chart */}
                  <div className="h-64 w-full relative flex items-end justify-between gap-1 px-2">
                     <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                        <div className="w-full h-px bg-slate-700 border-t border-dashed"></div>
                        <div className="w-full h-px bg-slate-700 border-t border-dashed"></div>
                        <div className="w-full h-px bg-slate-700 border-t border-dashed"></div>
                        <div className="w-full h-px bg-slate-700 border-t border-dashed"></div>
                     </div>
                     {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 100].map((h, i) => (
                       <div key={i} className="relative w-full group/bar">
                          <div style={{ height: `${h}%` }} className="bg-gradient-to-t from-gold-900/50 to-gold-500 w-full rounded-t-sm hover:from-gold-600 hover:to-gold-300 transition-all duration-300 cursor-pointer relative">
                             <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[0.6rem] font-bold px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-10">R$ {h * 150},00</div>
                          </div>
                       </div>
                     ))}
                  </div>
                  <div className="flex justify-between mt-2 text-[0.6rem] text-slate-600 font-mono uppercase">
                    <span>Jan</span><span>Fev</span><span>Mar</span><span>Abr</span><span>Mai</span><span>Jun</span><span>Jul</span><span>Ago</span><span>Set</span><span>Out</span><span>Nov</span><span>Dez</span>
                  </div>
                </div>

                {/* Simplified Table for Overview */}
                <CompanionsTable companions={companions.slice(0, 5)} loading={loading} isCompact />
              </div>

              {/* Right Sidebar - Action Center */}
              <div className="space-y-6">
                {/* Pending Actions */}
                <div className="bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] border border-gold-900/30 rounded-2xl p-6 shadow-2xl">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-gold-100 font-bold text-sm uppercase tracking-widest">Atenção Necessária</h3>
                    <span className="bg-red-500/20 text-red-400 text-[0.6rem] font-bold px-2 py-0.5 rounded-full border border-red-500/30">3 Pendentes</span>
                  </div>
                  <div className="space-y-4">
                    <ActionItem title="Aprovar Fotos" desc="Bruna Surfistinha enviou 3 novas fotos." time="5 min atrás" priority="high" />
                    <ActionItem title="Disputa de Pagamento" desc="Cliente reportou problema com ID #9921." time="1h atrás" priority="med" />
                    <ActionItem title="Novo Cadastro VIP" desc="Análise pendente para Julia Fox." time="3h atrás" priority="med" />
                  </div>
                  <button className="w-full mt-6 py-3 rounded-lg border border-slate-700 text-slate-400 text-xs font-bold hover:bg-slate-800 hover:text-white transition-all uppercase tracking-widest">
                    Ver Central de Tarefas
                  </button>
                </div>

                {/* Quick Links */}
                 <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6">
                   <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-4">Acesso Rápido</h3>
                   <div className="grid grid-cols-2 gap-3">
                     <button className="p-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 transition-colors text-left">📄 Termos</button>
                     <button className="p-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 transition-colors text-left">📢 Anúncios</button>
                     <button className="p-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 transition-colors text-left">⚙️ Configs</button>
                     <button className="p-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 transition-colors text-left">🛡️ Logs</button>
                   </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* --- VIEW: COMPANIONS (MODELOS) --- */}
        {activeTab === 'companions' && (
          <div className="animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
               <div className="flex gap-4">
                  <div className="bg-slate-900 rounded-lg p-1 flex border border-slate-800">
                     <button className="px-4 py-2 bg-slate-800 rounded text-xs text-white font-bold border border-slate-700">Todos</button>
                     <button className="px-4 py-2 hover:bg-slate-800 rounded text-xs text-slate-400 transition-colors">VIPs</button>
                     <button className="px-4 py-2 hover:bg-slate-800 rounded text-xs text-slate-400 transition-colors">Pendentes</button>
                  </div>
                  <input type="text" placeholder="Buscar modelo..." className="bg-slate-900 border border-slate-800 rounded-lg px-4 text-sm text-white focus:border-gold-500 outline-none w-64" />
               </div>
               <button className="bg-gold-600 hover:bg-gold-500 text-black px-6 py-2.5 rounded-lg font-bold text-xs uppercase tracking-widest shadow-lg shadow-gold-500/20 transition-all flex items-center gap-2">
                  <span>+</span> Cadastrar Nova
               </button>
            </div>
            
            <CompanionsTable companions={companions} loading={loading} />
          </div>
        )}

        {/* --- VIEW: FINANCE (FINANCEIRO) --- */}
        {activeTab === 'finance' && (
          <div className="animate-fade-in-up text-center py-20 bg-[#0f0f0f] border border-white/5 rounded-2xl">
             <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl border border-slate-800">
               💰
             </div>
             <h3 className="text-xl text-white font-serif mb-2">Módulo Financeiro</h3>
             <p className="text-slate-500 text-sm max-w-md mx-auto">
               Em desenvolvimento. Em breve você poderá gerenciar pagamentos de assinaturas, recebimentos e relatórios fiscais.
             </p>
          </div>
        )}

      </main>
    </div>
  );
};

/* --- SUB-COMPONENTS FOR CLEAN ARCHITECTURE --- */

const CompanionsTable: React.FC<{ companions: Companion[]; loading: boolean; isCompact?: boolean }> = ({ companions, loading, isCompact = false }) => (
  <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
    <div className="p-6 border-b border-white/5 flex justify-between items-center">
      <h3 className="text-slate-300 font-bold text-sm uppercase tracking-widest">{isCompact ? 'Modelos Recentes' : 'Catálogo Completo'}</h3>
      {isCompact && (
        <button className="text-xs text-gold-500 hover:text-white transition-colors uppercase tracking-widest font-bold">Ver Todas</button>
      )}
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-slate-400">
        <thead className="bg-slate-900/50 text-[0.65rem] uppercase font-bold text-slate-500 tracking-wider">
          <tr>
            <th className="px-6 py-4">Modelo</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Plano</th>
            {!isCompact && <th className="px-6 py-4">Preço Base</th>}
            <th className="px-6 py-4">Cidade</th>
            <th className="px-6 py-4 text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {loading ? (
            <tr><td colSpan={6} className="p-8 text-center text-gold-500 animate-pulse">Carregando dados...</td></tr>
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
                      <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-2 border-slate-900 rounded-full ${comp.whatsapp_status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{comp.display_name}</p>
                    <p className="text-[0.65rem] text-slate-500">{comp.whatsapp_number}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={comp.whatsapp_status === 'active' ? 'active' : 'inactive'} />
              </td>
              <td className="px-6 py-4">
                {comp.is_vip ? (
                  <div className="flex items-center gap-1 text-gold-400 text-xs font-bold">
                    <span>💎</span> VIP
                  </div>
                ) : (
                  <span className="text-slate-500 text-xs">Padrão</span>
                )}
              </td>
              {!isCompact && (
                <td className="px-6 py-4 font-mono text-xs">
                   {comp.pricing_mode === 'fixed' ? `R$ ${comp.base_price}` : 'Variável'}
                </td>
              )}
                <td className="px-6 py-4">
                  <span className="text-slate-400 text-xs">{comp.city}</span>
              </td>
              <td className="px-6 py-4 text-right">
                <Link 
                  to={`/admin/models/${comp.slug}`} 
                  className="text-slate-500 hover:text-gold-500 transition-colors opacity-0 group-hover:opacity-100 font-bold text-xs uppercase tracking-wide"
                >
                    Gerenciar &rarr;
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const KpiCard: React.FC<{ title: string; value: string; trend: string; isPositive: boolean; data: number[]; icon: string }> = ({ title, value, trend, isPositive, data, icon }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - ((d - min) / (max - min)) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="bg-[#0f0f0f] border border-white/5 rounded-xl p-5 relative overflow-hidden group hover:border-gold-500/30 transition-all duration-300">
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
           {icon === 'users' && (
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
           )}
           {icon === 'chart' && (
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
           )}
           {icon === 'percent' && (
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
           )}
           {icon === '💰' && <span className="text-xl">💰</span>}
        </div>
        <div className={`flex items-center text-xs font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? '↑' : '↓'} {trend}
        </div>
      </div>
      
      <div className="relative z-10">
        <h4 className="text-slate-400 text-xs font-bold uppercase tracking-wider">{title}</h4>
        <p className="text-2xl font-serif text-white font-bold mt-1">{value}</p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 opacity-20 pointer-events-none group-hover:opacity-30 transition-opacity">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
           <polyline fill="none" stroke={isPositive ? '#10B981' : '#EF4444'} strokeWidth="2" points={points} />
           <path d={`M0 100 L${points} L100 100 Z`} fill={isPositive ? '#10B981' : '#EF4444'} opacity="0.2" />
        </svg>
      </div>
    </div>
  );
};

const ActionItem: React.FC<{ title: string; desc: string; time: string; priority: 'high' | 'med' }> = ({ title, desc, time, priority }) => (
  <div className="flex gap-3 items-start group cursor-pointer">
    <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${priority === 'high' ? 'bg-red-500 animate-pulse' : 'bg-yellow-500'}`}></div>
    <div className="flex-1 border-b border-white/5 pb-3 group-hover:border-gold-500/30 transition-colors">
      <div className="flex justify-between items-center mb-1">
        <h4 className="text-sm font-bold text-slate-200 group-hover:text-gold-400 transition-colors">{title}</h4>
        <span className="text-[0.6rem] text-slate-600">{time}</span>
      </div>
      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const HealthBar: React.FC<{ label: string; percentage: number; color: string }> = ({ label, percentage, color }) => (
  <div>
    <div className="flex justify-between text-[0.65rem] uppercase font-bold text-slate-500 mb-1">
      <span>{label}</span>
      <span>{percentage}%</span>
    </div>
    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full`} style={{ width: `${percentage}%` }}></div>
    </div>
  </div>
);

const StatusBadge: React.FC<{ status: 'active' | 'inactive' }> = ({ status }) => {
  if (status === 'active') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-900/20 border border-green-900/30 text-green-400 text-[0.6rem] font-bold uppercase tracking-wider">
        <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse"></span>
        Ativo
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-[0.6rem] font-bold uppercase tracking-wider">
      <span className="w-1 h-1 rounded-full bg-slate-500"></span>
      Inativo
    </span>
  );
};

export default AdminDashboard;