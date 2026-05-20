import { Calendar, Users, Cpu, FileClock, ShieldAlert } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS, PROCESS_STEPS } from '../data/translations';

interface ProcessProps {
  currentLang: Language;
}

export default function Process({ currentLang }: ProcessProps) {
  const t = TRANSLATIONS[currentLang];

  return (
    <section id="process" className="py-24 bg-[#0a0a0a] border-t border-b border-white/10 relative text-white text-sans overflow-hidden">
      <div className="absolute top-10 left-0 w-80 h-80 bg-neutral-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <span className="text-[10px] tracking-[0.3em] font-mono text-[#d4af37] uppercase block mb-2 select-none font-bold">
            {currentLang === 'en' ? 'OUR METHODOLOGY' : 'हमारी कार्यप्रणाली'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#fdfcfb] font-light tracking-tight">
            {t.processTitle}
          </h2>
          <div className="w-12 h-[1px] bg-[#d4af37]/45 mx-auto mt-4 mb-4" />
          <p className="text-xs sm:text-sm font-light font-sans text-[#fdfcfb]/60 max-w-xl mx-auto leading-relaxed">
            {t.processSubtitle}
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-4xl mx-auto" id="process-timeline-layout">
          {/* Central Vertical connecting line on desktop */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-[1px] bg-gradient-to-b from-[#d4af37]/45 via-white/10 to-transparent -translate-x-1/2 hidden sm:block pointer-events-none" />
          {/* Mobile connecting line at margin */}
          <div className="absolute left-6 top-4 bottom-4 w-[1px] bg-white/10 sm:hidden pointer-events-none" />

          {/* Core Timeline Steps loop */}
          <div className="space-y-12 sm:space-y-16">
            {PROCESS_STEPS.map((step, idx) => {
              const displayTitle = currentLang === 'en' ? step.title : step.titleHi;
              const displayDesc = currentLang === 'en' ? step.description : step.descriptionHi;
              const isEven = idx % 2 === 0;

              return (
                <div 
                  key={step.id} 
                  id={`process-step-${idx}`}
                  className="relative flex flex-col sm:flex-row items-stretch"
                >
                  {/* Square Indicator Badge */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 top-0 z-10 flex-shrink-0">
                    <div className="w-7 h-7 rounded-none bg-black border border-[#d4af37] flex items-center justify-center font-mono text-xs text-[#d4af37] font-bold select-none">
                      {step.id}
                    </div>
                  </div>

                  {/* Left Column (Grid cell) */}
                  <div className={`w-full sm:w-1/2 pl-16 sm:pl-0 sm:pr-12 ${isEven ? 'sm:text-right' : 'sm:order-2 sm:pl-12'}`}>
                    <div className="bg-white/[0.01] p-6 rounded-none border border-white/10 hover:border-[#d4af37]/45 transition-all duration-300">
                      <h4 className="text-sm font-sans uppercase tracking-wider text-[#d4af37] mb-2 font-bold">
                        {displayTitle}
                      </h4>
                      <p className="text-white/60 font-sans text-xs sm:text-sm font-light leading-relaxed">
                        {displayDesc}
                      </p>
                    </div>
                  </div>

                  {/* Right Column Spacer (balancing row layout) */}
                  <div className="hidden sm:block w-1/2" />

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
