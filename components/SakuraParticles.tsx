import React, { useMemo } from 'react';

const PARTICLE_IMAGE = "https://static.planetminecraft.com/files/image/minecraft/texture-pack/2023/563/17290441_l.webp";
const COUNT = 30;

interface Particle {
  id: number;
  x: number; // left position %
  delay: number;
  duration: number;
  size: number;
  isFront: boolean;
}

export const SakuraParticles: React.FC = () => {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: COUNT }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      // Negative delay makes them start at random points in the animation cycle immediately
      delay: -(Math.random() * 20), 
      duration: 10 + Math.random() * 20, // 10s to 30s float duration
      size: 20 + Math.random() * 30, // 20px to 50px
      isFront: Math.random() > 0.4, // 60% chance to be in front, 40% behind
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      <style>
        {`
          @keyframes sakura-fall {
            0% {
              transform: translateY(-20vh) translateX(-20px) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateY(120vh) translateX(50px) rotate(360deg);
              opacity: 0;
            }
          }
        `}
      </style>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute top-0"
          style={{
            left: `${p.x}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            zIndex: p.isFront ? 20 : -1,
            opacity: p.isFront ? 0.9 : 0.6,
            // Blur back particles slightly for depth
            filter: p.isFront ? 'none' : 'blur(1px)',
            animation: `sakura-fall ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <img 
            src={PARTICLE_IMAGE} 
            alt="" 
            className="w-full h-full object-contain drop-shadow-sm"
          />
        </div>
      ))}
    </div>
  );
};
