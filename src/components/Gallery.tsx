import { useState, useEffect } from 'react';
import { Play, X, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { Language, GalleryItem } from '../types';
import { TRANSLATIONS, PORTFOLIO_ITEMS } from '../data/translations';

interface GalleryProps {
  currentLang: Language;
}

type FilterCategory = 'all' | 'weddings' | 'pre-wedding' | 'events' | 'portraits' | 'brands';

export default function Gallery({ currentLang }: GalleryProps) {
  const t = TRANSLATIONS[currentLang];
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter gallery items
  const filteredItems = activeFilter === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(item => item.category === activeFilter);

  // Keyboard navigation inside lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    const prevIdx = (lightboxIndex - 1 + filteredItems.length) % filteredItems.length;
    setLightboxIndex(prevIdx);
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    const nextIdx = (lightboxIndex + 1) % filteredItems.length;
    setLightboxIndex(nextIdx);
  };

  // WhatsApp deep-link message for specific photo
  const getWhatsAppLinkForPhoto = (item: GalleryItem) => {
    const phoneNumber = "919000000000"; // Placeholder Indian number
    const photoTitle = currentLang === 'en' ? item.title : item.titleHi;
    const categoryLabel = currentLang === 'en' ? item.categoryLabel : item.categoryLabelHi;
    
    const messageEn = `Hello FrameCraft Studio! I was viewing your website and absolutely loved this portfolio frame: "${photoTitle}" in the ${categoryLabel} category. I'd love to enquire regarding pricing and availability for a similar shoot!`;
    const messageHi = `नमस्ते फ्रेमक्राफ्ट स्टूडियो! मैं आपकी वेबसाइट देख रहा था और मुझे यह फ़ोटो बहुत पसंद आई: "${photoTitle}" (श्रेणी: ${categoryLabel})। मैं इसी तरह के शूट के लिए कीमतों और तारीखों के बारे में जानकारी चाहता हूँ!`;
    
    const finalMsg = currentLang === 'en' ? messageEn : messageHi;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMsg)}`;
  };

  const categories: { id: FilterCategory; label: string; labelHi: string }[] = [
    { id: 'all', label: 'All Showcase', labelHi: 'सभी काम' },
    { id: 'weddings', label: t.filterWeddings, labelHi: 'शादियां (Vivah)' },
    { id: 'pre-wedding', label: t.filterPreWedding, labelHi: 'प्री-वेडिंग' },
    { id: 'events', label: t.filterEvents, labelHi: 'इवेंट्स' },
    { id: 'portraits', label: t.filterPortraits, labelHi: 'पोर्ट्रेट्स' },
    { id: 'brands', label: t.filterBrands, labelHi: 'ब्रांड्स' },
  ];

  return (
    <section id="portfolio" className="py-24 bg-[#0a0a0a] text-white relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Caption & Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
          <span className="text-[10px] tracking-[0.3em] font-mono text-[#d4af37] uppercase block mb-2 font-bold select-none">
            {currentLang === 'en' ? 'CURATED ANTHOLOGY' : 'दृश्य संग्रह'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#fdfcfb] font-light tracking-tight">
            {t.portfolioTitle}
          </h2>
          <div className="w-12 h-[1px] bg-[#d4af37]/45 mx-auto mt-4 mb-4" />
          <p className="text-xs sm:text-sm font-light font-sans text-[#fdfcfb]/60 max-w-xl mx-auto leading-relaxed">
            {t.portfolioSubtitle}
          </p>
        </div>

        {/* Categories Dynamic Filters Navbar */}
        <div 
          id="gallery-filters" 
          className="flex flex-wrap justify-center gap-1.5 sm:gap-3 mb-12 border-b border-white/10 pb-4 max-w-4xl mx-auto"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`filter-btn-${cat.id}`}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4 py-2.5 rounded-none text-[10px] uppercase font-mono tracking-[0.2em] transition-all duration-300 ${
                activeFilter === cat.id
                  ? 'border-b-2 border-[#d4af37] text-[#d4af37] font-semibold'
                  : 'text-white/50 hover:text-[#d4af37] hover:border-b-2 hover:border-[#d4af37]/35'
              }`}
            >
              {currentLang === 'en' ? cat.label : cat.labelHi}
            </button>
          ))}
        </div>

        {/* Masonry-Style Responsive Mesh Gallery */}
        <div 
          id="gallery-grid" 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredItems.map((item, index) => {
            const displayTitle = currentLang === 'en' ? item.title : item.titleHi;
            const displayCategory = currentLang === 'en' ? item.categoryLabel : item.categoryLabelHi;

            return (
              <div
                key={item.id}
                id={`gallery-item-${item.id}`}
                onClick={() => setLightboxIndex(index)}
                className="group relative cursor-pointer overflow-hidden rounded-none bg-neutral-900 border border-white/10 hover:border-[#d4af37]/50 transition-all duration-500 ease-out shadow-2xl"
              >
                {/* Visual Image frame */}
                <div className="aspect-[4/5] overflow-hidden bg-neutral-950">
                  <img
                    src={item.imageUrl}
                    alt={displayTitle}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out brightness-[0.85] group-hover:brightness-95"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Hover Metadata Overlay Panel */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#d4af37] mb-1.5 block">
                    {displayCategory}
                  </span>
                  <h3 className="text-base font-serif font-light text-[#fdfcfb] tracking-wide">
                    {displayTitle}
                  </h3>
                  <div className="w-8 h-[1px] bg-[#d4af37] mt-2 group-hover:w-16 transition-all duration-300" />
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Luxury Interactive Lightbox/Modal Showcase */}
      {lightboxIndex !== null && (
        <div
          id="gallery-lightbox"
          className="fixed inset-0 bg-[#070707]/99 backdrop-blur-md z-50 flex flex-col items-center justify-between pb-6 animate-fade-in"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Header toolbar */}
          <div className="w-full flex justify-between items-center px-6 py-4 border-b border-white/10 bg-neutral-950/40">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#d4af37]">
                {currentLang === 'en' ? 'FRAMECRAFT ARTISTRY' : 'फ्रेमक्राफ्ट कला'}
              </span>
              <p className="text-[10px] text-white/50 font-sans tracking-widest mt-0.5">
                {lightboxIndex + 1} / {filteredItems.length}
              </p>
            </div>
            <button
              id="close-lightbox"
              onClick={() => setLightboxIndex(null)}
              className="p-2.5 border border-white/10 text-white/70 hover:text-[#d4af37] rounded-none hover:border-[#d4af37] transition-all bg-neutral-950"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Main Showcase Panel (Image and Swipes) */}
          <div 
            className="flex-grow w-full max-w-5xl mx-auto px-4 flex items-center justify-between pointer-events-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev btn */}
            <button
              id="prev-lightbox-image"
              onClick={handlePrev}
              className="p-3 border border-white/10 text-white/60 hover:text-[#d4af37] hover:border-[#d4af37]/60 rounded-none transition-colors bg-neutral-900/60 pointer-events-auto shrink-0 mr-4 hidden sm:block"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Selected Photo Image */}
            <div className="relative max-h-[68vh] aspect-[4/5] sm:aspect-auto overflow-hidden mx-auto pointer-events-auto rounded-none border border-white/10 shadow-2xl flex items-center justify-center bg-black">
              <img
                src={filteredItems[lightboxIndex].imageUrl}
                alt={currentLang === 'en' ? filteredItems[lightboxIndex].title : filteredItems[lightboxIndex].titleHi}
                className="max-w-full max-h-[66vh] object-contain rounded-none"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Next btn */}
            <button
              id="next-lightbox-image"
              onClick={handleNext}
              className="p-3 border border-white/10 text-white/60 hover:text-[#d4af37] hover:border-[#d4af37]/60 rounded-none transition-colors bg-neutral-900/60 pointer-events-auto shrink-0 ml-4 hidden sm:block"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Footer Metadata & Multi-Language Call For Bookings */}
          <div 
            className="w-full max-w-2xl text-center px-4 pt-4 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#d4af37] uppercase block mb-1">
              {currentLang === 'en' 
                ? filteredItems[lightboxIndex].categoryLabel 
                : filteredItems[lightboxIndex].categoryLabelHi}
            </span>
            <h3 className="text-lg sm:text-xl font-serif text-[#fdfcfb] font-light mb-4 tracking-wide">
              {currentLang === 'en' 
                ? filteredItems[lightboxIndex].title 
                : filteredItems[lightboxIndex].titleHi}
            </h3>

            {/* Quick Mobile arrows */}
            <div className="flex sm:hidden justify-center space-x-6 mb-4">
              <button
                onClick={handlePrev}
                className="px-4 py-2 border border-white/10 text-white rounded-none font-mono text-[10px] uppercase tracking-wider"
              >
                {currentLang === 'en' ? 'PREV' : 'पिछला'}
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 border border-white/10 text-white rounded-none font-mono text-[10px] uppercase tracking-wider"
              >
                {currentLang === 'en' ? 'NEXT' : 'अगला'}
              </button>
            </div>

            {/* Direct WhatsApp Shoot Quote Link */}
            <a
              id="lightbox-wa-inquire"
              href={getWhatsAppLinkForPhoto(filteredItems[lightboxIndex])}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-[#25d366]/10 border border-[#25d366]/30 text-[#25d366] hover:bg-[#25d366] hover:text-black px-6 py-2.5 rounded-none text-[10px] font-mono tracking-widest uppercase transition-all duration-300"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{currentLang === 'en' ? 'Enquire on WhatsApp' : 'व्हाट्सएप पर पूछें'}</span>
            </a>
          </div>

        </div>
      )}

    </section>
  );
}
