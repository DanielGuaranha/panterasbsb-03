import React, { useEffect, useState, useMemo } from 'react';
import { CompanionReview } from '../types';
import { getCompanionReviews } from '../services/supabaseClient';

interface Props {
  companionId: string;
}

const CompanionReviewsSection: React.FC<Props> = ({ companionId }) => {
  const [reviews, setReviews] = useState<CompanionReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCompanionReviews(companionId);
        if (isMounted) setReviews(data);
      } catch (err) {
        if (isMounted) setError('Não foi possível carregar os comentários agora.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => { isMounted = false; };
  }, [companionId]);

  const stats = useMemo(() => {
    if (reviews.length === 0) return { average: 0, total: 0, verifiedPercent: 0 };
    
    const total = reviews.length;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const verifiedCount = reviews.filter(r => r.visit_verified).length;

    return {
      average: (sum / total).toFixed(1),
      total,
      verifiedPercent: Math.round((verifiedCount / total) * 100)
    };
  }, [reviews]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 5);
  };

  if (loading) {
    return (
      <div className="bg-[#0a0a0a] rounded-xl border border-gold-900/20 p-8 animate-pulse">
        <div className="h-6 w-1/3 bg-slate-800 rounded mb-6"></div>
        <div className="h-20 bg-slate-800/50 rounded mb-6"></div>
      </div>
    );
  }

  if (error) return null; // Fail silently/gracefully if purely visual section

  return (
    <section className="bg-[#0a0a0a] rounded-xl border border-gold-900/20 p-6 md:p-8 shadow-2xl relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-gold-900/30 pb-6">
        <div>
          <h2 className="font-serif text-2xl text-gold-500 mb-2">Comentários de Clientes</h2>
          <div className="flex items-center gap-2">
            <span className="text-4xl font-serif text-white font-bold">{stats.average}</span>
            <div className="flex flex-col">
              <div className="flex text-gold-500 text-sm gap-0.5">
                {[1, 2, 3, 4, 5].map(star => (
                  <span key={star} className={star <= Math.round(Number(stats.average)) ? 'opacity-100' : 'opacity-30'}>★</span>
                ))}
              </div>
              <span className="text-[0.6rem] text-slate-500 uppercase tracking-wider font-semibold">
                {stats.total} {stats.total === 1 ? 'Avaliação' : 'Avaliações'}
              </span>
            </div>
          </div>
        </div>

        {/* Verified Badge Stat */}
        {stats.verifiedPercent > 0 && (
          <div className="bg-green-900/10 border border-green-900/30 rounded-lg px-4 py-2 flex items-center gap-3 w-full md:w-auto">
            <div className="bg-green-500/20 p-1.5 rounded-full shrink-0">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-lg font-bold text-green-500 leading-none">{stats.verifiedPercent}%</p>
              <p className="text-[0.6rem] text-green-400/70 uppercase tracking-widest font-semibold">Visitas Verificadas</p>
            </div>
          </div>
        )}
      </div>

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-12 h-12 mx-auto mb-3 opacity-20 text-3xl grayscale">✨</div>
          <p className="text-slate-500 text-sm">Ainda não há comentários para este perfil.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {reviews.slice(0, visibleCount).map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
      )}

      {/* Pagination / Load More */}
      {reviews.length > visibleCount && (
        <div className="mt-8 text-center border-t border-slate-900 pt-6">
          <button 
            onClick={handleLoadMore}
            className="text-gold-400 text-xs font-bold hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2 mx-auto"
          >
            <span>Carregar mais avaliações</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
};

// Sub-component to handle individual review truncation
const ReviewItem: React.FC<{ review: CompanionReview }> = ({ review }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = (review.body?.length || 0) > 150; // Threshold logic

  return (
    <div className="border-b border-slate-800/50 pb-6 last:border-0 last:pb-0 animate-fade-in">
      {/* Review Header - Flex for Alignment */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex flex-col gap-1">
          <div className="flex text-gold-500 text-xs gap-0.5">
            {[1, 2, 3, 4, 5].map(s => (
              <span key={s} className={s <= review.rating ? 'opacity-100' : 'opacity-30'}>★</span>
            ))}
          </div>
          {review.title && (
            <h3 className="text-white font-bold text-sm leading-tight">{review.title}</h3>
          )}
        </div>
        <span className="text-[0.65rem] text-slate-500 font-medium whitespace-nowrap pt-1">
          {new Date(review.created_at).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}
        </span>
      </div>

      {/* Review Body with Read More */}
      <div className="mb-3">
        <p className={`text-slate-300 text-sm font-light leading-relaxed ${!expanded ? 'line-clamp-3' : ''}`}>
          "{review.body}"
        </p>
        {isLong && (
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-[0.65rem] text-gold-500/80 hover:text-gold-400 font-bold uppercase tracking-wider mt-1"
          >
            {expanded ? 'Ler menos' : 'Ver depoimento completo'}
          </button>
        )}
      </div>

      {/* Review Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center text-[0.65rem] text-slate-500 border border-slate-700">
            👤
          </div>
          <span className="text-xs text-slate-400 italic font-medium">{review.client_pseudonym}</span>
        </div>

        {review.visit_verified && (
          <div className="flex items-center gap-1.5 text-[0.6rem] text-gold-500 bg-gold-500/10 px-2 py-1 rounded-full border border-gold-500/20">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="uppercase tracking-wider font-bold">Visita Verificada</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanionReviewsSection;