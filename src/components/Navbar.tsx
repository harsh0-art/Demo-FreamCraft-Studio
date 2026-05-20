import { useState, useEffect } from 'react';
import { Menu, X, Globe, MessageSquare } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onBookClick: () => void;
}

export default function Navbar({ currentLang, onLanguageChange, onBookClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLang];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    onLanguageChange(currentLang === 'en' ? 'hi' : 'en');
  };

  const menuItems = [
    { label: currentLang === 'en' ? 'Home' : 'होम', href: '#home' },
    { label: currentLang === 'en' ? 'About' : 'हमारे बारे में', href: '#about' },
    { label: currentLang === 'en' ? 'Services' : 'सेवाएं', href: '#services' },
    { label: currentLang === 'en' ? 'Portfolio' : 'पोर्टफोलियो', href: '#portfolio' },
    { label: currentLang === 'en' ? 'Films' : 'फ़िल्में', href: '#video-showcase' },
    { label: currentLang === 'en' ? 'Pricing' : 'पैकेजेस', href: '#packages' },
    { label: currentLang === 'en' ? 'Process' : 'प्रक्रिया', href: '#process' },
    { label: currentLang === 'en' ? 'FAQ' : 'अक्सर पूछे जाने वाले सवाल', href: '#faq' },
  ];

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
          : 'bg-gradient-to-b from-[#0a0a0a]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Branding */}
          <a href="#home" className="flex flex-col group" id="nav-logo">
            <span className="text-xl sm:text-2xl font-serif font-light tracking-[0.16em] text-[#fdfcfb] transition-colors duration-300 group-hover:text-[#d4af37]">
              FRAMECRAFT
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#d4af37] font-mono -mt-1 italic">
              Studio
            </span>
          </a>

          {/* Desktop Navigation Link Targets */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {menuItems.map((item, idx) => (
              <a
                key={idx}
                id={`desktop-menu-${idx}`}
                href={item.href}
                className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#fdfcfb]/80 hover:text-[#d4af37] transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#d4af37] hover:after:w-full after:transition-all after:duration-300"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Localization & Actions */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Language Toggle Button */}
            <button
              id="lang-toggle-desktop"
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-mono text-[#fdfcfb]/90 hover:border-[#d4af37]/60 transition-all duration-300"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="tracking-widest uppercase">{t.langSwitch}</span>
            </button>

            {/* Main CTA */}
            <button
              id="book-btn-desktop"
              onClick={onBookClick}
              className="border border-[#d4af37]/50 text-[#d4af37] font-mono text-[10px] uppercase tracking-[0.2em] px-5 py-2.5 hover:bg-[#d4af37] hover:text-black transition-all duration-300"
            >
              <span>{t.bookNow}</span>
            </button>
          </div>

          {/* Mobile Right Controls (Hamburger & Lang Selector) */}
          <div className="flex lg:hidden items-center space-x-3">
            <button
              id="lang-toggle-mobile"
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-2.5 py-1 w-auto bg-white/5 border border-white/10 text-[9px] font-mono text-[#fdfcfb]"
            >
              <Globe className="w-3 h-3 text-[#d4af37]" />
              <span className="tracking-wider">{t.langSwitch}</span>
            </button>

            <button
              id="mobile-menu-trigger"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#fdfcfb] hover:text-[#d4af37] transition-colors p-1"
              aria-label="Toggle user navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Glass Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-drawer-overlay"
          className="lg:hidden absolute top-full left-0 w-full bg-[#0a0a0a]/98 backdrop-blur-lg border-b border-white/10 py-6 px-4 flex flex-col space-y-4 animate-fade-in"
        >
          <div className="flex flex-col space-y-3.5">
            {menuItems.map((item, idx) => (
              <a
                key={idx}
                id={`mobile-menu-${idx}`}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs uppercase tracking-widest font-mono text-[#fdfcfb]/80 hover:text-[#d4af37] py-2 border-b border-white/5"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="pt-4 flex flex-col space-y-3">
            <button
              id="book-btn-mobile"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onBookClick();
              }}
              className="w-full border border-[#d4af37]/60 text-[#d4af37] text-center py-3 font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-[#d4af37] hover:text-black transition-all"
            >
              <span>{t.bookNow}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
