'use client';

import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { useVisitorId } from '@/hooks/useVisitorId';
import { Send, MessageCircle, X, Minimize2 } from 'lucide-react';

export interface ChatWidgetProps {
  companionId: string;
  companionName: string;
  companionImage?: string | null;
}

interface Message {
  id: string;
  content: string;
  sender_role: 'visitor' | 'companion' | 'system';
  created_at: string;
}

export default function ChatWidget({ companionId, companionName, companionImage }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [conversationId, setConversationId] = useState<string | null>(null);
  const visitorId = useVisitorId();
  const scrollRef = useRef<HTMLDivElement>(null);

  // 1. Inicializar conversa e carregar mensagens
  useEffect(() => {
    if (!isOpen || !visitorId) return;

    const initChat = async () => {
      // Busca ou cria conversa
      let { data: conv } = await supabase
        .from('conversations')
        .select('id')
        .eq('companion_id', companionId)
        .eq('visitor_id', visitorId)
        .single();

      if (!conv) {
        const { data: newConv, error } = await supabase
          .from('conversations')
          .insert({ companion_id: companionId, visitor_id: visitorId })
          .select('id')
          .single();
        
        if (error) {
            console.error("Erro ao criar conversa:", error);
            return;
        }
        conv = newConv;
      }

      setConversationId(conv.id);

      // Carrega mensagens antigas
      const { data: msgs } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conv.id)
        .order('created_at', { ascending: true });

      if (msgs) setMessages(msgs);

      // 2. Assinar Realtime
      const channel = supabase
        .channel(`chat:${conv.id}`)
        .on('postgres_changes', { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages', 
          filter: `conversation_id=eq.${conv.id}` 
        }, (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    };

    initChat();
  }, [isOpen, visitorId, companionId]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !conversationId) return;

    const text = newMessage;
    setNewMessage(''); // Limpa input imediatamente (Optimistic UI)

    await supabase.from('messages').insert({
      conversation_id: conversationId,
      sender_role: 'visitor',
      content: text
    });
  };

  return (
    <>
      {/* Botão Flutuante */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gold-500 hover:bg-gold-400 text-black p-4 rounded-full shadow-lg shadow-gold-500/20 transition-transform hover:scale-105 active:scale-95"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        </button>
      )}

      {/* Janela de Chat */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 md:bottom-6 md:right-6 w-full md:w-96 h-[100dvh] md:h-[600px] bg-[#0a0a0a] md:rounded-2xl shadow-2xl border border-white/10 flex flex-col z-50 animate-fade-in-up">
          {/* Header */}
          <div className="p-4 border-b border-white/5 flex justify-between items-center bg-[#111] rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-gold-500/50 bg-slate-800">
                {companionImage ? (
                    <img src={companionImage} alt={companionName} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs">Foto</div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">{companionName}</h3>
                <span className="text-xs text-green-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"/> Online
                </span>
              </div>
            </div>
            <div className="flex gap-2">
                <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white"><Minimize2 className="w-5 h-5" /></button>
                <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50" ref={scrollRef}>
            <div className="text-center text-xs text-slate-500 my-4">
              Chat seguro e criptografado.
            </div>
            
            {messages.length === 0 && (
                <div className="bg-slate-800/50 p-3 rounded-lg text-xs text-slate-300">
                    👋 Olá! Estou online. Pode me chamar aqui ou no WhatsApp.
                </div>
            )}

            {messages.map((msg) => {
              const isMe = msg.sender_role === 'visitor';
              return (
                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`
                    max-w-[80%] px-4 py-2 rounded-2xl text-sm
                    ${isMe ? 'bg-gold-600 text-black rounded-tr-sm' : 'bg-slate-800 text-white rounded-tl-sm'}
                  `}>
                    {msg.content}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-3 bg-[#111] border-t border-white/5 flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-gold-500"
            />
            <button type="submit" className="p-2 bg-gold-600 text-black rounded-full hover:bg-gold-500 transition-colors">
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
