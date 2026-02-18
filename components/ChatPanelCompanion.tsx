import React, { useState, useEffect, useRef } from 'react';
import { CompanionChat, ChatMessage } from '../types';

interface Props {
  companionId: string;
}

// Mock Data Generators for High Volume Simulation
const generateMockChats = (count: number): CompanionChat[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `chat-${i}`,
    companion_id: 'demo',
    client_session_id: `client-${i}`,
    client_nickname: i === 0 ? 'Cliente Novo (Site)' : `Cliente ${i + 100}`,
    status: 'active',
    last_message_at: new Date(Date.now() - i * 1000 * 60 * 15).toISOString(), // Staggered times
    last_message_preview: i === 0 ? 'Olá, vi seu perfil e adorei. Está disponível?' : 'Podemos marcar para as 20h?',
    unread_count_companion: i < 3 ? 1 : 0, // First 3 have unread messages
    unread_count_client: 0,
    created_at: new Date().toISOString()
  }));
};

const MOCK_MESSAGES: ChatMessage[] = [
  { id: 'm1', chat_id: 'c1', sender_type: 'client', message_text: 'Olá, boa noite!', created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString() },
  { id: 'm2', chat_id: 'c1', sender_type: 'companion', message_text: 'Olá, boa noite! Tudo bem?', created_at: new Date(Date.now() - 1000 * 60 * 55).toISOString() },
  { id: 'm3', chat_id: 'c1', sender_type: 'client', message_text: 'Tudo ótimo. Vi suas fotos e fiquei encantado. Você atende no Lago Sul?', created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
];

// Quick Replies Configuration
const QUICK_REPLIES = {
  'Abertura': [
    "Olá! Obrigada pelo contato. Como posso tornar sua noite especial?",
    "Boa noite! Sou a Isabella. Vi que visitou meu perfil, em que posso ajudar?",
    "Oi anjo! Tudo bem? Estou disponível agora."
  ],
  'Valores & Pagamento': [
    "Meu atendimento é de R$ 400/hora (pix ou espécie).",
    "Trabalho com sinal de 30% para reserva de horário.",
    "Aceito Crypto (USDT/BTC) e Cartão com pequeno acréscimo."
  ],
  'Localização': [
    "Atendo em apartamento próprio, super discreto e higienizado no Lago Sul.",
    "Realizo atendimento em hotéis e motéis de alto padrão.",
    "Para viagens, preciso de aviso prévio de 48h."
  ],
  'Fechamento': [
    "Perfeito! Vou deixar reservado para você. Até logo! 😘",
    "Combinado. Me avise quando estiver saindo.",
    "Posso confirmar nossa reserva para as 20h?"
  ]
};

const ChatPanelCompanion: React.FC<Props> = ({ companionId }) => {
  const [chats, setChats] = useState<CompanionChat[]>([]);
  const [filteredChats, setFilteredChats] = useState<CompanionChat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const [activeTabReply, setActiveTabReply] = useState<keyof typeof QUICK_REPLIES>('Abertura');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with Mock Data
  useEffect(() => {
    const data = generateMockChats(15); // Simulate 15 active chats
    setChats(data);
    setFilteredChats(data);
  }, []);

  // Filter Logic
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredChats(chats);
    } else {
      const lower = searchTerm.toLowerCase();
      setFilteredChats(chats.filter(c => 
        (c.client_nickname || '').toLowerCase().includes(lower) ||
        (c.last_message_preview || '').toLowerCase().includes(lower)
      ));
    }
  }, [searchTerm, chats]);

  // Load Messages when chat selected
  useEffect(() => {
    if (selectedChatId) {
      // In a real app, fetch from Supabase here
      setMessages([...MOCK_MESSAGES, { // Add a fake latest message based on chat preview
        id: 'latest', 
        chat_id: selectedChatId, 
        sender_type: 'client', 
        message_text: chats.find(c => c.id === selectedChatId)?.last_message_preview || '...',
        created_at: new Date().toISOString()
      }]);
      setShowQuickReplies(false); // Close menu on switch
    }
  }, [selectedChatId, chats]);

  // Auto Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || !selectedChatId) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      chat_id: selectedChatId,
      sender_type: 'companion',
      message_text: inputText,
      created_at: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');
    
    // Update list preview
    setChats(prev => prev.map(c => 
      c.id === selectedChatId 
        ? { ...c, last_message_preview: newMsg.message_text, last_message_at: newMsg.created_at, unread_count_companion: 0 }
        : c
    ).sort((a, b) => new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime()));
  };

  const insertQuickReply = (text: string) => {
    setInputText(text);
    setShowQuickReplies(false);
    // Optional: Auto-send
    // handleSendMessage(); 
  };

  const getRelativeTime = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diff = (now.getTime() - date.getTime()) / 1000 / 60; // minutes
    
    if (diff < 60) return `${Math.floor(diff)}m`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h`;
    return date.toLocaleDateString().slice(0, 5);
  };

  return (
    <div className="flex h-full bg-midnight text-slate-200 overflow-hidden md:rounded-xl shadow-2xl border border-slate-800">
      
      {/* LEFT: Sidebar List */}
      <div className={`w-full md:w-[350px] flex flex-col border-r border-slate-800 bg-[#0a0a0a] ${selectedChatId ? 'hidden md:flex' : 'flex'}`}>
        
        {/* Header Search */}
        <div className="p-4 border-b border-slate-800 bg-[#111]">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-serif text-gold-500 text-lg font-bold">Inbox ({chats.length})</h2>
            <div className="flex gap-2">
               <button className="text-xs bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded text-slate-400 transition-colors" title="Arquivados">🗄️</button>
               <button className="text-xs bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded text-slate-400 transition-colors" title="Configurações">⚙️</button>
            </div>
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Buscar cliente ou mensagem..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 pl-9 pr-4 text-xs text-white focus:border-gold-500 focus:outline-none transition-colors"
            />
            <svg className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        {/* Chat List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {filteredChats.map(chat => (
            <div 
              key={chat.id}
              onClick={() => setSelectedChatId(chat.id)}
              className={`p-4 border-b border-slate-800/50 cursor-pointer transition-all hover:bg-white/5 relative group ${selectedChatId === chat.id ? 'bg-gold-900/10 border-l-2 border-l-gold-500' : 'border-l-2 border-l-transparent'}`}
            >
              <div className="flex justify-between items-start mb-1">
                <h4 className={`text-sm font-bold truncate ${chat.unread_count_companion > 0 ? 'text-white' : 'text-slate-400'}`}>
                  {chat.client_nickname || 'Cliente Anônimo'}
                </h4>
                <span className="text-[0.6rem] text-slate-500 whitespace-nowrap ml-2">
                  {getRelativeTime(chat.last_message_at)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <p className={`text-xs truncate max-w-[200px] ${chat.unread_count_companion > 0 ? 'text-slate-200 font-medium' : 'text-slate-500'}`}>
                  {chat.unread_count_companion > 0 && <span className="text-gold-500 mr-1">•</span>}
                  {chat.last_message_preview}
                </p>
                {chat.unread_count_companion > 0 && (
                  <span className="bg-gold-500 text-black text-[0.6rem] font-bold px-1.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full">
                    {chat.unread_count_companion}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: Chat Window */}
      <div className={`flex-1 flex flex-col bg-midnight relative ${!selectedChatId ? 'hidden md:flex' : 'flex'}`}>
        
        {selectedChatId ? (
          <>
            {/* Chat Header */}
            <div className="h-16 border-b border-slate-800 bg-[#111] flex items-center justify-between px-4 shrink-0">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setSelectedChatId(null)}
                  className="md:hidden text-slate-400 hover:text-white mr-2"
                >
                  ←
                </button>
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 flex items-center justify-center text-sm font-bold text-white">
                  👤
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">
                    {chats.find(c => c.id === selectedChatId)?.client_nickname}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[0.6rem] text-slate-400 uppercase tracking-wide">Online Agora</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                 <button className="text-xs bg-slate-800 text-slate-300 px-3 py-1.5 rounded hover:bg-slate-700 transition-colors border border-slate-700">Ver Perfil</button>
                 <button className="text-xs bg-slate-800 text-red-400 px-3 py-1.5 rounded hover:bg-slate-700 transition-colors border border-slate-700" title="Bloquear">🚫</button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#0a0a0a] to-[#050505]">
              {messages.map((msg, idx) => {
                const isMe = msg.sender_type === 'companion';
                return (
                  <div key={idx} className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm shadow-md ${
                      isMe 
                        ? 'bg-gold-600 text-black rounded-tr-sm font-medium' 
                        : 'bg-[#1F1F1F] text-slate-200 rounded-tl-sm border border-slate-800'
                    }`}>
                      {msg.message_text}
                      <p className={`text-[0.55rem] mt-1 text-right ${isMe ? 'text-black/60' : 'text-slate-500'}`}>
                        {new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        {isMe && <span className="ml-1">✓✓</span>}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies Popover (Absolute) */}
            {showQuickReplies && (
              <div className="absolute bottom-20 left-4 right-4 md:left-10 md:right-10 bg-[#151515] border border-gold-500/30 rounded-xl shadow-2xl z-20 overflow-hidden animate-fade-in-up">
                <div className="flex border-b border-white/10 overflow-x-auto no-scrollbar bg-[#0a0a0a]">
                  {Object.keys(QUICK_REPLIES).map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveTabReply(category as any)}
                      className={`px-4 py-3 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                        activeTabReply === category 
                          ? 'text-gold-500 border-b-2 border-gold-500 bg-white/5' 
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                <div className="p-2 max-h-48 overflow-y-auto grid grid-cols-1 gap-1">
                  {QUICK_REPLIES[activeTabReply].map((reply, idx) => (
                    <button
                      key={idx}
                      onClick={() => insertQuickReply(reply)}
                      className="text-left text-xs text-slate-300 hover:text-white hover:bg-white/10 p-3 rounded transition-colors truncate"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-4 bg-[#111] border-t border-slate-800 flex gap-2 items-end">
              <button
                type="button"
                onClick={() => setShowQuickReplies(!showQuickReplies)}
                className={`p-3 rounded-lg transition-all ${showQuickReplies ? 'bg-gold-500 text-black' : 'bg-slate-800 text-gold-500 hover:bg-slate-700'}`}
                title="Respostas Rápidas (⚡)"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </button>
              
              <div className="flex-1 bg-slate-900 border border-slate-700 rounded-xl flex items-center focus-within:border-gold-500/50 transition-colors">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="w-full bg-transparent text-white px-4 py-3 text-sm focus:outline-none placeholder-slate-600"
                />
              </div>

              <button 
                type="submit"
                disabled={!inputText.trim()}
                className="bg-gold-600 hover:bg-gold-500 text-black p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-5 h-5 transform rotate-90" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>
          </>
        ) : (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center text-slate-600 p-8 bg-gradient-to-br from-[#0a0a0a] to-[#050505]">
            <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-6 animate-pulse">
              <span className="text-3xl grayscale opacity-30">💬</span>
            </div>
            <h3 className="text-slate-400 font-serif text-xl mb-2">Painel de Atendimento</h3>
            <p className="text-sm text-slate-600 max-w-sm text-center leading-relaxed">
              Selecione um cliente na lista à esquerda para iniciar o atendimento.
              <br/>Use as <strong>Respostas Rápidas (⚡)</strong> para agilizar conversas repetitivas.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPanelCompanion;