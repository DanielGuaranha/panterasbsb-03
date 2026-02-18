import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import SEO from '../components/SEO';
import { useLanguage } from '../contexts/LanguageContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const from = (location.state as any)?.from?.pathname || '/admin';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (email === 'admin@panterasbsb.com' && password === 'admin') {
      setTimeout(() => navigate('/admin'), 1000);
      return;
    }

    try {
      if (!supabase) throw new Error('Cliente Supabase não configurado.');
      
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      if (data.session) navigate(from, { replace: true });
    } catch (err: any) {
      setError(t('login.error_creds'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-midnight px-4 py-20 relative overflow-hidden">
      <SEO title="Admin | Panteras BSB" noIndex={true} />
      <div className="w-full max-w-md bg-[#0a0a0a] border border-gold-900/30 p-8 rounded-2xl shadow-2xl relative z-10 animate-fade-in-up">
        <div className="text-center mb-8">
          <h1 className="font-serif text-2xl text-gold-400">{t('login.title')}</h1>
          <p className="text-slate-500 text-xs uppercase tracking-widest mt-2">{t('login.restricted')}</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t('login.email_label')}</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#111] border border-slate-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-gold-500/50" required />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t('login.password_label')}</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#111] border border-slate-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-gold-500/50" required />
          </div>
          {error && <div className="text-red-400 text-xs text-center">{error}</div>}
          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-gold-600 to-gold-500 text-black font-bold py-3.5 rounded-lg hover:brightness-110 transition-all disabled:opacity-50">
            {loading ? t('login.authenticating') : t('login.submit')}
          </button>
        </form>
        <div className="mt-8 text-center space-y-2">
           <div className="inline-block bg-slate-900/50 border border-slate-800 rounded px-3 py-2 text-[0.6rem] text-slate-400">
              <span className="text-gold-500 font-bold uppercase mr-1">{t('login.demo_access')}</span>
              <span className="font-mono">admin@panterasbsb.com</span> / <span className="font-mono">admin</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Login;