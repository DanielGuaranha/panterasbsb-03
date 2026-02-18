
import { createClient } from '@supabase/supabase-js';
import ModelCard from '@/components/ModelCard';
import Link from 'next/link';

// Configuração do Supabase (Server-Side)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Revalidação ISR
export const revalidate = 0; 

interface HomeProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams }: HomeProps) {
  let query = supabase
    .from('companions')
    .select('*')
    .eq('whatsapp_status', 'active');

  const cityFilter = typeof searchParams.neighborhood === 'string' ? searchParams.neighborhood : null;
  if (cityFilter) {
    query = query.eq('neighborhood', cityFilter);
  }

  query = query.order('is_vip', { ascending: false }).order('created_at', { ascending: false });

  const { data: companions } = await query;

  const { data: allLocations } = await supabase
    .from('companions')
    .select('neighborhood')
    .eq('whatsapp_status', 'active');
    
  const uniqueNeighborhoods = Array.from(new Set(allLocations?.map(c => c.neighborhood).filter(Boolean)));

  return (
    <main className="min-h-screen pb-20 bg-midnight selection:bg-gold-500 selection:text-black">
      
      <section className="relative h-[50vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gold-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 animate-fade-in-up">
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-gold-400 text-[0.6rem] font-bold uppercase tracking-[0.2em] mb-4 backdrop-blur-sm">
            Exclusive Directory
          </span>
          <h1 className="font-serif text-4xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-slate-400 mb-4">
            Panteras BSB
          </h1>
          <p className="text-slate-400 text-sm md:text-lg max-w-xl mx-auto font-light leading-relaxed">
            Curadoria definitiva em Brasília. <span className="text-gold-500/80">Segurança e Luxo.</span>
          </p>
        </div>

        <div className="absolute bottom-6 left-0 right-0 z-20 overflow-x-auto no-scrollbar px-4">
          <div className="flex justify-center gap-2 min-w-max mx-auto">
            <Link href="/" className={`px-4 py-1.5 rounded-full text-[0.6rem] font-bold uppercase tracking-wider border transition-all ${!cityFilter ? 'bg-gold-500 text-black border-gold-500 shadow-lg' : 'bg-slate-900/50 text-slate-400 border-white/10'}`}>Todos</Link>
            {uniqueNeighborhoods.map((bairro) => (
              <Link key={bairro} href={`/?neighborhood=${bairro}`} className={`px-4 py-1.5 rounded-full text-[0.6rem] font-bold uppercase tracking-wider border transition-all ${cityFilter === bairro ? 'bg-gold-500 text-black border-gold-500 shadow-lg' : 'bg-slate-900/50 text-slate-400 border-white/10'}`}>{bairro}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-2 md:px-8 mt-12">
        {(!companions || companions.length === 0) ? (
          <div className="text-center py-20 bg-slate-900/30 rounded-xl border border-white/5">
            <p className="text-slate-500">Nenhum perfil encontrado.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1.5 md:gap-6 lg:gap-8">
            {companions.map((model) => (
              <ModelCard key={model.id} id={model.id} slug={model.slug} name={model.display_name} image={model.cover_image_url} location={model.neighborhood || model.city} isVip={model.is_vip} />
            ))}
          </div>
        )}
      </section>
      
      <footer className="mt-32 border-t border-white/10 py-12 text-center">
        <p className="text-gold-500 font-serif text-lg mb-2">PANTERAS BSB</p>
        <p className="text-slate-600 text-[0.6rem] uppercase tracking-widest">Brasília - DF • +18 Anos</p>
      </footer>
    </main>
  );
}
