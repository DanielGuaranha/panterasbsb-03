import React, { useEffect } from 'react';

const Privacidade: React.FC = () => {
  // SEO: Title e Meta Description
  useEffect(() => {
    document.title = "Política de Privacidade e LGPD | Panteras BSB";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 
      'Política de Privacidade completa do Panteras BSB em conformidade com a LGPD. Saiba como protegemos seus dados pessoais e seus direitos como titular.'
    );
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-slate-300">
      
      {/* Cabeçalho */}
      <div className="mb-12 text-center">
        <h1 className="font-serif text-3xl md:text-5xl text-gold-500 mb-4 drop-shadow-lg">
          Política de Privacidade
        </h1>
        <p className="text-xs text-slate-500 uppercase tracking-widest">
          Em conformidade com a LGPD (Lei nº 13.709/2018) • Atualizado em: 24 de janeiro de 2026
        </p>
      </div>

      {/* Aviso de Destaque */}
      <div className="bg-slate-900/80 border-l-4 border-gold-500 p-6 md:p-8 rounded-r-lg mb-12 shadow-lg">
        <h3 className="text-gold-400 font-serif text-lg mb-2">Transparência e Confiança</h3>
        <p className="text-white font-medium leading-relaxed">
          O Panteras BSB respeita sua privacidade. Esta política descreve como tratamos os dados em nossa plataforma de publicidade adulta, garantindo segurança para <strong>visitantes</strong> e <strong>anunciantes</strong>.
        </p>
      </div>

      <div className="space-y-12">
        
        {/* 1. Introdução */}
        <PrivacySection title="1. Introdução">
          <p>
            O Panteras BSB é um diretório digital de anúncios para maiores de 18 anos. Ao acessar ou utilizar nossa plataforma, você concorda com a coleta e uso de informações conforme descrito nesta política. Nosso compromisso é limitar a coleta de dados ao mínimo necessário para a operação da vitrine.
          </p>
        </PrivacySection>

        {/* 2. Controlador */}
        <PrivacySection title="2. Controlador dos Dados">
          <p>
            Para fins da Lei Geral de Proteção de Dados (LGPD), o Panteras BSB atua como <strong>Controlador</strong> dos dados pessoais coletados através do site. Dúvidas sobre tratamento de dados podem ser encaminhadas ao nosso Encarregado de Dados (DPO) via e-mail.
          </p>
        </PrivacySection>

        {/* 3. Dados Coletados */}
        <PrivacySection title="3. Quais Dados Coletamos">
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div className="bg-slate-900/40 p-4 rounded border border-slate-800">
              <h4 className="text-gold-400 font-bold mb-2">De Visitantes (Clientes)</h4>
              <ul className="list-disc pl-4 space-y-2 text-sm text-slate-400">
                <li><strong>Logs de Acesso:</strong> Endereço IP, data e hora de acesso (obrigação legal conforme Marco Civil da Internet).</li>
                <li><strong>Dados de Navegação:</strong> Tipo de dispositivo, navegador e páginas visitadas (via cookies essenciais).</li>
                <li><strong>Chat Anônimo:</strong> Conteúdo das mensagens trocadas via chat (armazenadas temporariamente vinculadas a um ID de sessão anônimo).</li>
              </ul>
            </div>
            <div className="bg-slate-900/40 p-4 rounded border border-slate-800">
              <h4 className="text-gold-400 font-bold mb-2">De Anunciantes (Modelos)</h4>
              <ul className="list-disc pl-4 space-y-2 text-sm text-slate-400">
                <li><strong>Dados Cadastrais:</strong> Nome artístico, telefone (WhatsApp), e-mail.</li>
                <li><strong>Mídia:</strong> Fotos e vídeos fornecidos para composição do perfil.</li>
                <li><strong>Dados Físicos:</strong> Idade, altura, medidas (para exibição pública no anúncio).</li>
                <li><strong>Verificação:</strong> Documentos de identidade (apenas para validação de maioridade, não exibidos publicamente).</li>
              </ul>
            </div>
          </div>
        </PrivacySection>

        {/* 4. Finalidade */}
        <PrivacySection title="4. Para Que Usamos os Dados">
          <ul className="space-y-3 mt-2">
            <ListItem icon="🎯">
              <strong>Operação da Vitrine:</strong> Publicar e manter os perfis dos anunciantes online e acessíveis.
            </ListItem>
            <ListItem icon="🛡️">
              <strong>Segurança e Compliance:</strong> Prevenir fraudes, perfis falsos e garantir que nenhum menor de idade anuncie na plataforma.
            </ListItem>
            <ListItem icon="💬">
              <strong>Comunicação:</strong> Permitir o contato entre visitantes e anunciantes (via redirecionamento WhatsApp ou chat interno) e enviar avisos operacionais aos anunciantes.
            </ListItem>
          </ul>
          <p className="mt-4 text-sm bg-red-900/20 text-red-200 p-3 rounded border border-red-900/30">
            <strong>Importante:</strong> Nós nunca vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins de marketing não relacionado à plataforma.
          </p>
        </PrivacySection>

        {/* 5. Base Legal */}
        <PrivacySection title="5. Base Legal (LGPD)">
          <p>Tratamos seus dados baseados nas seguintes hipóteses legais:</p>
          <ul className="list-disc pl-5 mt-3 space-y-2 text-slate-400">
            <li><strong>Execução de Contrato:</strong> Para cumprir os termos de publicidade firmados com os anunciantes.</li>
            <li><strong>Legítimo Interesse:</strong> Para segurança da plataforma, prevenção a ataques cibernéticos e melhoria da UX.</li>
            <li><strong>Cumprimento de Obrigação Legal:</strong> Guarda de logs de acesso (Art. 15, Lei 12.965/14).</li>
          </ul>
        </PrivacySection>

        {/* 6. Retenção */}
        <PrivacySection title="6. Retenção e Exclusão">
          <p>
            Armazenamos os dados pessoais apenas pelo tempo necessário para cumprir as finalidades descritas ou obrigações legais.
          </p>
          <p className="mt-2">
            Anunciantes podem solicitar a exclusão de seu perfil e dados a qualquer momento. Após a solicitação, os dados públicos são removidos imediatamente, mantendo-se apenas registros internos de segurança pelo prazo legal prescricional.
          </p>
        </PrivacySection>

        {/* 7. Direitos */}
        <PrivacySection title="7. Seus Direitos como Titular">
          <p>Você tem o direito de solicitar:</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {['Acesso aos dados', 'Correção de dados incompletos', 'Anonimização', 'Exclusão', 'Portabilidade', 'Revogação do consentimento'].map(right => (
              <span key={right} className="text-xs border border-slate-700 rounded-full px-3 py-1 text-slate-400 bg-slate-800">
                {right}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm">
            Para exercer seus direitos, entre em contato através do e-mail: <a href="mailto:legal@panterasbsb.com" className="text-gold-400 hover:underline">legal@panterasbsb.com</a>.
          </p>
        </PrivacySection>

        {/* 8. Cookies */}
        <PrivacySection title="8. Cookies e Rastreamento">
          <p>
            Utilizamos <strong>cookies estritamente necessários</strong> para o funcionamento do site (ex.: manter sua sessão de chat ativa, lembrar preferências de filtro de cidade/bairro).
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Não utilizamos cookies de terceiros intrusivos que rastreiam sua navegação fora do nosso domínio. Caso implementemos cookies de marketing no futuro, solicitaremos seu consentimento explícito através de um banner.
          </p>
        </PrivacySection>

        {/* 9. Menores de Idade - SEÇÃO ADICIONADA */}
        <PrivacySection title="9. Menores de Idade">
          <div className="text-red-200 bg-red-900/20 p-4 rounded border border-red-900/30">
            <p className="font-bold mb-2">
              ⚠️ O Panteras BSB é destinado exclusivamente a maiores de 18 anos.
            </p>
            <p>
              Não coletamos intencionalmente dados de menores. Se identificarmos um cadastro de menor de idade, o perfil será imediatamente removido e as autoridades competentes notificadas, conforme ECA (Estatuto da Criança e do Adolescente - Lei 8.069/90). 
            </p>
            <p className="mt-2 text-sm">
              Responsáveis legais que identifiquem uso indevido da plataforma por menores devem reportar imediatamente para: <a href="mailto:legal@panterasbsb.com" className="underline font-bold">legal@panterasbsb.com</a>
            </p>
          </div>
        </PrivacySection>

        {/* 10. Segurança */}
        <PrivacySection title="10. Segurança da Informação">
          <p>
            Adotamos medidas técnicas e administrativas robustas para proteger seus dados, incluindo criptografia SSL (HTTPS) em trânsito, controles de acesso restrito ao banco de dados e monitoramento contra ameaças.
          </p>
          <p className="mt-2 text-xs text-slate-500 italic">
            Apesar de nossos esforços, nenhum sistema é 100% imune a ataques. Recomendamos que usuários mantenham seus dispositivos seguros e evitem compartilhar dados sensíveis em conversas abertas.
          </p>
        </PrivacySection>

        {/* 11. Atualizações */}
        <PrivacySection title="11. Atualizações desta Política">
          <p>
            Esta política pode ser revisada periodicamente para refletir mudanças na legislação ou em nossas funcionalidades. A data da última atualização estará sempre visível no topo desta página.
          </p>
        </PrivacySection>

      </div>

      {/* Rodapé Interno */}
      <div className="mt-16 pt-10 border-t border-slate-800 text-center">
        <p className="text-slate-400 mb-2 font-medium">Dúvidas sobre Privacidade?</p>
        <a 
          href="mailto:legal@panterasbsb.com" 
          className="text-gold-500 hover:text-white transition-colors text-lg font-serif italic border-b border-gold-500/30 pb-1 hover:border-white"
        >
          legal@panterasbsb.com
        </a>
      </div>
    </div>
  );
};

// Componente visual auxiliar para seções
const PrivacySection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="relative pl-0 md:pl-4 border-l-0 md:border-l border-slate-800/50 hover:border-gold-500/30 transition-colors duration-500">
    <h2 className="text-xl md:text-2xl text-gold-400 font-serif leading-tight mb-4">
      {title}
    </h2>
    <div className="text-slate-300 font-light leading-relaxed text-sm md:text-base pl-2 md:pl-0">
      {children}
    </div>
  </section>
);

const ListItem: React.FC<{ icon: string; children: React.ReactNode }> = ({ icon, children }) => (
  <li className="flex gap-4 bg-slate-900/40 p-3 rounded border border-slate-800/50">
    <span className="text-xl shrink-0 select-none">{icon}</span>
    <span className="text-sm text-slate-300 leading-snug">{children}</span>
  </li>
);

export default Privacidade;
