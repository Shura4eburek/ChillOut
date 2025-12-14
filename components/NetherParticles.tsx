import React, { useMemo } from 'react';

const COUNT = 50;
const COLORS = [
  '#FF4500', // Orange Red (Fire)
  '#FFA500', // Orange (Ember)
  '#363636', // Dark Grey (Ash)
  '#500000', // Dark Red (Nether ambience)
];

interface Particle {
  id: number;
  left: number;       // horizontal position %
  delay: number;      // animation delay
  duration: number;   // speed of rising
  swayDuration: number; // speed of zigzag
  size: number;       // pixel size
  color: string;
  isFront: boolean;
}

export const NetherParticles: React.FC = () => {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: COUNT }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: -(Math.random() * 15), // Start instantly at random positions
      duration: 5 + Math.random() * 10, // 5s to 15s rise time
      swayDuration: 2 + Math.random() * 4, // Zigzag speed
      size: 4 + Math.random() * 6, // 4px to 10px (Minecraft pixel style)
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      isFront: Math.random() > 0.5,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      <style>
        {`
          @keyframes ember-rise {
            0% {
              bottom: -10%;
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            80% {
              opacity: 0.8;
            }
            100% {
              bottom: 110%;
              opacity: 0;
            }
          }
          @keyframes ember-sway {
            0% { transform: translateX(0px); }
            25% { transform: translateX(15px); }
            50% { transform: translateX(0px); }
            75% { transform: translateX(-15px); }
            100% { transform: translateX(0px); }
          }
        `}
      </style>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute shadow-sm"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            zIndex: p.isFront ? 20 : -1,
            opacity: p.isFront ? 0.9 : 0.6,
            // Combine vertical rise and horizontal sway
            animation: `ember-rise ${p.duration}s linear infinite, ember-sway ${p.swayDuration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
            // Make it look blocky
            boxShadow: `0 0 4px ${p.color}`, 
          }}
        />
      ))}
    </div>
  );
};
