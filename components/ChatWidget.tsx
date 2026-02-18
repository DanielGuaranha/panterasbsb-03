import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';

interface Props {
  companionId: string;
}

const ChatWidget: React.FC<Props> = ({ companionId }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Generate or retrieve anonymous session ID
  const sessionId = useRef(localStorage.getItem('panteras_session_id') || Math.random().toString(36).substring(7)).current;

  useEffect(() => {
    localStorage.setItem('panteras_session_id', sessionId);
  }, [sessionId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, open]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Optimistic UI update
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      chat_id: 'temp',
      sender_type: 'client',
      message_text: message,
      created_at: new Date().toISOString()
    };

    setChatHistory([...chatHistory, newMessage]);
    setMessage('');

    // Simulate system/auto reply after 2 seconds
    setTimeout(() => {
      const reply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        chat_id: 'temp',
        sender_type: 'system',
        message_text: 'Olá! Estou indisponível no momento. Por favor, me chame no WhatsApp para resposta imediata.',
        created_at: new Date().toISOString()
      };
      setChatHistory(prev => [...prev, reply]);
    }, 2000);
  };

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button 
          onClick={() => setOpen(true)}
          className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-40 bg-gold-600 text-white p-3 rounded-full shadow-lg shadow-gold-600/30 hover:scale-105 transition-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-0 right-0 md:bottom-4 md:right-4 w-full md:w-80 h-[50vh] md:h-96 z-50 bg-slate-900 border border-slate-700 md:rounded-lg shadow-2xl flex flex-col">
          {/* Header */}
          <div className="bg-slate-800 p-3 flex justify-between items-center border-b border-slate-700 rounded-t-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-bold text-white">Chat Direto</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white">&times;</button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-3 bg-midnight">
            {chatHistory.length === 0 && (
              <p className="text-center text-xs text-slate-500 mt-4">
                Inicie a conversa com discrição e respeito.
              </p>
            )}
            {chatHistory.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender_type === 'client' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-2 rounded-lg text-xs ${
                  msg.sender_type === 'client' 
                    ? 'bg-gold-600 text-white rounded-tr-none' 
                    : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                }`}>
                  {msg.message_text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-2 bg-slate-800 border-t border-slate-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-grow bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:border-gold-500 outline-none"
              />
              <button type="submit" className="text-gold-500 hover:text-gold-400 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;