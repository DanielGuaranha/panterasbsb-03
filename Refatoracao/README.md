# Panteras BSB - V2.0 (Arquitetura Enterprise)

Esta pasta contém a base de código refatorada para migrar de SPA (Vite) para Next.js App Router.

## Principais Mudanças Técnicas

1.  **Framework**: Next.js 14+ (Substitui Vite).
    *   *Motivo:* SEO Obrigatório (Server-Side Rendering) e Segurança de rotas.
2.  **Auth**: Supabase Auth com Cookies (HttpOnly).
    *   *Motivo:* `localStorage` é inseguro para sessões persistentes.
3.  **Banco de Dados**: Schema V2 com RLS (Row Level Security) estrito.
4.  **Estilização**: Tailwind CSS + Shadcn/UI (Design System).

## Estrutura de Pastas

```
src/
├── app/                 # App Router (Rotas)
│   ├── (auth)/          # Rotas de Autenticação (Login)
│   ├── (dashboard)/     # Rotas Protegidas (Admin/Modelos)
│   ├── api/             # Webhooks e Endpoints Server-Side
│   ├── layout.tsx       # Root Layout (Server Component)
│   └── page.tsx         # Home (Server Component - SEO)
├── components/
│   ├── ui/              # Componentes Base (Botões, Inputs - Shadcn)
│   └── business/        # Componentes de Negócio (CardModelo, Chat)
├── lib/
│   ├── supabase/        # Clientes Supabase (Server vs Client)
│   └── utils.ts         # Helpers
└── types/               # Tipagem gerada do Banco de Dados
```

## Próximos Passos para Instalação

1. Mova os arquivos desta pasta para a raiz.
2. Execute `npm install`.
3. Atualize o arquivo `.env.local` com as chaves do Supabase.
4. Rode o script SQL no painel do Supabase.
