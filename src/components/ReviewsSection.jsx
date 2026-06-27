// src/components/ReviewsSection.jsx
import { Star, Quote } from 'lucide-react';
import { useReviews } from '../hooks/useReviews';
import { SectionLoader } from './LoadingComponents.jsx';
import ScrollReveal from './ScrollReveal.jsx';

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= rating ? 'text-bistro-terracotta fill-bistro-terracotta' : 'text-bistro-darkCream'}`}
        />
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const { reviews, loading } = useReviews();

  if (loading) {
    return (
      <section className="py-24 px-4 bg-bistro-darkCream">
        <div className="max-w-6xl mx-auto">
          <SectionLoader text="Loading reviews..." />
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-bistro-darkCream">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <ScrollReveal direction="up" delay={0.1}>
            <span className="text-[10px] uppercase tracking-[0.3em] text-bistro-terracotta font-dm font-medium">Guest Experiences</span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <h2 className="font-playfair text-4xl md:text-5xl text-bistro-espresso tracking-wide mt-3 mb-4">Words From Our Table</h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <div className="w-12 h-[1px] bg-bistro-terracotta mx-auto" />
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.slice(0, 4).map((review, idx) => (
            <ScrollReveal key={review.id} direction="up" delay={0.1 * (idx + 1)}>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-bistro-darkCream/50 h-full flex flex-col">
                <Quote className="w-8 h-8 text-bistro-terracotta/20 mb-4" />
                <p className="font-dm text-sm text-bistro-sage leading-relaxed mb-6 flex-1">"{review.review}"</p>
                <div className="w-12 h-[1px] bg-bistro-darkCream mb-4" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-bistro-terracotta/10 flex items-center justify-center">
                    <span className="font-playfair text-sm text-bistro-terracotta font-bold">
                      {review.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-playfair text-sm text-bistro-espresso font-medium">{review.name}</p>
                    <StarRating rating={review.rating} />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <p className="text-center mt-12 font-dm text-xs text-bistro-sage uppercase tracking-[0.2em]">
          {reviews.length} verified reviews
        </p>
      </div>
    </section>
  );
}