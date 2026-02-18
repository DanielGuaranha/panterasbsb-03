import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Advertise: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    // SEO: Title & Meta Description Otimizado para Conversão
    document.title = "Anunciar como Acompanhante em Brasília DF | Planos VIP - Panteras BSB";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 
      "Cadastre seu perfil de acompanhante no Panteras BSB. Planos Básico, Destaque e VIP. Vitrine premium em Brasília DF, chat seguro, LGPD compliance e público qualificado. Vagas limitadas."
    );

    // Meta Keywords (comercial)
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 
      'anunciar acompanhante brasília, cadastrar perfil acompanhante df, plataforma acompanhantes brasília, site para acompanhantes, vitrine digital escort'
    );
  }, []);

  const message = `Olá, equipe Panteras BSB.
Meu nome é [SEU NOME ARTÍSTICO] e tenho interesse em anunciar como acompanhante em Brasília.

Cidade/Bairro: [ex.: Brasília – Asa Norte]
Idade: [ex.: 25 anos]
Altura/Peso: [ex.: 1,68m / 58kg]
Atendo: [Homens / Mulheres / Casais]

Podem me informar os próximos passos para análise e publicação do meu perfil?`;

  const whatsappCandidacyLink = `https://wa.me/5561999999999?text=${encodeURIComponent(message)}`;

  return (
    <div className="min-h-screen bg-midnight text-slate-200 pb-20">
      
      {/* Hero Section */}
      <div className="relative pt-16 pb-20 px-4 text-center overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-gold-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-[0.65rem] font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-sm">
            💎 Vitrine Exclusiva para Profissionais de Elite
          </span>
          
          {/* H1 Otimizado para SEO + Copywriting */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight drop-shadow-2xl">
            Fature Mais com Menos Esforço <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300">
              Anuncie no Panteras BSB
            </span>
          </h1>

          {/* Copy de Conversão (Problema → Solução) */}
          <div className="max-w-2xl mx-auto mb-10 text-slate-300 font-light leading-relaxed text-sm md:text-lg space-y-4">
            <p className="text-lg md:text-xl text-gold-100">
              <strong>Cansada de plataformas ruins que não valorizam seu trabalho?</strong>
            </p>
            <p>
              O Panteras BSB é a <strong className="text-gold-400">vitrine premium de Brasília DF</strong> que atrai clientes qualificados, respeita sua autonomia e trabalha 24/7 para você. 
              <strong> Design de luxo, chat seguro e LGPD compliant.</strong>
            </p>
            <p className="text-slate-400 text-sm md:text-base">
              🚫 <strong>NÃO SOMOS AGÊNCIA.</strong> Você mantém 100% do controle. Sem comissões, sem intermediários. Só tecnologia e visibilidade.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href={whatsappCandidacyLink}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-500 text-black font-bold uppercase tracking-widest rounded shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:brightness-110 transition-all transform hover:-translate-y-1 text-center flex justify-center items-center gap-2"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              Começar Agora (WhatsApp)
            </a>
            <a 
              href="#planos"
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 border border-slate-700 text-slate-300 font-bold uppercase tracking-widest rounded hover:bg-slate-800 hover:text-white hover:border-gold-500/30 transition-all text-center block"
            >
              Ver Planos e Preços
            </a>
          </div>
          <p className="mt-6 text-[0.65rem] text-slate-500 uppercase tracking-widest">
            ⚡ Últimas 8 vagas VIP deste mês • Curadoria rigorosa para manter exclusividade
          </p>
        </div>
      </div>

      {/* Section: Benefícios (Não features, BENEFÍCIOS!) */}
      <div className="bg-[#080808] border-y border-gold-900/10">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="font-serif text-2xl md:text-3xl text-gold-500 mb-3">Por Que Anunciar no Panteras BSB?</h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">
              Diferenciais que transformam visualizações em contatos de verdade
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <BenefitCard 
              icon="💎" 
              title="Design que Valoriza Seu Cachê" 
              desc="Seus clientes veem uma vitrine premium, não um site genérico. Isso justifica seu valor e atrai quem pode pagar."
            />
            <BenefitCard 
              icon="🛡️" 
              title="Chat Seguro (Sem Expor WhatsApp)" 
              desc="Filtre curiosos antes de passar seu número. Mais segurança, menos tempo perdido com trotes."
            />
            <BenefitCard 
              icon="🎯" 
              title="SEO: Clientes Te Acham no Google" 
              desc="Otimizado para aparecer em buscas como 'acompanhante Asa Norte'. Tráfego orgânico qualificado 24/7."
            />
            <BenefitCard 
              icon="📊" 
              title="Painel Completo de Gestão" 
              desc="Controle suas fotos, bio, disponibilidade e mensagens em tempo real. Tudo na palma da mão."
            />
            <BenefitCard 
              icon="🇧🇷" 
              title="100% Brasileiro e Legal" 
              desc="LGPD compliant. Empresa registrada em Brasília. Seus dados e direitos respeitados."
            />
            <BenefitCard 
              icon="💬" 
              title="Suporte Humanizado Real" 
              desc="Time real no WhatsApp. Não somos robôs. Resolvemos seus problemas de verdade."
            />
          </div>
        </div>
      </div>

      {/* Section: Pricing Table (CRÍTICA PARA CONVERSÃO!) */}
      <div className="py-20 px-4" id="planos">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-gold-500 mb-4">Escolha Seu Plano</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Todos os planos incluem perfil completo, galeria de fotos e contato direto com clientes. 
              <strong className="text-white"> Sem comissões sobre seus atendimentos.</strong>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Plano Básico */}
            <PricingCard 
              name="Básico"
              price="Gratuito"
              period=""
              features={[
                "✅ Perfil público na vitrine",
                "✅ Até 5 fotos (compressão padrão)",
                "✅ Contato direto via WhatsApp",
                "❌ Sem destaque nos resultados",
                "❌ Sem chat interno",
                "❌ Sem badge VIP"
              ]}
              cta="Começar Grátis"
              ctaLink={whatsappCandidacyLink}
              highlight={false}
            />

            {/* Plano Destaque */}
            <PricingCard 
              name="Destaque"
              price="R$ 149"
              period="/mês"
              features={[
                "✅ Tudo do Básico +",
                "✅ Até 15 fotos em HD",
                "✅ Prioridade nos resultados de busca",
                "✅ Chat seguro integrado",
                "✅ Badge 'Verificada'",
                "✅ Suporte prioritário"
              ]}
              cta="Escolher Destaque"
              ctaLink={whatsappCandidacyLink}
              highlight={false}
            />

            {/* Plano VIP (MAIS POPULAR) */}
            <PricingCard 
              name="VIP"
              price="R$ 299"
              period="/mês"
              features={[
                "✅ Tudo do Destaque +",
                "✅ Fotos ilimitadas + vídeos",
                "✅ Topo da vitrine 24/7",
                "✅ Badge 'VIP Escort' dourada",
                "✅ Link personalizado (ex: /marina-vip)",
                "✅ Análise de visualizações",
                "✅ Sessão de fotos profissional (bônus)"
              ]}
              cta="Quero Ser VIP"
              ctaLink={whatsappCandidacyLink}
              highlight={true}
              badge="MAIS POPULAR"
            />
          </div>

          <p className="text-center text-slate-500 text-xs mt-8">
            💳 Pagamento via PIX, transferência ou cartão • 🔄 Cancele quando quiser (sem multa) • 📞 Suporte 24/7
          </p>
        </div>
      </div>

      {/* Section: Como Funciona (Processo de Seleção) */}
      <div className="py-16 bg-[#080808] border-y border-gold-900/10">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-center font-serif text-2xl md:text-3xl text-gold-500 mb-4">Como Funciona o Processo</h2>
          <p className="text-center text-slate-400 mb-12 text-sm max-w-2xl mx-auto">
            Curadoria rigorosa em 3 etapas para garantir qualidade e exclusividade da vitrine
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-6 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gold-900 to-transparent z-0" />

            <Step 
              num="1" 
              title="Pré-Cadastro Rápido" 
              desc="Clique no WhatsApp e envie: nome artístico, idade, medidas, região de atendimento. Resposta em até 24h." 
            />
            <Step 
              num="2" 
              title="Envio de Mídia" 
              desc="Aprovada? Envie suas melhores fotos/vídeos. Nosso time trata as imagens no padrão premium do site." 
            />
            <Step 
              num="3" 
              title="Perfil no Ar!" 
              desc="Seu anúncio fica visível 24/7. Você recebe login para o Painel e já pode começar a receber contatos." 
            />
          </div>
        </div>
      </div>

      {/* Section: Social Proof (Depoimentos) */}
      <div className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center font-serif text-3xl text-gold-500 mb-12">O Que Dizem Nossas Anunciantes</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <TestimonialCard 
              quote="Dobrei meus contatos em 1 semana. O chat integrado me salvou de muito trote. Vale cada centavo do VIP!"
              author="Mariana L."
              role="Anunciante VIP - Lago Sul"
              rating={5}
            />
            <TestimonialCard 
              quote="Melhor plataforma de Brasília. Design lindo, suporte rápido e clientes de qualidade. Não volto pros outros sites."
              author="Júlia R."
              role="Anunciante Destaque - Asa Norte"
              rating={5}
            />
          </div>
        </div>
      </div>

      {/* Section: FAQ (Antecipa Objeções) */}
      <div className="py-16 bg-[#080808] border-y border-gold-900/10">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-center font-serif text-3xl text-gold-500 mb-12">Perguntas Frequentes</h2>
          
          <div className="space-y-6">
            <FAQItem 
              question="Vocês cobram comissão sobre meus atendimentos?"
              answer="NÃO. Cobramos apenas o valor mensal do plano escolhido. Você fica com 100% dos seus ganhos."
            />
            <FAQItem 
              question="Posso cancelar quando quiser?"
              answer="SIM. Sem multa, sem burocracia. Basta avisar com 5 dias de antecedência do vencimento."
            />
            <FAQItem 
              question="Meus dados ficam seguros?"
              answer="SIM. Somos 100% LGPD compliant. Seus documentos são validados e excluídos após aprovação. Nunca compartilhamos com terceiros."
            />
            <FAQItem 
              question="Quanto tempo leva para aprovar meu perfil?"
              answer="24 a 48 horas após envio das fotos. Curadoria manual para garantir qualidade."
            />
            <FAQItem 
              question="Preciso ter CNPJ ou MEI?"
              answer="NÃO. Aceitamos profissionais autônomas. Emitimos recibo para fins de declaração, se necessário."
            />
          </div>
        </div>
      </div>

      {/* CTA Final Irresistível */}
      <div className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-gold-900/20 to-gold-800/10 border border-gold-500/30 rounded-2xl p-12">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Pronta para Faturar Mais?
            </h2>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              Junte-se às profissionais mais bem-sucedidas de Brasília. <br />
              <strong className="text-gold-400">Últimas 8 vagas VIP deste mês.</strong>
            </p>
            
            <a 
              href={whatsappCandidacyLink}
              target="_blank"
              rel="noreferrer"
              className="inline-block px-10 py-5 bg-gradient-to-r from-gold-600 to-gold-500 text-black font-bold text-xl uppercase tracking-widest rounded-lg shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:brightness-110 transition-all transform hover:scale-105"
            >
              💎 Criar Meu Perfil Agora
            </a>

            <p className="text-slate-500 text-xs mt-6">
              ⚡ Processo de aprovação em até 48h • 🔒 Dados protegidos por LGPD
            </p>
          </div>
        </div>
      </div>

      {/* Footer Legal */}
      <div className="max-w-4xl mx-auto px-4 py-16 mt-8 opacity-70 hover:opacity-100 transition-opacity">
        <div className="border-t border-slate-800 pt-10 text-center">
          <h3 className="text-gold-500/50 font-serif text-lg mb-6">Avisos Legais e Segurança</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-slate-400 mb-8">
            <Link to="/sobre" className="hover:text-gold-400">Sobre Nós</Link>
            <Link to="/termos" className="hover:text-gold-400">Termos de Uso</Link>
            <Link to="/privacidade" className="hover:text-gold-400">Privacidade (LGPD)</Link>
            <Link to="/login" className="hover:text-gold-400">Área Restrita</Link>
          </div>

          <div className="bg-slate-900/50 p-6 rounded border border-slate-800 text-[0.65rem] text-slate-500 leading-relaxed max-w-2xl mx-auto space-y-3">
            <p>
              <strong className="text-slate-400">Modelo de Negócio:</strong> O Panteras BSB é uma plataforma de <strong>publicidade digital</strong> para maiores de 18 anos. 
              Não atuamos como agência, não realizamos agenciamento e não recebemos comissões sobre encontros.
            </p>
            <p>
              <strong className="text-slate-400">Responsabilidade:</strong> Anunciantes são profissionais autônomos responsáveis por seus conteúdos, serviços e segurança.
              Compliance total com LGPD (Lei 13.709/18).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componentes Auxiliares
const BenefitCard: React.FC<{icon: string, title: string, desc: string}> = ({ icon, title, desc }) => (
  <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-800 hover:border-gold-500/30 transition-all duration-300 group hover:shadow-lg hover:shadow-gold-500/10">
    <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
    <h3 className="font-serif text-xl text-gold-400 mb-3">{title}</h3>
    <p className="text-sm text-slate-400 leading-relaxed font-light">{desc}</p>
  </div>
);

const PricingCard: React.FC<{
  name: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  ctaLink: string;
  highlight: boolean;
  badge?: string;
}> = ({ name, price, period, features, cta, ctaLink, highlight, badge }) => (
  <div className={`relative rounded-2xl p-8 transition-all duration-300 ${
    highlight 
      ? 'bg-gradient-to-br from-gold-900/30 to-gold-800/20 border-2 border-gold-500 shadow-2xl shadow-gold-500/20 scale-105' 
      : 'bg-slate-900/50 border border-slate-800 hover:border-gold-500/30'
  }`}>
    {badge && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold-500 text-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg">
        {badge}
      </div>
    )}
    
    <h3 className="text-2xl font-serif text-gold-400 mb-2">{name}</h3>
    <div className="mb-6">
      <span className="text-4xl font-bold text-white">{price}</span>
      <span className="text-slate-400">{period}</span>
    </div>
    
    <ul className="space-y-3 mb-8 text-sm">
      {features.map((feature, idx) => (
        <li key={idx} className={feature.startsWith('✅') ? 'text-slate-300' : 'text-slate-500'}>
          {feature}
        </li>
      ))}
    </ul>
    
    <a 
      href={ctaLink}
      target="_blank"
      rel="noreferrer"
      className={`block w-full py-3 rounded-lg font-bold text-center transition-all ${
        highlight
          ? 'bg-gold-500 text-black hover:bg-gold-400 shadow-lg'
          : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700'
      }`}
    >
      {cta}
    </a>
  </div>
);

const Step: React.FC<{num: string, title: string, desc: string}> = ({ num, title, desc }) => (
  <div className="relative z-10 flex flex-col items-center text-center">
    <div className="w-12 h-12 rounded-full bg-midnight border-2 border-gold-500 text-gold-500 font-bold text-lg flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
      {num}
    </div>
    <h4 className="text-white font-bold uppercase tracking-wider mb-2 text-sm">{title}</h4>
    <p className="text-xs text-slate-400 px-4 leading-relaxed">{desc}</p>
  </div>
);

const TestimonialCard: React.FC<{quote: string, author: string, role: string, rating: number}> = ({ quote, author, role, rating }) => (
  <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
    <div className="flex gap-1 mb-4">
      {[...Array(rating)].map((_, i) => (
        <span key={i} className="text-gold-400 text-lg">⭐</span>
      ))}
    </div>
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

const FAQItem: React.FC<{question: string, answer: string}> = ({ question, answer }) => (
  <details className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-gold-500/30 transition-colors group">
    <summary className="text-gold-400 font-bold cursor-pointer list-none flex justify-between items-center">
      {question}
      <span className="text-gold-500 group-open:rotate-180 transition-transform">▼</span>
    </summary>
    <p className="text-slate-300 text-sm mt-4 leading-relaxed">{answer}</p>
  </details>
);

export default Advertise;
