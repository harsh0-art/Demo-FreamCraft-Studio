import { Star, Quote } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS, TESTIMONIALS_LIST } from '../data/translations';

interface TestimonialsProps {
  currentLang: Language;
}

export default function Testimonials({ currentLang }: TestimonialsProps) {
  const t = TRANSLATIONS[currentLang];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, idx) => (
      <Star
        key={idx}
        className={`w-3 h-3 ${
          idx < rating ? 'text-[#d4af37] fill-[#d4af37]' : 'text-neutral-800'
        }`}
      />
    ));
  };

  return (
    <section id="testimonials" className="py-24 bg-[#0a0a0a] text-white relative border-b border-white/10">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#d4af37]/2 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <span className="text-[10px] tracking-[0.3em] font-mono text-[#d4af37] uppercase block mb-2 select-none font-bold">
            {currentLang === 'en' ? 'PATRON VOICES' : 'शुभचिंतक'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#fdfcfb] font-light tracking-tight">
            {t.testimonialsTitle}
          </h2>
          <div className="w-12 h-[1px] bg-[#d4af37]/45 mx-auto mt-4 mb-4" />
          <p className="text-xs sm:text-sm font-light font-sans text-[#fdfcfb]/60 max-w-xl mx-auto leading-relaxed">
            {t.testimonialsSubtitle}
          </p>
        </div>

        {/* Testimonials Review Feed */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="testimonials-cards-grid">
          {TESTIMONIALS_LIST.map((review) => {
            const displayName = currentLang === 'en' ? review.name : review.nameHi;
            const displayEvent = currentLang === 'en' ? review.eventType : review.eventTypeHi;
            const displayComment = currentLang === 'en' ? review.comment : review.commentHi;

            return (
              <div
                key={review.id}
                id={`testimonial-card-${review.id}`}
                className="group relative bg-white/[0.01] border border-white/10 hover:border-[#d4af37]/40 p-8 rounded-none transition-all duration-300 flex flex-col justify-between"
              >
                {/* Quote Aesthetic ornament icon */}
                <div className="absolute top-6 right-8 text-neutral-900 group-hover:text-[#d4af37]/10 transition-colors duration-500 pointer-events-none">
                  <Quote className="w-10 h-10 rotate-180" />
                </div>

                <div>
                  {/* Rating Stars row */}
                  <div className="flex items-center space-x-1 mb-5">
                    {renderStars(review.rating)}
                  </div>

                  {/* Main client comment text */}
                  <p className="text-white/85 font-sans font-light leading-relaxed text-xs sm:text-sm italic mb-8 relative z-10">
                    “{displayComment}”
                  </p>
                </div>

                {/* Client Avatar credentials */}
                <div className="flex items-center space-x-4 border-t border-white/10 pt-5 mt-auto">
                  <div className="w-11 h-11 rounded-none overflow-hidden border border-white/10 flex-shrink-0">
                    <img
                      src={review.avatarUrl}
                      alt={displayName}
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-serif font-light text-white tracking-wide">
                      {displayName}
                    </h4>
                    <span className="text-[9px] font-mono tracking-[0.15em] text-[#d4af37] uppercase block mt-0.5">
                      {displayEvent}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
