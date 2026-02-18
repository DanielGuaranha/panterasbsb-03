import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Gallery from '@/components/Gallery';
import ChatWidget from '../../../components/ChatWidget';
import { Metadata } from 'next';

// Setup Supabase (Server-side)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Geração de Metadata Dinâmico para SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { data: companion } = await supabase
    .from('companions')
    .select('display_name, short_bio, cover_image_url, city')
    .eq('slug', params.slug)
    .single();

  if (!companion) return { title: 'Perfil não encontrado' };

  return {
    title: `${companion.display_name} - Acompanhante em ${companion.city}`,
    description: companion.short_bio || `Conheça ${companion.display_name} no Panteras BSB.`,
    openGraph: {
      images: companion.cover_image_url ? [companion.cover_image_url] : [],
    }
  };
}

// Revalidação ISR a cada minuto
export const revalidate = 60;

export default async function ProfilePage({ params }: { params: { slug: string } }) {
  // 1. Busca Dados do Perfil e Galeria em paralelo
  const { data: companion } = await supabase
    .from('companions')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!companion) {
    notFound();
  }

  const { data: gallery } = await supabase
    .from('gallery_items')
    .select('*')
    .eq('companion_id', companion.id)
    .order('is_premium', { ascending: true }); // Free first

  const whatsappLink = `https://wa.me/${companion.whatsapp_number}?text=Olá ${companion.display_name}, vi seu perfil no Panteras BSB.`;

  return (
    <div className="min-h-screen bg-midnight pb-24">
      {/* Hero Header */}
      <div className="relative h-[60vh] md:h-[70vh]">
        {companion.cover_image_url ? (
          <Image
            src={companion.cover_image_url}
            alt={companion.display_name}
            fill
            className="object-cover object-top"
            priority
          />
        ) : (
          <div className="w-full h-full bg-slate-800 flex items-center justify-center">Sem Foto</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent" />
        
        {/* Info Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 z-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              {companion.is_vip && (
                <span className="bg-gold-500 text-black px-3 py-1 text-xs font-bold uppercase tracking-wider rounded">
                  VIP Escort
                </span>
              )}
              <span className="bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded backdrop-blur-md">
                Verificada
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl text-white font-bold drop-shadow-xl mb-2">
              {companion.display_name}
            </h1>
            <p className="text-xl text-gold-200 font-light flex items-center gap-2">
              <span className="w-2 h-2 bg-gold-500 rounded-full"></span>
              {companion.city} {companion.neighborhood && `• ${companion.neighborhood}`}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-8 relative z-20">
        
        {/* Card de Ação Principal */}
        <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Investimento</p>
            <p className="text-3xl font-serif text-gold-400">
              {companion.pricing_mode === 'fixed' ? `R$ ${companion.base_price}` : 'A Combinar'}
            </p>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="flex-1 md:flex-none bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-green-500/20 flex items-center justify-center gap-2"
            >
              WhatsApp
            </a>
            <button className="flex-1 md:flex-none border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black font-bold py-3 px-8 rounded-full transition-all">
              Ver Telefone
            </button>
          </div>
        </div>

        {/* Bio & Stats */}
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div className="md:col-span-2">
            <h2 className="font-serif text-3xl text-gold-500 mb-6">Sobre Mim</h2>
            <div className="prose prose-invert prose-lg text-slate-300 font-light leading-relaxed">
              <p>{companion.full_bio || companion.short_bio}</p>
            </div>
          </div>
          
          <div className="bg-slate-900 border border-white/5 rounded-xl p-6 h-fit">
            <h3 className="font-serif text-xl text-white mb-6 border-b border-white/10 pb-4">Detalhes</h3>
            <ul className="space-y-4">
              {companion.stats && Object.entries(companion.stats).map(([key, value]) => (
                <li key={key} className="flex justify-between text-sm">
                  <span className="text-slate-500 capitalize">{key}</span>
                  <span className="text-white font-medium">{String(value)}</span>
                </li>
              ))}
              <li className="flex justify-between text-sm">
                <span className="text-slate-500">Idade</span>
                <span className="text-white font-medium">23 Anos (Exemplo)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Galeria */}
        <div className="mb-20">
          <h2 className="font-serif text-3xl text-gold-500 mb-8 flex items-center gap-4">
            Galeria de Fotos
            <span className="text-xs bg-slate-800 text-slate-400 px-3 py-1 rounded-full font-sans tracking-widest">
              {gallery?.length || 0} Mídias
            </span>
          </h2>
          
          <Gallery items={gallery || []} />
        </div>

      </div>

      {/* Chat Widget Integrado */}
      <ChatWidget 
        companionId={companion.id} 
        companionName={companion.display_name}
        companionImage={companion.cover_image_url}
      />
    </div>
  );
}