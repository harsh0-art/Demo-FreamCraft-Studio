import { Award, Camera, Heart, CheckCircle } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface AboutProps {
  currentLang: Language;
}

export default function About({ currentLang }: AboutProps) {
  const t = TRANSLATIONS[currentLang];

  const highlights = [
    {
      id: "hl-1",
      icon: <Award className="w-4 h-4 text-[#d4af37]" />,
      label: t.statExperience,
    },
    {
      id: "hl-2",
      icon: <Camera className="w-4 h-4 text-[#d4af37]" />,
      label: t.statEvents,
    },
    {
      id: "hl-3",
      icon: <Heart className="w-4 h-4 text-[#d4af37]" />,
      label: t.statShoots,
    },
    {
      id: "hl-4",
      icon: <CheckCircle className="w-4 h-4 text-[#d4af37]" />,
      label: t.statEditing,
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#0a0a0a] text-white relative overflow-hidden border-b border-white/10">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#d4af37]/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-neutral-900/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Photographer Imagery Presentation */}
          <div className="relative group mx-auto max-w-md lg:max-w-none" id="about-image-container">
            {/* Outline Decorative borders */}
            <div className="absolute -top-3 -left-3 w-12 h-12 border-t border-l border-[#d4af37]/60 z-20 pointer-events-none" />
            <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b border-r border-[#d4af37]/60 z-20 pointer-events-none" />
            
            {/* Accent background shading */}
            <div className="absolute inset-0 bg-[#d4af37]/5 translate-x-2 translate-y-2 rounded-none z-0 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-500 ease-out" />
            
            <div className="relative overflow-hidden aspect-[4/5] rounded-none bg-neutral-900 z-10 shadow-2xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800"
                alt="Lead Photographer and Cinematographer of FrameCraft"
                className="w-full h-full object-cover grayscale opacity-90 group-hover:scale-103 group-hover:grayscale-0 transition-all duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-85" />
              
              {/* Bottom tag inside picture */}
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[9px] tracking-[0.25em] font-mono text-[#d4af37] uppercase block mb-1">
                  {currentLang === 'en' ? 'FOUNDER & LEAD CINEMATOGRAPHER' : 'संस्थापक एवं मुख्य सिनेमैटोग्राफर'}
                </span>
                <h4 className="text-lg font-serif font-light text-[#fdfcfb] tracking-wide">
                  Pranav Patel / प्रियांशु पटेल
                </h4>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Biography */}
          <div className="flex flex-col space-y-8" id="about-text-container">
            <div>
              <span className="text-[10px] tracking-[0.3em] font-mono text-[#d4af37] uppercase block mb-2 font-bold select-none">
                {t.aboutTitle}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#fdfcfb] font-light tracking-tight leading-tight">
                {t.aboutSubtitle}
              </h2>
              <div className="w-12 h-[1px] bg-[#d4af37]/60 mt-4" />
            </div>

            <div className="space-y-6 text-[#fdfcfb]/80 font-sans font-light leading-relaxed text-sm sm:text-base">
              <p>{t.aboutStory1}</p>
              <p>{t.aboutStory2}</p>
            </div>

            {/* Credibility Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4" id="about-highlights-grid">
              {highlights.map((hl) => (
                <div
                  key={hl.id}
                  className="flex items-start space-x-3.5 p-4 rounded-none bg-white/[0.02] border border-white/10 hover:border-[#d4af37]/45 transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 p-2 bg-neutral-950 border border-white/10 rounded-none group-hover:border-[#d4af37]/30 transition-colors">
                    {hl.icon}
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-xs font-mono tracking-wider text-[#fdfcfb]/90 group-hover:text-[#d4af37] transition-colors leading-snug">
                      {hl.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
