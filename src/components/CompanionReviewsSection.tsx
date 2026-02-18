import React, { useEffect, useState, useMemo } from 'react';
import { CompanionReview } from '../types';
import { getCompanionReviews } from '../services/supabaseClient';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  companionId: string;
}

const CompanionReviewsSection: React.FC<Props> = ({ companionId }) => {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState<CompanionReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getCompanionReviews(companionId);
        setReviews(data);
      } catch (err) {
        // Silent error
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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

  if (loading) return <div className="animate-pulse h-20 bg-slate-900 rounded"></div>;

  return (
    <section className="bg-[#0a0a0a] rounded-xl border border-gold-900/20 p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-gold-900/30 pb-6">
        <div>
          <h2 className="font-serif text-2xl text-gold-500 mb-2">{t('reviews.title')}</h2>
          <div className="flex items-center gap-2">
            <span className="text-4xl font-serif text-white font-bold">{stats.average}</span>
            <span className="text-[0.6rem] text-slate-500 uppercase tracking-wider font-semibold">
                {stats.total} {t('labels.reviews')}
            </span>
          </div>
        </div>
        {stats.verifiedPercent > 0 && (
          <div className="bg-green-900/10 border border-green-900/30 rounded-lg px-4 py-2">
            <p className="text-lg font-bold text-green-500 leading-none">{stats.verifiedPercent}%</p>
            <p className="text-[0.6rem] text-green-400/70 uppercase tracking-widest font-semibold">{t('reviews.verified_visit')}</p>
          </div>
        )}
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-500 text-sm">{t('reviews.empty')}</p>
        </div>
      ) : (
        <div className="space-y-8">
          {reviews.slice(0, visibleCount).map((review) => (
            <ReviewItem key={review.id} review={review} t={t} />
          ))}
        </div>
      )}

      {reviews.length > visibleCount && (
        <div className="mt-8 text-center border-t border-slate-900 pt-6">
          <button onClick={() => setVisibleCount(prev => prev + 5)} className="text-gold-400 text-xs font-bold uppercase tracking-widest">
            {t('reviews.load_more')}
          </button>
        </div>
      )}
    </section>
  );
};

const ReviewItem: React.FC<{ review: CompanionReview, t: any }> = ({ review, t }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border-b border-slate-800/50 pb-6 last:border-0 last:pb-0 animate-fade-in">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-white font-bold text-sm leading-tight">{review.title}</h3>
      </div>
      <div className="mb-3">
        <p className={`text-slate-300 text-sm font-light leading-relaxed ${!expanded ? 'line-clamp-3' : ''}`}>"{review.body}"</p>
        {review.body && review.body.length > 150 && (
          <button onClick={() => setExpanded(!expanded)} className="text-[0.65rem] text-gold-500/80 font-bold uppercase tracking-wider mt-1">
            {expanded ? t('reviews.read_less') : t('reviews.read_full')}
          </button>
        )}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400 italic font-medium">{review.client_pseudonym}</span>
        {review.visit_verified && <span className="uppercase tracking-wider font-bold text-[0.6rem] text-gold-500">{t('reviews.verified_visit')}</span>}
      </div>
    </div>
  );
};

export default CompanionReviewsSection;