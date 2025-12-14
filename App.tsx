import React, { useState } from 'react';
import { StickySection } from './components/StickySection';
import { MinecraftButton } from './components/MinecraftButton';
import { SocialCard } from './components/SocialCard';
import { StartMenuModal } from './components/StartMenuModal';
import { SocialsModal } from './components/SocialsModal';
import { SupportModal } from './components/SupportModal';
import { SakuraParticles } from './components/SakuraParticles';
import { NetherParticles } from './components/NetherParticles';
import { EndParticles } from './components/EndParticles';
import { ServerStatus } from './components/ServerStatus';
import { BackgroundAudio } from './components/BackgroundAudio'; 
import { AchievementProvider, useAchievement } from './components/AchievementSystem'; 
import { Github, Heart, MessageCircle, Gamepad2, Copy } from 'lucide-react';
import { playClickSound } from './utils/audio'; 

// Изображения для фонов
const BACKGROUNDS = {
  overworld: "https://wallpapercave.com/wp/wp13570264.jpg", 
  nether: "https://wallpapercave.com/wp/wp3859952.jpg",     
  end: "https://wallpapercave.com/wp/wp8368519.jpg"         
};

// Internal component to use the hook
const MainContent: React.FC = () => {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isSocialsOpen, setIsSocialsOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  
  const { triggerAchievement } = useAchievement(); 

  const handleCopyIp = () => {
    playClickSound(); 
    navigator.clipboard.writeText("play.chillout.gg");
    
    // Trigger Achievement Popup
    triggerAchievement("Achievement Get!", "IP Copied to clipboard!");
  };

  const handleOpenModal = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    playClickSound(); 
    setter(true);
  }

  const isAnyModalOpen = isStartMenuOpen || isSocialsOpen || isSupportOpen;

  // Используем реальный IP для теста
  const SERVER_IP = "fadecloud.com"; 

  return (
    <>
      <BackgroundAudio />
      
      <StartMenuModal isOpen={isStartMenuOpen} onClose={() => setIsStartMenuOpen(false)} />
      <SocialsModal isOpen={isSocialsOpen} onClose={() => setIsSocialsOpen(false)} />
      <SupportModal isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />

      {/* Global Styles for Cursor and Selection */}
      <style>{`
        /* Custom Minecraft Cursor */
        body {
          cursor: url('https://cdn.custom-cursor.com/db/cursor/32/minecraft_crosshair_cursor.png') 16 16, auto;
        }
        
        /* Pointer cursor for clickable elements */
        button, a, .cursor-pointer {
          cursor: url('https://cdn.custom-cursor.com/db/pointer/32/minecraft_diamond_sword_pointer.png'), pointer !important;
        }

        /* Selection color */
        ::selection {
          background: #5cb85c; /* Minecraft Green */
          color: white;
        }
        
        .pixelated {
            image-rendering: pixelated;
        }
      `}</style>

      {/* 
        Main Container
        - Native scroll behavior
        - Locks scroll when modal is open
        - h-screen is CRITICAL here because body is overflow:hidden
      */}
      <main 
        className={`
          relative w-full h-screen transition-all duration-300 ease-in-out
          ${isAnyModalOpen 
            ? 'overflow-hidden blur-sm grayscale-[0.5]' 
            : 'overflow-y-auto blur-0 grayscale-0' 
          }
        `}
      >
        {/* 
            Module 1: Welcome (Overworld) 
            height="200vh" + marginBottom="-100vh" logic:
            - The section physically occupies 100vh of space in the document flow (200 - 100).
            - The sticky behavior lasts for the full 200vh of internal scrolling.
            - This creates a 100vh "buffer" where Section 1 stays fixed while Section 2 slides UP over it.
        */}
        <StickySection 
          zIndex={10} 
          height="200vh"
          marginBottom="-100vh"
          bgImage={BACKGROUNDS.overworld}
          overlayOpacity={0.3}
        >
          {/* Particles Effect */}
          <SakuraParticles />

          <style>{`
            @keyframes fadeInUp {
              0% { opacity: 0; transform: translateY(40px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            .animate-appear {
              opacity: 0;
              animation: fadeInUp 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
            }
            .delay-200 { animation-delay: 0.2s; }
            .delay-1000 { animation-delay: 1.0s; }
          `}</style>

          <div className="w-full h-full flex flex-col justify-between items-center z-10 relative">
            {/* Main Content - Centered in remaining space */}
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
              <div className="animate-appear delay-200 flex flex-col items-center">
                <div className="transform hover:scale-105 transition-transform duration-500">
                  <h1 className="text-7xl md:text-9xl font-bold text-white tracking-widest drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                    ChillOut!
                  </h1>
                  <p className="text-2xl md:text-4xl text-gray-200 mt-4 drop-shadow-md">
                    Welcome to your new home
                  </p>
                </div>

                {/* Live Server Status Widget */}
                <ServerStatus ip={SERVER_IP} />
              </div>
            </div>
            
            {/* Scroll Indicator - Bottom */}
            <div className="pb-12 animate-bounce animate-appear delay-1000 text-center">
              <p className="text-xl text-white/80">Scroll Down</p>
              <div className="w-6 h-6 border-b-4 border-r-4 border-white rotate-45 mx-auto mt-2"></div>
            </div>
          </div>
        </StickySection>

        {/* 
           Module 2: Start Playing (Nether)
           Same logic: stays fixed while Module 3 slides over it.
        */}
        <StickySection 
          zIndex={20} 
          height="200vh"
          marginBottom="-90vh"
          bgImage={BACKGROUNDS.nether}
          overlayOpacity={0.5}
        >
          {/* Nether Particles Effect */}
          <NetherParticles />

          <div className="text-center max-w-2xl px-4 relative z-10">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 text-white drop-shadow-lg">
              Ready to Adventure?
            </h2>
            <p className="text-2xl text-gray-200 mb-12">
              Dive into the cozy atmosphere of survival.
            </p>
            
            <div className="flex flex-col items-center gap-6">
              <MinecraftButton 
                onClick={() => handleOpenModal(setIsStartMenuOpen)} 
                variant="primary" 
                size="large"
                icon={<Gamepad2 className="w-8 h-8" />}
              >
                START PLAYING
              </MinecraftButton>
              
              <div 
                className="flex items-center gap-2 text-white/70 hover:text-white cursor-pointer transition-colors bg-black/30 px-4 py-2 rounded"
                onClick={handleCopyIp}
              >
                <Copy size={16} />
                <span className="text-lg tracking-wider">
                  play.chillout.gg
                </span>
              </div>
            </div>
          </div>
        </StickySection>

        {/* 
           Module 3: Community & Support (The End)
           Last section needs to be just normal 100vh (or more) to cover the previous one and rest.
        */}
        <StickySection 
          zIndex={30} 
          height="100vh"
          bgImage={BACKGROUNDS.end}
          overlayOpacity={0.6}
        >
          {/* End Particles Effect */}
          <EndParticles />

          <div className="w-full max-w-5xl px-4 relative z-10">
            <h2 className="text-5xl md:text-7xl font-bold text-center mb-16 text-white drop-shadow-lg">
              Join the Community
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <SocialCard 
                title="GitHub" 
                description="Check our open source plugins and contribute code."
                icon={<Github className="w-12 h-12" />}
                color="bg-gray-800"
                borderColor="border-gray-600"
                actionText="View Code"
                onClick={() => {
                  playClickSound();
                  window.open('https://github.com/Shura4eburek', '_blank');
                }}
              />
              
              <SocialCard 
                title="Support Creator" 
                description="Love the server? Support us to keep the chunks loading."
                icon={<Heart className="w-12 h-12 text-red-500" />}
                color="bg-pink-900"
                borderColor="border-pink-700"
                actionText="Donate"
                onClick={() => handleOpenModal(setIsSupportOpen)}
              />
              
              <SocialCard 
                title="Socials" 
                description="Join our Discord and follow us for updates."
                icon={<MessageCircle className="w-12 h-12 text-blue-400" />}
                color="bg-blue-900"
                borderColor="border-blue-700"
                actionText="Connect"
                onClick={() => handleOpenModal(setIsSocialsOpen)}
              />
            </div>

            <footer className="mt-24 text-center text-gray-400 text-lg">
              <p>&copy; {new Date().getFullYear()} ChillOut! Project. Not affiliated with Mojang AB.</p>
            </footer>
          </div>
        </StickySection>
      </main>
    </>
  );
}

const App: React.FC = () => {
  return (
    <AchievementProvider>
      <MainContent />
    </AchievementProvider>
  );
};

export default App;