import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  price: number;
  companionName: string;
}

const UnlockModal: React.FC<Props> = ({ isOpen, onClose, onConfirm, price, companionName }) => {
  const { t: _t } = useLanguage();
  const [step, setStep] = useState<'method' | 'processing' | 'success'>('method');
  const [selectedMethod, setSelectedMethod] = useState<'pix' | 'card'>('pix');

  if (!isOpen) return null;

  const handlePay = () => {
    setStep('processing');
    
    // Simulação Honesta: Aqui ocorreria a chamada real ao backend (Stripe/MercadoPago)
    // Como não temos backend, simulamos o tempo de processamento da transação.
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onConfirm(); // Efetiva o desbloqueio no componente pai
        onClose(); // Fecha o modal
        setStep('method'); // Reseta para próxima vez
      }, 1500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative bg-[#111] border border-gold-500/30 w-full max-w-sm rounded-xl shadow-2xl overflow-hidden animate-fade-in-up">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1a1a1a] to-[#111] p-4 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-white font-serif font-bold text-lg">Desbloquear Conteúdo</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">&times;</button>
        </div>

        <div className="p-6">
          {step === 'method' && (
            <>
              <div className="text-center mb-6">
                <p className="text-slate-400 text-sm mb-1">Acesso exclusivo à galeria de</p>
                <h2 className="text-gold-500 font-serif text-2xl">{companionName}</h2>
                <div className="mt-4 bg-gold-900/10 border border-gold-500/20 p-3 rounded-lg">
                  <p className="text-slate-300 text-xs uppercase tracking-widest mb-1">Valor do Acesso</p>
                  <p className="text-3xl font-bold text-white">R$ {price.toFixed(2).replace('.', ',')}</p>
                </div>
              </div>

              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3">Escolha o método:</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button 
                  onClick={() => setSelectedMethod('pix')}
                  className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-all ${selectedMethod === 'pix' ? 'bg-gold-500 text-black border-gold-500' : 'bg-[#1a1a1a] border-slate-700 text-slate-400 hover:border-slate-500'}`}
                >
                  <span className="text-lg">💠</span>
                  <span className="text-xs font-bold">PIX</span>
                </button>
                <button 
                  onClick={() => setSelectedMethod('card')}
                  className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-all ${selectedMethod === 'card' ? 'bg-gold-500 text-black border-gold-500' : 'bg-[#1a1a1a] border-slate-700 text-slate-400 hover:border-slate-500'}`}
                >
                  <span className="text-lg">💳</span>
                  <span className="text-xs font-bold">Cartão</span>
                </button>
              </div>

              <button 
                onClick={handlePay}
                className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold py-3.5 rounded-lg shadow-lg shadow-green-900/20 active:scale-[0.98] transition-all uppercase tracking-widest text-xs"
              >
                Pagar e Liberar Agora
              </button>
              
              <p className="text-[0.6rem] text-slate-600 text-center mt-3">
                Pagamento seguro e discreto. O nome na fatura virá como "P-Digital".
              </p>
            </>
          )}

          {step === 'processing' && (
            <div className="text-center py-8">
              <div className="w-12 h-12 border-4 border-gold-500/30 border-t-gold-500 rounded-full animate-spin mx-auto mb-4"></div>
              <h4 className="text-white font-bold mb-2">Processando Pagamento...</h4>
              <p className="text-slate-400 text-xs">Aguarde a confirmação do banco.</p>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/50">
                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-white font-bold text-lg mb-1">Pagamento Aprovado!</h4>
              <p className="text-slate-400 text-xs">Liberando suas fotos exclusivas...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnlockModal;