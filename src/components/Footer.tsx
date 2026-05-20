import { Camera, ChevronUp, Instagram, Youtube, Mail, Phone, MessageSquare } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface FooterProps {
  currentLang: Language;
}

export default function Footer({ currentLang }: FooterProps) {
  const t = TRANSLATIONS[currentLang];

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer-section" className="bg-[#050505] border-t border-white/10 text-white pt-16 pb-8 text-[#fdfcfb]/60 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Scroll back to top button */}
        <button
          id="btn-scroll-top-footer"
          onClick={handleScrollTop}
          className="absolute -top-22 right-4 sm:right-8 p-3 border border-white/10 hover:border-[#d4af37] text-[#d4af37] bg-neutral-950 rounded-none transition-all duration-300"
          title="Scroll to Top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>

        {/* 4 Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-white/5 pb-12 mb-10">
          
          {/* Column 1: Studio Description */}
          <div className="md:col-span-5 flex flex-col space-y-4">
            <a href="#home" className="flex flex-col group w-fit" id="footer-logo">
              <span className="text-xl sm:text-2xl font-serif font-light tracking-[0.2em] text-[#fdfcfb] group-hover:text-[#d4af37] transition-colors">
                FRAMECRAFT
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#d4af37] font-mono -mt-1 block">
                STUDIO
              </span>
            </a>
            <p className="font-sans font-light text-xs text-white/50 leading-relaxed max-w-sm">
              {t.footerDesc}
            </p>
            
            {/* Social icons handle */}
            <div className="flex items-center space-x-3.5 pt-2" id="footer-social-media-channels">
              <a
                id="footer-insta-link"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-white/10 hover:border-[#d4af37] hover:text-white rounded-none text-white/55 transition-all duration-300"
                title="Follow on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                id="footer-youtube-link"
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-white/10 hover:border-[#d4af37] hover:text-white rounded-none text-white/55 transition-all duration-300"
                title="Subscribe on YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                id="footer-wa-link"
                href="https://wa.me/919000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-white/10 hover:border-[#d4af37] hover:text-[#25d366] rounded-none text-[#25d366] transition-all duration-300"
                title="Message on WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Quicklinks */}
          <div className="md:col-span-3 flex flex-col space-y-3.5">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#d4af37] font-bold select-none">
              {currentLang === 'en' ? 'EXPLORE' : 'अन्वेषण'}
            </span>
            <div className="grid grid-cols-1 gap-2 text-xs font-sans font-light text-white/60">
              <a href="#about" className="hover:text-[#d4af37] transition-colors">{currentLang === 'en' ? 'Our Story' : 'हमारी कहानी'}</a>
              <a href="#services" className="hover:text-[#d4af37] transition-colors">{currentLang === 'en' ? 'What We Offer' : 'सेवाएं'}</a>
              <a href="#portfolio" className="hover:text-[#d4af37] transition-colors">{currentLang === 'en' ? 'Fine Art Gallery' : 'पोर्टफोलियो'}</a>
              <a href="#video-showcase" className="hover:text-[#d4af37] transition-colors">{currentLang === 'en' ? 'Cinematic Films' : 'सिनेमाई फिल्में'}</a>
              <a href="#packages" className="hover:text-[#d4af37] transition-colors">{currentLang === 'en' ? 'Packages & Plans' : 'पैकेजेस'}</a>
            </div>
          </div>

          {/* Column 3: Contact coordinates */}
          <div className="md:col-span-4 flex flex-col space-y-3.5">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#d4af37] font-bold select-none">
              {currentLang === 'en' ? 'LOCATIONS & DESK' : 'पता और संपर्क'}
            </span>
            <div className="space-y-2.5 text-xs font-sans font-light text-white/60">
              <p className="leading-relaxed">
                <span className="text-[#d4af37] font-medium">{currentLang === 'en' ? 'Jaipur Head Office:' : 'जयपुर कार्यालय:'}</span><br />
                A-22, Malviya Nagar, Jaipur, Rajasthan - 302017
              </p>
              <p className="leading-relaxed">
                <span className="text-[#d4af37] font-medium">{currentLang === 'en' ? 'Mumbai Production Desk:' : 'मुंबई डेस्क:'}</span><br />
                Studio Heights, Bandra West, Mumbai, Maharashtra - 400050
              </p>
            </div>
          </div>

        </div>

        {/* Footer Bottom copyright terms */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono tracking-widest text-white/30 uppercase">
          <span>{t.copyright}</span>
          <div className="flex space-x-4">
            <span>{t.madeBy}</span>
            <span>·</span>
            <span>Jaipur · Mumbai · Udaipur</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
