import React from 'react';

interface StickySectionProps {
  children: React.ReactNode;
  zIndex: number;
  bgImage: string;
  overlayOpacity?: number;
  height?: string;
  marginBottom?: string;
}

export const StickySection: React.FC<StickySectionProps> = ({ 
  children, 
  zIndex, 
  bgImage,
  overlayOpacity = 0.5,
  height = '150vh', // Default height
  marginBottom = '0' // Default no overlap
}) => {
  return (
    <section 
      className="sticky top-0 w-full shadow-[0_-50px_100px_rgba(0,0,0,0.7)]"
      style={{ zIndex, height, marginBottom }}
    >
      {/* 
        Inner container acts as the visible viewport.
        It stays at the top of the sticky section, effectively pinning content 
        while the scroll consumes the extra height of the section.
      */}
      <div className="absolute top-0 left-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center">
        
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        
        {/* Overlay for readability */}
        <div 
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />

        {/* Decorative Minecraft Grid Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none z-[5]" 
              style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4">
          {children}
        </div>
      </div>
    </section>
  );
};