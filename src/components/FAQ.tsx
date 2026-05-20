import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS, FAQS_LIST } from '../data/translations';

interface FAQProps {
  currentLang: Language;
}

export default function FAQ({ currentLang }: FAQProps) {
  const t = TRANSLATIONS[currentLang];
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-[#0a0a0a] text-white relative border-t border-b border-white/10">
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neutral-900/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <span className="text-[10px] tracking-[0.3em] font-mono text-[#d4af37] uppercase block mb-2 select-none font-bold">
            {currentLang === 'en' ? 'COMMON CLARIFICATIONS' : 'पूछे जाने वाले सवाल'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#fdfcfb] font-light tracking-tight">
            {t.faqTitle}
          </h2>
          <div className="w-12 h-[1px] bg-[#d4af37]/45 mx-auto mt-4 mb-4" />
          <p className="text-xs sm:text-sm font-light font-sans text-[#fdfcfb]/60 max-w-xl mx-auto leading-relaxed">
            {t.faqSubtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4" id="faq-accordions-group">
          {FAQS_LIST.map((faq) => {
            const isOpen = openId === faq.id;
            const displayQuestion = currentLang === 'en' ? faq.question : faq.questionHi;
            const displayAnswer = currentLang === 'en' ? faq.answer : faq.answerHi;

            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className="bg-white/[0.01] border border-white/10 hover:border-[#d4af37]/40 rounded-none overflow-hidden transition-all duration-350"
              >
                {/* Accordion heading */}
                <button
                  id={`btn-faq-toggle-${faq.id}`}
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-hidden"
                >
                  <div className="flex items-center space-x-3.5 pr-4">
                    <HelpCircle className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                    <span className="font-serif text-sm sm:text-base font-light tracking-wide text-white/90 group-hover:text-white transition-colors duration-200">
                      {displayQuestion}
                    </span>
                  </div>
                  
                  {/* Chevron spin */}
                  <ChevronDown
                    className={`w-4 h-4 text-white/40 transition-transform duration-350 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#d4af37]' : ''
                    }`}
                  />
                </button>

                {/* Sliding description paragraph */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-80 border-t border-white/5' : 'max-h-0'
                  }`}
                >
                  <p className="p-5 text-white/60 font-sans text-xs sm:text-sm font-light leading-relaxed">
                    {displayAnswer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
