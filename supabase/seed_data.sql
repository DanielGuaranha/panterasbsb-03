
-- Script de Seed para Panteras BSB
-- Insere/Atualiza 11 Modelos com URLs específicas do Storage

-- Alice
WITH new_alice AS (
  INSERT INTO companions (slug, display_name, short_bio, full_bio, city, neighborhood, whatsapp_number, base_price, pricing_mode, is_vip, age, height_cm, weight_kg, ethnicity, hair_color, eye_color, serves_men)
  VALUES ('alice', 'Alice', 'Doce universitária na Asa Sul.', 'Olá, sou a Alice. Tenho 21 anos, pele macia e adoro proporcionar momentos de relaxamento.', 'Brasília', 'Asa Sul', '5561999990001', 350, 'fixed', true, 21, 165, 55, 'Branca', 'Loiro', 'Mel', true)
  ON CONFLICT (slug) DO UPDATE SET display_name = EXCLUDED.display_name
  RETURNING id
)
INSERT INTO gallery_items (companion_id, url, media_type, is_premium, is_free)
SELECT id, 'https://bd-panterasbsb.supabase.co/storage/v1/object/public/models-gallery/alice/alice-01.jpg', 'image', false, true FROM new_alice;

-- Gabi
WITH new_gabi AS (
  INSERT INTO companions (slug, display_name, short_bio, full_bio, city, neighborhood, whatsapp_number, base_price, pricing_mode, is_vip, age, height_cm, weight_kg, ethnicity, hair_color, eye_color, serves_men)
  VALUES ('gabi', 'Gabi', 'Morena iluminada em Águas Claras.', 'Divertida, inteligente e sem frescuras. Venha me conhecer.', 'Brasília', 'Águas Claras', '5561999990002', 300, 'negotiable', false, 23, 168, 60, 'Parda', 'Morena Iluminada', 'Castanhos', true)
  ON CONFLICT (slug) DO UPDATE SET display_name = EXCLUDED.display_name
  RETURNING id
)
INSERT INTO gallery_items (companion_id, url, media_type, is_premium, is_free)
SELECT id, 'https://bd-panterasbsb.supabase.co/storage/v1/object/public/models-gallery/gabi/gabi-01.jpg', 'image', false, true FROM new_gabi;

-- Larissa
WITH new_larissa AS (
  INSERT INTO companions (slug, display_name, short_bio, full_bio, city, neighborhood, whatsapp_number, base_price, pricing_mode, is_vip, age, height_cm, weight_kg, ethnicity, hair_color, eye_color, serves_men)
  VALUES ('larissa', 'Larissa', 'Beleza clássica no Sudoeste.', 'Elegância e discrição são meus sobrenomes. Estilo namoradinha.', 'Brasília', 'Sudoeste', '5561999990003', 400, 'fixed', true, 25, 170, 58, 'Branca', 'Castanho Escuro', 'Verdes', true)
  ON CONFLICT (slug) DO UPDATE SET display_name = EXCLUDED.display_name
  RETURNING id
)
INSERT INTO gallery_items (companion_id, url, media_type, is_premium, is_free)
SELECT id, 'https://bd-panterasbsb.supabase.co/storage/v1/object/public/models-gallery/larissa/larissa-01.jpg', 'image', false, true FROM new_larissa;

-- Laura
WITH new_laura AS (
  INSERT INTO companions (slug, display_name, short_bio, full_bio, city, neighborhood, whatsapp_number, base_price, pricing_mode, is_vip, age, height_cm, weight_kg, ethnicity, hair_color, eye_color, serves_men)
  VALUES ('laura', 'Laura', 'Loirinha mignon do Lago Norte.', 'Pequena no tamanho, gigante no prazer. Adoro realizar fantasias.', 'Brasília', 'Lago Norte', '5561999990004', 250, 'fixed', false, 20, 158, 48, 'Branca', 'Loiro', 'Azuis', true)
  ON CONFLICT (slug) DO UPDATE SET display_name = EXCLUDED.display_name
  RETURNING id
)
INSERT INTO gallery_items (companion_id, url, media_type, is_premium, is_free)
SELECT id, 'https://bd-panterasbsb.supabase.co/storage/v1/object/public/models-gallery/laura/laura-01.jpg', 'image', false, true FROM new_laura;

-- Lua
WITH new_lua AS (
  INSERT INTO companions (slug, display_name, short_bio, full_bio, city, neighborhood, whatsapp_number, base_price, pricing_mode, is_vip, age, height_cm, weight_kg, ethnicity, hair_color, eye_color, serves_men)
  VALUES ('lua', 'Lua', 'Mística e alternativa na Asa Norte.', 'Gosto de rock, conversas cabeça e intensidade.', 'Brasília', 'Asa Norte', '5561999990005', 300, 'negotiable', false, 22, 165, 54, 'Branca', 'Colorido', 'Castanhos', true)
  ON CONFLICT (slug) DO UPDATE SET display_name = EXCLUDED.display_name
  RETURNING id
)
INSERT INTO gallery_items (companion_id, url, media_type, is_premium, is_free)
SELECT id, 'https://bd-panterasbsb.supabase.co/storage/v1/object/public/models-gallery/lua/lua-01.jpg', 'image', false, true FROM new_lua;

-- Luana
WITH new_luana AS (
  INSERT INTO companions (slug, display_name, short_bio, full_bio, city, neighborhood, whatsapp_number, base_price, pricing_mode, is_vip, age, height_cm, weight_kg, ethnicity, hair_color, eye_color, serves_men)
  VALUES ('luana', 'Luana', 'VIP Escort de luxo no Lago Sul.', 'Auge da beleza e educação. Acompanho em jantares e viagens.', 'Brasília', 'Lago Sul', '5561999990006', 600, 'contact', true, 24, 175, 62, 'Branca', 'Loiro', 'Verdes', true)
  ON CONFLICT (slug) DO UPDATE SET display_name = EXCLUDED.display_name
  RETURNING id
)
INSERT INTO gallery_items (companion_id, url, media_type, is_premium, is_free)
SELECT id, 'https://bd-panterasbsb.supabase.co/storage/v1/object/public/models-gallery/luana/luana-01.jpg', 'image', false, true FROM new_luana;

-- Luana Meiga
WITH new_luana_meiga AS (
  INSERT INTO companions (slug, display_name, short_bio, full_bio, city, neighborhood, whatsapp_number, base_price, pricing_mode, is_vip, age, height_cm, weight_kg, ethnicity, hair_color, eye_color, serves_men)
  VALUES ('luana-meiga', 'Luana Meiga', 'Rostinho de anjo em Taguatinga.', 'Equilíbrio perfeito entre a inocência e a malícia.', 'Brasília', 'Taguatinga', '5561999990007', 200, 'fixed', false, 19, 160, 50, 'Parda', 'Preto', 'Pretos', true)
  ON CONFLICT (slug) DO UPDATE SET display_name = EXCLUDED.display_name
  RETURNING id
)
INSERT INTO gallery_items (companion_id, url, media_type, is_premium, is_free)
SELECT id, 'https://bd-panterasbsb.supabase.co/storage/v1/object/public/models-gallery/luana-meiga/luana-meiga-01.jpg', 'image', false, true FROM new_luana_meiga;

-- Natasha
WITH new_natasha AS (
  INSERT INTO companions (slug, display_name, short_bio, full_bio, city, neighborhood, whatsapp_number, base_price, pricing_mode, is_vip, age, height_cm, weight_kg, ethnicity, hair_color, eye_color, serves_men)
  VALUES ('natasha', 'Natasha', 'Ruiva fatal no Noroeste.', 'Uma ruiva de parar o trânsito. Pele de porcelana e perfume marcante.', 'Brasília', 'Noroeste', '5561999990008', 450, 'fixed', true, 26, 169, 56, 'Branca', 'Ruivo', 'Verdes', true)
  ON CONFLICT (slug) DO UPDATE SET display_name = EXCLUDED.display_name
  RETURNING id
)
INSERT INTO gallery_items (companion_id, url, media_type, is_premium, is_free)
SELECT id, 'https://bd-panterasbsb.supabase.co/storage/v1/object/public/models-gallery/natasha/natasha-01.jpg', 'image', false, true FROM new_natasha;

-- Raquel
WITH new_raquel AS (
  INSERT INTO companions (slug, display_name, short_bio, full_bio, city, neighborhood, whatsapp_number, base_price, pricing_mode, is_vip, age, height_cm, weight_kg, ethnicity, hair_color, eye_color, serves_men)
  VALUES ('raquel', 'Raquel', 'Mulherão experiente no Park Way.', 'Para quem gosta de curvas e experiência. Atendimento completo.', 'Brasília', 'Park Way', '5561999990009', 350, 'negotiable', true, 28, 167, 65, 'Morena', 'Preto', 'Castanhos', true)
  ON CONFLICT (slug) DO UPDATE SET display_name = EXCLUDED.display_name
  RETURNING id
)
INSERT INTO gallery_items (companion_id, url, media_type, is_premium, is_free)
SELECT id, 'https://bd-panterasbsb.supabase.co/storage/v1/object/public/models-gallery/raquel/raquel-01.jpg', 'image', false, true FROM new_raquel;

-- Thais
WITH new_thais AS (
  INSERT INTO companions (slug, display_name, short_bio, full_bio, city, neighborhood, whatsapp_number, base_price, pricing_mode, is_vip, age, height_cm, weight_kg, ethnicity, hair_color, eye_color, serves_men)
  VALUES ('thais', 'Thais', 'Sorriso que encanta no Guará.', 'Simpática, cheirosa e muito fogosa. Local climatizado.', 'Brasília', 'Guará', '5561999990010', 200, 'fixed', false, 22, 163, 58, 'Parda', 'Loiro', 'Castanhos', true)
  ON CONFLICT (slug) DO UPDATE SET display_name = EXCLUDED.display_name
  RETURNING id
)
INSERT INTO gallery_items (companion_id, url, media_type, is_premium, is_free)
SELECT id, 'https://bd-panterasbsb.supabase.co/storage/v1/object/public/models-gallery/thais/thais-01.jpg', 'image', false, true FROM new_thais;

-- Vanessa
WITH new_vanessa AS (
  INSERT INTO companions (slug, display_name, short_bio, full_bio, city, neighborhood, whatsapp_number, base_price, pricing_mode, is_vip, age, height_cm, weight_kg, ethnicity, hair_color, eye_color, serves_men)
  VALUES ('vanessa', 'Vanessa', 'Elegância na Octogonal.', 'Executiva de dia, sua fantasia à noite. Encontro inteligente e picante.', 'Brasília', 'Octogonal', '5561999990011', 300, 'contact', false, 27, 172, 60, 'Branca', 'Castanho', 'Castanhos', true)
  ON CONFLICT (slug) DO UPDATE SET display_name = EXCLUDED.display_name
  RETURNING id
)
INSERT INTO gallery_items (companion_id, url, media_type, is_premium, is_free)
SELECT id, 'https://bd-panterasbsb.supabase.co/storage/v1/object/public/models-gallery/vanessa/vanessa-01.jpg', 'image', false, true FROM new_vanessa;
