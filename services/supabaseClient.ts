
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Companion, CompanionWithGallery, CompanionReview } from '../types';

// O Supabase já está configurado no ambiente
const SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://gylvvncapsrtcvqhsowc.supabase.co';
const SUPABASE_ANON_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5bHZ2bmNhcHNydGN2cWhzb3djIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxOTkzMzgsImV4cCI6MjA4NDc3NTMzOH0.yMJ51AjeKjqHlG6PxKFGPYl24mfx75neWfjexfEmmOQ';

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Busca todas as acompanhantes ativas
 */
export const getCompanions = async (): Promise<Companion[]> => {
  try {
    const { data, error } = await supabase
      .from('companions')
      .select(`
        *,
        gallery_items (url, is_premium)
      `)
      .eq('whatsapp_status', 'active')
      .order('is_vip', { ascending: false });
    
    if (error) throw error;
    if (!data) return [];

    return data.map((item: any) => ({
      ...item,
      // Define a imagem de capa como a primeira imagem não-premium ou a primeira da lista
      image_url: item.gallery_items?.find((g: any) => !g.is_premium)?.url || item.gallery_items?.[0]?.url
    })) as Companion[];
  } catch (e) {
    console.error('Erro ao carregar acompanhantes:', e);
    return [];
  }
};

/**
 * Busca perfil detalhado por Slug
 */
export const getCompanionBySlug = async (slug: string): Promise<CompanionWithGallery | null> => {
  try {
    const { data, error } = await supabase
      .from('companions')
      .select(`
        *,
        gallery_items (*),
        companion_categories (categories (*))
      `)
      .eq('slug', slug)
      .single();

    if (error || !data) return null;
    
    const categories = data.companion_categories 
      ? data.companion_categories.map((cc: any) => cc.categories).filter(Boolean) 
      : [];
    
    // Ordenar galeria: Grátis (não premium) primeiro
    const sortedGallery = (data.gallery_items || []).sort((a: any, b: any) => {
       if (a.is_premium === b.is_premium) return 0;
       return a.is_premium ? 1 : -1;
    });

    return { ...data, categories, gallery_items: sortedGallery } as CompanionWithGallery;
  } catch (e) {
    console.error(`Erro ao carregar perfil ${slug}:`, e);
    return null;
  }
};

/**
 * Atualiza dados do perfil (Dashboard)
 */
export const updateCompanion = async (id: string, updates: Partial<Companion>): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase.from('companions').update(updates).eq('id', id);
    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
};

/**
 * Busca avaliações aprovadas
 */
export const getCompanionReviews = async (companionId: string): Promise<CompanionReview[]> => {
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
    return [];
  }
};
