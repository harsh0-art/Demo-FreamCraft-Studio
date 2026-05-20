import { useState } from 'react';
import { Play, X, ExternalLink, Film, Volume2 } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface VideoShowcaseProps {
  currentLang: Language;
}

interface VideoCard {
  id: string;
  thumbnail: string;
  title: string;
  titleHi: string;
  eventType: string;
  eventTypeHi: string;
  duration: string;
  embedId?: string; // If real video is desired later, otherwise simulate
  videoUrl?: string;
}

export default function VideoShowcase({ currentLang }: VideoShowcaseProps) {
  const t = TRANSLATIONS[currentLang];
  const [activeVideo, setActiveVideo] = useState<VideoCard | null>(null);

  const videoCards: VideoCard[] = [
    {
      id: "vid-1",
      thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
      title: t.playTitle1,
      titleHi: t.playTitle1, // Already maps cleanly
      eventType: "Udaipur Royal Wedding",
      eventTypeHi: "उदयपुर शाही शादी",
      duration: "4:15 Mins",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-bride-holding-a-bouquet-at-a-golden-hour-40618-large.mp4" // High quality royalty-free cinematic video stream source!
    },
    {
      id: "vid-2",
      thumbnail: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&q=80&w=1200",
      title: t.playTitle2,
      titleHi: t.playTitle2,
      eventType: "Thar Pre-Wedding Shoot",
      eventTypeHi: "थार मरुस्थल प्री-वेडिंग",
      duration: "3:40 Mins",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-couple-walking-in-a-field-of-wheat-44917-large.mp4"
    },
    {
      id: "vid-3",
      thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200",
      title: t.playTitle3,
      titleHi: t.playTitle3,
      eventType: "Luxe Automotive Brand Film",
      eventTypeHi: "लक्ज़री ऑटोमोटिव ब्रांड विज्ञापन",
      duration: "1:30 Mins",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-fast-driving-on-a-highway-at-night-42354-large.mp4"
    }
  ];

  return (
    <section id="video-showcase" className="py-24 bg-[#0a0a0a] border-b border-white/10 relative text-white">
      {/* Decorative vertical cinematic grid lines */}
      <div className="absolute inset-y-0 left-10 w-[1px] bg-white/5 pointer-events-none" />
      <div className="absolute inset-y-0 right-10 w-[1px] bg-white/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <span className="text-[10px] tracking-[0.3em] font-mono text-[#d4af37] uppercase block mb-2 select-none font-bold">
            {currentLang === 'en' ? 'GOLDEN REELS' : 'स्वर्ण रील्स'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#fdfcfb] font-light tracking-tight">
            {t.videoTitle}
          </h2>
          <div className="w-12 h-[1px] bg-[#d4af37]/45 mx-auto mt-4 mb-4" />
          <p className="text-xs sm:text-sm font-light font-sans text-[#fdfcfb]/60 max-w-xl mx-auto leading-relaxed">
            {t.videoSubtitle}
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="video-cards-grid">
          {videoCards.map((video) => {
            const displayTitle = currentLang === 'en' ? video.title : video.titleHi;
            const displayEvent = currentLang === 'en' ? video.eventType : video.eventTypeHi;

            return (
              <div
                key={video.id}
                id={`video-card-${video.id}`}
                className="group bg-[#0a0a0a] border border-white/10 hover:border-[#d4af37]/40 rounded-none overflow-hidden transition-all duration-300 shadow-2xl flex flex-col justify-between"
              >
                {/* Simulated playback visual container */}
                <div className="relative aspect-video overflow-hidden bg-neutral-900">
                  <img
                    src={video.thumbnail}
                    alt={displayTitle}
                    className="w-full h-full object-cover group-hover:scale-103 duration-750 transition-all filter brightness-75 group-hover:brightness-50"
                    referrerPolicy="no-referrer"
                  />
                  {/* Glowing Overlay Play button */}
                  <div 
                    onClick={() => setActiveVideo(video)}
                    className="absolute inset-0 flex items-center justify-center cursor-pointer z-20 pointer-events-auto"
                  >
                    <div className="w-14 h-14 bg-[#0a0a0a]/80 group-hover:bg-[#d4af37] border border-[#d4af37] rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-lg shadow-[#d4af37]/10">
                      <Play className="w-4 h-4 text-[#d4af37] group-hover:text-black fill-current translate-x-0.5" />
                    </div>
                  </div>

                  {/* Top-right length indicator overlay */}
                  <span className="absolute top-4 right-4 bg-black/90 border border-white/10 text-[9px] font-mono text-[#d4af37] px-2.5 py-1 rounded-none tracking-widest uppercase">
                    {video.duration}
                  </span>
                </div>

                {/* Video Info details */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div className="mb-6">
                    <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#d4af37]/80 block mb-1">
                      {displayEvent}
                    </span>
                    <h3 className="text-lg font-serif font-light text-[#fdfcfb] tracking-wide group-hover:text-[#d4af37] transition-colors leading-snug">
                      {displayTitle}
                    </h3>
                  </div>

                  {/* Play trigger button */}
                  <button
                    id={`btn-watch-video-${video.id}`}
                    onClick={() => setActiveVideo(video)}
                    className="w-full inline-flex items-center justify-center space-x-2 text-[10px] font-mono uppercase tracking-[0.2em] py-3.5 border border-white/10 hover:border-[#d4af37] text-[#d4af37] bg-transparent rounded-none transition-all duration-300 hover:bg-[#d4af37] hover:text-black font-semibold"
                  >
                    <Film className="w-4 h-4" />
                    <span>{t.watchVideoBtn}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Cinematic Theater Modal Player */}
      {activeVideo && (
        <div
          id="theater-modal"
          className="fixed inset-0 bg-neutral-950/98 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-fade-in"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="w-full max-w-4xl bg-[#0a0a0a] border border-white/15 rounded-none overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Heading Toolbar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0a0a0a]">
              <div className="flex items-center space-x-2.5">
                <Film className="w-4 h-4 text-[#d4af37]" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37]">
                  {currentLang === 'en' ? 'NOW PLAYING' : 'अभी चल रहा है'}
                </span>
              </div>
              <button
                id="close-theater-modal"
                onClick={() => setActiveVideo(null)}
                className="p-1 px-3 border border-white/15 text-white/70 hover:text-white rounded-none bg-neutral-900 text-[10px] font-mono tracking-widest hover:border-[#d4af37] transition-all"
              >
                CLOSE
              </button>
            </div>

            {/* Simulated Live Cinematic Stream using premium video asset or static frame */}
            <div className="relative aspect-video bg-black flex items-center justify-center w-full">
              {activeVideo.videoUrl ? (
                <video
                  src={activeVideo.videoUrl}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <div className="text-center p-8">
                  <p className="text-sm font-mono text-[#d4af37]">Error playing stream. Placeholder video file missing.</p>
                </div>
              )}
            </div>

            {/* Modal Bottom descriptive tags */}
            <div className="p-6 bg-[#0a0a0a] border-t border-white/10">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#d4af37]/85 block mb-1">
                {currentLang === 'en' ? activeVideo.eventType : activeVideo.eventTypeHi}
              </span>
              <h3 className="text-xl font-serif font-light text-[#fdfcfb] tracking-wide">
                {currentLang === 'en' ? activeVideo.title : activeVideo.titleHi}
              </h3>
              
              <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
                <div className="flex items-center space-x-2 text-white/55 text-xs">
                  <Volume2 className="w-4 h-4 text-[#d4af37]" />
                  <span className="font-mono text-[9px] tracking-widest">DOLBY DIGITAL AUDIO 5.1 STEREO MIX</span>
                </div>
                <span className="text-white/40 text-[9px] font-mono uppercase tracking-widest">
                  UHD 4K RESOLUTION S-LOG3 COLOR MATCHED
                </span>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
