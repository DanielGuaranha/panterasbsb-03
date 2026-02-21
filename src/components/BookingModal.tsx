import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  companionName: string;
}

const BookingModal: React.FC<Props> = ({ isOpen, onClose, companionName }) => {
  const { t } = useLanguage();
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
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center md:p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      {/* Container: Bottom Sheet on Mobile, Modal on Desktop */}
      <div className="relative bg-[#0F0F0F] border-t border-x md:border border-gold-500/30 w-full md:max-w-md rounded-t-2xl md:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-fade-in-up-mobile">
        
        {/* Mobile Drag Handle */}
        <div className="md:hidden w-full flex justify-center pt-3 pb-1" onClick={onClose}>
           <div className="w-12 h-1.5 bg-slate-800 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-[#0F0F0F] to-[#151515] p-4 border-b border-gold-500/20 flex justify-between items-center shrink-0">
          <h3 className="text-gold-100 font-serif text-lg">{t('booking.title')} {companionName}</h3>
          
          <button 
            onClick={onClose} 
            className="-mr-2 p-3 text-slate-400 hover:text-white active:scale-95 transition-transform"
            aria-label="Fechar modal"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto pb-safe">
          {step === 1 ? (
            <div className="space-y-5">
              <p className="text-slate-400 text-sm">{t('booking.select_details')}</p>
              
              <div className="grid grid-cols-2 gap-3">
                <input type="date" className="bg-[#1a1a1a] border border-slate-700 rounded-lg p-3 text-base text-white focus:border-gold-500 outline-none appearance-none" style={{colorScheme: 'dark'}} />
                <input type="time" className="bg-[#1a1a1a] border border-slate-700 rounded-lg p-3 text-base text-white focus:border-gold-500 outline-none appearance-none" style={{colorScheme: 'dark'}} />
              </div>

              <div>
                <label className="text-xs text-gold-500 uppercase tracking-widest mb-3 block font-bold">{t('booking.payment_method')}</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['pix', 'card', 'crypto'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMethod(m)}
                      className={`py-3 px-1 rounded-lg text-xs font-bold uppercase border transition-all ${
                        method === m 
                          ? 'bg-gold-500 text-black border-gold-500 shadow-lg shadow-gold-500/20' 
                          : 'bg-transparent text-slate-400 border-slate-700 hover:border-gold-500/50'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {method === 'crypto' && (
                <div className="bg-black/40 p-3 rounded border border-slate-700 text-xs animate-fade-in">
                  <p className="text-slate-300 mb-1">{t('booking.crypto_network')}</p>
                  <select className="w-full bg-[#1a1a1a] border border-slate-700 rounded p-2 mb-2 text-white text-base">
                    <option>USDT (TRC20)</option>
                    <option>USDT (ERC20)</option>
                    <option>Bitcoin (BTC)</option>
                  </select>
                  <div className="flex items-center gap-2 bg-slate-800 p-2 rounded break-all font-mono text-[0.6rem] text-gold-300 border border-dashed border-slate-600">
                    TX9Qz5...j2L ({t('booking.simulated_address')})
                  </div>
                </div>
              )}

              <button
                onClick={handleSimulate}
                disabled={loading}
                className="w-full bg-gradient-to-r from-gold-600 to-gold-400 text-black font-bold py-4 rounded-xl mt-2 hover:brightness-110 transition-all disabled:opacity-50 active:scale-[0.98] shadow-lg shadow-gold-900/20 text-sm uppercase tracking-wider"
              >
                {loading ? t('booking.processing') : t('booking.confirm_pre_booking')}
              </button>
              <p className="text-[0.6rem] text-slate-500 text-center">
                {t('booking.no_charge_notice')}
              </p>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/50 animate-bounce">
                <span className="text-3xl text-green-500">✓</span>
              </div>
              <h4 className="text-white font-serif text-2xl mb-2">{t('booking.success_title')}</h4>
              <p className="text-slate-400 text-sm mb-8 px-4 leading-relaxed">
                {companionName} {t('booking.success_desc')}
              </p>
              <button onClick={onClose} className="w-full border border-slate-600 text-slate-300 py-3 rounded-lg hover:bg-slate-800 active:bg-slate-700 transition-colors uppercase text-xs font-bold tracking-widest">
                {t('booking.close')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;