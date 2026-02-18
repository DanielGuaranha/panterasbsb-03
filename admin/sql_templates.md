
# Manual do Administrador (SQL) - Panteras BSB

Como o MVP não possui painel administrativo visual, utilize o Editor SQL do Supabase.

## 1. Criar Nova Modelo

```sql
WITH new_companion AS (
  INSERT INTO companions (
    slug, 
    display_name, 
    whatsapp_number, 
    city, 
    neighborhood,
    pricing_mode,
    base_price,
    short_bio
  ) VALUES (
    'nome-slug-exemplo', -- SLUG (URL)
    'Nome Exemplo',      -- NOME VISIVEL
    '5561900000000',     -- WHATSAPP
    'Brasília',
    'Sudoeste',
    'fixed',             -- MODO PREÇO (fixed, negotiable, contact)
    250.00,              -- PREÇO BASE
    'Uma curta descrição para o card.'
  ) RETURNING id
)
-- Opcional: Adicionar foto de capa inicial (mock via gallery)
INSERT INTO gallery_items (companion_id, url, is_premium)
SELECT id, 'https://picsum.photos/400/600', false FROM new_companion;
```

## 2. Promover a VIP ou Destaque

```sql
UPDATE companions
SET 
  is_vip = true,
  featured_until = NOW() + INTERVAL '7 days' -- Destaque por 7 dias
WHERE slug = 'alice';
```

## 3. Banimento / Troca de WhatsApp (Segurança)

Caso um número caia, atualize imediatamente:

```sql
UPDATE companions
SET 
  whatsapp_status = 'banned',
  whatsapp_number = '5561999998888', -- Novo número
  whatsapp_last_updated_at = NOW()
WHERE slug = 'alice';
```

## 4. Inserir Mídia na Galeria

```sql
INSERT INTO gallery_items (companion_id, url, is_premium, media_type)
VALUES 
  ((SELECT id FROM companions WHERE slug = 'alice'), 'URL_DA_FOTO_STORAGE', true, 'image'),
  ((SELECT id FROM companions WHERE slug = 'alice'), 'URL_DO_VIDEO_STORAGE', true, 'video');
```

## 5. Ler Mensagens do Chat

```sql
SELECT 
  c.display_name,
  m.sender_type,
  m.message_text,
  m.created_at
FROM chat_messages m
JOIN companion_chats chat ON m.chat_id = chat.id
JOIN companions c ON chat.companion_id = c.id
ORDER BY m.created_at DESC
LIMIT 50;
```