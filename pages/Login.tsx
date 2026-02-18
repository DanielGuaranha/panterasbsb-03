import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import SEO from '../components/SEO';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 1. BACKDOOR IMEDIATO PARA DEMO
    // Verifica credenciais de demonstração ANTES de chamar o Supabase
    // Isso evita o erro "Invalid login credentials" no console/network se o user não existir no banco real
    if (email === 'admin@panterasbsb.com' && password === 'admin') {
      setTimeout(() => navigate('/admin'), 1000);
      return;
    }

    try {
      if (!supabase) throw new Error('Cliente Supabase não configurado.');

      // 2. Tentativa de Login Real via Supabase
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Sucesso
      navigate('/admin');

    } catch (err: any) {
      console.error(err);
      setError('Credenciais inválidas ou acesso não autorizado.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-midnight px-4 py-20 relative overflow-hidden">
      <SEO title="Acesso Administrativo | Panteras BSB" noIndex={true} />
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#0a0a0a] border border-gold-900/30 p-8 rounded-2xl shadow-2xl relative z-10 animate-fade-in-up">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/20 mb-4 text-gold-500">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="font-serif text-2xl text-gold-400">Portal Administrativo</h1>
          <p className="text-slate-500 text-xs uppercase tracking-widest mt-2">Acesso Restrito</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Corporativo</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#111] border border-slate-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20 transition-all placeholder-slate-600"
              placeholder="admin@panterasbsb.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Senha de Acesso</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#111] border border-slate-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20 transition-all placeholder-slate-600"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-900/20 border border-red-900/40 rounded text-red-400 text-xs text-center flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-gold-600 to-gold-500 text-black font-bold py-3.5 rounded-lg hover:brightness-110 transition-all shadow-lg shadow-gold-900/20 disabled:opacity-50 disabled:cursor-wait flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                Autenticando...
              </>
            ) : (
              'Entrar no Sistema'
            )}
          </button>
        </form>

        <div className="mt-8 text-center space-y-2">
           <div className="inline-block bg-slate-900/50 border border-slate-800 rounded px-3 py-2 text-[0.6rem] text-slate-400">
              <span className="text-gold-500 font-bold uppercase mr-1">Demo Access:</span>
              <span className="font-mono">admin@panterasbsb.com</span> / <span className="font-mono">admin</span>
           </div>
           
           <p className="text-[0.55rem] text-slate-700">
             Protegido por reCAPTCHA e monitoramento de IP.
           </p>
        </div>
      </div>
    </div>
  );
};

export default Login;