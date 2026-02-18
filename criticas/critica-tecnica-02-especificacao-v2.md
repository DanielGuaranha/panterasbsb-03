# Relatório de Auditoria: Especificação Técnica V2.0

**Objeto:** Proposta de refatoração para Next.js + Supabase.
**Foco:** Viabilidade Operacional, Financeira e Legal.

Embora a V2.0 resolva os problemas de código "amador", ela introduz riscos de negócio catastróficos.

## 1. Suicídio Financeiro (Pagamentos)

*   **A Falha:** A especificação sugere usar Stripe.
*   **A Realidade:** **Stripe bane contas de conteúdo adulto instantaneamente.**
*   **O Veredito:** Erro júnior de negócio. É necessário usar Gateways High-Risk (OpenPix, Crypto, CCBill). A arquitetura precisa de um "Payment Router" agnóstico.

## 2. A Armadilha de Custos da Vercel

*   **A Falha:** Uso obrigatório de `next/image` com otimização padrão.
*   **A Realidade:** Para um site "media-heavy" (vitrine de fotos), isso vai estourar o limite do plano Pro da Vercel em dias. O custo de otimização de imagem é alto.
*   **Correção:** Usar **Cloudflare Images** ou **Supabase Image Transformations** diretamente, delegando o processamento para fora do servidor Next.js.

## 3. O Ataque dos "Zumbis" (Supabase Auth)

*   **A Falha:** Usar `Anonymous Sign-in` do Supabase para cada visitante.
*   **A Realidade:** Milhares de visitantes "curiosos" vão inflar a tabela `auth.users` com usuários fantasmas, degradando a performance e aumentando o custo do Supabase (MAU).
*   **Correção:** Gerar JWT stateless ou cookie httpOnly proprietário. Só criar usuário no Supabase (`auth.users`) quando houver conversão (pagamento ou mensagem).

## 4. Cache vs. Segurança (RLS)

*   **A Falha:** Confiança cega em RLS dentro do Next.js App Router (Server Components).
*   **A Realidade:** Server Components cacheados estaticamente podem vazar dados privados se os cookies não forem manipulados corretamente com `supabase-ssr` e `force-dynamic`.
*   **Risco:** Mostrar o WhatsApp de uma modelo banida porque a página estava em cache no CDN.

## 5. Governança de Conteúdo

*   **A Falha:** Upload direto para o Storage sem validação.
*   **A Realidade:** Risco legal extremo (CSAM, Gore, Malware).
*   **Correção:** Edge Function obrigatória para moderar imagens (AWS Rekognition ou Google Vision) antes de torná-las públicas.

## 6. Scraping e Enumeração

*   **A Falha:** Rotas públicas sem Rate Limiting agressivo.
*   **A Realidade:** O conteúdo será clonado em 24h por bots.
*   **Correção:** Middleware com Upstash/Redis para Rate Limiting e WAF.

---

**Conclusão:** A especificação V2 é tecnicamente elegante (código), mas financeiramente e operacionalmente ingênua para o nicho adulto.
