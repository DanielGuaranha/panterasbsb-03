
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../services/supabaseClient';
import { ChatMessage } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  companionId: string;
  companionName: string;
  companionImage?: string;
}

const ChatWidgetClient: React.FC<Props> = ({ companionId, companionName, companionImage }) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatId, setChatId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef(localStorage.getItem('panteras_session_id') || Math.random().toString(36).substring(7)).current;

  useEffect(() => {
    localStorage.setItem('panteras_session_id', sessionId);
  }, [sessionId]);

  // Carregar ou criar conversa ao abrir
  useEffect(() => {
    if (!isOpen || !companionId) return;

    const initChat = async () => {
      setLoading(true);
      // 1. Tentar achar conversa existente
      const { data: chat } = await supabase
        .from('companion_chats')
        .select('id')
        .eq('companion_id', companionId)
        .eq('client_session_id', sessionId)
        .single();

      if (chat) {
        setChatId(chat.id);
        // 2. Carregar mensagens
        const { data: msgs } = await supabase
          .from('chat_messages')
          .select('*')
          .eq('chat_id', chat.id)
          .order('created_at', { ascending: true });
        
        if (msgs) setMessages(msgs);
      }
      setLoading(false);
    };

    initChat();
  }, [isOpen, companionId, sessionId]);

  // Realtime Subscription
  useEffect(() => {
    if (!chatId) return;

    const channel = supabase
      .channel(`chat_${chatId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'chat_messages', 
        filter: `chat_id=eq.${chatId}` 
      }, (payload) => {
        setMessages(prev => [...prev, payload.new as ChatMessage]);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [chatId]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    let currentChatId = chatId;
    const text = newMessage;
    setNewMessage('');

    // Se não tem chat_id, cria agora
    if (!currentChatId) {
      const { data: newChat, error } = await supabase
        .from('companion_chats')
        .insert({
          companion_id: companionId,
          client_session_id: sessionId,
          last_message_preview: text.substring(0, 50)
        })
        .select('id')
        .single();
      
      if (error) return;
      currentChatId = newChat.id;
      setChatId(newChat.id);
    }

    // Inserir mensagem
    await supabase.from('chat_messages').insert({
      chat_id: currentChatId,
      sender_type: 'client',
      message_text: text
    });
    
    // Atualizar preview do chat
    await supabase.from('companion_chats').update({ 
      last_message_preview: text.substring(0, 50),
      last_message_at: new Date().toISOString(),
      unread_count_companion: 1 
    }).eq('id', currentChatId);
  };

  return (
    <>
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gold-600 text-black p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all animate-fade-in shadow-gold-500/30"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-0 right-0 md:bottom-6 md:right-6 w-full md:w-96 h-[100dvh] md:h-[600px] z-[100] bg-[#0a0a0a] md:rounded-2xl shadow-2xl border border-white/10 flex flex-col animate-fade-in-up">
          <div className="p-4 bg-obsidian/80 backdrop-blur-md border-b border-gold-900/20 flex justify-between items-center rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-gold-500/40 overflow-hidden bg-slate-800">
                {companionImage && <img src={companionImage} alt="" className="w-full h-full object-cover" />}
              </div>
              <div>
                <h3 className="text-gold-500 font-serif font-bold text-sm leading-none">{companionName}</h3>
                <span className="text-[0.6rem] text-green-500 uppercase tracking-widest font-bold flex items-center gap-1 mt-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> {t('chat.online_now')}
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors p-2">✕</button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-midnight">
            <p className="text-center text-[0.6rem] text-slate-600 uppercase tracking-[0.2em] mb-4">{t('chat.secure_badge')}</p>
            
            {messages.length === 0 && !loading && (
              <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 text-center">
                 <p className="text-xs text-slate-400 italic">Diga olá para {companionName} e inicie sua conversa discreta.</p>
              </div>
            )}

            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender_type === 'client' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-lg ${
                  msg.sender_type === 'client' 
                    ? 'bg-gold-600 text-black rounded-tr-sm font-medium' 
                    : 'bg-slate-800 text-slate-200 rounded-tl-sm border border-white/5'
                }`}>
                  {msg.message_text}
                  <span className={`block text-[0.5rem] mt-1 text-right opacity-50`}>
                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-4 bg-obsidian border-t border-white/5 flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={t('chat.input_placeholder')}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-full px-4 py-3 text-sm text-white focus:border-gold-500 outline-none transition-all"
            />
            <button type="submit" className="bg-gold-600 hover:bg-gold-500 text-black p-3 rounded-full shadow-lg active:scale-90 transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/></svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidgetClient;
