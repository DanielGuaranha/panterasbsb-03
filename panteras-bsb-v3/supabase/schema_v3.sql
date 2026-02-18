-- SCHEMA V3 - O DEFINITIVO (Versão Corrigida para Re-execução)
-- Execute isso no SQL Editor do Supabase para resetar e criar a estrutura correta.

-- 0. Limpeza (Reset) - Remove tabelas antigas para evitar erro 42P07
-- CUIDADO: Isso apaga todos os dados existentes nessas tabelas!
DROP TABLE IF EXISTS public.messages CASCADE;
DROP TABLE IF EXISTS public.conversations CASCADE;
DROP TABLE IF EXISTS public.content_access CASCADE;
DROP TABLE IF EXISTS public.gallery_items CASCADE;
DROP TABLE IF EXISTS public.companions CASCADE;

-- 1. Tabela de Perfis (Modelos)
create table public.companions (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  display_name text not null,
  short_bio text,
  full_bio text,
  city text default 'Brasília',
  neighborhood text,
  whatsapp_number text not null,
  whatsapp_status text default 'active' check (whatsapp_status in ('active', 'banned', 'paused')),
  is_vip boolean default false,
  base_price numeric,
  pricing_mode text default 'contact', -- fixed, negotiable, contact
  stats jsonb default '{}'::jsonb, -- { age, height, weight, ... } flexível
  cover_image_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Índices para Performance
create index idx_companions_status on public.companions(whatsapp_status);
create index idx_companions_location on public.companions(city, neighborhood);

-- 2. Galeria
create table public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  companion_id uuid references public.companions(id) on delete cascade not null,
  url text not null,
  type text default 'image', -- image, video
  is_premium boolean default false,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 3. Controle de Acesso (Paywall / Permissões)
create table public.content_access (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  resource_type text not null check (resource_type in ('gallery_full', 'video_item', 'whatsapp_reveal')),
  resource_id uuid not null,
  transaction_id uuid,
  expires_at timestamptz,
  created_at timestamptz default now()
);

create index idx_access_lookup on public.content_access(session_id, resource_id);

-- 4. Sistema de Chat
create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  companion_id uuid references public.companions(id) not null,
  visitor_id text not null,
  last_message text,
  last_message_at timestamptz default now(),
  unread_count int default 0,
  created_at timestamptz default now(),
  unique(companion_id, visitor_id)
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references public.conversations(id) on delete cascade not null,
  sender_role text not null check (sender_role in ('visitor', 'companion', 'system')),
  content text not null,
  created_at timestamptz default now()
);

-- 5. Segurança (RLS)
alter table public.companions enable row level security;
alter table public.gallery_items enable row level security;
alter table public.content_access enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;

-- Políticas
create policy "Leitura pública de perfis ativos" on public.companions
  for select using (whatsapp_status = 'active');

create policy "Leitura pública de galeria" on public.gallery_items
  for select using (true);

create policy "Leitura pública de acesso" on public.content_access
  for select using (true);

create policy "Anonimos criam conversa" on public.conversations
  for insert with check (true);
  
create policy "Anonimos leem suas conversas" on public.conversations
  for select using (true); -- Simplificado para MVP (idealmente filtrar por visitor_id)

create policy "Anonimos enviam mensagens" on public.messages
  for insert with check (true);

create policy "Anonimos leem mensagens" on public.messages
  for select using (true);

-- Storage (Bucket) - Trata erro se já existir
insert into storage.buckets (id, name, public) 
values ('profiles', 'profiles', true)
on conflict (id) do nothing;

drop policy if exists "Imagens Públicas" on storage.objects;
create policy "Imagens Públicas" on storage.objects for select using (bucket_id = 'profiles');
