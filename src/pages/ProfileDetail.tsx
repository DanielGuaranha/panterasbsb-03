import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getCompanionBySlug } from '../services/supabaseClient';
import { CompanionWithGallery } from '../types';
import Gallery from '../components/Gallery';
import BookingModal from '../components/BookingModal';
import ChatWidgetClient from '../components/ChatWidgetClient';
import CompanionReviewsSection from '../components/CompanionReviewsSection';
import { useLanguage } from '../contexts/LanguageContext';

const ProfileDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const [data, setData] = useState<CompanionWithGallery | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bioExpanded, setBioExpanded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!slug) {
      setError(t('errors.generic_error'));
      return;
    }

    let canceled = false;

    const fetchData = async () => {
      try {
        setError(null);
        setNotFound(false);
        const companion = await getCompanionBySlug(slug);

        if (canceled) return;

        if (!companion) {
          setNotFound(true);
          setData(null);
        } else {
          setData(companion);
        }
      } catch (e) {
        if (canceled) return;
        console.error('Erro ao carregar perfil:', e);
        setError(t('errors.generic_error'));
        setData(null);
      }
    };

    fetchData();

    return () => {
      canceled = true;
    };
  }, [slug, t]);

  useEffect(() => {
    if (!heroRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyCTA(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "-100px 0px 0px 0px"
      }
    );

    observer.observe(heroRef.current);

    return () => {
      observer.disconnect();
    };
  }, [data]);

  useEffect(() => {
    if (!data || !slug) return;
    const locationText = `${data.city}, Brasília DF`;
    document.title = `${data.display_name} – ${t('hero.location_prefix')} ${locationText} | Panteras BSB`;
  }, [data, slug, t]);

  if (error) return <ErrorState message={error} />;
  if (notFound) return <ErrorState message={t('errors.profile_not_found')} />;
  if (!data) return <ProfileSkeleton />;

  const whatsappLink = `https://wa.me/${data.whatsapp_number}?text=Olá ${data.display_name}, vi seu perfil no Panteras BSB.`;
  const galleryItems = data.gallery_items || [];
  const languagesList = data.languages || [];
  const categories = data.categories || [];

  const formatPhoneNumber = (phone: string) => {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{2})(\d{5})(\d{4})$/);
    if (match) return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
    return phone;
  };

  return (
    <div className="pb-32 md:pb-24 bg-midnight min-h-screen">
      {/* Header Image */}
      <div ref={heroRef} className="relative h-[45vh] md:h-[70vh] group bg-slate-900">
        <img
          src={galleryItems[0]?.url || `https://picsum.photos/800/1200?random=${data.id}`}
          alt={`Acompanhante ${data.display_name}`}
          className="w-full h-full object-cover object-top"
          fetchPriority="high"
          loading="eager"
          decoding="sync"
        />
        
        {/* Watermark - Reforçada */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 select-none">
            <span className="text-4xl md:text-7xl font-bold text-white/20 tracking-widest -rotate-12 border-4 border-white/10 px-4 py-2 md:px-8 md:py-4 rounded-xl">
              PANTERAS
            </span>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 p-4 md:p-6 w-full z-20">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              {data.is_vip && (
                <span className="px-3 py-1 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-400 text-black text-[0.6rem] font-bold uppercase tracking-[0.15em] rounded-sm shadow-[0_0_15px_rgba(212,175,55,0.5)] border border-gold-200/50 backdrop-blur-sm">
                  {t('badges.vip')}
                </span>
              )}
              <span className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-green-900/40 to-emerald-800/40 text-emerald-400 border border-emerald-500/30 text-[0.6rem] font-bold uppercase tracking-[0.15em] rounded-sm backdrop-blur-sm shadow-lg shadow-emerald-900/20">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                {t('badges.verified')}
              </span>
            </div>

            <h1 className="font-serif text-white mb-1 text-glow drop-shadow-lg leading-tight">
              <span className="block text-3xl md:text-6xl font-bold">{data.display_name}</span>
            </h1>
            <p className="text-gold-100 font-sans text-sm md:text-2xl font-light opacity-90 flex items-center gap-1">
               <svg className="w-3 h-3 md:w-5 md:h-5 text-gold-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
               {data.neighborhood || data.city}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-6 md:-mt-10 relative z-30">
        
        {/* Main Action Card */}
        <div className="glass-panel rounded-xl p-5 md:p-6 shadow-2xl mb-8 relative overflow-hidden bg-slate-900/90 backdrop-blur-xl border border-white/5">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-6">
            <div className="w-full md:w-auto flex justify-between items-end md:block">
              <div>
                <p className="text-slate-400 text-[0.6rem] md:text-xs uppercase tracking-[0.2em] mb-1">{t('labels.investment')}</p>
                <p className="text-2xl md:text-3xl text-gold-400 font-serif drop-shadow-sm">
                  {data.pricing_mode === 'fixed'
                    ? `R$ ${data.base_price}`
                    : data.pricing_mode === 'negotiable'
                    ? t('actions.negotiable')
                    : t('actions.contact_me')}
                </p>
              </div>
              
              <div className="md:hidden">
                 <a href={whatsappLink} target="_blank" className="bg-green-600 text-white p-2 rounded-full shadow-lg active:scale-95 transition-transform">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
                  <div className="flex flex-col items-start text-left">
                    <span className="text-[0.65rem] font-medium leading-none uppercase tracking-wide opacity-90">{t('actions.whatsapp')}</span>
                    <span className="text-sm font-bold leading-none mt-0.5">{data.display_phone ? formatPhoneNumber(data.whatsapp_number) : t('actions.chat')}</span>
                  </div>
                </a>
                <button
                  onClick={() => setBookingOpen(true)}
                  className="bg-gold-500 hover:bg-gold-400 text-black px-6 py-3 rounded font-bold transition-colors shadow-lg shadow-gold-500/20 active:scale-95"
                >
                  {t('actions.reserve')}
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 md:gap-y-6 gap-x-3 border-t border-gold-500/10 pt-4 md:pt-6">
            <Stat label={t('labels.age')} value={`${data.age} ${t('labels.years')}`} />
            <Stat label={t('labels.ethnicity')} value={data.ethnicity || t('labels.not_informed')} />
            <Stat label={t('labels.height_weight')} value={`${data.height_cm}cm / ${data.weight_kg}kg`} />
            <Stat label={t('labels.measures')} value={data.measurements} />
            
            <Stat label={t('labels.eyes')} value={data.eye_color} />
            <Stat label={t('labels.hair')} value={data.hair_color} />

            <div className="col-span-2 md:col-span-2 bg-slate-900/40 p-2.5 md:p-3 rounded border border-slate-800/50">
              <span className="text-[0.6rem] text-gold-500/80 font-semibold uppercase tracking-wider block mb-1">
                {t('labels.languages')}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {languagesList.length > 0 ? (
                  languagesList.map(lang => (
                    <span key={lang} className="text-[0.65rem] md:text-xs bg-slate-800 text-slate-200 px-2 py-0.5 rounded border border-slate-700 font-medium">
                      {lang}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500">{t('labels.not_informed')}</span>
                )}
              </div>
            </div>

            <div className="col-span-2 md:col-span-2 bg-slate-900/40 p-2.5 md:p-3 rounded border border-slate-800/50">
              <span className="text-[0.6rem] text-gold-500/80 font-semibold uppercase tracking-wider block mb-1">
                {t('labels.service_to')}
              </span>
              <div className="flex gap-2 md:gap-3 text-xs md:text-sm text-slate-300 font-medium flex-wrap">
                {data.serves_men && <span className="flex items-center gap-1">👨 {t('labels.men')}</span>}
                {data.serves_women && <span className="flex items-center gap-1">👩 {t('labels.women')}</span>}
                {data.serves_couples && <span className="flex items-center gap-1">👫 {t('labels.couples')}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="mb-10 animate-fade-in-up">
          <h2 className="text-gold-500 font-serif text-xl md:text-2xl mb-3 border-l-4 border-gold-500 pl-4">{t('labels.about')}</h2>
          <div className="relative">
            <div className={`prose prose-invert prose-p:text-slate-300 prose-p:text-sm md:prose-p:text-base prose-p:font-light prose-p:leading-relaxed max-w-none transition-all duration-500 ${!bioExpanded ? 'max-h-24 overflow-hidden' : 'max-h-[1000px]'}`}>
              <p className="font-medium text-gold-100/90 mb-3 border-b border-white/5 pb-2">
                Olá, sou {data.display_name}. Estou disponível para encontros em {data.neighborhood || data.city}.
              </p>
              {data.full_bio && <p>{data.full_bio}</p>}
            </div>
            {!bioExpanded && (
              <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-midnight to-transparent pointer-events-none" />
            )}
          </div>
          <button onClick={() => setBioExpanded(!bioExpanded)} className="mt-2 text-gold-400 text-xs font-bold uppercase tracking-widest hover:text-white flex items-center gap-2 p-2 active:scale-95 transition-transform">
            {bioExpanded ? t('actions.read_less') : t('actions.read_more')} {bioExpanded ? '▴' : '▾'}
          </button>
        </div>

        {/* Services & Gallery & Reviews */}
        <div className="space-y-12">
           <div>
              <h2 className="text-gold-500 font-serif text-xl md:text-2xl mb-4 border-l-4 border-gold-500 pl-4">{t('labels.services')}</h2>
              <div className="grid grid-cols-2 gap-3">
                {categories.map(cat => (
                  <div key={cat.id} className="bg-slate-900 border border-slate-700/50 p-3 rounded text-center">
                    <span className="text-slate-300 text-xs md:text-sm font-medium">{cat.name}</span>
                  </div>
                ))}
              </div>
           </div>

           <div>
              <h2 className="text-gold-500 font-serif text-xl md:text-2xl mb-4 border-l-4 border-gold-500 pl-4">{t('labels.gallery')}</h2>
              <Gallery 
                items={galleryItems} 
                companionName={data.display_name} 
                companionId={data.id} // Passa o ID para a persistência correta
              />
           </div>

           <div className="mb-24">
              <CompanionReviewsSection companionId={data.id} />
           </div>
        </div>
      </div>

      {/* MOBILE STICKY CTA BAR */}
      <div 
        className={`md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a] border-t border-gold-900/30 p-3 transition-transform duration-300 ${showStickyCTA ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}
      >
        <div className="flex gap-3">
           <a 
             href={whatsappLink} 
             target="_blank" 
             className="flex-1 bg-green-600 hover:bg-green-500 text-white rounded-lg py-3 flex items-center justify-center gap-2 shadow-lg shadow-green-900/20 font-bold text-sm active:scale-95 transition-transform"
           >
             <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
             WhatsApp
           </a>
           <button onClick={() => setBookingOpen(true)} className="bg-slate-800 text-gold-400 border border-gold-500/30 rounded-lg px-4 font-bold text-sm active:scale-95 transition-transform">
             {t('actions.reserve')}
           </button>
        </div>
      </div>

      <ChatWidgetClient companionId={data.id} companionName={data.display_name} companionImage={galleryItems[0]?.url} />
      
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        companionName={data.display_name}
      />
    </div>
  );
};

const Stat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-col bg-slate-900/40 p-2 md:p-3 rounded border border-slate-800/50">
    <span className="text-[0.6rem] text-gold-500/80 font-semibold uppercase tracking-wider mb-0.5">{label}</span>
    <span className="text-sm md:text-lg font-medium text-slate-200">{value}</span>
  </div>
);

const ErrorState: React.FC<{ message: string }> = ({ message }) => (
  <div className="h-screen flex flex-col items-center justify-center text-slate-200 bg-midnight px-4 text-center">
    <p className="text-gold-500 font-serif text-xl mb-2">Ops!</p>
    <p className="text-slate-400 text-sm">{message}</p>
  </div>
);

const ProfileSkeleton: React.FC = () => (
  <div className="min-h-screen bg-midnight animate-pulse">
    {/* Hero Skeleton */}
    <div className="h-[45vh] md:h-[70vh] bg-slate-900 relative">
      <div className="absolute bottom-6 left-6 right-6">
        <div className="h-4 w-24 bg-slate-800 rounded mb-2"></div>
        <div className="h-10 w-3/4 bg-slate-800 rounded mb-2"></div>
        <div className="h-4 w-1/3 bg-slate-800 rounded"></div>
      </div>
    </div>
    
    {/* Content Skeleton */}
    <div className="max-w-4xl mx-auto px-4 -mt-6 relative z-30">
      <div className="bg-slate-900 rounded-xl p-6 shadow-2xl mb-8 border border-white/5 h-48">
        <div className="flex justify-between mb-6">
           <div className="space-y-2">
             <div className="h-3 w-20 bg-slate-800 rounded"></div>
             <div className="h-8 w-40 bg-slate-800 rounded"></div>
           </div>
           <div className="h-12 w-12 bg-slate-800 rounded-full md:hidden"></div>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-8">
           <div className="h-12 bg-slate-800 rounded"></div>
           <div className="h-12 bg-slate-800 rounded"></div>
           <div className="h-12 bg-slate-800 rounded"></div>
           <div className="h-12 bg-slate-800 rounded"></div>
        </div>
      </div>
      
      <div className="space-y-4">
         <div className="h-6 w-32 bg-slate-900 rounded mb-4"></div>
         <div className="h-4 w-full bg-slate-900 rounded"></div>
         <div className="h-4 w-full bg-slate-900 rounded"></div>
         <div className="h-4 w-2/3 bg-slate-900 rounded"></div>
      </div>
    </div>
  </div>
);

export default ProfileDetail;