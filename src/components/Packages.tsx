import { Check, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { Language, PricingPackage } from '../types';
import { TRANSLATIONS, PRICING_PACKAGES } from '../data/translations';

interface PackagesProps {
  currentLang: Language;
  onSelectPackage: (packageTitle: string) => void;
}

export default function Packages({ currentLang, onSelectPackage }: PackagesProps) {
  const t = TRANSLATIONS[currentLang];

  const handleWhatsAppInstantEnquiry = (pkg: PricingPackage) => {
    const phoneNumber = "919000000000"; // Indian contact phone
    const pkgTitle = currentLang === 'en' ? pkg.title : pkg.titleHi;
    const pkgPrice = currentLang === 'en' ? pkg.price : pkg.priceHi;
    const pkgTimeline = currentLang === 'en' ? pkg.deliveryTimeline : pkg.deliveryTimelineHi;

    const msgEn = `Hello FrameCraft Studio! I was exploring your website packages and I'm very interested in enrolling for the "${pkgTitle}" package (Starting from ${pkgPrice}). Can you please let me know your availability for a shoot? Thank you!`;
    const msgHi = `नमस्ते फ्रेमक्राफ्ट स्टूडियो! मैं आपकी वेबसाइट पर पैकेजेस देख रहा था और मुझे "${pkgTitle}" (कीमत: ${pkgPrice}) पैकेज बहुत पसंद आया। क्या आप कृपया इस पैकेज की बुकिंग के लिए तारीखों की उपलब्धता बता सकते हैं? धन्यवाद!`;

    const finalMsg = currentLang === 'en' ? msgEn : msgHi;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMsg)}`, '_blank', 'noreferrer');
  };

  return (
    <section id="packages" className="py-24 bg-[#0a0a0a] text-white relative border-b border-white/10">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#d4af37]/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <span className="text-[10px] tracking-[0.3em] font-mono text-[#d4af37] uppercase block mb-2 select-none font-bold">
            {currentLang === 'en' ? 'TRANSPARENT SERVICES' : 'पारदर्शी पैकेजेस'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#fdfcfb] font-light tracking-tight">
            {t.packagesTitle}
          </h2>
          <div className="w-12 h-[1px] bg-[#d4af37]/45 mx-auto mt-4 mb-4" />
          <p className="text-xs sm:text-sm font-light font-sans text-[#fdfcfb]/60 max-w-xl mx-auto leading-relaxed">
            {t.packagesSubtitle}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-6" id="packages-cards-grid">
          {PRICING_PACKAGES.map((pkg) => {
            const displayTitle = currentLang === 'en' ? pkg.title : pkg.titleHi;
            const displayPrice = currentLang === 'en' ? pkg.price : pkg.priceHi;
            const displayDuration = currentLang === 'en' ? pkg.duration : pkg.durationHi;
            const displayDeliverables = currentLang === 'en' ? pkg.editedPhotos : pkg.editedPhotosHi;
            const displayTimeline = currentLang === 'en' ? pkg.deliveryTimeline : pkg.deliveryTimelineHi;
            const displayInclusions = currentLang === 'en' ? pkg.inclusions : pkg.inclusionsHi;

            return (
              <div
                key={pkg.id}
                id={`package-card-${pkg.id}`}
                className={`relative flex flex-col justify-between p-8 bg-white/[0.01] border rounded-none transition-all duration-300 transform hover:-translate-y-1 ${
                  pkg.popular
                    ? 'border-[#d4af37] shadow-3xl bg-white/[0.03] lg:scale-[1.03] z-10'
                    : 'border-white/10 hover:border-[#d4af37]/40'
                }`}
              >
                {/* Popularity Badge Ornament */}
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#d4af37] text-[#0a0a0a] px-4 py-1 flex items-center space-x-1 font-mono text-[9px] uppercase tracking-widest font-bold rounded-none">
                    <Sparkles className="w-3 h-3 fill-current text-[#0a0a0a]" />
                    <span>{currentLang === 'en' ? 'MOST POPULAR' : 'सर्वाधिक लोकप्रिय'}</span>
                  </div>
                )}

                {/* Package Core Details */}
                <div>
                  <h3 className="text-lg font-serif font-light tracking-wide text-[#fdfcfb] mb-2 leading-tight">
                    {displayTitle}
                  </h3>
                  
                  {/* Pricing Tag */}
                  <div className="flex items-baseline space-x-1.5 my-6">
                    <span className="text-3xl sm:text-4xl font-serif text-[#d4af37] font-light tracking-tight animate-fade-in">
                      {displayPrice}
                    </span>
                    <span className="text-[#fdfcfb]/40 text-[10px] font-mono tracking-wider lowercase">/ baseline</span>
                  </div>

                  <div className="w-full h-[1px] bg-white/10 mb-6" />

                  {/* High-level attributes */}
                  <div className="space-y-3.5 mb-8">
                    <div className="flex items-center text-xs font-mono text-[#fdfcfb]/85">
                      <span className="text-[#d4af37] mr-2.5">⏱</span>
                      <span>{t.shootDuration}: <strong className="text-white font-medium">{displayDuration}</strong></span>
                    </div>
                    <div className="flex items-center text-xs font-mono text-[#fdfcfb]/85">
                      <span className="text-[#d4af37] mr-2.5">📸</span>
                      <span>{t.photosCount}: <strong className="text-white font-medium">{displayDeliverables}</strong></span>
                    </div>
                    <div className="flex items-center text-xs font-mono text-[#fdfcfb]/85">
                      <span className="text-[#d4af37] mr-2.5">📅</span>
                      <span>{t.timeline}: <strong className="text-white font-medium">{displayTimeline}</strong></span>
                    </div>
                  </div>

                  {/* Standard Gilded Checklist */}
                  <div className="mb-8">
                    <span className="text-[9px] font-mono tracking-[0.25em] text-[#d4af37] uppercase block mb-4">
                      {currentLang === 'en' ? 'WHAT’S INCLUDED' : 'सुविधाएं एवं अधिकार'}
                    </span>
                    <ul className="space-y-3.5">
                      {displayInclusions.map((inc, i) => (
                        <li key={i} className="flex items-start text-xs font-sans text-white/70 leading-relaxed font-light">
                          <Check className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0 mr-2.5 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Operations and CTAs */}
                <div className="space-y-3.5 pt-6 bg-transparent border-t border-white/10">
                  {/* Action 1: Form Auto-Select & Scroll */}
                  <button
                    id={`btn-pkg-enquire-${pkg.id}`}
                    onClick={() => onSelectPackage(pkg.title)}
                    className={`w-full py-3 rounded-none font-mono text-[10px] uppercase tracking-[0.2em] text-center transition-all duration-300 flex items-center justify-center space-x-1.5 ${
                      pkg.popular
                        ? 'bg-[#d4af37] text-[#0a0a0a] hover:bg-transparent hover:text-[#d4af37] border border-[#d4af37]'
                        : 'bg-transparent hover:bg-[#d4af37] text-[#d4af37] border border-[#d4af37]/35 hover:text-black font-semibold'
                    }`}
                  >
                    <span>{t.enquireNow}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {/* Action 2: Fast-Track WhatsApp Deep Link */}
                  <button
                    id={`btn-pkg-wa-direct-${pkg.id}`}
                    onClick={() => handleWhatsAppInstantEnquiry(pkg)}
                    className="w-full py-2.5 bg-[#25d366]/5 rounded-none font-mono text-[9px] font-medium tracking-[0.16em] uppercase text-center text-[#25d366] hover:bg-[#25d366] hover:text-black transition-all border border-[#25d366]/30 flex items-center justify-center space-x-1.5"
                  >
                    <MessageCircle className="w-3 h-3 fill-current" />
                    <span>{currentLang === 'en' ? 'Instant WhatsApp Chat' : 'व्हाट्सएप चैट बुकिंग'}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Footnote on customization */}
        <p className="text-center font-mono text-[10px] text-white/40 tracking-widest mt-12 max-w-lg mx-auto italic select-none">
          {t.customizationNote}
        </p>

      </div>
    </section>
  );
}
