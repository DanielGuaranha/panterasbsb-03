# Relatório de Auditoria Técnica: Panteras BSB (MVP Atual)

**Data:** 24/01/2025
**Auditor:** Senior Fullstack Engineer
**Veredito:** "Um Castelo de Cartas Visual"

## 1. Arquitetura e Stack (O Erro Original)

### SPA (Vite) para um Diretório SEO
Você escolheu Vite (SPA - Single Page Application) para um site cujo *core business* é SEO (vitrine de modelos).
*   **O Problema:** Todo o meta-data (SEO) está sendo injetado via `useEffect` no cliente. Crawlers simples (Facebook, Twitter, WhatsApp previews) vão ver uma página em branco ou genérica.
*   **Impacto:** Compartilhamento de links quebrado, indexação pobre no Google.
*   **Correção:** Migração obrigatória para **Next.js (SSR)**.

### Gerenciamento de Estado
*   **O Problema:** Uso de `useEffect` para chamadas de API diretas. Isso causa *Waterfalls* (cascatas) de requisições e *race conditions*.
*   **Correção:** Implementar **TanStack Query** (React Query) para cache e deduplicação.

## 2. Segurança e Dados (Risco Crítico)

### Identidade via LocalStorage
*   **O Problema:** O chat cria um `client_session_id` e salva no `localStorage`.
*   **Risco:** Se limpar o cache, perde o histórico. Se editar o `localStorage`, sequestra a sessão de outro.
*   **Veredito:** Segurança de nível amador para um site "Premium".

### Exposição de Lógica (Mocks)
*   **O Problema:** O arquivo `src/services/supabaseClient.ts` contém dados mockados hardcoded.
*   **Risco:** Infla o bundle JS e expõe lógica de negócio/dados de teste em produção.

## 3. Código e Manutenibilidade

### TypeScript "Preguiçoso"
*   **O Problema:** Uso excessivo de `any` e `@ts-ignore`.
*   **Exemplo:** `const handleInputChange = (field: keyof CompanionWithGallery, value: any)`.
*   **Impacto:** Mata o propósito do TypeScript. Refatorações futuras quebrarão o código silenciosamente.

### "Hard Delete" Fake
*   **O Problema:** Remoção de modelos (ex: "Isabella Gold") feita editando o código fonte, não via banco de dados.
*   **Impacto:** O software não é dinâmico. Requer deploy para banir um usuário.

## 4. UX e "Luxo" (A Ilusão)

### Pagamento Fake
*   **O Problema:** Uso de `setTimeout` para simular pagamento.
*   **Impacto:** Engana o usuário e o cliente. Integrar um gateway real exigirá reescrever todo o fluxo para lidar com Webhooks.

### Imagens "Smart" Burras
*   **O Problema:** Otimização de imagem acoplada ao Unsplash (string concatenation).
*   **Impacto:** Quebra imediata ao usar Supabase Storage.

## 5. Resumo das Notas

*   **Frontend Visual:** 6/10 (Bonito, mas arquitetura de dados fraca).
*   **Backend/Integração:** 4/10 (Inseguro, dependente de mocks).
*   **Código:** 5/10 (Spaghetti code, mistura de responsabilidades).
