import { Camera, ChevronDown } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HeroProps {
  currentLang: Language;
  onBookClick: () => void;
}

export default function Hero({ currentLang, onBookClick }: HeroProps) {
  const t = TRANSLATIONS[currentLang];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden pt-16"
    >
      {/* Background Media with overlay gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1920"
          alt="Luxury Indian Wedding Backdrop"
          className="w-full h-full object-cover object-center opacity-40 scale-105 animate-subtle-zoom brightness-[0.45]"
          referrerPolicy="no-referrer"
        />
        {/* Soft elegant vignette and bottom shadow gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/70 via-transparent to-neutral-950/50" />
      </div>

      {/* Gold aesthetic lines (Subtle border overlay) */}
      <div className="absolute inset-4 sm:inset-6 md:inset-8 border border-white/10 pointer-events-none z-10" />

      {/* Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Top Creative Studio Tagline */}
        <div id="hero-badge" className="inline-flex items-center space-x-2.5 px-4 py-1.5 bg-white/5 border border-white/15 mb-6 animate-fade-in shadow-2xl tracking-[0.25em] select-none">
          <Camera className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="text-[10px] sm:text-xs tracking-[0.3em] font-mono text-[#fdfcfb] uppercase">
            {t.heroBadge}
          </span>
        </div>

        {/* Brand Main Heading */}
        <h1
          id="hero-heading"
          className="text-4xl sm:text-6xl md:text-8xl font-serif font-light tracking-[0.04em] text-[#fdfcfb] mb-4 leading-[1.05]"
        >
          {t.brandName}
        </h1>

        {/* Creative Tagline */}
        <div className="w-16 h-[1px] bg-[#d4af37]/40 my-3 sm:my-4" />
        <p
          id="hero-subtitle"
          className="text-base sm:text-lg md:text-xl font-serif font-light tracking-[0.2em] text-[#d4af37] mb-6 uppercase italic"
        >
          {t.heroSubtitle}
        </p>

        {/* Short intros and value propositions */}
        <p
          id="hero-intro"
          className="text-[#fdfcfb]/80 text-xs sm:text-sm md:text-base max-w-xl font-sans font-light leading-relaxed mb-10 tracking-wide"
        >
          {t.heroIntro}
        </p>

        {/* Main CTA Operations */}
        <div id="hero-ctas" className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center w-full max-w-xs sm:max-w-none">
          {/* Action 1: View Portfolio */}
          <a
            id="hero-cta-portfolio"
            href="#portfolio"
            className="w-full sm:w-auto px-8 py-3 bg-white/5 border border-white/20 hover:border-[#d4af37]/60 text-[#fdfcfb] hover:text-[#d4af37] font-mono text-[10px] uppercase tracking-[0.25em] transition-all duration-300 text-center"
          >
            {t.viewPortfolio}
          </a>

          {/* Action 2: Book Shoot */}
          <button
            id="hero-cta-book"
            onClick={onBookClick}
            className="w-full sm:w-auto px-8 py-3 bg-[#d4af37] border border-[#d4af37] text-[#0a0a0a] font-mono text-[10px] uppercase tracking-[0.25em] hover:bg-transparent hover:text-[#d4af37] transition-all duration-300 text-center"
          >
            {t.bookNow}
          </button>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <a
        id="hero-scroll-indicator"
        href="#about"
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-1.5 text-[#fdfcfb]/60 hover:text-[#d4af37] transition-colors duration-300 group"
      >
        <span className="text-[9px] uppercase tracking-[0.25em] font-mono select-none">
          {currentLang === 'en' ? 'SCROLL DOWN' : 'नीचे जाएं'}
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce group-hover:translate-y-0.5 transition-transform text-[#d4af37]" />
      </a>
    </section>
  );
}
