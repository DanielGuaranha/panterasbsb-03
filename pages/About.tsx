import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  // SEO: Title e Meta Description
  useEffect(() => {
    document.title = "Sobre o Panteras BSB | Vitrine Premium de Acompanhantes em Brasília";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 
      'Conheça o Panteras BSB: plataforma premium de publicidade para acompanhantes em Brasília DF. Tecnologia, curadoria rigorosa, LGPD e suporte humanizado. Saiba nossa história e valores.'
    );
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pb-24 bg-midnight min-h-screen">
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-slate-900 to-midnight border-b border-gold-500/20">
        <div className="max-w-5xl mx-auto px-4 py-16 md:py-24 text-center">
          <div className="inline-block mb-4 px-4 py-1 bg-gold-500/10 border border-gold-500/30 rounded-full">
            <span className="text-gold-400 text-xs font-bold uppercase tracking-widest">Nossa História</span>
          </div>
          
          <h1 className="font-serif text-4xl md:text-6xl text-white mb-6 drop-shadow-lg leading-tight">
            Bem-vindo ao <span className="text-gold-500">Panteras BSB</span>
          </h1>
          
          <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light">
            A vitrine de luxo que redefine o padrão de <strong className="text-gold-400">excelência, discrição e tecnologia</strong> para acompanhantes em Brasília DF.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">

        {/* Manifesto */}
        <section className="py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl text-gold-500 mb-6">Por Que Existimos</h2>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  O mercado de acompanhantes em Brasília sempre mereceu uma plataforma à altura da sofisticação da capital federal. Cansados de sites desatualizados, perfis falsos e falta de suporte, criamos o <strong className="text-gold-400">Panteras BSB</strong>.
                </p>
                <p>
                  Nossa missão é simples: <strong>conectar profissionais de elite a clientes exigentes</strong>, com tecnologia de ponta, segurança jurídica (LGPD) e uma experiência visual impecável.
                </p>
                <p className="text-gold-200 italic border-l-2 border-gold-500/50 pl-4">
                  "Não somos apenas uma vitrine. Somos o padrão que o mercado precisava."
                </p>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-gold-500/20 rounded-2xl p-8 shadow-2xl">
              <h3 className="text-gold-400 font-serif text-2xl mb-6 text-center">Nossos Números</h3>
              <div className="grid grid-cols-2 gap-6">
                <StatCard number="200+" label="Perfis Verificados" />
                <StatCard number="50k+" label="Visitantes/Mês" />
                <StatCard number="100%" label="LGPD Compliant" />
                <StatCard number="24/7" label="Suporte Ativo" />
              </div>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-16 border-t border-slate-800">
          <h2 className="font-serif text-3xl text-gold-500 mb-12 text-center">Nossos Valores</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <ValueCard 
              icon="🔒"
              title="Discrição Total"
              description="Zero vazamento de dados. LGPD rigorosa. Chat criptografado. Sua privacidade é inviolável."
            />
            <ValueCard 
              icon="✨"
              title="Curadoria Premium"
              description="Perfis verificados manualmente. Fotos reais em alta resolução. Zero tolerância a fake profiles."
            />
            <ValueCard 
              icon="⚡"
              title="Tecnologia de Ponta"
              description="Interface moderna, filtros inteligentes, carregamento rápido. Construído com React + Supabase."
            />
            <ValueCard 
              icon="🤝"
              title="Suporte Humanizado"
              description="Time real respondendo via WhatsApp. Não somos robôs. Resolvemos problemas de verdade."
            />
            <ValueCard 
              icon="💎"
              title="Transparência"
              description="Preços claros. Sem taxas ocultas. Sem surpresas. O que você vê é o que você paga."
            />
            <ValueCard 
              icon="🇧🇷"
              title="100% Brasileiro"
              description="Plataforma desenvolvida em Brasília, para Brasília. Conhecemos o mercado local como ninguém."
            />
          </div>
        </section>

        {/* Como Funciona */}
        <section className="py-16 border-t border-slate-800">
          <h2 className="font-serif text-3xl text-gold-500 mb-4 text-center">Como Funciona</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Para anunciantes: em 3 passos simples, seu perfil está no ar
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <StepCard 
              step="1"
              title="Cadastro Rápido"
              description="Preencha o formulário com suas informações. Upload de fotos em alta qualidade. Validamos maioridade em até 24h."
            />
            <StepCard 
              step="2"
              title="Escolha Seu Plano"
              description="Básico (gratuito), Destaque ou VIP. Valores transparentes. Sem pegadinhas. Pagamento via PIX ou cartão."
            />
            <StepCard 
              step="3"
              title="Perfil no Ar!"
              description="Seu anúncio fica visível 24/7. Receba contatos direto no WhatsApp. Atualize quando quiser pelo painel."
            />
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/anunciar" 
              className="inline-block bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-black px-10 py-4 rounded-lg font-bold text-lg transition-all shadow-lg shadow-gold-500/30 hover:scale-105"
            >
              Começar Agora →
            </Link>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="py-16 border-t border-slate-800">
          <h2 className="font-serif text-3xl text-gold-500 mb-12 text-center">Por Que Somos Diferentes</h2>

          <div className="space-y-6">
            <DifferentialCard 
              title="Não Somos Agência"
              description="Você mantém 100% da autonomia. Sem intermediários. Negociações diretas com clientes. Sem comissões absurdas."
              highlight
            />
            <DifferentialCard 
              title="Design que Converte"
              description="Interface de luxo desenvolvida por designers profissionais. Fotos em destaque. Mobile-first. Carrega em menos de 2 segundos."
            />
            <DifferentialCard 
              title="SEO Avançado"
              description="Otimizado para aparecer no Google. Perfis indexados com keywords estratégicas. Traga tráfego orgânico qualificado."
            />
            <DifferentialCard 
              title="LGPD 100% Compliance"
              description="Política de privacidade transparente. DPO disponível. Direito de exclusão de dados. Criptografia end-to-end no chat."
            />
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-16 border-t border-slate-800">
          <div className="bg-gradient-to-r from-gold-900/20 to-gold-800/10 border border-gold-500/30 rounded-2xl p-12 text-center">
            <h2 className="font-serif text-3xl text-gold-400 mb-6">O Que Dizem Sobre Nós</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <TestimonialCard 
                quote="Melhor plataforma que já usei em Brasília. Suporte rápido e perfil sempre no topo!"
                author="Júlia R."
                role="Anunciante VIP"
              />
              <TestimonialCard 
                quote="Interface linda e profissional. Finalmente um site à altura das acompanhantes de BSB."
                author="Carlos M."
                role="Usuário Premium"
              />
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 border-t border-slate-800">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl text-white mb-6">Pronta Para Brilhar?</h2>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              Junte-se às profissionais mais bem-sucedidas de Brasília. Perfil premium, tecnologia de ponta e suporte que funciona.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/anunciar"
                className="bg-gold-500 hover:bg-gold-400 text-black px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg"
              >
                Criar Meu Perfil
              </Link>
              <Link 
                to="/"
                className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors border border-slate-700"
              >
                Ver Anunciantes
              </Link>
            </div>
          </div>
        </section>

        {/* Contato */}
        <section className="py-16 border-t border-slate-800">
          <div className="text-center">
            <h3 className="font-serif text-2xl text-gold-500 mb-4">Dúvidas? Fale Conosco</h3>
            <p className="text-slate-400 mb-6">Estamos aqui para ajudar 24/7</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="mailto:contato@panterasbsb.com"
                className="text-gold-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <span>📧</span> contato@panterasbsb.com
              </a>
              <span className="text-slate-700 hidden sm:block">•</span>
              <a 
                href="https://wa.me/5561999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <span>💬</span> WhatsApp: (61) 99999-9999
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

// Componentes Auxiliares
const StatCard: React.FC<{ number: string; label: string }> = ({ number, label }) => (
  <div className="text-center">
    <div className="text-3xl font-bold text-gold-400 mb-1">{number}</div>
    <div className="text-xs text-slate-400 uppercase tracking-wider">{label}</div>
  </div>
);

const ValueCard: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-slate-900/50 border border-slate-800 hover:border-gold-500/30 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/10">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-gold-400 font-serif text-xl mb-3">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
  </div>
);

const StepCard: React.FC<{ step: string; title: string; description: string }> = ({ step, title, description }) => (
  <div className="relative bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-gold-500/30 transition-colors">
    <div className="absolute -top-4 -left-4 w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center text-black font-bold text-xl shadow-lg">
      {step}
    </div>
    <h3 className="text-gold-400 font-serif text-xl mb-3 mt-2">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
  </div>
);

const DifferentialCard: React.FC<{ title: string; description: string; highlight?: boolean }> = ({ title, description, highlight }) => (
  <div className={`border-l-4 ${highlight ? 'border-gold-500 bg-gold-900/10' : 'border-slate-700 bg-slate-900/30'} p-6 rounded-r-lg hover:border-gold-500 transition-colors`}>
    <h3 className="text-gold-400 font-bold text-lg mb-2">{title}</h3>
    <p className="text-slate-300 text-sm leading-relaxed">{description}</p>
  </div>
);

const TestimonialCard: React.FC<{ quote: string; author: string; role: string }> = ({ quote, author, role }) => (
  <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
    <p className="text-slate-300 italic mb-4 leading-relaxed">"{quote}"</p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gold-500/20 rounded-full flex items-center justify-center text-gold-400 font-bold">
        {author.charAt(0)}
      </div>
      <div>
        <div className="text-white font-bold text-sm">{author}</div>
        <div className="text-slate-500 text-xs">{role}</div>
      </div>
    </div>
  </div>
);

export default About;