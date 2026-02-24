
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCompanionBySlug } from '../services/supabaseClient';
import { CompanionWithGallery } from '../types';
import Gallery from '../components/Gallery';
import BookingModal from '../components/BookingModal';
import ChatWidgetClient from '../components/ChatWidgetClient';
import CompanionReviewsSection from '../components/CompanionReviewsSection';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';

const ProfileDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const [data, setData] = useState<CompanionWithGallery | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      if (!slug) return;
      setLoading(true);
      const companion = await getCompanionBySlug(slug);
      setData(companion);
      setLoading(false);
    };
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-midnight">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-gold-500/30 border-t-gold-500 rounded-full animate-spin mb-4" />
          <span className="text-gold-500 font-serif text-sm tracking-[0.3em] animate-pulse uppercase">Panteras BSB</span>
        </div>
      </div>
    );
  }

  if (!data) return <div className="h-screen flex items-center justify-center text-gold-500 font-serif">Perfil não encontrado.</div>;

  const whatsappLink = `https://wa.me/${data.whatsapp_number}?text=Olá ${data.display_name}, vi seu perfil no Panteras BSB.`;
  const galleryItems = data.gallery_items || [];

  return (
    <div className="pb-24 bg-midnight min-h-screen">
      <SEO 
        title={`${data.display_name} - Acompanhante VIP em ${data.neighborhood || data.city} | Panteras BSB`} 
        description={data.short_bio} 
        image={data.image_url}
      />

      {/* Hero Header */}
      <div className="relative h-[60vh] md:h-[75vh] overflow-hidden">
        <img
          src={galleryItems[0]?.url || `https://picsum.photos/800/1200?random=${data.id}`}
          alt={data.display_name}
          className="w-full h-full object-cover object-top transition-transform duration-1000 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full z-20">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              {data.is_vip && (
                <span className="px-3 py-1 bg-gold-500 text-black text-[0.6rem] font-bold uppercase tracking-widest rounded shadow-2xl shadow-gold-500/40">
                  {t('badges.vip')}
                </span>
              )}
              <span className="bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-widest rounded-full backdrop-blur-md">
                {t('badges.verified')}
              </span>
            </div>

            <h1 className="font-serif text-5xl md:text-8xl text-white font-bold drop-shadow-2xl mb-2 tracking-tight">
              {data.display_name}
            </h1>
            <p className="text-xl md:text-2xl text-gold-200 font-light flex items-center gap-2 italic">
               <span className="w-2 h-2 bg-gold-500 rounded-full animate-pulse" />
               {data.city} {data.neighborhood && `• ${data.neighborhood}`}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-10 relative z-30">
        {/* Quick Action Card */}
        <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-[0_30px_60px_rgba(0,0,0,0.5)] mb-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <p className="text-slate-500 text-[0.6rem] uppercase tracking-[0.3em] font-bold mb-1">{t('labels.investment')}</p>
            <p className="text-4xl text-gold-400 font-serif">
              {data.pricing_mode === 'fixed' ? `R$ ${data.base_price}` : t('actions.negotiable')}
            </p>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <a 
              href={whatsappLink} 
              target="_blank" 
              className="flex-1 md:flex-none bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-10 rounded-full transition-all shadow-xl shadow-green-900/20 flex items-center justify-center gap-3 active:scale-95"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
              WhatsApp
            </a>
            <button 
              onClick={() => setBookingOpen(true)}
              className="flex-1 md:flex-none border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black font-bold py-4 px-10 rounded-full transition-all tracking-widest active:scale-95"
            >
              {t('actions.reserve')}
            </button>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-3 gap-12 mb-20">
          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="text-gold-500 font-serif text-3xl mb-6 flex items-center gap-4">
                {t('labels.about')}
                <div className="h-px flex-1 bg-gold-900/30" />
              </h2>
              <div className="prose prose-invert prose-lg text-slate-300 font-light leading-relaxed">
                <p className="whitespace-pre-wrap">{data.full_bio || data.short_bio}</p>
              </div>
            </section>

            <section>
              <h2 className="text-gold-500 font-serif text-3xl mb-6 flex items-center gap-4">
                {t('labels.gallery')}
                <div className="h-px flex-1 bg-gold-900/30" />
              </h2>
              <Gallery items={galleryItems} companionName={data.display_name} companionId={data.id} />
            </section>
          </div>
          
          <aside className="space-y-6">
            <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 sticky top-24">
              <h3 className="font-serif text-xl text-white mb-6 border-b border-white/5 pb-4 tracking-wide uppercase text-xs font-bold text-gold-500">{t('admin.table.model')} Stats</h3>
              <ul className="space-y-4">
                <StatItem label={t('labels.age')} value={`${data.age} ${t('labels.years')}`} />
                <StatItem label={t('labels.height_weight')} value={`${data.height_cm}cm • ${data.weight_kg}kg`} />
                <StatItem label={t('labels.measures')} value={data.measurements} />
                <StatItem label={t('labels.ethnicity')} value={data.ethnicity} />
                <StatItem label={t('labels.hair')} value={data.hair_color} />
                <StatItem label={t('labels.eyes')} value={data.eye_color} />
              </ul>
              
              <div className="mt-8 pt-8 border-t border-white/5">
                <h4 className="text-[0.6rem] uppercase tracking-widest font-bold text-slate-500 mb-4">{t('labels.service_to')}</h4>
                <div className="flex flex-wrap gap-2">
                  {data.serves_men && <span className="bg-slate-800 text-slate-300 text-[0.65rem] px-3 py-1 rounded-full">{t('labels.men')}</span>}
                  {data.serves_women && <span className="bg-slate-800 text-slate-300 text-[0.65rem] px-3 py-1 rounded-full">{t('labels.women')}</span>}
                  {data.serves_couples && <span className="bg-slate-800 text-slate-300 text-[0.65rem] px-3 py-1 rounded-full">{t('labels.couples')}</span>}
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mb-24">
          <CompanionReviewsSection companionId={data.id} />
        </div>
      </div>

      <ChatWidgetClient 
        companionId={data.id} 
        companionName={data.display_name} 
        companionImage={galleryItems[0]?.url} 
      />
      
      <BookingModal 
        isOpen={bookingOpen} 
        onClose={() => setBookingOpen(false)} 
        companionName={data.display_name} 
      />
    </div>
  );
};

const StatItem = ({ label, value }: { label: string; value: string | number }) => (
  <li className="flex justify-between items-center text-sm">
    <span className="text-slate-500 font-medium">{label}</span>
    <span className="text-white font-serif italic text-base">{value || '---'}</span>
  </li>
);

export default ProfileDetail;
