
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Companion, CompanionWithGallery, GalleryItem, CompanionReview } from '../types';

// Safely access environment variables
const env = (import.meta as any).env || {};
const SUPABASE_URL = env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = env.VITE_SUPABASE_ANON_KEY;

export const supabase: SupabaseClient | null = (SUPABASE_URL && SUPABASE_ANON_KEY)
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// --- DADOS DE FALLBACK (MODO VITRINE IMEDIATA) ---
// Estes dados garantem que o site tenha conteúdo premium mesmo sem conexão com o banco
const MOCK_COMPANIONS: Companion[] = [
  {
    id: 'alice-01', slug: 'alice', display_name: 'Alice',
    short_bio: 'Doce universitária na Asa Sul. Carinhosa e intensa.',
    full_bio: 'Olá, sou a Alice. Tenho 21 anos, pele macia e adoro proporcionar momentos de relaxamento e prazer com muita conexão. Atendo no meu apartamento discreto na Asa Sul ou vou até você.',
    state: 'DF', city: 'Brasilia', neighborhood: 'Asa Sul',
    is_vip: true, created_at: new Date().toISOString(), featured_until: new Date(Date.now() + 864000000).toISOString(),
    whatsapp_number: '5561999990001', base_price: 350, pricing_mode: 'fixed',
    age: 21, height_cm: 165, weight_kg: 55, ethnicity: 'Branca', hair_color: 'Loiro', eye_color: 'Mel',
    languages: ['Português', 'Inglês'], measurements: '90-62-94',
    serves_men: true, serves_women: false, serves_couples: false, whatsapp_status: 'active',
    image_url: 'https://bd-panterasbsb.supabase.co/storage/v1/object/public/models-gallery/alice/alice-01.jpg'
  },
  {
    id: 'gabi-01', slug: 'gabi', display_name: 'Gabi',
    short_bio: 'Morena iluminada, sorriso encantador e corpo natural.',
    full_bio: 'Gabi, 23 anos. A companhia perfeita para eventos sociais ou momentos íntimos. Divertida, inteligente e sem frescuras. Venha me conhecer em Águas Claras.',
    state: 'DF', city: 'Brasilia', neighborhood: 'Aguas Claras',
    is_vip: false, created_at: new Date().toISOString(), featured_until: null,
    whatsapp_number: '5561999990002', base_price: 300, pricing_mode: 'negotiable',
    age: 23, height_cm: 168, weight_kg: 60, ethnicity: 'Parda', hair_color: 'Morena Iluminada', eye_color: 'Castanhos',
    languages: ['Português'], measurements: '92-65-98',
    serves_men: true, serves_women: true, serves_couples: true, whatsapp_status: 'active',
    image_url: 'https://bd-panterasbsb.supabase.co/storage/v1/object/public/models-gallery/gabi/gabi-01.jpg'
  },
  {
    id: 'larissa-01', slug: 'larissa', display_name: 'Larissa',
    short_bio: 'Beleza clássica e atendimento de alto padrão no Sudoeste.',
    full_bio: 'Larissa, 25 anos. Elegância e discrição são meus sobrenomes. Faço o estilo namoradinha, com beijo na boca e carinho real. Fotos 100% reais.',
    state: 'DF', city: 'Brasilia', neighborhood: 'Sudoeste',
    is_vip: true, created_at: new Date().toISOString(), featured_until: new Date(Date.now() + 864000000).toISOString(),
    whatsapp_number: '5561999990003', base_price: 400, pricing_mode: 'fixed',
    age: 25, height_cm: 170, weight_kg: 58, ethnicity: 'Branca', hair_color: 'Castanho Escuro', eye_color: 'Verdes',
    languages: ['Português', 'Espanhol'], measurements: '88-60-90',
    serves_men: true, serves_women: false, serves_couples: false, whatsapp_status: 'active',
    image_url: 'https://bd-panterasbsb.supabase.co/storage/v1/object/public/models-gallery/larissa/larissa-01.jpg'
  },
  {
    id: 'laura-01', slug: 'laura', display_name: 'Laura',
    short_bio: 'A loirinha dos seus sonhos. Mignon e muito safada.',
    full_bio: 'Laura, 20 aninhos. Pequena no tamanho, gigante no prazer. Adoro realizar fantasias e sou muito liberal. Me chama no Zap.',
    state: 'DF', city: 'Brasilia', neighborhood: 'Lago Norte',
    is_vip: false, created_at: new Date().toISOString(), featured_until: null,
    whatsapp_number: '5561999990004', base_price: 250, pricing_mode: 'fixed',
    age: 20, height_cm: 158, weight_kg: 48, ethnicity: 'Branca', hair_color: 'Loiro', eye_color: 'Azuis',
    languages: ['Português'], measurements: '85-58-90',
    serves_men: true, serves_women: false, serves_couples: false, whatsapp_status: 'active',
    image_url: 'https://bd-panterasbsb.supabase.co/storage/v1/object/public/models-gallery/laura/laura-01.jpg'
  },
  {
    id: 'lua-01', slug: 'lua', display_name: 'Lua',
    short_bio: 'Mística, tatuada e alternativa. Uma experiência única.',
    full_bio: 'Lua, 22 anos. Para quem busca fugir do padrão. Gosto de rock, conversas cabeça e intensidade entre quatro paredes. Atendo na Asa Norte.',
    state: 'DF', city: 'Brasilia', neighborhood: 'Asa Norte',
    is_vip: false, created_at: new Date().toISOString(), featured_until: new Date(Date.now() + 864000000).toISOString(),
    whatsapp_number: '5561999990005', base_price: 300, pricing_mode: 'negotiable',
    age: 22, height_cm: 165, weight_kg: 54, ethnicity: 'Branca', hair_color: 'Colorido/Preto', eye_color: 'Castanhos',
    languages: ['Português', 'Inglês'], measurements: '89-64-96',
    serves_men: true, serves_women: true, serves_couples: true, whatsapp_status: 'active',
    image_url: 'https://bd-panterasbsb.supabase.co/storage/v1/object/public/models-gallery/lua/lua-01.jpg'
  },
  {
    id: 'luana-01', slug: 'luana', display_name: 'Luana',
    short_bio: 'VIP Escort de luxo. Sofisticação para homens exigentes.',
    full_bio: 'Luana, 24 anos. O auge da beleza e educação. Acompanho em jantares, viagens e eventos. Discrição absoluta garantida. Atendimento no Lago Sul.',
    state: 'DF', city: 'Brasilia', neighborhood: 'Lago Sul',
    is_vip: true, created_at: new Date().toISOString(), featured_until: new Date(Date.now() + 864000000).toISOString(),
    whatsapp_number: '5561999990006', base_price: 600, pricing_mode: 'contact',
    age: 24, height_cm: 175, weight_kg: 62, ethnicity: 'Branca', hair_color: 'Loiro', eye_color: 'Verdes',
    languages: ['Português', 'Inglês', 'Francês'], measurements: 'Siliconada 300ml',
    serves_men: true, serves_women: false, serves_couples: false, whatsapp_status: 'active',
    image_url: 'https://bd-panterasbsb.supabase.co/storage/v1/object/public/models-gallery/luana/luana-01.jpg'
  },
  {
    id: 'luana-meiga-01', slug: 'luana-meiga', display_name: 'Luana Meiga',
    short_bio: 'Rostinho de anjo, atitude de mulherão.',
    full_bio: 'Luana Meiga, 19 anos. O equilíbrio perfeito entre a inocência e a malícia. Venha descobrir meus segredos. Taguatinga e região.',
    state: 'DF', city: 'Brasilia', neighborhood: 'Taguatinga',
    is_vip: false, created_at: new Date().toISOString(), featured_until: null,
    whatsapp_number: '5561999990007', base_price: 200, pricing_mode: 'fixed',
    age: 19, height_cm: 160, weight_kg: 50, ethnicity: 'Parda', hair_color: 'Preto', eye_color: 'Pretos',
    languages: ['Português'], measurements: 'Natural',
    serves_men: true, serves_women: false, serves_couples: false, whatsapp_status: 'active',
    image_url: 'https://bd-panterasbsb.supabase.co/storage/v1/object/public/models-gallery/luana-meiga/luana-meiga-01.jpg'
  },
  {
    id: 'natasha-01', slug: 'natasha', display_name: 'Natasha',
    short_bio: 'Ruiva natural, intensa e inesquecível. Noroeste.',
    full_bio: 'Natasha, 26 anos. Uma ruiva de parar o trânsito. Pele de porcelana e perfume marcante e atendimento sem pressa. Massagem tântrica inclusa.',
    state: 'DF', city: 'Brasilia', neighborhood: 'Noroeste',
    is_vip: true, created_at: new Date().toISOString(), featured_until: new Date(Date.now() + 864000000).toISOString(),
    whatsapp_number: '5561999990008', base_price: 450, pricing_mode: 'fixed',
    age: 26, height_cm: 169, weight_kg: 56, ethnicity: 'Branca', hair_color: 'Ruivo', eye_color: 'Verdes',
    languages: ['Português', 'Inglês'], measurements: '94-65-98',
    serves_men: true, serves_women: true, serves_couples: true, whatsapp_status: 'active',
    image_url: 'https://bd-panterasbsb.supabase.co/storage/v1/object/public/models-gallery/natasha/natasha-01.jpg'
  },
  {
    id: 'raquel-01', slug: 'raquel', display_name: 'Raquel',
    short_bio: 'Mulherão experiente. Atendimento completo e liberal.',
    full_bio: 'Raquel, 28 anos. Para quem gosta de mulher com curvas e experiência. Faço tudo com muito prazer. Beijo grego, massagem e finalizações especiais.',
    state: 'DF', city: 'Brasilia', neighborhood: 'Park Way',
    is_vip: true, created_at: new Date().toISOString(), featured_until: null,
    whatsapp_number: '5561999990009', base_price: 350, pricing_mode: 'negotiable',
    age: 28, height_cm: 167, weight_kg: 65, ethnicity: 'Morena', hair_color: 'Preto', eye_color: 'Castanhos',
    languages: ['Português'], measurements: '100cm de bumbum',
    serves_men: true, serves_women: false, serves_couples: true, whatsapp_status: 'active',
    image_url: 'https://bd-panterasbsb.supabase.co/storage/v1/object/public/models-gallery/raquel/raquel-01.jpg'
  },
  {
    id: 'thais-01', slug: 'thais', display_name: 'Thais',
    short_bio: 'Sorriso que encanta e corpo de violão. Guará.',
    full_bio: 'Thais, 22 anos. Simpática, cheirosa e muito fogosa. Adoro tratar meus clientes como reis. Atendo no Guará II em local climatizado.',
    state: 'DF', city: 'Brasilia', neighborhood: 'Guara',
    is_vip: false, created_at: new Date().toISOString(), featured_until: null,
    whatsapp_number: '5561999990010', base_price: 200, pricing_mode: 'fixed',
    age: 22, height_cm: 163, weight_kg: 58, ethnicity: 'Parda', hair_color: 'Loiro (Mechas)', eye_color: 'Castanhos',
    languages: ['Português'], measurements: 'Corpão',
    serves_men: true, serves_women: false, serves_couples: false, whatsapp_status: 'active',
    image_url: 'https://bd-panterasbsb.supabase.co/storage/v1/object/public/models-gallery/thais/thais-01.jpg'
  },
  {
    id: 'vanessa-01', slug: 'vanessa', display_name: 'Vanessa',
    short_bio: 'Elegância, discrição e prazer na Octogonal.',
    full_bio: 'Vanessa, 27 anos. Executiva de dia, sua fantasia à noite. Perfeita para quem busca um encontro inteligente e picante. Não atendo bêbados.',
    state: 'DF', city: 'Brasilia', neighborhood: 'Octogonal',
    is_vip: false, created_at: new Date().toISOString(), featured_until: new Date(Date.now() + 864000000).toISOString(),
    whatsapp_number: '5561999990011', base_price: 300, pricing_mode: 'contact',
    age: 27, height_cm: 172, weight_kg: 60, ethnicity: 'Branca', hair_color: 'Castanho', eye_color: 'Castanhos',
    languages: ['Português', 'Espanhol'], measurements: 'Elegante',
    serves_men: true, serves_women: false, serves_couples: false, whatsapp_status: 'active',
    image_url: 'https://bd-panterasbsb.supabase.co/storage/v1/object/public/models-gallery/vanessa/vanessa-01.jpg'
  }
];

export const getCompanions = async (): Promise<Companion[]> => {
  if (!supabase) {
    console.warn('Supabase Client não inicializado. Usando Mock Data.');
    return MOCK_COMPANIONS;
  }
  
  try {
    const { data, error } = await supabase
      .from('companions')
      .select(`*, gallery_items (url)`)
      .eq('whatsapp_status', 'active')
      .order('is_vip', { ascending: false })
      .order('featured_until', { ascending: false, nullsFirst: false });
    
    if (error) {
      console.error('Erro ao buscar acompanhantes:', error);
      // Fallback para Mock se der erro no banco (ex: tabela vazia ou permissão)
      return MOCK_COMPANIONS;
    }
    
    // Se o banco estiver vazio, usa o Mock para não mostrar tela em branco
    if (!data || data.length === 0) return MOCK_COMPANIONS;

    const processedData = data.map((item: any) => ({
      ...item,
      // Usa a primeira foto da galeria como capa, se existir. 
      // Se não, o ProfileCard usará seu fallback interno.
      image_url: item.gallery_items?.[0]?.url
    }));

    return processedData as Companion[];
  } catch (e) {
    console.error('Erro de conexão:', e);
    return MOCK_COMPANIONS;
  }
};

export const getCompanionBySlug = async (slug: string): Promise<CompanionWithGallery | null> => {
  // 1. Tenta buscar no Mock primeiro para performance instantânea nestes perfis específicos
  const mockProfile = MOCK_COMPANIONS.find(c => c.slug === slug);
  if (mockProfile) {
    return {
      ...mockProfile,
      gallery_items: [
        { id: '1', companion_id: mockProfile.id, url: mockProfile.image_url!, media_type: 'image', is_premium: false, is_free: true },
        // Simula mais fotos para a galeria
        { id: '2', companion_id: mockProfile.id, url: mockProfile.image_url!, media_type: 'image', is_premium: false, is_free: true },
        { id: '3', companion_id: mockProfile.id, url: mockProfile.image_url!, media_type: 'image', is_premium: true, is_free: false },
      ],
      categories: [{id: '1', slug: 'namoradinha', name: 'Namoradinha'}]
    } as CompanionWithGallery;
  }

  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('companions')
      .select(`*, gallery_items (*), companion_categories (categories (*))`)
      .eq('slug', slug)
      .single();

    if (error || !data) {
      console.warn(`Perfil não encontrado: ${slug}`, error);
      return null;
    }
    
    const flatCategories = data.companion_categories 
      ? data.companion_categories.map((cc: any) => cc.categories).filter(Boolean) 
      : [];
    
    const sortedGallery = (data.gallery_items || []).sort((a: any, b: any) => {
       if (a.is_premium === b.is_premium) return 0;
       return a.is_premium ? 1 : -1;
    });

    return { ...data, categories: flatCategories, gallery_items: sortedGallery } as CompanionWithGallery;

  } catch (e) {
    console.error(e);
    return null;
  }
};

export const updateCompanion = async (id: string, updates: Partial<Companion>): Promise<{ success: boolean; error?: string }> => {
  if (!supabase) return { success: false, error: 'Cliente Supabase não inicializado' };

  try {
    const { error } = await supabase
      .from('companions')
      .update(updates)
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    console.error('Erro ao atualizar perfil:', err);
    return { success: false, error: err.message };
  }
};

export const getCompanionReviews = async (companionId: string): Promise<CompanionReview[]> => {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from('companion_reviews')
      .select('*')
      .eq('companion_id', companionId)
      .eq('status', 'approved')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return (data || []) as CompanionReview[];
  } catch (e) { 
    console.error('Erro ao buscar reviews:', e);
    return []; 
  }
};

export const submitCompanionReview = async (review: Partial<CompanionReview>): Promise<{ success: boolean; error?: string }> => {
  if (!supabase) return { success: false, error: 'Sistema indisponível' };
  
  try {
    const { error } = await supabase.from('companion_reviews').insert([{ ...review, status: 'pending' }]);
    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
};
