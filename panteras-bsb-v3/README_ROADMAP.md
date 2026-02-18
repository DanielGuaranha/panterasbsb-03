# Roadmap Panteras BSB v3.0 (Next.js + Supabase)

Siga esta ordem rigorosamente para evitar alucinações da IA.

## 🏁 Fase 1: Setup & Design System (Atual)
- [ ] Configurar variáveis de ambiente (.env.local)
- [ ] Instalar dependências UI: `npm install lucide-react class-variance-authority clsx tailwind-merge`
- [ ] Copiar `tailwind.config.ts` e `globals.css` do projeto antigo (Preservar identidade).
- [ ] Criar componentes base: `Button`, `Card`, `Badge` (Reutilizar do Shadcn ou código anterior).

## 🗄️ Fase 2: Banco de Dados
- [ ] Rodar o script `supabase/schema_v3.sql` no Painel do Supabase.
- [ ] Configurar Policies (RLS) para permitir leitura pública e escrita apenas autenticada (ou chat anônimo).
- [ ] Gerar tipos TypeScript: `npx supabase gen types typescript --project-id "seu-id" > src/types/supabase.ts`

## 🏠 Fase 3: Home & Perfis (Leitura)
- [ ] Criar `app/page.tsx` (Home) com busca no servidor (`await supabase...`).
- [ ] Criar `app/perfil/[slug]/page.tsx` com `generateMetadata` para SEO perfeito.
- [ ] Migrar componentes: `ProfileCard`, `Gallery`.

## 💬 Fase 4: Chat Realtime
- [ ] Criar Hook `useAnonymousID` (Cookie persistente).
- [ ] Criar Tabela `messages` com subscription no Supabase.
- [ ] Componente `ChatWidget` que abre apenas com ID da modelo.

## ⚙️ Fase 5: Admin Dashboard
- [ ] Rota `/login` (Auth com Email/Senha).
- [ ] Rota `/admin` (Protegida via Middleware).
- [ ] Formulário de Edição com Upload de Imagem real.
