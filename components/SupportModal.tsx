import React from 'react';
import { X, Heart, CreditCard, DollarSign, ExternalLink, Wallet } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {

  const handleClose = () => {
    playClickSound();
    onClose();
  }

  const SupportItem = ({ 
    title, 
    subtext, 
    icon, 
    colorClass,
    onClick, 
    index
  }: { 
    title: string; 
    subtext: string; 
    icon: React.ReactNode; 
    colorClass: string;
    onClick?: () => void;
    index: number;
  }) => {
    const delay = isOpen ? 200 + (index * 100) : 0;

    return (
      <div
        style={{ transitionDelay: `${delay}ms` }}
        className={`transform transition-all duration-700 ease-out mb-3
          ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}
        `}
      >
        <div 
          onClick={() => {
            playClickSound();
            if (onClick) onClick();
          }}
          className="group relative flex items-center gap-4 bg-black/40 p-3 border-2 border-transparent hover:border-white/20 hover:bg-black/60 transition-colors duration-200 cursor-pointer rounded-lg"
        >
          {/* Icon Badge */}
          <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center text-white ${colorClass} border-2 border-black/20 shadow-inner rounded`}>
            {icon}
          </div>

          {/* Text */}
          <div className="flex-grow">
            <h4 className="text-white font-bold uppercase tracking-wide text-lg leading-none">{title}</h4>
            <p className="text-gray-400 text-sm mt-1">{subtext}</p>
          </div>

          {/* Action Icon */}
          <div className="text-gray-600 group-hover:text-white transition-colors">
            <ExternalLink size={20} />
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
        className={`relative w-full max-w-sm bg-[#1e1e1e] border-4 border-gray-700 shadow-[0_0_50px_rgba(0,0,0,0.8)] transition-all duration-700 transform ${
          isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-90 translate-y-20 opacity-0'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b-2 border-gray-800 bg-[#252525]">
          <h2 className="text-xl font-bold text-white drop-shadow-md uppercase tracking-wider">Support Us</h2>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-white hover:bg-red-900/50 p-1 rounded transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-hidden">
          <SupportItem 
            index={0}
            title="PayPal"
            subtext="One-time donation"
            icon={<DollarSign size={24} />}
            colorClass="bg-[#003087]"
            onClick={() => window.open('#', '_blank')} 
          />
          
          <SupportItem 
            index={1}
            title="Patreon"
            subtext="Exclusive monthly rewards"
            icon={<Heart size={20} className="fill-current" />}
            colorClass="bg-[#FF424D]"
            onClick={() => window.open('#', '_blank')} 
          />

          <SupportItem 
            index={2}
            title="MonoBank"
            subtext="Instant transfer (UA)"
            icon={<Wallet size={20} />}
            colorClass="bg-black border-white/20"
            onClick={() => window.open('#', '_blank')} 
          />
        </div>

        {/* Footer decoration */}
        <div className="bg-[#151515] p-3 text-center text-xs text-gray-500 border-t-2 border-gray-800">
          Thank you for supporting the project! <Heart size={10} className="inline text-red-500 mx-1" />
        </div>
      </div>
    </div>
  );
};