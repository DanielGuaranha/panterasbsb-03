
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Configuração para carregar .env em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// CONFIGURAÇÃO
const LOCAL_IMAGES_PATH = 'F:\\PanterasBSB\\0-imagens_teste'; // Caminho da sua pasta
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
// IMPORTANTE: Use a Service Role Key para ter permissão de escrita sem restrição RLS
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Erro: VITE_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY são necessários no .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

async function uploadAndSeed() {
  console.log(`🚀 Iniciando leitura de: ${LOCAL_IMAGES_PATH}`);

  if (!fs.existsSync(LOCAL_IMAGES_PATH)) {
    console.error(`❌ Pasta não encontrada: ${LOCAL_IMAGES_PATH}`);
    return;
  }

  // 1. Ler as pastas das modelos
  const modelFolders = fs.readdirSync(LOCAL_IMAGES_PATH, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  console.log(`📂 Encontradas ${modelFolders.length} modelos para processar.`);

  for (const modelName of modelFolders) {
    console.log(`\n--- Processando: ${modelName} ---`);
    
    // 2. Criar ou Atualizar Modelo no Banco
    const slug = slugify(modelName);
    const modelPath = path.join(LOCAL_IMAGES_PATH, modelName);
    
    // Dados fictícios para preencher os campos obrigatórios
    const companionData = {
      slug: slug,
      display_name: modelName,
      short_bio: `Olá, sou ${modelName}. Venha me conhecer.`,
      full_bio: `Perfil oficial de ${modelName}. Fotos reais e recentes. Atendimento exclusivo em Brasília.`,
      city: 'Brasília',
      neighborhood: 'Asa Norte', // Default
      whatsapp_number: '5561999999999', // Default
      whatsapp_status: 'active',
      is_vip: Math.random() < 0.3, // 30% de chance de ser VIP
      age: 20 + Math.floor(Math.random() * 10),
      height_cm: 160 + Math.floor(Math.random() * 20),
      weight_kg: 50 + Math.floor(Math.random() * 15),
      pricing_mode: 'contact'
    };

    // Upsert (Inserir ou Atualizar)
    const { data: companion, error: compError } = await supabase
      .from('companions')
      .upsert(companionData, { onConflict: 'slug' })
      .select()
      .single();

    if (compError) {
      console.error(`❌ Erro ao criar modelo ${modelName}:`, compError.message);
      continue;
    }

    console.log(`✅ Modelo salva (ID: ${companion.id})`);

    // 3. Ler e Upload das Imagens
    const files = fs.readdirSync(modelPath).filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));
    
    for (let i = 0; i < files.length; i++) {
      const fileName = files[i];
      const filePath = path.join(modelPath, fileName);
      const fileBuffer = fs.readFileSync(filePath);
      
      // Caminho no Storage: slug/nome-do-arquivo
      const storagePath = `${slug}/${fileName}`;
      
      // Upload para Storage
      const { error: uploadError } = await supabase.storage
        .from('models-gallery')
        .upload(storagePath, fileBuffer, {
          contentType: 'image/jpeg', // Ajustar se necessário, mas jpeg funciona pra maioria
          upsert: true
        });

      if (uploadError) {
        console.error(`   ⚠️ Erro upload ${fileName}:`, uploadError.message);
        continue;
      }

      // Pegar URL Pública
      const { data: { publicUrl } } = supabase.storage
        .from('models-gallery')
        .getPublicUrl(storagePath);

      // Inserir na tabela gallery_items
      const { error: galleryError } = await supabase
        .from('gallery_items')
        .insert({
          companion_id: companion.id,
          url: publicUrl,
          media_type: 'image',
          is_premium: i > 2, // Primeiras 3 fotos grátis, resto premium
          is_free: i <= 2
        });

      if (galleryError) {
        console.error(`   ⚠️ Erro ao vincular foto ao banco:`, galleryError.message);
      } else {
        console.log(`   📸 Foto ${i+1}/${files.length} enviada: ${fileName}`);
      }
    }
  }

  console.log('\n✨ Processo finalizado com sucesso!');
}

uploadAndSeed();
