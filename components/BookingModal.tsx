import React, { useState } from 'react';
import { Booking } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  companionName: string;
}

const BookingModal: React.FC<Props> = ({ isOpen, onClose, companionName }) => {
  const [method, setMethod] = useState<'pix' | 'crypto' | 'card'>('pix');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSimulate = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-slate-900 border border-gold-500/30 w-full max-w-md rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 border-b border-gold-500/20 flex justify-between items-center">
          <h3 className="text-gold-100 font-serif text-lg">Agendar com {companionName}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">&times;</button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {step === 1 ? (
            <div className="space-y-4">
              <p className="text-slate-400 text-sm">Selecione os detalhes para iniciar o atendimento.</p>
              
              <div className="grid grid-cols-2 gap-2">
                <input type="date" className="bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white focus:border-gold-500 outline-none" />
                <input type="time" className="bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white focus:border-gold-500 outline-none" />
              </div>

              <div>
                <label className="text-xs text-gold-500 uppercase tracking-widest mb-2 block">Método de Pagamento</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['pix', 'card', 'crypto'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMethod(m)}
                      className={`py-2 px-1 rounded text-xs font-bold uppercase border transition-all ${
                        method === m 
                          ? 'bg-gold-500 text-black border-gold-500' 
                          : 'bg-transparent text-slate-400 border-slate-700 hover:border-gold-500/50'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {method === 'crypto' && (
                <div className="bg-black/40 p-3 rounded border border-slate-700 text-xs">
                  <p className="text-slate-300 mb-1">Selecione a rede:</p>
                  <select className="w-full bg-slate-900 border border-slate-700 rounded p-1 mb-2 text-white">
                    <option>USDT (TRC20)</option>
                    <option>USDT (ERC20)</option>
                    <option>Bitcoin (BTC)</option>
                  </select>
                  <div className="flex items-center gap-2 bg-slate-800 p-2 rounded break-all font-mono text-[0.6rem] text-gold-300">
                    TX9Qz5...j2L (Endereço Simulado)
                  </div>
                </div>
              )}

              <button
                onClick={handleSimulate}
                disabled={loading}
                className="w-full bg-gradient-to-r from-gold-600 to-gold-400 text-black font-bold py-3 rounded mt-4 hover:brightness-110 transition-all disabled:opacity-50"
              >
                {loading ? 'Processando...' : 'Confirmar Pré-Reserva'}
              </button>
              <p className="text-[0.6rem] text-slate-500 text-center mt-2">
                Nenhum valor será cobrado agora. Pagamento direto à modelo.
              </p>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/50">
                <span className="text-2xl text-green-500">✓</span>
              </div>
              <h4 className="text-white font-serif text-xl mb-2">Solicitação Enviada!</h4>
              <p className="text-slate-400 text-sm mb-6">
                {companionName} recebeu seu interesse. Aguarde o contato ou chame no WhatsApp para agilizar.
              </p>
              <button onClick={onClose} className="w-full border border-slate-600 text-slate-300 py-2 rounded hover:bg-slate-800">
                Fechar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;