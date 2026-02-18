import { createClient } from '@/lib/supabase/server';
import { Companion } from '@/types/database';
import ProfileCard from '@/components/business/ProfileCard';
import HeroSection from '@/components/business/HeroSection';

// Revalidação ISR: Atualiza a home a cada 60 segundos no máximo
export const revalidate = 60;

export default async function Home() {
  // Fix: createClient is now an async function and must be awaited
  const supabase = await createClient();

  // Busca de dados no SERVIDOR (Seguro e Rápido)
  // Não expõe lógica de filtro no cliente
  const { data: companions } = await supabase
    .from('companions')
    .select('*, gallery_items(url)')
    .eq('whatsapp_status', 'active')
    .order('is_vip', { ascending: false });

  return (
    <main className="pb-20">
      <HeroSection 
        title="Acompanhantes em Brasília DF" 
        subtitle="Catálogo Premium" 
      />

      <section className="max-w-6xl mx-auto px-4 mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl text-gold-500">
            Catálogo Completo
          </h2>
          <span className="text-xs text-slate-500">
            {companions?.length || 0} perfis online
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {companions?.map((companion) => (
            <ProfileCard 
              key={companion.id} 
              data={companion}
              // Otimização: As primeiras 4 imagens carregam com prioridade (LCP)
              priority={false} 
            />
          ))}
        </div>
      </section>
    </main>
  );
}