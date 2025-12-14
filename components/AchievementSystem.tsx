import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { Check } from 'lucide-react';

// --- Types ---
interface Achievement {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface AchievementContextType {
  triggerAchievement: (title: string, description: string, icon?: React.ReactNode) => void;
}

// --- Context ---
const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

export const useAchievement = () => {
  const context = useContext(AchievementContext);
  if (!context) {
    throw new Error('useAchievement must be used within an AchievementProvider');
  }
  return context;
};

// --- Assets ---
// Grass block icon for the achievement
const ICON_URL = "https://ru-minecraft.ru/uploads/posts/2021-04/1618981142_637545104773248835.png";
// Level up sound
const ACHIEVEMENT_SOUND = "https://www.myinstants.com/media/sounds/minecraft-achievement.mp3";

// --- Component ---
export const AchievementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(ACHIEVEMENT_SOUND);
    audioRef.current.volume = 0.5;
  }, []);

  const triggerAchievement = useCallback((title: string, description: string, icon?: React.ReactNode) => {
    // Clear existing timer if spamming
    if (timerRef.current) clearTimeout(timerRef.current);
    
    // Play Sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }

    setCurrentAchievement({ title, description, icon });
    setIsVisible(true);

    // Hide after 4 seconds
    timerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 4000);
  }, []);

  return (
    <AchievementContext.Provider value={{ triggerAchievement }}>
      {children}
      
      {/* Visual Popup */}
      <div className={`
        fixed top-4 right-0 md:right-4 z-[9999]
        transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}>
        <div className="bg-[#212121] border-2 border-white/20 w-80 p-2 flex items-center gap-3 shadow-[0_0_10px_rgba(0,0,0,0.5)] rounded-sm relative overflow-hidden">
          
          {/* Green accent glow */}
          <div className="absolute top-0 left-0 w-1 h-full bg-[#5cb85c]" />

          {/* Icon Area */}
          <div className="w-12 h-12 bg-[#333] flex items-center justify-center border border-white/10 flex-shrink-0">
             {currentAchievement?.icon || (
               <img src={ICON_URL} alt="Icon" className="w-10 h-10 object-contain pixelated" />
             )}
          </div>

          {/* Text Area */}
          <div className="flex flex-col">
            <span className="text-[#ffff00] font-minecraft font-bold text-sm tracking-wide">
              {currentAchievement?.title || "Achievement Get!"}
            </span>
            <span className="text-white font-minecraft text-sm">
              {currentAchievement?.description}
            </span>
          </div>
        </div>
      </div>

    </AchievementContext.Provider>
  );
};