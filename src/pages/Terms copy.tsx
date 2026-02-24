import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { SEO_CONFIG } from '../lib/seoConfig';

const Terms: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-slate-300">
      
      {/* Implementação Técnica de SEO */}
      <SEO 
        title={SEO_CONFIG.terms.title}
        description={SEO_CONFIG.terms.description}
      />
      
      {/* Cabeçalho Semântico */}
      <div className="mb-12 text-center">
        <h1 className="font-serif text-3xl md:text-5xl text-gold-500 mb-4 drop-shadow-lg leading-tight">
          Termos de Uso – Panteras BSB
        </h1>
        <p className="text-xs text-slate-500 uppercase tracking-widest">
          Última atualização: {new Date().getFullYear()}
        </p>
      </div>

      {/* Aviso de Destaque (Disclaimer Principal) */}
      <div className="bg-slate-900/80 border-l-4 border-gold-500 p-6 md:p-8 rounded-r-lg mb-12 shadow-lg">
        <h3 className="text-gold-400 font-serif text-lg mb-2">Aviso Importante</h3>
        <p className="text-white font-medium leading-relaxed">
          O Panteras BSB é uma plataforma de <strong>publicidade digital (vitrine)</strong>. 
          Não atuamos como agência de modelos, não realizamos agenciamento e não intermediamos pagamentos ou encontros. 
          Todo contato é direto entre você e o anunciante.
        </p>
      </div>

      <div className="space-y-12">
        
        {/* 1. Natureza da Plataforma */}
        <TermSection number="01" title="Natureza da Plataforma (Vitrine, não Agência)">
          <p>
            Somos um diretório de classificados online focado em publicidade para acompanhantes independentes em Brasília. 
            Nossa função limita-se a fornecer espaço tecnológico para que profissionais autônomos promovam seus perfis, fotos e serviços.
          </p>
          <p className="mt-2 text-slate-400 text-sm">
            Não participamos da negociação de valores, definição de locais ou qualquer logística dos encontros.
          </p>
        </TermSection>

        {/* 2. Elegibilidade */}
        <TermSection number="02" title="Elegibilidade e Acesso (+18)">
          <p>
            O acesso a este site é estritamente proibido para menores de 18 anos. Ao navegar por nossas páginas, você declara, sob as penas da lei (incluindo o Art. 299 do Código Penal Brasileiro - Falsidade Ideológica), que:
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-2 text-slate-400 marker:text-gold-500">
            <li>Possui 18 anos completos ou mais;</li>
            <li>Acessa este conteúdo por livre e espontânea vontade;</li>
            <li>Não considera o conteúdo adulto ofensivo ou ilegal em sua jurisdição.</li>
          </ul>
        </TermSection>

        {/* 3. Responsabilidades */}
        <TermSection number="03" title="Responsabilidades de Usuários e Anunciantes">
          <p>
            Para manter a segurança e a qualidade da comunidade, é expressamente proibido:
          </p>
          <ul className="grid gap-3 mt-4 mb-6">
            <ListItem icon="🚫">
              <strong>Assediar ou ameaçar:</strong> Trate os anunciantes com respeito e cordialidade. Não toleramos discurso de ódio.
            </ListItem>
            <ListItem icon="⚖️">
              <strong>Ilegalidades:</strong> Solicitar serviços que violem a legislação brasileira vigente.
            </ListItem>
          </ul>
          <p>
            Os anunciantes (modelos) são profissionais independentes e únicos responsáveis pela veracidade das informações, fotos e vídeos publicados em seus perfis.
          </p>
          <div className="mt-4 bg-slate-900/50 p-4 rounded border border-slate-800">
            <p className="text-sm text-slate-400">
              <strong className="text-gold-400">Nota de Segurança:</strong> O Panteras BSB não garante a conduta, saúde ou integridade física de nenhum usuário ou anunciante. Recomendamos sempre cautela e bom senso em seus encontros.
            </p>
          </div>
        </TermSection>

        {/* 4. Privacidade e LGPD */}
        <TermSection number="04" title="Privacidade e Proteção de Dados (LGPD)">
          <p>
            Respeitamos sua privacidade conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
            Nossa coleta de dados é mínima e visa apenas a segurança e operação técnica do site.
          </p>
          <ul className="list-disc pl-5 mt-4 mb-4 space-y-2 text-slate-400 marker:text-gold-500">
            <li><strong>Coleta Mínima:</strong> Usamos apenas cookies essenciais.</li>
            <li><strong>Chat Anônimo:</strong> Nossas conversas via chat utilizam identificadores temporários.</li>
            <li><strong>Direito de Remoção:</strong> Qualquer pessoa retratada no site tem o direito de solicitar a remoção imediata de sua imagem.</li>
          </ul>
          <p className="text-sm italic text-gold-500/80 mt-4 border-l-2 border-gold-500/30 pl-3">
            Para detalhes sobre como tratamos seus dados pessoais, consulte nossa <Link to="/privacidade" className="underline hover:text-white">Política de Privacidade</Link>.
          </p>
        </TermSection>

        {/* 5. Pagamentos e Planos (Link Corrigido) */}
        <TermSection number="05" title="Pagamentos e Planos">
           <p>
             Para anunciantes, oferecemos planos de destaque e visibilidade. Os detalhes, valores e condições de pagamento estão descritos na página de <Link to="/anunciar" className="text-gold-400 hover:underline">Anúncios</Link>.
           </p>
           <p className="mt-2 text-slate-400 text-sm">
             Não há reembolso para períodos não utilizados após a ativação do serviço de publicidade, salvo em casos de falha técnica comprovada da plataforma.
           </p>
        </TermSection>

        {/* 6. Propriedade Intelectual */}
        <TermSection number="06" title="Propriedade Intelectual">
          <p>
            A marca "Panteras BSB", o código-fonte, o design visual e a estrutura do site são propriedade exclusiva da plataforma.
          </p>
          <p className="mt-2">
            O conteúdo de mídia (fotos e vídeos dos perfis) pertence aos respectivos anunciantes, que concederam licença de uso para exibição nesta vitrine. É proibido copiar ou distribuir este material.
          </p>
        </TermSection>

        {/* 7. Alterações */}
        <TermSection number="07" title="Alterações destes Termos">
          <p>
            Estes termos podem ser alterados a qualquer momento para refletir mudanças legais ou de funcionalidade. O uso continuado da plataforma implica na aceitação das atualizações.
          </p>
        </TermSection>

        {/* 8. Foro */}
        <TermSection number="08" title="Foro e Disposições Gerais">
          <p className="text-sm text-slate-500">
            Fica eleito o foro da Comarca de Brasília/DF para dirimir quaisquer dúvidas oriundas destes termos, renunciando-se a qualquer outro, por mais privilegiado que seja.
          </p>
        </TermSection>

      </div>

      {/* Rodapé de Contato */}
      <div className="mt-16 pt-10 border-t border-slate-800 text-center">
        <p className="text-slate-400 mb-2 font-medium">Ficou com alguma dúvida jurídica?</p>
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

// Sub-componentes visuais
const TermSection: React.FC<{ number: string; title: string; children: React.ReactNode }> = ({ number, title, children }) => (
  <section className="relative pl-0 md:pl-4 border-l-0 md:border-l border-slate-800/50 hover:border-gold-500/30 transition-colors duration-500">
    <div className="flex items-center gap-4 mb-4">
      <span className="text-4xl md:text-5xl font-serif text-slate-800 font-bold opacity-50 select-none">
        {number}
      </span>
      <h2 className="text-xl md:text-2xl text-gold-400 font-serif leading-tight">
        {title}
      </h2>
    </div>
    <div className="text-slate-300 font-light leading-relaxed text-sm md:text-base pl-2 md:pl-0">
      {children}
    </div>
  </section>
);

const ListItem: React.FC<{ icon: string; children: React.ReactNode }> = ({ icon, children }) => (
  <li className="flex gap-4 bg-slate-900/40 p-3 rounded border border-slate-800/50 hover:border-gold-500/20 transition-colors">
    <span className="text-xl shrink-0 select-none">{icon}</span>
    <span className="text-sm text-slate-300 leading-snug">{children}</span>
  </li>
);

export default Terms;