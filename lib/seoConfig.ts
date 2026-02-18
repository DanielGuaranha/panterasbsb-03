
export interface SeoRouteConfig {
  title: string;
  description: string;
  noIndex?: boolean;
}

export const SEO_CONFIG = {
  home: {
    title: "Panteras BSB - Acompanhantes VIP em Brasília DF | Encontros Premium",
    description: "Descubra os perfis mais exclusivos de acompanhantes em Brasília DF no Panteras BSB. Curadoria de luxo, discrição e segurança garantida."
  },
  about: {
    title: "Sobre o Panteras BSB | Diretório de Acompanhantes em Brasília",
    description: "Conheça a missão do Panteras BSB: diretório de acompanhantes em Brasília com foco em luxo, discrição, segurança digital e curadoria premium de perfis verificados."
  },
  advertise: {
    title: "Anunciar como Acompanhante em Brasília | Panteras BSB",
    description: "Cadastre-se no Panteras BSB e tenha uma vitrine de luxo em Brasília DF. Curadoria rigorosa, chat seguro e divulgação para um público qualificado e discreto."
  },
  terms: {
    title: "Termos de Uso | Panteras BSB – Plataforma de Publicidade Adulta em Brasília",
    description: "Leia os Termos de Uso do Panteras BSB, diretório de publicidade adulta em Brasília. Entenda regras de acesso +18, responsabilidades, uso do site e proteção de dados."
  },
  privacy: {
    title: "Política de Privacidade e LGPD | Panteras BSB",
    description: "Política de Privacidade completa do Panteras BSB em conformidade com a LGPD. Saiba como protegemos seus dados pessoais e seus direitos como titular."
  },
  dashboard: {
    title: "Painel da Modelo | Panteras BSB",
    description: "Área restrita para gerenciamento de perfil.",
    noIndex: true
  }
};
