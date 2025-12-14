import React, { useState } from 'react';
import { X, Package, Image as ImageIcon, Wifi, Check, Copy, Download } from 'lucide-react';
import { playClickSound } from '../utils/audio';
import { useAchievement } from './AchievementSystem';

interface StartMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StartMenuModal: React.FC<StartMenuModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const { triggerAchievement } = useAchievement();

  const handleCopyIp = () => {
    playClickSound();
    navigator.clipboard.writeText("play.chillout.gg");
    
    setCopied(true);
    triggerAchievement("Achievement Get!", "IP Copied to clipboard!");
    
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    playClickSound();
    onClose();
  }

  const StepItem = ({ 
    number, 
    title, 
    subtext, 
    icon, 
    onClick, 
    actionIcon,
    index
  }: { 
    number: string; 
    title: string; 
    subtext: string; 
    icon: React.ReactNode; 
    onClick?: () => void;
    actionIcon?: React.ReactNode;
    index: number;
  }) => {
    // Staggered delay logic: only apply delay when opening
    const delay = isOpen ? 200 + (index * 150) : 0;

    return (
      <div
        style={{ transitionDelay: `${delay}ms` }}
        className={`transform transition-all duration-700 ease-out mb-3
          ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}
        `}
      >
        <div 
          onClick={() => {
            playClickSound();
            if (onClick) onClick();
          }}
          className="group relative flex items-center gap-4 bg-black/40 p-4 border-2 border-transparent hover:border-white/20 hover:bg-black/60 transition-colors duration-200 cursor-pointer rounded-lg"
        >
          {/* Number Badge */}
          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-[#5d4037] text-white font-bold border-2 border-[#3e2723] shadow-[2px_2px_0_rgba(0,0,0,0.5)]">
            {number}
          </div>

          {/* Icon */}
          <div className="text-gray-400 group-hover:text-mc-green transition-colors">
            {icon}
          </div>

          {/* Text */}
          <div className="flex-grow">
            <h4 className="text-white font-bold uppercase tracking-wide text-lg leading-none">{title}</h4>
            <p className="text-gray-400 text-sm mt-1">{subtext}</p>
          </div>

          {/* Action Icon */}
          <div className="text-gray-500 group-hover:text-white transition-colors">
            {actionIcon}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500 ease-in-out ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div 
        style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        className={`relative w-full max-w-md bg-[#1e1e1e] border-4 border-gray-700 shadow-[0_0_50px_rgba(0,0,0,0.8)] transition-all duration-700 transform ${
          isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-90 translate-y-20 opacity-0'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-gray-800 bg-[#252525]">
          <h2 className="text-2xl font-bold text-white drop-shadow-md">Setup Guide</h2>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-white hover:bg-red-900/50 p-1 rounded transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-hidden">
          <StepItem 
            index={0}
            number="1"
            title="Download Modpack"
            subtext="Required for custom items"
            icon={<Package size={24} />}
            actionIcon={<Download size={20} />}
            onClick={() => window.open('#', '_blank')} 
          />
          
          <StepItem 
            index={1}
            number="2"
            title="Get Texture Pack"
            subtext="Enhanced visuals & models"
            icon={<ImageIcon size={24} />}
            actionIcon={<Download size={20} />}
            onClick={() => window.open('#', '_blank')} 
          />

          <StepItem 
            index={2}
            number="3"
            title="Connect"
            subtext={copied ? "IP Copied to clipboard!" : "play.chillout.gg"}
            icon={<Wifi size={24} />}
            actionIcon={copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
            onClick={handleCopyIp}
          />
        </div>

        {/* Footer decoration */}
        <div className="bg-[#151515] p-3 text-center text-xs text-gray-500">
          ChillOut! Launcher v2.0
        </div>
      </div>
    </div>
  );
};
