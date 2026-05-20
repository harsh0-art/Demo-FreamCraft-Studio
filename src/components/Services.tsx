import * as Icons from 'lucide-react';
import { Language, ServiceItem } from '../types';
import { TRANSLATIONS, SERVICES_LIST } from '../data/translations';

interface ServicesProps {
  currentLang: Language;
  onSelectService: (serviceTitle: string) => void;
}

export default function Services({ currentLang, onSelectService }: ServicesProps) {
  const t = TRANSLATIONS[currentLang];
  const services = SERVICES_LIST(currentLang === 'en');

  // Dynamic Lucide selection helper
  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    if (IconComponent) {
      return <IconComponent className="w-5 h-5 text-[#d4af37]" />;
    }
    return <Icons.Camera className="w-5 h-5 text-[#d4af37]" />;
  };

  return (
    <section id="services" className="py-24 bg-[#0a0a0a] border-t border-b border-white/10 relative text-white">
      {/* Decorative luxury gradient overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/[0.02] via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <span className="text-[10px] tracking-[0.3em] font-mono text-[#d4af37] uppercase block mb-2 select-none font-bold">
            {currentLang === 'en' ? 'OUR REPERTOIRE' : 'हमारा कौशल'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#fdfcfb] font-light tracking-tight">
            {t.servicesTitle}
          </h2>
          <div className="w-12 h-[1px] bg-[#d4af37]/45 mx-auto mt-4 mb-4" />
          <p className="text-xs sm:text-sm font-light font-sans text-white/60 max-w-xl mx-auto leading-relaxed">
            {t.servicesSubtitle}
          </p>
        </div>

        {/* Services Grid (Bento/Card Mesh) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8" id="services-bento-grid">
          {services.map((srv) => {
            const displayTitle = currentLang === 'en' ? srv.title : srv.titleHi;
            const displayDesc = currentLang === 'en' ? srv.description : srv.descriptionHi;
            const displayPrice = currentLang === 'en' ? srv.startingPrice : srv.startingPriceHi;

            return (
              <div
                key={srv.id}
                id={`service-card-${srv.id}`}
                className="group relative flex flex-col justify-between p-6 bg-white/[0.01] border border-white/10 hover:border-[#d4af37]/55 rounded-none transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Background Accent glow */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#d4af37]/3 rounded-none pointer-events-none transition-all duration-300 group-hover:bg-[#d4af37]/8" />

                {/* Card Head (Icon & Badge Pricing) */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-2.5 bg-neutral-950 border border-white/10 rounded-none group-hover:border-[#d4af37]/40 transition-colors duration-300">
                      {renderIcon(srv.icon)}
                    </div>
                    <div className="text-right">
                      <span className="text-[8px] uppercase tracking-widest font-mono text-white/40 block">
                        {t.startingFrom}
                      </span>
                      <span className="text-xs sm:text-sm font-mono font-medium text-[#d4af37]">
                        {displayPrice}
                      </span>
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-lg font-serif font-light text-[#fdfcfb] mb-3 group-hover:text-[#d4af37] transition-colors duration-300 tracking-wide">
                    {displayTitle}
                  </h3>
                  <p className="text-white/60 text-xs font-sans font-light leading-relaxed mb-6">
                    {displayDesc}
                  </p>
                </div>

                {/* Card Action footer */}
                <button
                  id={`btn-service-inquire-${srv.id}`}
                  onClick={() => onSelectService(srv.title)}
                  className="w-full text-center text-[10px] uppercase tracking-[0.2em] font-mono text-[#d4af37] border border-[#d4af37]/30 group-hover:border-[#d4af37] py-2.5 rounded-none transition-all duration-300 bg-transparent hover:bg-[#d4af37] hover:text-black font-semibold"
                >
                  {t.enquireNow}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
