import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Cliente Singleton para uso no Client-Side (React Components)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Utilitário para gerar URLs de imagem otimizadas
export const getImageUrl = (path: string | undefined) => {
  if (!path) return '/placeholder-model.jpg';
  if (path.startsWith('http')) return path;
  return `${supabaseUrl}/storage/v1/object/public/profiles/${path}`;
};
