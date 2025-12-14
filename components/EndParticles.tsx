import React, { useMemo } from 'react';

const COUNT = 40;
const COLORS = [
  '#dca8ff', // Light Purple
  '#a855f7', // Medium Purple
  '#6b21a8', // Dark Purple
  '#e9d5ff', // Pale Purple
  '#2a0a4a', // Very Dark Void Purple
];

interface Particle {
  id: number;
  left: number;       // horizontal start %
  top: number;        // vertical start %
  delay: number;
  duration: number;
  xMove: number;      // horizontal drift distance
  yMove: number;      // vertical drift distance
  size: number;
  color: string;
  isFront: boolean;
}

export const EndParticles: React.FC = () => {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: COUNT }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: -(Math.random() * 10),
      duration: 6 + Math.random() * 8, // Slow floating
      // Random movement direction
      xMove: (Math.random() - 0.5) * 100, 
      yMove: (Math.random() - 0.5) * 100,
      size: 4 + Math.random() * 8, // Square particles
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      isFront: Math.random() > 0.4, // 60% chance front
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      <style>
        {`
          @keyframes void-float {
            0% {
              transform: translate(0, 0) scale(0.8);
              opacity: 0;
            }
            20% {
              opacity: 0.8;
              transform: translate(0, 0) scale(1);
            }
            80% {
              opacity: 0.8;
            }
            100% {
              transform: translate(var(--x-move), var(--y-move)) scale(0);
              opacity: 0;
            }
          }
        `}
      </style>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute shadow-[0_0_8px_rgba(168,85,247,0.6)]"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            zIndex: p.isFront ? 20 : -1,
            opacity: p.isFront ? 0.8 : 0.4,
            // Using CSS variables for individual movement vectors
            // @ts-ignore
            '--x-move': `${p.xMove}px`,
            // @ts-ignore
            '--y-move': `${p.yMove}px`,
            animation: `void-float ${p.duration}s ease-in-out infinite alternate`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};
