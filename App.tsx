import React, { Suspense, lazy, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import { LanguageProvider } from './contexts/LanguageContext';

// Lazy Load Pages for Performance (WPO)
const Home = lazy(() => import('./pages/Home'));
const ProfileDetail = lazy(() => import('./pages/ProfileDetail'));
const CompanionDashboard = lazy(() => import('./pages/CompanionDashboard'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacidade = lazy(() => import('./pages/Privacidade'));
const About = lazy(() => import('./pages/About'));
const Advertise = lazy(() => import('./pages/Advertise'));
const Login = lazy(() => import('./pages/Login'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const EditCompanion = lazy(() => import('./pages/EditCompanion'));

// Loading Skeleton for Suspense
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-midnight">
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 border-4 border-gold-500/30 border-t-gold-500 rounded-full animate-spin mb-4"></div>
      <span className="text-gold-500 font-serif text-sm tracking-widest animate-pulse">CARREGANDO...</span>
    </div>
  </div>
);

// 404 Page Component
const NotFound = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
    <h1 className="text-6xl font-serif text-gold-500 mb-4">404</h1>
    <h2 className="text-xl text-white font-light mb-6">Página não encontrada</h2>
    <p className="text-slate-400 max-w-md mb-8">
      A página que você está procurando pode ter sido removida ou o link está incorreto.
    </p>
    <Link 
      to="/" 
      className="px-8 py-3 bg-gold-600 text-black font-bold uppercase tracking-widest rounded hover:bg-gold-500 transition-colors"
    >
      Voltar para Home
    </Link>
  </div>
);

// UX Fix: Componente para rolar ao topo na navegação
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/perfil/:slug" element={<ProfileDetail />} />
              
              {/* Painel da Modelo (Demo Pública) */}
              <Route path="/painel/:companionId" element={<CompanionDashboard />} />
              
              <Route path="/anunciar" element={<Advertise />} />
              <Route path="/termos" element={<Terms />} />
              <Route path="/privacidade" element={<Privacidade />} />
              <Route path="/sobre" element={<About />} />
              
              {/* Área Administrativa */}
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/models/:id" element={<EditCompanion />} />

              {/* Fallback 404 - Captura qualquer rota não definida */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </LanguageProvider>
  );
};

export default App;