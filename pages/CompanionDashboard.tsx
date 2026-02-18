import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatPanelCompanion from '../components/ChatPanelCompanion';

const CompanionDashboard: React.FC = () => {
  const { companionId } = useParams<{ companionId: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-midnight pt-6 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Dashboard Demo */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="font-serif text-3xl text-gold-500">Painel da Modelo (Demo)</h1>
              <span className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-[0.6rem] text-slate-400 uppercase tracking-widest font-bold">
                Simulação
              </span>
            </div>
            <p className="text-slate-400 text-sm font-light max-w-2xl">
              Prévia de como você vai gerenciar seus atendimentos quando seu perfil estiver no ar.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          
          {/* Main Chat Panel (Demo Mode) */}
          <div className="lg:col-span-3">
            <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl shadow-2xl overflow-hidden h-[80vh]">
              {/* Passamos uma prop fictícia ou removemos a lógica interna de fetch no componente */}
              <ChatPanelCompanion companionId={companionId || 'demo'} />
            </div>
          </div>

          {/* Safety & Tips Sidebar - Wrapped context context */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/50 border border-dashed border-slate-700 p-4 rounded-xl">
              <h4 className="text-gold-500/70 text-[0.65rem] uppercase tracking-widest font-bold mb-4 text-center border-b border-slate-800 pb-2">
                Exemplo de orientações que aparecerão no seu painel real
              </h4>
              
              <div className="space-y-4 opacity-75 hover:opacity-100 transition-opacity">
                {/* Card 1: Prioridade */}
                <div className="bg-slate-900 border border-gold-900/30 p-4 rounded-lg">
                  <h3 className="text-gold-400 font-bold text-xs mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    Proteja seu WhatsApp
                  </h3>
                  <p className="text-[0.65rem] text-slate-400 leading-relaxed">
                    Use este chat para o <strong>primeiro contato</strong> e tire dúvidas básicas por aqui. Só passe seu WhatsApp para clientes que confirmarem interesse real.
                  </p>
                </div>

                {/* Card 2: Anti-Spam */}
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
                  <h3 className="text-slate-200 font-bold text-xs mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                    Evite Banimentos
                  </h3>
                  <p className="text-[0.65rem] text-slate-400 leading-relaxed">
                    Evite disparos em massa. Use as <strong>Respostas Rápidas</strong> (ícone de raio ⚡) deste painel.
                  </p>
                </div>

                {/* Card 3: Segurança */}
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
                  <h3 className="text-slate-200 font-bold text-xs mb-2">Segurança Pessoal</h3>
                  <p className="text-[0.65rem] text-slate-400 leading-relaxed">
                    Nunca envie fotos de documentos pelo chat. O sistema rastreia comportamentos suspeitos dos clientes.
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