import React, { useEffect, useRef, useState } from 'react';
import { VolumeX, Music } from 'lucide-react';

// Using local music files with absolute paths from /resources/music
const TRACKS = [
  { title: "C418 - Far", url: "/resources/music/far.mp3" },
  { title: "C418 - Chirp", url: "/resources/music/chirp.mp3" },
  { title: "C418 - Aria Math", url: "/resources/music/aria_math.mp3" },
  { title: "C418 - Floating Trees", url: "/resources/music/floating_trees.mp3" },
  { title: "C418 - Haunt Muskie", url: "/resources/music/haunt_muskie.mp3" },
  { title: "C418 - Mutation", url: "/resources/music/mutation.mp3" }
];

export const BackgroundAudio: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(TRACKS[0]);

  // Initialize random track
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * TRACKS.length);
    setCurrentTrack(TRACKS[randomIndex]);
  }, []);

  // Handle track changes (only if already playing)
  useEffect(() => {
    // If muted (user hasn't started music), don't auto-play when track changes or component mounts
    if (isMuted) return;

    const audio = audioRef.current;
    if (!audio) return;

    const playTrack = async () => {
      try {
        audio.volume = 0;
        await audio.play();
        // Ensure state is consistent
        setIsPlaying(true);
        fadeIn(audio);
      } catch (err) {
        console.warn("Playback failed", err);
      }
    };

    playTrack();
  }, [currentTrack]); 

  const fadeIn = (audio: HTMLAudioElement) => {
    let vol = 0;
    const targetVolume = 0.05; // 5% volume for background ambience
    
    // Clear any existing intervals on this element if we were storing them, 
    // but for simplicity here we rely on the rapid firing of this function not overlapping too much 
    // or the fact that volume is clamped.
    
    const interval = setInterval(() => {
      if (!audio || audio.paused) {
          clearInterval(interval);
          return;
      }
      if (vol < targetVolume) {
        vol = Math.min(vol + 0.002, targetVolume);
        audio.volume = vol;
      } else {
        clearInterval(interval);
      }
    }, 50);
  };

  const fadeOutAndNext = () => {
    const audio = audioRef.current;
    if (!audio) return;

    let vol = audio.volume;
    const interval = setInterval(() => {
      if (vol > 0.001) {
        vol -= 0.001;
        audio.volume = vol;
      } else {
        clearInterval(interval);
        playNextTrack();
      }
    }, 50);
  };

  const playNextTrack = () => {
      const nextIndex = Math.floor(Math.random() * TRACKS.length);
      setCurrentTrack(TRACKS[nextIndex]);
  };

  const handleError = () => {
    console.log("Audio source failed, skipping track...");
    playNextTrack();
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
        // Start playing
        audio.volume = 0;
        audio.play().then(() => {
            setIsPlaying(true);
            setIsMuted(false);
            fadeIn(audio);
        }).catch((e) => {
            console.error("Manual play failed", e);
        });
    } else {
        // Stop playing
        setIsMuted(true);
        audio.pause();
        setIsPlaying(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[100]">
      <button 
        onClick={(e) => {
            e.stopPropagation(); 
            toggleMute();
        }}
        className={`
            group flex items-center gap-3 
            backdrop-blur-md px-4 py-3 rounded-full border-2 
            transition-all duration-300 shadow-lg cursor-pointer
            ${isMuted 
                ? 'bg-red-900/60 border-red-500/30 text-red-200' 
                : 'bg-black/60 hover:bg-black/80 border-white/10 hover:border-white/40 text-white'
            }
        `}
      >
        <div className={`transition-transform duration-500 ${!isMuted && isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
           {isMuted ? <VolumeX size={20} /> : <Music size={20} />}
        </div>
        
        <div className="flex flex-col items-start overflow-hidden w-0 group-hover:w-32 transition-[width] duration-300 ease-in-out whitespace-nowrap">
           <span className="text-xs opacity-70 font-bold">
               {isMuted ? "Music Off" : "Now Playing"}
           </span>
           <span className="text-sm font-minecraft scrolling-text">
               {currentTrack.title}
           </span>
        </div>
      </button>

      <audio
        ref={audioRef}
        src={currentTrack.url}
        onEnded={fadeOutAndNext}
        onError={handleError}
        loop={false}
        preload="auto"
        crossOrigin="anonymous"
      />
    </div>
  );
};