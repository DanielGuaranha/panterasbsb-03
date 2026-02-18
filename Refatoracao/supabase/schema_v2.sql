-- SCHEMA V2 - HARDENED FOR PRODUCTION

-- 1. Tabela de Auditoria (Segurança e Disputas)
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id), -- Pode ser null para ações anônimas importantes
  action TEXT NOT NULL,
  details JSONB,
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabela de Controle de Acesso a Conteúdo (Substitui lógica frágil de localStorage)
-- Esta tabela valida se um usuário (ou sessão anônima via token) pode ver uma foto
CREATE TABLE content_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_identifier TEXT NOT NULL, -- UUID do auth.users ou Fingerprint do visitante
  resource_type TEXT NOT NULL CHECK (resource_type IN ('gallery', 'video', 'chat')),
  resource_id UUID NOT NULL, -- ID da Companion ou GalleryItem
  granted_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ, -- Para acessos temporários
  transaction_id UUID -- Link para a transação financeira (se houver)
);

CREATE INDEX idx_permissions_user_resource ON content_permissions(user_identifier, resource_id);

-- 3. Acompanhantes (Atualizado com Índices)
-- Assumindo que a tabela 'companions' já existe, vamos aplicar melhorias
ALTER TABLE companions ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected'));

-- Índices Críticos para Performance de Busca (WPO)
CREATE INDEX IF NOT EXISTS idx_companions_location ON companions(city, neighborhood);
CREATE INDEX IF NOT EXISTS idx_companions_vip_featured ON companions(is_vip, featured_until);
CREATE INDEX IF NOT EXISTS idx_companions_status ON companions(whatsapp_status);

-- 4. RLS (Segurança) - REVISÃO
ALTER TABLE companions ENABLE ROW LEVEL SECURITY;

-- Política: Qualquer um vê perfis ativos
CREATE POLICY "Public Active Profiles" ON companions
  FOR SELECT USING (whatsapp_status = 'active');

-- Política: Apenas Admin ou a Própria Modelo edita seu perfil
-- Nota: Requer setup de Custom Claims ou tabela de 'admins' separada para produção real
CREATE POLICY "Owner Edit Profile" ON companions
  FOR UPDATE USING (auth.uid() = id::uuid); -- Assumindo que o ID da companion é o mesmo do Auth User

-- 5. Chat Seguro (V2)
-- Removemos a dependência pura de localStorage e usamos RLS
ALTER TABLE companion_chats ENABLE ROW LEVEL SECURITY;

-- Política: Usuário só vê seus próprios chats
CREATE POLICY "User View Own Chats" ON companion_chats
  FOR SELECT USING (
    client_session_id = current_setting('request.headers')::json->>'x-session-id' -- Header customizado enviado pelo Middleware/Client
    OR 
    companion_id::text = auth.uid()::text
  );
