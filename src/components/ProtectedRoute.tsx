import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    // 1. Check active session immediately
    const checkSession = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }
      
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    checkSession();

    // 2. Listen for auth changes (logout inside another tab, etc)
    const { data: subscription } = supabase?.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    }) || { data: { subscription: null } };

    return () => {
        if (subscription && subscription.subscription) {
            subscription.subscription.unsubscribe();
        }
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-t-2 border-gold-500 border-r-2 border-gold-500/30 rounded-full animate-spin"></div>
          <span className="text-xs text-gold-500/80 uppercase tracking-widest animate-pulse">Verificando Credenciais...</span>
        </div>
      </div>
    );
  }

  // Se não houver sessão, redireciona para login preservando a origem
  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;