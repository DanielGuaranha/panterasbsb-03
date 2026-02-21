import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import useLockBodyScroll from '../hooks/useLockBodyScroll';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  companionId: string;
  companionName: string;
  companionImage?: string;
}

const ChatWidgetClient: React.FC<Props> = ({ companionId: _companionId, companionName, companionImage }) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [_messages, _setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  
  useLockBodyScroll(isOpen);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setShowGreeting(true), 3500);
      return () => clearTimeout(timer);
    } else {
      setShowGreeting(false);
    }
  }, [isOpen]);

  const getFirstName = (name: string) => name.split(' ')[0];

  return (
    <>
      {!isOpen && showGreeting && (
        <div className="fixed bottom-24 right-6 z-40 max-w-[280px] animate-fade-in-up mb-safe">
           <div className="relative bg-slate-900/95 backdrop-blur-md border border-gold-500/40 rounded-xl p-4 shadow-2xl shadow-black/50">
              <button 
                onClick={(e) => { e.stopPropagation(); setShowGreeting(false); }}
                className="absolute -top-2 -right-2 bg-slate-800 text-slate-400 hover:text-white rounded-full p-1 border border-slate-700 w-5 h-5 flex items-center justify-center text-xs"
              >
                &times;
              </button>
              
              <div 
                className="flex gap-3 items-start cursor-pointer"
                onClick={() => setIsOpen(true)}
              >
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-full border border-gold-500/50 overflow-hidden">
                    {companionImage ? (
                      <img src={companionImage} alt={companionName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-slate-800 flex items-center justify-center">👩‍💻</div>
                    )}
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-slate-900 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <p className="text-white text-xs font-bold mb-1">{t('chat.greeting_1')} {getFirstName(companionName)}! 👋</p>
                  <p className="text-slate-300 text-[0.7rem] leading-tight">
                    {t('chat.greeting_2')}
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-2 right-6 w-4 h-4 bg-slate-900 border-b border-r border-gold-500/40 transform rotate-45"></div>
           </div>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-gold-600 to-gold-500 text-black p-4 rounded-full shadow-lg shadow-gold-500/30 hover:scale-105 transition-all group mb-safe active:scale-95"
        >
          <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-0 right-0 md:bottom-6 md:right-6 w-full md:w-[360px] h-[100dvh] md:h-[550px] z-[60] bg-[#0F0F0F] md:rounded-2xl shadow-2xl flex flex-col border border-gold-900/30 font-sans animate-fade-in-up pb-safe md:pb-0 overflow-hidden">
          
          <div className="bg-gradient-to-r from-obsidian to-[#1a1a1a] p-4 flex items-center justify-between border-b border-gold-900/20 rounded-t-none md:rounded-t-2xl shrink-0">
            <div className="flex items-center gap-3">
              <div>
                <h3 className="text-gold-500 font-bold text-sm leading-none mb-1">{getFirstName(companionName)}</h3>
                <p className="text-[0.65rem] text-green-400 uppercase tracking-wider">{t('chat.online_now')}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[0.6rem] font-bold uppercase tracking-widest text-slate-500 hover:text-red-400 transition-colors px-2 py-1"
            >
              {t('chat.exit')}
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-midnight/50 relative">
             <div className="text-center pt-10 px-6 opacity-60">
                <p className="text-sm text-slate-400 mb-2" dangerouslySetInnerHTML={{ __html: t('chat.direct_channel').replace('direto', '<strong>direto</strong>') }} />
                <p className="text-xs text-slate-500">{t('chat.anonymous_safe')}</p>
             </div>
          </div>

          <form className="p-3 bg-[#111] border-t border-white/5 flex gap-2 shrink-0">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={t('chat.input_placeholder')}
              className="flex-1 bg-[#1A1A1A] text-white placeholder-slate-600 text-base md:text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-gold-500/50 transition-all border border-transparent focus:border-gold-500/30"
            />
            <button type="submit" className="bg-gold-600 text-black rounded-xl p-3">
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
          
          <div className="bg-[#0f0f0f] pb-2 pt-1 text-center shrink-0">
             <span className="text-[0.55rem] text-slate-700 uppercase tracking-widest">Panteras BSB • {t('chat.secure_badge')}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidgetClient;