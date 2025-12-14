import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SocialCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  borderColor: string;
  actionText: string;
  onClick?: () => void;
}

export const SocialCard: React.FC<SocialCardProps> = ({
  title,
  description,
  icon,
  color,
  borderColor,
  actionText,
  onClick
}) => {
  return (
    <div 
      onClick={onClick}
      className={`
      relative group cursor-pointer 
      ${color} border-4 ${borderColor} 
      p-6 flex flex-col items-center text-center
      transition-transform duration-300 hover:-translate-y-2
      shadow-[8px_8px_0_rgba(0,0,0,0.5)]
    `}>
      <div className="bg-black/20 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      
      <h3 className="text-3xl font-bold text-white mb-2 uppercase tracking-wide">
        {title}
      </h3>
      
      <p className="text-gray-300 text-lg mb-6 leading-tight min-h-[3rem]">
        {description}
      </p>

      <div className="mt-auto flex items-center gap-2 text-white font-bold text-xl opacity-80 group-hover:opacity-100 group-hover:gap-4 transition-all">
        {actionText} <ArrowRight className="w-5 h-5" />
      </div>

      {/* Corner accents for blocky look */}
      <div className="absolute top-0 left-0 w-2 h-2 bg-white/20"></div>
      <div className="absolute top-0 right-0 w-2 h-2 bg-white/20"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 bg-white/20"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 bg-white/20"></div>
    </div>
  );
};