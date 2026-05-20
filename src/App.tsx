/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Language } from './types';

// Importing Custom Reusable Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import VideoShowcase from './components/VideoShowcase';
import Packages from './components/Packages';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [selectedService, setSelectedService] = useState<string>('');

  // Handle inquiry from service card or package click
  const handleInquireTrigger = (serviceOrProductTitle: string) => {
    setSelectedService(serviceOrProductTitle);
    
    // Smooth scroll down to contact section immediately
    const infoSection = document.getElementById('booking');
    if (infoSection) {
      infoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookNowScroll = () => {
    const infoSection = document.getElementById('booking');
    if (infoSection) {
      infoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#080808] text-neutral-200 min-h-screen selection:bg-[#d4af37]/80 selection:text-neutral-950">
      
      {/* 1. Header Navigation Bar */}
      <Navbar
        currentLang={language}
        onLanguageChange={setLanguage}
        onBookClick={handleBookNowScroll}
      />

      {/* 2. Full-Screen Cinematic Hero Banner */}
      <Hero 
        currentLang={language} 
        onBookClick={handleBookNowScroll} 
      />

      {/* 3. Story & Biography About Block */}
      <About currentLang={language} />

      {/* 4. Luxury Service Bento Selection */}
      <Services 
        currentLang={language} 
        onSelectService={handleInquireTrigger} 
      />

      {/* 5. Masonry Portfolio Gallery with Interactive Lightbox */}
      <Gallery currentLang={language} />

      {/* 6. Cinematic Video Film Player Grid */}
      <VideoShowcase currentLang={language} />

      {/* 7. Investment Packages & Baseline pricing */}
      <Packages 
        currentLang={language} 
        onSelectPackage={handleInquireTrigger} 
      />

      {/* 8. Timelines & Work Methodology */}
      <Process currentLang={language} />

      {/* 9. Client reviews and ratings */}
      <Testimonials currentLang={language} />

      {/* 10. Gilded Direct Booking Intake & Contact Form */}
      <ContactForm 
        currentLang={language} 
        selectedService={selectedService} 
      />

      {/* 11. Frequently Answered Questions Accordions */}
      <FAQ currentLang={language} />

      {/* 12. Footers and credentials */}
      <Footer currentLang={language} />

    </div>
  );
}
