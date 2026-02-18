import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Privacidade: React.FC = () => {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = t('privacy.title') + " | Panteras BSB";
    window.scrollTo(0, 0);
  }, [t]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-slate-300">
      
      {/* Cabeçalho */}
      <div className="mb-12 text-center">
        <h1 className="font-serif text-3xl md:text-5xl text-gold-500 mb-4 drop-shadow-lg">
          {t('privacy.title')}
        </h1>
        <p className="text-xs text-slate-500 uppercase tracking-widest">
          Em conformidade com a LGPD (Lei nº 13.709/2018)
        </p>
      </div>

      <div className="space-y-12">
        
        <PrivacySection title={t('privacy.intro_title')}>
          <p>{t('privacy.intro_text')}</p>
        </PrivacySection>

        <PrivacySection title={t('privacy.data_collected')}>
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div className="bg-slate-900/40 p-4 rounded border border-slate-800">
              <h4 className="text-gold-400 font-bold mb-2">Visitantes</h4>
              <ul className="list-disc pl-4 space-y-2 text-sm text-slate-400">
                <li>Logs de Acesso (IP, Data/Hora)</li>
                <li>Cookies essenciais</li>
                <li>Chat Anônimo</li>
              </ul>
            </div>
            <div className="bg-slate-900/40 p-4 rounded border border-slate-800">
              <h4 className="text-gold-400 font-bold mb-2">Anunciantes</h4>
              <ul className="list-disc pl-4 space-y-2 text-sm text-slate-400">
                <li>Dados Cadastrais e Mídia</li>
                <li>Documentos de Verificação (Não públicos)</li>
              </ul>
            </div>
          </div>
        </PrivacySection>

        <PrivacySection title={t('privacy.purpose')}>
          <p className="mb-2">Utilizamos os dados para:</p>
          <ul className="space-y-2 text-sm text-slate-400">
             <li>🎯 Operação da Vitrine</li>
             <li>🛡️ Segurança e Compliance</li>
             <li>💬 Comunicação</li>
          </ul>
        </PrivacySection>

        <PrivacySection title={t('privacy.rights')}>
          <p>Você tem o direito de solicitar acesso, correção, anonimização ou exclusão de seus dados.</p>
        </PrivacySection>

        <PrivacySection title={t('privacy.cookies')}>
          <p>Utilizamos apenas cookies estritamente necessários para o funcionamento do site (sessão, preferências).</p>
        </PrivacySection>

        <PrivacySection title={t('privacy.contact_dpo')}>
           <p className="text-sm">
            Para exercer seus direitos, entre em contato através do e-mail: <a href="mailto:legal@panterasbsb.com" className="text-gold-400 hover:underline">legal@panterasbsb.com</a>.
          </p>
        </PrivacySection>

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

export default Privacidade;