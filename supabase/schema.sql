
-- 1. Reset (Limpeza para garantir estrutura limpa - CUIDADO EM PROD)
-- DROP TABLE IF EXISTS transactions;
-- DROP TABLE IF EXISTS live_sessions;
-- DROP TABLE IF EXISTS companion_reviews;
-- DROP TABLE IF EXISTS chat_messages;
-- DROP TABLE IF EXISTS companion_chats;
-- DROP TABLE IF EXISTS bookings;
-- DROP TABLE IF EXISTS gallery_items;
-- DROP TABLE IF EXISTS companion_categories;
-- DROP TABLE IF EXISTS categories;
-- DROP TABLE IF EXISTS companions;

-- 2. Enums (Tipos personalizados para consistência de dados)
CREATE TYPE pricing_mode_enum AS ENUM ('fixed', 'negotiable', 'contact', 'hidden');
CREATE TYPE whatsapp_status_enum AS ENUM ('active', 'banned', 'testing');
CREATE TYPE media_type_enum AS ENUM ('image', 'video');
CREATE TYPE payment_method_enum AS ENUM ('pix', 'credit_card', 'crypto');
CREATE TYPE booking_status_enum AS ENUM ('pending', 'confirmed', 'canceled', 'simulated');
CREATE TYPE sender_type_enum AS ENUM ('client', 'companion', 'system');
CREATE TYPE review_status_enum AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE live_status_enum AS ENUM ('scheduled', 'live', 'ended');
CREATE TYPE transaction_type_enum AS ENUM ('gallery_unlock', 'live_entry', 'tip', 'booking_deposit');
CREATE TYPE transaction_status_enum AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE currency_enum AS ENUM ('BRL', 'USDT', 'BTC');

-- 3. Tabelas Principais

-- Categorias (Ex: Namoradinha, Fetiche, Jantar)
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Acompanhantes (Perfil Principal)
CREATE TABLE companions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL, -- URL amigável (ex: /perfil/julia-fox)
  display_name TEXT NOT NULL,
  short_bio TEXT, -- Aparece no card
  full_bio TEXT, -- Aparece no perfil completo
  
  -- Localização
  city TEXT DEFAULT 'Brasília',
  neighborhood TEXT, -- Ex: Lago Sul, Asa Norte
  
  -- Status e Visibilidade
  is_vip BOOLEAN DEFAULT false, -- Badge Dourado
  featured_until TIMESTAMPTZ, -- Se preenchido e data futura, aparece em Destaques
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Contato
  whatsapp_number TEXT NOT NULL,
  whatsapp_backup_number TEXT,
  whatsapp_status whatsapp_status_enum DEFAULT 'active',
  whatsapp_last_updated_at TIMESTAMPTZ DEFAULT NOW(),
  display_phone BOOLEAN DEFAULT true, -- Controle de privacidade do número
  telegram_handle TEXT,
  
  -- Precificação
  base_price NUMERIC(10,2),
  pricing_mode pricing_mode_enum DEFAULT 'contact',
  
  -- Características Físicas
  age INT,
  height_cm INT,
  weight_kg INT,
  ethnicity TEXT,
  hair_color TEXT,
  eye_color TEXT,
  measurements TEXT, -- Ex: 90-60-90
  languages TEXT[], -- Array de strings: ['Português', 'Inglês']
  
  -- Preferências de Atendimento
  serves_men BOOLEAN DEFAULT true,
  serves_women BOOLEAN DEFAULT false,
  serves_couples BOOLEAN DEFAULT false
);

-- Relacionamento N:N (Categorias <-> Acompanhantes)
CREATE TABLE companion_categories (
  companion_id UUID REFERENCES companions(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (companion_id, category_id)
);

-- Galeria de Fotos/Vídeos
CREATE TABLE gallery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  companion_id UUID REFERENCES companions(id) ON DELETE CASCADE,
  media_type media_type_enum DEFAULT 'image',
  url TEXT NOT NULL, -- URL do Supabase Storage
  is_premium BOOLEAN DEFAULT false, -- Se true, aparece borrado até pagar
  is_free BOOLEAN DEFAULT true,
  unlock_price NUMERIC(10,2), -- Preço individual para desbloqueio (opcional)
  sort_order INT DEFAULT 0, -- Para ordenar as fotos
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Agendamentos (MVP: Apenas simulação para métricas)
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  companion_id UUID REFERENCES companions(id) ON DELETE CASCADE,
  client_contact TEXT, -- Opcional
  preferred_datetime TIMESTAMPTZ,
  notes TEXT,
  payment_method payment_method_enum,
  crypto_coin TEXT,
  status booking_status_enum DEFAULT 'simulated',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sistema de Chat (Simples)
CREATE TABLE companion_chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  companion_id UUID REFERENCES companions(id) ON DELETE CASCADE,
  client_session_id TEXT NOT NULL, -- ID anônimo armazenado no LocalStorage do cliente
  client_nickname TEXT, -- Apelido opcional do cliente
  last_message_at TIMESTAMPTZ DEFAULT NOW(),
  last_message_preview TEXT,
  unread_count_companion INT DEFAULT 0,
  unread_count_client INT DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(companion_id, client_session_id)
);

CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID REFERENCES companion_chats(id) ON DELETE CASCADE,
  sender_type sender_type_enum NOT NULL,
  message_text TEXT NOT NULL,
  read_at TIMESTAMPTZ,
  attachment_url TEXT,
  attachment_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Avaliações (Reviews)
CREATE TABLE companion_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  companion_id UUID REFERENCES companions(id) ON DELETE CASCADE NOT NULL,
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  
  client_pseudonym TEXT NOT NULL, -- Ex: "Admirador Secreto"
  rating SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  body TEXT,
  tags TEXT[], -- Ex: ['Beijo Bom', 'Local Limpo']
  
  visit_verified BOOLEAN DEFAULT false,
  status review_status_enum DEFAULT 'pending', -- Todas reviews entram como pendente
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Livestream System
CREATE TABLE live_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  companion_id UUID REFERENCES companions(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  status live_status_enum DEFAULT 'scheduled',
  scheduled_for TIMESTAMPTZ,
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  price_per_minute NUMERIC(10,2) DEFAULT 0,
  entry_fee NUMERIC(10,2) DEFAULT 0,
  is_private BOOLEAN DEFAULT false,
  thumbnail_url TEXT,
  viewer_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Financial System (Transações)
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_session_id TEXT NOT NULL, -- Anonymous ID ou User ID autenticado
  companion_id UUID REFERENCES companions(id) ON DELETE CASCADE,
  type transaction_type_enum NOT NULL,
  amount NUMERIC(18, 8) NOT NULL, -- Alta precisão para crypto
  currency currency_enum DEFAULT 'BRL',
  status transaction_status_enum DEFAULT 'pending',
  payment_method payment_method_enum,
  gateway_id TEXT, -- ID externo do gateway de pagamento
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Segurança (Row Level Security - RLS)

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE companions ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE companion_chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE companion_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Políticas de Leitura Públicas
CREATE POLICY "Public profiles are viewable" ON companions FOR SELECT USING (true);
CREATE POLICY "Public categories are viewable" ON categories FOR SELECT USING (true);
CREATE POLICY "Gallery items are viewable" ON gallery_items FOR SELECT USING (true);
CREATE POLICY "Approved reviews are viewable" ON companion_reviews FOR SELECT USING (status = 'approved');
CREATE POLICY "Public scheduled/live sessions" ON live_sessions FOR SELECT USING (status IN ('scheduled', 'live'));

-- Políticas de Escrita Públicas (Inserção)
CREATE POLICY "Public can create bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can review" ON companion_reviews FOR INSERT WITH CHECK (status = 'pending');

-- Políticas de Chat (Visitantes anônimos)
CREATE POLICY "Public can init chats" ON companion_chats FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can read own chats" ON companion_chats FOR SELECT USING (true); -- Simplificado para MVP
CREATE POLICY "Public can post messages" ON chat_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can read messages" ON chat_messages FOR SELECT USING (true);

-- 5. Storage (Buckets de Imagem)
insert into storage.buckets (id, name, public) values ('models-gallery', 'models-gallery', true);

create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'models-gallery' );

-- 6. Dados de Exemplo (Seed)
-- REMOVIDOS PERFIS ESPECÍFICOS A PEDIDO (DIREITO AO ESQUECIMENTO)
