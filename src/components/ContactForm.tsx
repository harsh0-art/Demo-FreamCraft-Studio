import React, { useState, useEffect } from 'react';
import { Send, Phone, Mail, Instagram, Youtube, MessageSquare, CheckCircle, Clock } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface ContactFormProps {
  currentLang: Language;
  selectedService: string;
}

export default function ContactForm({ currentLang, selectedService }: ContactFormProps) {
  const t = TRANSLATIONS[currentLang];

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    shootType: '',
    location: '',
    budget: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Auto-prefill shootType when parent selects a service
  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({
        ...prev,
        shootType: selectedService
      }));
      // Auto-scroll to contact section smoothly
      const element = document.getElementById('booking');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [selectedService]);

  const shootOptions = [
    { value: 'Wedding Photography', label: 'Wedding Photography / विवाह फोटोग्राफी' },
    { value: 'Wedding Videography', label: 'Wedding Videography / विवाह सिनेमैटोग्राफी' },
    { value: 'Pre-Wedding Shoot', label: 'Pre-Wedding Shoot / प्री-वेडिंग शूट' },
    { value: 'Event Coverage', label: 'Event Coverage / कार्यक्रम कवरेज' },
    { value: 'Portrait Shoot', label: 'Portrait Photography / पोर्ट्रेट' },
    { value: 'Product & Brand Shoot', label: 'Product & Brand Shoot / प्रोडक्ट व ब्रांड' },
    { value: 'Maternity Shoot', label: 'Maternity Shoot / मैटरनिटी' },
    { value: 'Cinematic Reels', label: 'Cinematic Reels & Promo / सिनेमाई रील्स' },
  ];

  const budgetOptions = [
    { value: 'Under ₹50,000', label: 'Under ₹50,000' },
    { value: '₹50,000 - ₹1,00,000', label: '₹50,000 - ₹1,00,000' },
    { value: '₹1,00,000 - ₹2,00,000', label: '₹1,00,000 - ₹2,00,000' },
    { value: '₹2,00,000 - ₹5,00,000', label: '₹2,00,000 - ₹5,00,000' },
    { value: '₹5,00,000+', label: '₹5,00,000+' }
  ];

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = currentLang === 'en' ? "Name is required" : "नाम आवश्यक है";
    if (!formData.phone.trim()) {
      tempErrors.phone = currentLang === 'en' ? "Phone number is required" : "फ़ोन नंबर आवश्यक है";
    } else if (!/^[0-9\s+-]{10,15}$/.test(formData.phone)) {
      tempErrors.phone = currentLang === 'en' ? "Please enter a valid phone number" : "कृपया एक सही फ़ोन नंबर प्रविष्ट करें";
    }
    if (!formData.email.trim()) {
      tempErrors.email = currentLang === 'en' ? "Email is required" : "ईमेल आवश्यक है";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = currentLang === 'en' ? "Invalid email layout" : "कृपया सही ईमेल प्रविष्ट करें";
    }
    if (!formData.date) tempErrors.date = currentLang === 'en' ? "Event date is required" : "तारीख आवश्यक है";
    if (!formData.shootType) tempErrors.shootType = currentLang === 'en' ? "Please select a shoot type" : "शूट श्रेणी चुनें";
    if (!formData.location.trim()) tempErrors.location = currentLang === 'en' ? "Location is required" : "स्थान अनिवार्य है";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear validation error on change
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      
      // Fast whatsapp redirection on submission with comprehensive prefilled message
      const phoneNumber = "919000000000"; // Indian client coordinator target
      const msgEn = `✨ *FrameCraft Wedding/Event Booking Submission* ✨\n\n👤 *Client Name:* ${formData.name}\n📞 *Phone:* ${formData.phone}\n✉️ *Email:* ${formData.email}\n📅 *Event Date:* ${formData.date}\n📸 *Shoot Category:* ${formData.shootType}\n📍 *Venue/Location:* ${formData.location}\n💰 *Budget Choice:* ${formData.budget || 'Custom Quotes Required'}\n\n💬 *Vision Notes:* ${formData.message || 'No additional notes'}`;
      const msgHi = `✨ *फ्रेमक्राफ्ट न्यू बुकिंग पूछताछ* ✨\n\n👤 *नाम:* ${formData.name}\n📞 *मोबाइल:* ${formData.phone}\n✉️ *ईमेल:* ${formData.email}\n📅 *तारीख:* ${formData.date}\n📸 *शूट प्रकार:* ${formData.shootType}\n📍 *स्थान / वेन्यू:* ${formData.location}\n💰 *अनुमानित बजट:* ${formData.budget || 'सलाह उपलब्ध करें'}\n\n💬 *संदेश / विवरण:* ${formData.message || 'कोई अतिरिक्त विवरण नहीं'}`;

      const finalMsg = currentLang === 'en' ? msgEn : msgHi;
      const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMsg)}`;

      // Brief delay to allow local success state to register, then trigger WhatsApp
      setTimeout(() => {
        window.open(waUrl, '_blank', 'noreferrer');
      }, 1000);
    }
  };

  // Direct WhatsApp Button (Floating/General target)
  const handleGeneralWhatsapp = () => {
    const phoneNumber = "919000000000";
    const msgEn = "Hello FrameCraft Studio! I was viewing your premium portfolio website and I'd like to ask a question regarding price customisations.";
    const msgHi = "नमस्ते फ्रेमक्राफ्ट स्टूडियो! मैं आपकी वेबसाइट देख रहा था और मैं बुकिंग पैकेजों में बदलाव के संबंध में कुछ पूछना चाहता था।";
    const finalMsg = currentLang === 'en' ? msgEn : msgHi;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMsg)}`, '_blank', 'noreferrer');
  };

  return (
    <section id="booking" className="py-24 bg-[#0a0a0a] border-t border-b border-white/10 relative text-white">
      {/* Absolute decorative glow anchors */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#d4af37]/2 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <span className="text-[10px] tracking-[0.3em] font-mono text-[#d4af37] uppercase block mb-2 select-none font-bold">
            {currentLang === 'en' ? 'CO-CREATE VISION' : 'बुकिंग आरंभ करें'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#fdfcfb] font-light tracking-tight">
            {t.contactTitle}
          </h2>
          <div className="w-12 h-[1px] bg-[#d4af37]/45 mx-auto mt-4 mb-4" />
          <p className="text-xs sm:text-sm font-light font-sans text-[#fdfcfb]/60 max-w-xl mx-auto leading-relaxed">
            {t.contactSubtitle}
          </p>
        </div>

        {/* Content Layout block (Left: Contact Info/Cards, Right: Booking Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start" id="booking-grid-wrapper">
          
          {/* Left Panel: Contact Detail & Instagram discoverability (Insta Portfolios / Youtube) */}
          <div className="lg:col-span-5 space-y-8" id="booking-details-panel">
            
            {/* Quick value box */}
            <div className="bg-white/[0.01] p-6 rounded-none border border-white/10 hover:border-[#d4af37]/45 transition-all duration-300">
              <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#d4af37] block mb-2 font-bold">
                {currentLang === 'en' ? 'DIRECT HELPLINES' : 'सीधी हेल्पलाइन संपर्क'}
              </span>
              <p className="text-xs text-white/50 font-sans leading-relaxed mb-6 font-light">
                {currentLang === 'en' 
                  ? 'Feel free to reach out directly over voice call or email for urgent schedule confirmations.' 
                  : 'फौरी तारीखों की पुष्टि के लिए आवाज कॉल या ईमेल द्वारा सीधे संपर्क करने के लिए स्वतंत्र महसूस करें।'}
              </p>

              <div className="space-y-4">
                <a 
                  id="direct-call-link"
                  href="tel:+919000000000" 
                  className="flex items-center space-x-3 text-white/80 hover:text-[#d4af37] transition-colors group"
                >
                  <div className="p-2.5 bg-neutral-900/60 border border-white/5 rounded-none">
                    <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                  </div>
                  <span className="font-mono text-xs tracking-wider group-hover:underline">+91 90000 00000</span>
                </a>

                <a 
                  id="direct-email-link"
                  href="mailto:contact@framecraftstudio.com" 
                  className="flex items-center space-x-3 text-white/80 hover:text-[#d4af37] transition-colors group"
                >
                  <div className="p-2.5 bg-neutral-900/60 border border-white/5 rounded-none">
                    <Mail className="w-3.5 h-3.5 text-[#d4af37]" />
                  </div>
                  <span className="font-mono text-xs tracking-wider group-hover:underline">contact@framecraftstudio.com</span>
                </a>
              </div>
            </div>

            {/* Social Media Discovery (Instagram & YouTube focus) */}
            <div className="bg-white/[0.01] p-6 rounded-none border border-white/10">
              <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#d4af37] block mb-2 font-bold">
                {currentLang === 'en' ? 'PORTFOLIO DISCOVERY' : 'सोशल मीडिया पर देखें'}
              </span>
              <p className="text-xs text-white/50 font-sans leading-relaxed mb-6 font-light">
                {currentLang === 'en'
                  ? 'We post high-definition BTS stories, cinematic reels edits, and our latest pre-wedding galleries daily on Instagram and YouTube.'
                  : 'हम हर दिन इंस्टाग्राम और यूट्यूब पर बिहाइंड-द-सीन स्टोरीज, रील्स और नए प्री-वेडिंग शूट्स अपलोड करते हैं।'}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  id="instagram-profile-link"
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center space-x-2 bg-transparent hover:bg-[#d4af37] hover:text-black hover:border-[#d4af37] border border-white/10 p-3 rounded-none font-mono text-[10px] uppercase tracking-wider text-white/80 transition-all duration-300"
                >
                  <Instagram className="w-4 h-4 text-[#d4af37] group-hover:text-black" />
                  <span>Instagram</span>
                </a>

                <a
                  id="youtube-channel-link"
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center space-x-2 bg-transparent hover:bg-red-600 hover:text-white hover:border-red-600 border border-white/10 p-3 rounded-none font-mono text-[10px] uppercase tracking-wider text-white/80 transition-all duration-300"
                >
                  <Youtube className="w-4 h-4 text-red-500 group-hover:text-white" />
                  <span>YouTube</span>
                </a>
              </div>
            </div>

            {/* Premium WhatsApp fast-track inquiry banner */}
            <div className="p-6 bg-[#25d366]/5 border border-[#25d366]/20 rounded-none flex flex-col justify-between items-start">
              <div>
                <h4 className="text-xs font-serif text-[#25d366] tracking-wider mb-1 uppercase">
                  {currentLang === 'en' ? 'Need Instant Quotations?' : 'जल्दी कोटेशन चाहिए?'}
                </h4>
                <p className="text-white/70 text-xs font-sans leading-relaxed mb-5 font-light">
                  {t.orChatOnWhatsapp}
                </p>
              </div>

              <button
                id="booking-wa-floating"
                onClick={handleGeneralWhatsapp}
                className="w-full bg-[#25d366] hover:bg-transparent text-black hover:text-[#25d366] border border-[#25d366] font-mono font-bold text-[10px] uppercase tracking-[0.2em] py-3.5 rounded-none transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>{t.whatsappBtn}</span>
              </button>
            </div>

          </div>

          {/* Right Panel: Gilded Lead Capture Form */}
          <div className="lg:col-span-7 bg-white/[0.01] p-6 sm:p-8 rounded-none border border-white/10 shadow-2xl relative" id="booking-form-panel">
            
            {/* If Form is successfully submitted */}
            {isSubmitted ? (
              <div 
                id="booking-success-message" 
                className="py-12 px-4 flex flex-col items-center justify-center text-center space-y-5 animate-fade-in"
              >
                <div className="w-16 h-16 rounded-none bg-[#d4af37]/10 border border-[#d4af37] flex items-center justify-center animate-bounce">
                  <CheckCircle className="w-8 h-8 text-[#d4af37]" />
                </div>
                <h3 className="text-2xl font-serif text-[#fdfcfb] font-light tracking-wide">
                  {currentLang === 'en' ? 'Masterpiece Planned' : 'पूछताछ प्राप्त हुई'}
                </h3>
                <p className="text-white/60 text-xs font-sans font-light leading-relaxed max-w-sm">
                  {t.formSuccess}
                </p>
                <div className="pt-4 flex flex-col space-y-2 w-full max-w-xs">
                  <div className="flex items-center justify-center space-x-2 text-[10px] font-mono text-white/50 uppercase tracking-widest">
                    <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>reply window: within 12 hours</span>
                  </div>
                  <button
                    id="success-form-reset"
                    onClick={() => {
                       setIsSubmitted(false);
                       setFormData({
                         name: '',
                         phone: '',
                         email: '',
                         date: '',
                         shootType: '',
                         location: '',
                         budget: '',
                         message: ''
                       });
                    }}
                    className="mt-2 text-xs text-[#d4af37] hover:underline font-mono tracking-wider"
                  >
                    {currentLang === 'en' ? 'Submit another inquiry' : 'दूसरी पूछताछ भेजें'}
                  </button>
                </div>
              </div>
            ) : (
              /* Core Form markup */
              <form id="contact-booking-form" onSubmit={handleSubmit} className="space-y-5">
                
                {/* 2 Column input fields row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name field */}
                  <div className="flex flex-col space-y-1.5 focus-within:text-[#d4af37] transition-colors">
                    <label className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/50 font-bold">{t.formName} *</label>
                    <input
                      id="input-form-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`bg-transparent ring-0 focus:ring-1 focus:ring-[#d4af37] focus:border-[#d4af37] focus:outline-hidden text-sm px-4 py-3 border rounded-none font-sans text-white placeholder-neutral-700 transition-all ${
                        errors.name ? 'border-red-500 focus:ring-red-500' : 'border-white/10'
                      }`}
                      placeholder="e.g. Aditi Sharma"
                    />
                    {errors.name && <span className="text-[10px] font-mono text-red-500 uppercase">{errors.name}</span>}
                  </div>

                  {/* Phone field */}
                  <div className="flex flex-col space-y-1.5 focus-within:text-[#d4af37] transition-colors">
                    <label className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/50 font-bold">{t.formPhone} *</label>
                    <input
                      id="input-form-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`bg-transparent ring-0 focus:ring-1 focus:ring-[#d4af37] focus:border-[#d4af37] focus:outline-hidden text-sm px-4 py-3 border rounded-none font-sans text-white placeholder-neutral-700 transition-all ${
                        errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-white/10'
                      }`}
                      placeholder="e.g. +91 98765 43210"
                    />
                    {errors.phone && <span className="text-[10px] font-mono text-red-500 uppercase">{errors.phone}</span>}
                  </div>
                </div>

                {/* row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Email */}
                  <div className="flex flex-col space-y-1.5 focus-within:text-[#d4af37] transition-colors">
                    <label className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/50 font-bold">{t.formEmail} *</label>
                    <input
                      id="input-form-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`bg-transparent ring-0 focus:ring-1 focus:ring-[#d4af37] focus:border-[#d4af37] focus:outline-hidden text-sm px-4 py-3 border rounded-none font-sans text-white placeholder-neutral-700 transition-all ${
                        errors.email ? 'border-red-500 focus:ring-red-500' : 'border-white/10'
                      }`}
                      placeholder="e.g. aditi@gmail.com"
                    />
                    {errors.email && <span className="text-[10px] font-mono text-red-500 uppercase">{errors.email}</span>}
                  </div>

                  {/* Date */}
                  <div className="flex flex-col space-y-1.5 focus-within:text-[#d4af37] transition-colors">
                    <label className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/50 font-bold">{t.formDate} *</label>
                    <input
                      id="input-form-date"
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className={`bg-transparent ring-0 focus:ring-1 focus:ring-[#d4af37] focus:border-[#d4af37] focus:outline-hidden text-sm px-4 py-3 border rounded-none font-sans text-white/70 select-none transition-all ${
                        errors.date ? 'border-red-500 focus:ring-red-500' : 'border-white/10'
                      }`}
                    />
                    {errors.date && <span className="text-[10px] font-mono text-red-500 uppercase">{errors.date}</span>}
                  </div>
                </div>

                {/* row 3 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Shoot Type selection */}
                  <div className="flex flex-col space-y-1.5 focus-within:text-[#d4af37] transition-colors">
                    <label className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/50 font-bold">{t.formType} *</label>
                    <select
                      id="input-form-type"
                      name="shootType"
                      value={formData.shootType}
                      onChange={handleInputChange}
                      className={`bg-transparent ring-0 focus:ring-1 focus:ring-[#d4af37] focus:border-[#d4af37] focus:outline-hidden text-xs px-4 py-3 border rounded-none font-mono text-white/70 transition-all ${
                        errors.shootType ? 'border-red-500 focus:ring-red-500' : 'border-white/10'
                      }`}
                    >
                      <option value="" className="bg-[#0a0a0a]">-- {t.selectShootType} --</option>
                      {shootOptions.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-[#0a0a0a] text-white">{opt.label}</option>
                      ))}
                    </select>
                    {errors.shootType && <span className="text-[10px] font-mono text-red-500 uppercase">{errors.shootType}</span>}
                  </div>

                  {/* Location field */}
                  <div className="flex flex-col space-y-1.5 focus-within:text-[#d4af37] transition-colors">
                    <label className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/50 font-bold">{t.formLocation} *</label>
                    <input
                      id="input-form-location"
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className={`bg-transparent ring-0 focus:ring-1 focus:ring-[#d4af37] focus:border-[#d4af37] focus:outline-hidden text-sm px-4 py-3 border rounded-none font-sans text-white placeholder-neutral-700 transition-all ${
                        errors.location ? 'border-red-500 focus:ring-red-500' : 'border-white/10'
                      }`}
                      placeholder="e.g. Oberoi Udaivilas, Udaipur"
                    />
                    {errors.location && <span className="text-[10px] font-mono text-red-500 uppercase">{errors.location}</span>}
                  </div>
                </div>

                {/* Budget selection (Critical for wedding filter) */}
                <div className="flex flex-col space-y-1.5 focus-within:text-[#d4af37] transition-colors">
                  <label className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/50 font-bold">{t.formBudget}</label>
                  <select
                    id="input-form-budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="bg-transparent ring-0 focus:ring-1 border border-white/10 focus:ring-[#d4af37] focus:border-[#d4af37] focus:outline-hidden text-xs px-4 py-3 rounded-none font-mono text-white/70"
                  >
                    <option value="" className="bg-[#0a0a0a]">-- {t.budgetRange} --</option>
                    {budgetOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-[#0a0a0a] text-white">{opt.label}</option>
                    ))}
                  </select>
                </div>

                {/* Message notes */}
                <div className="flex flex-col space-y-1.5 focus-within:text-[#d4af37] transition-colors">
                  <label className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/50 font-bold">{t.formMessage}</label>
                  <textarea
                    id="input-form-msg"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="bg-transparent ring-0 focus:ring-1 border border-white/10 focus:ring-[#d4af37] focus:border-[#d4af37] focus:outline-hidden text-sm px-4 py-3 rounded-none font-sans text-white placeholder-neutral-750 resize-none transition-all"
                    placeholder={currentLang === 'en' ? 'Describe the scale, specific rituals, traditional elements, or video requirements...' : 'अनुष्ठान रस्मों और पसंदीदा वीडियो स्टाइल की जानकारी दें...'}
                  />
                </div>

                {/* Submit button */}
                <button
                  id="booking-form-submit"
                  type="submit"
                  className="w-full bg-[#d4af37] text-black border border-[#d4af37] hover:bg-transparent hover:text-[#d4af37] font-mono font-bold uppercase text-[10px] sm:text-xs tracking-[0.2em] py-4 rounded-none transition-all duration-300 flex items-center justify-center space-x-2 mt-10"
                >
                  <Send className="w-3.5 h-3.5 fill-current" />
                  <span>{t.formSubmit}</span>
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
