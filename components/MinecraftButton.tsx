import React from 'react';
import { playClickSound } from '../utils/audio';

interface MinecraftButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'normal' | 'large';
  icon?: React.ReactNode;
}

export const MinecraftButton: React.FC<MinecraftButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'normal',
  icon
}) => {
  
  const baseStyles = "relative inline-flex items-center justify-center font-minecraft font-bold text-white uppercase tracking-widest border-b-4 border-r-4 active:border-b-0 active:border-r-0 active:border-t-4 active:border-l-4 active:mt-1 transition-all duration-75 select-none";
  
  const variants = {
    primary: "bg-mc-green border-mc-greenDark hover:bg-green-500",
    secondary: "bg-gray-600 border-gray-800 hover:bg-gray-500",
    danger: "bg-red-600 border-red-800 hover:bg-red-500"
  };

  const sizes = {
    normal: "px-6 py-3 text-xl",
    large: "px-10 py-5 text-3xl md:text-4xl"
  };

  const handleClick = (e: React.MouseEvent) => {
    playClickSound();
    if (onClick) onClick();
  };

  return (
    <button 
      onClick={handleClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} shadow-[0_4px_0_rgba(0,0,0,0.5)] active:shadow-none`}
    >
      {icon && <span className="mr-3">{icon}</span>}
      <span className="drop-shadow-md">{children}</span>
    </button>
  );
};